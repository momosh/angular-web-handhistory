export class ReplayService {

    constructor($http) {
        'ngInject';
        this.$http = $http;
    }

    shareReplay(id) {
        return this.$http.post('/replay/' + id, {})
            .then(res => { return res.data; });
    }

    getReplay(id) {
        return this.$http.get('/replay/' + id)
            .then(res => { return res.data; });
    }
}