!function ($) {
    'use strict';
    var TabCollapse = function (el, options) {
        this.options = options;
        this.$tabs = $(el);
        this._accordionVisible = false;
        this._initAccordion();
        this._checkStateOnResize();
        setTimeout(function () {
            this.checkState();
        }.bind(this), 0);
    };

    /**
     *
     * @type {{accordionClass: string, tabsClass: string, tabContentSelector: null, updateLinks: null, accordionTemplate: accordionTemplate}}
     */
    TabCollapse.DEFAULTS = {
        accordionClass: 'dd-tabcollapse-acc',
        tabsClass: 'dd-tabcollapse-tab',
        tabContentSelector: null,
        updateLinks: null,
        accordionTemplate: function (heading, groupId, parentId, active) {
            return '<div class="card">' +
                '   <div class="card-header" role="tab">' +
                '      <span class="mb-0">' +
                '      </span>' +
                '   </div>' +
                '   <div id="' + groupId + '" role="tabpanel" class="collapse ' + (active ? 'show' : '') + '">' +
                '       <div class="card-body tab-collapse-panel-body">' +
                '       </div>' +
                '   </div>' +
                '</div>';
        }
    };

    /**
     * checkState
     */
    TabCollapse.prototype.checkState = function () {
        if (this.$tabs.is(':visible') && this._accordionVisible) {
            this.showTabs();
            this.$accordion.closest('.toolbox-element').removeClass('component-mobile-accordion');
            this._accordionVisible = false;
        } else if (this.$accordion.is(':visible') && !this._accordionVisible) {
            this.showAccordion();
            this.$accordion.closest('.toolbox-element').addClass('component-mobile-accordion');
            this._accordionVisible = true;
        }
    };

    /**
     * showTabs
     */
    TabCollapse.prototype.showTabs = function () {
        var view = this,
            $panelHeadings = this.$accordion.find('.tab-collapse-panel-heading').detach(),
            $panelBodies = this.$accordion.find('.tab-collapse-panel-body'),
            $tabContents = this.getTabContentElement();

        this.$tabs.trigger($.Event('show-tabs.bs.tab-collapse'));

        $panelHeadings.each(function () {
            var $panelHeading = $(this),
                $parentLi = $panelHeading.data('bs.tab-collapse.parent-li'),
                $oldHeading = view._panelHeadingToTabHeading($panelHeading);

            $parentLi.removeClass('active');
            if ($parentLi.parent().hasClass('dropdown-menu') && !$parentLi.siblings('li').hasClass('active')) {
                $parentLi.parent().parent().removeClass('active');
            }

            if (!$oldHeading.hasClass('collapsed')) {
                $parentLi.addClass('active');
                if ($parentLi.parent().hasClass('dropdown-menu')) {
                    $parentLi.parent().parent().addClass('active');
                }
            } else {
                $oldHeading.removeClass('collapsed');
            }

            $parentLi.append($panelHeading);
        });

        $panelBodies.each(function () {
            var $panelBody = $(this),
                $tabPane = $panelBody.data('bs.tab-collapse.tabpane');
            $tabPane.append($panelBody.contents().detach());
        });

        this.$accordion.html('');
        if (this.options.updateLinks) {

            $tabContents.find('[data-toggle-was="tab"], [data-toggle-was="pill"]').each(function () {
                var $el = $(this),
                    href = $el.attr('href').replace(/-collapse$/g, '');
                $el.attr({
                    'data-toggle': $el.attr('data-toggle-was'),
                    'data-toggle-was': '',
                    'data-parent': '',
                    href: href
                });
            });
        }

        this.$tabs.trigger($.Event('shown-tabs.bs.tab-collapse'));
    };

    /**
     * getTabContentElement
     * @returns {*}
     */
    TabCollapse.prototype.getTabContentElement = function () {
        var $tabContents = this.options.tabContentSelector ? $(this.options.tabContentSelector) : [];
        if ($tabContents.length === 0) {
            $tabContents = this.$tabs.siblings('.tab-content');
        }
        return $tabContents;
    };

    /**
     * showAccordion
     */
    TabCollapse.prototype.showAccordion = function () {
        var $headings = this.$tabs.find('li:not(.dropdown) [data-toggle="tab"], li:not(.dropdown) [data-toggle="pill"]'),
            view = this,
            parentId,
            $selector;

        this.$tabs.trigger($.Event('show-accordion.bs.tab-collapse'));

        $headings.each(function () {
            var $heading = $(this),
                $parentLi = $heading.parent();
            $heading.data('bs.tab-collapse.parent-li', $parentLi);
            view.$accordion.append(view._createAccordionGroup(view.$accordion.attr('id'), $heading.detach()));
        });

        if (this.options.updateLinks) {
            parentId = this.$accordion.attr('id');
            $selector = this.$accordion.find('.tab-collapse-panel-body');

            $selector.find('[data-toggle="tab"], [data-toggle="pill"]').each(function () {
                var $el = $(this),
                    href = $el.attr('href') + '-collapse';
                $el.attr({
                    'data-toggle-was': $el.attr('data-toggle'),
                    'data-toggle': 'collapse',
                    'data-parent': '#' + parentId,
                    href: href
                });
            });
        }

        this.$tabs.trigger($.Event('shown-accordion.bs.tab-collapse'));
    };

    /**
     *
     * _panelHeadingToTabHeading
     *
     * @param $heading
     * @returns {*}
     * @private
     */
    TabCollapse.prototype._panelHeadingToTabHeading = function ($heading) {
        var href = $heading.attr('href').replace(/-collapse$/g, '');
        $heading.attr({
            'data-toggle': 'tab',
            'href': href,
            'data-parent': ''
        });
        return $heading;
    };

    /**
     * _tabHeadingToPanelHeading
     *
     * @param $heading
     * @param groupId
     * @param parentId
     * @param active
     * @returns {*}
     * @private
     */
    TabCollapse.prototype._tabHeadingToPanelHeading = function ($heading, groupId, parentId, active) {
        $heading.addClass('tab-collapse-panel-heading ' + (active ? '' : 'collapsed'));
        $heading.attr({
            'data-toggle': 'collapse',
            'data-parent': '#' + parentId,
            'href': '#' + groupId
        });
        return $heading;
    };

    /**
     * _checkStateOnResize
     *
     * @private
     */
    TabCollapse.prototype._checkStateOnResize = function () {
        $(window).resize(function () {
            clearTimeout(this._resizeTimeout);
            this._resizeTimeout = setTimeout(function () {
                this.checkState();
            }.bind(this), 100);
        }.bind(this));
    };

    /**
     * _initAccordion
     *
     * @private
     */
    TabCollapse.prototype._initAccordion = function () {
        var randomString = function () {
            var result = '',
                possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < 5; i++) {
                result += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return result;
        };

        var srcId = this.$tabs.attr('id'),
            accordionId = (srcId ? srcId : randomString()) + '-accordion';

        this.$accordion = $('<div class="tabs ' + this.options.accordionClass + '" id="' + accordionId + '"></div>');
        this.$tabs.after(this.$accordion);
        this.$tabs.addClass(this.options.tabsClass);
        this.getTabContentElement().addClass(this.options.tabsClass);
    };

    /**
     * _createAccordionGroup
     *
     * @param parentId
     * @param $heading
     * @returns {*|jQuery|HTMLElement}
     * @private
     */
    TabCollapse.prototype._createAccordionGroup = function (parentId, $heading) {
        var tabSelector = $heading.attr('data-target'),
            active = $heading.data('bs.tab-collapse.parent-li').is('.active');

        if (!tabSelector) {
            tabSelector = $heading.attr('href');
            tabSelector = tabSelector && tabSelector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
        }

        var $tabPane = $(tabSelector),
            groupId = $tabPane.attr('id') + '-collapse',
            $panel = $(this.options.accordionTemplate($heading, groupId, parentId, active));
        $panel
            .find('.card-header >:first-child')
            .append(this._tabHeadingToPanelHeading($heading, groupId, parentId, active));
        $panel
            .find('.card-body')
            .append($tabPane.contents().detach())
            .data('bs.tab-collapse.tabpane', $tabPane);

        return $panel;
    };

    $.fn.tabCollapse = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('bs.tab-collapse'),
                options = $.extend({}, TabCollapse.DEFAULTS, $this.data(), typeof option === 'object' && option);
            if (!data) {
                $this.data('bs.tab-collapse', new TabCollapse(this, options));
            }
        });
    };

    $.fn.tabCollapse.Constructor = TabCollapse;

}(window.jQuery);