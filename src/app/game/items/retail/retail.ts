import { Item, IRequirement, Requirement } from '../index';

export interface IRetail extends Item {
  tier?: number;
  requirements: IRequirement[];
}

export class Retail implements IRetail {
  name: string;
  sellPrice: number;
  
  tier: number;
  requirements: Requirement[];
  
  constructor(ret: IRetail) {
    this.name = ret.name;
    this.sellPrice = ret.sellPrice;
    this.tier = ret.tier || 0;
    // console.log(ret.requirements);
    this.requirements = ret.requirements.map((req) => new Requirement(req));
  }
  
  get isMaterial(): boolean {
    return false;
  }
}

// export function accum(prev: { [name: string]: Retail }, curr: Retail): { [name: string]: Retail } {
//   prev[curr.name] = curr;
//   return prev;
// }

export function accum(rets: IRetail[], tier: number): { [name: string]: Retail } {
  let obj: { [name: string]: Retail } = {};
  return rets.map((ret) => {
    ret.tier = tier;
    return new Retail(ret);
  }).reduce((prev, curr) => {
    prev[curr.name] = curr;
    return prev;
  }, obj);
}