import type { Archive, Standardizer } from '@d4data/archive-lib'
import Services from '@d4data/archive-lib/dist/src/types/Services'
import { ArchiveFormat, ExtractOptions } from '@d4data/archive-lib/dist/src/modules/ArchiveExtraction'
import StandardizerIPC from './StandardizerIPC'
import ClientInstance from './ClientInstance'
import ID from '../types/ID'
import { ArchiveMetaData } from '@d4data/archive-lib/dist/src/types/schemas'
import { ArchiveArgs, StandardizerArgs } from '@shared/d4data-archive-lib/types/InstanceArgs'

export const CHANNEL_NAME = 'archive-lib/archive'

export default class ArchiveIPC extends ClientInstance implements Archive {
  readonly id: string

  outputDir: string

  path: string

  readonly extracted: boolean = false

  constructor(id: string, private _service: Services, path: string, outputDir: string) {
    super(id, CHANNEL_NAME)
    this.id = id
    this.path = path
    this.outputDir = outputDir
  }

  get defaultOutputDir(): string {
    throw new Error('not implemented')
  }

  async extract(options?: ExtractOptions & { outputDir?: string }): Promise<ArchiveIPC> {
    await this.callMethod('extract', options)
    return this
  }

  async getMetadata(): Promise<ArchiveMetaData> {
    return this.callMethod<ArchiveMetaData>('getMetadata')
  }

  identifyFormat(): Promise<ArchiveFormat> {
    return this.callMethod('identifyFormat')
  }

  identifyService(): Promise<boolean> {
    return this.callMethod('identifyService')
  }

  isExtracted(): this is { extractedArchivePath: string } {
    return this.extracted
  }

  get service(): Services {
    return this._service
  }

  get standardizer(): Standardizer {
    throw new Error('This getter not working from renderer, use getStandardizer method instead')
  }

  async getStandardizer(): Promise<StandardizerIPC> {
    const [id, args] = await this.accessProperty<[ID, StandardizerArgs]>('standardizer')
    return new StandardizerIPC(id, ...args)
  }

  static async init(service: Services, path: string, outputDir?: string): Promise<ArchiveIPC> {
    const { id, args } = await ClientInstance
      .instantiate<ArchiveArgs>(CHANNEL_NAME, service, path, outputDir)
    return new ArchiveIPC(id, ...args)
  }
}
