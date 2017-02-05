import templateUrl from './games.html';

class GamesController {

    constructor($rootScope) {
        'ngInject';
        this.$rootScope = $rootScope;
    }

    $onInit() {
        this.gameCollapse = [];
        this.collapseAllEventHandler(); // Register handle Event from Filter Component: Collapse All
        this.gameCollapse[0] = true;    // set the first Game Item to be 'opened'
    }

    gameCollapseClick(id) {
        this.gameCollapse[id] = !this.gameCollapse[id];
    }

    getGameStyle(cards) {
        if (this.countCards(cards) > 2) {
            return 'NL Omaha Hold\'em';
        } else {
            return 'NL Texas Hold\'em';
        }
    }

    countCards(cards) {
        return Object.keys(cards).length;
    }

    collapseAllEventHandler() {
        this.$rootScope.$on('COLLAPSE_ALL', (event, flag) => {
            if (flag) {     // if true all Games are collapsed, close all (set to false)
                this.gameCollapse.fill(false);
            }
        });
    }
}

export const GamesComponent = {
    template: templateUrl,
    controller: GamesController,
    bindings: {
        replays: '<',
        visible: '<'
    }
};