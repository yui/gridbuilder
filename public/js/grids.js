/* 

Usage:
    var grid = new Grid({
        units: [
            '1/2',
            '1/4',
            '1/4'
        ],

        width: 940,
        usePixels: true 
    });

    console.log(Grid.toCSS());
    console.log(Grid.toHTML());

TODO: break out into Layout, Grid, and Unit classes
   - Layout: Container for grids, stores width and pixel/percent state
   - Grid: Container for units
   - Unit: Container for content
*/
function Grid(config) {
    this.init(config);
}

Grid.computePercent = function(span, total) {
    var val = Math.round(span/total * 10000000) / 100000;
    return val +'%';
};

Grid.computePixel = function(span, total, width) {
    var val = '';

    if (width !== 'auto') {
        val = width * Math.round(span/total * 1000000) / 1000000;
        val += 'px';
    }

    return val || 'auto';
};

Grid.prototype = {
    constructor: Grid,
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
                                Grid.computePixel(j, i, this.width) :
                                Grid.computePercent(j, i)
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