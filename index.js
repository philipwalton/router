/**
 * @constructor Router
 * @return {Router}
 */
function Router() {
  if (!(this instanceof Router)) {
    return new Router();
  }
  this.routes_ = [];
}


/**
 * Add a route, which consists of a pattern and a handler to be considered
 * for a match against a URL.
 *
 * #### Patterns
 * Patterns are considered in the order they are added, and when a pattern
 * matches, no subsequent routes are considered.
 * String patterns must match the entire URL exactly. If you need a substring
 * match, you can use a regular expression.
 *
 * String patterns can be literal matches or they can use angle brackets for
 * dynamic matching via capture groups. The following formats are supported:
 * - Named capture groups: `/products/<id>/`
 * - Named capture groups with formatting: `/products/<id:\\d{1,2}>/`
 *   (note: remember to properly escape backslashed in your regex strings.)
 *
 * For full matching control, you can also use a regular expression:
 * - `/\/products\/(\d{1,2})\//`
 *
 * #### Handers
 * Handers are invoked when a pattern matches a URL. Any capture groups are
 * passed as arguments to the handler when it is invoked.
 *
 * @method case
 * @param {string|RegExp} pattern The pattern to match.
 * @param {Function} fn The handler to be invoked when the pattern matches.
 * @return {Router} Returns this.
 */
Router.prototype.case = function(pattern, fn) {
  if (typeof pattern == 'string') {
    pattern = this.regexize_(pattern);
  }

  this.routes_.push({
    pattern: pattern,
    fn: fn
  });

  return this;
};


/**
 * Campare a URL against all provided patterns and call the first matching
 * handler.
 *
 * @method match
 * @param {string} path The path to match the routes against. If no path is
 *      provided it defaults to `window.location.pathname`.
 * @return {Router} Returns this.
 */
Router.prototype.match = function(path) {
  path = path || window.location.pathname;
  for (var i = 0, route; route = this.routes_[i]; i++) {
    var matches = route.pattern.exec(path);
    if (matches) {
      return route.fn.apply(null, matches.slice(1));
    }
  }

  return this;
};


Router.prototype.regexize_ = function(pattern) {
  pattern = pattern.replace(/<([a-z]+):?([^>]+)?>/g, function() {
    return '(' + (arguments[2] || '\\w+') + ')';
  });

  debugger
  return new RegExp('^' + pattern + '$');
}


module.exports = Router;
