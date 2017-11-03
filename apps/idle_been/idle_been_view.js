// The backbone View for Idle been
var View = Backbone.View.extend({

        // using the container element
        el : $('#container'),

        // the model will be the Model given above
        model : new Idle(),

        // use a template
        dispTemplate : _.template('<p>Beens: <%- beens %><\/p><p>Unlocked: <%- upgrades_unlocked %><\/p>'),

        upgradeTemplate : _.template('<li><%- desc %>; cost : <%- cost %> <input id=\"upgrade_<%- id %>\" type=\"button\" value=\"upgrade\"><\/li>'),

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

            var i = 0,
            upData;

            upData = this.model.get('upgrades_data')[i];
            html += this.upgradeTemplate(upData);

            console.log(html);

            this.$el.find('#upgrades_list').html(html);

            (function () {

                $('#upgrade_' + upData.id).get(0).addEventListener('click', function () {

                    console.log('user upgrade for: ' + upData.id);

                    view.model.user_upgrade(upData.id);

                });

            }
                (upData))

            console.log($('#upgrade_' + upData.id).get(0))

        },

        // what to do when the
        user_click : function () {

            this.model.manualGather();
            this.render();

        }

    });

// creating an instance of the View, and also Model
var app = new View();
