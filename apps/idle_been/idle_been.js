
// The Model
var Idle = Backbone.Model.extend({

        // set some defaults
        defaults : {

            beens : 0, // the current about of beens
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

                model.initUpgrade(upgrade);

            });

        },

        // update items_unlocked array
        unlockedCheck : function () {

            var model = this,
            beens,
            data,
            unlocked = [];

            this.upgrades.forEach(function (upgrade) {

                // if the upgrade has a method use that
                //if (upgrade.unlockIf) {

                if (upgrade.unlockIf(model)) {

                    unlocked.push(upgrade.id);

                }
                /*
                } else {

                // else go by cost
                data = model.getUpgradeData(upgrade.id);
                beens = model.get('beens');

                if (beens >= data.cost) {

                unlocked.push(upgrade.id);

                }

                }
                 */

            });

            // set the unlocked array
            this.set('upgrades_unlocked', unlocked);

        },

        // user upgrade for given id
        upgrade : function (id) {

            var data,
            upgrade,
            beens;

            if (id) {

                // get the data object for the id
                data = this.getUpgradeData(id);
                upgrade = this.getUpgrade(id);
                beens = this.get('beens');

                // if we have a data object for it
                if (data) {

                    if (beens >= data.cost) {

                        data.count += 1;

                        beens -= data.cost;

                        upgrade.onUpgrade(this, data);

                        this.set('beens', beens);

                        // preform an unlock check
                        this.unlockedCheck();

                    } else {

                        return 'not enough beens';

                    }

                    return data;

                } else {

                    return 'not enough beens!';

                }

            } else {

                // if no id is given, list upgrades
                return this.get('upgrades_unlocked');
            }

        },

        // what to do if some kind of user action happens
        getBeens : function () {

            var beens = this.get('beens');

            beens += this.get('manRate');

            this.set('beens', beens);

            this.unlockedCheck();

            return beens;

        }

    });

var game = new Idle();
