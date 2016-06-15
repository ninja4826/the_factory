export * from './retail';
export * from './tier_1';
export * from './tier_2';
export * from './tier_3';
export * from './tier_4';

import { Retail } from './retail';
import { TIER_1 } from './tier_1';
import { TIER_2 } from './tier_2';
import { TIER_3 } from './tier_3';
import { TIER_4 } from './tier_4';

// export const ALL_TIERS = [
//   ...TIER_1,
//   ...TIER_2,
//   ...TIER_3,
//   ...TIER_4
// ];

let all_tiers: { [name: string]: Retail } = {};
for (let name in TIER_1) {
  all_tiers[name] = TIER_1[name];
}
for (let name in TIER_2) {
  all_tiers[name] = TIER_2[name];
}
for (let name in TIER_3) {
  all_tiers[name] = TIER_3[name];
}
for (let name in TIER_4) {
  all_tiers[name] = TIER_4[name];
}

export const ALL_TIERS = all_tiers;