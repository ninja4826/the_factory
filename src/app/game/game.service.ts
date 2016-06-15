import { Injectable, EventEmitter } from '@angular/core';
// import { material, retail } from './items';
// import * as items from './items';
import { MATERIALS, ALL_TIERS } from './items';

@Injectable()
export class GameService {
  
  moneyEmitter: EventEmitter<number> = new EventEmitter();
  inventoryEmitter: EventEmitter<{ [name: string]: number }> = new EventEmitter();
  salesEmitter: EventEmitter<{ name: string, count: number }> = new EventEmitter();
  money: number = 1000;
  inventory: { [name: string]: number } = {};
  
  constructor() {
    // console.log('material:\n', material, '\n');
    // console.log('retail:\n', retail);
    // console.log('items: ', items);
    for (let name in MATERIALS) {
      this.inventory[name] = 0;
    }
    for (let name in ALL_TIERS) {
      this.inventory[name] = 0;
    }
    
    this.moneyEmitter.emit(this.money);
    this.inventoryEmitter.emit(this.inventory);
  }
  
  add(name: string, count: number, buy: boolean = false): boolean {
    if (!(name in MATERIALS || name in ALL_TIERS)) {
      return false;
    }
    // this.inventory[name] += count;
    console.log(name, count, buy);
    if (buy) {
      let price: number = 0;
      if (name in MATERIALS) {
        if (count > 0) {
          price = MATERIALS[name].buyPrice;
        } else if (count < 0) {
          price = MATERIALS[name].sellPrice;
        } else {
          return false;
        }
      } else if (name in ALL_TIERS) {
        if (count >= 0) {
          return false;
        }
        this.salesEmitter.emit({
          name,
          count
        });
        return true;
        // price = ALL_TIERS[name].sellPrice;
      }
      if (count > 0 && this.money < price) return false;
      this.money -= (price * count);
      this.moneyEmitter.emit(this.money);
    }
    
    
    
    this.inventory[name] += count;
    this.inventoryEmitter.emit(this.inventory);
    return true;
  }
}