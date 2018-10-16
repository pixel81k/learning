/*eslint strict: ["error", "global"]*/

'use strict';

websiteRouter.emit(
    'registerHelper',
    AbstractHelper.subclass({

        constructor: function() {

            AbstractHelper.prototype.constructor.apply(this, arguments);

            this.set('name', 'settings');
            this.setSystemVariables();

        },

        setSystemVariables: function() {
            var isEditMode =  typeof _PIMCORE_EDITMODE !== 'undefined' && _PIMCORE_EDITMODE === true, // eslint-disable-line no-undef
                websiteConfig = typeof WEBSITE_CONFIG !== 'undefined' ? WEBSITE_CONFIG : null; // eslint-disable-line no-undef

            if( websiteConfig !== null) {

                websiteConfig.editMode = isEditMode;
                this.set('websiteConfig', websiteConfig);

            }

        },

        getSystemVar: function( variable ) {

            var systemVars = this.get('websiteConfig');

            if( systemVars[ variable ] !== undefined) {
                return systemVars[ variable ];
            }

            throw new Error('systemVar "' + variable + '" has not been found.');

        }

    })
);
