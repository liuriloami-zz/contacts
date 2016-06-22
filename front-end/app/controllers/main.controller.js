angular
    .module('app')
    .controller('MainController', MainController);

MainController.$inject = ['$scope', 'Modal'];

function MainController($scope, Modal) {
    $scope.current_category = null;
    $scope.search = '';

    $scope.categories = [
        { _id: 0, name: 'Família' },
        { _id: 1, name: 'São Carlos' },
        { _id: 3, name: 'Intercâmbio' },
        { _id: 2, name: 'Águas de Lindoia' }
    ];

    $scope.contacts = [
        { _id: 0, name: 'Liuri Loami Ruyz Jorge', email: 'liuriloami@gmail.com', categories: [] },
        { _id: 1, name: 'Anna Flávia Zimmermann Brandão', email: 'annaflaviaz@gmail.com', categories: [] },
        { _id: 2, name: 'Matheus Connolyn', email: 'connolyn27@gmail.com', categories: [] },
        { _id: 3, name: 'Girselia Ruyz Jorge', email: 'girseliaruyz@hotmail.com', categories: [] },
        { _id: 4, name: 'Mateus Frederico de Paula', email: 'mateusfpaula@gmail.com', categories: [] }
    ];

    var hasCategory = function(list, _id) {
        for (var i = 0; i < list.length; i++)
            if (list[i]._id == _id)
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
