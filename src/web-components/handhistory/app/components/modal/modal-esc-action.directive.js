export const ModalEscAction = () => {
    'ngInject';
    return {
        restrict: 'A',
        link($scope, $elements, $attrs) {
            let escKeyHandler = (event) => {
                if (event.which === 27) {   // 27 = esc key
                    $scope.$apply($attrs.escAction);
                }
            };

            $elements.on('keydown keypress', escKeyHandler);

            // remove event handlers when directive is destroyed
            $scope.$on('$destroy', () => {
                $elements.off('keydown keypress', escKeyHandler);
            });
        }
    }
};