# Class: Router

## Router()

Create a new router instance.

#### Returns

- *(Router)*

## case(pattern, fn)

<p>Add a route, which consists of a pattern and a handler to be considered for a match against a URL.</p>
<h4>Patterns</h4>
<p>Patterns are considered in the order they are added, and when a pattern matches, no subsequent routes are considered. String patterns must match the entire URL exactly. If you need a substring match, you can use a regular expression.</p><p>String patterns can be literal matches or they can use angle brackets for dynamic matching via capture groups. The following formats are supported:</p><ul>
<li>Named capture groups: <code>/products/&lt;id&gt;/</code></li>
<li>Named capture groups with formatting: <code>/products/&lt;id:\\d{1,2}&gt;/</code> (note: remember to properly escape backslashed in your regex strings.)</li>
</ul>
<p>For full matching control, you can also use a regular expression:</p><ul>
<li><code>/\/products\/(\d{1,2})\//</code></li>
</ul>
<h4>Handers</h4>
<p>Handers are invoked when a pattern matches a URL. Any capture groups are passed as arguments to the handler when it is invoked.</p>

#### Parameters

- `pattern`: *(string|RegExp)* The pattern to match.
- `fn`: *(Function)* The handler to be invoked when the pattern matches.

#### Returns

- *(Router)* Returns this.

## match(path)
<p>Campare a URL against all provided patterns and call the first matching handler.</p>

#### Parameters

- `path`: *(string)* The path to match the routes against. If no path is      provided it defaults to `window.location.pathname`.

#### Returns

- *(Router)* Returns this.
