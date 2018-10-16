
var View = Backbone.View.extend({

        el : $('#container'),

        events : {

            'click li' : 'onListClick'

        },

        onListClick : function (e) {

            console.log(e.target);
            this.render(e.target.innerText);

        },

        template : _.template('<p>selected: <%- text %></p>'),

        initialize : function () {

            this.render();

        },

        render : function (text) {

            text = text || 'none';

            this.$el.find('#disp').html(this.template({
                    text : text
                }));

        }

    });

// creating an instance of the Model
var app = new View();
