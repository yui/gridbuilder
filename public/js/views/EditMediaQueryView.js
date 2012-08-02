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
            panel = new Y.Panel({
              srcNode: container,
              headerContent: '<h3 class="yui3-u-1">Edit Media Query</h3>',
              bodyContent: Y.Lang.sub(template, {id: model.get('id')}), 
              centered: true,
              width: 400,
              modal:true,
              buttons: {
                footer: [
                    {
                        name  : 'cancel',
                        label : 'Cancel',
                        action: function(e) {
                          panel.hide();
                        }
                    },

                    {
                        name     : 'proceed',
                        label    : 'OK',
                        action   : 'onOK'
                    }
                ]
            }
            });

            this.set("panel", panel);
            panel.render();
          }

          else {
            panel.set('bodyContent', Y.Lang.sub(template, {id: model.get('id')}));
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

