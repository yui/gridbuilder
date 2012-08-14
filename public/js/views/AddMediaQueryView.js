YUI.add('addMediaQueryView', function(Y, name) {
  var AddMediaQueryView = Y.Base.create('addMediaQueryView', Y.View, [], {
      initializer: function () {
          var model = this.get('model');
      },

      render: function () {
          Y.log("Render AddMediaQueryView");

          var model = this.get('model'),
          container = this.get("container"),
          template = this.get("template"),
          panel = this.get('panel');

          if (panel === undefined) {
            console.log(model.toJSON());
            panel = new Y.Panel({
              srcNode: container,
              bodyContent: Y.Lang.sub(template, model.toJSON()), 
              centered: true,
              width: 500,
              modal:true,
              buttons: {
                footer: [
                    {
                        name  : 'Cancel',
                        label : 'Cancel',
                        classNames: 'minibutton',
                        action: function (e) {
                          panel.hide();
                        }
                    },

                    {
                        name     : 'Add',
                        label    : 'Add',
                        classNames: 'minibutton notice',
                        action: function(e) {
                          panel.hide();
                        }
                    }
                ]
            }
            });

            this.set("panel", panel);
            panel.render();
          }

          else {
            panel.set('bodyContent', Y.Lang.sub(template, model.toJSON()));
            panel.show();
          }
          return this;
      },
      model: undefined,
  }, {
      ATTRS: {
          container: {
            valueFn: function() {
              return Y.one('#panel-content')
            }
          },
          template: {
                  valueFn: function () {
                  return Y.one('#add-media-query-view').getHTML();
              }
          },
          panel: {
            value: undefined
          }
      }
  });

  
    Y.namespace("GB").AddMediaQueryView = AddMediaQueryView;
}, '0.0.1', {
    requires: ['node', 'view', 'panel']
});

