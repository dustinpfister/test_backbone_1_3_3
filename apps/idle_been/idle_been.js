
// The Model
var Idle = Backbone.Model.extend(

        // you want to give Model.extend an object
        // that will contain all of the methods,
        // and attributes that compose your Model
    {

        // set some defaults
        defaults : {

            beens : 0,
            upgrades_unlocked : [], // unlocked item desc
            upgrades_data : []// an array of data objects for each item
        },

        // items that help get some more beens
        upgrades : [

            // only one item for now
            {

                id : 'clone_self',
                desc : 'clone yourself',

                // if the function returns true
                // the item is unlocked
                unlockIf : function () {

                    // this allows for be to define a condition
                    // that will allow for the item to be unlokced
                    if (this.get('beens') >= 10) {

                        return true;

                    }

                    return false;

                },

                // an initialize method for the item
                init : function () {}

            }

        ],

        // update items_unlocked array
        unlockedCheck : function () {

            var self = this,

            unlocked = [];

            this.upgrades.forEach(function (upgrade) {

                if (upgrade.unlockIf.call(self)) {

                    unlocked.push(upgrade.id);

                }

            });

            // set the unlocked array
            this.set('upgrades_unlocked', unlocked);

        },

        // what to do if some kind of user action happens
        manualGather : function () {

            var beens = this.get('beens');

            beens += 1;

            this.set('beens', beens);

            this.unlockedCheck();

        }

    });
