import {SpinnerModule} from './spinner/spinner.module';

export const ComponentsModule = angular
    .module('app.components', [
        SpinnerModule
    ])
    .name;