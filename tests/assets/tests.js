YUI.add('gridbuilder-tests', function(Y) {

    var suite = new Y.Test.Suite('gridbuilder'),
        Assert = Y.Assert,
        HANDLEBARS_PATH = '../public/handlebars/grid.handlebars',
        DELAY = 3100;

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',

        setUp : function () {
            this.gridModel = new Y.GB.GridModel({ width: 960 });
            this.controlView = new Y.GB.ControlView({ model: gridModel });
        },

        tearDown : function () {
            this.gridModel = null;
            this.controlView = null;
        },

        'test generateUnits': function() {
            
            var units = this.gridModel.generateUnits(4),
                i;

            Assert.areSame(units[0].span, 1, 'units should have 1/2');
            Assert.areSame(units[0].total, 2, 'units should have 1/2');

            Assert.areSame(units[1].span, 1, 'units should have 1/3');
            Assert.areSame(units[1].total, 3, 'units should have 1/3');

            Assert.areSame(units[2].span, 2, 'units should have 2/3');
            Assert.areSame(units[2].total, 3, 'units should have 2/3');


            Assert.areSame(units[3].span, 1, 'units should have 1/4');
            Assert.areSame(units[3].total, 4, 'units should have 1/4');


            Assert.areSame(units[4].span, 3, 'units should have 3/4');
            Assert.areSame(units[4].total, 4, 'units should have 3/4');

            Assert.areSame(units.length, 5, 'units should have length of 5');

        },

        'test findHandleBarsFile': function () {
            var flag = false,
            test = this;

            Y.io(HANDLEBARS_PATH, {
                on: {
                    success: function(id, response) {
                        test.resume(function () {
                            flag = true;
                            Assert.areEqual(true, flag, 'flag should be true');
                            Assert.areNotEqual(-1, response.responseText.indexOf('Templatized Handlebars file'), 'Handlebars File should be found');
                        });

                    },

                    failure: function (id, o, args) {
                        Assert.fail('Handlebars file was not found');
                    }

                }
            });

            test.wait(DELAY);
        },

        'test default toCSS': function () {
            var cssView = new Y.GB.CSSView({ model: this.gridModel }),
                flag = false,
                test = this;

            Y.io(HANDLEBARS_PATH, {
                on: {
                    success: function(id, response) {
                        test.resume(function () {
                            var css,
                                flag = true;

                            Assert.areEqual(true, flag, 'flag should be true');
                            css = cssView.toCSS(response.responseText);
                            Assert.areNotEqual(-1, response.responseText.indexOf('Templatized Handlebars file'), 'Handlebars File should be found');
                            Assert.areNotEqual(-1, css.indexOf('.yui3-g'), 'CSS should have .yui3-g by default');
                            Assert.areNotEqual(-1, css.indexOf('.yui3-u-11-12'), 'CSS should have .yui3-11-12 with a % by default');
                        });
                    },

                    failure: function (id, o, args) {
                        Assert.fail('Handlebars file was not found');
                    }

                }
            });

            test.wait(DELAY);


        },

        'test toCSS with fewer columns': function () {

            this.gridModel.set('columns', 6);

            var cssView = new Y.GB.CSSView({ model: this.gridModel }),
                flag = false,
                test = this;

            Y.io(HANDLEBARS_PATH, {
                on: {
                    success: function(id, response) {
                        test.resume(function () {
                            var css;
                            flag = true;
                            Assert.areEqual(true, flag, 'flag should be true');
                            Assert.areNotEqual(-1, response.responseText.indexOf('Templatized Handlebars file'), 'Handlebars File should be found');
                            css = cssView.toCSS(response.responseText);
                            Assert.areNotEqual(-1, css.indexOf('.yui3-g'), 'CSS should have .yui3-g by default');
                            Assert.areNotEqual(-1, css.indexOf('.yui3-u-1-6'), 'CSS should have .yui3-1-6 by default');
                            Assert.areNotEqual(-1, css.indexOf('width: 16.66667%'), 'CSS should have width: 16.66667% by default');
                            Assert.areEqual(-1, css.indexOf('.yui3-u-11-12'), 'CSS should not have .yui3-11-12 with a % by default');
                        });

                    },

                    failure: function (id, o, args) {
                        Assert.fail('Handlebars file was not found');
                    }

                }
            });

            test.wait(DELAY);
        },

        'test toCSS not responsive': function () {

            this.gridModel.set('isResponsive', false);

            var cssView = new Y.GB.CSSView({ model: this.gridModel }),
                flag = false,
                test = this;

            Y.io(HANDLEBARS_PATH, {
                on: {
                    success: function(id, response) {
                        test.resume(function () {
                            var css;
                            flag = true;
                            Assert.areEqual(true, flag, 'flag should be true');
                            Assert.areNotEqual(-1, response.responseText.indexOf('Templatized Handlebars file'), 'Handlebars File should be found');
                            css = cssView.toCSS(response.responseText);
                            Assert.areNotEqual(-1, css.indexOf('.yui3-g'), 'CSS should have .yui3-g by default');
                            Assert.areEqual(-1, css.indexOf('.yui3-g-r'), 'CSS should not have .yui3-g-r by default');
                            Assert.areNotEqual(-1, css.indexOf('.yui3-u-1-6'), 'CSS should have .yui3-1-6 by default');
                            Assert.areNotEqual(-1, css.indexOf('width: 16.66667%'), 'CSS should have width: 16.66667% by default');
                            Assert.areNotEqual(-1, css.indexOf('.yui3-u-11-12'), 'CSS should have .yui3-11-12 with a % by default');
                        });

                    },

                    failure: function (id, o, args) {
                        Assert.fail('Handlebars file was not found');
                    }

                }
            });

            test.wait(DELAY);
        },

        'test toCSS custom prefix': function () {

            this.gridModel.set('unitClassName', 'unit');
            this.gridModel.set('classPrefix', 'y-');
            this.gridModel.set('className', 'row');

            var cssView = new Y.GB.CSSView({ model: this.gridModel }),
                flag = false,
                test = this;

            Y.io(HANDLEBARS_PATH, {
                on: {
                    success: function(id, response) {
                        test.resume(function () {
                            var css;
                            flag = true;

                            Assert.areEqual(true, flag, 'flag should be true');
                            Assert.areNotEqual(-1, response.responseText.indexOf('Templatized Handlebars file'), 'Handlebars File should be found');
                            css = cssView.toCSS(response.responseText);


                            Assert.areEqual(-1, css.indexOf('.yui3-g'), 'CSS should not have .yui3-g by default');

                            Assert.areNotEqual(-1, css.indexOf('.y-row'), 'CSS should have .y-row by default');


                            Assert.areEqual(-1, css.indexOf('.yui3-g-r'), 'CSS should not have .yui3-g-r by default');
                            Assert.areNotEqual(-1, css.indexOf('.y-row-r'), 'CSS should have .y-row-r by default');


                            Assert.areEqual(-1, css.indexOf('.yui3-u-1-6'), 'CSS should not have .yui3-1-6 by default');
                            Assert.areNotEqual(-1, css.indexOf('.y-unit-1-6'), 'CSS should have .y-unit-1-6 by default');
                        });

                    },

                    failure: function (id, o, args) {
                        Assert.fail('Handlebars file was not found');
                    }

                }
            });

            test.wait(DELAY);
        },

        'test toCSS pixel layout with 960px': function () {

            this.gridModel.set('usePixels', true);

            var cssView = new Y.GB.CSSView({ model: this.gridModel }),
                flag = false,
                test = this;

            Y.io(HANDLEBARS_PATH, {
                on: {
                    success: function(id, response) {
                        test.resume(function () {
                            var css;
                            flag = true;

                            Assert.areEqual(true, flag, 'flag should be true');
                            Assert.areNotEqual(-1, response.responseText.indexOf('Templatized Handlebars file'), 'Handlebars File should be found');
                            css = cssView.toCSS(response.responseText);


                            Assert.areNotEqual(-1, css.indexOf('.yui3-g'), 'CSS should have .yui3-g by default');

                            Assert.areNotEqual(-1, css.indexOf('.yui3-g-r'), 'CSS should have .yui3-g-r by default');

                            Assert.areNotEqual(-1, css.indexOf('.yui3-u-1-6'), 'CSS should have .yui3-u-1-6 by default');

                            Assert.areNotEqual(-1, css.indexOf('.yui3-u-1-6'), 'CSS should have .yui3-u-1-6 by default');

                            Assert.areNotEqual(-1, css.indexOf('width: 160.00032px;'), 'CSS should have width: 160.00032px; by default');

                            Assert.areEqual(-1, css.indexOf('width: 16.66667%;'), 'CSS should not have width: 16.66667%; by default');
                        });

                    },

                    failure: function (id, o, args) {
                        Assert.fail('Handlebars file was not found');
                    }

                }
            });

            test.wait(DELAY);
        },

        'test toCSS pixel layout with 480px': function () {

            this.gridModel.set('usePixels', true);
            this.gridModel.set('width', 480);

            var cssView = new Y.GB.CSSView({ model: this.gridModel }),
                flag = false,
                test = this;

            Y.io(HANDLEBARS_PATH, {
                on: {
                    success: function(id, response) {
                        test.resume(function () {
                            var css;
                            flag = true;

                            Assert.areEqual(true, flag, 'flag should be true');
                            Assert.areNotEqual(-1, response.responseText.indexOf('Templatized Handlebars file'), 'Handlebars File should be found');
                            css = cssView.toCSS(response.responseText);


                            Assert.areNotEqual(-1, css.indexOf('.yui3-g'), 'CSS should have .yui3-g by default');

                            Assert.areNotEqual(-1, css.indexOf('.yui3-g-r'), 'CSS should have .yui3-g-r by default');

                            Assert.areNotEqual(-1, css.indexOf('.yui3-u-1-6'), 'CSS should have .yui3-u-1-6 by default');

                            Assert.areNotEqual(-1, css.indexOf('.yui3-u-1-6'), 'CSS should have .yui3-u-1-6 by default');

                            Assert.areNotEqual(-1, css.indexOf('width: 80.00016px;'), 'CSS should have width: 80.00016px; by default');

                            Assert.areEqual(-1, css.indexOf('width: 16.66667%;'), 'CSS should not have width: 16.66667%; by default');
                        });

                    },

                    failure: function (id, o, args) {
                        Assert.fail('Handlebars file was not found');
                    }

                }
            });

            test.wait(DELAY);
        },

        'test toCSS default media queries': function () {

            this.gridModel.set('columns', 6);

            var cssView = new Y.GB.CSSView({ model: this.gridModel }),
                flag = false,
                test = this;

            Y.io(HANDLEBARS_PATH, {
                on: {
                    success: function(id, response) {
                        test.resume(function () {
                            var css;
                            flag = true;
                            Assert.areEqual(true, flag, 'flag should be true');
                            Assert.areNotEqual(-1, response.responseText.indexOf('Templatized Handlebars file'), 'Handlebars File should be found');

                            css = cssView.toCSS(response.responseText);

                            Assert.areNotEqual(-1, css.indexOf('.yui3-g'), 'CSS should have .yui3-g by default');
                            Assert.areNotEqual(-1, css.indexOf('.yui3-u-1-6'), 'CSS should have .yui3-1-6 by default');
                            Assert.areNotEqual(-1, css.indexOf('width: 16.66667%'), 'CSS should have width: 16.66667% by default');
                            Assert.areEqual(-1, css.indexOf('.yui3-u-11-12'), 'CSS should not have .yui3-11-12 with a % by default');

                            Assert.areNotEqual(-1, css.indexOf('@media (min-width:980px)'), 'CSS should have @media (min-width:980px) by default');
                            
                            Assert.areNotEqual(-1, css.indexOf('@media (max-width:480px)'), 'CSS should have @media (max-width:480px) by default');

                            Assert.areNotEqual(-1, css.indexOf('@media (min-width:768px) and (max-width:979px)'), 'CSS should have @media (min-width:768px) and (max-width:979px) by default');

                            Assert.areNotEqual(-1, css.indexOf('@media (max-width:767px)'), 'CSS should have @media (max-width:767px) by default');
                            
                        });

                    },

                    failure: function (id, o, args) {
                        Assert.fail('Handlebars file was not found');
                    }

                }
            });

            test.wait(DELAY);
        },

        'test toCSS inactive media queries': function () {
            var mediaQueries = {
                phone: {
                    max: 480,
                    active: false
                },
                phoneTablet: {
                    max: 767,
                    active: false
                },
                tablet: {
                    min: 768,
                    max: 979,
                    active: true
                },
                default: {
                    min: 980,
                    active: true
                }
            };
            this.gridModel.set('columns', 6);
            this.gridModel.set('useDefaultMediaQueries', mediaQueries);

            var cssView = new Y.GB.CSSView({ model: this.gridModel }),
                flag = false,
                test = this;

            Y.io(HANDLEBARS_PATH, {
                on: {
                    success: function(id, response) {
                        test.resume(function () {
                            var css;
                            flag = true;
                            Assert.areEqual(true, flag, 'flag should be true');
                            Assert.areNotEqual(-1, response.responseText.indexOf('Templatized Handlebars file'), 'Handlebars File should be found');

                            css = cssView.toCSS(response.responseText);

                            Assert.areNotEqual(-1, css.indexOf('.yui3-g'), 'CSS should have .yui3-g by default');
                            Assert.areNotEqual(-1, css.indexOf('.yui3-u-1-6'), 'CSS should have .yui3-1-6 by default');
                            Assert.areNotEqual(-1, css.indexOf('width: 16.66667%'), 'CSS should have width: 16.66667% by default');
                            Assert.areEqual(-1, css.indexOf('.yui3-u-11-12'), 'CSS should not have .yui3-11-12 with a % by default');

                            Assert.areNotEqual(-1, css.indexOf('@media (min-width:980px)'), 'CSS should have @media (min-width:980px) by default');
                            
                            Assert.areEqual(-1, css.indexOf('@media (max-width:480px)'), 'CSS should not have @media (max-width:480px) by default');

                            Assert.areNotEqual(-1, css.indexOf('@media (min-width:768px) and (max-width:979px)'), 'CSS should have @media (min-width:768px) and (max-width:979px) by default');

                            Assert.areEqual(-1, css.indexOf('@media (max-width:767px)'), 'CSS should not have @media (max-width:767px) by default');
                            
                        });

                    },

                    failure: function (id, o, args) {
                        Assert.fail('Handlebars file was not found');
                    }

                }
            });

            test.wait(DELAY);
        },

        'test toCSS inactive media queries': function () {
            var mediaQueries = {
                phone: {
                    max: 320,
                    active: true
                },
                phoneTablet: {
                    max: 700,
                    active: true
                },
                tablet: {
                    min: 701,
                    max: 999,
                    active: true
                },
                default: {
                    min: 1000,
                    active: true
                }
            };
            this.gridModel.set('columns', 6);
            this.gridModel.set('useDefaultMediaQueries', mediaQueries);

            var cssView = new Y.GB.CSSView({ model: this.gridModel }),
                flag = false,
                test = this;

            Y.io(HANDLEBARS_PATH, {
                on: {
                    success: function(id, response) {
                        test.resume(function () {
                            var css;
                            flag = true;
                            Assert.areEqual(true, flag, 'flag should be true');
                            Assert.areNotEqual(-1, response.responseText.indexOf('Templatized Handlebars file'), 'Handlebars File should be found');

                            css = cssView.toCSS(response.responseText);

                            Assert.areNotEqual(-1, css.indexOf('.yui3-g'), 'CSS should have .yui3-g by default');
                            Assert.areNotEqual(-1, css.indexOf('.yui3-u-1-6'), 'CSS should have .yui3-1-6 by default');
                            Assert.areNotEqual(-1, css.indexOf('width: 16.66667%'), 'CSS should have width: 16.66667% by default');
                            Assert.areEqual(-1, css.indexOf('.yui3-u-11-12'), 'CSS should not have .yui3-11-12 with a % by default');

                            Assert.areNotEqual(-1, css.indexOf('@media (min-width:1000px)'), 'CSS should have @media (min-width:1000px) by default');
                            
                            Assert.areNotEqual(-1, css.indexOf('@media (max-width:320px)'), 'CSS should not have @media (max-width:320px) by default');

                            Assert.areNotEqual(-1, css.indexOf('@media (max-width:700px)'), 'CSS should have @media @media (max-width:700px) by default');

                            Assert.areNotEqual(-1, css.indexOf('@media (min-width:701px) and (max-width:999px)'), 'CSS should not have @media (min-width:701px) and (max-width:999px) by default');
                        });

                    },

                    failure: function (id, o, args) {
                        Assert.fail('Handlebars file was not found');
                    }

                }
            });

            test.wait(DELAY);
        }

    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'app', 'cssView', 'htmlView', 'controlView', 'gridModel' ] });
