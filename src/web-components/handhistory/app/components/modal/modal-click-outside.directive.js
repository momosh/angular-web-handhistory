export const ModalClickOutside = ($document) => {
    'ngInject';
    return {
        restrict: 'A',
        link($scope, $elements, $attrs) {
            let isFirstClick = true;
            let outClickHandler = (event) => {
                if (!$elements[0].contains(event.target)) {
                    if (!isFirstClick) {
                        $scope.$apply($attrs.clickOutside);
                    } else {
                        isFirstClick = false;
                    }
                }
            };
            $document.on('click', outClickHandler);

            // remove event handlers when directive is destroyed
            $scope.$on('$destroy', () => {
                $document.off('click', outClickHandler);
            });
        }
    }
};