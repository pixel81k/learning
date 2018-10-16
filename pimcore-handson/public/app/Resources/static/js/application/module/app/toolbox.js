/*eslint strict: ["error", "global"]*/

'use strict';

websiteRouter.emit(
    'registerModule',
    AbstractModule.subclass({

        constructor: function () {

            AbstractModule.prototype.constructor.apply(this, arguments);

            this.set('name', 'toolbox');
            this.bindEventHandlers();
        },

        bindEventHandlers: function () {

            this.on({

                'jqueryReady': this.setup

            });

        },

        setup: function () {

            this.initToolbox();
            this.initResponsiveTabs();
            this.initGaps();

        },

        initToolbox: function () {

            $.toolboxCore({
                videoHandler: {
                    enabled: true,
                    config: {
                        apiParameter: {
                            youtube: {
                                rel: 0 //disable related videos
                            },
                            vimeo: {}
                        }
                    }
                }
            });

        },

        initResponsiveTabs: function () {

            $('.nav-tabs').tabCollapse();

        },

        initGaps: function () {
            $('.toolbox-columns .toolbox-column > .toolbox-element:last-child').toolboxGapDetector({});
            $('.dc-gap-container .dc-gap-element:last-child').toolboxGapDetector({});
        }

    })
);
