import angular from 'angular';
import {GameDetailsComponent} from './game-details.component';

export const GameDetailsModule = angular
    .module('gameDetails', [])
    .component('gameDetails', GameDetailsComponent)
    .name;