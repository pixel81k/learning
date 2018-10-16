/*eslint strict: ["error", "global"]*/
/*eslint no-unused-vars: 0*/

'use strict';

var AbstractHelper = Stapes.subclass({

    constructor: function() {

        this.bindAbstractEventHandlers();

    },

    bindAbstractEventHandlers: function() {

        this.on({

            'change:name': function(helperName) {
                this.set('name', helperName);
            }

        });

    },

    getRouter: function() {

        return websiteRouter;

    }

});
