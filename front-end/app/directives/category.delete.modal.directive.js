angular
    .module('app')
    .directive('categoryDeleteModal', CategoryDeleteModal);

CategoryDeleteModal.$inject = ['$timeout', 'Modal'];

function CategoryDeleteModal($timeout, Modal) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.Modal = Modal;
            scope.$watch('Modal.getTitle()', function(title) {
                if (title == 'category-delete-modal')
                    element.modal('show');
                else
                    element.modal('hide');
            });

            $(element).bind('hide.bs.modal', function() {
                $timeout(function() {
                    if (Modal.getTitle() == 'category-delete-modal')
                        Modal.closeAll();
                });
            });
        }
    };
}
