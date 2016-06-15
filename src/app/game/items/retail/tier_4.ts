import { IRetail, Retail, accum } from './retail';

var tier_4: IRetail[] = [
  {
    name: "drone",
    sellPrice: 542.06,
    requirements: [
      { name: "plastic", count: 4 },
      { name: "rare_metal", count: 1 },
      { name: "motor", count: 4 },
      { name: "adv_logic_unit", count: 1 },
      { name: "sensor", count: 2 }
    ]
  }, {
    name: "jet",
    sellPrice: 3514.76,
    requirements: [
      { name: "metal", count: 24 },
      { name: "wire", count: 18 },
      { name: "adv_logic_unit", count: 6 },
      { name: "jet_engine", count: 4 },
      { name: "sensor", count: 8 }
    ]
  }, {
    name: "oculus_rift",
    sellPrice: 307.84,
    requirements: [
      { name: "plastic", count: 2 },
      { name: "rare_metal", count: 2 },
      { name: "wire", count: 4 },
      { name: "widget", count: 2 },
      { name: "sensor", count: 2 }
    ]
  }
];

// export const TIER_4: Retail[] = tier_4
//   .map((ret) => {
//     ret.tier = 4;
//     return ret;
//   }).map((ret) => new Retail(ret));

export const TIER_4: { [name: string]: Retail } = accum(tier_4, 4);