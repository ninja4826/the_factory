import { IRetail, Retail, accum } from './retail';

var tier_3: IRetail[] = [
  {
    name: "adv_logic_unit",
    sellPrice: 87.15,
    requirements: [
      { name: "wire", count: 4 },
      { name: "circuit", count: 4 },
      { name: "logic_unit", count: 2 }
    ]
  }, {
    name: "assembly_line",
    sellPrice: 715.84,
    requirements: [
      { name: "air_gun", count: 2 },
      { name: "arm", count: 2 },
      { name: "conveyor", count: 3 },
      { name: "lifter", count: 1 },
      { name: "mover", count: 1 }
    ]
  }, {
    name: "jet_engine",
    sellPrice: 180.04,
    requirements: [
      { name: "metal", count: 8 },
      { name: "wire", count: 12 },
      { name: "hose", count: 6 },
      { name: "pump", count: 4 },
      { name: "thing-a-ma-jig", count: 1 }
    ]
  }, {
    name: "sensor",
    sellPrice: 51.51,
    requirements: [
      { name: "rare_metal", count: 2 },
      { name: "wire", count: 1 },
      { name: "circuit", count: 1 },
      { name: "logic_unit", count: 1 }
    ]
  }, {
    name: "bridge",
    sellPrice: 1091.16,
    requirements: [
      { name: "road", count: 6 },
      { name: "support", count: 6 }
    ]
  }, {
    name: "forklift",
    sellPrice: 198.04,
    requirements: [
      { name: "metal", count: 6 },
      { name: "rubber", count: 8 },
      { name: "metal_wheel", count: 4 },
      { name: "motor", count: 2 },
      { name: "box", count: 4 }
    ]
  }, {
    name: "radio_tower",
    sellPrice: 414,
    requirements: [
      { name: "metal", count: 12 },
      { name: "wire", count: 6 },
      { name: "support", count: 4 }
    ]
  }, {
    name: "tablet_computer",
    sellPrice: 93.14,
    requirements: [
      { name: "plastic", count: 1 },
      { name: "wire", count: 3 },
      { name: "circuit", count: 3 },
      { name: "logic_unit", count: 1 },
      { name: "box", count: 1 }
    ]
  }
];

// export const TIER_3: Retail[] = tier_3
//   .map((ret) => {
//     ret.tier = 3;
//     return ret;
//   }).map((ret) => new Retail(ret));

export const TIER_3: { [name: string]: Retail } = accum(tier_3, 3);