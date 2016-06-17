import { Component, OnInit } from '@angular/core';
import { GameService, MATERIALS, Material } from '../game';
import { ItemCardComponent } from '../item_card';
import { FormatterPipe } from '../app.service';

interface OrderList {
  buy: { [name: string]: number };
  sell: { [name: string]: number };
}

@Component({
  selector: 'purchasing',
  styles: [ require('./purchasing.scss') ],
  template: require('./purchasing.html'),
  directives: [ ItemCardComponent ],
  pipes: [ FormatterPipe ]
})
export class PurchasingComponent implements OnInit {
  
  gameService: GameService;
  
  cards: Material[] = [];
  cardObj: { [name: string]: Material };
  
  order: { [name: string]: number } = {};
  orderList: OrderList = { buy: {}, sell: {} };
  
  orderPrice: number = 0;
  buyPrice: number = 0;
  sellPrice: number = 0;
  
  inventory: { [name: string]: number } = {};
  
  headerMargins: string = '';
  
  constructor(gameService: GameService) {
  // constructor() {
    this.gameService = gameService;
    // this.cards = MATERIALS;
    // for (let card of this.cards) {
    //   this.order[card.name] = 0;
    //   this.cardObj[card.name] = card;
    // }
    this.cardObj = MATERIALS;
    for (let name in this.cardObj) {
      this.cards.push(this.cardObj[name]);
      this.order[name] = 0;
      this.orderList.buy[name] = 0;
      this.orderList.sell[name] = 0;
    }
    
    // console.log(MATERIALS);
    this.inventory = this.gameService.inventory;
  }
  
  changeQuantity(name: string, pos: boolean = true) {
    console.log(this.order[name]);
    console.log(this.gameService.inventory[name]);
    if (pos) {
      if ((this.orderPrice + this.cardObj[name].buyPrice) > this.gameService.money) {
        return;
      }
    } else {
      // if (this.gameService.inventory[name] === 0) {
      //   return;
      // }
      if (this.order[name] <= (this.gameService.inventory[name]) * -1) {
        return;
      }
        
    }
    let add = (pos ? 1 : -1);
    this.order[name] += add;
    // this.orderList[pos ? 'buy' : 'sell'][name]++;
    // console.log(this.orderList);
    let buyKey = pos ? 'buy' : 'sell';
    let sellKey = pos ? 'sell' : 'buy';
    if (this.orderList[sellKey][name] !== 0) {
      this.orderList[sellKey][name]--;
    } else {
      this.orderList[buyKey][name]++;
    }
    this.updatePrices();
    // this.orderPrice += (this.cardObj[name].buyPrice * add);
  }
  
  private updatePrices() {
    console.log(this.orderList);
    let buyPrice = 0;
    let sellPrice = 0;
    
    for (let name in this.cardObj) {
      buyPrice += (this.orderList.buy[name] * this.cardObj[name].buyPrice);
      sellPrice += (this.orderList.sell[name] * this.cardObj[name].sellPrice);
    }
    console.log('sell:', sellPrice);
    console.log('buy:', buyPrice);
    
    this.buyPrice = buyPrice;
    this.sellPrice = sellPrice;
    this.orderPrice = sellPrice - buyPrice;
  }
  
  isPos(val: number): boolean {
    return val > 0;
  }
  
  completePurchase(): void {
    let inventory = this.gameService.inventory;
    var keys = Object.keys(this.order).filter((k) => this.order[k] !== 0);
    console.log('order', this.order);
    console.log('keys', keys);
    for (let name of keys) {
      let count = this.order[name];
      if (this.gameService.add(name, count, true)) {
        this.order[name] = 0;
        this.orderList.buy[name] = 0;
        this.orderList.sell[name] = 0;
        // this.orderPrice = 0;
        // this.buyPrice = 0;
        // this.sellPrice = 0;
      }
    }
    this.updatePrices();
    // this.gameService.money -= this.orderPrice;
  }
  
  ngOnInit() {
    
  }
}