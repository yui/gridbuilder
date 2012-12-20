/*
Copyright (c) 2012, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://yuilibrary.com/license/
*/
        YUI({
            modules: {
                cssView: {
                    fullpath: 'http://yui.github.com/gridbuilder/public/js/views/CSSView.js'
                },
                htmlView: {
                    fullpath: 'http://yui.github.com/gridbuilder/public/js/views/HTMLView.js'
                },
                
                controlView: {
                    fullpath: 'http://yui.github.com/gridbuilder/public/js/views/ControlView.js',
                    requires: ['addMediaQueryView', 'editMediaQueryView', 'defaultMediaQueryView']
                },
                

                // addMediaQueryView: {
                //     fullpath: '/public/js/views/AddMediaQueryView.js'
                // },

                editMediaQueryView: {
                    fullpath: 'http://yui.github.com/gridbuilder/public/js/views/EditMediaQueryView.js'
                },

                defaultMediaQueryView: {
                    fullpath: 'http://yui.github.com/gridbuilder/public/js/views/DefaultMediaQueryView.js'
                },
                
                gridModel: {
                    fullpath: 'http://yui.github.com/gridbuilder/public/js/models/GridModel.js'
                },
                
            }
        }).use('app', 'cssView', 'htmlView', 'controlView', 'gridModel', function (Y) {

            var app = new Y.App({
                container    : '#wrapper',
                viewContainer: '#wrapper'
            });

            app.render();

            //Instantiate Shared Grid Model
            var gridModel = new Y.GB.GridModel({ width: 960 });

            //Instantiate Control View to manipulate model attributes.     
            var controlView = new Y.GB.ControlView({ model: gridModel });
            controlView.render();

            //Instantiate CSS View and Render
            var cssView = new Y.GB.CSSView({ model: gridModel });
            cssView.render();

            //Instantiate HTML View and Render
            var htmlView = new Y.GB.HTMLView({ model: gridModel });
            htmlView.render();

            //Track Screen Size
            //var screenSizeDisplayer = new Y.GB.WidthView();

            //enable pretty syntax highlighting
            //prettyPrint();
        });