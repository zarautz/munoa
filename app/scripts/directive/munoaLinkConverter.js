'use strict';

Z.app.directive('munoaLinkConverter', ['$sce', '$compile', function ($sce, $compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var convertLinks, content, links, url, newElement;

            convertLinks = function() {
                content = $sce.getTrustedHtml(attrs.content);

                // Process links
                links = content.match(/href="(.+?)"/g);

                if (links !== null) {
                    links.forEach(function (href) {
                        url     = href.match(/href="(.+?)"/)[1];
                        content = content.replace(href, 'href ng-click="navigation.openExternalLink(\''+url+'\')"');
                    });
                }

                newElement = $compile(content)(scope);
                element.append(newElement);
            };

            attrs.$observe('content', convertLinks);
        }
    };
}]);
