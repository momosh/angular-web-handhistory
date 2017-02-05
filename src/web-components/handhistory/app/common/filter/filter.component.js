import templateUrl from './filter.html';

class FilterController {
    constructor(EventEmmiter, $rootScope) {
        'ngInject';
        this.EventEmmiter = EventEmmiter;
        this.$rootScope = $rootScope;
    }

    $onInit() {
        this.collapseButtonText = true;
        this.filterModel = {
            tourney: false,
            cash: false,
            won: false,
            lost: false
        };
    }

    tourneyClick() {
        // check if Cash Game Type button is active, switch off
        if (this.filterModel.cash) this.filterModel.cash = false;

        this.filterModel.tourney = !this.filterModel.tourney;
        this.onGameTypeSelect(
            this.EventEmmiter({
                type: 'tourney',
                query: this.filterModel.tourney
            })
        );
    }

    cashClick() {
        // check if Tournament Game Type button is active, switch off
        if (this.filterModel.tourney) this.filterModel.tourney = false;

        this.filterModel.cash = !this.filterModel.cash;
        this.onGameTypeSelect(
            this.EventEmmiter({
                type: 'cash',
                query: this.filterModel.cash
            })
        )
    }

    wonClick() {
        // check if Lost Game Outcome button is active, switch off
        if (this.filterModel.lost) this.filterModel.lost = false;

        this.filterModel.won = !this.filterModel.won;
        this.onGameOutcomeSelect(
            this.EventEmmiter({
                outcome: 'won',
                query: this.filterModel.won
            })
        )
    }

    lostClick() {
        // check if Lost Game Outcome button is active, switch off
        if (this.filterModel.won) this.filterModel.won = false;

        this.filterModel.lost = !this.filterModel.lost;
        this.onGameOutcomeSelect(
            this.EventEmmiter({
                outcome: 'lost',
                query: this.filterModel.lost
            })
        );
    }

    colapseAllClick() {
        this.collapseButtonText = !this.collapseButtonText;
        // Emit Event for Game List Component
        this.$rootScope.$emit('COLLAPSE_ALL', this.collapseButtonText);
    }
}

export const FilterComponent = {
    template: templateUrl,
    controller: FilterController,
    bindings: {
        onGameTypeSelect: '&',
        onGameOutcomeSelect: '&'
    }
};