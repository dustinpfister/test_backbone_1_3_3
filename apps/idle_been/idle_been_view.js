// The backbone View for Idle been
var View = Backbone.View.extend({

        // using the container element
        el : $('#container'),

        // the model will be the Model given above
        model : new Idle(),

        // use a template
        dispTemplate : _.template('<p>Beens: <%- beens %> (+<%- manRate %>)<\/p><p>Unlocked: <%- upgrades_unlocked %><\/p>'),

        upgradeTemplate : _.template('<li><%- desc %>; cost : <%- cost %>; count : <%- count %>; <input id=\"upgrade_<%- id %>\" type=\"button\" value=\"upgrade\"><\/li>'),

        // setup the event attachment
        events : {

            'click #user_click' : 'user_click'

        },

        // what to do for the first time
        initialize : function () {

            // for now just render the starting values of the model
            this.render();

        },

        // this is called whenever the display needs to update
        render : function () {

            var view = this;

            // update the display
            this.$el.find('#disp').html(this.dispTemplate(this.model.attributes));

            var html = '';
			
			// check unlocked
			//this.model.unlockedCheck();

            console.log(this.model.get('upgrades_unlocked'));

            this.model.get('upgrades_unlocked').forEach(function (uLockId) {

                var data = view.model.getUpgradeData(uLockId);

                html += view.upgradeTemplate(data);

            });

            this.$el.find('#upgrades_list').html(html);

            this.model.get('upgrades_unlocked').forEach(function (uLockId) {

                (function (data) {

                    $('#upgrade_' + data.id).get(0).addEventListener('click', function () {

                        console.log('user upgrade for: ' + data.id);

                        view.model.upgrade(data.id);
                        view.render();

                    });

                }
                    (view.model.getUpgradeData(uLockId)))

            });

        },

        // what to do when the
        user_click : function () {

            this.model.getBeens();
            this.render();

        }

    });

// creating an instance of the View, and also Model
var app = new View();
