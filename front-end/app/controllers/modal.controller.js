angular
    .module('app')
    .controller('ModalController', ModalController);

ModalController.$inject = ['$scope', 'Modal', 'Data', '$http'];

function ModalController($scope, Modal, Data, $http) {
    $scope.Data = Data;
    $scope.Modal = Modal;

    $scope.$watch('Modal.getData()', function(data) {
        $scope.data = data;
    });

    $scope.confirmDeleteCategory = function() {
        Modal.open('category-delete-modal', $scope.data);
    };

    $scope.deleteCategory = function() {
        $http.delete('http://54.233.113.143:4243/category/' + $scope.data._id)
        .success(function(response, status) {
            Data.refreshCategories(response.categories);
            Data.refreshContacts(response.contacts);
            Modal.closeAll();
        });
    };

    $scope.saveCategory = function() {
        $http.post('http://54.233.113.143:4243/category', { form: $scope.data })
        .success(function(response, status) {
            Data.refreshCategories(response.categories);
            Data.refreshContacts(response.contacts);
            Modal.closeAll();
        });
    };

    $scope.confirmDeleteContact = function() {
        Modal.open('contact-delete-modal', $scope.data);
    };

    $scope.deleteContact = function() {
        $http.delete('http://54.233.113.143:4243/contact/' +  + $scope.data._id)
        .success(function(response, status) {
            Data.refreshContacts(response.contacts);
            Modal.closeAll();
        });
    };

    $scope.saveContact = function() {
        console.log($scope.data);
        $http.post('http://54.233.113.143:4243/contact', { form: $scope.data })
        .success(function(response, status) {
            Data.refreshContacts(response.contacts);
            Modal.closeAll();
        });
    };

    $scope.hasCategory = function(category) {
        for (var i = 0; i < $scope.data.categories.length; i++)
            if ($scope.data.categories[i] == category._id)
                return true;
        return false;
    };

    $scope.toggleCategory = function(category) {
        if (!$scope.data.categories)
            $scope.data.categories = [];
        for (var i = 0; i < $scope.data.categories.length; i++)
            if ($scope.data.categories[i] == category._id) {
                $scope.data.categories.splice(i, 1);
                return;
            }
        $scope.data.categories.push(category._id);
    };
}
