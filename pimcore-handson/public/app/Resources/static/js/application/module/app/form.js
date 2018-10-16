/*eslint strict: ["error", "global"]*/

'use strict';

websiteRouter.emit(
    'registerModule',
    AbstractModule.subclass({

        constructor: function () {

            AbstractModule.prototype.constructor.apply(this, arguments);

            this.set('name', 'form');
            this.bindEventHandlers();
        },

        bindEventHandlers: function () {

            this.on({

                'jqueryReady': this.setup

            });

        },

        setup: function () {

            $('form.formbuilder.ajax-form').formBuilderAjaxManager();
            $('form.formbuilder').formBuilderConditionalLogic();

            this.addFormBuilderListener();

        },

        addFormBuilderListener: function() {

            $('form.ajax-form').on('formbuilder.success', function(ev, message, redirect, $form) {
                var $el = $('<div/>', {'class' : 'form-success-wrapper', 'html' : message[0]['message'] });

                ev.preventDefault();


                $form.slideUp('normal', function() {
                    $el.insertBefore($(this));
                    $(this).remove();
                    $('html, body').animate({ scrollTop: $el.offset().top }, 450);
                });
            }).on('formbuilder.error', function(ev, message, $form) {
                var $el = $('<div/>', {'class' : 'alert alert-danger', 'html' : message });

                $('html, body').animate({
                    scrollTop: $(this).offset().top - $('header').height() - 10
                }, 450);
                $form.prepend($el);

            }).on('formbuilder.error-field', function(ev, data, $form) {
                $('html, body').animate({
                    scrollTop: $(this).offset().top - $('header').height() - 10
                }, 450);
                $form.addClass('was-validated');
                data.field.prev().addClass('init');
            });

        }

    })
);
