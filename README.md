#YUI Grid Builder

- Creates a grid when user specifies the screen width, number of columns, and "%" or "px" based layout
- User can place elements on the grid.
- User can make certain elements responsive.
- User can specify screen widths that they are interested in (media
queries will be generated appropriately)
- User can over-ride defaults by specifying certain actions at
different screen sizes (ex: make my layout fluid at {{screen-width}},
collapse elements at {{screen-width}})
- Preview in various screen sizes (Cinematic Display, Desktop, Tablet,
Phone)
- Outputs a CSS File and an HTML File
- Gutters
- yui3-g-responsive > yui3-u-* will be collapsable, but the rest won't. If you want collapable units, you need to have a g-responsive on the parent. 


TODOs
- fix gutter issue
- media query customization
- fixed width should not wrap when i resize page