angular
    .module('app')
    .directive('categoryEditorModal', CategoryEditorModal);

CategoryEditorModal.$inject = ['$timeout', 'Modal'];

function CategoryEditorModal($timeout, Modal) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.Modal = Modal;
            scope.$watch('Modal.getTitle()', function(title) {
                if (title == 'category-editor-modal')
                    element.modal('show');
                else
                    element.modal('hide');
            });

            $(element).bind('hide.bs.modal', function() {
                $timeout(function() {
                    if (Modal.getTitle() == 'category-editor-modal')
                        Modal.closeAll();
                });
            });
        }
    };
}
