import Location from './Location';

export default interface Connection {
/**
   * IP Address where the connection has been intiated
   */
  ipAddress: string

  /**
   * Reference to location related to the IP
   */
  location?: Location | undefined

  /**
   * Browser agent + computer name detected by service
   */
  browser?: string | undefined

  /**
   * Timestamp of recorded connection
   */
  timestamp: Date | undefined
}
