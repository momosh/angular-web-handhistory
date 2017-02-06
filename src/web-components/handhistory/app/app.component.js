import templateUrl from './app.html';

class AppController {

    constructor(AppService) {
        'ngInject';
        this.service = AppService;
    }

    $onInit() {
        this.gameListLoading = true;    // set gameListLoading flag

        this.queryParams = {
            pagesize: 10,    // TODO implement a way of changing default page size
        };

        this.service.getHandHistory(this.queryParams, this.userId).then(res => {
            this.handhistory = res.data;
            if (res.lastdate) this.queryParams['lastdate'] = res.lastdate;
            this.gameListLoading = false;   // after data is loaded stop the spinner
        });
    }

    gameTypeClickHandler({ type, query }) {
        this.gameListLoading = true;    // start Spinner
        this.nothingToLoad = false;     // new cycle for data loading

        // remove query param if not in $event
        if (!query) {
            delete this.queryParams['gametype'];
        } else {
            this.queryParams['gametype'] = type;
        }

        delete this.queryParams['lastdate'];

        // get Hand History data for defined parameters
        this.service.getHandHistory(this.queryParams, this.userId).then(res => {
            this.handhistory = res.data;
            if (res.lastdate) this.queryParams['lastdate'] = res.lastdate;
            this.gameListLoading = false;
        });
    }

    gameOutcomeClickHandler({ outcome, query }) {
        this.gameListLoading = true;
        this.nothingToLoad = false;

        // remove query param if not in $event
        if (!query) {
            delete this.queryParams['outcome'];
        } else {
            this.queryParams['outcome'] = outcome;
        }

        delete this.queryParams['lastdate'];

        // get Hand History data for defined query parameters
        this.service.getHandHistory(this.queryParams, this.userId).then(res => {
            this.handhistory = res.data;
            if (res.lastdate) this.queryParams['lastdate'] = res.lastdate;
            this.gameListLoading = false;
        });
    }

    loadOnScroll() {
        if (this.nothingToLoad) { return; } // break infinite scroll if previous load was empty

        this.gameListLoading = this.scrollLoading = true;

        // Call HandHistory Service with query params
        this.service.getHandHistory(this.queryParams, this.userId).then(res => {
            // Push returned data to existing handhistory
            if (res.data) this.handhistory = this.handhistory.concat(res.data);
            if (res.lastdate) this.queryParams['lastdate'] = res.lastdate;
            if (res.data.length == 0) this.nothingToLoad = true;    // if no data is returned there is nothing to load
            this.gameListLoading = this.scrollLoading = false;
        });
    }
}

export const AppComponent = {
    template: templateUrl,
    controller: AppController,
    bindings: {
        userId: '<'
    }
};
