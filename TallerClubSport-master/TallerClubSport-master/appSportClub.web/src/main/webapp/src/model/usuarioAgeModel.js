/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(['model/usuarioAgeModel'], function() {
    
    App.Model.usuarioAgeModel = Backbone.Model.extend({
        defaults: {
            'name' : '',
            'age' : ''
        },
        getDisplay: function(name){
            return this.get(name);
        }
    });
    App.Model.usuarioAgeList = Backbone.Collection.extend({
        model: App.Model.usuarioAgeModel
    });
    return App.Model.usuarioAgeModel;
});

