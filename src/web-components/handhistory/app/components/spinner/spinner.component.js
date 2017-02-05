import templateUrl from './spinner.html';

class SpinnerController {

}

export const SpinnerComponent = {
    template: templateUrl,
    controller: SpinnerController,
    bindings: {
        icon: '@',
        size: '@',
        text: '@',
        visible: '<'
    }
};