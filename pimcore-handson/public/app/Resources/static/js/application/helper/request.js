/**

 Do Ajax Request
 call this method like:

 this.getRouter().getHelper('request').makeRequest(
 {
     proxyController: 'product',
     proxyAction: 'load-property'
     test : 'auto' //custom property
 }).then(function(res){
   console.log( res );
});

 */

/*eslint strict: ["error", "global"]*/

'use strict';

websiteRouter.emit(
    'registerHelper',
    AbstractHelper.subclass({

        constructor: function() {

            AbstractHelper.prototype.constructor.apply(this, arguments);
            this.set('name', 'request');

        },

        makeRequest: function(data, ajaxUrl, method) {

            var settingsAjaxUrl = this.getRouter().getHelper('settings').getSystemVar('ajaxUrl'),
                url = ajaxUrl !== undefined ? ajaxUrl : (settingsAjaxUrl ? settingsAjaxUrl : false ),
                prom;

            if( url === false ) {
                return;
            }

            prom = $.ajax({
                url: url,
                method: method === undefined ? 'POST' : method,
                data: data
            });

            return prom;

        }

    })
);
