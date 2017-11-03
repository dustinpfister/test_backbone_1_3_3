
// The Model
var Idle = Backbone.Model.extend(

        // you want to give Model.extend an object
        // that will contain all of the methods,
        // and attributes that compose your Model
    {

        // set some defaults
        defaults : {

            beens : 0

        },

        // what to do if some kind of user action happens
        manualGather : function () {

            var beens = this.get('beens');

            beens += 1;

            this.set('beens', beens);

        }

    });

// create an instance of the Model
var game = new Idle();

console.log('beens: ' + game.get('beens')); // 0

// use a method
game.manualGather();

console.log('beens: ' + game.get('beens')); // 1

// The View
var View = Backbone.View.extend({

        // using the container element
        el : $('#container'),

        // the model will be the Model given above
        model : new Idle(),

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
            this.$el.find('#disp').html(this.template(this.model.attributes));

        },

        // what to do when the
        user_click : function () {

            this.model.manualGather();
            this.render();

        }

    });

// creating an instance of the View, and also Model
var app = new View();
