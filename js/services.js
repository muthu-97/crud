angular.module('bookApp.services',[]).factory('Book',function($resource){
    return $resource('http://localhost:5000/api/books/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});