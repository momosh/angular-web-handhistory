import {GameDetailsComponent} from './game-details.component';
import {ReplayService} from './replay.service';

export const GameDetailsModule = angular
    .module('gameDetails', [])
    .component('gameDetails', GameDetailsComponent)
    .service('ReplayService', ReplayService)
    .name;