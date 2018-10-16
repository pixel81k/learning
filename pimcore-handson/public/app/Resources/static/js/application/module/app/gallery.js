/*eslint strict: ["error", "global"]*/

'use strict';

websiteRouter.emit(
    'registerModule',
    AbstractModule.subclass({

        constructor: function() {

            AbstractModule.prototype.constructor.apply(this, arguments);

            this.set('name', 'gallery');
            this.bindEventHandlers();
        },

        bindEventHandlers: function() {

            this.on({

                'jqueryReady' : this.setup

            });

        },

        setup: function() {

            var $galleries = $('.light-box');

            $galleries.each(function() {

                var $g = $(this).lightGallery({

                    selector: '.item:not(.slick-cloned)',
                    download: true,
                    autoplay: false,
                    zoom: false,
                    progressBar: false,
                    thumbnail: false,
                    autoplayControls: false,
                    fullScreen: false,
                    hash: false,
                    pager: true,
                    share: false

                });

                //Sample Method
                // $g.on('onBeforeSlide.lg', _self.onBeforeSlide.bind(_self, $g));

                $g.on('onBeforeOpen.lg', function() {$('html').addClass('lg-act');});
                $g.on('onBeforeClose.lg', function() {$('html').removeClass('lg-act');});

            });

        }

        // onBeforeSlide: function($g) {
        //
        //     // var core = $g.data('lightGallery');
        //
        // }

    })
);
