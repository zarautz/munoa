'use strict';

Z.app.factory('forecastMapper', ['$q', 'forecastSource', 'weatherCodesSource', function ($q, forecastSource, weatherCodesSource) {
    var forecastMapper = new Z.DataMapper($q);

    forecastMapper.setSources([forecastSource, weatherCodesSource]);
    forecastMapper.setMapperCb(function (values) {
        return values;
    });

    return forecastMapper;
}]);
