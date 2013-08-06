Z.app.run(['$http', '$rootScope', function ($http, $rootScope) {
    // -----------
    // NET POOLING
    // -----------
    $http.defaults.transformRequest.push(function (data) {
        $rootScope.$broadcast('httpCallStarted');
        return data;
    });

    $http.defaults.transformResponse.push(function (data) {
        $rootScope.$broadcast('httpCallStopped');
        return data;
    });

    $rootScope.$on('httpCallStarted', function () {
        $rootScope.loading = true;
    });

    $rootScope.$on('httpCallStopped', function () {
        $rootScope.loading = false;
    });
}]);
