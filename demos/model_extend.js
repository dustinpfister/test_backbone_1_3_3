var Model = Backbone.Model.extend({

        clicks : 0,

        set : function (one, two) {

            console.log('setting up model:');

            this.clicks = 0;

        },

        user_action : function () {

            console.log('model user action:');

            this.clicks += 1;

        }

    });

var View = Backbone.View.extend({

        el : $('#container'),

        model : new Model(),

        template : _.template('<p>Clicks: <%- clicks %></p>'),

        events : {

            //'click #user_click' : 'user_click'
            "click #user_click" : "user_click"

        },

        initialize : function () {

            console.log('view started:');

            //this.input = this.$("#user_click");

            //this.listenTo(this.model, 'add', this.userAction);

            this.render();

        },

        render : function () {

            this.$el.find('#disp').html(this.template(this.model));

        },

        user_click : function () {

            console.log('user action:');

            this.model.user_action();
			this.render();

        }

    });

// creating an instance of the Model
var app = new View();
