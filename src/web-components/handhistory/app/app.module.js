import {AppComponent} from './app.component';
import {CommonModule} from './common/common.module';
import {ComponentsModule} from './components/components.module';
import {AppService} from './app.service';
// styles
import './app.less';

export const AppModule = angular
    .module('angular-web-handgroups', [
        CommonModule,
        ComponentsModule,
        'ngAnimate',
        'jivaro.replayer'
    ])
    .component('handGroups', AppComponent)
    .service('AppService', AppService)
    .name;