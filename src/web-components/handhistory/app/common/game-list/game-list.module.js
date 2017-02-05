import angular from 'angular';

import {GameModule} from './games/games.module';
import {GameListComponent} from './game-list.component';
import {GameListScroll} from './game-list-scroll.directive';

export const GameListModule = angular
    .module('gameList', [
        GameModule
    ])
    .component('gameList', GameListComponent)
    .directive('bottomScroll', GameListScroll)
    .name;