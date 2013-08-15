'use strict';

Z.app.run(['$http', '$rootScope', function ($http, $rootScope) {
    // -----------
    // NET LOADING
    // -----------
    $rootScope.loadingCount = 0;
    $rootScope.loading      = false;

    $http.defaults.transformRequest.push(function (data) {
        $rootScope.loadingCount++;
        $rootScope.loading = $rootScope.loadingCount !== 0;

        return data;
    });
}]);
