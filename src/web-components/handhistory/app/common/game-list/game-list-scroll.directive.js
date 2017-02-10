export const GameListScroll = ($window, $rootScope) => {
    'ngInject';
    return {
        restrict: 'A',
        link($scope, $element, $attrs) {
            // Y position of last on scroll event, also
            // used to determine if down scroll happend
            let lastScrollY = 0;

            // listen for Scroll Position Reset event
            $rootScope.$on('SCROLL_RST', (flag) => {
                if (flag) lastScrollY = 0;
                console.log(lastScrollY);
            });

            // get element that directive is bound to
            let element = $element[0];
            // get element's top position relative to the viewport
            let elementTopPosition = element.getBoundingClientRect().top;

            angular.element($window).bind('scroll', function() {

                console.log('Page Y Offset: ', this.pageYOffset);
                console.log('Inner Height: ', this.innerHeight);
                console.log('Element Top Position: ', elementTopPosition);

                console.log('Condition: ', this.innerHeight - elementTopPosition + this.pageYOffset);

                console.log('Element Scroll Height: ', element.scrollHeight);
                // signals that scroll passed bottom of bound element
                let scrollCondition = this.innerHeight - elementTopPosition + this.pageYOffset >= element.scrollHeight;
                // check if bottom and if down scroll
                if (scrollCondition && this.pageYOffset > lastScrollY) {
                    $scope.$apply($attrs.bottomScroll);
                    console.log('BING!');
                    // remember this posiotion for next event
                    lastScrollY = this.pageYOffset;
                }
            });
        }
    }
};