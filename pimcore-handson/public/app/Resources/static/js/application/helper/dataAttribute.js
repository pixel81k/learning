/*eslint strict: ["error", "global"]*/

'use strict';

websiteRouter.emit(
    'registerHelper',
    AbstractHelper.subclass({

        constructor: function() {

            AbstractHelper.prototype.constructor.apply(this, arguments);
            this.set('name', 'dataAttributeGenerator');

        },

        getDataAttribute: function($element) {

            var data = $element.data(),
                values = jQuery.each( data, function(key, value) {
                    data[key] = value;
                });

            return values;
        }

    })
);
