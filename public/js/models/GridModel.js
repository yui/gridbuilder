YUI.add('gridModel', function(Y, name) {
    var GridModel = Y.Base.create('gridModel', Y.Model, [], {


        initializer: function () {
            var self = this;

            this.after('columnsChange', this.update, this);
            this.after('widthChange', this.update, this);
            this.after('usePixelsChange', this.update, this);
            this.after('isResponsiveChange', this.update, this);
            this.after('useDefaultMediaQueriesChange', this.update, this);

            Y.Handlebars.registerHelper('computePercent', function (span, total) {
                var val = Math.round(span/total * 10000000) / 100000;
                return new Y.Handlebars.SafeString(val + '%');
            });

            Y.Handlebars.registerHelper('computePixel', function (span, total, width) {
                var val = '';
                if (width !== 'auto') {
                    val = width * Math.round(span/total * 1000000) / 1000000;
                    val += 'px';
                }

                return val || 'auto';
            });

            Y.Handlebars.registerHelper('groupUnits', function (classPrefix, unitClassName, unitsArr) {
                var i = 0, 
                    //add the first unit
                    str = '.' + classPrefix + unitClassName + '-1';

                for (; i < unitsArr.length; i++) {

                    str += '.' + classPrefix + unitClassName + '-' + unitsArr[i].span + '-' + unitsArr[i].total;
                    if (unitsArr[i+1] !== undefined) {
                        str += ', ';
                    }
                }

                return str;
            });

            Y.Handlebars.registerHelper('generateMediaQuery', function (min, max, collapse) {
                var str = '';
                if (min && max) {
                    str += '@media (min-width:' + min + 'px) and (max-width:' + max + 'px)';
                }
                else if (min && !max) {
                    str += '@media (min-width:' + min + 'px)';
                }
                else if (!min && max) {
                    str += '@media (max-width:' + max + 'px)';
                }

                return str;

            });


            //Fire off an initial grid
            this.update();
        },


        generateUnits: function(numCol) {
            var unitsArr = [];
            for (i = 1; i <= numCol; i++) {
                for (j = 1; j < i; j++) {
                    if (j === 1 || i % j !== 0) { // skip reducible
                        if (!(i % 2 === 0 && j % 2 === 0)) {
                            unitsArr.push({
                                span: j,
                                total: i
                            });
                        }
                    }
                }
            }

            return unitsArr;
        },

        update: function () {
            Y.log("Updating Grid...");
            var self = this;
            Y.io('../public/handlebars/grid.handlebars', {
                on: {
                    success: function(id, response) {
                        Y.log("Success with response");
                        self.toCSS(response.responseText);
                    },

                    failure: function (id, o, args) {
                        Y.log("Failed with status: " + o.statusText);
                    }

                }
            });
        },

        toCSS: function(source) {
            var template = Y.Handlebars.compile(source),
            css = template({
                width: this.get('width'),
                numColumns: this.get('columns'),
                usePixels: this.get("usePixels"),
                classPrefix: this.get("classPrefix"),
                unitClassName: this.get("unitClassName"),
                className: this.get("className"),
                offsetClassName: this.get("offsetClassName"),
                responsiveClassName: this.get("responsiveClassName"),
                isResponsive: this.get("isResponsive"),
                units: this.generateUnits(this.get("columns")),
                mediaQueries: this.get("mediaQueries"),
                useDefaultMediaQueries: this.get("useDefaultMediaQueries"),
                internalPrefix: this.get("_internalPrefix")
            });

            this.set("css", css);
            return css;
        },

        //Provides the HTML for the highest denominator columns (1-24 in a 24-col grid)
        toColumnsHTML: function() {
            var tagName = this.get("tagName"),
            classPrefix = this.get("classPrefix"),
            unitClassName = this.get("unitClassName"),
            className = this.get("className"),
            responsiveClassName = this.get("responsiveClassName"),
            columns = this.get("columns"),
            html = '<' + tagName + ' class="' +  classPrefix +
                       className + '-' + responsiveClassName + '">',
            i;

            for (i = 0; i < columns; i++) {
                html += '<div class="' + classPrefix + unitClassName +
                        '-' + '1' + '-' + columns + '"><div class="demo-unit"></div></div>';
            }

            html += '</div>';
            return html;
        }

    }, {
      ATTRS: {
        // Add custom model attributes here. These attributes will contain your
        // model's data. See the docs for Y.Attribute to learn more about defining
        // attributes.
        className: {
          value: 'g'
        },

        responsiveClassName: {
            value: 'responsive'
        },

        tagName: {
          value: 'div'
        },

        width: {
          value: 960
        },

        classPrefix: {
          value: 'y-'
        },

        unitClassName: {
          value: 'u'
        },

        offsetClassName: {
            value: 'offset'
        },

        usePixels: {
          value: true,
          validator: Y.Lang.isBoolean
        },

        units: {
          value: [],
          validator: Y.Lang.isArray
        },

        columns: {
          value: 12,
          validator: Y.Lang.isNumber
        },

        isResponsive: {
            value: false
        },

        css: {
            value: undefined
        },

        gutter: {
            value: 6
        },

        useDefaultMediaQueries: {
            value: {
                phone: false,
                phoneTablet: false,
                tablet: false,
                default: false
            }
        },

        _internalPrefix: {
            value: ''
        },

        /*
        Each mediaQuery object has 4 properties to generate the appropriate CSS:

        min: the min-width value (optional, but need either min or max supplied)
        max: the max-width value (optional, but need either min or max supplied)
        id: an ID just for display purposes
        collapse: an array of units which will be collapsed (eg: ['1/2', '1/4']. You can provide a string 'all' to collapse all the units on the grid.)

        */
        mediaQueries: {
            value: [],
            validator: Y.Lang.isArray
        }

      }
    }); 
    
    Y.namespace("GB").GridModel = GridModel;
}, '0.2.0', {
    requires: ['model', 'handlebars', 'io-base']
});

