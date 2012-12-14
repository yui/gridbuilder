/*
Copyright (c) 2012, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://yuilibrary.com/license/
*/
YUI.add('controlView', function(Y, name) {
  var ControlView = Y.Base.create("controlView", Y.View, [], {

      events: {
        '#grid-width': {keyup: 'widthChanged'},
        '#grid-columns': {keyup: 'columnsChanged'},
        '#grid-layout-fixed': {click: 'layoutChanged'},
        '#grid-gutter': {keyup: 'gutterChanged'},
        '#grid-layout-fluid': {click: 'layoutChanged'},
        '#grid-responsive-yes': {click: 'responsiveChanged'},
        '#grid-responsive-no': {click: 'responsiveChanged'},
        '#default-media-queries': {click: 'defaultMediaQueriesClicked'},
        "#grid-prefix": {keyup: "prefixChanged"},
        "#grid-classname": {keyup: "classNameChanged"},
        "#grid-unitClassName": {keyup: "unitClassNameChanged"}
        //'#add-media-queries': {click: 'addMediaQueryClicked'}
      },

      initializer: function (config) {
          var model = this.get("model");
          //model.after("useDefaultMediaQueriesChange", this.updateMediaQueries, this);
      },

      render: function () {
          var container = this.get('container');
          
           // Append the container element to the DOM if it's not on the page already.
          if (!container.inDoc()) {
              Y.one('body').append(container);
          }
      },

      widthChanged: function(e) {
          var width = parseInt(e.currentTarget._node.value, 10);
          this.get("model").set('width', width);
      },

      columnsChanged: function(e) {
          var numCol = parseInt(e.currentTarget._node.value, 10);
          this.get("model").set('columns', numCol);
      },

      layoutChanged: function(e) {
          var id = e.target._node.id,
              model = this.get("model"),
              widthInput = Y.one('#grid-width');

          if (id === 'grid-layout-fixed') {
              model.set("usePixels", true);
              widthInput.removeAttribute('disabled');

          }
          else if (id === 'grid-layout-fluid') {
              model.set("usePixels", false);
              widthInput.setAttribute('disabled', true);
          }
      },

      gutterChanged: function (e) {
        var gutter = parseInt(e.currentTarget._node.value, 10);
        this.get("model").set("gutter", gutter);
        Y.all('.demo-unit').setStyles({
          marginLeft: gutter/2 + 'px',
          marginRight: gutter/2 + 'px'
        });
      },

      responsiveChanged: function(e) {
          var id = e.target._node.id,
              model = this.get("model");

          if (id === 'grid-responsive-yes') {
              model.set("isResponsive", true);
              Y.all("#media-queries input[type='button']").set("disabled", false);

          }
          else if (id === 'grid-responsive-no') {
              model.set("isResponsive", false);

              //Disable Media Queries Buttons
              Y.all("#media-queries input[type='button']").set("disabled", true);
          }
      },

      prefixChanged: function(e) {
        var prefix = e.currentTarget._node.value;
        this.get("model").set('classPrefix', prefix);
      },
      classNameChanged: function(e) {
        var c = e.currentTarget._node.value;
        this.get("model").set('className', c);
      },
      unitClassNameChanged: function(e) {
        var u = e.currentTarget._node.value;
        this.get("model").set('unitClassName', u);
      },

      defaultMediaQueriesClicked: function(e) {
        var defaultMediaQueryView = this.get("defaultMediaQueryView"),
        model = this.get('model');

        if (defaultMediaQueryView === undefined) {
          Y.log("Instantiating a new DefaultMediaQueryView...");
          defaultMediaQueryView = new Y.GB.DefaultMediaQueryView({model: model});
          this.set("defaultMediaQueryView", defaultMediaQueryView);
        }

        else {
          defaultMediaQueryView.set('model', model);
        }

        defaultMediaQueryView.render();

        defaultMediaQueryView.on('updateMediaQueries', function(e) {
          //pass the properties in explicitly since 'e' is an eventFacade and has other properties.
          //Revert undefined to false.
          model.set('useDefaultMediaQueries', e.mediaQueries);
        });
      },
      /*
      addMediaQueryClicked: function(e) {
          var addMediaQueryView = this.get("addMediaQueryView"),
          addMqModel = {
            id: undefined,
            name: undefined,
            max: undefined,
            min: undefined  
          };

          if (addMediaQueryView === undefined) {
            addMediaQueryView = new Y.GB.AddMediaQueryView({model: new Y.Model(addMqModel)});
          }
          else {
            addMediaQueryView.set('model', new Y.Model(defaultMq));
          }
          
          addMediaQueryView.render();
      },
      */
      // updateMediaQueries: function (e) {
      //     var html = "",
      //         i = 0,
      //         candyTemplate = this.get("candyTemplate"),
      //         defaultMq = this.get("defaultMediaQueries");

      //     Y.log(candyTemplate);
      //     for (; i < defaultMq.length; i++) {
      //         html += Y.Lang.sub(candyTemplate, {mqId: defaultMq[i].id, description: defaultMq[i].description, name: defaultMq[i].name});
      //     }
      //     this.get("candyContainer").setHTML(html);

      //     this._mqSubscription = this.get("container").on("click", this.mediaQueryClicked, this);

      // },

      // mediaQueryClicked: function(e) {
      //   var mq, 
      //     defaultMq, 
      //     editMediaQueryView = this.get("editMediaQueryView");
      //   if (Y.one(e.target).hasClass("candy")) {
      //     mq = Y.one(e.target);
          
      //     //Get the appropriate media query object.
      //     defaultMq = Y.Array.find(this.get("defaultMediaQueries"), function(item) {
      //       return (item.id === mq.getAttribute("data-mqId")) ? true : false;
      //     }, this);

      //     if (editMediaQueryView === undefined) {
      //       editMediaQueryView = new Y.GB.EditMediaQueryView({model: new Y.Model(defaultMq)})
      //     }
      //     else {
      //       editMediaQueryView.set('model', new Y.Model(defaultMq));
      //     }

      //     this.set("editMediaQueryView", editMediaQueryView);
      //     editMediaQueryView.render();

      //   }
      // },
      // //Subscription object for the click handler on the media query candies
      // _mqSubscription: undefined

  }, {
      ATTRS: {
          container: {
              valueFn: function () {
                  return Y.one("#controlPanel");
              }
          },
          model: {
              value: undefined
          },

          candyTemplate: {
              value: '<span class="candy yui3-u" data-mqId="{mqId}">{mqId}</span>'
          },

          candyContainer: {
              valueFn: function() {
                  return Y.one("#current-media-queries");
              }
          },

          editMediaQueryView: {
            value: undefined
          },

          addMediaQueryView: {
            value: undefined
          },

          defaultMediaQueryView: {
            value: undefined
          }
      }
  });

  
	Y.namespace("GB").ControlView = ControlView;
	
}, '0.0.1', {
	requires: ['node', 'view', 'editMediaQueryView', 'addMediaQueryView', 'defaultMediaQueryView']
});

