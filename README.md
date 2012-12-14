#Responsive Grid Builder

The Responsive Grid Builder is a little web app that generates responsive CSS based on YUI Grids. 

##See it in action
Check out the app [here](http://yui.github.com/gridbuilder/). 

##A little tutorial and an example
The responsive CSS works by adding a single `yui3-g-responsive` class name, on top of the existing [YUI3 Grids syntax](http://yuilibrary.com/yui/docs/cssgrids/). Check out the [documentation and a simple example](http://yui.github.com/gridbuilder/layout.html).

##Issues and Feature Requests
Please submit all issues and feature requests through Github. It makes it easy to track.

##Current Features
- Creates a grid when user specifies the screen width, number of columns, and "%" or "px" based layout
- User can make certain elements responsive.
- User can specify screen widths that they are interested in
- Preview in various screen sizes (Cinematic Display, Desktop, Tablet,
Phone)
- Outputs CSS


###Downloading and running locally
If you want to clone the repo to run the app locally, make sure you run it from the `master` branch and not the `gh-pages` branch. The Github pages branch has some slight differences (the assets paths are different). The easiest way to get gridbuilder running locally is to clone the repo and run `foreman start`. 

- `git clone https://github.com/yui/gridbuilder.git`
- `cd gridbuilder`
- `foreman start`