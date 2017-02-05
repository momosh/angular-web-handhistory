import templateUrl from './game-list.html';

class GameListController {

    constructor($rootScope) {
        'ngInject';
        this.$rootScope = $rootScope;
    }

    $onInit() {
        this.collapse = [];
        this.collapseAllEventHandler(); // Register handle Event from Filter Component: Collapse All
        this.collapse[0] = true;    // set the first Handhistory Item to be 'opened'
    }

    collapseOneClick(id) {
        this.collapse[id] = !this.collapse[id];
    }

    collapseAllEventHandler() {
        this.$rootScope.$on('COLLAPSE_ALL', (event, flag) => {
            if (flag) {     // if true all Games are collapsed, close all (set to false)
                this.collapse.fill(false);
            } else {
                for (let i = 0; i < this.history.length; i++) {
                    this.collapse[i] = true;
                }
            }
        });
    }
}

export const GameListComponent = {
    template: templateUrl,
    controller: GameListController,
    bindings: {
        hide: '<',
        history: '<',
        onBottomScroll: '&'
    }
};