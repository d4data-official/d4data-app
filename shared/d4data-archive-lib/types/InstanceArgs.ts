import Services from '@d4data/archive-lib/dist/src/types/Services'

export type ArchiveArgs = [Services, string, string] // [service, path, outputDir]
export type ArchiveFactoryArgs = [string, string] // [archivePath, outputDir]
export type StandardizerArgs = [Services, string] // [service, path]
export type StandardizerFactoryArgs = [string] // [extractedArchivePath]
