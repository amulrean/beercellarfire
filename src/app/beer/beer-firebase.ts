export class Brewery {

  constructor() {
  }

  description: string;
  established: string;
  name: string;
}


export class Beer {

  constructor() {
    this.brewery = new Brewery();
  }

  abv : number;
  brewery: Brewery;
  description: string;
  name: string;
  style : string;
}

export class CellarRecord {

  constructor() {
    this.beer = new Beer();
  }

  $key: string;
  ownerUid: string;
  beer: Beer;
  count: number;
  year: number;
}

export class DrankRecord {

  constructor(theCellarRecord: CellarRecord) {
    this.ownerUid = theCellarRecord.ownerUid;
    this.beer = theCellarRecord.beer;
    this.year = theCellarRecord.year;

    this.drankDate = Date.now();
  }


  $key: string;
  ownerUid: string;
  beer: Beer;
  drankDate: number;
  year: number;
}
