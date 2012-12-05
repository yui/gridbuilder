YUI.add('editMediaQueryView', function(Y, name) {
  var EditMediaQueryView = Y.Base.create('editMediaQueryView', Y.View, [], {
      initializer: function () {
          var model = this.get('model');
      },

      render: function () {
          Y.log("Render EditMediaQueryView");

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
                        name  : 'Delete',
                        label : 'Delete',
                        classNames: 'minibutton delete yui3-u',
                        action: 'deleteMediaQuery'
                    },

                    {
                        name     : 'Ok',
                        label    : 'OK',
                        classNames: 'minibutton yui3-u',
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
                  return Y.one('#edit-media-query-view').getHTML();
              }
          },
          panel: {
            value: undefined
          }
      }
  });

  
    Y.namespace("GB").EditMediaQueryView = EditMediaQueryView;
}, '0.0.1', {
    requires: ['node', 'view', 'panel']
});

