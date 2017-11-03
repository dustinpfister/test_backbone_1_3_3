
// The Model
var Idle = Backbone.Model.extend(

        // you want to give Model.extend an object
        // that will contain all of the methods,
        // and attributes that compose your Model
    {

        // set some defaults
        defaults : {

            beens : 0,
            manRate : 1, // the manual rate
            upgrades_unlocked : [], // unlocked item desc
            upgrades_data : []// an array of data objects for each item
        },

        initialize : function () {

            this.upgradeReset();

        },

        // items that help get some more beens
        upgrades : [

            // only one item for now
            {

                id : 'clone_self',
                desc : 'clone yourself',

                // defaults for the upgrade state
                defaults : {

                    // id, desc, and count are set during init
                    cost : 10

                },

                // what to do each time the upgrades count is bumped up
                onUpgrade : function (model, data) {

                    console.log('I am the on upgrade method for ' + this.id);
                    console.log(model);
                    console.log(data);
                    console.log('**********');

                    // set manual rate base on state of upgrade
                    model.set('manRate', data.count + 1);

                    // update cost
                    data.cost = 10 + Math.pow(2, data.count);

                },

                // if the function returns true
                // the item is unlocked
                unlockIf : function (model) {

                    data = model.getUpgradeData(this.id);

                    // this allows for be to define a condition
                    // that will allow for the item to be unlokced
                    if (model.get('beens') >= data.cost) {

                        return true;

                    }

                    return false;

                }

            }

        ],

        // initialize an upgrade of the given upgrade object
        initUpgrade : function (upgrade) {

            var data = this.getUpgradeData(upgrade.id),

            upData,

            // make a clone of the defaults for this upgrade
            state = _.clone(upgrade.defaults);

            // the number of times upgraded should always be 0
            state.count = 0;

            // set the id, and desc to the values of this upgrade
            state.id = upgrade.id;
            state.desc = upgrade.desc;

            // if we have a data object all ready
            if (data) {

                // just set to the new state
                data = state;

            } else {

                // else push in a new one
                upData = this.get('upgrades_data');

                upData.push(state);

                this.set('upgrades_data', upData);

            }

        },

        // get an upgrade of the given id
        getUpgrade : function (id) {

            var i = 0,
            len = this.upgrades.length;
            while (i < len) {

                if (this.upgrades[i].id === id) {

                    return this.upgrades[i];

                }

                i += 1;
            }

            return false;

        },

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

                //upgrade.init(model);

                model.initUpgrade(upgrade);

            });

        },

        // user upgrade for given id
        user_upgrade : function (id) {

            // get the data object for the id
            var data = this.getUpgradeData(id),
            upgrade = this.getUpgrade(id),
            beens = this.get('beens');

            // if we have a data object for it
            if (data) {

                if (beens >= data.cost) {

                    data.count += 1;

                    beens -= data.cost;

                    upgrade.onUpgrade(this, data);

                    this.set('beens', beens);

                } else {

                    console.log('not enough beens');

                }

                console.log(data);

            } else {

                console.log('data for upgrade not found!');

            }

			// preform an unlock check
            this.unlockedCheck();

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

            beens += this.get('manRate');

            this.set('beens', beens);

            this.unlockedCheck();

        }

    });
