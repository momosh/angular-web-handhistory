export class AppService {
    userId = '58469919b95ff5581ff414bc';
    urlString = process.env.API_URL + this.userId;

    constructor($http) {
        'ngInject';
        this.$http = $http;
    }

    getHandHistory(params) {
        if (params) {   // if query parameters are defined, pass them to http.get call
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