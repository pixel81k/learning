/*eslint strict: ["error", "global"]*/

'use strict';

websiteRouter.emit(
    'registerModule',
    AbstractModule.subclass({

        constructor: function() {

            AbstractModule.prototype.constructor.apply(this, arguments);

            this.set('name', 'main');
            this.bindEventHandlers();
        },

        bindEventHandlers: function() {

            this.on({

                'jqueryReady' : this.setup

            });

        },

        setup: function() {

            this.defaultMethod();
            //this.initEqualHeightElements();

        },

        defaultMethod: function() {

        },

        initEqualHeightElements: function() {

            if (this.getRouter().getHelper('settings').getSystemVar('editMode') === true) {
                return false;
            }

            $('.equal-height .equal-height-item').matchHeight({
                byRow: true
            });

        }

    })
);