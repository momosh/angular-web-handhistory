import angular from 'angular';
import {FilterModule} from './filter/filter.module';
import {GameListModule} from './game-list/game-list.module';

export const CommonModule = angular
    .module('app.common', [
        FilterModule,
        GameListModule
    ])
    .value('EventEmmiter', payload => ({ $event: payload }))
    .name;
