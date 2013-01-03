/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, jQuery  */

/*
 * Global variables.
 */



/*
 * Start functionality
 */
jQuery(function($){
    "use strict";
    $("#cards").children().each(function(index) {
// listen the click event on each card DIV element.
        $(this).click(function() {
// add the class "card-flipped".
// the browser will animate the styles between current state and card-flipped state.
            $(this).toggleClass("card-flipped");
        });
    });
});