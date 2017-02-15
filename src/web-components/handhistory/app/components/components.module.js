import {SpinnerModule} from './spinner/spinner.module';
import {ModalModule} from './modal/modal.module';

export const ComponentsModule = angular
    .module('app.components', [
        SpinnerModule,
        ModalModule
    ])
    .name;