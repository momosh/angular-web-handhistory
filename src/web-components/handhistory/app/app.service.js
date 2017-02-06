export class AppService {
    urlString = process.env.API_URL;

    constructor($http) {
        'ngInject';
        this.$http = $http;
    }

    getHandHistory(params, id) {
        // set url target string based on ENV
        if (process.env.ENV === 'production') {
            this.urlString = this.urlString + id;
        }
        // if query parameters are defined, pass them to http.get call
        if (params) {
            let config = {
                params: params
            };
            return this.$http.get(this.urlString, config)
                .then(res => { return res.data; });
        } else {
            return this.$http.get(this.urlString)
                .then(res => { return res.data; });
        }
    }
}