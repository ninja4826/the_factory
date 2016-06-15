export * from './material';
import { MATERIALS } from './material';
// export * from './item';
export interface Item {
  name: string;
  // img_url: string;
  sellPrice: number;
}

export interface IRequirement {
  name: string;
  count: number;
  isMaterial?: boolean;
}

export class Requirement implements IRequirement {
  name: string;
  count: number;
  isMaterial: boolean;
  
  constructor(req: IRequirement) {
	  this.name = req.name;
	  this.count = req.count;
	 // this.isMaterial = req.isMaterial || false;
	 // let matIndex = MATERIALS.findIndex((mat) => mat.name === req.name);
	  this.isMaterial = req.name in MATERIALS;
	 // this.isMaterial = matIndex !== -1;
  }
}
export * from './retail';