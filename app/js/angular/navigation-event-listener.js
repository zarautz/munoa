'use strict';

document.addEventListener('DOMContentLoaded', function() {
    var $body = document.querySelector('body'),
        activeClass = 'active-menu';
    
    $body.ontouchstart = function() {
        if (angular.element($body).hasClass(activeClass)) {
            angular.element($body).removeClass(activeClass);
        }
    };
});
