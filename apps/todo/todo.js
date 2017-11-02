
var Item = Backbone.Model.extend({

        // these are the default values that will
        // be augmented with the object that is passed
        // to the constructor function
        defaults : {
            title : 'unknown',
            done : false,
            time : new Date(0)
        },

        // making a custom constructor
        constructor : function () {

            // Go ahead and apply what there is like normal
            Backbone.Model.apply(this, arguments);

            // but set the time to now
            this.set('time', new Date());

        },

        // simple log method
        log : function () {

            console.log('title: ' + this.get('title') + '; done: ' + this.get('done'));

        }

    });

var blankItem = new Item();

console.log(blankItem.get('time')); // the time it was created

var later = function () {

    var it = new Item({
            title : 'foo'
        });

    console.log(it.get('time')); // the time it was created

};

setTimeout(later, 3000);
