/*!
 * RaphaelWrapper Showcase project
 *
 * Copyright (c) 2011 Gabriele Genta (http://gabrielegenta.wordpress.com/)
 * Licensed under the MIT license.
 */
/*globals Showcase */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
Showcase.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  Showcase.getPath('mainPage.mainPane').append();


  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!

  // TODO: Set the content property on your primary controller
  // ex: Showcase.contactsController.set('content',Showcase.contacts);

} ;

function main() { Showcase.main(); }
