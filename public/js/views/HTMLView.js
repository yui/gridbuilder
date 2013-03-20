/*
Copyright (c) 2012, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://yuilibrary.com/license/
*/
YUI.add('htmlView', function(Y, name) {
	var HTMLView = Y.Base.create('htmlView', Y.View, [], {
      initializer: function () {
          var model = this.get('model');
          model.after('cssChange', this.render, this);
      },

      render: function () {
          Y.log("Render HTML View");
          this.renderCols();
          return this;
      },

      renderCols: function () {
        var css = this.get("model").get('css');
        Y.one("#demo-grid-styles").empty().set('text', css);
        this.get("container").setHTML(this.toColumnsHTML());
        return this;
      },


      toColumnsHTML: function () {
        var model = this.get("model"),
        tagName = model.get("tagName"),
        classPrefix = model.get("classPrefix"),
        unitClassName = model.get("unitClassName"),
        className = model.get("className"),
        responsiveClassName = model.get("responsiveClassName"),
        columns = model.get("columns"),
        html = '<' + tagName + ' class="' +  classPrefix + className + '-' + responsiveClassName + '">',
        i,
        j,
        remCol,
        prefix  = classPrefix + unitClassName + '-' + '1' + '-' + columns;

        //loop through and create individual one
        for (i = 0; i < columns; i++) {
          html += '<div class="' + classPrefix + unitClassName + '-' + '1' + '-' + columns + '"><div class="demo-unit">.'+prefix+'</div></div>';
        }

        html += '</' + tagName + '>';
        return html;
      },

      model: undefined,
  }, {
      ATTRS: {
          container: {
                  valueFn: function () {
                  return Y.one('#d');
              }
          }
      }
  });
  
	Y.namespace("GB").HTMLView = HTMLView;
}, '0.0.1', {
	requires: ['node', 'view']
});

