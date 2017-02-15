export const GameListScroll = ($window, $rootScope) => {
    'ngInject';
    return {
        restrict: 'A',
        link($scope, $elements, $attrs) {
            // this flags that this is the first time scroll
            let isFirstScroll = true;
            // Y position of last on scroll event, also used to
            // determine if down scroll happend
            let lastScrollY = 0;

            // listen for Scroll Position Reset event
            let scrollResetListener = $rootScope.$on('SCROLL_RST', (flag) => {
                if (flag) lastScrollY = 0;
            });

            // get element that directive is bound to
            let element = $elements[0];
            // get element's top position relative to the viewport
            let elementTopPosition = element.getBoundingClientRect().top;

            let determineLoad = () => {
                // signals that scroll passed bottom of bound element
                let scrollCondition = $window.innerHeight - elementTopPosition + $window.pageYOffset >= element.scrollHeight;
                // check if bottom and if down scroll
                if (scrollCondition && $window.pageYOffset > lastScrollY) {
                    $scope.$apply($attrs.bottomScroll);
                    // remember this posiotion for next event
                    lastScrollY = $window.pageYOffset;
                }
                // if user scrolled to page bottom on page load
                if (scrollCondition && isFirstScroll) {
                    $scope.$apply($attrs.bottomScroll);
                    isFirstScroll = false;  // prevent further behaviour
                }
            };

            angular.element($window).on('scroll', determineLoad);

            // remove event handlers when directive is destroyed
            $scope.$on('$destroy', () => {
                angular.element($window).off('scroll', determineLoad);
                scrollResetListener();
            });
        }
    }
};