        YUI({
            modules: {
                cssView: {
                    fullpath: 'https://raw.github.com/tilomitra/YUIGridBuilder/gh-pages/public/js/views/CSSView.js?login=tilomitra&token=f445a2b8a1653eaddf16e8d5507513ab'
                },
                htmlView: {
                    fullpath: 'https://raw.github.com/yui/gridbuilder/master/public/js/views/HTMLView.js'
                },
                
                controlView: {
                    fullpath: 'https://raw.github.com/yui/gridbuilder/master/public/js/views/ControlView.js',
                    requires: ['addMediaQueryView', 'editMediaQueryView', 'defaultMediaQueryView']
                },
                

                // addMediaQueryView: {
                //     fullpath: '/public/js/views/AddMediaQueryView.js'
                // },

                editMediaQueryView: {
                    fullpath: 'https://raw.github.com/yui/gridbuilder/master/public/js/views/EditMediaQueryView.js'
                },

                defaultMediaQueryView: {
                    fullpath: 'https://raw.github.com/yui/gridbuilder/master/public/js/views/DefaultMediaQueryView.js'
                },
                
                gridModel: {
                    fullpath: 'https://raw.github.com/yui/gridbuilder/master/public/js/models/GridModel.js'
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