import type { StandardizerFactory } from '@d4data/archive-lib'
import Services from '@d4data/archive-lib/dist/src/types/Services'
import StandardizerIPC from './StandardizerIPC'
import ClientInstance from './ClientInstance'
import { StandardizerFactoryArgs } from '@shared/d4data-archive-lib/types/InstanceArgs'

export const CHANNEL_NAME = 'archive-lib/standardizer-factory'

export default class StandardizerFactoryIPC extends ClientInstance implements Partial<StandardizerFactory> {
  readonly id: string

  readonly path: string

  constructor(id: string, extractedArchivePath: string) {
    super(id, CHANNEL_NAME)
    this.id = id
    this.path = extractedArchivePath
  }

  getStandardizerFromService(service: Services): never {
    // Can not use IPC with sync method
    throw new Error('This method not working from renderer, use getStandardizerFromServiceIPC method instead')
  }

  async getStandardizerFromServiceIPC(service: Services): Promise<StandardizerIPC | undefined> {
    return this.callMethod('getStandardizerFromService')
  }

  static async init(extractedArchivePath: string): Promise<StandardizerFactoryIPC> {
    const { id, args } = await ClientInstance.instantiate<StandardizerFactoryArgs>(CHANNEL_NAME, extractedArchivePath)
    return new StandardizerFactoryIPC(id, ...args)
  }
}
