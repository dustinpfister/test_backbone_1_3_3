
var Angle = Backbone.Model.extend({

        // some defaults set with a function
        defaults : {

            mode : 'deg',
            angle : 46

        },

        normalize : function () {

            // if degrees
            if (this.get('mode') === 'deg') {

                this.set('angle', this.get('angle') % 360);

            } else {

                // else radians

                this.set('angle', this.get('angle') % (Math.PI * 2));

            }

        },

        initialize : function () {

            // what is written here is called once
            // each time a new instnace of the
            // model is made

            // normalize the angle given.
            this.normalize();

        }

    });

var a = new Angle({angle : 810});

console.log(a.get('angle')); // 90

var r = new Angle({mode:'rad', angle: Math.PI * 2.5});

console.log(r.get('angle')); // 1.57...
