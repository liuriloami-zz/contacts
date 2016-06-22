angular
    .module('app')
    .controller('MainController', MainController);

MainController.$inject = ['$scope', 'Modal', 'Data'];

function MainController($scope, Modal, Data) {
    $scope.Data = Data;
    $scope.current_category = null;
    $scope.search = '';

    $scope.$watch('Data.getCategories()', function(categories) {
        $scope.categories = categories;
    }, true);

    $scope.$watch('Data.getContacts()', function(contacts) {
        $scope.contacts = contacts;
    }, true);

    var hasCategory = function(list, _id) {
        for (var i = 0; i < list.length; i++)
            if (list[i] == _id)
                return true;
        return false;
    };

    $scope.filteredContacts = function() {
        var filtered = [];
        for (var i = 0; i < $scope.contacts.length; i++) {
            var contact = $scope.contacts[i];
            if ($scope.current_category != null && !hasCategory(contact.categories, $scope.current_category))
                continue;
            if (contact.name.indexOf($scope.search) == -1 && contact.email.indexOf($scope.search) == -1)
                continue;
            filtered.push(contact);
        }
        return filtered;
    };

    $scope.selectCategory = function(category) {
        if (category != null)
            $scope.current_category = category._id;
        else
            $scope.current_category = null;
    };

    $scope.newCategory = function() {
        Modal.open('category-editor-modal', {});
    };

    $scope.editCategory = function(category) {
        Modal.open('category-editor-modal', category);
    };

    $scope.newContact = function() {
        Modal.open('contact-editor-modal', {});
    };

    $scope.editContact = function(contact) {
        Modal.open('contact-editor-modal', contact);
    };

    $scope.confirmDeleteContact = function(contact) {
        Modal.open('contact-delete-modal', contact);
    };
}
