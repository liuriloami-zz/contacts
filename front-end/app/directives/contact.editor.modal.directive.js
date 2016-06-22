angular
    .module('app')
    .directive('contactEditorModal', ContactEditorModal);

ContactEditorModal.$inject = ['$timeout', 'Modal'];

function ContactEditorModal($timeout, Modal) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.Modal = Modal;
            scope.$watch('Modal.getTitle()', function(title) {
                if (title == 'contact-editor-modal')
                    element.modal('show');
                else
                    element.modal('hide');
            });

            $(element).bind('hide.bs.modal', function() {
                $timeout(function() {
                    if (Modal.getTitle() == 'contact-editor-modal')
                        Modal.closeAll();
                });
            });
        }
    };
}
