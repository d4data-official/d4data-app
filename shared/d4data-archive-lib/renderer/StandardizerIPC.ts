import type { Standardizer } from '@d4data/archive-lib'
import type { Getters } from '@d4data/archive-lib'
import type Services from '@d4data/archive-lib/dist/src/types/Services'
import type Parser from '@d4data/archive-lib/dist/src/classes/Parser'
import type { GetterOptions } from '@d4data/archive-lib/dist/src/types/standardizer/Standardizer'
import type { default as GetterReturn, GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import {
  API,
  AuthorizedDevice,
  BrowserData,
  Chat,
  ChatMessage,
  Comment,
  Community,
  Connection,
  Contact,
  Event,
  Following,
  Mail,
  Media,
  Message,
  Note,
  Notification,
  Post,
  Reacted,
  Setting,
  TaskList,
  Transaction,
  Whereabout,
} from '@d4data/archive-lib/dist/src/types/schemas'
import ClientInstance from './ClientInstance'
import ID from '../types/ID'
import type { PaginationOptions, ParsingOptions } from '@d4data/archive-lib/dist/src/types/Parsing'
import type RawDataReturn from '@d4data/archive-lib/dist/src/types/standardizer/RawDataReturn'
import { StandardizerArgs } from '@shared/d4data-archive-lib/types/InstanceArgs'

export const CHANNEL_NAME = 'archive-lib/standardizer'

export default class StandardizerIPC extends ClientInstance implements Standardizer {
  readonly id: string

  // @ts-ignore
  // Don't access this property in renderer process
  parser: Parser

  path: string

  constructor(id: string, private _service: Services, path: string) {
    super(id, CHANNEL_NAME)
    this.id = id
    this.path = path
  }

  newParser(defaultOptions?: ParsingOptions & PaginationOptions): never {
    throw new Error('this method not working from renderer')
  }

  getAPIs(options?: GetterOptions): GetterReturn<Array<API>> {
    return this.callMethod('getAPIs', options)
  }

  getAuthorizedDevices(options?: GetterOptions): GetterReturn<Array<AuthorizedDevice>> {
    return this.callMethod('getAuthorizedDevices', options)
  }

  getBrowserData(options?: GetterOptions): GetterReturn<BrowserData> {
    return this.callMethod('getBrowserData', options)
  }

  getChatMessages(chatId: string, options?: GetterOptions): GetterReturn<Array<ChatMessage>> {
    return this.callMethod('getChatMessages', chatId, options)
  }

  getChats(options?: GetterOptions): GetterReturn<Array<Chat>> {
    return this.callMethod('getChats', options)
  }

  getComments(options?: GetterOptions): GetterReturn<Array<Comment>> {
    return this.callMethod('getComments', options)
  }

  getCommunities(options?: GetterOptions): GetterReturn<Array<Community>> {
    return this.callMethod('getCommunities', options)
  }

  getConnections(options?: GetterOptions): GetterReturn<Array<Connection>> {
    return this.callMethod('getConnections', options)
  }

  getContacts(options?: GetterOptions): GetterReturn<Array<Contact>> {
    return this.callMethod('getContacts', options)
  }

  getFollowers(options?: GetterOptions): GetterReturn<Array<Contact>> {
    return this.callMethod('getFollowers', options)
  }

  getFollowings(options?: GetterOptions): GetterReturn<Array<Following>> {
    return this.callMethod('getFollowings', options)
  }

  getFriends(options?: GetterOptions): GetterReturn<Array<Contact>> {
    return this.callMethod('getFriends', options)
  }

  getMails(options?: GetterOptions): GetterReturn<Array<Mail>> {
    return this.callMethod('getMails', options)
  }

  getMedias(options?: GetterOptions): GetterReturn<Array<Media>> {
    return this.callMethod('getMedias', options)
  }

  getMessages(options?: GetterOptions): GetterReturn<Array<Message>> {
    return this.callMethod('getMessages', options)
  }

  getNotifications(options?: GetterOptions): GetterReturn<Array<Notification>> {
    return this.callMethod('getNotifications', options)
  }

  getPosts(options?: GetterOptions): GetterReturn<Array<Post>> {
    return this.callMethod('getPosts', options)
  }

  getProfile(options?: GetterOptions): GetterReturn<Contact> {
    return this.callMethod('getProfile', options)
  }

  getReacted(options?: GetterOptions): GetterReturn<Array<Reacted>> {
    return this.callMethod('getReacted', options)
  }

  getSettings(options?: GetterOptions): GetterReturn<Array<Setting>> {
    return this.callMethod('getSettings', options)
  }

  getTasks(options?: GetterOptions): GetterReturn<Array<TaskList>> {
    return this.callMethod('getTasks', options)
  }

  getTransactions(options?: GetterOptions): GetterReturn<Array<Transaction>> {
    return this.callMethod('getTransactions', options)
  }

  getWhereabouts(options?: GetterOptions): GetterReturn<Array<Whereabout>> {
    return this.callMethod('getWhereabouts', options)
  }

  getNotes(options?: GetterOptions): GetterReturn<Array<Note>> {
    return this.callMethod('getNotes', options)
  }

  getRawData(filePath: string, options?: GetterOptions): Promise<RawDataReturn> {
    return this.callMethod('getRawData', filePath, options)
  }

  getEvents(options?: GetterOptions): GetterReturn<Array<Event>> {
    return this.callMethod('getEvents', options)
  }

  getAvailableGetters(): Promise<Array<Getters>> {
    return this.callMethod('getAvailableGetters')
  }

  callAllGetters(options?: GetterOptions): Promise<Record<Getters, GetterData<any>>> {
    throw new Error('this method is not working from renderer')
  }

  get service(): Services {
    return this._service
  }

  get subServices(): Array<Services> {
    throw new Error('this getter not working from renderer, use getSubServices method instead')
  }

  getSubServices(): Promise<Array<Services>> {
    return this.accessProperty('subServices')
  }

  get subStandardizers(): Array<StandardizerIPC> {
    throw new Error('this getter not working from renderer, use getSubStandardizers method instead')
  }

  async getSubStandardizers(): Promise<Array<StandardizerIPC>> {
    const subStandardizersParams = await this.accessProperty<Array<[ID, StandardizerArgs]>>('subStandardizers')
    return subStandardizersParams.map(([id, args]) => new StandardizerIPC(id, ...args))
  }

  static async init(service: Services, path: string): Promise<StandardizerIPC> {
    const { id, args } = await ClientInstance.instantiate<StandardizerArgs>(CHANNEL_NAME, service, path)
    return new StandardizerIPC(id, ...args)
  }
}
