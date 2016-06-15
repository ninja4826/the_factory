import { IRetail, Retail, accum } from './retail';

var tier_2: IRetail[] = [
  {
    name: "air_gun",
    sellPrice: 19.78,
    requirements: [
      { name: "metal", count: 4 },
      { name: "hose", count: 2 }
    ]
  }, {
    name: "arm",
    sellPrice: 51.68,
    requirements: [
      { name: "metal", count: 2 },
      { name: "circuit", count: 1 },
      { name: "motor", count: 2 }
    ]
  }, {
    name: "conveyor",
    sellPrice: 102.58,
    requirements: [
      { name: "belt", count: 1 },
      { name: "gear", count: 2 },
      { name: "metal_wheel", count: 8 },
      { name: "motor", count: 1 }
    ]
  }, {
    name: "lifter",
    sellPrice: 55.46,
    requirements: [
      { name: "metal", count: 3 },
      { name: "cable", count: 2 },
      { name: "hose", count: 2 },
      { name: "motor", count: 1 },
      { name: "pump", count: 1 }
    ]
  }, {
    name: "logic_unit",
    sellPrice: 26.75,
    requirements: [
      { name: "wire", count: 5 },
      { name: "circuit", count: 4 }
    ]
  }, {
    name: "mover",
    sellPrice: 113.65,
    requirements: [
      { name: "metal", count: 3 },
      { name: "gear", count: 4 },
      { name: "metal_wheel", count: 4 },
      { name: "motor", count: 2 }
    ]
  }, {
    name: "road",
    sellPrice: 49.8,
    requirements: [
      { name: "concrete", count: 4 },
      { name: "adv_concrete", count: 2 }
    ]
  }, {
    name: "support",
    sellPrice: 40.53,
    requirements: [
      { name: "metal", count: 2 },
      { name: "adv_concrete", count: 2 }
    ]
  }, {
    name: "thing-a-ma-jig",
    sellPrice: 61.02,
    requirements: [
      { name: "circuit", count: 3 },
      { name: "hose", count: 2 },
      { name: "motor", count: 1 },
      { name: "pump", count: 2 }
    ]
  }, {
    name: "widget",
    sellPrice: 14.78,
    requirements: [
      { name: "metal", count: 1 },
      { name: "plastic", count: 4 },
      { name: "wire", count: 2 },
      { name: "circuit", count: 1 }
    ]
  }, {
    name: "toy_car",
    sellPrice: 35.38,
    requirements: [
      { name: "metal", count: 1 },
      { name: "paint", count: 1 },
      { name: "plastic", count: 3 },
      { name: "plastic_wheel", count: 4 },
      { name: "box", count: 1 }
    ]
  }, {
    name: "water_gun",
    sellPrice: 29.62,
    requirements: [
      { name: "paint", count: 1 },
      { name: "plastic", count: 6 },
      { name: "hose", count: 2 },
      { name: "box", count: 1 }
    ]
  }
];

// export const TIER_2: Retail[] = tier_2
//   .map((ret) => {
//     ret.tier = 2;
//     return ret;
//   }).map((ret) => new Retail(ret));
// export const TIER_2: { [name: string]: Retail } = tier_2
//   .map((ret) => {
//     ret.tier = 2;
//     return new Retail(ret);
//   }).reduce((prev, curr) => {
//     prev[curr.name] = curr;
//     return prev;
//   })
export const TIER_2: { [name: string]: Retail } = accum(tier_2, 2);