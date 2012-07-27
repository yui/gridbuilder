// Create a new Y.PieModel class that extends Y.Model.
Y.GridModel = Y.Base.create('gridModel', Y.Model, [], {

  computePercent: function(span, total) {
    var val = Math.round(span/total * 10000000) / 100000;
    return val +'%';
  },

  computePixels: function(span, total, width) {
    var val = '';

    if (width !== 'auto') {
        val = width * Math.round(span/total * 1000000) / 1000000;
        val += 'px';
    }

    return val || 'auto';
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

}, {
  ATTRS: {
    // Add custom model attributes here. These attributes will contain your
    // model's data. See the docs for Y.Attribute to learn more about defining
    // attributes.
    className: {
      value: 'g'
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

    usePixels: {
      value: true
    },

    units: {
      value: [],
      validator: Y.Lang.isArray
    },

    columns: {
      value: 24
    }
  }
});