var Model = Backbone.Model.extend({

        set : function (one, two) {

            console.log('hello backbone!');

        }

    });

var View = Backbone.View.extend({

        el : $('#container'),

        template : _.template('<b><%- data %></b>'),

        initialize : function () {

            this.render();

        },

        render : function () {

            console.log('render');

            this.$el.html('hello world');

            console.log(this);

        }

    });

// creating an instance of the Model
var app = new View();
