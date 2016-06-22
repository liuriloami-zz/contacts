angular
    .module('app')
    .service('Modal', ModalService);

function ModalService() {
    this.title = '';
    this.data = {};

    this.getTitle = function() {
        return this.title;
    };

    this.getData = function() {
        return this.data;
    };

    this.open = function(title, data) {
        this.title = title;
        if (data)
            this.data = data;
        else
            this.data = {};
    };

    this.closeAll = function() {
        this.title = '';
        this.data = {};
    }

    this.setData = function(data) {
        this.data = data;
    }
}
