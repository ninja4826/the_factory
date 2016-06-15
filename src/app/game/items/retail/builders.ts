import { IRetail } from './retail';

export interface IBuilder extends IRetail {
  max: number;
  targetTier: number | string;
}

export const BUILDERS: IBuilder[] = [
  {
    name: "tier_1",
    sellPrice: 328.74,
    targetTier: 1,
    requirements: [
      { name: "motor", count: 1 },
      { name: "arm", count: 2 },
      { name: "conveyor", count: 1 },
      { name: "thing-a-ma-jig", count: 1 }
    ]
  }
];