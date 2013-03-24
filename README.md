#YUI GridBuilder

The YUI Responsive Grid Builder is a little web app that generates responsive CSS based on [YUI Grids](http://yuilibrary.com/yui/docs/cssgrids/). 

![Screenshot](http://f.cl.ly/items/1b262l0A1m1W310K3R2x/Screen%20Shot%202013-03-24%20at%207.05.23%20PM.png)

##[See it in action](http://yui.github.com/gridbuilder/)

##A little tutorial and an example
The responsive CSS works by adding a single `yui3-g-r` class name, on top of the existing [YUI3 Grids syntax](http://yuilibrary.com/yui/docs/cssgrids/). Check out the [documentation](http://yui.github.com/gridbuilder/docs.html). Here's [an example](http://yui.github.com/gridbuilder/examples/magazine/) based on [bostonglobe.com](http://bostonglobe.com)

##Issues and Feature Requests
Please submit all issues and feature requests through Github. It makes it easy to track.

##Current Features

- Creates the CSS for a grid when user specifies the screen width, number of columns, and "%" or "px" based layout
- User can make certain elements responsive.
- User can specify screen widths that they are interested in via media queries.
- Unit Test Coverage
- Works with the latest YUI Grids

##Contribute

If you have any feature requests, or have noticed a bug, [file an issue](https://github.com/yui/gridbuilder/issues?state=open). 

###Downloading and running locally
This app has no server-side dependencies. Just fork it and open `index.html` in a browser. Easy.

###Unit Tests
The unit tests for this app can be found in the `tests/` directory. The unit tests run through different permutations and combinations when it comes to generating the CSS. You can view the unit tests for the latest stable GridBuilder in [your browser](http://yui.github.com/gridbuilder/tests/).

