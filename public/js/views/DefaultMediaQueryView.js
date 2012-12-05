/*
Copyright (c) 2012, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://yuilibrary.com/license/
*/
YUI.add('defaultMediaQueryView', function(Y, name) {

  var REMOVE = 'Remove',
  ADD = 'Add',
  PHONE_INPUT_MAX = '#phone-query',
  PHONE_TABLET_INPUT_MAX = '#phone-tablet-query',
  TABLET_INPUT_MIN = '#tablet-min-query',
  TABLET_INPUT_MAX = '#tablet-max-query',
  DEFAULT_INPUT_MIN = '#default-query',

  DefaultMediaQueryView = Y.Base.create('defaultMediaQueryView', Y.View, [], {

    events: {
      "#dmq-phone": { click: 'phoneClicked' },
      "#dmq-phoneTablet": { click: 'phoneTabletClicked' },
      "#dmq-tablet": { click: 'tabletClicked' },
      "#dmq-default": { click: 'defaultClicked' },
    },

    //this object is updated when changes are being applied. If confirmed, the model is set to this model. 
    //Otherwise, this object is reset.
    dmqModel: {},

    initializer: function () {

      //Note that this model isnt the entire Y.GridModel - it's just whatever is in the 'useDefaultMediaQueries' attr.
      var model = this.get('model');
      this.dmqModel = this.get('model'),
      dmq = model.get('useDefaultMediaQueries');

    },

    phoneClicked: function (e) {
      var value = e.target.get('value'),
      dmqModel = this.dmqModel;

      if (value === REMOVE) {
        dmqModel.get('useDefaultMediaQueries').phone.active = false;
        this._switchToAddButton(e.target);
      }
      else if (value === ADD) {
        dmqModel.get('useDefaultMediaQueries').phone.active = true;
        this._switchToRemoveButton(e.target);
      }
    },

    phoneTabletClicked: function (e) {
      var value = e.target.get('value'),
      dmqModel = this.dmqModel;

      if (value === REMOVE) {
        dmqModel.get('useDefaultMediaQueries').phoneTablet.active = false;
        this._switchToAddButton(e.target);
      }
      else if (value === ADD) {
        dmqModel.get('useDefaultMediaQueries').phoneTablet.active = true;
        this._switchToRemoveButton(e.target);
      }

    },

    tabletClicked: function (e) {
      var value = e.target.get('value'),
      dmqModel = this.dmqModel;

      if (value === REMOVE) {
        dmqModel.get('useDefaultMediaQueries').tablet.active = false;
        this._switchToAddButton(e.target);
      }
      else if (value === ADD) {
        dmqModel.get('useDefaultMediaQueries').tablet.active = true;
        this._switchToRemoveButton(e.target);
      }

    },

    defaultClicked: function (e) {
      var value = e.target.get('value'),
      dmqModel = this.dmqModel;

      if (value === REMOVE) {
        dmqModel.get('useDefaultMediaQueries').default.active = false;
        this._switchToAddButton(e.target);
      }
      else if (value === ADD) {
        dmqModel.get('useDefaultMediaQueries').default.active = true;
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
        phoneValue: getText(o.useDefaultMediaQueries.phone.active),
        phoneTabletValue: getText(o.useDefaultMediaQueries.phoneTablet.active),
        tabletValue: getText(o.useDefaultMediaQueries.tablet.active),
        defaultValue: getText(o.useDefaultMediaQueries.default.active)
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
                      classNames: 'minibutton yui3-u',
                      action: function (e) {
                        //reset dmqModel
                        self.dmqModel = model;
                        panel.hide();
                      }
                  },

                  {
                      name     : 'Confirm',
                      label    : 'Save Changes',
                      classNames: 'minibutton notice yui3-u',
                      action: function (e) {

                        var dmq = self.dmqModel.get('useDefaultMediaQueries');
                        dmq.phone.max = Y.one(PHONE_INPUT_MAX).get('value');
                        dmq.phoneTablet.max = Y.one(PHONE_TABLET_INPUT_MAX).get('value');
                        dmq.tablet.min = Y.one(TABLET_INPUT_MIN).get('value');
                        dmq.tablet.max = Y.one(TABLET_INPUT_MAX).get('value');
                        dmq.default.min = Y.one(DEFAULT_INPUT_MIN).get('value');
                        self.dmqModel.set('useDefaultMediaQueries', dmq);
                        self.set('model', self.dmqModel);
                        self.fire('updateMediaQueries', {mediaQueries: self.get('model').get('useDefaultMediaQueries')});

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
          
          //Populate the media query values from the input button
          Y.one(PHONE_INPUT_MAX).set('value', dmq.phone.max);
          Y.one(PHONE_TABLET_INPUT_MAX).set('value', dmq.phoneTablet.max);
          Y.one(TABLET_INPUT_MIN).set('value', dmq.tablet.min);
          Y.one(TABLET_INPUT_MAX).set('value', dmq.tablet.max);
          Y.one(DEFAULT_INPUT_MIN).set('value', dmq.default.min);
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

