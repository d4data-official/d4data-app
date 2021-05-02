import ID from '@shared/d4data-archive-lib/types/ID'

export default interface CallbackArg {
  type: 'CALLBACK_ARG'
  id: string
}

export interface IpcCallbackCall {
  id: ID
  args: Array<any>
}
