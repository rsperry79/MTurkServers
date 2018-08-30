
# MTurk Hitapp Template #

This project is meant to help build an MTurk hitapp rapidly that conforms to the MTurk format while enabling a live preview during development. This project was made in an optimized to be ran under VS Code, so it is platform and dev environment agnostic.

## Technology used ##

1. Node - JavaScript engine
2. Webpack - task runner
3. TypeScript - JavaScript superset
4. Nunjucks - static templating
5. Babel - JavaScript transpiler
6. Sassy CSS - css loading

## Machine Global Prerequisites ##

To build this, you will need the following installed:

1. [NodeJs](https://nodejs.org/en/)
2. Yarn : `npm install --global yarn`
3. Webpack : `yarn global add webpack`

## Project Prerequisites ##

To install the project prerequisites before you first run it you need to run in the root of this template directory:

1. `yarn`
2. `typings install`

## Build Commands ##

1. [`yarn build`](#Yarn-Build)
2. [`yarn watch`](#Yarn-Watch)
3. [`yarn start`](#Yarn-Build)
4. [`yarn production`](#Yarn-Production)

> ### Yarn Build ###

    Deletes the existing dev files then builds a static webpack and js in the dev folder.

> ### Yarn Watch ###

    Runs build and updates the files when changes occur.

> ### Yarn Start ###

    Runs build, starts a dev server, loads browser sync, and watches for changes.

> ### Yarn Production ###

    Builds a static file for upload to MTurk. Only the HTML file in './production' is needed

## Files to edit ##

All of the files that you need to edit the hitapp are in the './src' directory.

1. '/components' -  where react components are found.  Sub-folders are hitapps.
2. '/scss' -  Sassy CSS files. Each hitapp has its own SCSS file.
3. './models' - Every hitapp has its own MVC model.  This file provide access to the data.
4. '/types' - This folder contains the typescript model definitions for the hitapps.
5. '/MTurkHitappTemplates' - nunjucks files, the base of the UI. Every hitapp has its own own entry point and folder.
* hitappName.njk is the base template for the hitapp
* hitapp/es6Test.njk is where the app insights is loaded and we check for modern support.
* hitapp/hiddenData.njk is where Ai.js gets loaded and any other type files you may wish to load
* hitapp/instructions.njk is the drop down instructions are.

## Config files ##

Most are self evident by name.
Important files to edit:

1. './paths.js' - has the start page for webpack start.
2. './Templates.EntryPoint.js' - is what defines the hitapp chunks.
3. './Templates.Development.js' - is what has the development output configs.
4. './Templates.Production.js' - is what has the production output configs.

## VS Code Start ##

Start WITHOUT debugging or use the terminal manually.

## Known Issues ##

* Can not be stored in one drive path - webpack fails to start.
* No space allowed in path - causes the dev server to show "cannot get /"

## Tests ##

This is not under test as of yet.

## Useful commands ##

Export as zip with .gitignore folders removed  
`git archive --format zip  --output ../MTurkTemplate.zip master`

## Credits ##

Author: Richard Sperry  
Last modified: 2018-08-30
