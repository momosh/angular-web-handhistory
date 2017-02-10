export class AppService {

    constructor($http) {
        'ngInject';
        this.$http = $http;
    }

    getHandHistory(params, id) {
        // Set url target string based on ENV
        let url = '';
        if (process.env.ENV === 'production') {
            url = process.env.API_URL + id;
        } else {
            url = process.env.API_URL + process.env.USER_ID;
        }

        if (params) {   // if query parameters are defined, pass them to http.get call
            let config = {
                params: params
            };
            return this.$http.get(url, config)
                .then(res => { return res.data; });
        } else {
            return this.$http.get(url)
                .then(res => { return res.data; });
        }
    }
}