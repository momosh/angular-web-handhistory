export const GameListScroll = ($window) => {
    'ngInject';
    return {
        restrict: 'A',
        link($scope, $element, $attrs) {
            let element = $element[0];
            let elementTopPosition = element.getBoundingClientRect().top;

            angular.element($window).bind('scroll', function() {
                if (this.innerHeight - elementTopPosition + this.pageYOffset == element.scrollHeight) {
                    $scope.$apply($attrs.bottomScroll);
                }
            });
        }
    }
};