import templateUrl from './game-details.html';

class GameDetailsController {

    numberOfCards(cards) {
        return Object.keys(cards).length;
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