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
  describe('RSS Feeds', function () {
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
      setTimeout(() => {
        expect(body.hasClass('menu-hidden')).not.toBe(true)
        const newMenu = $('.slide-menu')
        expect(newMenu.css('transform')).toBe('matrix(1, 0, 0, 1, 0, 0)')
      }, 2000)
    })

    it('when clicked, hides the menu', function () {
      expect(body.hasClass('menu-hidden')).not.toBe(true)
      menuLink.trigger('click')
      expect(body.hasClass('menu-hidden')).toBe(true)
    })
  })

  describe('Initial Entries', function () {
    let feedCount = 0

    beforeEach(function (done) {
      loadFeed(0, function () {
        feedCount = $('.entry-link').length
        done()
      })
    })

    it('when loaded contained an entry', function () {
      expect(feedCount).toBeGreaterThan(0)
    })
  })

  describe('New Feed Selection', function () {
    let initialFeedEntries = []
    let anotherEntries = []

    beforeEach(function (done) {
      loadFeed(0, function () {
        const allEntries = $('.entry-link')
        for (let index = 0; index < allEntries.length; index++) {
          initialFeedEntries.push(allEntries[index])
        }
        done()
      })
    })

    afterEach(function (done) {
      loadFeed(1, function () {
        const allEntries = $('.entry-link')
        for (let index = 0; index < allEntries.length; index++) {
          anotherEntries.push(allEntries[index])
          done()
        }
      })
    })

    it('when entry is loaded', function () {
      expect(initialFeedEntries.length).toBeGreaterThan(0)
    })

    it('when another feed is loaded', function () {
      expect(initialFeedEntries[0].host).not.toBe(anotherEntries[0].host)
    })
  })
}())
