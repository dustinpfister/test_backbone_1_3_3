
var View = Backbone.View.extend({

        el : $('#container'),

        initialize : function () {

            this.render();

        },

        render : function () {

            this.$el.html('hello world');

        }

    });

// creating an instance of the Model
var app = new View();
