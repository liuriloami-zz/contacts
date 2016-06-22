angular
    .module('app')
    .directive('contactDeleteModal', ContactDeleteModal);

ContactDeleteModal.$inject = ['$timeout', 'Modal'];

function ContactDeleteModal($timeout, Modal) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.Modal = Modal;
            scope.$watch('Modal.getTitle()', function(title) {
                if (title == 'contact-delete-modal')
                    element.modal('show');
                else
                    element.modal('hide');
            });

            $(element).bind('hide.bs.modal', function() {
                $timeout(function() {
                    if (Modal.getTitle() == 'contact-delete-modal')
                        Modal.closeAll();
                });
            });
        }
    };
}
