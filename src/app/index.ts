// App
export * from './app.component';
export * from './app.service';

import { AppState } from './app.service';
import { GameService } from './game';

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  GameService
];
