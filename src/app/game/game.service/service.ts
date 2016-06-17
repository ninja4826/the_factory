import { Injectable, EventEmitter } from '@angular/core';
import { MATERIALS, ALL_TIERS } from '../items';
import { SubFunc, Sub, Subscription, Subscriber } from './subscription';

interface SaveObject {
  money: number;
  inventory: { [name: string]: number };
  sales: { name: string, count: number };
}

@Injectable()
export class GameService {
  private _money: number = 1000;
  private _inventory: { [name: string]: number } = {};
  private _sales: { name: string, count: number };
  
  private _moneyEmitter: EventEmitter<number> = new EventEmitter();
  private _inventoryEmitter: EventEmitter<{ [name: string]: number }> = new EventEmitter();
  private _salesEmitter: EventEmitter<{ name: string, count: number }> = new EventEmitter();
  
  constructor() {
    console.log('game service constructor');
    for (let name in MATERIALS) {
      this.inventory[name] = 0;
    }
    for (let name in ALL_TIERS) {
      this.inventory[name] = 0;
    }
    
    this.loadGame();
    
    // this._moneyEmitter.emit(this.money);
    // this._inventoryEmitter.emit(this.inventory);
    this.emit('money');
    this.emit('inventory');
    
    let saveFunc = () => {
      this.saveGame();
    };
    // this.moneyEmitter.subscribe(saveFunc);
    // this.inventoryEmitter.subscribe(saveFunc);
    // this.salesEmitter.subscribe(saveFunc);
    this.subscribe({
      money: {
        onNext: saveFunc
      },
      inventory: {
        onNext: saveFunc
      },
      sales: {
        onNext: saveFunc
      }
    });
  }
  
  loadGame() {
    let obj: SaveObject = JSON.parse(window.localStorage.getItem('factory_save'));
    if (obj) {
      this.money = obj.money;
      this._inventory = obj.inventory;
      this.emit('inventory');
      this._sales = obj.sales;
      this.emit('sales');
    }
  }
  
  saveGame() {
    let obj: SaveObject = {
      money: this.money,
      inventory: this.inventory,
      sales: this.sales
    };
    window.localStorage.setItem('factory_save', JSON.stringify(obj));
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
        // this.salesEmitter.emit({
        //   name,
        //   count
        // });
        return true;
      }
      if (count > 0 && this.money < price) return false;
      this.money -= (price * count);
      // this.moneyEmitter.emit(this.money);
    }
    this.inventory[name] += count;
    // this.inventoryEmitter.emit(this.inventory);
    this.emit('inventory');
    return true;
  }
  
  private makeSub<T>(target: EventEmitter<T>, sub: Sub<T>): any {
    let defSubFunc: SubFunc<T> = (data: T) => {};
    let onNext: SubFunc<T> = 'onNext' in sub ? sub.onNext : defSubFunc;
  	let onError: SubFunc<T> = 'onError' in sub ? sub.onError : defSubFunc;
  	let onComplete: SubFunc<T> = 'onComplete' in sub ? sub.onComplete : defSubFunc;
  	return target.subscribe(onNext, onError, onComplete);
  }
  
  subscribe(subber: Subscriber): Subscription {
    let subs: Subscription = {};
    if ('money' in subber) subs.money = this.makeSub<number>(this._moneyEmitter, subber.money);
    if ('inventory' in subber) subs.inventory = this.makeSub<{ [name: string]: number }>(this._inventoryEmitter, subber.inventory);
    if ('sales' in subber) subs.sales = this.makeSub<{ name: string, count: number }>(this._salesEmitter, subber.sales);
    return subs;
  }
  
  emit(key: string): void {
    switch (key) {
      case "money":
        this._moneyEmitter.emit(this._money);
        break;
      case "inventory":
        this._inventoryEmitter.emit(this._inventory);
        break;
      case "sales":
        this._salesEmitter.emit(this._sales);
        break;
    }
  }
  
  get money(): number {
    return this._money;
  }
  set money(val: number) {
    this._money = val;
    this.emit('money');
  }
  
  get inventory(): { [name: string]: number } {
    return this._inventory;
  }
  
  get sales(): { name: string, count: number } {
    return this._sales;
  }
  addSale(name: string, count: number) {
    this._sales[name] += count;
    this.emit('sales');
  }
}