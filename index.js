function Router() {
  this.routes_ = [];
}

Router.prototype.case = function(pattern, fn) {
  if (typeof pattern == 'string') {
    pattern = new RegExp('^' + pattern.replace(/:[\w-]+/g, '([\\w\\-]+)'));
  }

  this.routes_.push({
    pattern: pattern,
    fn: fn
  });

  return this;
};

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

// Expose the router factory.
function router() {
  return new Router();
}
// Also expose the contructor in cases someone needs it.
// Since routes are usually global this is probalby mostly unnecessary.
router.Router = Router;

module.exports = router;
