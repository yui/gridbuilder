YUI.add('htmlView', function(Y, name) {
	var HTMLView = Y.Base.create('htmlView', Y.View, [], {
      initializer: function () {
          var model = this.get('model');
          model.after('cssChange', this.render, this);
      },

      render: function () {
          Y.log("Render HTML View");
          var css = this.get("model").get('css');
          Y.one("#demo-grid-styles").empty().set('text', css);
          this.get("container").setHTML(this.get("model").toColumnsHTML());
          return this;
      },
      model: undefined,
  }, {
      ATTRS: {
          container: {
                  valueFn: function () {
                  return Y.one('#demo-html');
              }
          }
      }
  });
  
	Y.namespace("GB").HTMLView = HTMLView;
}, '0.0.1', {
	requires: ['node', 'view']
});

