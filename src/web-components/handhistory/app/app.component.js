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

    filterClickHandler(event) {
        this.gameListLoading = true;    // start Spinner
        this.nothingToLoad = false;     // new cycle for data loading

        // handles Game Type clicks (Tourney or Cash)
        if (event.type) {
            // remove query param for game type if not in $event
            if (!event.query) {
                delete this.queryParams['gametype'];
            } else {
                this.queryParams['gametype'] = event.type;
            }
        }
        // handles Game Outcome clicks (Won or Lost)
        if (event.outcome) {
            // remove query param if not in $event
            if (!event.query) {
                delete this.queryParams['outcome'];
            } else {
                this.queryParams['outcome'] = event.outcome;
            }
        }

        delete this.queryParams['lastdate'];

        // get Hand History data for defined parameters
        this.service.getHandHistory(this.queryParams, this.userId).then(res => {
            this.handhistory = res.data;
            if (res.lastdate) this.queryParams['lastdate'] = res.lastdate;
            this.gameListLoading = false;
        });
    }

    loadOnScroll() {
        // break infinite scroll if previous load was empty, previous load on scroll
        // event hasn't finished yet or onInit load is active
        if (this.nothingToLoad || this.scrollStillLoading || this.gameListLoading) { return; }

        this.gameListLoading = this.scrollLoading = true;   //  set flags for loading spinner

        // Call HandHistory Service with query params
        this.service.getHandHistory(this.queryParams, this.userId).then(res => {
            // Push returned data to existing handhistory
            if (res.data) this.handhistory = this.handhistory.concat(res.data);
            if (res.lastdate) this.queryParams['lastdate'] = res.lastdate;
            if (res.data.length == 0) this.nothingToLoad = true;    // if no data is returned there is nothing to load
            this.gameListLoading = this.scrollLoading = false;
            this.scrollStillLoading = false;     // after everything is done, alow next load on scroll event
        });

        this.scrollStillLoading = true;     // flag that prevents overloading on scroll event
    }
}

export const AppComponent = {
    template: templateUrl,
    controller: AppController,
    bindings: {
        userId: '<'
    }
};
