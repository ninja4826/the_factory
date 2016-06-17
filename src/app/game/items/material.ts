import { Item } from './index';

export interface IMaterial extends Item {
  buyPrice: number;
}

export class Material implements IMaterial {
  name: string;
  sellPrice: number;
  
  buyPrice: number;
  
  constructor(mat: IMaterial) {
    this.name = mat.name;
    this.sellPrice = mat.sellPrice;
    this.buyPrice = mat.buyPrice;
  }
  
  get isMaterial(): boolean {
    return true;
  }
}

// export const MATERIALS: IMaterial[] = [
var materials: IMaterial[] = [
  { name: "cardboard", sellPrice: 0.18, buyPrice: 0.24 },
  { name: "concrete", sellPrice: 3.14, buyPrice: 4.19 },
  { name: "magnet", sellPrice: 4.26, buyPrice: 5.68 },
  { name: "metal", sellPrice: 2.55, buyPrice: 3.40 },
  { name: "paint", sellPrice: 1.70, buyPrice: 2.26 },
  { name: "plastic", sellPrice: 0.45, buyPrice: 0.60 },
  { name: "rare_metal", sellPrice: 5.86, buyPrice: 7.81 },
  { name: "rubber", sellPrice: 0.83, buyPrice: 1.10 },
  { name: "wire", sellPrice: 1.28, buyPrice: 1.71 }
];

let obj: { [name: string]: Material } = {};

export const MATERIALS: { [name: string]: Material } = materials.map((mat) => {
  return new Material(mat);
}).reduce((prev, curr) => {
  prev[curr.name] = curr;
  return prev;
}, obj);