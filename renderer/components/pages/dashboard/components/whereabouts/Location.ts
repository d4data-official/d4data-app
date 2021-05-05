export interface AbsolutePosition {
  /**
   * Latitude of the absolute position
   */
  latitude: number | string;

  /**
   * Longitude of the absolute position
   */
  longitude: number | string;
}

export interface RelativePosition {
  /**
   * Raw human-readable address
   */
  raw: string

  /**
   * City within human-readable address
   */
  city?: string | undefined

  /**
   * Country within human-readable address
   */
  country?: string | undefined

  /**
   * Address within human-readable address
   */
  address?: string | undefined

  /**
   * Zip code within human-readable address
   */
  zipcode?: string | undefined
}

/**
 * Interface of
 */
export default interface Location {
  /**
   * Position using latitude and longitude absolute coordinates
   */
  absolutePosition?: AbsolutePosition | undefined

  /**
   * Human-readable address/city
   */
  relativePosition?: RelativePosition | undefined
}
