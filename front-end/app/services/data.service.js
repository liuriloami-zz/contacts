angular
    .module('app')
    .service('Data', DataService);

function DataService($http) {
    var data = this;

    data.categories = [];
    data.contacts = [];

    data.getCategories = function() {
        return this.categories;
    };

    data.getContacts = function() {
        return this.contacts;
    };

    data.refreshCategories = function(categories) {
        this.categories = categories;
    };

    data.refreshContacts = function(contacts) {
        this.contacts = contacts;
    };

    data.open = function(title, data) {
        this.title = title;
        if (data)
            this.data = data;
        else
            this.data = {};
    };

    data.closeAll = function() {
        this.title = '';
        this.data = {};
    }

    data.setData = function(data) {
        this.data = data;
    }

    $http.get('http://54.233.113.143:4243/', {})
    .success(function(response, status) {
        data.refreshCategories(response.categories);
        data.refreshContacts(response.contacts);
    });
}
