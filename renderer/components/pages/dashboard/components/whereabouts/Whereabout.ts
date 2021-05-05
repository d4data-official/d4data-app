import Location from './Location';

export default interface Whereabout {
  /**
     * Reference to location
     */
  location: Location;

  /**
     * Timestamp of recorded position
     */
  recordDate: Date;
}
