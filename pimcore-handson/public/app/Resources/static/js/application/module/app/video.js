/*eslint strict: ["error", "global"]*/

'use strict';

websiteRouter.emit(
    'registerModule',
    AbstractModule.subclass({

        blocked : false,

        constructor: function() {

            AbstractModule.prototype.constructor.apply(this, arguments);

            this.set('name', 'video');
            this.setup();
        },

        setup: function() {

            $('.toolbox-video')
                .on( 'toolbox.video.youtube.lightbox', this.openYoutubeBox.bind(this))
                .on( 'toolbox.video.vimeo.lightbox', this.openVimeoBox.bind(this));

        },

        openYoutubeBox: function(ev, params) {

            if( this.blocked === true ) {
                return false;
            }

            this.openVideo( 'https://youtube.com/watch?v=' + params.videoId );
        },

        openVimeoBox: function(ev, params) {

            if( this.blocked === true ) {
                return false;
            }

            this.openVideo( 'https://vimeo.com/' + params.videoId );

        },

        openVideo: function( dataSrc ) {

            var $g;

            this.blocked = true;

            $g = $('<div/>', { 'class' : 'gallery toolbox-video-gallery'}).append( $('<div/>', { 'class' : 'item'}) ).appendTo($('body'));

            $g.lightGallery({
                selector: '.item',
                videoMaxWidth: '100%',
                zoom: false,
                fullScreen: false,
                share: false,
                youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 }
            }).on('onCloseAfter.lg', this.closeVideo.bind(this))
                .on('onBeforeOpen.lg', function() {$('html').addClass('lg-act');})
                .on('onBeforeClose.lg', function() {$('html').removeClass('lg-act');});

            $('.gallery.toolbox-video-gallery .item').attr('data-src', dataSrc).click();

        },

        closeVideo: function() {

            this.blocked = false;
            $('.gallery.toolbox-video-gallery').remove();

        }

    })
);
