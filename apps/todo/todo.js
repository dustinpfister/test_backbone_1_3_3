
var Item = Backbone.Model.extend({

        // these are the default values that will
        // be augmented with the object that is passed
        // to the constructor function
        defaults : {
            title : '',
            done : false
        },

        // setup the item
        set : function (obj) {

            for (var prop in obj) {

                this[prop] = obj[prop];

            }

        },

        // simple log method
        log : function () {

            console.log('title: ' + this.title + '; done: ' + this.done);

        }

    });

var blankItem = new Item();

blankItem.log();

var it = new Item({
        title : 'foo'
    });

it.log();
