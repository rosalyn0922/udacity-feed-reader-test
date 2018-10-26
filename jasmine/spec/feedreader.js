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
  /**
   *  These collection of test is to verify if RSS feeds are actually defined and have at least one record.
   */
  describe('RSS Feeds', function () {
    it('are defined', function () {
      expect(allFeeds).toBeTruthy()
    })

    /**
     * URLs in the feed are actually defined and must not be empty
     */
    it('URLs in feed are defined', function () {
      for (const feed of allFeeds) {
        expect(feed.url).toBeDefined()
        expect(feed.url.length).not.toBe(0)
      }
    })

    /**
     * Name in the feed are defined and must not be empty
     */
    it('Name in feed are defined and not empty', function () {
      for (const feed of allFeeds) {
        expect(feed.name).toBeDefined()
        expect(feed.name.length).not.toBe(0)
      }
    })
  })

  /**
   * The Menu is a collection of test to verify that the menu can be activated by the clicking on the menu icon
   */
  describe('The Menu', function () {
    const body = $('body')
    const menuLink = $('.menu-icon-link')

    /**
     * Menu must be hidden by default
     */
    it('has menu hidden by default', function () {
      expect(body.hasClass('menu-hidden')).toBe(true)
    })

    /**
     * Menu icon when clicked should display a sliding menu that contains all relevant links to navigate within the site/external urls
     * and trigger a click the menu again to hide the menu
     */
    it('when clicked, display the menu and click again to hide the menu', function () {
      expect(body.hasClass('menu-hidden')).toBe(true)
      menuLink.trigger('click')
      if (!body.hasClass('menu-hidden')) {
        menuLink.trigger('click')
        expect(body.hasClass('menu-hidden')).toBe(true)
      }
    })
  })

  /**
   * These collection of test is to verify if the initial entries of the feed are loaded and not empty
   */
  describe('Initial Entries', function () {
    let feedCount = 0

    /**
     * Asynchronously call Load Feed and get the count of feed
     */
    beforeEach(function (done) {
      loadFeed(0, function () {
        feedCount = $('.feed .entry-link').length
        done()
      })
    })

    /**
     * Count of Entries that are inside the feed container must be at least 1 or more
     */
    it('when loaded contained an entry inside the feed container', function () {
      expect(feedCount).toBeGreaterThan(0)
    })
  })

  /**
   * These collection of test is to verify if the entries in the feed are not empty and navigating to another feed will contain a different set of feeds
   */
  describe('New Feed Selection', function () {
    let initialFeedEntries = []
    let secondFeedEntries = []

    /**
     * Asynchronously chain a call to load two feeds and assign to a variable that can be used at a later time to compare the contents of each and check and validates its contents
     */
    beforeEach(function (done) {
      loadFeed(0, function () {
        const allEntries = $('.entry-link')
        for (let index = 0; index < allEntries.length; index++) {
          initialFeedEntries.push(allEntries[index])
        }
        loadFeed(1, function () {
          const allEntries = $('.entry-link')
          for (let index = 0; index < allEntries.length; index++) {
            secondFeedEntries.push(allEntries[index])
          }
          done()
        })
      })
    })

    /**
     * First Feed entry is loaded and must contain at least one feed
     */
    it('when first entry is loaded and must have at least one feed', function () {
      expect(initialFeedEntries.length).toBeGreaterThan(0)
    })

    /**
     * Second Feed entry is loaded and must contain at least one feed
     */
    it('when second entry is loaded and must have at least one feed', function () {
      expect(secondFeedEntries.length).toBeGreaterThan(0)
    })

    /**
     * Feed entry is correctly loaded and the next set of feeds is not exactly the previous one (only checks for the first item in the entry)
     */
    it('when another feed is loaded', function () {
      expect(initialFeedEntries[0].host).not.toBe(secondFeedEntries[0].host)
    })
  })
}())
