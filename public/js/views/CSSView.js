YUI.add('cssView', function(Y, name) {
  var CSSView = Y.Base.create('cssView', Y.View, [], {
      initializer: function () {
          var model = this.get('model');

          // Re-render this view when the model changes, and destroy this view when
          // the model is destroyed.
          // model.after('columnsChange', this.render, this);
          // model.after('widthChange', this.render, this);
          // model.after('usePixelsChange', this.render, this);
          // model.after('isResponsiveChange', this.render, this);
          // model.after('mediaQueriesChange', this.render, this);
          model.after('cssChange', this.render, this);
      },

      render: function () {
          Y.log("Render CSS View");
          this.get("container").empty().set('text', this.get("model").get('css'));
          return this;
      },
      model: undefined,
  }, {
      ATTRS: {
          container: {
                  valueFn: function () {
                  return Y.one('#demo-css');
              }
          }
      }
  });

  
	Y.namespace("GB").CSSView = CSSView;
}, '0.0.1', {
	requires: ['node', 'view']
});

