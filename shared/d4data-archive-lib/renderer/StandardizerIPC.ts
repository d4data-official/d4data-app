import type { Standardizer } from 'd4data-archive-lib'
import Services from 'd4data-archive-lib/dist/src/types/Services'
import type Parser from 'd4data-archive-lib/dist/src/classes/Parser'
import type { GetterOptions } from 'd4data-archive-lib/dist/src/types/standardizer/Standardizer'
import type GetterReturn from 'd4data-archive-lib/dist/src/types/standardizer/GetterReturn'
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
  Following,
  Mail,
  Media,
  Message,
  Notification,
  Post,
  Reacted,
  Setting,
  Task,
  Transaction,
  Whereabout,
} from 'd4data-archive-lib/dist/src/types/schemas'
import ClientInstance from './ClientInstance'
import ID from '../types/ID'

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

  getAPIs(options?: GetterOptions): GetterReturn<Array<API>> {
    return this.callMethod('getAPIs')
  }

  getAuthorizedDevices(options?: GetterOptions): GetterReturn<Array<AuthorizedDevice>> {
    return this.callMethod('getAuthorizedDevices')
  }

  getBrowserData(options?: GetterOptions): GetterReturn<BrowserData> {
    return this.callMethod('getBrowserData')
  }

  getChatMessages(chatId: string, options?: GetterOptions): GetterReturn<Array<ChatMessage>> {
    return this.callMethod('getChatMessages')
  }

  getChats(options?: GetterOptions): GetterReturn<Array<Chat>> {
    return this.callMethod('getChats')
  }

  getComments(options?: GetterOptions): GetterReturn<Array<Comment>> {
    return this.callMethod('getComments')
  }

  getCommunities(options?: GetterOptions): GetterReturn<Array<Community>> {
    return this.callMethod('getCommunities')
  }

  getConnections(options?: GetterOptions): GetterReturn<Array<Connection>> {
    return this.callMethod('getConnections')
  }

  getContacts(options?: GetterOptions): GetterReturn<Array<Contact>> {
    return this.callMethod('getContacts')
  }

  getFollowers(options?: GetterOptions): GetterReturn<Array<Contact>> {
    return this.callMethod('getFollowers')
  }

  getFollowings(options?: GetterOptions): GetterReturn<Array<Following>> {
    return this.callMethod('getFollowings')
  }

  getFriends(options?: GetterOptions): GetterReturn<Array<Contact>> {
    return this.callMethod('getFriends')
  }

  getMails(options?: GetterOptions): GetterReturn<Array<Mail>> {
    return this.callMethod('getMails')
  }

  getMedias(options?: GetterOptions): GetterReturn<Array<Media>> {
    return this.callMethod('getMedias')
  }

  getMessages(options?: GetterOptions): GetterReturn<Array<Message>> {
    return this.callMethod('getMessages')
  }

  getNotifications(options?: GetterOptions): GetterReturn<Array<Notification>> {
    return this.callMethod('getNotifications')
  }

  getPosts(options?: GetterOptions): GetterReturn<Array<Post>> {
    return this.callMethod('getPosts')
  }

  getProfile(options?: GetterOptions): GetterReturn<Contact> {
    return this.callMethod('getProfile')
  }

  getReacted(options?: GetterOptions): GetterReturn<Array<Reacted>> {
    return this.callMethod('getReacted')
  }

  getSettings(options?: GetterOptions): GetterReturn<Array<Setting>> {
    return this.callMethod('getSettings')
  }

  getTasks(options?: GetterOptions): GetterReturn<Array<Task>> {
    return this.callMethod('getTasks')
  }

  getTransactions(options?: GetterOptions): GetterReturn<Array<Transaction>> {
    return this.callMethod('getTransactions')
  }

  getWhereabouts(options?: GetterOptions): GetterReturn<Array<Whereabout>> {
    return this.callMethod('getWhereabouts')
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
    const subStandardizersParams = await this.accessProperty<Array<[ID, [Services, string]]>>('subStandardizers')
    return subStandardizersParams.map(([id, params]) => new StandardizerIPC(id, ...params))
  }

  static async init(service: Services, path: string): Promise<StandardizerIPC> {
    const { id, args } = await ClientInstance.instantiate<[Services, string]>(CHANNEL_NAME, service, path)
    return new StandardizerIPC(id, ...args)
  }
}
