
export class Glass {
  id: string;
  createDate: string;
  name: string;
}

export class Category {
  id: string;
  createDate: string;
  name: string;
}

export class Style {

  constructor() {
    this.category = new Category();
  }

  id: number;
  createDate: string;
  name: string;
  category : Category;
  srmMax : number;
  ibuMax : number;
  srmMin : number;
  description : string;
  fgMin : number;
  ibuMin : number;
  fgMax : number;
  abvMax : number;
  ogMin : number;
  abvMin : number;
  categoryId : number;
}

export class Available {
  id: number;
  description: string;
  name: string;
}

export class Images {
  icon: string;
  large: string;
  medium: string;
  squareLarge: string;
  squareMedium: string;
}

export class Country {
  createDate: string;
  displayName: string;
  isoCode: string;
  isoThree: string;
  name: string;
  numberCode: number;
}

export class Location {

  constructor() {
    this.country = new Country();
  }

  country: Country;
  countryIsoCode: string;
  createDate: string;
  hoursOfOperation: string;
  id: string;
  inPlanning: string;
  isClosed: string;
  isPrimary: string;
  latitude: number;
  locality: string;
  locationType: string;
  locationTypeDisplay: string;
  longitude: number;
  name: string;
  openToPublic: string;
  phone: string;
  postalCode: string;
  region: string;
  status: string;
  statusDisplay: string;
  streetAddress: string;
  updateDate: string;
  website: string;
  yearOpened: string;
}

export class Brewery {

  constructor() {
    this.locations = [];
    this.locations.push(new Location());
    this.images = new Images();
  }

  createDate: string;
  description: string;
  established: string;
  id: string;
  images: Images;
  isOrganic: string;
  locations: Location[];
  name: string;
  nameShortDisplay: string;
  status: string;
  statusDisplay: string;
  updateDate: string;
  website: string;
}


export class Beer {

  constructor() {
    this.breweries = [];
    this.breweries.push(new Brewery());
    this.style = new Style();
    this.glass = new Glass();
    this.available = new Available();
  }

  id: string;
  abv : number;
  breweries: Brewery[];
  description: string;
  name: string;
  glass: Glass;
  style : Style;
  createDate : string;
  availableId : number;
  type : string;
  styleId : number;
  updateDate : string;
  glasswareId : number;
  available : Available;
  isOrganic : string;
  status : string;
  statusDisplay : string;
}

export class CellarRecord {

  constructor() {
    this.beer = new Beer();
  }

  ownerUid: string;
  beer: Beer;
  count: number;
  year: number;
}

export class DrankRecord {
  ownerUid: string;
  beer: Beer;
  count: number;
  year: number;
}
