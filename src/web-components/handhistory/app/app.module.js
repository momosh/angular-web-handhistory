import angular from 'angular';

import {AppComponent} from './app.component';
import {CommonModule} from './common/common.module';
import {ComponentsModule} from './components/components.module';

import {AppService} from './app.service';

// styles
import './app.less';

export const AppModule = angular
    .module('app', [
        CommonModule,
        ComponentsModule
    ])
    .component('handGroups', AppComponent)
    .service('AppService', AppService)
    .name;