
// The Model
var Idle = Backbone.Model.extend(

        // you want to give Model.extend an object
        // that will contain all of the methods,
        // and attributes that compose your Model
    {

        // set some defaults
        defaults : {

            beens : 0,
            items_unlocked : [], // unlocked item desc
            items_data : []// an array of data objects for each item
        },

        items : [{

                id : 'clone_self',
                desc : 'clone yourself',

                // if the function returns true
                // the item is unlocked
                unlockIf : function () {

                    if (this.get('beens') >= 10) {

                        return true;

                    }

                    return false;

                }

            }

        ],

        // update items_unlocked array
        unlockedCheck : function () {

            var self = this;

            this.items.forEach(function (item) {

                console.log(item.unlockIf.call(self));

            })

        },

        // what to do if some kind of user action happens
        manualGather : function () {

            var beens = this.get('beens');

            beens += 1;

            this.set('beens', beens);

            this.unlockedCheck();

        }

    });
