
# MTurk Hitapp Template #
This project is meant to help build an MTurk hitapp rapidly that conforms to the MTurk format while enabling a live preview during development. This project was made in an optimized to be ran under VS Code, so it is platform and dev environment agnostic. 

## Technology used 
1. Node - JavaScript engine 
2. Webpack - task runner 
2. TypeScript - JavaScript superset
3. Nunjucks - static templating
4. Babel - JavaScript transpiler 
5. Sassy CSS - css loading

## Machine Global Prerequisites ##
To build this, you will need the following installed:
1. [NodeJs](https://nodejs.org/en/)
2. Yarn : `npm install --global yarn`
3. Typings : `npm install --global typings`
4. Webpack : `yarn global add webpack`

## Project Prerequisites ##
To install the project prerequisites before you first run it you need to run in the root of this template directory:

1. `yarn`
2. `typings install`

## Build Commands ##
1. [`yarn build`](#Yarn-Build)
2. [`yarn watch`](#Yarn-Watch)
3. [`yarn start`](#Yarn-Build)
4. [`yarn prod`](#Yarn-Build)

> ### Yarn Build    
    Deletes the exitsting dev files then builds a static webpack and js in the dev folder. 
> ### Yarn Watch  
    Runs build and updates the files when changes occur.
> ### Yarn Start  
    Runs build, starts a dev server, loads browswer sync, and watches for changes.

> ### Yarn Prod  
    Builds a static file for upload to MTurk. Only the HTML file in './production' is needed

## Files to edit
All of the files that you need to edit are in the './src' directory. 

1. '/js' -  raw JavaScript files to be proccessed by babel
* Ai.js must be edited for your Application Insights ID
2. '/scss' -  Sassy CSS files
* Main.scss is the entry point for any SCSS files you want tp have proccessed
* site/Site.sccs is the custom scss for this hitapp
3. './typescripts' - all typescript files
* base.ts is a run once file
* AnswerSatisifactio.ts is the core code for this project
4. '/views' - nunjucks files, the base of the UI
* layout.njk is the base template for the hitapp
*  partials/comments.njk is a hitapp end comments section for the workers
* partials/footerInserts.njk is where Ai.js gets loaded and any other type files you may wish to load
* partials/instructions.njk is the drop down instructions
* partials/work.njk is a repeater of the work items to help avoid errors
5. webpackEntryPoint - is where webpack loads any ts/js
  
## VS Code Start ##
Start WITHOUT debugging or use the terminal manually.

## Known Issues ## 
* Odd control chars in prod output - does not give an error on mturk 
* No space allowed in path - causes the dev server to show "cannot get /"

## Tests ## 
This is not under test as of yet.

## Usefull commands ##
Export as zip with .gitignore folders removed  
`git archive --format zip  --output ../MTurkTemplate.zip master`
## Credits
Author: Richard Sperry  
Last modifed: 2018-04-30