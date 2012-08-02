        YUI({
            modules: {
                cssView: {
                    fullpath: '/public/js/views/CSSView.js'
                },
                htmlView: {
                    fullpath: '/public/js/views/HTMLView.js'
                },
                
                controlView: {
                    fullpath: '/public/js/views/ControlView.js'
                },
                
                widthView: {
                    fullpath: '/public/js/views/WidthView.js'
                },

                editMediaQueryView: {
                    fullpath: '/public/js/views/EditMediaQueryView.js'
                },
                
                gridModel: {
                    fullpath: '/public/js/models/GridModel.js'
                },
                
            }
        }).use('app', 'cssView', 'htmlView', 'controlView', 'widthView', 'editMediaQueryView', 'gridModel', function (Y) {

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
            var screenSizeDisplayer = new Y.GB.WidthView();
        });