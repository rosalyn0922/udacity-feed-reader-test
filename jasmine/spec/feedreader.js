/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
  /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
  describe('RSS Feeds', function () {
    /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
    it('are defined', function () {
      expect(allFeeds).toBeDefined()
      expect(allFeeds.length).not.toBe(0)
    })

    it('URLs in feed are defined', function () {
      for (const feed of allFeeds) {
        expect(feed.url).toBeDefined()
        expect(feed.url.length).not.toBe(0)
      }
    })

    it('Name in feed are defined and not empty', function () {
      for (const feed of allFeeds) {
        expect(feed.name).toBeDefined()
        expect(feed.name.length).not.toBe(0)
      }
    })
  })

  describe('The Menu', function () {
    const body = $('body')
    const menuLink = $('.menu-icon-link')
    const menu = $('.slide-menu')

    it('has menu hidden by default', function () {
      expect(body.hasClass('menu-hidden')).toBe(true)
    })

    it('when clicked, display the menu', function () {
      expect(body.hasClass('menu-hidden')).toBe(true)
      menuLink.trigger('click')
      expect(body.hasClass('menu-hidden')).not.toBe(true)
      expect(menu.css('transform')).toBe('matrix(1, 0, 0, 1, 0, 0)')
    })

    it('when clicked, hides the menu', function () {
      expect(body.hasClass('menu-hidden')).not.toBe(true)
      menuLink.trigger('click')
      expect(body.hasClass('menu-hidden')).toBe(true)
    })
  })

  /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

  /* TODO: Write a new test suite named "Initial Entries" */

  /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

  /* TODO: Write a new test suite named "New Feed Selection" */

  /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}())
