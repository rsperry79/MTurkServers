// Import adapter for enzyme
var enzyme = require("enzyme"); // jshint ignore:line
var Adapter = require("enzyme-adapter-react-16"); // jshint ignore:line
enzyme.configure({ adapter: new Adapter() });

// Log all jsDomErrors when using jsdom testEnvironment
window._virtualConsole && window._virtualConsole.on("jsdomError", function(error) {
    "use strict";
    console.error("jsDomError", error.stack, error.detail);

}); // jshint ignore:line
