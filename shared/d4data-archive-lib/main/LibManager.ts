import { Archive, ArchiveFactory, Services, Standardizer, StandardizerFactory } from '@d4data/archive-lib'
import Manager, { Storage } from './Manager'

export default class LibManager {
  archiveFactoryManager: Manager<ArchiveFactory>

  archiveManager: Manager<Archive>

  standardizerFactoryManager: Manager<StandardizerFactory>

  standardizerManager: Manager<Standardizer>

  constructor() {
    const storage: Storage = {}

    this.archiveFactoryManager = new Manager<ArchiveFactory>(
      'archive-lib/archive-factory',
      storage,
      async (args: [string, string | undefined]) => ({
        instance: await ArchiveFactory.init(...args),
        args,
      }),
    )
    this.archiveManager = new Manager<Archive>(
      'archive-lib/archive',
      storage,
      async (args: [Services, string, string | undefined]) => {
        const [service, ...factoryArgs] = args
        const factory = await ArchiveFactory.init(...factoryArgs)
        // Method can not return undefined in this case,
        // because Archive factory will always be built with all default plugins
        const archive = factory.getServiceArchive(service)!
        return {
          instance: archive,
          args: [archive.service, archive.path, archive.outputDir],
        }
      },
    )
    this.standardizerFactoryManager = new Manager<StandardizerFactory>(
      'archive-lib/standardizer-factory',
      storage,
      async (args: [string]) => ({
        instance: new StandardizerFactory(...args),
        args,
      }),
    )
    this.standardizerManager = new Manager<Standardizer>(
      'archive-lib/standardizer',
      storage,
      async (args: [Services, string]) => {
        const [service, extractedArchivePath] = args
        const factory = new StandardizerFactory(extractedArchivePath)
        return {
          instance: factory.getStandardizerFromService(service),
          args,
        }
      },
    )

    storage.archiveFactoryManager = this.archiveFactoryManager
    storage.archiveManager = this.archiveManager
    storage.standardizerFactoryManager = this.standardizerFactoryManager
    storage.standardizerManager = this.standardizerManager
  }
}
