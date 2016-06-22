angular
    .module('app')
    .controller('ModalController', ModalController);

ModalController.$inject = ['$scope', 'Modal'];

function ModalController($scope, Modal) {
    $scope.data = {};
    $scope.Modal = Modal;

    $scope.$watch('Modal.getData()', function(data) {
        $scope.data = data;
    });

    $scope.confirmDeleteCategory = function() {
        Modal.open('category-delete-modal', $scope.data);
    };

    $scope.deleteCategory = function() {
        Modal.closeAll();
    };

    $scope.saveCategory = function() {
        Modal.closeAll();
    };

    $scope.confirmDeleteContact = function() {
        Modal.open('contact-delete-modal', $scope.data);
    };

    $scope.deleteCategory = function() {
        Modal.closeAll();
    };

    $scope.saveContact = function() {
        Modal.closeAll();
    };

    $scope.hasCategory = function(category) {
        for (var i = 0; i < $scope.data.categories.length; i++)
            if ($scope.data.categories[i]._id == category._id)
                return true;
        return false;
    };

    $scope.toggleCategory = function(category) {
        for (var i = 0; i < $scope.data.categories.length; i++)
            if ($scope.data.categories[i]._id == category._id) {
                $scope.data.categories.splice(i, 1);
                return;
            }
        $scope.data.categories.push(category);
    };
}
