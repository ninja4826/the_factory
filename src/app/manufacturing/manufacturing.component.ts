import { Component, OnInit } from '@angular/core';
import { ItemCardComponent } from '../item_card';
import { GameService, ALL_TIERS } from '../game';

@Component({
  selector: 'manufacturing',
  template: require('./manufacturing.html'),
  directives: [ ItemCardComponent ]
})
export class ManufacturingComponent implements OnInit {
  gameService: GameService;
  
  retails: Retail[] = [];
  
  constructor(gameService: GameService) {
    this.gameService = gameService;
    for (let name in ALL_TIERS) {
      this.retails.push(ALL_TIERS[name]);
    }
  }
  
  ngOnInit() {
    
  }
}