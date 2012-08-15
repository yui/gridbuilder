YUI.add('defaultMediaQueryView', function(Y, name) {

  var REMOVE = 'Remove',
  ADD = 'Add',

  DefaultMediaQueryView = Y.Base.create('defaultMediaQueryView', Y.View, [], {

    events: {
      "#dmq-phone": { click: 'phoneClicked' },
      "#dmq-phoneTablet": { click: 'phoneTabletClicked' },
      "#dmq-tablet": { click: 'tabletClicked' },
      "#dmq-default": { click: 'defaultClicked' },
    },

    //this object is updated when changes are being applied. If confirmed, the model is set to this model. 
    //Otherwise, this object is reset.
    newModel: {},

    initializer: function () {
      var model = this.get('model');
      this.newModel = this.get('model');
    },

    phoneClicked: function (e) {
      var value = e.target.get('value'),
      newModel = this.newModel;

      if (value === REMOVE) {
        newModel.phone = false;
        this._switchToAddButton(e.target);
      }
      else if (value === ADD) {
        newModel.phone = true;
        this._switchToRemoveButton(e.target);
      }
    },

    phoneTabletClicked: function (e) {
      var value = e.target.get('value'),
      newModel = this.newModel;

      if (value === REMOVE) {
        newModel.phoneTablet = false;
        this._switchToAddButton(e.target);
      }
      else if (value === ADD) {
        newModel.phoneTablet = true;
        this._switchToRemoveButton(e.target);
      }

    },

    tabletClicked: function (e) {
      var value = e.target.get('value'),
      newModel = this.newModel;

      if (value === REMOVE) {
        newModel.tablet = false;
        this._switchToAddButton(e.target);
      }
      else if (value === ADD) {
        newModel.tablet = true;
        this._switchToRemoveButton(e.target);
      }

    },

    defaultClicked: function (e) {
      var value = e.target.get('value'),
      newModel = this.newModel;

      if (value === REMOVE) {
        newModel.default = false;
        this._switchToAddButton(e.target);
      }
      else if (value === ADD) {
        newModel.default = true;
        this._switchToRemoveButton(e.target);
      }
    },

    _switchToAddButton: function (node) {
      node.addClass('dmq-add');
      node.set('value', ADD);
    },

    _switchToRemoveButton: function (node) {
      node.set('value', REMOVE);
    },

    //Returns ADD if bool=false, and REMOVE if bool=true. Used for substituting in the appropriate values
    //for buttons when constructing panel bodycontent
    _determineValue: function (o) {
      Y.log(o);
      var getText = function (bool) {
        return (bool) ? REMOVE : ADD;
      };

      return {
        phoneValue: getText(o.phone),
        phoneTabletValue: getText(o.phoneTablet),
        tabletValue: getText(o.tablet),
        defaultValue: getText(o.default)
      };

    },

    render: function () {
        Y.log("Render DefaultMediaQueryView");

        var model = this.get('model'),
        self = this,
        container = this.get("container"),
        template = this.get("template"),
        panel = this.get('panel');

        if (panel === undefined) {
          panel = new Y.Panel({
            srcNode: container,
            bodyContent: Y.Lang.sub(template, this._determineValue(model.toJSON())), 
            centered: true,
            width: '80%',
            visible: true,
            modal:true,
            buttons: {
              footer: [
                  {
                      name  : 'Cancel',
                      label : 'Cancel',
                      classNames: 'minibutton',
                      action: function (e) {
                        //reset newModel
                        self.newModel = model;
                        panel.hide();
                      }
                  },

                  {
                      name     : 'Confirm',
                      label    : 'Confirm',
                      classNames: 'minibutton notice',
                      action: function (e) {
                        self.fire('update', model);
                        self.set('model', self.newModel);
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
          panel.set('bodyContent', Y.Lang.sub(template, this._determineValue(model.toJSON())));
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
                  return Y.one('#default-media-query-view').getHTML();
              }
          },
          panel: {
            value: undefined
          }
      }
  });

  
    Y.namespace("GB").DefaultMediaQueryView = DefaultMediaQueryView;
}, '0.0.1', {
    requires: ['node', 'view', 'panel']
});

