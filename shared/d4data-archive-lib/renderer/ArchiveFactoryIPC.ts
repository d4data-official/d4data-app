import type { ArchiveFactory } from '@d4data/archive-lib'
import Services from '@d4data/archive-lib/dist/src/types/Services'
import ArchiveIPC from './ArchiveIPC'
import StandardizerIPC from './StandardizerIPC'
import ClientInstance from './ClientInstance'
import ID from '../types/ID'

export const CHANNEL_NAME = 'archive-lib/archive-factory'

export default class ArchiveFactoryIPC extends ClientInstance implements Partial<ArchiveFactory> {
  readonly id: string

  readonly path: string

  readonly outputDir?: string

  constructor(id: string, archivePath: string, outputDir?: string) {
    super(id, CHANNEL_NAME)
    this.id = id
    this.path = archivePath
    this.outputDir = outputDir
  }

  async identify(): Promise<Services> {
    return this.callMethod<Services>('identify')
  }

  getServiceArchive(service: Services): ArchiveIPC {
    throw new Error('not implemented')
  }

  async getPlugin(): Promise<ArchiveIPC> {
    const [id, args] = await this.callMethod<[ID, [Services, string, string]]>('getPlugin')
    return new ArchiveIPC(id, ...args)
  }

  async getStandardizer(): Promise<StandardizerIPC> {
    const [id, args] = await this.callMethod<[ID, [Services, string]]>('getStandardizer')
    return new StandardizerIPC(id, ...args)
  }

  static async init(archivePath: string, outputDir?: string): Promise<ArchiveFactoryIPC> {
    const { id, args } = await ClientInstance.instantiate<[string, string]>(CHANNEL_NAME, archivePath, outputDir)
    return new ArchiveFactoryIPC(id, ...args)
  }
}
