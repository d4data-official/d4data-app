import { ipcRenderer } from 'electron'
import { v4 as uuidV4 } from 'uuid'
import ACTIONS from '@shared/d4data-archive-lib/types/Actions'
import ID from '@shared/d4data-archive-lib/types/ID'
import CallbackArg, { IpcCallbackCall } from '@shared/d4data-archive-lib/types/CallbackArg'

export default abstract class ClientInstance {
  private callbacks: Record<ID, Function> = {}

  protected constructor(readonly id: string, readonly chanelName: string) {
    this.initIpcHandler()
  }

  registerCallback(callback: Function): CallbackArg {
    const uuid = uuidV4()
    this.callbacks[uuid] = callback
    return {
      type: 'CALLBACK_ARG',
      id: uuid,
    }
  }

  processArguments(args: any): any {
    if (Array.isArray(args)) {
      return args.map(arg => this.processArguments(arg))
    }

    switch (typeof args) {
      case 'function':
        return this.registerCallback(args)
      case 'object': {
        const newParam: Record<string, any> = {}
        Object.entries(args)
          .forEach(([key, value]) => newParam[key] = this.processArguments(value))
        return newParam
      }
      default:
        return args
    }
  }

  accessProperty<T extends any>(propertyName: string): Promise<T> {
    return ipcRenderer.invoke(this.chanelName, ACTIONS.PROPERTY_ACCESS, this.id, propertyName)
  }

  callMethod<T extends any>(methodName: string, ...args: Array<any>): Promise<T> {
    return ipcRenderer.invoke(this.chanelName, ACTIONS.METHOD_CALL, this.id, methodName, ...this.processArguments(args))
  }

  destroy(): Promise<boolean> {
    return ipcRenderer.invoke(this.chanelName, ACTIONS.DESTROY, this.id)
  }

  protected initIpcHandler(): void {
    ipcRenderer.on(this.chanelName, (event, action: ACTIONS, eventPayload) => {
      switch (action) {
        case ACTIONS.CALLBACK: {
          const { id, args } = eventPayload as IpcCallbackCall
          this.callbacks[id]?.(...args)
          return
        }
      }
    })
  }

  static async instantiate<T extends Array<any>>(chanelName: string, ...args: Array<any>): Promise<{ id: ID, args: T }> {
    return ipcRenderer.invoke(chanelName, ACTIONS.INSTANTIATE, ...args)
  }
}
