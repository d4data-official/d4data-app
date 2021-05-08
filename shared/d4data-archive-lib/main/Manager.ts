import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { Archive, ArchiveFactory, Standardizer, StandardizerFactory } from 'd4data-archive-lib'
import { v4 as uuidV4 } from 'uuid'
import ACTIONS from '../types/Actions'
import ID from '../types/ID'
import CallbackArg from '@shared/d4data-archive-lib/types/CallbackArg'

export type ConstructorCallback = (...args: Array<any>) => Promise<{ instance: any, args: Array<any> }>

export interface Storage {
  archiveFactoryManager?: Manager<ArchiveFactory>
  standardizerFactoryManager?: Manager<StandardizerFactory>
  archiveManager?: Manager<Archive>
  standardizerManager?: Manager<Standardizer>
}

export default class Manager<T> {
  readonly instanceList: Record<ID, T> = {}

  constructor(
    readonly channelName: string,
    readonly storage: Storage,
    readonly constructorCallback: ConstructorCallback,
  ) {
    this.initIpcHandler()
  }

  registerInstance(instance: T): ID {
    const uuid = uuidV4()
    this.instanceList[uuid] = instance
    return uuid
  }

  async instantiate(...args: Array<any>): Promise<{ id: ID, args: Array<any> }> {
    const { instance, args: instanceArgs } = await this.constructorCallback(args)
    return {
      id: this.registerInstance(instance),
      args: instanceArgs,
    }
  }


  destroy(id: ID): boolean {
    if (!this.instanceList[id]) {
      return false
    }
    delete this.instanceList[id]
    return true
  }

  sendIpcCallback(event: IpcMainInvokeEvent, id: ID, callbackArgs: Array<any>) {
    event.sender.send(this.channelName, ACTIONS.CALLBACK, {
      id,
      args: callbackArgs,
    })
  }

  checkCallbackParam(obj: Record<any, any>): obj is CallbackArg {
    return obj.type === 'CALLBACK_ARG' && 'id' in obj
  }

  /**
   * Replace all registered callback parameters with IPC callback to client
   */
  processArguments(event: IpcMainInvokeEvent, args: any): any {
    if (Array.isArray(args)) {
      return args.map(param => this.processArguments(event, param))
    }

    if (typeof args === 'object') {
      if (this.checkCallbackParam(args)) {
        const id = args.id
        return (...callbackArgs: Array<any>) => {
          this.sendIpcCallback(event, id, callbackArgs)
        }
      }

      const newParam: Record<string, any> = {}
      Object.entries(args)
        .forEach(([key, value]) => newParam[key] = this.processArguments(event, value))
      return newParam
    }

    return args
  }

  async accessProperty(id: ID, propertyName: string): Promise<any> {
    // @ts-ignore
    const result = await this.instanceList[id]?.[propertyName]
    const instanceId = this.storeIfInstance(result)
    return instanceId || result
  }

  async callMethod(event: IpcMainInvokeEvent, id: ID, methodName: string, parameters: Array<any>): Promise<any> {
    const processedArgs = this.processArguments(event, parameters)
    // @ts-ignore
    const result = await this.instanceList[id]?.[methodName]?.(...processedArgs)
    const instanceId = this.storeIfInstance(result)
    return instanceId || result
  }

  protected storeIfInstance(instance: any): [ID, Array<any>] | null {
    if (instance instanceof Archive) {
      const id = this.storage.archiveManager!.registerInstance(instance)
      return [id, [instance.path, instance.outputDir]]
    }
    if (instance instanceof ArchiveFactory) {
      const id = this.storage.archiveFactoryManager!.registerInstance(instance)
      return [id, [instance.path, instance.outputDir]]
    }
    if (instance instanceof Standardizer) {
      const id = this.storage.standardizerManager!.registerInstance(instance)
      return [id, [instance.path, instance.service]]
    }
    if (instance instanceof StandardizerFactory) {
      const id = this.storage.standardizerFactoryManager!.registerInstance(instance)
      return [id, [instance.path]]
    }
    return null
  }

  protected initIpcHandler() {
    ipcMain.handle(this.channelName, async (event, action: ACTIONS, ...args) => {

      switch (action) {
        case ACTIONS.INSTANTIATE:
          return this.instantiate(...args)
        case ACTIONS.METHOD_CALL: {
          const [id, methodName, ...parameters] = args as [ID, string, ...any]
          return this.callMethod(event, id, methodName, parameters)
        }
        case ACTIONS.PROPERTY_ACCESS: {
          const [id, propertyName] = args as [ID, string]
          return this.accessProperty(id, propertyName)
        }
        case ACTIONS.DESTROY: {
          const [id] = args as [ID]
          this.destroy(id)
          return true
        }
        default:
          console.warn('unknown action')
          return 'unknown action'
      }
    })
  }
}
