/*
Copyright (c) 2012, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://yuilibrary.com/license/
*/
YUI.add('cssView', function(Y, name) {
  var CSSView = Y.Base.create('cssView', Y.View, [], {
      initializer: function () {
          var model = this.get('model');
          model.after('init', this.update, this);
          model.after('columnsChange', this.update, this);
          model.after('widthChange', this.update, this);
          model.after('usePixelsChange', this.update, this);
          model.after('isResponsiveChange', this.update, this);
          model.after('useDefaultMediaQueriesChange', this.update, this);
          model.after('classPrefixChange', this.update, this);
          model.after('classNameChange', this.update, this);
          model.after('unitClassNameChange', this.update, this);
          model.after('cssChange', this.render, this);

          Y.one("#css-toggle-chkbox").after("click", this.render, this);

      },

      // render: function () {
      //     Y.log("Render CSS View");
      //     this.get("container").empty().set('text', this.get("model").get('css'));
      //     return this;
      // },

      update: function () {
          Y.log("Updating Grid CSS...");
          var self = this;
          Y.io('public/handlebars/grid.handlebars', {
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

      render: function () {
          var checked = this.get('toggleBox').get('checked'),
              container = this.get('container'),
              minify = "minify",
              content = this.get('model').get('css');
              code = Y.Node.create('<pre><code id="rainbow" data-language="css"></code></pre>');

          container.empty();

          if (checked) {
            container.set('text', content);
            container.addClass(minify);
          }

          else {
            container.removeClass(minify).appendChild(code);
            Y.one('#rainbow').set('text', content);
            Rainbow.color();
          }

          return this;
      },

      toCSS: function(source) {
          var template = Y.Handlebars.compile(source),
          model = this.get('model'),
          css = template({
              width: model.get('width'),
              numColumns: model.get('columns'),
              usePixels: model.get("usePixels"),
              classPrefix: model.get("classPrefix"),
              unitClassName: model.get("unitClassName"),
              className: model.get("className"),
              offsetClassName: model.get("offsetClassName"),
              responsiveClassName: model.get("responsiveClassName"),
              isResponsive: model.get("isResponsive"),
              units: model.generateUnits(model.get("columns")),
              mediaQueries: model.get("mediaQueries"),
              useDefaultMediaQueries: model.get("useDefaultMediaQueries"),
              internalPrefix: model.get("_internalPrefix")
          });

          model.set("css", css);
          return css;
      },

      model: undefined,
  }, {
      ATTRS: {
          container: {
                valueFn: function () {
                return Y.one('#demo-css');
              }
          },

          toggleBox: {
            valueFn: function () {
              return Y.one("#css-toggle-chkbox");
            }
          }
      }
  });

  
  Y.namespace("GB").CSSView = CSSView;
}, '0.0.1', {
  requires: ['node', 'view']
});
