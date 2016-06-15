import { Component, OnInit } from '@angular/core';
import { GameService, MATERIALS, IMaterial } from '../game';
import { FormatterPipe } from '../app.service';

@Component({
  selector: 'purchasing',
  styles: [ require('./purchasing.scss') ],
  template: require('./purchasing.html'),
  pipes: [ FormatterPipe ]
})
export class PurchasingComponent implements OnInit {
  
  gameService: GameService;
  
  cards: IMaterial[] = [];
  cardObj: { [name: string]: IMaterial };
  
  order: { [name: string]: number } = {};
  orderPrice: number = 0;
  
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
    this.orderPrice += (this.cardObj[name].buyPrice * add);
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
      }
    }
    // this.gameService.money -= this.orderPrice;
  }
  
  ngOnInit() {
    
  }
}