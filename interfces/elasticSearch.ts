export interface ElasticSearch {
  id: string;
  displayname: string;
  loctype: string;
  cid: number;
  rid: number;
  ctid: number;
  lat: number;
  lng: number;
  cc: string;
  country: string;
  rc: string;
  cityname: string;
  timezone: string;
  utc: string;
  airportname: string;
  ap: string;
  apicode: string;
  cityonly: string;
  destination_images: DestinationImages;
  displayType: DisplayType;
  indexId: string;
  isMetroOnly: boolean;
  kayakId: string;
  kayakType: string;
  locationname: string;
  name: string;
  placeID: string;
  ptid: string;
  region: string;
  searchFormPrimary: string;
  searchFormSecondary: string;
  secondary: string;
  shortdisplayname: string;
  smartyDisplay: string;
  subregion: string;
  entityKey?: string;
  objectID?: string;
  sub?: boolean;
}

export interface DestinationImages {
  image_jpeg: string;
  image_webp: string;
}

export interface DisplayType {
  type: string;
  displayName: string;
}
