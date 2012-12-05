/*
Copyright (c) 2012, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://yuilibrary.com/license/
*/
YUI.add('widthView', function(Y, name) {
  var WidthView = Y.Base.create('widthView', Y.View, [], {
      initializer: function () {
				Y.one('window').on('resize', this.render, this);
      },

      render: function () {
				this.get('container').set('text', 'Window Width: ' + Y.one('window').get("winWidth"));
      },
			
      model: undefined,
  }, {
      ATTRS: {
          container: {
                  valueFn: function () {
                  return Y.one('#screen-width');
              }
          }
      }
  });

  
	Y.namespace("GB").WidthView = WidthView;
}, '0.0.1', {
	requires: ['node', 'view', 'event-base']
});

