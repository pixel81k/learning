/**
 *
 * DACHCOM.DIGITAL Javascript Website Structure for PIMCORE
 *
 * To learn more about Stapes go to http://hay.github.io/stapes/
 * or ask shagspiel@dachcom.com
 *
 */

/*eslint strict: ["error", "global"]*/
/*eslint one-var: ["error", "never"]*/
/*eslint no-unused-vars: 0*/

'use strict';

var mainRouter = Stapes.subclass({

    constructor: function() {

        this.bindEventHandlers();

    },

    bindEventHandlers: function() {

        this.on({

            'registerModule' : function(moduleClass) {

                var module = new moduleClass();

                this.push(
                    [{
                        'type' : 'module',
                        'name' : module.get('name'),
                        'class' : module
                    }]
                );

            },

            'registerHelper': function(helperClass) {

                var helper = new helperClass();

                this.push(
                    [{
                        'type' : 'helper',
                        'name' :  helper.get('name'),
                        'class' : helper
                    }]
                );

            },

            'registerModel': function(modelClass) {

                var model = new modelClass();

                this.push(
                    [{
                        'type' : 'model',
                        'name' :  model.get('name'),
                        'class' : model
                    }]
                );

            }
        });

    },

    getHelper: function(helperName) {

        var helper = this.filter(function(helper) {
            return helper.type === 'helper' && helper.name === helperName;
        });

        return helper[0].class;

    },

    getModule: function(moduleName) {

        var module = this.filter(function(module) {
            return module.type === 'module' && module.name === moduleName;
        });

        return module[0].class;

    }

});

var websiteRouter = new mainRouter();