import templateUrl from './game-details.html';

class GameDetailsController {

    constructor(ReplayService) {
        'ngInject';
        this.replayService = ReplayService;
    }

    $onInit() {
        this.showModal = false;
        this.replayData = {};
    }

    numberOfCards(cards) {
        return Object.keys(cards).length;
    }

    shareClick(id) {
        this.replayService.shareReplay(id);
    }

    replayClick(id) {
        this.replayService.getReplay(id)
            .then(res => {
                console.log(res);
                return this.replayData = res;
            })
            .then(res => {
                this.showModal = !this.showModal;
            });
        console.warn('Modal Show: ', this.showModal);
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