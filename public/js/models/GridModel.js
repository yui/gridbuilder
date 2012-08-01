YUI.add('gridModel', function(Y, name) {
    var GridModel = Y.Base.create('gridModel', Y.Model, [], {

      computePercent: function(span, total) {
        var val = Math.round(span/total * 10000000) / 100000;
        return val +'%';
      },

      computePixel: function(span, total, width) {
        var val = '';

        if (width !== 'auto') {
            val = width * Math.round(span/total * 1000000) / 1000000;
            val += 'px';
        }

        return val || 'auto';
      },


      //Returns the entire CSS string. This means everything. 
      toCSS: function() {
        var classPrefix = this.get("classPrefix"),
            unitClassName = this.get("unitClassName"),
            columns = this.get("columns"),
            usePixels = this.get("usePixels"),
            width = this.get("width"),
            internalPrefix = this.get("_internalPrefix"),
            standardStyles = this.get("_standardStyles"),

            //Pre-populate the CSS string with styles for yui3-g, yui3-u and yui3-u-1.
            css = this.get("_whiteSpaceCollapse"),

            i, 
            j,
            k,
            unitsArr = [];

        //Construct the units array based on the number of columns
        for (i = 1; i <= columns; i++) {
            for (j = 1; j < i; j++) {
                if (j === 1 || i % j !== 0) { // skip reducible
                    if (!(i % 2 === 0 && j % 2 === 0)) {
                        unitsArr.push(j + '/' + i);
                    }
                }
            }
        }
        
        this.set("units", unitsArr);

        //Apply the common styles. First, Add the yui3-u-1 to the list.
        css += internalPrefix + '.' + classPrefix + unitClassName + '-1, ';

        Y.Array.each(unitsArr, function(item,  index, array) {
            var u = item.split('/');
            css += internalPrefix + '.' + classPrefix + unitClassName + '-' + u[0] + '-' + u[1];

            //If this is not the last unit in the array, add a comma
            if (array[index + 1]) {
                css += ', ';
            }
            else {
                css += '{' + standardStyles + '}\n';
            }

        }, this);

        /* The following section applies the specific styles. */

        //Add the .yui3-u-1 styles.
        css += internalPrefix + '.' + classPrefix + unitClassName + '-1 {display:block;} \n';


        Y.Array.each(unitsArr, function(item,  index, array) {
            var u = item.split('/');
            css += internalPrefix + '.' + classPrefix + unitClassName + '-' + u[0] + '-' + u[1] + ' {width: ' + (
                (usePixels) ?
                    this.computePixel(u[0], u[1], width) :
                    this.computePercent(u[0], u[1])
                ) + ';} \n';
        }, this);

        //add in responsive css
        css += this.toResponsiveCSS();

        //add in offsets
        css += this.generateOffsets();
        this.set('css', css);
        return css;
      },

      generateOffsets: function () {
        var classPrefix = this.get("classPrefix"),
            offsetClassName = this.get("offsetClassName"),
            columns = this.get("columns"),
            usePixels = this.get("usePixels"),
            width = this.get("width"),
            internalPrefix = this.get("_internalPrefix"),
            css = '',
            i, 
            j,
            units = this.get("units");

        for (i = 1; i <= columns; i++) {
            for (j = 1; j < i; j++) {
                if (j === 1 || i % j !== 0) { // skip reducible
                    if (!(i % 2 === 0 && j % 2 === 0)) {
                        css += internalPrefix + '.' + classPrefix + offsetClassName + '-' + j + '-' + i + ' {margin-left: ' + (
                            (usePixels) ?
                                this.computePixel(j, i, width) :
                                this.computePercent(j, i)
                            ) + ';}\n';
                    }
                }
            }
        }

        return css;
      },

      toResponsiveCSS: function() {

        var classPrefix = this.get("classPrefix"),
            className = this.get("className"),
            unitClassName = this.get("unitClassName"),
            columns = this.get("columns"),
            usePixels = this.get("usePixels"),
            width = this.get("width"),
            internalPrefix = this.get("_internalPrefix"),
            isResponsive = this.get("isResponsive"),
            mediaQueries = this.get("mediaQueries"),
            responsiveClassName = this.get("responsiveClassName"),
            i,
            j,
            css = '',
            currentQuery = undefined,
            currentCollapse = undefined;

        //Add Responsive CSS if needed
        if (isResponsive && mediaQueries.length > 0) {

            Y.log("Responsive, updating CSS");

            for (i = 0; i < mediaQueries.length; i++) {
                currentQuery = mediaQueries[i];

                //Set up the media query
                css += '@media';

                if (currentQuery.min && currentQuery.max) {
                    css += '(min-width: ' + currentQuery.min + 'px) and (max-width: ' + currentQuery.max + 'px) {';
                }
                else if (currentQuery.min) {
                    css += '(min-width: ' + currentQuery.min + 'px) {';
                }
                else if (currentQuery.max) {
                    css += '(max-width: ' + currentQuery.max + 'px) {';
                }

                if (currentQuery.collapse === 'all') {
                    currentQuery.collapse = this.get("units");
                }


                //Add the image width-styling.
                //css += 'img.' + classPrefix + unitClassName + '-' + responsiveClassName + ' {max-width: 100%; } \n';

                Y.log("Adding Responsive for units: " + currentQuery.collapse);
                //Go through all the collapsable elements and set rules for them.
                for (j = 0; j < currentQuery.collapse.length; j++) {
                    currentCollapse = currentQuery.collapse[j].split('/');

                    //.yui3-g-responsive > yui3-u-x-y
                    css += internalPrefix + '.' + classPrefix + className + '-' + responsiveClassName + 
                            ' > .' + classPrefix + unitClassName + '-' + currentCollapse[0] + '-' + currentCollapse[1];

                    //if there is another element, add the comma. otherwise dont.
                    if (currentQuery.collapse[j+1] !== undefined) {
                        css += ', ';
                    }
                    else {
                        css += '{width: 100%;}'
                    }
                }

                //Closing bracket for the media query.
                css += '}\n';
            }
        }
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
        ratio,
        i;

        for (i = 0; i < columns; i++) {
            html += '<div class="' + classPrefix + unitClassName +
                    '-' + '1' + '-' + columns + '"><div class="demo-unit"></div></div>';
        }

        html += '</div>';
        return html;
      },

      toHTML: function() {
        var tagName = this.get("tagName"),
        classPrefix = this.get("classPrefix"),
        unitClassName = this.get("unitClassName"),
        className = this.get("className"),
        units = this.get("units"),
        html = '<' + tagName + ' class="' +  classPrefix +
                   className + '">',
        ratio,
        i;

        for (i = 0; i < units.length; i++) {
            ratio = units[i].split('/');
            html += '<div class="' + classPrefix + unitClassName +
                    '-' + ratio[0] + '-' + ratio[1] + '"><div class="demo-unit"></div></div>';
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
          value: 'auto'
        },

        classPrefix: {
          value: 'yui3-'
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
          value: 24,
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
        },

        //This prefix allows the grid CSS to be contextually set to the demo area on the app.
        _internalPrefix: {
            value: '#demo '
        },

        //A set of standard styles that are applied to every unit element. Essentially, it's the inline-block and letter-spacing.
        _standardStyles: {
            value: 'display: inline-block; zoom: 1; *display: inline; letter-spacing: normal; word-spacing: normal; vertical-align: top;'
        },

        _whiteSpaceCollapse: {
            value: '.yui3-g, .yui3-g-responsive {letter-spacing: -0.31em; *letter-spacing: normal; word-spacing: -0.43em; }.yui3-u {display: inline-block;zoom: 1; *display: inline;letter-spacing: normal;word-spacing: normal;vertical-align: top;}\n'
        }

      }
    }); 
    
    Y.namespace("GB").GridModel = GridModel;
}, '0.0.1', {
    requires: ['model']
});

