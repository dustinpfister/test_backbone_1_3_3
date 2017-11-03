
// The Model
var Idel = Backbone.Model.extend(
 
    {
 
        beens : 0,
 
        initilize : function (one, two) {
 
            this.beens = 0;
 
        },
 
        // what to do if some kind of user action happens
        manualGather : function () {
 
            this.beens += 1;
 
        }
 
    }
 
);

var game = new Idel();

console.log('beens: ' + game.beens);

game.manualGather();

console.log('beens: ' + game.beens);

// The View
var View = Backbone.View.extend({

        // using the container element
        el : $('#container'),

        // the model will be the Model given above
        model : new Idel(),

        // use a template
        template : _.template('<p>Beens: <%- beens %></p>'),

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

            this.model.manualGather();
            this.render();

        }

    });

// creating an instance of the View, and also Model
var app = new View();
