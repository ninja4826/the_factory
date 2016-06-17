/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';

import { AppState } from './app.service';
import { Home } from './home';
import { RouterActive } from './router-active';

import { GameService } from './game';
import * as game from './game';

import { AutomationComponent } from './automation';
import { InventoryComponent } from './inventory';
import { ManufacturingComponent } from './manufacturing';
import { PurchasingComponent } from './purchasing';

export interface NavLink {
  comp?: string;
  link?: string;
  text: string;
}

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.css')
  ],
  template: require('./app.html')
})
@RouteConfig([
  { path: '/', name: 'Index', component: PurchasingComponent, useAsDefault: true },
  { path: '/automation', name: 'Automation', component: AutomationComponent },
  { path: '/inventory', name: 'Inventory', component: InventoryComponent },
  { path: '/manufacturing', name: 'Manufacturing', component: ManufacturingComponent },
  { path: '/purchasing', name: 'Purchasing', component: PurchasingComponent },
])
export class App {
  public appState: AppState;
  public gameService: GameService;
  
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';
  
  navLinks: NavLink[];
  fluid: boolean = true;
  
  money: number = 0;

  constructor(
    appState: AppState,
    gameService: GameService) {
    console.log('app constructor');
    this.appState = appState;
    this.gameService = gameService;
    
    // let comps = ['Automation', 'Inventory', 'Manufacturing', 'Purchasing'];
    let comps = ['Purchasing', 'Manufacturing', 'Inventory', 'Automation'];
    
    this.navLinks = comps.map((comp) => {
      return {
        comp: comp,
        text: comp
      };
    });
    // this.gameService.subscribe({
    //   money: {
    //     onNext: (data: number) => {
    //       this.money = data;
    //     }
    //   }
    // });
    this.navLinks[0] = {
      comp: 'Index',
      text: 'Purchasing'
    };
  }

  ngOnInit() {
    // console.log('Initial App State', this.appState.state);
    console.log('Game exports:', game);
    // this.gameService.moneyEmitter.subscribe((money: number) => {
    //   this.money = money;
    //   console.log(this.money);
    // });
    this.gameService.subscribe({
      money: {
        onNext: (data: number) => {
          this.money = data;
        }
      }
    });
    this.money = this.gameService.money;
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
