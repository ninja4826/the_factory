import { IRetail, Retail, accum } from './retail';

var tier_1: IRetail[] = [
  {
    name: "adv_concrete",
    sellPrice: 14.47,
    requirements: [
      { name: "concrete", count: 2 },
      { name: "metal", count: 2 }
    ]
  }, {
    name: "belt",
    sellPrice: 2.60,
    requirements: [
      { name: "rubber", count: 2 }
    ]
  }, {
    name: "box",
    sellPrice: 2.21,
  	tier: 1,
  	requirements: [
  		{ name: "cardboard", count: 4 }
  	]
  }, {
    name: "cable",
    sellPrice: 3.28,
    requirements: [
      { name: "metal", count: 1 }
    ]
  }, {
    name: "circuit",
    sellPrice: 3.54,
    requirements: [
      { name: "plastic", count: 2 }
    ]
  }, {
    name: "gear",
    sellPrice: 6.56,
    requirements: [
      { name: "metal", count: 2 }
    ]
  }, {
    name: "hose",
    sellPrice: 2.60,
    requirements: [
      { name: "rubber", count: 2 }
    ]
  }, {
    name: "metal_wheel",
    sellPrice: 6.56,
    requirements: [
      { name: "metal", count: 2 }
    ]
  }, {
    name: "motor",
    sellPrice: 17.40,
    requirements: [
      { name: "magnet", count: 2 },
      { name: "metal", count: 1 },
      { name: "wire", count: 2 }
    ]
  }, {
    name: "plastic_wheel",
    sellPrice: 1.72,
    requirements: [
      { name: "plastic", count: 2 }
    ]
  }, {
    name: "pump",
    sellPrice: 8.72,
    requirements: [
      { name: "metal", count: 2 },
      { name: "plastic", count: 1 },
      { name: "rubber", count: 1 }
    ]
  }, {
    name: "garden_gnome",
    sellPrice: 15.9,
    requirements: [
      { name: "concrete", count: 1 },
      { name: "paint", count: 1 },
      { name: "box", count: 1 }
    ]
  }, {
    name: "speakers",
    sellPrice: 29.42,
    requirements: [
      { name: "magnet", count: 2 },
      { name: "plastic", count: 2 },
      { name: "wire", count: 1 },
      { name: "box", count: 1 }
    ]
  }, {
    name: "toaster",
    sellPrice: 22.72,
    requirements: [
      { name: "metal", count: 2 },
      { name: "wire", count: 2 },
      { name: "box", count: 1 }
    ]
  }
];

// export const TIER_1: Retail[] = tier_1
//   .map((ret) => {
//     ret.tier = 1;
//     return ret;
//   }).map((ret) => new Retail(ret));
// export const TIER_1: { [name: string]: Retail } = tier_1
//   .map((ret) => {
//     ret.tier = 1;
//     return new Retail(ret);
//   }).reduce((prev, curr) => {
//     prev[curr.name] = curr;
//     return prev;
//   }, {});

export const TIER_1: { [name: string]: Retail } = accum(tier_1, 1);