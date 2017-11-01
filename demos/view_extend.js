
var View = Backbone.View.extend({

        el : $('#container'),

        template : _.template('<p>Clicks: <%- clicks %></p>'),

        initialize : function () {

            this.render();

        },

        render : function () {

            this.$el.html(this.template({clicks: 0}));

        }

    });

// creating an instance of the Model
var app = new View();
