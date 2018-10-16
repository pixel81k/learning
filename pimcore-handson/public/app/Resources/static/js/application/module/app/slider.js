/*eslint strict: ["error", "global"]*/

'use strict';

websiteRouter.emit(
    'registerModule',
    AbstractModule.subclass({

        constructor: function() {
            AbstractModule.prototype.constructor.apply(this, arguments);
            this.set('name', 'slider');
            this.bindEventHandlers();
        },

        bindEventHandlers: function() {
            this.on({
                'jqueryReady' : this.setup
            });
        },

        setup: function() {

            /**
             * Activate this method, if you're using the Toolbox SlideColumns Element.
             */
            this.initSlideColumns();

            /**
             * Activate this method, if you're using the Toolbox Gallery Element.
             */
            this.initSlickGalleries();

        },

        initSlideColumns: function() {

            var _self = this,
                editMode = this.getRouter().getHelper('settings').getSystemVar('editMode'),
                $els = $('.toolbox-slide-columns .slide-columns');

            $els.each( function() {
                var $el = $(this);
                _self.getRouter().getHelper('system').elementIsReadyInEditMode( $el, '.pimcore_tag_block').then(
                    function() {
                        var $container = editMode ? $el.find('.pimcore_tag_block:first') : $el,
                            settings = {
                                mobileFirst: true,
                                slide: 'div',
                                speed: 150,
                                slidesToShow: $el.data('slides'),
                                accessibility: !editMode,
                                rows: 0,
                                infinite : !editMode //ALWAYS (!) disable infinite in edit mode!!
                            },
                            breakpoints = $el.data('breakpoints'),
                            breakpointSettings = [],
                            breakpointWidth;

                        for (breakpointWidth in breakpoints) {
                            if (!breakpoints.hasOwnProperty(breakpointWidth)) continue;
                            breakpointSettings.push({
                                breakpoint: parseInt( breakpointWidth ),
                                settings: breakpoints[ breakpointWidth ]
                            });

                            if ( breakpoints[ breakpointWidth ].hasOwnProperty('slidesToShow') ) {
                                delete settings.slidesToShow;
                            }
                        }

                        settings.responsive = breakpointSettings;
                        $container.on('init', function(ev, slick) {
                            //remove focus, because otherwise wysiwyg ckeditor does not work in slick!
                            if( editMode ) {
                                slick.$slider.off('focus.slick blur.slick', '*:not(.slick-arrow)');
                            }

                            if( !editMode && slick.$slider.closest('.toolbox-slide-columns').hasClass('equal-height')) {
                                slick.$slideTrack.find('.slick-slide').matchHeight({
                                    byRow: true
                                });
                            }
                        });

                        $container.slick(settings);
                    }
                );
            });
        },

        initSlickGalleries: function( $slickSlider ) {

            var daGenerator = this.getRouter().getHelper('dataAttributeGenerator'),
                isEditMode = this.getRouter().getHelper('settings').getSystemVar('editMode'),
                $slicks = $slickSlider !== null && $slickSlider !== undefined ? $slickSlider : $('.slick-slider:not(.slick-initialized)'),
                sliderStatus;

            $slicks.each(function() {

                var $s = $(this),
                    settings,
                    breakpointExistingIndex,
                    defaultResponsiveDots = {
                        breakpoint: 768,
                        settings: {
                            dots: true
                        }
                    };

                settings = daGenerator.getDataAttribute($s);

                if(isEditMode === true) {

                    // @FIXME
                    $(this).css('max-width', $(document).width());

                    if(settings.hasContentBlocks === true) {
                        $s = $(this).children('.pimcore_tag_block');
                    }

                    settings.rows = 0;              // ALWAYS(!) set rows to 0 in edit mode!
                    settings.accessibility = false; // ALWAYS(!) disable accessibility in edit mode!
                    settings.infinite = false;      // ALWAYS(!) disable infinite in edit mode!

                }

                if(settings.responsiveDots) {
                    if( settings.responsive === undefined ) {
                        settings.responsive = [ defaultResponsiveDots ];
                    } else {
                        breakpointExistingIndex = $.map(settings.responsive, function(obj,index) { if( obj.breakpoint === 768) { return index; } } );
                        if( breakpointExistingIndex[0] === undefined) {
                            settings.responsive.push( defaultResponsiveDots );
                        } else {
                            settings.responsive[ breakpointExistingIndex[0] ].settings.dots = true;
                        }
                    }
                }

                //add slider counter
                if (settings['sliderCounter'] === true) {
                    sliderStatus = $s.after( '<span class="slider-counter"></span>' ).parent().find('.slider-counter');
                    $s.on('init reInit afterChange', function (event, slick, currentSlide) {
                        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
                        var i = (currentSlide ? currentSlide : 0) + 1;
                        sliderStatus.text(i + '/' + slick.slideCount);
                    });
                }

                // add additional classes
                $s.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                    $s.find('.slick-slide.slide-out').removeClass('slide-out');
                    $s.find('.slick-slide.slide-in').removeClass('slide-in');
                    $(slick.$slides.get(currentSlide)).addClass('slide-out');
                    $(slick.$slides.get(nextSlide)).addClass('slide-in');

                });

                $s.on('afterChange', function() {
                    $s.find('.slick-slide.slide-out').removeClass('slide-out');
                    $s.find('.slick-slide.slide-in').removeClass('slide-in');
                });

                $s.slick(settings);

            });
        }
    })
);
