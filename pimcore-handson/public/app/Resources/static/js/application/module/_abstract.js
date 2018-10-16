/*eslint strict: ["error", "global"]*/
/*eslint no-unused-vars: 0*/

'use strict';

var AbstractModule = Stapes.subclass({

    constructor: function() {

        this.bindAbstractEventHandlers();

        $(function() { this.init(); }.bind(this) );

    },

    init: function() {

        this.emit('jqueryReady');
    },

    getRouter: function() {

        return websiteRouter;
    },

    bindAbstractEventHandlers: function() {

        this.on({

            'change:name': function(helperName) {
                this.set('name', helperName);
            }

        });

    }

});