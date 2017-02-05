import angular from 'angular';
import {FilterComponent} from './filter.component';

export const FilterModule = angular
    .module('filter', [])
    .component('filterBar', FilterComponent)
    .name;