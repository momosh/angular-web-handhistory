import angular from 'angular';
import {GamesComponent} from './games.component';
import {GameDetailsModule} from './game-details/game-details.module';

export const GameModule = angular
    .module('games', [
        GameDetailsModule
    ])
    .component('games', GamesComponent)
    .name;