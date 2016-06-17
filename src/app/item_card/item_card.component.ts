import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Retail, Material, Item } from '../game';
import { FormatterPipe } from '../app.service';
// import { FormatterPipe } from '../app.service';

@Component({
  selector: 'item-card',
  styles: [ require('./item_card.scss') ],
  template: require('./item_card.html'),
  pipes: [ FormatterPipe ]
})
export class ItemCardComponent implements OnInit {
  // @Input('retail') retailItem: Retail = null;
  // @Input('material') materialItem: Material = null;
  @Input('item') item: Retail | Material;
  @Input('img-src') imgSrc: string;
  
  @Output('onClick') clickEmitter = new EventEmitter();
  material: Material = null;
  retail: Retail = null;
  isMaterial: boolean;
  
  constructor() {
    // if (this.item.isMaterial) {
    //   this.isMaterial = true;
    //   this.material = <Material>this.item;
    // } else {
    //   this.isMaterial = false;
    //   this.retail = <Retail>this.item;
    // }
    // console.log(this.item);
  }
  
  ngOnInit() {
    console.log(this.item);
    if (this.item.isMaterial) {
      this.material = <Material>this.item;
    } else {
      this.retail = <Retail>this.item;
    }
    this.isMaterial = this.item.isMaterial;
  }
  
  click(): void {
    this.clickEmitter.emit(null);
  }
}