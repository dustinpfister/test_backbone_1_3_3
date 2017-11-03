
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

        initialize : function () {

            this.upgradeReset();

            console.log(this.get('upgrades_data'));

        },

        // items that help get some more beens
        upgrades : [

            // only one item for now
            {

                id : 'clone_self',
                desc : 'clone yourself',

                // defaults for the upgrade state
                defaults : {

                    cost : 10

                },

                // if the function returns true
                // the item is unlocked
                unlockIf : function (model) {

                    // this allows for be to define a condition
                    // that will allow for the item to be unlokced
                    if (model.get('beens') >= 10) {

                        return true;

                    }

                    return false;

                },

                // an initialize method for the item
                init : function (model) {

                    var data = model.getUpgradeData(this.id),

                    upData,

                    // make a clone of the defaults for this upgrade
                    state = _.clone(this.defaults);

                    // the number of times upgraded should always be 0
                    state.count = 0;

                    // set the id, and desc to the values of this upgrade
                    state.id = this.id;
                    state.desc = this.desc;

                    // if we have a data object all ready
                    if (data) {

                        // just set to the new state
                        data = state;

                    } else {

                        // else push in a new one
                        upData = model.get('upgrades_data');

                        upData.push(state);

                        model.set('upgrades_data', upData);

                    }

                }

            }

        ],

        // get the upgrade data object for the given id
        getUpgradeData : function (id) {

            var data = this.get('upgrades_data'),
            i = 0,
            len = data.length;
            while (i < len) {

                if (data[i].id === id) {

                    return data[i];

                }

                i += 1;
            }

            return false;

        },

        // reset the data objects for a given upgrade id or all
        upgradeReset : function (id) {

            var model = this;

            // reset all
            this.upgrades.forEach(function (upgrade) {

                upgrade.init(model);

            });

        },

        // user upgrade for given id
        user_upgrade : function (id) {

            console.log('yes this is model');
            console.log(id);

            var data = this.getUpgradeData(id);

            if (data) {

                data.count += 1;
				
				console.log(data);

            } else {

                console.log('data for upgrade not found!');

            }

        },

        // update items_unlocked array
        unlockedCheck : function () {

            var model = this,

            unlocked = [];

            this.upgrades.forEach(function (upgrade) {

                if (upgrade.unlockIf(model)) {

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
