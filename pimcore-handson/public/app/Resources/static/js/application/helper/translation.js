/*eslint strict: ["error", "global"]*/

'use strict';

websiteRouter.emit(
    'registerHelper',
    AbstractHelper.subclass({

        constructor: function() {

            AbstractHelper.prototype.constructor.apply(this, arguments);
            this.set('name', 'translation');
        },

        getTranslation: function( module, key ) {

            var translations = this.getRouter().getHelper('settings').getSystemVar('translations');

            if( translations[ module ][ key ]){
                return translations[ module ][ key ];
            }

            return '';

        }

    })
);
