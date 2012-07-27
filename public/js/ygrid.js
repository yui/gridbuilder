YUI.add('grid', function(Y, name) {
    Y.Grid = function(config) {
        this.init(config);
    };

    Y.Grid.prototype = {
        constructor: Y.Grid,
        className: 'g',
        tagName: 'div',
        width: 'auto',
        classPrefix: 'yui3-',
        unitClassName: 'u',
        usePixels: false,
        units: null, // {} 
        columns: 24,

        init: function(config) {
            var prop;

            // copy config to instance
            for (prop in config) {
                // only copy members configured on prototype
                if (this.constructor.prototype.hasOwnProperty(prop)) {
                    this[prop] = config[prop];
                }
            }

            // one-off init for reference mutable properties
            this.units = config.units || [];
        },

        toCSS: function() {
            var css = '.' + this.classPrefix + this.unitClassName + '-1 {width: auto;}\n',
                i, j;

            for (i = 1; i <= this.columns; i++) {
                for (j = 1; j < i; j++) {
                    if (j === 1 || i % j !== 0) { // skip reducible
                        if (!(i % 2 === 0 && j % 2 === 0)) {
                            css += '.' + this.classPrefix + this.unitClassName + '-' + j + '-' + i + ' {width: ' + (
                                (this.usePixels) ?
                                    Y.Grid.computePixel(j, i, this.width) :
                                    Y.Grid.computePercent(j, i)
                                ) + ';}\n';
                        }
                    }
                }
            }

            return css;
        },

        toHTML: function() {
            var html = '<' + this.tagName + ' class="' +  this.classPrefix +
                       this.className + '">',
                ratio,
                i;

            for (i = 0; i < this.units.length; i++) {
                ratio = this.units[i].split('/');
                html += '<div class="' + this.classPrefix + this.unitClassName +
                        '-' + ratio[0] + '-' + ratio[1] + '"></div>';
            }

            html += '</div>';
            return html;
        }
    };

    Y.Grid.computePercent = function(span, total) {
        var val = Math.round(span/total * 10000000) / 100000;
        return val +'%';
    };

    Y.Grid.computePixel = function(span, total, width) {
        var val = '';

        if (width !== 'auto') {
            val = width * Math.round(span/total * 1000000) / 1000000;
            val += 'px';
        }

        return val || 'auto';
    };


}, '3.5.1', { requires: [] });