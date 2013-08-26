'use strict';

Z.app.factory('zuZarautzMapper', ['$q', 'zuZarautzSource', function ($q, zuZarautzSource) {
    var zuZarautzMapper = new Z.DataMapper($q);

    zuZarautzMapper.setSources([zuZarautzSource]);
    zuZarautzMapper.setMapperCb(function (values) {
        angular.forEach(values[0].data, function (post, i) {
            values[0].data[i] = angular.extend(new Z.Model.ZuZarautz(), post);
        });

        return values[0].data;
    });

    return zuZarautzMapper;
}]);
