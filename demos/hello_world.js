/*
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
 */

/*
var View = Backbone.View.extend({

el : $('#container'),

template : _.template('<p>message: <%- mess %></p>'),

initialize : function () {

this.render();

},

render : function () {

this.$el.html(this.template({mess:'hello template!'}));

}

});

// creating an instance of the Model
var app = new View();
 */

var Model = Backbone.Model.extend({

        hardMess : 'Hello Model! ', // a hard coded message
        mess : '', // the current message
        i : 0, // and index value

        // this method will be called once when an
        // instnace of the model is created
        set : function () {

            this.mess = this.hardMess;
            this.i = 0;

        },

        // set message basses on current index
        setMess : function () {

            this.mess = '';

            var i = 0,
            len = this.hardMess.length,
            ci = this.i;
            while (i < len) {

                this.mess += this.hardMess[ci];

                ci += 1;
                if (ci >= len) {

                    ci = 0;

                }

                i += 1;
            }

        },

        // what to do when there is a user action
        action : function () {

            // step index
            this.i += 1;

            // set back to zero if we reach the end
            if (this.i >= this.hardMess.length) {

                this.i = 0;

            }

            // set the message
            this.setMess();

        }

    });

var m = new Model();

console.log(m.i + ' : ' + m.mess); // 0 : Hello Model!

m.action();

console.log(m.i + ' : ' + m.mess); // 1 : ello Model! H


var View = Backbone.View.extend({

        // so my container element is still the container
        el : $('#container'),

        // I am now using the Model I made in this view
        model : new Model(),

        // same old template
        template : _.template('<p>message: <%- mess %></p>'),

        // So Now I am adding an event
        events : {

            // it is a click event, for the element
            // with an id of action, and I am calling
            // the onAction method of this view when
            // it happens.
            'click #action' : 'onAction'

        },

        initialize : function () {

            this.render();

        },

        render : function () {

            // now I am finding the display element in the container
            // and I am updating the template with the instance of my Model
            this.$el.find('#disp').html(this.template(this.model));

        },

        // the onAction method
        onAction : function () {

            console.log('action!');

            // call the action method of the model
            this.model.action();

            // render again.
            this.render();

        }

    });

// creating an instance of the Model
var app = new View();
