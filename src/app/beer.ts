
export class Glass {
  id: number;
  createDate: string;
  name: string;
}

export class Category {
  id: number;
  createDate: string;
  name: string;
}

export class Style {
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


export class Beer {
  id: string;
  abv : number;
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
