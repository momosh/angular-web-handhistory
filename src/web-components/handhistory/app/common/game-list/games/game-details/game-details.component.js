import templateUrl from './game-details.html';

class GameDetailsController {

    constructor(ReplayService) {
        'ngInject';
        this.replayService = ReplayService;
    }

    numberOfCards(cards) {
        return Object.keys(cards).length;
    }

    shareClick(id) {
        console.log(id);
        this.replayService.shareReplay(id);
    }
}

export const GameDetailsComponent = {
    template: templateUrl,
    controller: GameDetailsController,
    bindings: {
        details: '<',
        visible: '<'
    }
};