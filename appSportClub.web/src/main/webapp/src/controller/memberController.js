/* ========================================================================
 * Copyright 2014 grupo15
 *
 * Licensed under the MIT, The MIT License (MIT)
 * Copyright (c) 2014 grupo15

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 * ========================================================================


Source generated by CrudMaker version 1.0.0.201408112050

*/
define(['controller/_memberController','delegate/memberDelegate'], function() {
    App.Controller.MemberController = App.Controller._MemberController.extend({

    postInit: function(options) {
            var self = this;
            this.listAgeTemplate = _.template($('#usuarioAgeList').html());
            this.listAgeModelClass = options.listModelClass;
     },
    
    _renderAge: function() {
            var self = this;
            /*Aqu� se utiliza el efecto gr�fico backbone deslizar. �$el� hace referencia al <div id=�main�> ubicado en el index.html. Dentro de este div se despliegue la tabla.*/
            this.$el.slideUp("fast", function() {
                /*Establece que en el <div> se despliegue el template de la variable ��. Como par�metros entran las variables establecidas dentro de los tags <%%> con sus valores como un objeto JSON. En este caso, la propiedad sports tendr� la lista que instanci� �sportSearch� en la variable del bucle <% _.each(sports, function(sport) { %>*/
 
                self.$el.html(self.listAgeTemplate({member: self.usuarioAgeModelList.models}));
                self.$el.slideDown("fast");
            });
        },
    
    usuarioAge: function(params) {
        //Elementos para invocar el servicio getSports
            if (params) {
                var data = params.data;
            }
            if (App.Utils.eventExists(this.componentId + '-' + 'instead-user-list')) {
                Backbone.trigger(this.componentId + '-' + 'instead-user-list', {view: this, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-user-list', {view: this, data: data});
                var self = this;
                if (!this.ageModelList) {
                    this.ageModelList = new this.listModelClass();
                }
                //se obtienen los deportes del servicio getSports
                this.ageModelList.fetch({
                    data: data,
                    success: function() {
                        var elementos = self.ageModelList.models;
                        //Ahora se instancia el nuevo modelo construido
                        self.usuarioAgeModelList = new App.Model.usuarioAgeList;
                        //Se itera sobre la variable elementos, que corresponden a la lista de modelos obtenida del servico REST getSports
                        _.each(elementos, function(d) {
                            //Se hace el c�lculo del nuevo campo
                            var today = new Date();
                            var anioHoy = today.getFullYear();
                            var nac = d.attributes.birthDate.split("/");
                            var anioNac = nac[2];
                            var age = ""+(anioHoy - parseInt(anioNac));

                            /*Ahora se instancia un SportPromModel, con un nuevo objeto JSON como par�metro como constructor (antes sportModel), extrayendo los datos de �d�.*/
                            var model = new App.Model.usuarioAgeModel({name: d.attributes.name, age: age});
                            //y se agrega finalmente a los modelos prom de la lista.
                            self.usuarioAgeModelList.models.push(model);
                        });
                        //Se invoca la funci�n de renderizado para que muestre los resultados en la nueva lista.
                        self._renderAge(params);
                        Backbone.trigger(self.componentId + '-' + 'post-member-list', {view: self});
                    },
                    error: function(mode, error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'user-list', view: self, error: error});
                    }
                });
            }
        }
    
    });
    return App.Controller.MemberController;
}); 
