
// The Model
var Model = Backbone.Model.extend({

        clicks : 0,

        set : function (one, two) {

            this.clicks = 0;

        },

        user_action : function () {

            this.clicks += 1;

        }

    });

// The View
var View = Backbone.View.extend({

        // using the container element
        el : $('#container'),

        // the model will be the Model given above
        model : new Model(),

        // use a template
        template : _.template('<p>Clicks: <%- clicks %></p>'),

        // setup the event attachment
        events : {

            'click #user_click' : 'user_click'

        },

        // what to do for the first time
        initialize : function () {

            // for now just render the starting values of the model
            this.render();

        },

        // this is called whenever the display needs to update
        render : function () {

            // update the display
            this.$el.find('#disp').html(this.template(this.model));

        },

        // what to do when the
        user_click : function () {

            this.model.user_action();
            this.render();

        }

    });

// creating an instance of the View, and also Model
var app = new View();
