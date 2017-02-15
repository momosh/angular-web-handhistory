import {ModalComponent} from './modal.component';
import {ModalEscAction} from './modal-esc-action.directive';
import {ModalClickOutside} from './modal-click-outside.directive';

export const ModalModule = angular
    .module('uiModal', [])
    .component('uiModal', ModalComponent)
    .directive('escAction', ModalEscAction)
    .directive('clickOutside', ModalClickOutside)
    .name;