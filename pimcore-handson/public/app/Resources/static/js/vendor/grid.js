/**
 * Plugin: Gaps
 * Author: DACHCOM.DIGITAL stefan hagspiel <hagspiel@dachcom.ch>
 *
 * Usage:
 *
 *  //toolbox
 *  $('.toolbox-columns .toolbox-column > .toolbox-element:last-child').toolboxGapDetector({});
 *
 *  //custom
 *  $('.dc-gap-container .dc-gap-element:last-child').toolboxGapDetector({});
 *
 */
(function ($, window) {
    'use strict';
    var pluginName = 'toolboxGapDetector',
        ToolboxGapDetector = function (elements, options) {
            this.$elements = elements;
            this.opts = {};
            this.init(options);
            this.monitor();

            //listen to resize!
            $(window).on('resize.toolbox-gap-detector', this.monitor.bind(this));

            //listen to bootstrap accordion / tab change
            $('body').on('shown.bs.collapse shown.bs.tab shown-tabs.bs.tab-collapse', this.monitor.bind(this));

        };

    ToolboxGapDetector.prototype = {

        init: function (options) {
            var plugin = this;
            if (typeof options === 'undefined') {
                options = {};
            }
            $.extend(plugin.opts, options);
        },

        monitor: function () {
            this.$elements.each(function () {
                var $el = $(this),
                    $parentColumn = $el.closest('[class*="col-"]'),
                    $nextColumn = $parentColumn.next('[class*="col-"]'),
                    offset, offset2;

                if ($nextColumn.length > 0) {
                    offset = $parentColumn.offset().left - $parentColumn.parent().offset().left;
                    offset2 = $nextColumn.offset().left - $nextColumn.parent().offset().left;
                    $el.toggleClass('force-margin', offset2 === offset);
                }
            });
        }
    };

    $.fn[pluginName] = function (options) {
        var plugin = this.data(pluginName);
        if (plugin instanceof ToolboxGapDetector) {
            if (typeof options !== 'undefined') {
                plugin.init(options);
            }
        } else {
            plugin = new ToolboxGapDetector(this, options);
            this.data(pluginName, plugin);
        }

        return plugin;
    };

}(jQuery, window, document));
