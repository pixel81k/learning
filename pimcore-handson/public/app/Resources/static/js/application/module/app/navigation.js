/*eslint strict: ["error", "global"]*/

'use strict';

websiteRouter.emit(
    'registerModule',
    AbstractModule.subclass({

        indicators : [],
        animating : false,

        constructor: function() {

            AbstractModule.prototype.constructor.apply(this, arguments);

            this.set('name', 'navigation');
            this.bindEventHandlers();
        },

        bindEventHandlers: function() {

            this.on({

                'jqueryReady' : this.setup

            });

        },

        setup: function() {

            this.initDoubleTapToGo();
            this.initSnav();
            this.initMnav();
            this.initLnav();

        },

        initDoubleTapToGo: function () {

            if (this.getRouter().getHelper('settings').getSystemVar('editMode') === true) {
                return false;
            }

            $('.hnav-inner').doubleTapToGo({
                selectorChain: 'li:has(.submenu-wrapper)'
            });

        },

        initSnav: function() {
            var snav = $('.dd-snav'),
                mainItemsWidthChild = snav.find('li.has-child .dd-snav-lv1-item'),
                mainItemLink = mainItemsWidthChild.children('a'),
                activeItems =  mainItemsWidthChild.filter('.active');

            mainItemsWidthChild.on('click touchstart', function() {
                var childUl = $(this).next('ul');

                if($(this).hasClass('open')) {
                    $(this).removeClass('open');
                } else {
                    $(this).addClass('open');
                }

                childUl.slideToggle();
            });

            mainItemLink.on('click', function(e) {
                e.stopPropagation();
            });

            activeItems.addClass('open');

        },

        initMnav:function () {
            var mobileSidrNav = $('.js-sidr-mobile-trigger'),
                mnav = $('.dd-mnav'),
                mainItemsWidthChild = mnav.find('li.has-child .dd-mnav-lv1-item'),
                mainItemLink = mainItemsWidthChild.children('a'),
                activeItems =  mainItemsWidthChild.filter('.active');

            mobileSidrNav.sidr({
                name: 'sidr-mobile-nav',
                side: 'right',
                onOpen: function() {
                    $('body').addClass('sidr-init');
                }
            });

            $(window).on('resize', function() {
                $.sidr('close', 'sidr-mobile-nav');
            });

            // Android triggers resize on input:focus
            $('.dd-sidr input[type="text"]').on('click', function(){
                $(window).off('resize');
            });

            mainItemsWidthChild.on('click', function() {
                var childUl = $(this).next('ul');

                if($(this).hasClass('open')) {
                    $(this).removeClass('open');
                } else {
                    $(this).addClass('open');
                }

                childUl.slideToggle();
            });

            mainItemLink.on('click', function(e) {
                e.stopPropagation();
            });

            activeItems.addClass('open').next('ul').show();
        },

        initLnav:function() {

            var lnavSelect = $('.dd-lnav select');

            lnavSelect.on('change', function() {
                window.location.href = $(this).val();
            });

        }

    })
);