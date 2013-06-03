Z.app.controller('EventController', ['$http', function($http) {
    var that = this;

    this.events = [];

    $http.get('https://api.mongolab.com/api/1/databases/test/collections/events?apiKey=dkMj2ThNCU6RgwGFscKEpWkJ-wxOeB3S')
        .then(function(response) {
            that.events = response.data;
        }
    );
}]);
