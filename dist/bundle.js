/*! For license information please see bundle.js.LICENSE.txt */
;(() => {
  'use strict'
  var t,
    e,
    n,
    r,
    i = {
      599: (t, e, n) => {
        function r() {
          return (
            (r = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e]
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                  }
                  return t
                }),
            r.apply(this, arguments)
          )
        }
        var i
        n.d(e, {
          Ep: () => d,
          J0: () => s,
          LX: () => O,
          OF: () => U,
          RQ: () => j,
          WK: () => W,
          X3: () => B,
          Zn: () => T,
          aU: () => i,
          cP: () => h,
          cm: () => A,
          fp: () => b,
          p7: () => et,
          pC: () => N,
          q_: () => a,
        }),
          (function (t) {
            ;(t.Pop = 'POP'), (t.Push = 'PUSH'), (t.Replace = 'REPLACE')
          })(i || (i = {}))
        const o = 'popstate'
        function a(t) {
          return (
            void 0 === t && (t = {}),
            f(
              function (t, e) {
                let {
                  pathname: n = '/',
                  search: r = '',
                  hash: i = '',
                } = h(t.location.hash.substr(1))
                return (
                  n.startsWith('/') || n.startsWith('.') || (n = '/' + n),
                  u(
                    '',
                    { pathname: n, search: r, hash: i },
                    (e.state && e.state.usr) || null,
                    (e.state && e.state.key) || 'default',
                  )
                )
              },
              function (t, e) {
                let n = t.document.querySelector('base'),
                  r = ''
                if (n && n.getAttribute('href')) {
                  let e = t.location.href,
                    n = e.indexOf('#')
                  r = -1 === n ? e : e.slice(0, n)
                }
                return r + '#' + ('string' == typeof e ? e : d(e))
              },
              function (t, e) {
                l(
                  '/' === t.pathname.charAt(0),
                  'relative pathnames are not supported in hash history.push(' +
                    JSON.stringify(e) +
                    ')',
                )
              },
              t,
            )
          )
        }
        function s(t, e) {
          if (!1 === t || null == t) throw new Error(e)
        }
        function l(t, e) {
          if (!t) {
            'undefined' != typeof console && console.warn(e)
            try {
              throw new Error(e)
            } catch (t) {}
          }
        }
        function c(t, e) {
          return { usr: t.state, key: t.key, idx: e }
        }
        function u(t, e, n, i) {
          return (
            void 0 === n && (n = null),
            r(
              {
                pathname: 'string' == typeof t ? t : t.pathname,
                search: '',
                hash: '',
              },
              'string' == typeof e ? h(e) : e,
              {
                state: n,
                key: (e && e.key) || i || Math.random().toString(36).substr(2, 8),
              },
            )
          )
        }
        function d(t) {
          let { pathname: e = '/', search: n = '', hash: r = '' } = t
          return (
            n && '?' !== n && (e += '?' === n.charAt(0) ? n : '?' + n),
            r && '#' !== r && (e += '#' === r.charAt(0) ? r : '#' + r),
            e
          )
        }
        function h(t) {
          let e = {}
          if (t) {
            let n = t.indexOf('#')
            n >= 0 && ((e.hash = t.substr(n)), (t = t.substr(0, n)))
            let r = t.indexOf('?')
            r >= 0 && ((e.search = t.substr(r)), (t = t.substr(0, r))),
              t && (e.pathname = t)
          }
          return e
        }
        function f(t, e, n, a) {
          void 0 === a && (a = {})
          let { window: l = document.defaultView, v5Compat: h = !1 } = a,
            f = l.history,
            p = i.Pop,
            g = null,
            m = b()
          function b() {
            return (f.state || { idx: null }).idx
          }
          function y() {
            p = i.Pop
            let t = b(),
              e = null == t ? null : t - m
            ;(m = t), g && g({ action: p, location: x.location, delta: e })
          }
          function v(t) {
            let e =
                'null' !== l.location.origin ? l.location.origin : l.location.href,
              n = 'string' == typeof t ? t : d(t)
            return (
              s(
                e,
                'No window.location.(origin|href) available to create URL for href: ' +
                  n,
              ),
              new URL(n, e)
            )
          }
          null == m && ((m = 0), f.replaceState(r({}, f.state, { idx: m }), ''))
          let x = {
            get action() {
              return p
            },
            get location() {
              return t(l, f)
            },
            listen(t) {
              if (g) throw new Error('A history only accepts one active listener')
              return (
                l.addEventListener(o, y),
                (g = t),
                () => {
                  l.removeEventListener(o, y), (g = null)
                }
              )
            },
            createHref: (t) => e(l, t),
            createURL: v,
            encodeLocation(t) {
              let e = v(t)
              return { pathname: e.pathname, search: e.search, hash: e.hash }
            },
            push: function (t, e) {
              p = i.Push
              let r = u(x.location, t, e)
              n && n(r, t), (m = b() + 1)
              let o = c(r, m),
                a = x.createHref(r)
              try {
                f.pushState(o, '', a)
              } catch (t) {
                if (t instanceof DOMException && 'DataCloneError' === t.name)
                  throw t
                l.location.assign(a)
              }
              h && g && g({ action: p, location: x.location, delta: 1 })
            },
            replace: function (t, e) {
              p = i.Replace
              let r = u(x.location, t, e)
              n && n(r, t), (m = b())
              let o = c(r, m),
                a = x.createHref(r)
              f.replaceState(o, '', a),
                h && g && g({ action: p, location: x.location, delta: 0 })
            },
            go: (t) => f.go(t),
          }
          return x
        }
        var p
        !(function (t) {
          ;(t.data = 'data'),
            (t.deferred = 'deferred'),
            (t.redirect = 'redirect'),
            (t.error = 'error')
        })(p || (p = {}))
        const g = new Set([
          'lazy',
          'caseSensitive',
          'path',
          'id',
          'index',
          'children',
        ])
        function m(t, e, n, i) {
          return (
            void 0 === n && (n = []),
            void 0 === i && (i = {}),
            t.map((t, o) => {
              let a = [...n, o],
                l = 'string' == typeof t.id ? t.id : a.join('-')
              if (
                (s(
                  !0 !== t.index || !t.children,
                  'Cannot specify children on an index route',
                ),
                s(
                  !i[l],
                  'Found a route id collision on id "' +
                    l +
                    '".  Route id\'s must be globally unique within Data Router usages',
                ),
                (function (t) {
                  return !0 === t.index
                })(t))
              ) {
                let n = r({}, t, e(t), { id: l })
                return (i[l] = n), n
              }
              {
                let n = r({}, t, e(t), { id: l, children: void 0 })
                return (
                  (i[l] = n), t.children && (n.children = m(t.children, e, a, i)), n
                )
              }
            })
          )
        }
        function b(t, e, n) {
          void 0 === n && (n = '/')
          let r = T(('string' == typeof e ? h(e) : e).pathname || '/', n)
          if (null == r) return null
          let i = y(t)
          !(function (t) {
            t.sort((t, e) =>
              t.score !== e.score
                ? e.score - t.score
                : (function (t, e) {
                    let n =
                      t.length === e.length &&
                      t.slice(0, -1).every((t, n) => t === e[n])
                    return n ? t[t.length - 1] - e[e.length - 1] : 0
                  })(
                    t.routesMeta.map((t) => t.childrenIndex),
                    e.routesMeta.map((t) => t.childrenIndex),
                  ),
            )
          })(i)
          let o = null
          for (let t = 0; null == o && t < i.length; ++t) o = P(i[t], D(r))
          return o
        }
        function y(t, e, n, r) {
          void 0 === e && (e = []),
            void 0 === n && (n = []),
            void 0 === r && (r = '')
          let i = (t, i, o) => {
            let a = {
              relativePath: void 0 === o ? t.path || '' : o,
              caseSensitive: !0 === t.caseSensitive,
              childrenIndex: i,
              route: t,
            }
            a.relativePath.startsWith('/') &&
              (s(
                a.relativePath.startsWith(r),
                'Absolute route path "' +
                  a.relativePath +
                  '" nested under path "' +
                  r +
                  '" is not valid. An absolute child route path must start with the combined path of all its parent routes.',
              ),
              (a.relativePath = a.relativePath.slice(r.length)))
            let l = j([r, a.relativePath]),
              c = n.concat(a)
            t.children &&
              t.children.length > 0 &&
              (s(
                !0 !== t.index,
                'Index routes must not have child routes. Please remove all child routes from route path "' +
                  l +
                  '".',
              ),
              y(t.children, e, c, l)),
              (null != t.path || t.index) &&
                e.push({ path: l, score: M(l, t.index), routesMeta: c })
          }
          return (
            t.forEach((t, e) => {
              var n
              if ('' !== t.path && null != (n = t.path) && n.includes('?'))
                for (let n of v(t.path)) i(t, e, n)
              else i(t, e)
            }),
            e
          )
        }
        function v(t) {
          let e = t.split('/')
          if (0 === e.length) return []
          let [n, ...r] = e,
            i = n.endsWith('?'),
            o = n.replace(/\?$/, '')
          if (0 === r.length) return i ? [o, ''] : [o]
          let a = v(r.join('/')),
            s = []
          return (
            s.push(...a.map((t) => ('' === t ? o : [o, t].join('/')))),
            i && s.push(...a),
            s.map((e) => (t.startsWith('/') && '' === e ? '/' : e))
          )
        }
        const x = /^:[\w-]+$/,
          w = 3,
          _ = 2,
          k = 1,
          S = 10,
          E = -2,
          C = (t) => '*' === t
        function M(t, e) {
          let n = t.split('/'),
            r = n.length
          return (
            n.some(C) && (r += E),
            e && (r += _),
            n
              .filter((t) => !C(t))
              .reduce((t, e) => t + (x.test(e) ? w : '' === e ? k : S), r)
          )
        }
        function P(t, e) {
          let { routesMeta: n } = t,
            r = {},
            i = '/',
            o = []
          for (let t = 0; t < n.length; ++t) {
            let a = n[t],
              s = t === n.length - 1,
              l = '/' === i ? e : e.slice(i.length) || '/',
              c = O(
                { path: a.relativePath, caseSensitive: a.caseSensitive, end: s },
                l,
              )
            if (!c) return null
            Object.assign(r, c.params)
            let u = a.route
            o.push({
              params: r,
              pathname: j([i, c.pathname]),
              pathnameBase: z(j([i, c.pathnameBase])),
              route: u,
            }),
              '/' !== c.pathnameBase && (i = j([i, c.pathnameBase]))
          }
          return o
        }
        function O(t, e) {
          'string' == typeof t && (t = { path: t, caseSensitive: !1, end: !0 })
          let [n, r] = (function (t, e, n) {
              void 0 === e && (e = !1)
              void 0 === n && (n = !0)
              l(
                '*' === t || !t.endsWith('*') || t.endsWith('/*'),
                'Route path "' +
                  t +
                  '" will be treated as if it were "' +
                  t.replace(/\*$/, '/*') +
                  '" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "' +
                  t.replace(/\*$/, '/*') +
                  '".',
              )
              let r = [],
                i =
                  '^' +
                  t
                    .replace(/\/*\*?$/, '')
                    .replace(/^\/*/, '/')
                    .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
                    .replace(
                      /\/:([\w-]+)(\?)?/g,
                      (t, e, n) => (
                        r.push({ paramName: e, isOptional: null != n }),
                        n ? '/?([^\\/]+)?' : '/([^\\/]+)'
                      ),
                    )
              t.endsWith('*')
                ? (r.push({ paramName: '*' }),
                  (i += '*' === t || '/*' === t ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
                : n
                  ? (i += '\\/*$')
                  : '' !== t && '/' !== t && (i += '(?:(?=\\/|$))')
              let o = new RegExp(i, e ? void 0 : 'i')
              return [o, r]
            })(t.path, t.caseSensitive, t.end),
            i = e.match(n)
          if (!i) return null
          let o = i[0],
            a = o.replace(/(.)\/+$/, '$1'),
            s = i.slice(1)
          return {
            params: r.reduce((t, e, n) => {
              let { paramName: r, isOptional: i } = e
              if ('*' === r) {
                let t = s[n] || ''
                a = o.slice(0, o.length - t.length).replace(/(.)\/+$/, '$1')
              }
              const c = s[n]
              return (
                (t[r] =
                  i && !c
                    ? void 0
                    : (function (t, e) {
                        try {
                          return decodeURIComponent(t)
                        } catch (n) {
                          return (
                            l(
                              !1,
                              'The value for the URL param "' +
                                e +
                                '" will not be decoded because the string "' +
                                t +
                                '" is a malformed URL segment. This is probably due to a bad percent encoding (' +
                                n +
                                ').',
                            ),
                            t
                          )
                        }
                      })(c || '', r)),
                t
              )
            }, {}),
            pathname: o,
            pathnameBase: a,
            pattern: t,
          }
        }
        function D(t) {
          try {
            return decodeURI(t)
          } catch (e) {
            return (
              l(
                !1,
                'The URL path "' +
                  t +
                  '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (' +
                  e +
                  ').',
              ),
              t
            )
          }
        }
        function T(t, e) {
          if ('/' === e) return t
          if (!t.toLowerCase().startsWith(e.toLowerCase())) return null
          let n = e.endsWith('/') ? e.length - 1 : e.length,
            r = t.charAt(n)
          return r && '/' !== r ? null : t.slice(n) || '/'
        }
        function R(t, e, n, r) {
          return (
            "Cannot include a '" +
            t +
            "' character in a manually specified `to." +
            e +
            '` field [' +
            JSON.stringify(r) +
            '].  Please separate it out to the `to.' +
            n +
            '` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'
          )
        }
        function L(t) {
          return t.filter(
            (t, e) => 0 === e || (t.route.path && t.route.path.length > 0),
          )
        }
        function A(t, e) {
          let n = L(t)
          return e
            ? n.map((e, n) => (n === t.length - 1 ? e.pathname : e.pathnameBase))
            : n.map((t) => t.pathnameBase)
        }
        function N(t, e, n, i) {
          let o
          void 0 === i && (i = !1),
            'string' == typeof t
              ? (o = h(t))
              : ((o = r({}, t)),
                s(
                  !o.pathname || !o.pathname.includes('?'),
                  R('?', 'pathname', 'search', o),
                ),
                s(
                  !o.pathname || !o.pathname.includes('#'),
                  R('#', 'pathname', 'hash', o),
                ),
                s(
                  !o.search || !o.search.includes('#'),
                  R('#', 'search', 'hash', o),
                ))
          let a,
            l = '' === t || '' === o.pathname,
            c = l ? '/' : o.pathname
          if (null == c) a = n
          else {
            let t = e.length - 1
            if (!i && c.startsWith('..')) {
              let e = c.split('/')
              for (; '..' === e[0]; ) e.shift(), (t -= 1)
              o.pathname = e.join('/')
            }
            a = t >= 0 ? e[t] : '/'
          }
          let u = (function (t, e) {
              void 0 === e && (e = '/')
              let {
                  pathname: n,
                  search: r = '',
                  hash: i = '',
                } = 'string' == typeof t ? h(t) : t,
                o = n
                  ? n.startsWith('/')
                    ? n
                    : (function (t, e) {
                        let n = e.replace(/\/+$/, '').split('/')
                        return (
                          t.split('/').forEach((t) => {
                            '..' === t
                              ? n.length > 1 && n.pop()
                              : '.' !== t && n.push(t)
                          }),
                          n.length > 1 ? n.join('/') : '/'
                        )
                      })(n, e)
                  : e
              return { pathname: o, search: F(r), hash: I(i) }
            })(o, a),
            d = c && '/' !== c && c.endsWith('/'),
            f = (l || '.' === c) && n.endsWith('/')
          return u.pathname.endsWith('/') || (!d && !f) || (u.pathname += '/'), u
        }
        const j = (t) => t.join('/').replace(/\/\/+/g, '/'),
          z = (t) => t.replace(/\/+$/, '').replace(/^\/*/, '/'),
          F = (t) => (t && '?' !== t ? (t.startsWith('?') ? t : '?' + t) : ''),
          I = (t) => (t && '#' !== t ? (t.startsWith('#') ? t : '#' + t) : '')
        class B extends Error {}
        class U {
          constructor(t, e, n, r) {
            void 0 === r && (r = !1),
              (this.status = t),
              (this.statusText = e || ''),
              (this.internal = r),
              n instanceof Error
                ? ((this.data = n.toString()), (this.error = n))
                : (this.data = n)
          }
        }
        function W(t) {
          return (
            null != t &&
            'number' == typeof t.status &&
            'string' == typeof t.statusText &&
            'boolean' == typeof t.internal &&
            'data' in t
          )
        }
        const V = ['post', 'put', 'patch', 'delete'],
          H = new Set(V),
          $ = ['get', ...V],
          Y = new Set($),
          q = new Set([301, 302, 303, 307, 308]),
          Q = new Set([307, 308]),
          X = {
            state: 'idle',
            location: void 0,
            formMethod: void 0,
            formAction: void 0,
            formEncType: void 0,
            formData: void 0,
            json: void 0,
            text: void 0,
          },
          K = {
            state: 'idle',
            data: void 0,
            formMethod: void 0,
            formAction: void 0,
            formEncType: void 0,
            formData: void 0,
            json: void 0,
            text: void 0,
          },
          Z = {
            state: 'unblocked',
            proceed: void 0,
            reset: void 0,
            location: void 0,
          },
          J = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
          G = (t) => ({ hasErrorBoundary: Boolean(t.hasErrorBoundary) }),
          tt = 'remix-router-transitions'
        function et(t) {
          const e = t.window
              ? t.window
              : 'undefined' != typeof window
                ? window
                : void 0,
            n =
              void 0 !== e &&
              void 0 !== e.document &&
              void 0 !== e.document.createElement,
            o = !n
          let a
          if (
            (s(
              t.routes.length > 0,
              'You must provide a non-empty routes array to createRouter',
            ),
            t.mapRouteProperties)
          )
            a = t.mapRouteProperties
          else if (t.detectErrorBoundary) {
            let e = t.detectErrorBoundary
            a = (t) => ({ hasErrorBoundary: e(t) })
          } else a = G
          let c,
            d,
            h = {},
            f = m(t.routes, a, void 0, h),
            g = t.basename || '/',
            y = r(
              {
                v7_fetcherPersist: !1,
                v7_normalizeFormMethod: !1,
                v7_partialHydration: !1,
                v7_prependBasename: !1,
                v7_relativeSplatPath: !1,
              },
              t.future,
            ),
            v = null,
            x = new Set(),
            w = null,
            _ = null,
            k = null,
            S = null != t.hydrationData,
            E = b(f, t.history.location, g),
            C = null
          if (null == E) {
            let e = yt(404, { pathname: t.history.location.pathname }),
              { matches: n, route: r } = bt(f)
            ;(E = n), (C = { [r.id]: e })
          }
          let M,
            P = E.some((t) => t.route.lazy),
            O = E.some((t) => t.route.loader)
          if (P) d = !1
          else if (O)
            if (y.v7_partialHydration) {
              let e = t.hydrationData ? t.hydrationData.loaderData : null,
                n = t.hydrationData ? t.hydrationData.errors : null
              d = E.every(
                (t) =>
                  t.route.loader &&
                  !0 !== t.route.loader.hydrate &&
                  ((e && void 0 !== e[t.route.id]) ||
                    (n && void 0 !== n[t.route.id])),
              )
            } else d = null != t.hydrationData
          else d = !0
          let D,
            R = {
              historyAction: t.history.action,
              location: t.history.location,
              matches: E,
              initialized: d,
              navigation: X,
              restoreScrollPosition: null == t.hydrationData && null,
              preventScrollReset: !1,
              revalidation: 'idle',
              loaderData: (t.hydrationData && t.hydrationData.loaderData) || {},
              actionData: (t.hydrationData && t.hydrationData.actionData) || null,
              errors: (t.hydrationData && t.hydrationData.errors) || C,
              fetchers: new Map(),
              blockers: new Map(),
            },
            L = i.Pop,
            A = !1,
            N = !1,
            j = new Map(),
            z = null,
            F = !1,
            I = !1,
            B = [],
            U = [],
            W = new Map(),
            V = 0,
            H = -1,
            $ = new Map(),
            Y = new Set(),
            q = new Map(),
            et = new Map(),
            it = new Set(),
            at = new Map(),
            st = new Map(),
            lt = !1
          function dt(t, e) {
            void 0 === e && (e = {}), (R = r({}, R, t))
            let n = [],
              i = []
            y.v7_fetcherPersist &&
              R.fetchers.forEach((t, e) => {
                'idle' === t.state && (it.has(e) ? i.push(e) : n.push(e))
              }),
              [...x].forEach((t) =>
                t(R, {
                  deletedFetchers: i,
                  unstable_viewTransitionOpts: e.viewTransitionOpts,
                  unstable_flushSync: !0 === e.flushSync,
                }),
              ),
              y.v7_fetcherPersist &&
                (n.forEach((t) => R.fetchers.delete(t)), i.forEach((t) => zt(t)))
          }
          function ht(e, n, o) {
            var a, s
            let l,
              { flushSync: u } = void 0 === o ? {} : o,
              d =
                null != R.actionData &&
                null != R.navigation.formMethod &&
                Ct(R.navigation.formMethod) &&
                'loading' === R.navigation.state &&
                !0 !== (null == (a = e.state) ? void 0 : a._isRedirect)
            l = n.actionData
              ? Object.keys(n.actionData).length > 0
                ? n.actionData
                : null
              : d
                ? R.actionData
                : null
            let h = n.loaderData
                ? gt(R.loaderData, n.loaderData, n.matches || [], n.errors)
                : R.loaderData,
              p = R.blockers
            p.size > 0 && ((p = new Map(p)), p.forEach((t, e) => p.set(e, Z)))
            let g,
              m =
                !0 === A ||
                (null != R.navigation.formMethod &&
                  Ct(R.navigation.formMethod) &&
                  !0 !== (null == (s = e.state) ? void 0 : s._isRedirect))
            if (
              (c && ((f = c), (c = void 0)),
              F ||
                L === i.Pop ||
                (L === i.Push
                  ? t.history.push(e, e.state)
                  : L === i.Replace && t.history.replace(e, e.state)),
              L === i.Pop)
            ) {
              let t = j.get(R.location.pathname)
              t && t.has(e.pathname)
                ? (g = { currentLocation: R.location, nextLocation: e })
                : j.has(e.pathname) &&
                  (g = { currentLocation: e, nextLocation: R.location })
            } else if (N) {
              let t = j.get(R.location.pathname)
              t
                ? t.add(e.pathname)
                : ((t = new Set([e.pathname])), j.set(R.location.pathname, t)),
                (g = { currentLocation: R.location, nextLocation: e })
            }
            dt(
              r({}, n, {
                actionData: l,
                loaderData: h,
                historyAction: L,
                location: e,
                initialized: !0,
                navigation: X,
                revalidation: 'idle',
                restoreScrollPosition: qt(e, n.matches || R.matches),
                preventScrollReset: m,
                blockers: p,
              }),
              { viewTransitionOpts: g, flushSync: !0 === u },
            ),
              (L = i.Pop),
              (A = !1),
              (N = !1),
              (F = !1),
              (I = !1),
              (B = []),
              (U = [])
          }
          async function ft(e, n, o) {
            D && D.abort(),
              (D = null),
              (L = e),
              (F = !0 === (o && o.startUninterruptedRevalidation)),
              (function (t, e) {
                if (w && k) {
                  let n = Yt(t, e)
                  w[n] = k()
                }
              })(R.location, R.matches),
              (A = !0 === (o && o.preventScrollReset)),
              (N = !0 === (o && o.enableViewTransition))
            let s = c || f,
              l = o && o.overrideNavigation,
              u = b(s, n, g),
              d = !0 === (o && o.flushSync)
            if (!u) {
              let t = yt(404, { pathname: n.pathname }),
                { matches: e, route: r } = bt(s)
              return (
                $t(),
                void ht(
                  n,
                  { matches: e, loaderData: {}, errors: { [r.id]: t } },
                  { flushSync: d },
                )
              )
            }
            if (
              R.initialized &&
              !I &&
              (function (t, e) {
                if (t.pathname !== e.pathname || t.search !== e.search) return !1
                if ('' === t.hash) return '' !== e.hash
                if (t.hash === e.hash) return !0
                if ('' !== e.hash) return !0
                return !1
              })(R.location, n) &&
              !(o && o.submission && Ct(o.submission.formMethod))
            )
              return void ht(n, { matches: u }, { flushSync: d })
            D = new AbortController()
            let m,
              v,
              x = ut(t.history, n, D.signal, o && o.submission)
            if (o && o.pendingError) v = { [mt(u).route.id]: o.pendingError }
            else if (o && o.submission && Ct(o.submission.formMethod)) {
              let t = await (async function (t, e, n, r, o) {
                void 0 === o && (o = {})
                Et()
                let s,
                  l = (function (t, e) {
                    let n = {
                      state: 'submitting',
                      location: t,
                      formMethod: e.formMethod,
                      formAction: e.formAction,
                      formEncType: e.formEncType,
                      formData: e.formData,
                      json: e.json,
                      text: e.text,
                    }
                    return n
                  })(e, n)
                dt({ navigation: l }, { flushSync: !0 === o.flushSync })
                let c = Dt(r, e)
                if (c.route.action || c.route.lazy) {
                  if (
                    ((s = await ct(
                      'action',
                      t,
                      c,
                      r,
                      h,
                      a,
                      g,
                      y.v7_relativeSplatPath,
                    )),
                    t.signal.aborted)
                  )
                    return { shortCircuited: !0 }
                } else
                  s = {
                    type: p.error,
                    error: yt(405, {
                      method: t.method,
                      pathname: e.pathname,
                      routeId: c.route.id,
                    }),
                  }
                if (kt(s)) {
                  let t
                  return (
                    (t =
                      o && null != o.replace
                        ? o.replace
                        : s.location === R.location.pathname + R.location.search),
                    await xt(R, s, { submission: n, replace: t }),
                    { shortCircuited: !0 }
                  )
                }
                if (_t(s)) {
                  let t = mt(r, c.route.id)
                  return (
                    !0 !== (o && o.replace) && (L = i.Push),
                    {
                      pendingActionData: {},
                      pendingActionError: { [t.route.id]: s.error },
                    }
                  )
                }
                if (wt(s)) throw yt(400, { type: 'defer-action' })
                return { pendingActionData: { [c.route.id]: s.data } }
              })(x, n, o.submission, u, { replace: o.replace, flushSync: d })
              if (t.shortCircuited) return
              ;(m = t.pendingActionData),
                (v = t.pendingActionError),
                (l = Rt(n, o.submission)),
                (d = !1),
                (x = new Request(x.url, { signal: x.signal }))
            }
            let {
              shortCircuited: _,
              loaderData: S,
              errors: E,
            } = await (async function (e, n, i, o, a, s, l, u, d, h, p) {
              let m = o || Rt(n, a),
                b = a || s || Tt(m),
                v = c || f,
                [x, w] = ot(
                  t.history,
                  R,
                  i,
                  b,
                  n,
                  y.v7_partialHydration && !0 === u,
                  I,
                  B,
                  U,
                  it,
                  q,
                  Y,
                  v,
                  g,
                  h,
                  p,
                )
              if (
                ($t(
                  (t) =>
                    !(i && i.some((e) => e.route.id === t)) ||
                    (x && x.some((e) => e.route.id === t)),
                ),
                (H = ++V),
                0 === x.length && 0 === w.length)
              ) {
                let t = Bt()
                return (
                  ht(
                    n,
                    r(
                      { matches: i, loaderData: {}, errors: p || null },
                      h ? { actionData: h } : {},
                      t ? { fetchers: new Map(R.fetchers) } : {},
                    ),
                    { flushSync: d },
                  ),
                  { shortCircuited: !0 }
                )
              }
              if (!(F || (y.v7_partialHydration && u))) {
                w.forEach((t) => {
                  let e = R.fetchers.get(t.key),
                    n = Lt(void 0, e ? e.data : void 0)
                  R.fetchers.set(t.key, n)
                })
                let t = h || R.actionData
                dt(
                  r(
                    { navigation: m },
                    t
                      ? 0 === Object.keys(t).length
                        ? { actionData: null }
                        : { actionData: t }
                      : {},
                    w.length > 0 ? { fetchers: new Map(R.fetchers) } : {},
                  ),
                  { flushSync: d },
                )
              }
              w.forEach((t) => {
                W.has(t.key) && Ft(t.key),
                  t.controller && W.set(t.key, t.controller)
              })
              let _ = () => w.forEach((t) => Ft(t.key))
              D && D.signal.addEventListener('abort', _)
              let {
                results: k,
                loaderResults: S,
                fetcherResults: E,
              } = await St(R.matches, i, x, w, e)
              if (e.signal.aborted) return { shortCircuited: !0 }
              D && D.signal.removeEventListener('abort', _)
              w.forEach((t) => W.delete(t.key))
              let C = vt(k)
              if (C) {
                if (C.idx >= x.length) {
                  let t = w[C.idx - x.length].key
                  Y.add(t)
                }
                return await xt(R, C.result, { replace: l }), { shortCircuited: !0 }
              }
              let { loaderData: M, errors: P } = pt(R, i, x, S, p, w, E, at)
              at.forEach((t, e) => {
                t.subscribe((n) => {
                  ;(n || t.done) && at.delete(e)
                })
              })
              let O = Bt(),
                T = Ut(H),
                L = O || T || w.length > 0
              return r(
                { loaderData: M, errors: P },
                L ? { fetchers: new Map(R.fetchers) } : {},
              )
            })(
              x,
              n,
              u,
              l,
              o && o.submission,
              o && o.fetcherSubmission,
              o && o.replace,
              o && !0 === o.initialHydration,
              d,
              m,
              v,
            )
            _ ||
              ((D = null),
              ht(
                n,
                r({ matches: u }, m ? { actionData: m } : {}, {
                  loaderData: S,
                  errors: E,
                }),
              ))
          }
          async function xt(o, a, l) {
            let {
              submission: c,
              fetcherSubmission: d,
              replace: h,
            } = void 0 === l ? {} : l
            a.revalidate && (I = !0)
            let f = u(o.location, a.location, { _isRedirect: !0 })
            if ((s(f, 'Expected a location on the redirect navigation'), n)) {
              let n = !1
              if (a.reloadDocument) n = !0
              else if (J.test(a.location)) {
                const r = t.history.createURL(a.location)
                n = r.origin !== e.location.origin || null == T(r.pathname, g)
              }
              if (n)
                return void (h
                  ? e.location.replace(a.location)
                  : e.location.assign(a.location))
            }
            D = null
            let p = !0 === h ? i.Replace : i.Push,
              { formMethod: m, formAction: b, formEncType: y } = o.navigation
            !c && !d && m && b && y && (c = Tt(o.navigation))
            let v = c || d
            if (Q.has(a.status) && v && Ct(v.formMethod))
              await ft(p, f, {
                submission: r({}, v, { formAction: a.location }),
                preventScrollReset: A,
              })
            else {
              let t = Rt(f, c)
              await ft(p, f, {
                overrideNavigation: t,
                fetcherSubmission: d,
                preventScrollReset: A,
              })
            }
          }
          async function St(e, n, r, i, o) {
            let s = await Promise.all([
                ...r.map((t) =>
                  ct('loader', o, t, n, h, a, g, y.v7_relativeSplatPath),
                ),
                ...i.map((e) => {
                  if (e.matches && e.match && e.controller)
                    return ct(
                      'loader',
                      ut(t.history, e.path, e.controller.signal),
                      e.match,
                      e.matches,
                      h,
                      a,
                      g,
                      y.v7_relativeSplatPath,
                    )
                  return { type: p.error, error: yt(404, { pathname: e.path }) }
                }),
              ]),
              l = s.slice(0, r.length),
              c = s.slice(r.length)
            return (
              await Promise.all([
                Mt(
                  e,
                  r,
                  l,
                  l.map(() => o.signal),
                  !1,
                  R.loaderData,
                ),
                Mt(
                  e,
                  i.map((t) => t.match),
                  c,
                  i.map((t) => (t.controller ? t.controller.signal : null)),
                  !0,
                ),
              ]),
              { results: s, loaderResults: l, fetcherResults: c }
            )
          }
          function Et() {
            ;(I = !0),
              B.push(...$t()),
              q.forEach((t, e) => {
                W.has(e) && (U.push(e), Ft(e))
              })
          }
          function Ot(t, e, n) {
            void 0 === n && (n = {}),
              R.fetchers.set(t, e),
              dt(
                { fetchers: new Map(R.fetchers) },
                { flushSync: !0 === (n && n.flushSync) },
              )
          }
          function Nt(t, e, n, r) {
            void 0 === r && (r = {})
            let i = mt(R.matches, e)
            zt(t),
              dt(
                { errors: { [i.route.id]: n }, fetchers: new Map(R.fetchers) },
                { flushSync: !0 === (r && r.flushSync) },
              )
          }
          function jt(t) {
            return (
              y.v7_fetcherPersist &&
                (et.set(t, (et.get(t) || 0) + 1), it.has(t) && it.delete(t)),
              R.fetchers.get(t) || K
            )
          }
          function zt(t) {
            let e = R.fetchers.get(t)
            !W.has(t) || (e && 'loading' === e.state && $.has(t)) || Ft(t),
              q.delete(t),
              $.delete(t),
              Y.delete(t),
              it.delete(t),
              R.fetchers.delete(t)
          }
          function Ft(t) {
            let e = W.get(t)
            s(e, 'Expected fetch controller: ' + t), e.abort(), W.delete(t)
          }
          function It(t) {
            for (let e of t) {
              let t = At(jt(e).data)
              R.fetchers.set(e, t)
            }
          }
          function Bt() {
            let t = [],
              e = !1
            for (let n of Y) {
              let r = R.fetchers.get(n)
              s(r, 'Expected fetcher: ' + n),
                'loading' === r.state && (Y.delete(n), t.push(n), (e = !0))
            }
            return It(t), e
          }
          function Ut(t) {
            let e = []
            for (let [n, r] of $)
              if (r < t) {
                let t = R.fetchers.get(n)
                s(t, 'Expected fetcher: ' + n),
                  'loading' === t.state && (Ft(n), $.delete(n), e.push(n))
              }
            return It(e), e.length > 0
          }
          function Wt(t) {
            R.blockers.delete(t), st.delete(t)
          }
          function Vt(t, e) {
            let n = R.blockers.get(t) || Z
            s(
              ('unblocked' === n.state && 'blocked' === e.state) ||
                ('blocked' === n.state && 'blocked' === e.state) ||
                ('blocked' === n.state && 'proceeding' === e.state) ||
                ('blocked' === n.state && 'unblocked' === e.state) ||
                ('proceeding' === n.state && 'unblocked' === e.state),
              'Invalid blocker state transition: ' + n.state + ' -> ' + e.state,
            )
            let r = new Map(R.blockers)
            r.set(t, e), dt({ blockers: r })
          }
          function Ht(t) {
            let { currentLocation: e, nextLocation: n, historyAction: r } = t
            if (0 === st.size) return
            st.size > 1 && l(!1, 'A router only supports one blocker at a time')
            let i = Array.from(st.entries()),
              [o, a] = i[i.length - 1],
              s = R.blockers.get(o)
            return s && 'proceeding' === s.state
              ? void 0
              : a({ currentLocation: e, nextLocation: n, historyAction: r })
                ? o
                : void 0
          }
          function $t(t) {
            let e = []
            return (
              at.forEach((n, r) => {
                ;(t && !t(r)) || (n.cancel(), e.push(r), at.delete(r))
              }),
              e
            )
          }
          function Yt(t, e) {
            if (_) {
              return (
                _(
                  t,
                  e.map((t) =>
                    (function (t, e) {
                      let { route: n, pathname: r, params: i } = t
                      return {
                        id: n.id,
                        pathname: r,
                        params: i,
                        data: e[n.id],
                        handle: n.handle,
                      }
                    })(t, R.loaderData),
                  ),
                ) || t.key
              )
            }
            return t.key
          }
          function qt(t, e) {
            if (w) {
              let n = Yt(t, e),
                r = w[n]
              if ('number' == typeof r) return r
            }
            return null
          }
          return (
            (M = {
              get basename() {
                return g
              },
              get future() {
                return y
              },
              get state() {
                return R
              },
              get routes() {
                return f
              },
              get window() {
                return e
              },
              initialize: function () {
                if (
                  ((v = t.history.listen((e) => {
                    let { action: n, location: r, delta: i } = e
                    if (lt) return void (lt = !1)
                    l(
                      0 === st.size || null != i,
                      'You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.',
                    )
                    let o = Ht({
                      currentLocation: R.location,
                      nextLocation: r,
                      historyAction: n,
                    })
                    return o && null != i
                      ? ((lt = !0),
                        t.history.go(-1 * i),
                        void Vt(o, {
                          state: 'blocked',
                          location: r,
                          proceed() {
                            Vt(o, {
                              state: 'proceeding',
                              proceed: void 0,
                              reset: void 0,
                              location: r,
                            }),
                              t.history.go(i)
                          },
                          reset() {
                            let t = new Map(R.blockers)
                            t.set(o, Z), dt({ blockers: t })
                          },
                        }))
                      : ft(n, r)
                  })),
                  n)
                ) {
                  !(function (t, e) {
                    try {
                      let n = t.sessionStorage.getItem(tt)
                      if (n) {
                        let t = JSON.parse(n)
                        for (let [n, r] of Object.entries(t || {}))
                          r && Array.isArray(r) && e.set(n, new Set(r || []))
                      }
                    } catch (t) {}
                  })(e, j)
                  let t = () =>
                    (function (t, e) {
                      if (e.size > 0) {
                        let n = {}
                        for (let [t, r] of e) n[t] = [...r]
                        try {
                          t.sessionStorage.setItem(tt, JSON.stringify(n))
                        } catch (t) {
                          l(
                            !1,
                            'Failed to save applied view transitions in sessionStorage (' +
                              t +
                              ').',
                          )
                        }
                      }
                    })(e, j)
                  e.addEventListener('pagehide', t),
                    (z = () => e.removeEventListener('pagehide', t))
                }
                return (
                  R.initialized || ft(i.Pop, R.location, { initialHydration: !0 }),
                  M
                )
              },
              subscribe: function (t) {
                return x.add(t), () => x.delete(t)
              },
              enableScrollRestoration: function (t, e, n) {
                if (((w = t), (k = e), (_ = n || null), !S && R.navigation === X)) {
                  S = !0
                  let t = qt(R.location, R.matches)
                  null != t && dt({ restoreScrollPosition: t })
                }
                return () => {
                  ;(w = null), (k = null), (_ = null)
                }
              },
              navigate: async function e(n, o) {
                if ('number' == typeof n) return void t.history.go(n)
                let a = nt(
                    R.location,
                    R.matches,
                    g,
                    y.v7_prependBasename,
                    n,
                    y.v7_relativeSplatPath,
                    null == o ? void 0 : o.fromRouteId,
                    null == o ? void 0 : o.relative,
                  ),
                  {
                    path: s,
                    submission: l,
                    error: c,
                  } = rt(y.v7_normalizeFormMethod, !1, a, o),
                  d = R.location,
                  h = u(R.location, s, o && o.state)
                h = r({}, h, t.history.encodeLocation(h))
                let f = o && null != o.replace ? o.replace : void 0,
                  p = i.Push
                !0 === f
                  ? (p = i.Replace)
                  : !1 === f ||
                    (null != l &&
                      Ct(l.formMethod) &&
                      l.formAction === R.location.pathname + R.location.search &&
                      (p = i.Replace))
                let m =
                    o && 'preventScrollReset' in o
                      ? !0 === o.preventScrollReset
                      : void 0,
                  b = !0 === (o && o.unstable_flushSync),
                  v = Ht({ currentLocation: d, nextLocation: h, historyAction: p })
                if (!v)
                  return await ft(p, h, {
                    submission: l,
                    pendingError: c,
                    preventScrollReset: m,
                    replace: o && o.replace,
                    enableViewTransition: o && o.unstable_viewTransition,
                    flushSync: b,
                  })
                Vt(v, {
                  state: 'blocked',
                  location: h,
                  proceed() {
                    Vt(v, {
                      state: 'proceeding',
                      proceed: void 0,
                      reset: void 0,
                      location: h,
                    }),
                      e(n, o)
                  },
                  reset() {
                    let t = new Map(R.blockers)
                    t.set(v, Z), dt({ blockers: t })
                  },
                })
              },
              fetch: function (e, n, r, i) {
                if (o)
                  throw new Error(
                    "router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.",
                  )
                W.has(e) && Ft(e)
                let l = !0 === (i && i.unstable_flushSync),
                  u = c || f,
                  d = nt(
                    R.location,
                    R.matches,
                    g,
                    y.v7_prependBasename,
                    r,
                    y.v7_relativeSplatPath,
                    n,
                    null == i ? void 0 : i.relative,
                  ),
                  p = b(u, d, g)
                if (!p)
                  return void Nt(e, n, yt(404, { pathname: d }), { flushSync: l })
                let {
                  path: m,
                  submission: v,
                  error: x,
                } = rt(y.v7_normalizeFormMethod, !0, d, i)
                if (x) return void Nt(e, n, x, { flushSync: l })
                let w = Dt(p, m)
                ;(A = !0 === (i && i.preventScrollReset)),
                  v && Ct(v.formMethod)
                    ? (async function (e, n, r, i, o, l, u) {
                        if ((Et(), q.delete(e), !i.route.action && !i.route.lazy)) {
                          let t = yt(405, {
                            method: u.formMethod,
                            pathname: r,
                            routeId: n,
                          })
                          return void Nt(e, n, t, { flushSync: l })
                        }
                        let d = R.fetchers.get(e)
                        Ot(
                          e,
                          (function (t, e) {
                            let n = {
                              state: 'submitting',
                              formMethod: t.formMethod,
                              formAction: t.formAction,
                              formEncType: t.formEncType,
                              formData: t.formData,
                              json: t.json,
                              text: t.text,
                              data: e ? e.data : void 0,
                            }
                            return n
                          })(u, d),
                          { flushSync: l },
                        )
                        let p = new AbortController(),
                          m = ut(t.history, r, p.signal, u)
                        W.set(e, p)
                        let v = V,
                          x = await ct(
                            'action',
                            m,
                            i,
                            o,
                            h,
                            a,
                            g,
                            y.v7_relativeSplatPath,
                          )
                        if (m.signal.aborted)
                          return void (W.get(e) === p && W.delete(e))
                        if (y.v7_fetcherPersist && it.has(e)) {
                          if (kt(x) || _t(x)) return void Ot(e, At(void 0))
                        } else {
                          if (kt(x))
                            return (
                              W.delete(e),
                              H > v
                                ? void Ot(e, At(void 0))
                                : (Y.add(e),
                                  Ot(e, Lt(u)),
                                  xt(R, x, { fetcherSubmission: u }))
                            )
                          if (_t(x)) return void Nt(e, n, x.error)
                        }
                        if (wt(x)) throw yt(400, { type: 'defer-action' })
                        let w = R.navigation.location || R.location,
                          _ = ut(t.history, w, p.signal),
                          k = c || f,
                          S =
                            'idle' !== R.navigation.state
                              ? b(k, R.navigation.location, g)
                              : R.matches
                        s(S, "Didn't find any matches after fetcher action")
                        let E = ++V
                        $.set(e, E)
                        let C = Lt(u, x.data)
                        R.fetchers.set(e, C)
                        let [M, P] = ot(
                          t.history,
                          R,
                          S,
                          u,
                          w,
                          !1,
                          I,
                          B,
                          U,
                          it,
                          q,
                          Y,
                          k,
                          g,
                          { [i.route.id]: x.data },
                          void 0,
                        )
                        P.filter((t) => t.key !== e).forEach((t) => {
                          let e = t.key,
                            n = R.fetchers.get(e),
                            r = Lt(void 0, n ? n.data : void 0)
                          R.fetchers.set(e, r),
                            W.has(e) && Ft(e),
                            t.controller && W.set(e, t.controller)
                        }),
                          dt({ fetchers: new Map(R.fetchers) })
                        let O = () => P.forEach((t) => Ft(t.key))
                        p.signal.addEventListener('abort', O)
                        let {
                          results: T,
                          loaderResults: A,
                          fetcherResults: N,
                        } = await St(R.matches, S, M, P, _)
                        if (p.signal.aborted) return
                        p.signal.removeEventListener('abort', O),
                          $.delete(e),
                          W.delete(e),
                          P.forEach((t) => W.delete(t.key))
                        let j = vt(T)
                        if (j) {
                          if (j.idx >= M.length) {
                            let t = P[j.idx - M.length].key
                            Y.add(t)
                          }
                          return xt(R, j.result)
                        }
                        let { loaderData: z, errors: F } = pt(
                          R,
                          R.matches,
                          M,
                          A,
                          void 0,
                          P,
                          N,
                          at,
                        )
                        if (R.fetchers.has(e)) {
                          let t = At(x.data)
                          R.fetchers.set(e, t)
                        }
                        Ut(E),
                          'loading' === R.navigation.state && E > H
                            ? (s(L, 'Expected pending action'),
                              D && D.abort(),
                              ht(R.navigation.location, {
                                matches: S,
                                loaderData: z,
                                errors: F,
                                fetchers: new Map(R.fetchers),
                              }))
                            : (dt({
                                errors: F,
                                loaderData: gt(R.loaderData, z, S, F),
                                fetchers: new Map(R.fetchers),
                              }),
                              (I = !1))
                      })(e, n, m, w, p, l, v)
                    : (q.set(e, { routeId: n, path: m }),
                      (async function (e, n, r, i, o, l, c) {
                        let u = R.fetchers.get(e)
                        Ot(e, Lt(c, u ? u.data : void 0), { flushSync: l })
                        let d = new AbortController(),
                          f = ut(t.history, r, d.signal)
                        W.set(e, d)
                        let p = V,
                          m = await ct(
                            'loader',
                            f,
                            i,
                            o,
                            h,
                            a,
                            g,
                            y.v7_relativeSplatPath,
                          )
                        wt(m) && (m = (await Pt(m, f.signal, !0)) || m)
                        W.get(e) === d && W.delete(e)
                        if (f.signal.aborted) return
                        if (it.has(e)) return void Ot(e, At(void 0))
                        if (kt(m))
                          return H > p
                            ? void Ot(e, At(void 0))
                            : (Y.add(e), void (await xt(R, m)))
                        if (_t(m)) return void Nt(e, n, m.error)
                        s(!wt(m), 'Unhandled fetcher deferred data'),
                          Ot(e, At(m.data))
                      })(e, n, m, w, p, l, v))
              },
              revalidate: function () {
                Et(),
                  dt({ revalidation: 'loading' }),
                  'submitting' !== R.navigation.state &&
                    ('idle' !== R.navigation.state
                      ? ft(L || R.historyAction, R.navigation.location, {
                          overrideNavigation: R.navigation,
                        })
                      : ft(R.historyAction, R.location, {
                          startUninterruptedRevalidation: !0,
                        }))
              },
              createHref: (e) => t.history.createHref(e),
              encodeLocation: (e) => t.history.encodeLocation(e),
              getFetcher: jt,
              deleteFetcher: function (t) {
                if (y.v7_fetcherPersist) {
                  let e = (et.get(t) || 0) - 1
                  e <= 0 ? (et.delete(t), it.add(t)) : et.set(t, e)
                } else zt(t)
                dt({ fetchers: new Map(R.fetchers) })
              },
              dispose: function () {
                v && v(),
                  z && z(),
                  x.clear(),
                  D && D.abort(),
                  R.fetchers.forEach((t, e) => zt(e)),
                  R.blockers.forEach((t, e) => Wt(e))
              },
              getBlocker: function (t, e) {
                let n = R.blockers.get(t) || Z
                return st.get(t) !== e && st.set(t, e), n
              },
              deleteBlocker: Wt,
              _internalFetchControllers: W,
              _internalActiveDeferreds: at,
              _internalSetRoutes: function (t) {
                ;(h = {}), (c = m(t, a, void 0, h))
              },
            }),
            M
          )
        }
        Symbol('deferred')
        function nt(t, e, n, r, i, o, a, s) {
          let l, c
          if (a) {
            l = []
            for (let t of e)
              if ((l.push(t), t.route.id === a)) {
                c = t
                break
              }
          } else (l = e), (c = e[e.length - 1])
          let u = N(i || '.', A(l, o), T(t.pathname, n) || t.pathname, 'path' === s)
          return (
            null == i && ((u.search = t.search), (u.hash = t.hash)),
            (null != i && '' !== i && '.' !== i) ||
              !c ||
              !c.route.index ||
              Ot(u.search) ||
              (u.search = u.search ? u.search.replace(/^\?/, '?index&') : '?index'),
            r &&
              '/' !== n &&
              (u.pathname = '/' === u.pathname ? n : j([n, u.pathname])),
            d(u)
          )
        }
        function rt(t, e, n, r) {
          if (
            !r ||
            !(function (t) {
              return (
                null != t &&
                (('formData' in t && null != t.formData) ||
                  ('body' in t && void 0 !== t.body))
              )
            })(r)
          )
            return { path: n }
          if (r.formMethod && !Et(r.formMethod))
            return { path: n, error: yt(405, { method: r.formMethod }) }
          let i,
            o,
            a = () => ({ path: n, error: yt(400, { type: 'invalid-body' }) }),
            l = r.formMethod || 'get',
            c = t ? l.toUpperCase() : l.toLowerCase(),
            u = xt(n)
          if (void 0 !== r.body) {
            if ('text/plain' === r.formEncType) {
              if (!Ct(c)) return a()
              let t =
                'string' == typeof r.body
                  ? r.body
                  : r.body instanceof FormData || r.body instanceof URLSearchParams
                    ? Array.from(r.body.entries()).reduce((t, e) => {
                        let [n, r] = e
                        return '' + t + n + '=' + r + '\n'
                      }, '')
                    : String(r.body)
              return {
                path: n,
                submission: {
                  formMethod: c,
                  formAction: u,
                  formEncType: r.formEncType,
                  formData: void 0,
                  json: void 0,
                  text: t,
                },
              }
            }
            if ('application/json' === r.formEncType) {
              if (!Ct(c)) return a()
              try {
                let t = 'string' == typeof r.body ? JSON.parse(r.body) : r.body
                return {
                  path: n,
                  submission: {
                    formMethod: c,
                    formAction: u,
                    formEncType: r.formEncType,
                    formData: void 0,
                    json: t,
                    text: void 0,
                  },
                }
              } catch (t) {
                return a()
              }
            }
          }
          if (
            (s(
              'function' == typeof FormData,
              'FormData is not available in this environment',
            ),
            r.formData)
          )
            (i = dt(r.formData)), (o = r.formData)
          else if (r.body instanceof FormData) (i = dt(r.body)), (o = r.body)
          else if (r.body instanceof URLSearchParams) (i = r.body), (o = ht(i))
          else if (null == r.body) (i = new URLSearchParams()), (o = new FormData())
          else
            try {
              ;(i = new URLSearchParams(r.body)), (o = ht(i))
            } catch (t) {
              return a()
            }
          let f = {
            formMethod: c,
            formAction: u,
            formEncType:
              (r && r.formEncType) || 'application/x-www-form-urlencoded',
            formData: o,
            json: void 0,
            text: void 0,
          }
          if (Ct(f.formMethod)) return { path: n, submission: f }
          let p = h(n)
          return (
            e && p.search && Ot(p.search) && i.append('index', ''),
            (p.search = '?' + i),
            { path: d(p), submission: f }
          )
        }
        function it(t, e) {
          let n = t
          if (e) {
            let r = t.findIndex((t) => t.route.id === e)
            r >= 0 && (n = t.slice(0, r))
          }
          return n
        }
        function ot(t, e, n, i, o, a, s, l, c, u, d, h, f, p, g, m) {
          let y = m ? Object.values(m)[0] : g ? Object.values(g)[0] : void 0,
            v = t.createURL(e.location),
            x = t.createURL(o),
            w = m ? Object.keys(m)[0] : void 0,
            _ = it(n, w).filter((t, n) => {
              let { route: o } = t
              if (o.lazy) return !0
              if (null == o.loader) return !1
              if (a)
                return (
                  !!o.loader.hydrate ||
                  (void 0 === e.loaderData[o.id] &&
                    (!e.errors || void 0 === e.errors[o.id]))
                )
              if (
                (function (t, e, n) {
                  let r = !e || n.route.id !== e.route.id,
                    i = void 0 === t[n.route.id]
                  return r || i
                })(e.loaderData, e.matches[n], t) ||
                l.some((e) => e === t.route.id)
              )
                return !0
              let c = e.matches[n],
                u = t
              return st(
                t,
                r(
                  {
                    currentUrl: v,
                    currentParams: c.params,
                    nextUrl: x,
                    nextParams: u.params,
                  },
                  i,
                  {
                    actionResult: y,
                    defaultShouldRevalidate:
                      s ||
                      v.pathname + v.search === x.pathname + x.search ||
                      v.search !== x.search ||
                      at(c, u),
                  },
                ),
              )
            }),
            k = []
          return (
            d.forEach((t, o) => {
              if (a || !n.some((e) => e.route.id === t.routeId) || u.has(o)) return
              let l = b(f, t.path, p)
              if (!l)
                return void k.push({
                  key: o,
                  routeId: t.routeId,
                  path: t.path,
                  matches: null,
                  match: null,
                  controller: null,
                })
              let d = e.fetchers.get(o),
                g = Dt(l, t.path),
                m = !1
              ;(m =
                !h.has(o) &&
                (!!c.includes(o) ||
                  (d && 'idle' !== d.state && void 0 === d.data
                    ? s
                    : st(
                        g,
                        r(
                          {
                            currentUrl: v,
                            currentParams: e.matches[e.matches.length - 1].params,
                            nextUrl: x,
                            nextParams: n[n.length - 1].params,
                          },
                          i,
                          { actionResult: y, defaultShouldRevalidate: s },
                        ),
                      )))),
                m &&
                  k.push({
                    key: o,
                    routeId: t.routeId,
                    path: t.path,
                    matches: l,
                    match: g,
                    controller: new AbortController(),
                  })
            }),
            [_, k]
          )
        }
        function at(t, e) {
          let n = t.route.path
          return (
            t.pathname !== e.pathname ||
            (null != n && n.endsWith('*') && t.params['*'] !== e.params['*'])
          )
        }
        function st(t, e) {
          if (t.route.shouldRevalidate) {
            let n = t.route.shouldRevalidate(e)
            if ('boolean' == typeof n) return n
          }
          return e.defaultShouldRevalidate
        }
        async function lt(t, e, n) {
          if (!t.lazy) return
          let i = await t.lazy()
          if (!t.lazy) return
          let o = n[t.id]
          s(o, 'No route found in manifest')
          let a = {}
          for (let t in i) {
            let e = void 0 !== o[t] && 'hasErrorBoundary' !== t
            l(
              !e,
              'Route "' +
                o.id +
                '" has a static property "' +
                t +
                '" defined but its lazy function is also returning a value for this property. The lazy route property "' +
                t +
                '" will be ignored.',
            ),
              e || g.has(t) || (a[t] = i[t])
          }
          Object.assign(o, a), Object.assign(o, r({}, e(o), { lazy: void 0 }))
        }
        async function ct(t, e, n, r, i, o, a, l, c) {
          let u, d, h
          void 0 === c && (c = {})
          let f = (t) => {
            let r,
              i = new Promise((t, e) => (r = e))
            return (
              (h = () => r()),
              e.signal.addEventListener('abort', h),
              Promise.race([
                t({ request: e, params: n.params, context: c.requestContext }),
                i,
              ])
            )
          }
          try {
            let r = n.route[t]
            if (n.route.lazy)
              if (r) {
                let t,
                  e = await Promise.all([
                    f(r).catch((e) => {
                      t = e
                    }),
                    lt(n.route, o, i),
                  ])
                if (t) throw t
                d = e[0]
              } else {
                if ((await lt(n.route, o, i), (r = n.route[t]), !r)) {
                  if ('action' === t) {
                    let t = new URL(e.url),
                      r = t.pathname + t.search
                    throw yt(405, {
                      method: e.method,
                      pathname: r,
                      routeId: n.route.id,
                    })
                  }
                  return { type: p.data, data: void 0 }
                }
                d = await f(r)
              }
            else {
              if (!r) {
                let t = new URL(e.url)
                throw yt(404, { pathname: t.pathname + t.search })
              }
              d = await f(r)
            }
            s(
              void 0 !== d,
              'You defined ' +
                ('action' === t ? 'an action' : 'a loader') +
                ' for route "' +
                n.route.id +
                '" but didn\'t return anything from your `' +
                t +
                '` function. Please return a value or `null`.',
            )
          } catch (t) {
            ;(u = p.error), (d = t)
          } finally {
            h && e.signal.removeEventListener('abort', h)
          }
          if (St(d)) {
            let t,
              i = d.status
            if (q.has(i)) {
              let t = d.headers.get('Location')
              if (
                (s(
                  t,
                  'Redirects returned/thrown from loaders/actions must have a Location header',
                ),
                J.test(t))
              ) {
                if (!c.isStaticRequest) {
                  let n = new URL(e.url),
                    r = t.startsWith('//') ? new URL(n.protocol + t) : new URL(t),
                    i = null != T(r.pathname, a)
                  r.origin === n.origin && i && (t = r.pathname + r.search + r.hash)
                }
              } else
                t = nt(new URL(e.url), r.slice(0, r.indexOf(n) + 1), a, !0, t, l)
              if (c.isStaticRequest) throw (d.headers.set('Location', t), d)
              return {
                type: p.redirect,
                status: i,
                location: t,
                revalidate: null !== d.headers.get('X-Remix-Revalidate'),
                reloadDocument: null !== d.headers.get('X-Remix-Reload-Document'),
              }
            }
            if (c.isRouteRequest) {
              throw { type: u === p.error ? p.error : p.data, response: d }
            }
            try {
              let e = d.headers.get('Content-Type')
              t =
                e && /\bapplication\/json\b/.test(e)
                  ? null == d.body
                    ? null
                    : await d.json()
                  : await d.text()
            } catch (t) {
              return { type: p.error, error: t }
            }
            return u === p.error
              ? { type: u, error: new U(i, d.statusText, t), headers: d.headers }
              : { type: p.data, data: t, statusCode: d.status, headers: d.headers }
          }
          return u === p.error
            ? { type: u, error: d }
            : (function (t) {
                  let e = t
                  return (
                    e &&
                    'object' == typeof e &&
                    'object' == typeof e.data &&
                    'function' == typeof e.subscribe &&
                    'function' == typeof e.cancel &&
                    'function' == typeof e.resolveData
                  )
                })(d)
              ? {
                  type: p.deferred,
                  deferredData: d,
                  statusCode: null == (g = d.init) ? void 0 : g.status,
                  headers:
                    (null == (m = d.init) ? void 0 : m.headers) &&
                    new Headers(d.init.headers),
                }
              : { type: p.data, data: d }
          var g, m
        }
        function ut(t, e, n, r) {
          let i = t.createURL(xt(e)).toString(),
            o = { signal: n }
          if (r && Ct(r.formMethod)) {
            let { formMethod: t, formEncType: e } = r
            ;(o.method = t.toUpperCase()),
              'application/json' === e
                ? ((o.headers = new Headers({ 'Content-Type': e })),
                  (o.body = JSON.stringify(r.json)))
                : 'text/plain' === e
                  ? (o.body = r.text)
                  : 'application/x-www-form-urlencoded' === e && r.formData
                    ? (o.body = dt(r.formData))
                    : (o.body = r.formData)
          }
          return new Request(i, o)
        }
        function dt(t) {
          let e = new URLSearchParams()
          for (let [n, r] of t.entries())
            e.append(n, 'string' == typeof r ? r : r.name)
          return e
        }
        function ht(t) {
          let e = new FormData()
          for (let [n, r] of t.entries()) e.append(n, r)
          return e
        }
        function ft(t, e, n, r, i) {
          let o,
            a = {},
            l = null,
            c = !1,
            u = {}
          return (
            n.forEach((n, d) => {
              let h = e[d].route.id
              if (
                (s(!kt(n), 'Cannot handle redirect results in processLoaderData'),
                _t(n))
              ) {
                let e = mt(t, h),
                  i = n.error
                r && ((i = Object.values(r)[0]), (r = void 0)),
                  (l = l || {}),
                  null == l[e.route.id] && (l[e.route.id] = i),
                  (a[h] = void 0),
                  c || ((c = !0), (o = W(n.error) ? n.error.status : 500)),
                  n.headers && (u[h] = n.headers)
              } else
                wt(n)
                  ? (i.set(h, n.deferredData), (a[h] = n.deferredData.data))
                  : (a[h] = n.data),
                  null == n.statusCode ||
                    200 === n.statusCode ||
                    c ||
                    (o = n.statusCode),
                  n.headers && (u[h] = n.headers)
            }),
            r && ((l = r), (a[Object.keys(r)[0]] = void 0)),
            { loaderData: a, errors: l, statusCode: o || 200, loaderHeaders: u }
          )
        }
        function pt(t, e, n, i, o, a, l, c) {
          let { loaderData: u, errors: d } = ft(e, n, i, o, c)
          for (let e = 0; e < a.length; e++) {
            let { key: n, match: i, controller: o } = a[e]
            s(
              void 0 !== l && void 0 !== l[e],
              'Did not find corresponding fetcher result',
            )
            let c = l[e]
            if (!o || !o.signal.aborted)
              if (_t(c)) {
                let e = mt(t.matches, null == i ? void 0 : i.route.id)
                ;(d && d[e.route.id]) || (d = r({}, d, { [e.route.id]: c.error })),
                  t.fetchers.delete(n)
              } else if (kt(c)) s(!1, 'Unhandled fetcher revalidation redirect')
              else if (wt(c)) s(!1, 'Unhandled fetcher deferred data')
              else {
                let e = At(c.data)
                t.fetchers.set(n, e)
              }
          }
          return { loaderData: u, errors: d }
        }
        function gt(t, e, n, i) {
          let o = r({}, e)
          for (let r of n) {
            let n = r.route.id
            if (
              (e.hasOwnProperty(n)
                ? void 0 !== e[n] && (o[n] = e[n])
                : void 0 !== t[n] && r.route.loader && (o[n] = t[n]),
              i && i.hasOwnProperty(n))
            )
              break
          }
          return o
        }
        function mt(t, e) {
          return (
            (e ? t.slice(0, t.findIndex((t) => t.route.id === e) + 1) : [...t])
              .reverse()
              .find((t) => !0 === t.route.hasErrorBoundary) || t[0]
          )
        }
        function bt(t) {
          let e =
            1 === t.length
              ? t[0]
              : t.find((t) => t.index || !t.path || '/' === t.path) || {
                  id: '__shim-error-route__',
                }
          return {
            matches: [{ params: {}, pathname: '', pathnameBase: '', route: e }],
            route: e,
          }
        }
        function yt(t, e) {
          let {
              pathname: n,
              routeId: r,
              method: i,
              type: o,
            } = void 0 === e ? {} : e,
            a = 'Unknown Server Error',
            s = 'Unknown @remix-run/router error'
          return (
            400 === t
              ? ((a = 'Bad Request'),
                i && n && r
                  ? (s =
                      'You made a ' +
                      i +
                      ' request to "' +
                      n +
                      '" but did not provide a `loader` for route "' +
                      r +
                      '", so there is no way to handle the request.')
                  : 'defer-action' === o
                    ? (s = 'defer() is not supported in actions')
                    : 'invalid-body' === o &&
                      (s = 'Unable to encode submission body'))
              : 403 === t
                ? ((a = 'Forbidden'),
                  (s = 'Route "' + r + '" does not match URL "' + n + '"'))
                : 404 === t
                  ? ((a = 'Not Found'), (s = 'No route matches URL "' + n + '"'))
                  : 405 === t &&
                    ((a = 'Method Not Allowed'),
                    i && n && r
                      ? (s =
                          'You made a ' +
                          i.toUpperCase() +
                          ' request to "' +
                          n +
                          '" but did not provide an `action` for route "' +
                          r +
                          '", so there is no way to handle the request.')
                      : i &&
                        (s = 'Invalid request method "' + i.toUpperCase() + '"')),
            new U(t || 500, a, new Error(s), !0)
          )
        }
        function vt(t) {
          for (let e = t.length - 1; e >= 0; e--) {
            let n = t[e]
            if (kt(n)) return { result: n, idx: e }
          }
        }
        function xt(t) {
          return d(r({}, 'string' == typeof t ? h(t) : t, { hash: '' }))
        }
        function wt(t) {
          return t.type === p.deferred
        }
        function _t(t) {
          return t.type === p.error
        }
        function kt(t) {
          return (t && t.type) === p.redirect
        }
        function St(t) {
          return (
            null != t &&
            'number' == typeof t.status &&
            'string' == typeof t.statusText &&
            'object' == typeof t.headers &&
            void 0 !== t.body
          )
        }
        function Et(t) {
          return Y.has(t.toLowerCase())
        }
        function Ct(t) {
          return H.has(t.toLowerCase())
        }
        async function Mt(t, e, n, r, i, o) {
          for (let a = 0; a < n.length; a++) {
            let l = n[a],
              c = e[a]
            if (!c) continue
            let u = t.find((t) => t.route.id === c.route.id),
              d = null != u && !at(u, c) && void 0 !== (o && o[c.route.id])
            if (wt(l) && (i || d)) {
              let t = r[a]
              s(
                t,
                'Expected an AbortSignal for revalidating fetcher deferred result',
              ),
                await Pt(l, t, i).then((t) => {
                  t && (n[a] = t || n[a])
                })
            }
          }
        }
        async function Pt(t, e, n) {
          if ((void 0 === n && (n = !1), !(await t.deferredData.resolveData(e)))) {
            if (n)
              try {
                return { type: p.data, data: t.deferredData.unwrappedData }
              } catch (t) {
                return { type: p.error, error: t }
              }
            return { type: p.data, data: t.deferredData.data }
          }
        }
        function Ot(t) {
          return new URLSearchParams(t).getAll('index').some((t) => '' === t)
        }
        function Dt(t, e) {
          let n = 'string' == typeof e ? h(e).search : e.search
          if (t[t.length - 1].route.index && Ot(n || '')) return t[t.length - 1]
          let r = L(t)
          return r[r.length - 1]
        }
        function Tt(t) {
          let {
            formMethod: e,
            formAction: n,
            formEncType: r,
            text: i,
            formData: o,
            json: a,
          } = t
          if (e && n && r)
            return null != i
              ? {
                  formMethod: e,
                  formAction: n,
                  formEncType: r,
                  formData: void 0,
                  json: void 0,
                  text: i,
                }
              : null != o
                ? {
                    formMethod: e,
                    formAction: n,
                    formEncType: r,
                    formData: o,
                    json: void 0,
                    text: void 0,
                  }
                : void 0 !== a
                  ? {
                      formMethod: e,
                      formAction: n,
                      formEncType: r,
                      formData: void 0,
                      json: a,
                      text: void 0,
                    }
                  : void 0
        }
        function Rt(t, e) {
          if (e) {
            return {
              state: 'loading',
              location: t,
              formMethod: e.formMethod,
              formAction: e.formAction,
              formEncType: e.formEncType,
              formData: e.formData,
              json: e.json,
              text: e.text,
            }
          }
          return {
            state: 'loading',
            location: t,
            formMethod: void 0,
            formAction: void 0,
            formEncType: void 0,
            formData: void 0,
            json: void 0,
            text: void 0,
          }
        }
        function Lt(t, e) {
          if (t) {
            return {
              state: 'loading',
              formMethod: t.formMethod,
              formAction: t.formAction,
              formEncType: t.formEncType,
              formData: t.formData,
              json: t.json,
              text: t.text,
              data: e,
            }
          }
          return {
            state: 'loading',
            formMethod: void 0,
            formAction: void 0,
            formEncType: void 0,
            formData: void 0,
            json: void 0,
            text: void 0,
            data: e,
          }
        }
        function At(t) {
          return {
            state: 'idle',
            formMethod: void 0,
            formAction: void 0,
            formEncType: void 0,
            formData: void 0,
            json: void 0,
            text: void 0,
            data: t,
          }
        }
      },
      649: (t, e, n) => {
        n.d(e, { Z: () => l })
        var r,
          i,
          o,
          a = n(294)
        function s() {
          return (
            (s = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e]
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                  }
                  return t
                }),
            s.apply(this, arguments)
          )
        }
        const l = function (t) {
          return a.createElement(
            'svg',
            s(
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '1em',
                height: '1em',
                fill: 'none',
                viewBox: '0 0 40 43',
              },
              t,
            ),
            r ||
              (r = a.createElement('path', {
                stroke: 'url(#logo_svg__a)',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeMiterlimit: 10,
                strokeWidth: 4.463,
                d: 'M3.333 4.325v29.177c0 2.849 2.234 5.149 5 5.149h28.334',
              })),
            i ||
              (i = a.createElement('path', {
                stroke: 'url(#logo_svg__b)',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeMiterlimit: 10,
                strokeWidth: 4.463,
                d: 'm8.333 30.07 7.65-9.2c1.267-1.51 3.517-1.613 4.884-.189l1.583 1.63a3.274 3.274 0 0 0 4.883-.188L35 12.907',
              })),
            o ||
              (o = a.createElement(
                'defs',
                null,
                a.createElement(
                  'linearGradient',
                  {
                    id: 'logo_svg__a',
                    x1: 20,
                    x2: 20,
                    y1: 4.325,
                    y2: 38.651,
                    gradientUnits: 'userSpaceOnUse',
                  },
                  a.createElement('stop', { stopColor: '#2ADD50' }),
                  a.createElement('stop', { offset: 1, stopColor: '#AFDD2A' }),
                ),
                a.createElement(
                  'linearGradient',
                  {
                    id: 'logo_svg__b',
                    x1: 21.667,
                    x2: 21.667,
                    y1: 12.907,
                    y2: 30.069,
                    gradientUnits: 'userSpaceOnUse',
                  },
                  a.createElement('stop', { stopColor: '#2ADD50' }),
                  a.createElement('stop', { offset: 1, stopColor: '#AFDD2A' }),
                ),
              )),
          )
        }
      },
      370: (t, e, n) => {
        n.d(e, { Z: () => u })
        var r = n(294)
        const i = 'RIu1OlpxkVM32RBxx45d',
          o = 'btqsgOx6G1sLU6qJWlTy',
          a = 'ts0iGPM0Q9fMWBZ3j8g9'
        var s = n(893)
        const l = function (t) {
          var e = t.message,
            n = t.resetError
          return (0, s.jsxs)('section', {
            className: i,
            children: [
              (0, s.jsx)('span', { className: a, children: e }),
              'Oops... Negative Number! Please, remove the "-" sign and click "reset".' ===
                e &&
                (0, s.jsx)('button', {
                  type: 'button',
                  onClick: n,
                  className: o,
                  children: 'reset',
                }),
            ],
          })
        }
        function c(t, e) {
          return (
            (c = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (t, e) {
                  return (t.__proto__ = e), t
                }),
            c(t, e)
          )
        }
        const u = (function (t) {
          var e, n
          function r(e) {
            var n
            return (
              ((n = t.call(this, e) || this).resetError = function () {
                n.setState({ hasError: !1 })
              }),
              (n.state = { hasError: !1, message: '' }),
              n
            )
          }
          return (
            (n = t),
            ((e = r).prototype = Object.create(n.prototype)),
            (e.prototype.constructor = e),
            c(e, n),
            (r.getDerivedStateFromError = function (t) {
              return { hasError: !0, message: t.message }
            }),
            (r.prototype.render = function () {
              var t = this.props.children,
                e = this.state,
                n = e.hasError,
                r = e.message
              return n
                ? (0, s.jsx)(l, { message: r, resetError: this.resetError })
                : (0, s.jsx)(s.Fragment, { children: t })
            }),
            r
          )
        })(r.Component)
      },
      680: (t, e, n) => {
        n.d(e, { Z: () => k })
        var r = n(649),
          i = n(294)
        const o = function () {
          var t = (0, i.useState)(window.innerWidth),
            e = t[0],
            n = t[1],
            r = function () {
              n(window.innerWidth)
            }
          return (
            (0, i.useEffect)(function () {
              return (
                window.addEventListener('resize', r),
                function () {
                  return window.removeEventListener('resize', r)
                }
              )
            }, []),
            { width: e }
          )
        }
        var a = [
          { id: 1, title: 'General', first: 'Market', second: 'Service' },
          { id: 2, title: 'Product', first: 'Sparks', second: 'Snaps' },
          { id: 3, title: 'Community', first: 'Ideas', second: 'Streams' },
        ]
        const s = 'zkheGQYJFCyfybuMNmWN',
          l = 'BayhiJAndoekuFgLmwU1',
          c = 'GpAKY7wkm4RUrHMmMOKp',
          u = 'PydHDtpjuDhbNJhUMGnw',
          d = 'xaZAoXN2thNv2uMC3Sod',
          h = 'bEyxWmPOAZbOPyDnQOL6',
          f = 'OZv0C1kOmL7zJu8ZqCEB',
          p = 'oa3k_6It8BkqbUMutgga',
          g = 'ny795eMyixTXcthMBYsy',
          m = 'R0vLuUyXHzq1EPEr2tWJ',
          b = 'WX5PY_ZbFuD1DDf8sPlW',
          y = 'ZzDXQfCS7SvCahUIZDEE',
          v = 'HZ9Uganuyuqn6pJsD9o4',
          x = 'RH0xKpxjaJJ4povNnE7g'
        var w = n(893)
        function _() {
          return (
            (_ = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e]
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                  }
                  return t
                }),
            _.apply(this, arguments)
          )
        }
        const k = function () {
          var t = o(),
            e = (0, i.useState)(!1),
            n = e[0],
            k = e[1],
            S = new Date(Date.now()).getFullYear()
          return (0, w.jsxs)('footer', {
            children: [
              (0, w.jsx)('div', {
                className: 'container',
                children: (0, w.jsxs)('div', {
                  className: s,
                  children: [
                    (0, w.jsxs)('section', {
                      className: l,
                      children: [
                        (0, w.jsxs)('div', {
                          className: c,
                          children: [
                            (0, w.jsx)(r.Z, {
                              width: 40,
                              height: 45,
                              className: c,
                            }),
                            (0, w.jsx)('span', {
                              className: u,
                              children: 'Modsen Currency Tracker',
                            }),
                          ],
                        }),
                        (0, w.jsx)('p', {
                          className: d,
                          children:
                            'Since then, the company has grown organically to. Starsup is the world&rsquo;s largest trading platform, with $12 billion worth of currency trading and 500,000 tickets sold daily to tens of thousands of traders worldwide.',
                        }),
                      ],
                    }),
                    (0, w.jsx)('section', {
                      className: h,
                      children: (0, w.jsx)('div', {
                        className: h,
                        children: a.map(function (e) {
                          return (0, w.jsxs)(
                            'div',
                            {
                              className: b,
                              children: [
                                t.width < 641 &&
                                  (0, w.jsxs)('div', {
                                    className: y,
                                    children: [
                                      (0, w.jsx)('span', {
                                        className: f,
                                        children: e.title,
                                      }),
                                      (0, w.jsx)('div', {
                                        'data-cy': 'footer-accordion-arrow',
                                        className: n[e.title.toLowerCase()]
                                          ? v + ' ' + x
                                          : v,
                                        onClick: function () {
                                          return (function (t) {
                                            k(function (e) {
                                              var n = _({}, e)
                                              return (
                                                (n[t.title.toLowerCase()] =
                                                  !e[t.title.toLowerCase()]),
                                                n
                                              )
                                            })
                                          })(e)
                                        },
                                      }),
                                    ],
                                  }),
                                t.width > 641 &&
                                  (0, w.jsxs)(w.Fragment, {
                                    children: [
                                      (0, w.jsx)('span', {
                                        className: f,
                                        children: e.title,
                                      }),
                                      (0, w.jsxs)('div', {
                                        className: p,
                                        children: [
                                          (0, w.jsx)('span', {
                                            className: g,
                                            children: e.first,
                                          }),
                                          (0, w.jsx)('span', {
                                            className: g,
                                            children: e.second,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                (n[e.title.toLowerCase()] || t > 641) &&
                                  (0, w.jsxs)('div', {
                                    className: p,
                                    children: [
                                      (0, w.jsx)('span', {
                                        className: g,
                                        children: e.first,
                                      }),
                                      (0, w.jsx)('span', {
                                        className: g,
                                        children: e.second,
                                      }),
                                    ],
                                  }),
                              ],
                            },
                            e.id,
                          )
                        }),
                      }),
                    }),
                  ],
                }),
              }),
              (0, w.jsxs)('section', {
                className: m,
                children: ['Startsup © ', S - 1, '-', S, ', All Rights Reserved'],
              }),
            ],
          })
        }
      },
      454: (t, e, n) => {
        n.d(e, { Z: () => D })
        var r = n(649),
          i = n(985),
          o = n(294),
          a = n(655)
        const s = function () {
          var t = (0, o.useState)(0),
            e = t[0],
            n = t[1],
            r = function (t) {
              n(t.currentTarget.scrollY)
            }
          return (
            (0, o.useEffect)(function () {
              return (
                window.addEventListener('scroll', r),
                function () {
                  return window.removeEventListener('scroll', r)
                }
              )
            }, []),
            { value: e }
          )
        }
        var l = n(389),
          c = [
            { id: 1, path: i.yy.default, title: 'Home' },
            { id: 2, path: i.yy.timeline, title: 'Timeline' },
            { id: 3, path: i.yy.bankCard, title: 'Bank card' },
            { id: 4, path: i.yy.contato, title: 'Contato' },
          ]
        const u = 'MH4nPEwX7f1LUFtN1lcM',
          d = 'elp5p1lEU5aiwsaX8k1A',
          h = 'HUBY4v7lVsy8qicn4Yil',
          f = 'mZ5m7IYcsFdWhC7neBTH',
          p = 'u8BjGRAoN6lzXj2mhHl4',
          g = 'KDW2SCwuYndRkGXabj2t',
          m = 'WS3i9NgY_tGLVR7bHXRF',
          b = 'ISmsrGqHYRCu2UkPWq_e',
          y = 'V0eztagBboda3HcvVove',
          v = 'OoTNhjeDnkwPjmbnKxgC',
          x = 'hshCPCvHurX7UmhUIRO2',
          w = 'OgniChmkhZoy_YUVUFQt',
          _ = 'SQOepxRWY3JEU2y4gyfr',
          k = 'qoPRP9nzcsKWzpgseQNf',
          S = 'JfkupwXeZQMVrAXK77i5',
          E = 'moRmuivWXcsELyGR61lL',
          C = 'I27etnmghrUQyzYOwyMA',
          M = 't_o_yB4n_xALRhoM95rM',
          P = 'HfOKhPyo85ySeYkgJTRy'
        var O = n(893)
        const D = function () {
          var t = (0, o.useContext)(l.N),
            e = t.theme,
            n = t.setTheme,
            D = s(),
            T = (0, o.useState)(!1),
            R = T[0],
            L = T[1]
          return (0, O.jsx)('header', {
            className: D.value > i.T9 ? u + ' ' + d : u,
            children: (0, O.jsx)('div', {
              className: 'container',
              children: (0, O.jsxs)('div', {
                className: h,
                children: [
                  (0, O.jsx)(a.OL, {
                    to: i.yy.default,
                    children: (0, O.jsx)(r.Z, { width: 40, height: 41 }),
                  }),
                  (0, O.jsx)('div', {
                    className: R ? M : P,
                    children: (0, O.jsxs)('div', {
                      className: f,
                      children: [
                        (0, O.jsx)('nav', {
                          className: p,
                          children: c.map(function (t) {
                            return (0, O.jsx)(
                              a.OL,
                              {
                                to: t.path,
                                onClick: function () {
                                  return L(!R)
                                },
                                className: function (t) {
                                  return t.isActive ? k + ' ' + S : k
                                },
                                children: t.title,
                              },
                              t.id,
                            )
                          }),
                        }),
                        (0, O.jsx)('input', {
                          type: 'checkbox',
                          id: 'toggle-button',
                          className: C,
                          checked: e === i.yU.light,
                          onChange: function () {
                            n(e === i.yU.dark ? i.yU.light : i.yU.dark)
                          },
                        }),
                        (0, O.jsx)('label', {
                          htmlFor: 'toggle-button',
                          className: E,
                        }),
                      ],
                    }),
                  }),
                  (0, O.jsxs)('div', {
                    className: g,
                    onClick: function () {
                      return L(!R)
                    },
                    'data-cy': 'burger',
                    children: [
                      (0, O.jsx)('span', {
                        className: R ? m + ' ' + v : m + ' ' + b,
                      }),
                      (0, O.jsx)('span', {
                        className: R ? m + ' ' + w : m + ' ' + _,
                      }),
                      (0, O.jsx)('span', {
                        className: R ? m + ' ' + x : m + ' ' + y,
                      }),
                    ],
                  }),
                ],
              }),
            }),
          })
        }
      },
      356: (t, e, n) => {
        n.d(e, { Z: () => I })
        var r = n(985),
          i = n(294)
        const o = 'K5_PCYLOtew7aCGbEWeY',
          a = 'FHBQQM319G3WW3AEFe7g',
          s = 'cbB_v0MNwMWVUoFMezCv',
          l = 'CROcsQAnG_O1WyHRYxQa'
        var c = n(893)
        const u = function (t) {
          var e = t.onModalClose
          return (0, c.jsxs)('div', {
            className: o,
            onClick: e,
            'data-cy': 'cross',
            'data-testid': 'cross',
            children: [
              (0, c.jsx)('span', {
                className: a + ' ' + s,
                'data-testid': 'left-part',
              }),
              (0, c.jsx)('span', {
                className: a + ' ' + l,
                'data-testid': 'right-part',
              }),
            ],
          })
        }
        var d = n(257),
          h = n(761)
        const f = 'x5tHyGHxxSw6hS6bfmVz',
          p = 'z0g4C6JAj9zHEm6DQrhU',
          g = 'pLq6tTRHtGdAgvWlzpwR',
          m = 'wPlTOThcsIUPPqfz_i2z',
          b = 'w6vvtZNlz6v39x3EITkc'
        function y() {
          return (
            (y = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e]
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                  }
                  return t
                }),
            y.apply(this, arguments)
          )
        }
        function v(t, e) {
          return (
            (v = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (t, e) {
                  return (t.__proto__ = e), t
                }),
            v(t, e)
          )
        }
        const x = (function (t) {
          var e, n
          function i(e) {
            var n
            return (
              ((n = t.call(this, e) || this).handleAdd = function (t) {
                t.preventDefault()
                var e = n.state,
                  i = e.currency,
                  o = e.open,
                  a = e.high,
                  s = e.close,
                  l = e.low,
                  c = {
                    open: Number(o),
                    high: Number(a),
                    close: Number(s),
                    low: Number(l),
                  },
                  u = new Date(Date.now())
                u.setDate(
                  Number(h.Z.dataset[h.Z.dataset.length - 1].date.slice(0, 2)) + 1,
                )
                var f = '' + u.toLocaleDateString().split('.').join('-')
                h.Z.notify(
                  null,
                  [].concat(h.Z.dataset, [
                    y({}, c, { date: f, body: [Number(o), Number(s)] }),
                  ]),
                ),
                  d.Z.post(
                    '' + r.CG.mockapi_request + i.toLowerCase(),
                    y({}, c, { date: f }),
                  )
                    .then(function (t) {
                      return t
                    })
                    .catch(function (t) {
                      return n.setState({ error: t })
                    })
              }),
              (n.state = {
                currency: '',
                open: '',
                high: '',
                close: '',
                low: '',
                error: {},
              }),
              n
            )
          }
          ;(n = t),
            ((e = i).prototype = Object.create(n.prototype)),
            (e.prototype.constructor = e),
            v(e, n)
          var o = i.prototype
          return (
            (o.componentDidMount = function () {
              this.setState({ currency: h.Z.currency })
            }),
            (o.render = function () {
              var t = this,
                e = this.state,
                n = e.open,
                r = e.high,
                i = e.close,
                o = e.low,
                a = e.error
              if (a.message)
                throw new Error(a.message + '. Please, try again later.')
              return (0, c.jsxs)(c.Fragment, {
                children: [
                  (0, c.jsx)('p', { className: f, children: 'Add' }),
                  (0, c.jsxs)('form', {
                    className: b,
                    onSubmit: this.handleAdd,
                    children: [
                      (0, c.jsxs)('label', {
                        htmlFor: 'open',
                        className: g,
                        children: [
                          (0, c.jsx)('p', { children: 'Open' }),
                          (0, c.jsx)('input', {
                            required: !0,
                            id: 'open',
                            type: 'number',
                            name: 'open',
                            onChange: function (e) {
                              t.setState({ open: e.target.value })
                            },
                            value: n,
                            className: p,
                            'data-cy': 'timeline-add-open-input',
                          }),
                        ],
                      }),
                      (0, c.jsxs)('label', {
                        htmlFor: 'high',
                        className: g,
                        children: [
                          (0, c.jsx)('p', { children: 'High' }),
                          (0, c.jsx)('input', {
                            required: !0,
                            id: 'high',
                            type: 'number',
                            name: 'high',
                            onChange: function (e) {
                              t.setState({ high: e.target.value })
                            },
                            value: r,
                            className: p,
                            'data-cy': 'timeline-add-high-input',
                          }),
                        ],
                      }),
                      (0, c.jsxs)('label', {
                        htmlFor: 'close',
                        className: g,
                        children: [
                          (0, c.jsx)('p', { children: 'Close' }),
                          (0, c.jsx)('input', {
                            required: !0,
                            id: 'close',
                            type: 'number',
                            name: 'close',
                            onChange: function (e) {
                              t.setState({ close: e.target.value })
                            },
                            value: i,
                            className: p,
                            'data-cy': 'timeline-add-close-input',
                          }),
                        ],
                      }),
                      (0, c.jsxs)('label', {
                        htmlFor: 'low',
                        className: g,
                        children: [
                          (0, c.jsx)('p', { children: 'Low' }),
                          (0, c.jsx)('input', {
                            required: !0,
                            id: 'low',
                            type: 'number',
                            name: 'low',
                            onChange: function (e) {
                              t.setState({ low: e.target.value })
                            },
                            value: o,
                            className: p,
                            'data-cy': 'timeline-add-low-input',
                          }),
                        ],
                      }),
                      (0, c.jsx)('button', {
                        type: 'submit',
                        className: m,
                        'data-cy': 'timeline-add-modal-action',
                        children: 'add',
                      }),
                    ],
                  }),
                ],
              })
            }),
            i
          )
        })(i.Component)
        const w = 'VuXSElx9JSfvqU4ARZfl'
        const _ = function (t) {
          var e = t.result,
            n = t.currency
          if (e < 0)
            throw new Error(
              'Oops... Negative Number! Please, remove the "-" sign and click "reset".',
            )
          return (0, c.jsxs)('span', {
            className: w,
            'data-cy': 'conversion-result',
            role: 'presentation',
            'data-testid': 'conversion-result',
            children: [0 === e ? 0 : e.toFixed('BTC' === n ? 8 : 3), ' ', n],
          })
        }
        var k = n(370)
        const S = {
          title: 'pvL7mVRY1ZNnFDJfAhcc',
          content: 'u3FYLmb5_OotxrYY7dC6',
          symbol: 'rawQLjz8AQ2GYs0UDuqa',
          select: 'h0TXwiLWvQ7pkeZyquEg',
          to: 'V2Mqh_eWbSWDJjP0XCyF',
          amount: 'UOCWmyGTvwtUCKnAyCd0',
          'edit-input': 'NcaI9sVF3gsA5op6FiYm',
          result: 'bkDDSboe4ASt_EOpstN3',
        }
        const E = function (t) {
            var e = t.currency,
              n = window.Cypress ? r._v : JSON.parse(localStorage.getItem('rates')),
              o = (0, i.useState)(''),
              a = o[0],
              s = o[1],
              l = (0, i.useState)(0),
              u = l[0],
              d = l[1],
              h = (0, i.useState)(u),
              f = h[0],
              p = h[1]
            return (
              (0, i.useEffect)(
                function () {
                  n.forEach(function (t) {
                    t.symbol === a && p((t.rate * u) / e.rate)
                  })
                },
                [u, a],
              ),
              (0, c.jsxs)(c.Fragment, {
                children: [
                  (0, c.jsx)('span', { className: S.title, children: 'Converter' }),
                  (0, c.jsxs)('section', {
                    className: S.content,
                    'data-cy': 'converter-modal-wrapper',
                    'data-testid': 'converter-modal-wrapper',
                    children: [
                      (0, c.jsxs)('section', {
                        className: S.user,
                        children: [
                          (0, c.jsxs)('span', {
                            className: S.symbol,
                            children: [e.symbol, ':'],
                          }),
                          (0, c.jsx)('input', {
                            type: 'number',
                            className: S.amount,
                            onChange: function (t) {
                              d(t.target.value)
                            },
                            value: u,
                            'data-cy': 'converter-input',
                            'data-testid': 'converter-input',
                          }),
                        ],
                      }),
                      (0, c.jsxs)('div', {
                        className: S.selectBlock,
                        children: [
                          (0, c.jsx)('span', { className: S.to, children: 'to:' }),
                          (0, c.jsxs)('select', {
                            value: a,
                            onChange: function (t) {
                              s(t.target.value)
                            },
                            className: S.select,
                            'data-cy': 'converter-select',
                            'data-testid': 'converter-select',
                            children: [
                              (0, c.jsx)('option', {
                                value: 'first',
                                children: 'Select, please',
                              }),
                              Object.entries(r.Xx).map(function (t, n) {
                                return (
                                  t[0] !== e.symbol &&
                                  (0, c.jsxs)(
                                    'option',
                                    {
                                      value: t[0],
                                      children: [t[0], ' (', t[1], ')'],
                                    },
                                    n,
                                  )
                                )
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, c.jsx)(k.Z, {
                    result: f,
                    children: (0, c.jsx)(_, { result: f, currency: a }),
                  }),
                ],
              })
            )
          },
          C = 'M0Wsld0SLTQrfCGpr9nm',
          M = 'sELctixDPhLWujLVwQD3',
          P = 'nQy5KxBOYqslY5zSqeTo',
          O = 'UvbsNVPuRSWP7OJiuDZ8',
          D = 'JRIZsNxZaV7xx2OuvvfV'
        function T() {
          return (
            (T = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e]
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                  }
                  return t
                }),
            T.apply(this, arguments)
          )
        }
        function R(t, e) {
          return (
            (R = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (t, e) {
                  return (t.__proto__ = e), t
                }),
            R(t, e)
          )
        }
        const L = (function (t) {
            var e, n
            function i(e) {
              var n
              return (
                ((n = t.call(this, e) || this).handleEdit = function (t) {
                  t.preventDefault()
                  var e = n.state,
                    i = e.day,
                    o = e.currency,
                    a = e.dataset,
                    s = {
                      id: i,
                      date: a[i].date,
                      open: a[i].open,
                      high: a[i].high,
                      close: a[i].close,
                      low: a[i].low,
                    }
                  d.Z.put(
                    '' + r.CG.mockapi_request + o.toLowerCase() + '/' + (i + 1),
                    s,
                  )
                    .then(function (t) {
                      return t
                    })
                    .catch(function (t) {
                      return n.setState({ error: t })
                    })
                }),
                (n.handleChangeInput = function (t) {
                  var e,
                    r = n.state,
                    i = r.day,
                    o = r.dataset,
                    a = T(
                      {},
                      o[i],
                      (((e = {})[t.target.name] = Number(t.target.value)), e),
                    ),
                    s = [].concat(o.slice(0, i), [a], o.slice(i + 1))
                  n.setState({ dataset: s }), h.Z.notify(null, s)
                }),
                (n.handleChangeDay = function (t) {
                  n.setState({ day: t.target.value - 1 })
                }),
                (n.state = { dataset: [], day: '', currency: '', error: {} }),
                n
              )
            }
            ;(n = t),
              ((e = i).prototype = Object.create(n.prototype)),
              (e.prototype.constructor = e),
              R(e, n)
            var o = i.prototype
            return (
              (o.componentDidMount = function () {
                this.setState({ dataset: h.Z.dataset, currency: h.Z.currency })
              }),
              (o.render = function () {
                var t = this.state,
                  e = t.day,
                  n = t.dataset,
                  r = t.error
                if (r.message)
                  throw new Error(r.message + '. Please, try again later')
                return (0, c.jsxs)(c.Fragment, {
                  children: [
                    (0, c.jsx)('p', { className: C, children: 'Edit' }),
                    (0, c.jsxs)('form', {
                      className: O,
                      onSubmit: this.handleEdit,
                      'data-testid': 'timeline-edit-form',
                      children: [
                        (0, c.jsxs)('label', {
                          htmlFor: 'day',
                          className: D,
                          children: [
                            (0, c.jsx)('p', { children: 'Day' }),
                            (0, c.jsx)('input', {
                              required: !0,
                              type: 'number',
                              min: '1',
                              max: '31',
                              name: 'day',
                              onChange: this.handleChangeDay,
                              className: M,
                              'data-cy': 'timeline-edit-day-input',
                              'data-testid': 'timeline-edit-day-input',
                            }),
                          ],
                        }),
                        (0, c.jsxs)('label', {
                          htmlFor: 'open',
                          className: D,
                          children: [
                            (0, c.jsx)('p', { children: 'Open' }),
                            (0, c.jsx)('input', {
                              required: !0,
                              type: 'number',
                              name: 'open',
                              onChange: this.handleChangeInput,
                              value: n[e] ? n[e].open : '',
                              className: M,
                              'data-cy': 'timeline-edit-open-input',
                              'data-testid': 'timeline-edit-open-input',
                            }),
                          ],
                        }),
                        (0, c.jsxs)('label', {
                          htmlFor: 'high',
                          className: D,
                          children: [
                            (0, c.jsx)('p', { children: 'High' }),
                            (0, c.jsx)('input', {
                              required: !0,
                              type: 'number',
                              name: 'high',
                              onChange: this.handleChangeInput,
                              value: n[e] ? n[e].high : '',
                              className: M,
                              'data-cy': 'timeline-edit-high-input',
                              'data-testid': 'timeline-edit-high-input',
                            }),
                          ],
                        }),
                        (0, c.jsxs)('label', {
                          htmlFor: 'close',
                          className: D,
                          children: [
                            (0, c.jsx)('p', { children: 'Close' }),
                            (0, c.jsx)('input', {
                              required: !0,
                              type: 'number',
                              name: 'close',
                              onChange: this.handleChangeInput,
                              value: n[e] ? n[e].close : '',
                              className: M,
                              'data-cy': 'timeline-edit-close-input',
                              'data-testid': 'timeline-edit-close-input',
                            }),
                          ],
                        }),
                        (0, c.jsxs)('label', {
                          htmlFor: 'low',
                          className: D,
                          children: [
                            (0, c.jsx)('p', { children: 'Low' }),
                            (0, c.jsx)('input', {
                              required: !0,
                              type: 'number',
                              name: 'low',
                              onChange: this.handleChangeInput,
                              value: n[e] ? n[e].low : '',
                              className: M,
                              'data-cy': 'timeline-edit-low-input',
                              'data-testid': 'timeline-edit-low-input',
                            }),
                          ],
                        }),
                        (0, c.jsx)('button', {
                          type: 'submit',
                          className: P,
                          'data-cy': 'timeline-edit-action',
                          children: 'edit',
                        }),
                      ],
                    }),
                  ],
                })
              }),
              i
            )
          })(i.Component),
          A = 'AzXXQtWFpp71rVBvX67Q'
        const N = function () {
            return (0, c.jsx)('h1', {
              className: A,
              'data-cy': 'timeline-modal-message-title',
              children: 'Your chart was builded on 1-month dataset!',
            })
          },
          j = 'UY5h3Z6S81p7JTBVVe9v',
          z = 'oYinAKhioBXeOhkIGZ67',
          F = 'LHRUC4W6n8JYk75CrzYK'
        const I = function (t) {
          var e = t.type,
            n = t.onModalClose,
            o = t.currency,
            a = function (t) {
              'Escape' === t.key && n()
            }
          return (
            (0, i.useEffect)(function () {
              return (
                document.addEventListener('keydown', a),
                function () {
                  return document.removeEventListener('keydown', a)
                }
              )
            }, []),
            (0, c.jsx)('article', {
              className: j,
              children: (0, c.jsxs)('section', {
                className: z,
                'data-testid': 'modal-window',
                children: [
                  (0, c.jsx)(u, {
                    onModalClose: function () {
                      return n()
                    },
                  }),
                  (0, c.jsxs)('div', {
                    className: F,
                    'data-testid': e + '-component',
                    children: [
                      e === r.Ny.converter && (0, c.jsx)(E, { currency: o }),
                      e === r.Ny.edit && (0, c.jsx)(L, {}),
                      e === r.Ny.message && (0, c.jsx)(N, {}),
                      e === r.Ny.add && (0, c.jsx)(x, {}),
                    ],
                  }),
                ],
              }),
            })
          )
        }
      },
      389: (t, e, n) => {
        n.d(e, { N: () => a, Z: () => l })
        var r = n(985),
          i = n(294),
          o = n(893),
          a = (0, i.createContext)(null),
          s = function () {
            var t = localStorage.getItem('theme')
            return (
              t || (localStorage.setItem('theme', r.yU.dark), (t = r.yU.dark)), t
            )
          }
        const l = function (t) {
          var e = t.children,
            n = (0, i.useState)(s),
            r = n[0],
            l = n[1]
          ;(0, i.useLayoutEffect)(
            function () {
              localStorage.setItem('theme', r),
                document.documentElement.setAttribute('data-theme', r)
            },
            [r],
          )
          var c = { theme: r, setTheme: l }
          return (0, o.jsx)(a.Provider, { value: c, children: e })
        }
      },
      985: (t, e, n) => {
        n.d(e, {
          CG: () => h,
          Gn: () => u,
          KM: () => i,
          Ny: () => a,
          T9: () => g,
          Xx: () => l,
          _v: () => p,
          s: () => c,
          sG: () => m,
          w$: () => r,
          wC: () => f,
          wd: () => s,
          yU: () => o,
          yy: () => d,
        })
        var r = 864e4,
          i = 0.015,
          o = { light: 'light', dark: 'dark' },
          a = {
            converter: 'converter',
            edit: 'edit',
            add: 'add',
            message: 'message',
          },
          s = [
            { id: 1, symbol: 'AUD', name: 'Australian Dollar' },
            { id: 2, symbol: 'BTC', name: 'Bitcoin' },
            { id: 3, symbol: 'ARS', name: 'Argentine Peso' },
            { id: 4, symbol: 'CAD', name: 'Canadian Dollar' },
            { id: 5, symbol: 'USD', name: 'Commercial Dollar' },
            { id: 6, symbol: 'EUR', name: 'Euro' },
            { id: 7, symbol: 'TRY', name: 'Libra' },
            { id: 8, symbol: 'KRW', name: 'Won' },
            { id: 9, symbol: 'JPY', name: 'Yen' },
          ],
          l = {
            AUD: 'Australian Dollar',
            BTC: 'Bitcoin',
            ARS: 'Argetine Peso',
            CAD: 'Canadian Dollar',
            USD: 'Commercial Dollar',
            EUR: 'Euro',
            TRY: 'Libra',
            KRW: 'Won',
            JPY: 'Yen',
          },
          c = { AUD: 'Australian Dollar', CAD: 'Canadian Dollar' },
          u = [
            {
              name: 'Belagroprombank',
              lat: 53.8936184,
              lng: 27.4814545,
              currencies: {
                AUD: 'Australian Dollar',
                ARS: 'Argentine Peso',
                CAD: 'Canadian Dollar',
                USD: 'Commercial Dollar',
                EUR: 'Euro',
              },
            },
            {
              name: 'BSB Bank',
              lat: 53.8792456,
              lng: 27.4930467,
              currencies: {
                BTC: 'Bitcoin',
                ARS: 'Argentine Peso',
                KRW: 'Won',
                JPY: 'Yen',
              },
            },
            {
              name: 'Status Bank',
              lat: 53.8663586,
              lng: 27.4484415,
              currencies: {
                CAD: 'Canadian Dollar',
                USD: 'Commercial Dollar',
                EUR: 'Euro',
              },
            },
            {
              name: 'Alpha-Bank',
              lat: 53.9204908,
              lng: 27.408525,
              currencies: {
                AUD: 'Australian Dollar',
                BTC: 'Bitcoin',
                ARS: 'Argentine Peso',
                CAD: 'Canadian Dollar',
                TRY: 'Libra',
                KRW: 'Won',
              },
            },
            {
              name: 'Bank RRB',
              lat: 53.9432613,
              lng: 27.55076,
              currencies: { EUR: 'Euro', TRY: 'Libra', KRW: 'Won', JPY: 'Yen' },
            },
            {
              name: 'Bank Dabrabyt',
              lat: 53.9492054,
              lng: 27.5992096,
              currencies: { KRW: 'Won', JPY: 'Yen' },
            },
            {
              name: 'Paritetbank',
              lat: 53.9220261,
              lng: 27.5414094,
              currencies: {
                AUD: 'Australian Dollar',
                BTC: 'Bitcoin',
                USD: 'Commercial Dollar',
                EUR: 'Euro',
              },
            },
            {
              name: 'Belarusbank',
              lat: 53.89237,
              lng: 27.5495003,
              currencies: {
                AUD: 'Australian Dollar',
                BTC: 'Bitcoin',
                ARS: 'Argentine Peso',
                JPY: 'Yen',
              },
            },
            {
              name: 'Belinvestbank',
              lat: 53.8922081,
              lng: 27.545108,
              currencies: {
                AUD: 'Australian Dollar',
                BTC: 'Bitcoin',
                ARS: 'Argentine Peso',
                CAD: 'Canadian Dollar',
                USD: 'Commercial Dollar',
                EUR: 'Euro',
                TRY: 'Libra',
                KRW: 'Won',
                JPY: 'Yen',
              },
            },
            {
              name: 'Priorbank',
              lat: 53.9192511,
              lng: 27.5476059,
              currencies: {
                BTC: 'Bitcoin',
                ARS: 'Argentine Peso',
                USD: 'Commercial Dollar',
                EUR: 'Euro',
                JPY: 'Yen',
              },
            },
          ],
          d = {
            default: '/',
            timeline: 'timeline',
            bankCard: 'bankCard',
            contato: 'contato',
          },
          h = {
            currencybeacon_api_key: 'UMBHqIhSJ08irV0mHLKF0CjIxrxvngdl',
            currencybeacon_request: 'https://api.currencybeacon.com/v1/latest',
            maptiler_api_key: 'VyOY3rI2tsepj8NNxxyg',
            mockapi_request: 'https://65cbe39eefec34d9ed883c24.mockapi.io/api/v1/',
          },
          f = { lng: 27.54949, lat: 53.891382 },
          p = [
            { symbol: 'AUD', rate: 1.53289419 },
            { symbol: 'KRW', rate: 1331.42229106 },
            { symbol: 'USD', rate: 1 },
            { symbol: 'ARS', rate: 842.57777129 },
            { symbol: 'BTC', rate: 161e-7 },
            { symbol: 'JPY', rate: 150.12546675 },
            { symbol: 'TRY', rate: 31.3410334 },
            { symbol: 'EUR', rate: 0.92260433 },
            { symbol: 'CAD', rate: 1.35655384 },
          ],
          g = 80,
          m = '#ff0000'
      },
      358: (t, e, n) => {
        n.d(e, { Z: () => Z })
        var r,
          i,
          o,
          a = n(294)
        function s() {
          return (
            (s = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e]
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                  }
                  return t
                }),
            s.apply(this, arguments)
          )
        }
        const l = function (t) {
          return a.createElement(
            'svg',
            s(
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '1em',
                height: '1em',
                fill: 'none',
                viewBox: '0 0 80 80',
              },
              t,
            ),
            r ||
              (r = a.createElement('rect', {
                width: 80,
                height: 80,
                fill: '#142E67',
                rx: 8,
              })),
            i ||
              (i = a.createElement(
                'g',
                {
                  stroke: '#fff',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                  clipPath: 'url(#australianDollar_svg__a)',
                },
                a.createElement('path', {
                  d: 'm21.25 52.5 6.831-23.908a1.563 1.563 0 0 1 3.004 0L37.917 52.5M58.75 27.5h-8.333a6.25 6.25 0 0 0 0 12.5H52.5a6.25 6.25 0 0 1 0 12.5h-8.333M50.417 56.667V52.5M52.5 27.5v-4.167M24.375 44.167h10.417',
                }),
              )),
            o ||
              (o = a.createElement(
                'defs',
                null,
                a.createElement(
                  'clipPath',
                  { id: 'australianDollar_svg__a' },
                  a.createElement('path', { fill: '#fff', d: 'M15 15h50v50H15z' }),
                ),
              )),
          )
        }
        var c, u, d
        function h() {
          return (
            (h = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e]
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                  }
                  return t
                }),
            h.apply(this, arguments)
          )
        }
        const f = function (t) {
          return a.createElement(
            'svg',
            h(
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '1em',
                height: '1em',
                fill: 'none',
                viewBox: '0 0 80 80',
              },
              t,
            ),
            c ||
              (c = a.createElement('rect', {
                width: 80,
                height: 80,
                fill: '#3D2E28',
                rx: 8,
              })),
            u ||
              (u = a.createElement(
                'g',
                {
                  stroke: '#fff',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                  clipPath: 'url(#bitcoin_svg__a)',
                },
                a.createElement('path', {
                  d: 'M27.5 27.5h16.667a6.25 6.25 0 0 1 0 12.5 6.25 6.25 0 0 1 0 12.5H27.5M31.667 27.5v25M31.667 40h12.5M33.75 21.25v6.25M42.083 21.25v6.25M33.75 52.5v6.25M42.083 52.5v6.25',
                }),
              )),
            d ||
              (d = a.createElement(
                'defs',
                null,
                a.createElement(
                  'clipPath',
                  { id: 'bitcoin_svg__a' },
                  a.createElement('path', { fill: '#fff', d: 'M15 15h50v50H15z' }),
                ),
              )),
          )
        }
        var p, g, m
        function b() {
          return (
            (b = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e]
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                  }
                  return t
                }),
            b.apply(this, arguments)
          )
        }
        const y = function (t) {
          return a.createElement(
            'svg',
            b(
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '1em',
                height: '1em',
                fill: 'none',
                viewBox: '0 0 80 80',
              },
              t,
            ),
            p ||
              (p = a.createElement('rect', {
                width: 80,
                height: 80,
                fill: '#452534',
                rx: 8,
              })),
            g ||
              (g = a.createElement(
                'g',
                {
                  stroke: '#fff',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                  clipPath: 'url(#canadianDollar_svg__a)',
                },
                a.createElement('path', {
                  d: 'M58.75 27.5h-8.333a6.25 6.25 0 0 0 0 12.5H52.5a6.25 6.25 0 0 1 0 12.5h-8.333M35.833 52.5H33.75a12.5 12.5 0 0 1 0-25h2.083M50.417 56.667V52.5M52.5 27.5v-4.167',
                }),
              )),
            m ||
              (m = a.createElement(
                'defs',
                null,
                a.createElement(
                  'clipPath',
                  { id: 'canadianDollar_svg__a' },
                  a.createElement('path', { fill: '#fff', d: 'M15 15h50v50H15z' }),
                ),
              )),
          )
        }
        var v, x, w
        function _() {
          return (
            (_ = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e]
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                  }
                  return t
                }),
            _.apply(this, arguments)
          )
        }
        const k = function (t) {
          return a.createElement(
            'svg',
            _(
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '1em',
                height: '1em',
                fill: 'none',
                viewBox: '0 0 80 80',
              },
              t,
            ),
            v ||
              (v = a.createElement('rect', {
                width: 80,
                height: 80,
                fill: '#2A4628',
                rx: 8,
              })),
            x ||
              (x = a.createElement(
                'g',
                {
                  stroke: '#fff',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 3.5,
                  clipPath: 'url(#dollar_svg__a)',
                },
                a.createElement('path', {
                  d: 'M49.494 31.072a6.25 6.25 0 0 0-5.625-4.167h-8.333a6.25 6.25 0 0 0 0 12.5h8.333a6.25 6.25 0 0 1 0 12.5h-8.333a6.25 6.25 0 0 1-5.625-4.167M40 20.952v6.25m0 25v6.25',
                }),
              )),
            w ||
              (w = a.createElement(
                'defs',
                null,
                a.createElement(
                  'clipPath',
                  { id: 'dollar_svg__a' },
                  a.createElement('path', { fill: '#fff', d: 'M15 15h50v50H15z' }),
                ),
              )),
          )
        }
        var S, E, C
        function M() {
          return (
            (M = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e]
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                  }
                  return t
                }),
            M.apply(this, arguments)
          )
        }
        const P = function (t) {
          return a.createElement(
            'svg',
            M(
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '1em',
                height: '1em',
                fill: 'none',
                viewBox: '0 0 80 80',
              },
              t,
            ),
            S ||
              (S = a.createElement('rect', {
                width: 80,
                height: 80,
                fill: '#1D324B',
                rx: 8,
              })),
            E ||
              (E = a.createElement(
                'g',
                {
                  stroke: '#fff',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                  clipPath: 'url(#euro_svg__a)',
                },
                a.createElement('path', {
                  d: 'M50.833 29.583c-1.758-2.01-3.985-3.369-6.403-3.907-2.418-.54-4.918-.233-7.187.88s-4.207 2.981-5.569 5.373-2.089 5.2-2.089 8.071c0 2.872.727 5.68 2.09 8.071 1.361 2.392 3.299 4.261 5.568 5.374s4.77 1.418 7.187.88c2.418-.54 4.645-1.899 6.403-3.908M42.083 35.833H25.417m0 8.334h16.666',
                }),
              )),
            C ||
              (C = a.createElement(
                'defs',
                null,
                a.createElement(
                  'clipPath',
                  { id: 'euro_svg__a' },
                  a.createElement('path', { fill: '#fff', d: 'M15 15h50v50H15z' }),
                ),
              )),
          )
        }
        var O, D, T
        function R() {
          return (
            (R = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e]
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                  }
                  return t
                }),
            R.apply(this, arguments)
          )
        }
        const L = function (t) {
          return a.createElement(
            'svg',
            R(
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '1em',
                height: '1em',
                fill: 'none',
                viewBox: '0 0 80 80',
              },
              t,
            ),
            O ||
              (O = a.createElement('rect', {
                width: 80,
                height: 80,
                fill: '#5B2C2B',
                rx: 8,
              })),
            D ||
              (D = a.createElement(
                'g',
                { clipPath: 'url(#libra_svg__a)' },
                a.createElement('path', {
                  stroke: '#fff',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                  d: 'M50.417 53.542a12.5 12.5 0 0 1-10.417 0 12.5 12.5 0 0 0-10.417 1.041 6.25 6.25 0 0 0 4.167-5.208V33.75a8.334 8.334 0 0 1 15.52-4.167m-5.312 12.5H29.375',
                }),
              )),
            T ||
              (T = a.createElement(
                'defs',
                null,
                a.createElement(
                  'clipPath',
                  { id: 'libra_svg__a' },
                  a.createElement('path', { fill: '#fff', d: 'M15 15h50v50H15z' }),
                ),
              )),
          )
        }
        var A, N, j
        function z() {
          return (
            (z = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e]
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                  }
                  return t
                }),
            z.apply(this, arguments)
          )
        }
        const F = function (t) {
          return a.createElement(
            'svg',
            z(
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '1em',
                height: '1em',
                fill: 'none',
                viewBox: '0 0 80 80',
              },
              t,
            ),
            A ||
              (A = a.createElement('rect', {
                width: 80,
                height: 80,
                fill: '#5A4B2C',
                rx: 8,
              })),
            N ||
              (N = a.createElement(
                'g',
                {
                  stroke: '#fff',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                  clipPath: 'url(#pesoArgentino_svg__a)',
                },
                a.createElement('path', {
                  d: 'M31.667 54.583V25.417h7.291a9.375 9.375 0 0 1 0 18.75h-7.291M52.5 31.667h-25M52.5 37.917h-25',
                }),
              )),
            j ||
              (j = a.createElement(
                'defs',
                null,
                a.createElement(
                  'clipPath',
                  { id: 'pesoArgentino_svg__a' },
                  a.createElement('path', { fill: '#fff', d: 'M15 15h50v50H15z' }),
                ),
              )),
          )
        }
        var I, B, U
        function W() {
          return (
            (W = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e]
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                  }
                  return t
                }),
            W.apply(this, arguments)
          )
        }
        const V = function (t) {
          return a.createElement(
            'svg',
            W(
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '1em',
                height: '1em',
                fill: 'none',
                viewBox: '0 0 80 80',
              },
              t,
            ),
            I ||
              (I = a.createElement('rect', {
                width: 80,
                height: 80,
                fill: '#4D505B',
                rx: 8,
              })),
            B ||
              (B = a.createElement(
                'g',
                {
                  stroke: '#fff',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                  clipPath: 'url(#won_svg__a)',
                },
                a.createElement('path', {
                  d: 'M46.25 33.75v16.667a4.167 4.167 0 0 0 8.333 0M54.583 33.75H25.417M54.583 25.417H25.417M33.75 33.75v8.333c0 5.209-1.39 8.334-4.167 12.5',
                }),
              )),
            U ||
              (U = a.createElement(
                'defs',
                null,
                a.createElement(
                  'clipPath',
                  { id: 'won_svg__a' },
                  a.createElement('path', { fill: '#fff', d: 'M15 15h50v50H15z' }),
                ),
              )),
          )
        }
        var H, $, Y
        function q() {
          return (
            (q = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e]
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                  }
                  return t
                }),
            q.apply(this, arguments)
          )
        }
        const Q = function (t) {
          return a.createElement(
            'svg',
            q(
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '1em',
                height: '1em',
                fill: 'none',
                viewBox: '0 0 80 80',
              },
              t,
            ),
            H ||
              (H = a.createElement('rect', {
                width: 80,
                height: 80,
                fill: '#494F57',
                rx: 8,
              })),
            $ ||
              ($ = a.createElement(
                'g',
                {
                  stroke: '#fff',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: 2,
                  clipPath: 'url(#yen_svg__a)',
                },
                a.createElement('path', {
                  d: 'M40 54.583V40m0 0L29.583 25.417M40 40l10.417-14.583M31.667 50.417h16.666M31.667 42.083h16.666',
                }),
              )),
            Y ||
              (Y = a.createElement(
                'defs',
                null,
                a.createElement(
                  'clipPath',
                  { id: 'yen_svg__a' },
                  a.createElement('path', { fill: '#fff', d: 'M15 15h50v50H15z' }),
                ),
              )),
          )
        }
        var X = n(893)
        function K() {
          return (
            (K = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e]
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                  }
                  return t
                }),
            K.apply(this, arguments)
          )
        }
        const Z = {
          AUD: function (t) {
            return (0, X.jsx)(l, K({}, t))
          },
          BTC: function (t) {
            return (0, X.jsx)(f, K({}, t))
          },
          CAD: function (t) {
            return (0, X.jsx)(y, K({}, t))
          },
          USD: function (t) {
            return (0, X.jsx)(k, K({}, t))
          },
          EUR: function (t) {
            return (0, X.jsx)(P, K({}, t))
          },
          TRY: function (t) {
            return (0, X.jsx)(L, K({}, t))
          },
          ARS: function (t) {
            return (0, X.jsx)(F, K({}, t))
          },
          KRW: function (t) {
            return (0, X.jsx)(V, K({}, t))
          },
          JPY: function (t) {
            return (0, X.jsx)(Q, K({}, t))
          },
        }
      },
      761: (t, e, n) => {
        n.d(e, { Z: () => i })
        var r = n(985)
        const i = new ((function () {
          function t() {
            ;(this.currency = Object.keys(r.s)[0]),
              (this.dataset = []),
              (this.observers = [])
          }
          var e = t.prototype
          return (
            (e.subscribe = function (t) {
              this.observers.push(t)
            }),
            (e.notify = function (t, e) {
              var n = this
              t && (this.currency = t),
                e && (this.dataset = e),
                this.observers.forEach(function (t) {
                  return t.update(n)
                })
            }),
            t
          )
        })())()
      },
      448: (t, e, n) => {
        var r = n(294),
          i = n(840)
        function o(t) {
          for (
            var e = 'https://reactjs.org/docs/error-decoder.html?invariant=' + t,
              n = 1;
            n < arguments.length;
            n++
          )
            e += '&args[]=' + encodeURIComponent(arguments[n])
          return (
            'Minified React error #' +
            t +
            '; visit ' +
            e +
            ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
          )
        }
        var a = new Set(),
          s = {}
        function l(t, e) {
          c(t, e), c(t + 'Capture', e)
        }
        function c(t, e) {
          for (s[t] = e, t = 0; t < e.length; t++) a.add(e[t])
        }
        var u = !(
            'undefined' == typeof window ||
            void 0 === window.document ||
            void 0 === window.document.createElement
          ),
          d = Object.prototype.hasOwnProperty,
          h =
            /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
          f = {},
          p = {}
        function g(t, e, n, r, i, o, a) {
          ;(this.acceptsBooleans = 2 === e || 3 === e || 4 === e),
            (this.attributeName = r),
            (this.attributeNamespace = i),
            (this.mustUseProperty = n),
            (this.propertyName = t),
            (this.type = e),
            (this.sanitizeURL = o),
            (this.removeEmptyString = a)
        }
        var m = {}
        'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
          .split(' ')
          .forEach(function (t) {
            m[t] = new g(t, 0, !1, t, null, !1, !1)
          }),
          [
            ['acceptCharset', 'accept-charset'],
            ['className', 'class'],
            ['htmlFor', 'for'],
            ['httpEquiv', 'http-equiv'],
          ].forEach(function (t) {
            var e = t[0]
            m[e] = new g(e, 1, !1, t[1], null, !1, !1)
          }),
          ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(
            function (t) {
              m[t] = new g(t, 2, !1, t.toLowerCase(), null, !1, !1)
            },
          ),
          [
            'autoReverse',
            'externalResourcesRequired',
            'focusable',
            'preserveAlpha',
          ].forEach(function (t) {
            m[t] = new g(t, 2, !1, t, null, !1, !1)
          }),
          'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
            .split(' ')
            .forEach(function (t) {
              m[t] = new g(t, 3, !1, t.toLowerCase(), null, !1, !1)
            }),
          ['checked', 'multiple', 'muted', 'selected'].forEach(function (t) {
            m[t] = new g(t, 3, !0, t, null, !1, !1)
          }),
          ['capture', 'download'].forEach(function (t) {
            m[t] = new g(t, 4, !1, t, null, !1, !1)
          }),
          ['cols', 'rows', 'size', 'span'].forEach(function (t) {
            m[t] = new g(t, 6, !1, t, null, !1, !1)
          }),
          ['rowSpan', 'start'].forEach(function (t) {
            m[t] = new g(t, 5, !1, t.toLowerCase(), null, !1, !1)
          })
        var b = /[\-:]([a-z])/g
        function y(t) {
          return t[1].toUpperCase()
        }
        function v(t, e, n, r) {
          var i = m.hasOwnProperty(e) ? m[e] : null
          ;(null !== i
            ? 0 !== i.type
            : r ||
              !(2 < e.length) ||
              ('o' !== e[0] && 'O' !== e[0]) ||
              ('n' !== e[1] && 'N' !== e[1])) &&
            ((function (t, e, n, r) {
              if (
                null == e ||
                (function (t, e, n, r) {
                  if (null !== n && 0 === n.type) return !1
                  switch (typeof e) {
                    case 'function':
                    case 'symbol':
                      return !0
                    case 'boolean':
                      return (
                        !r &&
                        (null !== n
                          ? !n.acceptsBooleans
                          : 'data-' !== (t = t.toLowerCase().slice(0, 5)) &&
                            'aria-' !== t)
                      )
                    default:
                      return !1
                  }
                })(t, e, n, r)
              )
                return !0
              if (r) return !1
              if (null !== n)
                switch (n.type) {
                  case 3:
                    return !e
                  case 4:
                    return !1 === e
                  case 5:
                    return isNaN(e)
                  case 6:
                    return isNaN(e) || 1 > e
                }
              return !1
            })(e, n, i, r) && (n = null),
            r || null === i
              ? (function (t) {
                  return (
                    !!d.call(p, t) ||
                    (!d.call(f, t) && (h.test(t) ? (p[t] = !0) : ((f[t] = !0), !1)))
                  )
                })(e) &&
                (null === n ? t.removeAttribute(e) : t.setAttribute(e, '' + n))
              : i.mustUseProperty
                ? (t[i.propertyName] = null === n ? 3 !== i.type && '' : n)
                : ((e = i.attributeName),
                  (r = i.attributeNamespace),
                  null === n
                    ? t.removeAttribute(e)
                    : ((n =
                        3 === (i = i.type) || (4 === i && !0 === n) ? '' : '' + n),
                      r ? t.setAttributeNS(r, e, n) : t.setAttribute(e, n))))
        }
        'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
          .split(' ')
          .forEach(function (t) {
            var e = t.replace(b, y)
            m[e] = new g(e, 1, !1, t, null, !1, !1)
          }),
          'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
            .split(' ')
            .forEach(function (t) {
              var e = t.replace(b, y)
              m[e] = new g(e, 1, !1, t, 'http://www.w3.org/1999/xlink', !1, !1)
            }),
          ['xml:base', 'xml:lang', 'xml:space'].forEach(function (t) {
            var e = t.replace(b, y)
            m[e] = new g(
              e,
              1,
              !1,
              t,
              'http://www.w3.org/XML/1998/namespace',
              !1,
              !1,
            )
          }),
          ['tabIndex', 'crossOrigin'].forEach(function (t) {
            m[t] = new g(t, 1, !1, t.toLowerCase(), null, !1, !1)
          }),
          (m.xlinkHref = new g(
            'xlinkHref',
            1,
            !1,
            'xlink:href',
            'http://www.w3.org/1999/xlink',
            !0,
            !1,
          )),
          ['src', 'href', 'action', 'formAction'].forEach(function (t) {
            m[t] = new g(t, 1, !1, t.toLowerCase(), null, !0, !0)
          })
        var x = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
          w = Symbol.for('react.element'),
          _ = Symbol.for('react.portal'),
          k = Symbol.for('react.fragment'),
          S = Symbol.for('react.strict_mode'),
          E = Symbol.for('react.profiler'),
          C = Symbol.for('react.provider'),
          M = Symbol.for('react.context'),
          P = Symbol.for('react.forward_ref'),
          O = Symbol.for('react.suspense'),
          D = Symbol.for('react.suspense_list'),
          T = Symbol.for('react.memo'),
          R = Symbol.for('react.lazy')
        Symbol.for('react.scope'), Symbol.for('react.debug_trace_mode')
        var L = Symbol.for('react.offscreen')
        Symbol.for('react.legacy_hidden'),
          Symbol.for('react.cache'),
          Symbol.for('react.tracing_marker')
        var A = Symbol.iterator
        function N(t) {
          return null === t || 'object' != typeof t
            ? null
            : 'function' == typeof (t = (A && t[A]) || t['@@iterator'])
              ? t
              : null
        }
        var j,
          z = Object.assign
        function F(t) {
          if (void 0 === j)
            try {
              throw Error()
            } catch (t) {
              var e = t.stack.trim().match(/\n( *(at )?)/)
              j = (e && e[1]) || ''
            }
          return '\n' + j + t
        }
        var I = !1
        function B(t, e) {
          if (!t || I) return ''
          I = !0
          var n = Error.prepareStackTrace
          Error.prepareStackTrace = void 0
          try {
            if (e)
              if (
                ((e = function () {
                  throw Error()
                }),
                Object.defineProperty(e.prototype, 'props', {
                  set: function () {
                    throw Error()
                  },
                }),
                'object' == typeof Reflect && Reflect.construct)
              ) {
                try {
                  Reflect.construct(e, [])
                } catch (t) {
                  var r = t
                }
                Reflect.construct(t, [], e)
              } else {
                try {
                  e.call()
                } catch (t) {
                  r = t
                }
                t.call(e.prototype)
              }
            else {
              try {
                throw Error()
              } catch (t) {
                r = t
              }
              t()
            }
          } catch (e) {
            if (e && r && 'string' == typeof e.stack) {
              for (
                var i = e.stack.split('\n'),
                  o = r.stack.split('\n'),
                  a = i.length - 1,
                  s = o.length - 1;
                1 <= a && 0 <= s && i[a] !== o[s];

              )
                s--
              for (; 1 <= a && 0 <= s; a--, s--)
                if (i[a] !== o[s]) {
                  if (1 !== a || 1 !== s)
                    do {
                      if ((a--, 0 > --s || i[a] !== o[s])) {
                        var l = '\n' + i[a].replace(' at new ', ' at ')
                        return (
                          t.displayName &&
                            l.includes('<anonymous>') &&
                            (l = l.replace('<anonymous>', t.displayName)),
                          l
                        )
                      }
                    } while (1 <= a && 0 <= s)
                  break
                }
            }
          } finally {
            ;(I = !1), (Error.prepareStackTrace = n)
          }
          return (t = t ? t.displayName || t.name : '') ? F(t) : ''
        }
        function U(t) {
          switch (t.tag) {
            case 5:
              return F(t.type)
            case 16:
              return F('Lazy')
            case 13:
              return F('Suspense')
            case 19:
              return F('SuspenseList')
            case 0:
            case 2:
            case 15:
              return (t = B(t.type, !1))
            case 11:
              return (t = B(t.type.render, !1))
            case 1:
              return (t = B(t.type, !0))
            default:
              return ''
          }
        }
        function W(t) {
          if (null == t) return null
          if ('function' == typeof t) return t.displayName || t.name || null
          if ('string' == typeof t) return t
          switch (t) {
            case k:
              return 'Fragment'
            case _:
              return 'Portal'
            case E:
              return 'Profiler'
            case S:
              return 'StrictMode'
            case O:
              return 'Suspense'
            case D:
              return 'SuspenseList'
          }
          if ('object' == typeof t)
            switch (t.$$typeof) {
              case M:
                return (t.displayName || 'Context') + '.Consumer'
              case C:
                return (t._context.displayName || 'Context') + '.Provider'
              case P:
                var e = t.render
                return (
                  (t = t.displayName) ||
                    (t =
                      '' !== (t = e.displayName || e.name || '')
                        ? 'ForwardRef(' + t + ')'
                        : 'ForwardRef'),
                  t
                )
              case T:
                return null !== (e = t.displayName || null)
                  ? e
                  : W(t.type) || 'Memo'
              case R:
                ;(e = t._payload), (t = t._init)
                try {
                  return W(t(e))
                } catch (t) {}
            }
          return null
        }
        function V(t) {
          var e = t.type
          switch (t.tag) {
            case 24:
              return 'Cache'
            case 9:
              return (e.displayName || 'Context') + '.Consumer'
            case 10:
              return (e._context.displayName || 'Context') + '.Provider'
            case 18:
              return 'DehydratedFragment'
            case 11:
              return (
                (t = (t = e.render).displayName || t.name || ''),
                e.displayName || ('' !== t ? 'ForwardRef(' + t + ')' : 'ForwardRef')
              )
            case 7:
              return 'Fragment'
            case 5:
              return e
            case 4:
              return 'Portal'
            case 3:
              return 'Root'
            case 6:
              return 'Text'
            case 16:
              return W(e)
            case 8:
              return e === S ? 'StrictMode' : 'Mode'
            case 22:
              return 'Offscreen'
            case 12:
              return 'Profiler'
            case 21:
              return 'Scope'
            case 13:
              return 'Suspense'
            case 19:
              return 'SuspenseList'
            case 25:
              return 'TracingMarker'
            case 1:
            case 0:
            case 17:
            case 2:
            case 14:
            case 15:
              if ('function' == typeof e) return e.displayName || e.name || null
              if ('string' == typeof e) return e
          }
          return null
        }
        function H(t) {
          switch (typeof t) {
            case 'boolean':
            case 'number':
            case 'string':
            case 'undefined':
            case 'object':
              return t
            default:
              return ''
          }
        }
        function $(t) {
          var e = t.type
          return (
            (t = t.nodeName) &&
            'input' === t.toLowerCase() &&
            ('checkbox' === e || 'radio' === e)
          )
        }
        function Y(t) {
          t._valueTracker ||
            (t._valueTracker = (function (t) {
              var e = $(t) ? 'checked' : 'value',
                n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e),
                r = '' + t[e]
              if (
                !t.hasOwnProperty(e) &&
                void 0 !== n &&
                'function' == typeof n.get &&
                'function' == typeof n.set
              ) {
                var i = n.get,
                  o = n.set
                return (
                  Object.defineProperty(t, e, {
                    configurable: !0,
                    get: function () {
                      return i.call(this)
                    },
                    set: function (t) {
                      ;(r = '' + t), o.call(this, t)
                    },
                  }),
                  Object.defineProperty(t, e, { enumerable: n.enumerable }),
                  {
                    getValue: function () {
                      return r
                    },
                    setValue: function (t) {
                      r = '' + t
                    },
                    stopTracking: function () {
                      ;(t._valueTracker = null), delete t[e]
                    },
                  }
                )
              }
            })(t))
        }
        function q(t) {
          if (!t) return !1
          var e = t._valueTracker
          if (!e) return !0
          var n = e.getValue(),
            r = ''
          return (
            t && (r = $(t) ? (t.checked ? 'true' : 'false') : t.value),
            (t = r) !== n && (e.setValue(t), !0)
          )
        }
        function Q(t) {
          if (
            void 0 ===
            (t = t || ('undefined' != typeof document ? document : void 0))
          )
            return null
          try {
            return t.activeElement || t.body
          } catch (e) {
            return t.body
          }
        }
        function X(t, e) {
          var n = e.checked
          return z({}, e, {
            defaultChecked: void 0,
            defaultValue: void 0,
            value: void 0,
            checked: null != n ? n : t._wrapperState.initialChecked,
          })
        }
        function K(t, e) {
          var n = null == e.defaultValue ? '' : e.defaultValue,
            r = null != e.checked ? e.checked : e.defaultChecked
          ;(n = H(null != e.value ? e.value : n)),
            (t._wrapperState = {
              initialChecked: r,
              initialValue: n,
              controlled:
                'checkbox' === e.type || 'radio' === e.type
                  ? null != e.checked
                  : null != e.value,
            })
        }
        function Z(t, e) {
          null != (e = e.checked) && v(t, 'checked', e, !1)
        }
        function J(t, e) {
          Z(t, e)
          var n = H(e.value),
            r = e.type
          if (null != n)
            'number' === r
              ? ((0 === n && '' === t.value) || t.value != n) && (t.value = '' + n)
              : t.value !== '' + n && (t.value = '' + n)
          else if ('submit' === r || 'reset' === r)
            return void t.removeAttribute('value')
          e.hasOwnProperty('value')
            ? tt(t, e.type, n)
            : e.hasOwnProperty('defaultValue') && tt(t, e.type, H(e.defaultValue)),
            null == e.checked &&
              null != e.defaultChecked &&
              (t.defaultChecked = !!e.defaultChecked)
        }
        function G(t, e, n) {
          if (e.hasOwnProperty('value') || e.hasOwnProperty('defaultValue')) {
            var r = e.type
            if (
              !(
                ('submit' !== r && 'reset' !== r) ||
                (void 0 !== e.value && null !== e.value)
              )
            )
              return
            ;(e = '' + t._wrapperState.initialValue),
              n || e === t.value || (t.value = e),
              (t.defaultValue = e)
          }
          '' !== (n = t.name) && (t.name = ''),
            (t.defaultChecked = !!t._wrapperState.initialChecked),
            '' !== n && (t.name = n)
        }
        function tt(t, e, n) {
          ;('number' === e && Q(t.ownerDocument) === t) ||
            (null == n
              ? (t.defaultValue = '' + t._wrapperState.initialValue)
              : t.defaultValue !== '' + n && (t.defaultValue = '' + n))
        }
        var et = Array.isArray
        function nt(t, e, n, r) {
          if (((t = t.options), e)) {
            e = {}
            for (var i = 0; i < n.length; i++) e['$' + n[i]] = !0
            for (n = 0; n < t.length; n++)
              (i = e.hasOwnProperty('$' + t[n].value)),
                t[n].selected !== i && (t[n].selected = i),
                i && r && (t[n].defaultSelected = !0)
          } else {
            for (n = '' + H(n), e = null, i = 0; i < t.length; i++) {
              if (t[i].value === n)
                return (t[i].selected = !0), void (r && (t[i].defaultSelected = !0))
              null !== e || t[i].disabled || (e = t[i])
            }
            null !== e && (e.selected = !0)
          }
        }
        function rt(t, e) {
          if (null != e.dangerouslySetInnerHTML) throw Error(o(91))
          return z({}, e, {
            value: void 0,
            defaultValue: void 0,
            children: '' + t._wrapperState.initialValue,
          })
        }
        function it(t, e) {
          var n = e.value
          if (null == n) {
            if (((n = e.children), (e = e.defaultValue), null != n)) {
              if (null != e) throw Error(o(92))
              if (et(n)) {
                if (1 < n.length) throw Error(o(93))
                n = n[0]
              }
              e = n
            }
            null == e && (e = ''), (n = e)
          }
          t._wrapperState = { initialValue: H(n) }
        }
        function ot(t, e) {
          var n = H(e.value),
            r = H(e.defaultValue)
          null != n &&
            ((n = '' + n) !== t.value && (t.value = n),
            null == e.defaultValue && t.defaultValue !== n && (t.defaultValue = n)),
            null != r && (t.defaultValue = '' + r)
        }
        function at(t) {
          var e = t.textContent
          e === t._wrapperState.initialValue &&
            '' !== e &&
            null !== e &&
            (t.value = e)
        }
        function st(t) {
          switch (t) {
            case 'svg':
              return 'http://www.w3.org/2000/svg'
            case 'math':
              return 'http://www.w3.org/1998/Math/MathML'
            default:
              return 'http://www.w3.org/1999/xhtml'
          }
        }
        function lt(t, e) {
          return null == t || 'http://www.w3.org/1999/xhtml' === t
            ? st(e)
            : 'http://www.w3.org/2000/svg' === t && 'foreignObject' === e
              ? 'http://www.w3.org/1999/xhtml'
              : t
        }
        var ct,
          ut,
          dt =
            ((ut = function (t, e) {
              if (
                'http://www.w3.org/2000/svg' !== t.namespaceURI ||
                'innerHTML' in t
              )
                t.innerHTML = e
              else {
                for (
                  (ct = ct || document.createElement('div')).innerHTML =
                    '<svg>' + e.valueOf().toString() + '</svg>',
                    e = ct.firstChild;
                  t.firstChild;

                )
                  t.removeChild(t.firstChild)
                for (; e.firstChild; ) t.appendChild(e.firstChild)
              }
            }),
            'undefined' != typeof MSApp && MSApp.execUnsafeLocalFunction
              ? function (t, e, n, r) {
                  MSApp.execUnsafeLocalFunction(function () {
                    return ut(t, e)
                  })
                }
              : ut)
        function ht(t, e) {
          if (e) {
            var n = t.firstChild
            if (n && n === t.lastChild && 3 === n.nodeType)
              return void (n.nodeValue = e)
          }
          t.textContent = e
        }
        var ft = {
            animationIterationCount: !0,
            aspectRatio: !0,
            borderImageOutset: !0,
            borderImageSlice: !0,
            borderImageWidth: !0,
            boxFlex: !0,
            boxFlexGroup: !0,
            boxOrdinalGroup: !0,
            columnCount: !0,
            columns: !0,
            flex: !0,
            flexGrow: !0,
            flexPositive: !0,
            flexShrink: !0,
            flexNegative: !0,
            flexOrder: !0,
            gridArea: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowSpan: !0,
            gridRowStart: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnSpan: !0,
            gridColumnStart: !0,
            fontWeight: !0,
            lineClamp: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            tabSize: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            floodOpacity: !0,
            stopOpacity: !0,
            strokeDasharray: !0,
            strokeDashoffset: !0,
            strokeMiterlimit: !0,
            strokeOpacity: !0,
            strokeWidth: !0,
          },
          pt = ['Webkit', 'ms', 'Moz', 'O']
        function gt(t, e, n) {
          return null == e || 'boolean' == typeof e || '' === e
            ? ''
            : n ||
                'number' != typeof e ||
                0 === e ||
                (ft.hasOwnProperty(t) && ft[t])
              ? ('' + e).trim()
              : e + 'px'
        }
        function mt(t, e) {
          for (var n in ((t = t.style), e))
            if (e.hasOwnProperty(n)) {
              var r = 0 === n.indexOf('--'),
                i = gt(n, e[n], r)
              'float' === n && (n = 'cssFloat'),
                r ? t.setProperty(n, i) : (t[n] = i)
            }
        }
        Object.keys(ft).forEach(function (t) {
          pt.forEach(function (e) {
            ;(e = e + t.charAt(0).toUpperCase() + t.substring(1)), (ft[e] = ft[t])
          })
        })
        var bt = z(
          { menuitem: !0 },
          {
            area: !0,
            base: !0,
            br: !0,
            col: !0,
            embed: !0,
            hr: !0,
            img: !0,
            input: !0,
            keygen: !0,
            link: !0,
            meta: !0,
            param: !0,
            source: !0,
            track: !0,
            wbr: !0,
          },
        )
        function yt(t, e) {
          if (e) {
            if (bt[t] && (null != e.children || null != e.dangerouslySetInnerHTML))
              throw Error(o(137, t))
            if (null != e.dangerouslySetInnerHTML) {
              if (null != e.children) throw Error(o(60))
              if (
                'object' != typeof e.dangerouslySetInnerHTML ||
                !('__html' in e.dangerouslySetInnerHTML)
              )
                throw Error(o(61))
            }
            if (null != e.style && 'object' != typeof e.style) throw Error(o(62))
          }
        }
        function vt(t, e) {
          if (-1 === t.indexOf('-')) return 'string' == typeof e.is
          switch (t) {
            case 'annotation-xml':
            case 'color-profile':
            case 'font-face':
            case 'font-face-src':
            case 'font-face-uri':
            case 'font-face-format':
            case 'font-face-name':
            case 'missing-glyph':
              return !1
            default:
              return !0
          }
        }
        var xt = null
        function wt(t) {
          return (
            (t = t.target || t.srcElement || window).correspondingUseElement &&
              (t = t.correspondingUseElement),
            3 === t.nodeType ? t.parentNode : t
          )
        }
        var _t = null,
          kt = null,
          St = null
        function Et(t) {
          if ((t = vi(t))) {
            if ('function' != typeof _t) throw Error(o(280))
            var e = t.stateNode
            e && ((e = wi(e)), _t(t.stateNode, t.type, e))
          }
        }
        function Ct(t) {
          kt ? (St ? St.push(t) : (St = [t])) : (kt = t)
        }
        function Mt() {
          if (kt) {
            var t = kt,
              e = St
            if (((St = kt = null), Et(t), e))
              for (t = 0; t < e.length; t++) Et(e[t])
          }
        }
        function Pt(t, e) {
          return t(e)
        }
        function Ot() {}
        var Dt = !1
        function Tt(t, e, n) {
          if (Dt) return t(e, n)
          Dt = !0
          try {
            return Pt(t, e, n)
          } finally {
            ;(Dt = !1), (null !== kt || null !== St) && (Ot(), Mt())
          }
        }
        function Rt(t, e) {
          var n = t.stateNode
          if (null === n) return null
          var r = wi(n)
          if (null === r) return null
          n = r[e]
          t: switch (e) {
            case 'onClick':
            case 'onClickCapture':
            case 'onDoubleClick':
            case 'onDoubleClickCapture':
            case 'onMouseDown':
            case 'onMouseDownCapture':
            case 'onMouseMove':
            case 'onMouseMoveCapture':
            case 'onMouseUp':
            case 'onMouseUpCapture':
            case 'onMouseEnter':
              ;(r = !r.disabled) ||
                (r = !(
                  'button' === (t = t.type) ||
                  'input' === t ||
                  'select' === t ||
                  'textarea' === t
                )),
                (t = !r)
              break t
            default:
              t = !1
          }
          if (t) return null
          if (n && 'function' != typeof n) throw Error(o(231, e, typeof n))
          return n
        }
        var Lt = !1
        if (u)
          try {
            var At = {}
            Object.defineProperty(At, 'passive', {
              get: function () {
                Lt = !0
              },
            }),
              window.addEventListener('test', At, At),
              window.removeEventListener('test', At, At)
          } catch (ut) {
            Lt = !1
          }
        function Nt(t, e, n, r, i, o, a, s, l) {
          var c = Array.prototype.slice.call(arguments, 3)
          try {
            e.apply(n, c)
          } catch (t) {
            this.onError(t)
          }
        }
        var jt = !1,
          zt = null,
          Ft = !1,
          It = null,
          Bt = {
            onError: function (t) {
              ;(jt = !0), (zt = t)
            },
          }
        function Ut(t, e, n, r, i, o, a, s, l) {
          ;(jt = !1), (zt = null), Nt.apply(Bt, arguments)
        }
        function Wt(t) {
          var e = t,
            n = t
          if (t.alternate) for (; e.return; ) e = e.return
          else {
            t = e
            do {
              0 != (4098 & (e = t).flags) && (n = e.return), (t = e.return)
            } while (t)
          }
          return 3 === e.tag ? n : null
        }
        function Vt(t) {
          if (13 === t.tag) {
            var e = t.memoizedState
            if (
              (null === e && null !== (t = t.alternate) && (e = t.memoizedState),
              null !== e)
            )
              return e.dehydrated
          }
          return null
        }
        function Ht(t) {
          if (Wt(t) !== t) throw Error(o(188))
        }
        function $t(t) {
          return null !==
            (t = (function (t) {
              var e = t.alternate
              if (!e) {
                if (null === (e = Wt(t))) throw Error(o(188))
                return e !== t ? null : t
              }
              for (var n = t, r = e; ; ) {
                var i = n.return
                if (null === i) break
                var a = i.alternate
                if (null === a) {
                  if (null !== (r = i.return)) {
                    n = r
                    continue
                  }
                  break
                }
                if (i.child === a.child) {
                  for (a = i.child; a; ) {
                    if (a === n) return Ht(i), t
                    if (a === r) return Ht(i), e
                    a = a.sibling
                  }
                  throw Error(o(188))
                }
                if (n.return !== r.return) (n = i), (r = a)
                else {
                  for (var s = !1, l = i.child; l; ) {
                    if (l === n) {
                      ;(s = !0), (n = i), (r = a)
                      break
                    }
                    if (l === r) {
                      ;(s = !0), (r = i), (n = a)
                      break
                    }
                    l = l.sibling
                  }
                  if (!s) {
                    for (l = a.child; l; ) {
                      if (l === n) {
                        ;(s = !0), (n = a), (r = i)
                        break
                      }
                      if (l === r) {
                        ;(s = !0), (r = a), (n = i)
                        break
                      }
                      l = l.sibling
                    }
                    if (!s) throw Error(o(189))
                  }
                }
                if (n.alternate !== r) throw Error(o(190))
              }
              if (3 !== n.tag) throw Error(o(188))
              return n.stateNode.current === n ? t : e
            })(t))
            ? Yt(t)
            : null
        }
        function Yt(t) {
          if (5 === t.tag || 6 === t.tag) return t
          for (t = t.child; null !== t; ) {
            var e = Yt(t)
            if (null !== e) return e
            t = t.sibling
          }
          return null
        }
        var qt = i.unstable_scheduleCallback,
          Qt = i.unstable_cancelCallback,
          Xt = i.unstable_shouldYield,
          Kt = i.unstable_requestPaint,
          Zt = i.unstable_now,
          Jt = i.unstable_getCurrentPriorityLevel,
          Gt = i.unstable_ImmediatePriority,
          te = i.unstable_UserBlockingPriority,
          ee = i.unstable_NormalPriority,
          ne = i.unstable_LowPriority,
          re = i.unstable_IdlePriority,
          ie = null,
          oe = null
        var ae = Math.clz32
            ? Math.clz32
            : function (t) {
                return (t >>>= 0), 0 === t ? 32 : (31 - ((se(t) / le) | 0)) | 0
              },
          se = Math.log,
          le = Math.LN2
        var ce = 64,
          ue = 4194304
        function de(t) {
          switch (t & -t) {
            case 1:
              return 1
            case 2:
              return 2
            case 4:
              return 4
            case 8:
              return 8
            case 16:
              return 16
            case 32:
              return 32
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return 4194240 & t
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              return 130023424 & t
            case 134217728:
              return 134217728
            case 268435456:
              return 268435456
            case 536870912:
              return 536870912
            case 1073741824:
              return 1073741824
            default:
              return t
          }
        }
        function he(t, e) {
          var n = t.pendingLanes
          if (0 === n) return 0
          var r = 0,
            i = t.suspendedLanes,
            o = t.pingedLanes,
            a = 268435455 & n
          if (0 !== a) {
            var s = a & ~i
            0 !== s ? (r = de(s)) : 0 !== (o &= a) && (r = de(o))
          } else 0 !== (a = n & ~i) ? (r = de(a)) : 0 !== o && (r = de(o))
          if (0 === r) return 0
          if (
            0 !== e &&
            e !== r &&
            0 == (e & i) &&
            ((i = r & -r) >= (o = e & -e) || (16 === i && 0 != (4194240 & o)))
          )
            return e
          if ((0 != (4 & r) && (r |= 16 & n), 0 !== (e = t.entangledLanes)))
            for (t = t.entanglements, e &= r; 0 < e; )
              (i = 1 << (n = 31 - ae(e))), (r |= t[n]), (e &= ~i)
          return r
        }
        function fe(t, e) {
          switch (t) {
            case 1:
            case 2:
            case 4:
              return e + 250
            case 8:
            case 16:
            case 32:
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return e + 5e3
            default:
              return -1
          }
        }
        function pe(t) {
          return 0 !== (t = -1073741825 & t.pendingLanes)
            ? t
            : 1073741824 & t
              ? 1073741824
              : 0
        }
        function ge() {
          var t = ce
          return 0 == (4194240 & (ce <<= 1)) && (ce = 64), t
        }
        function me(t) {
          for (var e = [], n = 0; 31 > n; n++) e.push(t)
          return e
        }
        function be(t, e, n) {
          ;(t.pendingLanes |= e),
            536870912 !== e && ((t.suspendedLanes = 0), (t.pingedLanes = 0)),
            ((t = t.eventTimes)[(e = 31 - ae(e))] = n)
        }
        function ye(t, e) {
          var n = (t.entangledLanes |= e)
          for (t = t.entanglements; n; ) {
            var r = 31 - ae(n),
              i = 1 << r
            ;(i & e) | (t[r] & e) && (t[r] |= e), (n &= ~i)
          }
        }
        var ve = 0
        function xe(t) {
          return 1 < (t &= -t)
            ? 4 < t
              ? 0 != (268435455 & t)
                ? 16
                : 536870912
              : 4
            : 1
        }
        var we,
          _e,
          ke,
          Se,
          Ee,
          Ce = !1,
          Me = [],
          Pe = null,
          Oe = null,
          De = null,
          Te = new Map(),
          Re = new Map(),
          Le = [],
          Ae =
            'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
              ' ',
            )
        function Ne(t, e) {
          switch (t) {
            case 'focusin':
            case 'focusout':
              Pe = null
              break
            case 'dragenter':
            case 'dragleave':
              Oe = null
              break
            case 'mouseover':
            case 'mouseout':
              De = null
              break
            case 'pointerover':
            case 'pointerout':
              Te.delete(e.pointerId)
              break
            case 'gotpointercapture':
            case 'lostpointercapture':
              Re.delete(e.pointerId)
          }
        }
        function je(t, e, n, r, i, o) {
          return null === t || t.nativeEvent !== o
            ? ((t = {
                blockedOn: e,
                domEventName: n,
                eventSystemFlags: r,
                nativeEvent: o,
                targetContainers: [i],
              }),
              null !== e && null !== (e = vi(e)) && _e(e),
              t)
            : ((t.eventSystemFlags |= r),
              (e = t.targetContainers),
              null !== i && -1 === e.indexOf(i) && e.push(i),
              t)
        }
        function ze(t) {
          var e = yi(t.target)
          if (null !== e) {
            var n = Wt(e)
            if (null !== n)
              if (13 === (e = n.tag)) {
                if (null !== (e = Vt(n)))
                  return (
                    (t.blockedOn = e),
                    void Ee(t.priority, function () {
                      ke(n)
                    })
                  )
              } else if (3 === e && n.stateNode.current.memoizedState.isDehydrated)
                return void (t.blockedOn =
                  3 === n.tag ? n.stateNode.containerInfo : null)
          }
          t.blockedOn = null
        }
        function Fe(t) {
          if (null !== t.blockedOn) return !1
          for (var e = t.targetContainers; 0 < e.length; ) {
            var n = Xe(t.domEventName, t.eventSystemFlags, e[0], t.nativeEvent)
            if (null !== n)
              return null !== (e = vi(n)) && _e(e), (t.blockedOn = n), !1
            var r = new (n = t.nativeEvent).constructor(n.type, n)
            ;(xt = r), n.target.dispatchEvent(r), (xt = null), e.shift()
          }
          return !0
        }
        function Ie(t, e, n) {
          Fe(t) && n.delete(e)
        }
        function Be() {
          ;(Ce = !1),
            null !== Pe && Fe(Pe) && (Pe = null),
            null !== Oe && Fe(Oe) && (Oe = null),
            null !== De && Fe(De) && (De = null),
            Te.forEach(Ie),
            Re.forEach(Ie)
        }
        function Ue(t, e) {
          t.blockedOn === e &&
            ((t.blockedOn = null),
            Ce ||
              ((Ce = !0),
              i.unstable_scheduleCallback(i.unstable_NormalPriority, Be)))
        }
        function We(t) {
          function e(e) {
            return Ue(e, t)
          }
          if (0 < Me.length) {
            Ue(Me[0], t)
            for (var n = 1; n < Me.length; n++) {
              var r = Me[n]
              r.blockedOn === t && (r.blockedOn = null)
            }
          }
          for (
            null !== Pe && Ue(Pe, t),
              null !== Oe && Ue(Oe, t),
              null !== De && Ue(De, t),
              Te.forEach(e),
              Re.forEach(e),
              n = 0;
            n < Le.length;
            n++
          )
            (r = Le[n]).blockedOn === t && (r.blockedOn = null)
          for (; 0 < Le.length && null === (n = Le[0]).blockedOn; )
            ze(n), null === n.blockedOn && Le.shift()
        }
        var Ve = x.ReactCurrentBatchConfig,
          He = !0
        function $e(t, e, n, r) {
          var i = ve,
            o = Ve.transition
          Ve.transition = null
          try {
            ;(ve = 1), qe(t, e, n, r)
          } finally {
            ;(ve = i), (Ve.transition = o)
          }
        }
        function Ye(t, e, n, r) {
          var i = ve,
            o = Ve.transition
          Ve.transition = null
          try {
            ;(ve = 4), qe(t, e, n, r)
          } finally {
            ;(ve = i), (Ve.transition = o)
          }
        }
        function qe(t, e, n, r) {
          if (He) {
            var i = Xe(t, e, n, r)
            if (null === i) Hr(t, e, r, Qe, n), Ne(t, r)
            else if (
              (function (t, e, n, r, i) {
                switch (e) {
                  case 'focusin':
                    return (Pe = je(Pe, t, e, n, r, i)), !0
                  case 'dragenter':
                    return (Oe = je(Oe, t, e, n, r, i)), !0
                  case 'mouseover':
                    return (De = je(De, t, e, n, r, i)), !0
                  case 'pointerover':
                    var o = i.pointerId
                    return Te.set(o, je(Te.get(o) || null, t, e, n, r, i)), !0
                  case 'gotpointercapture':
                    return (
                      (o = i.pointerId),
                      Re.set(o, je(Re.get(o) || null, t, e, n, r, i)),
                      !0
                    )
                }
                return !1
              })(i, t, e, n, r)
            )
              r.stopPropagation()
            else if ((Ne(t, r), 4 & e && -1 < Ae.indexOf(t))) {
              for (; null !== i; ) {
                var o = vi(i)
                if (
                  (null !== o && we(o),
                  null === (o = Xe(t, e, n, r)) && Hr(t, e, r, Qe, n),
                  o === i)
                )
                  break
                i = o
              }
              null !== i && r.stopPropagation()
            } else Hr(t, e, r, null, n)
          }
        }
        var Qe = null
        function Xe(t, e, n, r) {
          if (((Qe = null), null !== (t = yi((t = wt(r))))))
            if (null === (e = Wt(t))) t = null
            else if (13 === (n = e.tag)) {
              if (null !== (t = Vt(e))) return t
              t = null
            } else if (3 === n) {
              if (e.stateNode.current.memoizedState.isDehydrated)
                return 3 === e.tag ? e.stateNode.containerInfo : null
              t = null
            } else e !== t && (t = null)
          return (Qe = t), null
        }
        function Ke(t) {
          switch (t) {
            case 'cancel':
            case 'click':
            case 'close':
            case 'contextmenu':
            case 'copy':
            case 'cut':
            case 'auxclick':
            case 'dblclick':
            case 'dragend':
            case 'dragstart':
            case 'drop':
            case 'focusin':
            case 'focusout':
            case 'input':
            case 'invalid':
            case 'keydown':
            case 'keypress':
            case 'keyup':
            case 'mousedown':
            case 'mouseup':
            case 'paste':
            case 'pause':
            case 'play':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointerup':
            case 'ratechange':
            case 'reset':
            case 'resize':
            case 'seeked':
            case 'submit':
            case 'touchcancel':
            case 'touchend':
            case 'touchstart':
            case 'volumechange':
            case 'change':
            case 'selectionchange':
            case 'textInput':
            case 'compositionstart':
            case 'compositionend':
            case 'compositionupdate':
            case 'beforeblur':
            case 'afterblur':
            case 'beforeinput':
            case 'blur':
            case 'fullscreenchange':
            case 'focus':
            case 'hashchange':
            case 'popstate':
            case 'select':
            case 'selectstart':
              return 1
            case 'drag':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'mousemove':
            case 'mouseout':
            case 'mouseover':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'scroll':
            case 'toggle':
            case 'touchmove':
            case 'wheel':
            case 'mouseenter':
            case 'mouseleave':
            case 'pointerenter':
            case 'pointerleave':
              return 4
            case 'message':
              switch (Jt()) {
                case Gt:
                  return 1
                case te:
                  return 4
                case ee:
                case ne:
                  return 16
                case re:
                  return 536870912
                default:
                  return 16
              }
            default:
              return 16
          }
        }
        var Ze = null,
          Je = null,
          Ge = null
        function tn() {
          if (Ge) return Ge
          var t,
            e,
            n = Je,
            r = n.length,
            i = 'value' in Ze ? Ze.value : Ze.textContent,
            o = i.length
          for (t = 0; t < r && n[t] === i[t]; t++);
          var a = r - t
          for (e = 1; e <= a && n[r - e] === i[o - e]; e++);
          return (Ge = i.slice(t, 1 < e ? 1 - e : void 0))
        }
        function en(t) {
          var e = t.keyCode
          return (
            'charCode' in t
              ? 0 === (t = t.charCode) && 13 === e && (t = 13)
              : (t = e),
            10 === t && (t = 13),
            32 <= t || 13 === t ? t : 0
          )
        }
        function nn() {
          return !0
        }
        function rn() {
          return !1
        }
        function on(t) {
          function e(e, n, r, i, o) {
            for (var a in ((this._reactName = e),
            (this._targetInst = r),
            (this.type = n),
            (this.nativeEvent = i),
            (this.target = o),
            (this.currentTarget = null),
            t))
              t.hasOwnProperty(a) && ((e = t[a]), (this[a] = e ? e(i) : i[a]))
            return (
              (this.isDefaultPrevented = (
                null != i.defaultPrevented
                  ? i.defaultPrevented
                  : !1 === i.returnValue
              )
                ? nn
                : rn),
              (this.isPropagationStopped = rn),
              this
            )
          }
          return (
            z(e.prototype, {
              preventDefault: function () {
                this.defaultPrevented = !0
                var t = this.nativeEvent
                t &&
                  (t.preventDefault
                    ? t.preventDefault()
                    : 'unknown' != typeof t.returnValue && (t.returnValue = !1),
                  (this.isDefaultPrevented = nn))
              },
              stopPropagation: function () {
                var t = this.nativeEvent
                t &&
                  (t.stopPropagation
                    ? t.stopPropagation()
                    : 'unknown' != typeof t.cancelBubble && (t.cancelBubble = !0),
                  (this.isPropagationStopped = nn))
              },
              persist: function () {},
              isPersistent: nn,
            }),
            e
          )
        }
        var an,
          sn,
          ln,
          cn = {
            eventPhase: 0,
            bubbles: 0,
            cancelable: 0,
            timeStamp: function (t) {
              return t.timeStamp || Date.now()
            },
            defaultPrevented: 0,
            isTrusted: 0,
          },
          un = on(cn),
          dn = z({}, cn, { view: 0, detail: 0 }),
          hn = on(dn),
          fn = z({}, dn, {
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            getModifierState: En,
            button: 0,
            buttons: 0,
            relatedTarget: function (t) {
              return void 0 === t.relatedTarget
                ? t.fromElement === t.srcElement
                  ? t.toElement
                  : t.fromElement
                : t.relatedTarget
            },
            movementX: function (t) {
              return 'movementX' in t
                ? t.movementX
                : (t !== ln &&
                    (ln && 'mousemove' === t.type
                      ? ((an = t.screenX - ln.screenX),
                        (sn = t.screenY - ln.screenY))
                      : (sn = an = 0),
                    (ln = t)),
                  an)
            },
            movementY: function (t) {
              return 'movementY' in t ? t.movementY : sn
            },
          }),
          pn = on(fn),
          gn = on(z({}, fn, { dataTransfer: 0 })),
          mn = on(z({}, dn, { relatedTarget: 0 })),
          bn = on(
            z({}, cn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
          ),
          yn = z({}, cn, {
            clipboardData: function (t) {
              return 'clipboardData' in t ? t.clipboardData : window.clipboardData
            },
          }),
          vn = on(yn),
          xn = on(z({}, cn, { data: 0 })),
          wn = {
            Esc: 'Escape',
            Spacebar: ' ',
            Left: 'ArrowLeft',
            Up: 'ArrowUp',
            Right: 'ArrowRight',
            Down: 'ArrowDown',
            Del: 'Delete',
            Win: 'OS',
            Menu: 'ContextMenu',
            Apps: 'ContextMenu',
            Scroll: 'ScrollLock',
            MozPrintableKey: 'Unidentified',
          },
          _n = {
            8: 'Backspace',
            9: 'Tab',
            12: 'Clear',
            13: 'Enter',
            16: 'Shift',
            17: 'Control',
            18: 'Alt',
            19: 'Pause',
            20: 'CapsLock',
            27: 'Escape',
            32: ' ',
            33: 'PageUp',
            34: 'PageDown',
            35: 'End',
            36: 'Home',
            37: 'ArrowLeft',
            38: 'ArrowUp',
            39: 'ArrowRight',
            40: 'ArrowDown',
            45: 'Insert',
            46: 'Delete',
            112: 'F1',
            113: 'F2',
            114: 'F3',
            115: 'F4',
            116: 'F5',
            117: 'F6',
            118: 'F7',
            119: 'F8',
            120: 'F9',
            121: 'F10',
            122: 'F11',
            123: 'F12',
            144: 'NumLock',
            145: 'ScrollLock',
            224: 'Meta',
          },
          kn = {
            Alt: 'altKey',
            Control: 'ctrlKey',
            Meta: 'metaKey',
            Shift: 'shiftKey',
          }
        function Sn(t) {
          var e = this.nativeEvent
          return e.getModifierState
            ? e.getModifierState(t)
            : !!(t = kn[t]) && !!e[t]
        }
        function En() {
          return Sn
        }
        var Cn = z({}, dn, {
            key: function (t) {
              if (t.key) {
                var e = wn[t.key] || t.key
                if ('Unidentified' !== e) return e
              }
              return 'keypress' === t.type
                ? 13 === (t = en(t))
                  ? 'Enter'
                  : String.fromCharCode(t)
                : 'keydown' === t.type || 'keyup' === t.type
                  ? _n[t.keyCode] || 'Unidentified'
                  : ''
            },
            code: 0,
            location: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            repeat: 0,
            locale: 0,
            getModifierState: En,
            charCode: function (t) {
              return 'keypress' === t.type ? en(t) : 0
            },
            keyCode: function (t) {
              return 'keydown' === t.type || 'keyup' === t.type ? t.keyCode : 0
            },
            which: function (t) {
              return 'keypress' === t.type
                ? en(t)
                : 'keydown' === t.type || 'keyup' === t.type
                  ? t.keyCode
                  : 0
            },
          }),
          Mn = on(Cn),
          Pn = on(
            z({}, fn, {
              pointerId: 0,
              width: 0,
              height: 0,
              pressure: 0,
              tangentialPressure: 0,
              tiltX: 0,
              tiltY: 0,
              twist: 0,
              pointerType: 0,
              isPrimary: 0,
            }),
          ),
          On = on(
            z({}, dn, {
              touches: 0,
              targetTouches: 0,
              changedTouches: 0,
              altKey: 0,
              metaKey: 0,
              ctrlKey: 0,
              shiftKey: 0,
              getModifierState: En,
            }),
          ),
          Dn = on(z({}, cn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
          Tn = z({}, fn, {
            deltaX: function (t) {
              return 'deltaX' in t
                ? t.deltaX
                : 'wheelDeltaX' in t
                  ? -t.wheelDeltaX
                  : 0
            },
            deltaY: function (t) {
              return 'deltaY' in t
                ? t.deltaY
                : 'wheelDeltaY' in t
                  ? -t.wheelDeltaY
                  : 'wheelDelta' in t
                    ? -t.wheelDelta
                    : 0
            },
            deltaZ: 0,
            deltaMode: 0,
          }),
          Rn = on(Tn),
          Ln = [9, 13, 27, 32],
          An = u && 'CompositionEvent' in window,
          Nn = null
        u && 'documentMode' in document && (Nn = document.documentMode)
        var jn = u && 'TextEvent' in window && !Nn,
          zn = u && (!An || (Nn && 8 < Nn && 11 >= Nn)),
          Fn = String.fromCharCode(32),
          In = !1
        function Bn(t, e) {
          switch (t) {
            case 'keyup':
              return -1 !== Ln.indexOf(e.keyCode)
            case 'keydown':
              return 229 !== e.keyCode
            case 'keypress':
            case 'mousedown':
            case 'focusout':
              return !0
            default:
              return !1
          }
        }
        function Un(t) {
          return 'object' == typeof (t = t.detail) && 'data' in t ? t.data : null
        }
        var Wn = !1
        var Vn = {
          color: !0,
          date: !0,
          datetime: !0,
          'datetime-local': !0,
          email: !0,
          month: !0,
          number: !0,
          password: !0,
          range: !0,
          search: !0,
          tel: !0,
          text: !0,
          time: !0,
          url: !0,
          week: !0,
        }
        function Hn(t) {
          var e = t && t.nodeName && t.nodeName.toLowerCase()
          return 'input' === e ? !!Vn[t.type] : 'textarea' === e
        }
        function $n(t, e, n, r) {
          Ct(r),
            0 < (e = Yr(e, 'onChange')).length &&
              ((n = new un('onChange', 'change', null, n, r)),
              t.push({ event: n, listeners: e }))
        }
        var Yn = null,
          qn = null
        function Qn(t) {
          Fr(t, 0)
        }
        function Xn(t) {
          if (q(xi(t))) return t
        }
        function Kn(t, e) {
          if ('change' === t) return e
        }
        var Zn = !1
        if (u) {
          var Jn
          if (u) {
            var Gn = 'oninput' in document
            if (!Gn) {
              var tr = document.createElement('div')
              tr.setAttribute('oninput', 'return;'),
                (Gn = 'function' == typeof tr.oninput)
            }
            Jn = Gn
          } else Jn = !1
          Zn = Jn && (!document.documentMode || 9 < document.documentMode)
        }
        function er() {
          Yn && (Yn.detachEvent('onpropertychange', nr), (qn = Yn = null))
        }
        function nr(t) {
          if ('value' === t.propertyName && Xn(qn)) {
            var e = []
            $n(e, qn, t, wt(t)), Tt(Qn, e)
          }
        }
        function rr(t, e, n) {
          'focusin' === t
            ? (er(), (qn = n), (Yn = e).attachEvent('onpropertychange', nr))
            : 'focusout' === t && er()
        }
        function ir(t) {
          if ('selectionchange' === t || 'keyup' === t || 'keydown' === t)
            return Xn(qn)
        }
        function or(t, e) {
          if ('click' === t) return Xn(e)
        }
        function ar(t, e) {
          if ('input' === t || 'change' === t) return Xn(e)
        }
        var sr =
          'function' == typeof Object.is
            ? Object.is
            : function (t, e) {
                return (
                  (t === e && (0 !== t || 1 / t == 1 / e)) || (t != t && e != e)
                )
              }
        function lr(t, e) {
          if (sr(t, e)) return !0
          if (
            'object' != typeof t ||
            null === t ||
            'object' != typeof e ||
            null === e
          )
            return !1
          var n = Object.keys(t),
            r = Object.keys(e)
          if (n.length !== r.length) return !1
          for (r = 0; r < n.length; r++) {
            var i = n[r]
            if (!d.call(e, i) || !sr(t[i], e[i])) return !1
          }
          return !0
        }
        function cr(t) {
          for (; t && t.firstChild; ) t = t.firstChild
          return t
        }
        function ur(t, e) {
          var n,
            r = cr(t)
          for (t = 0; r; ) {
            if (3 === r.nodeType) {
              if (((n = t + r.textContent.length), t <= e && n >= e))
                return { node: r, offset: e - t }
              t = n
            }
            t: {
              for (; r; ) {
                if (r.nextSibling) {
                  r = r.nextSibling
                  break t
                }
                r = r.parentNode
              }
              r = void 0
            }
            r = cr(r)
          }
        }
        function dr(t, e) {
          return (
            !(!t || !e) &&
            (t === e ||
              ((!t || 3 !== t.nodeType) &&
                (e && 3 === e.nodeType
                  ? dr(t, e.parentNode)
                  : 'contains' in t
                    ? t.contains(e)
                    : !!t.compareDocumentPosition &&
                      !!(16 & t.compareDocumentPosition(e)))))
          )
        }
        function hr() {
          for (var t = window, e = Q(); e instanceof t.HTMLIFrameElement; ) {
            try {
              var n = 'string' == typeof e.contentWindow.location.href
            } catch (t) {
              n = !1
            }
            if (!n) break
            e = Q((t = e.contentWindow).document)
          }
          return e
        }
        function fr(t) {
          var e = t && t.nodeName && t.nodeName.toLowerCase()
          return (
            e &&
            (('input' === e &&
              ('text' === t.type ||
                'search' === t.type ||
                'tel' === t.type ||
                'url' === t.type ||
                'password' === t.type)) ||
              'textarea' === e ||
              'true' === t.contentEditable)
          )
        }
        function pr(t) {
          var e = hr(),
            n = t.focusedElem,
            r = t.selectionRange
          if (
            e !== n &&
            n &&
            n.ownerDocument &&
            dr(n.ownerDocument.documentElement, n)
          ) {
            if (null !== r && fr(n))
              if (
                ((e = r.start),
                void 0 === (t = r.end) && (t = e),
                'selectionStart' in n)
              )
                (n.selectionStart = e),
                  (n.selectionEnd = Math.min(t, n.value.length))
              else if (
                (t = ((e = n.ownerDocument || document) && e.defaultView) || window)
                  .getSelection
              ) {
                t = t.getSelection()
                var i = n.textContent.length,
                  o = Math.min(r.start, i)
                ;(r = void 0 === r.end ? o : Math.min(r.end, i)),
                  !t.extend && o > r && ((i = r), (r = o), (o = i)),
                  (i = ur(n, o))
                var a = ur(n, r)
                i &&
                  a &&
                  (1 !== t.rangeCount ||
                    t.anchorNode !== i.node ||
                    t.anchorOffset !== i.offset ||
                    t.focusNode !== a.node ||
                    t.focusOffset !== a.offset) &&
                  ((e = e.createRange()).setStart(i.node, i.offset),
                  t.removeAllRanges(),
                  o > r
                    ? (t.addRange(e), t.extend(a.node, a.offset))
                    : (e.setEnd(a.node, a.offset), t.addRange(e)))
              }
            for (e = [], t = n; (t = t.parentNode); )
              1 === t.nodeType &&
                e.push({ element: t, left: t.scrollLeft, top: t.scrollTop })
            for (
              'function' == typeof n.focus && n.focus(), n = 0;
              n < e.length;
              n++
            )
              ((t = e[n]).element.scrollLeft = t.left),
                (t.element.scrollTop = t.top)
          }
        }
        var gr = u && 'documentMode' in document && 11 >= document.documentMode,
          mr = null,
          br = null,
          yr = null,
          vr = !1
        function xr(t, e, n) {
          var r =
            n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument
          vr ||
            null == mr ||
            mr !== Q(r) ||
            ('selectionStart' in (r = mr) && fr(r)
              ? (r = { start: r.selectionStart, end: r.selectionEnd })
              : (r = {
                  anchorNode: (r = (
                    (r.ownerDocument && r.ownerDocument.defaultView) ||
                    window
                  ).getSelection()).anchorNode,
                  anchorOffset: r.anchorOffset,
                  focusNode: r.focusNode,
                  focusOffset: r.focusOffset,
                }),
            (yr && lr(yr, r)) ||
              ((yr = r),
              0 < (r = Yr(br, 'onSelect')).length &&
                ((e = new un('onSelect', 'select', null, e, n)),
                t.push({ event: e, listeners: r }),
                (e.target = mr))))
        }
        function wr(t, e) {
          var n = {}
          return (
            (n[t.toLowerCase()] = e.toLowerCase()),
            (n['Webkit' + t] = 'webkit' + e),
            (n['Moz' + t] = 'moz' + e),
            n
          )
        }
        var _r = {
            animationend: wr('Animation', 'AnimationEnd'),
            animationiteration: wr('Animation', 'AnimationIteration'),
            animationstart: wr('Animation', 'AnimationStart'),
            transitionend: wr('Transition', 'TransitionEnd'),
          },
          kr = {},
          Sr = {}
        function Er(t) {
          if (kr[t]) return kr[t]
          if (!_r[t]) return t
          var e,
            n = _r[t]
          for (e in n) if (n.hasOwnProperty(e) && e in Sr) return (kr[t] = n[e])
          return t
        }
        u &&
          ((Sr = document.createElement('div').style),
          'AnimationEvent' in window ||
            (delete _r.animationend.animation,
            delete _r.animationiteration.animation,
            delete _r.animationstart.animation),
          'TransitionEvent' in window || delete _r.transitionend.transition)
        var Cr = Er('animationend'),
          Mr = Er('animationiteration'),
          Pr = Er('animationstart'),
          Or = Er('transitionend'),
          Dr = new Map(),
          Tr =
            'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
              ' ',
            )
        function Rr(t, e) {
          Dr.set(t, e), l(e, [t])
        }
        for (var Lr = 0; Lr < Tr.length; Lr++) {
          var Ar = Tr[Lr]
          Rr(Ar.toLowerCase(), 'on' + (Ar[0].toUpperCase() + Ar.slice(1)))
        }
        Rr(Cr, 'onAnimationEnd'),
          Rr(Mr, 'onAnimationIteration'),
          Rr(Pr, 'onAnimationStart'),
          Rr('dblclick', 'onDoubleClick'),
          Rr('focusin', 'onFocus'),
          Rr('focusout', 'onBlur'),
          Rr(Or, 'onTransitionEnd'),
          c('onMouseEnter', ['mouseout', 'mouseover']),
          c('onMouseLeave', ['mouseout', 'mouseover']),
          c('onPointerEnter', ['pointerout', 'pointerover']),
          c('onPointerLeave', ['pointerout', 'pointerover']),
          l(
            'onChange',
            'change click focusin focusout input keydown keyup selectionchange'.split(
              ' ',
            ),
          ),
          l(
            'onSelect',
            'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
              ' ',
            ),
          ),
          l('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
          l(
            'onCompositionEnd',
            'compositionend focusout keydown keypress keyup mousedown'.split(' '),
          ),
          l(
            'onCompositionStart',
            'compositionstart focusout keydown keypress keyup mousedown'.split(' '),
          ),
          l(
            'onCompositionUpdate',
            'compositionupdate focusout keydown keypress keyup mousedown'.split(
              ' ',
            ),
          )
        var Nr =
            'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
              ' ',
            ),
          jr = new Set(
            'cancel close invalid load scroll toggle'.split(' ').concat(Nr),
          )
        function zr(t, e, n) {
          var r = t.type || 'unknown-event'
          ;(t.currentTarget = n),
            (function (t, e, n, r, i, a, s, l, c) {
              if ((Ut.apply(this, arguments), jt)) {
                if (!jt) throw Error(o(198))
                var u = zt
                ;(jt = !1), (zt = null), Ft || ((Ft = !0), (It = u))
              }
            })(r, e, void 0, t),
            (t.currentTarget = null)
        }
        function Fr(t, e) {
          e = 0 != (4 & e)
          for (var n = 0; n < t.length; n++) {
            var r = t[n],
              i = r.event
            r = r.listeners
            t: {
              var o = void 0
              if (e)
                for (var a = r.length - 1; 0 <= a; a--) {
                  var s = r[a],
                    l = s.instance,
                    c = s.currentTarget
                  if (((s = s.listener), l !== o && i.isPropagationStopped()))
                    break t
                  zr(i, s, c), (o = l)
                }
              else
                for (a = 0; a < r.length; a++) {
                  if (
                    ((l = (s = r[a]).instance),
                    (c = s.currentTarget),
                    (s = s.listener),
                    l !== o && i.isPropagationStopped())
                  )
                    break t
                  zr(i, s, c), (o = l)
                }
            }
          }
          if (Ft) throw ((t = It), (Ft = !1), (It = null), t)
        }
        function Ir(t, e) {
          var n = e[gi]
          void 0 === n && (n = e[gi] = new Set())
          var r = t + '__bubble'
          n.has(r) || (Vr(e, t, 2, !1), n.add(r))
        }
        function Br(t, e, n) {
          var r = 0
          e && (r |= 4), Vr(n, t, r, e)
        }
        var Ur = '_reactListening' + Math.random().toString(36).slice(2)
        function Wr(t) {
          if (!t[Ur]) {
            ;(t[Ur] = !0),
              a.forEach(function (e) {
                'selectionchange' !== e && (jr.has(e) || Br(e, !1, t), Br(e, !0, t))
              })
            var e = 9 === t.nodeType ? t : t.ownerDocument
            null === e || e[Ur] || ((e[Ur] = !0), Br('selectionchange', !1, e))
          }
        }
        function Vr(t, e, n, r) {
          switch (Ke(e)) {
            case 1:
              var i = $e
              break
            case 4:
              i = Ye
              break
            default:
              i = qe
          }
          ;(n = i.bind(null, e, n, t)),
            (i = void 0),
            !Lt ||
              ('touchstart' !== e && 'touchmove' !== e && 'wheel' !== e) ||
              (i = !0),
            r
              ? void 0 !== i
                ? t.addEventListener(e, n, { capture: !0, passive: i })
                : t.addEventListener(e, n, !0)
              : void 0 !== i
                ? t.addEventListener(e, n, { passive: i })
                : t.addEventListener(e, n, !1)
        }
        function Hr(t, e, n, r, i) {
          var o = r
          if (0 == (1 & e) && 0 == (2 & e) && null !== r)
            t: for (;;) {
              if (null === r) return
              var a = r.tag
              if (3 === a || 4 === a) {
                var s = r.stateNode.containerInfo
                if (s === i || (8 === s.nodeType && s.parentNode === i)) break
                if (4 === a)
                  for (a = r.return; null !== a; ) {
                    var l = a.tag
                    if (
                      (3 === l || 4 === l) &&
                      ((l = a.stateNode.containerInfo) === i ||
                        (8 === l.nodeType && l.parentNode === i))
                    )
                      return
                    a = a.return
                  }
                for (; null !== s; ) {
                  if (null === (a = yi(s))) return
                  if (5 === (l = a.tag) || 6 === l) {
                    r = o = a
                    continue t
                  }
                  s = s.parentNode
                }
              }
              r = r.return
            }
          Tt(function () {
            var r = o,
              i = wt(n),
              a = []
            t: {
              var s = Dr.get(t)
              if (void 0 !== s) {
                var l = un,
                  c = t
                switch (t) {
                  case 'keypress':
                    if (0 === en(n)) break t
                  case 'keydown':
                  case 'keyup':
                    l = Mn
                    break
                  case 'focusin':
                    ;(c = 'focus'), (l = mn)
                    break
                  case 'focusout':
                    ;(c = 'blur'), (l = mn)
                    break
                  case 'beforeblur':
                  case 'afterblur':
                    l = mn
                    break
                  case 'click':
                    if (2 === n.button) break t
                  case 'auxclick':
                  case 'dblclick':
                  case 'mousedown':
                  case 'mousemove':
                  case 'mouseup':
                  case 'mouseout':
                  case 'mouseover':
                  case 'contextmenu':
                    l = pn
                    break
                  case 'drag':
                  case 'dragend':
                  case 'dragenter':
                  case 'dragexit':
                  case 'dragleave':
                  case 'dragover':
                  case 'dragstart':
                  case 'drop':
                    l = gn
                    break
                  case 'touchcancel':
                  case 'touchend':
                  case 'touchmove':
                  case 'touchstart':
                    l = On
                    break
                  case Cr:
                  case Mr:
                  case Pr:
                    l = bn
                    break
                  case Or:
                    l = Dn
                    break
                  case 'scroll':
                    l = hn
                    break
                  case 'wheel':
                    l = Rn
                    break
                  case 'copy':
                  case 'cut':
                  case 'paste':
                    l = vn
                    break
                  case 'gotpointercapture':
                  case 'lostpointercapture':
                  case 'pointercancel':
                  case 'pointerdown':
                  case 'pointermove':
                  case 'pointerout':
                  case 'pointerover':
                  case 'pointerup':
                    l = Pn
                }
                var u = 0 != (4 & e),
                  d = !u && 'scroll' === t,
                  h = u ? (null !== s ? s + 'Capture' : null) : s
                u = []
                for (var f, p = r; null !== p; ) {
                  var g = (f = p).stateNode
                  if (
                    (5 === f.tag &&
                      null !== g &&
                      ((f = g),
                      null !== h && null != (g = Rt(p, h)) && u.push($r(p, g, f))),
                    d)
                  )
                    break
                  p = p.return
                }
                0 < u.length &&
                  ((s = new l(s, c, null, n, i)),
                  a.push({ event: s, listeners: u }))
              }
            }
            if (0 == (7 & e)) {
              if (
                ((l = 'mouseout' === t || 'pointerout' === t),
                (!(s = 'mouseover' === t || 'pointerover' === t) ||
                  n === xt ||
                  !(c = n.relatedTarget || n.fromElement) ||
                  (!yi(c) && !c[pi])) &&
                  (l || s) &&
                  ((s =
                    i.window === i
                      ? i
                      : (s = i.ownerDocument)
                        ? s.defaultView || s.parentWindow
                        : window),
                  l
                    ? ((l = r),
                      null !==
                        (c = (c = n.relatedTarget || n.toElement) ? yi(c) : null) &&
                        (c !== (d = Wt(c)) || (5 !== c.tag && 6 !== c.tag)) &&
                        (c = null))
                    : ((l = null), (c = r)),
                  l !== c))
              ) {
                if (
                  ((u = pn),
                  (g = 'onMouseLeave'),
                  (h = 'onMouseEnter'),
                  (p = 'mouse'),
                  ('pointerout' !== t && 'pointerover' !== t) ||
                    ((u = Pn),
                    (g = 'onPointerLeave'),
                    (h = 'onPointerEnter'),
                    (p = 'pointer')),
                  (d = null == l ? s : xi(l)),
                  (f = null == c ? s : xi(c)),
                  ((s = new u(g, p + 'leave', l, n, i)).target = d),
                  (s.relatedTarget = f),
                  (g = null),
                  yi(i) === r &&
                    (((u = new u(h, p + 'enter', c, n, i)).target = f),
                    (u.relatedTarget = d),
                    (g = u)),
                  (d = g),
                  l && c)
                )
                  t: {
                    for (h = c, p = 0, f = u = l; f; f = qr(f)) p++
                    for (f = 0, g = h; g; g = qr(g)) f++
                    for (; 0 < p - f; ) (u = qr(u)), p--
                    for (; 0 < f - p; ) (h = qr(h)), f--
                    for (; p--; ) {
                      if (u === h || (null !== h && u === h.alternate)) break t
                      ;(u = qr(u)), (h = qr(h))
                    }
                    u = null
                  }
                else u = null
                null !== l && Qr(a, s, l, u, !1),
                  null !== c && null !== d && Qr(a, d, c, u, !0)
              }
              if (
                'select' ===
                  (l =
                    (s = r ? xi(r) : window).nodeName &&
                    s.nodeName.toLowerCase()) ||
                ('input' === l && 'file' === s.type)
              )
                var m = Kn
              else if (Hn(s))
                if (Zn) m = ar
                else {
                  m = ir
                  var b = rr
                }
              else
                (l = s.nodeName) &&
                  'input' === l.toLowerCase() &&
                  ('checkbox' === s.type || 'radio' === s.type) &&
                  (m = or)
              switch (
                (m && (m = m(t, r))
                  ? $n(a, m, n, i)
                  : (b && b(t, s, r),
                    'focusout' === t &&
                      (b = s._wrapperState) &&
                      b.controlled &&
                      'number' === s.type &&
                      tt(s, 'number', s.value)),
                (b = r ? xi(r) : window),
                t)
              ) {
                case 'focusin':
                  ;(Hn(b) || 'true' === b.contentEditable) &&
                    ((mr = b), (br = r), (yr = null))
                  break
                case 'focusout':
                  yr = br = mr = null
                  break
                case 'mousedown':
                  vr = !0
                  break
                case 'contextmenu':
                case 'mouseup':
                case 'dragend':
                  ;(vr = !1), xr(a, n, i)
                  break
                case 'selectionchange':
                  if (gr) break
                case 'keydown':
                case 'keyup':
                  xr(a, n, i)
              }
              var y
              if (An)
                t: {
                  switch (t) {
                    case 'compositionstart':
                      var v = 'onCompositionStart'
                      break t
                    case 'compositionend':
                      v = 'onCompositionEnd'
                      break t
                    case 'compositionupdate':
                      v = 'onCompositionUpdate'
                      break t
                  }
                  v = void 0
                }
              else
                Wn
                  ? Bn(t, n) && (v = 'onCompositionEnd')
                  : 'keydown' === t &&
                    229 === n.keyCode &&
                    (v = 'onCompositionStart')
              v &&
                (zn &&
                  'ko' !== n.locale &&
                  (Wn || 'onCompositionStart' !== v
                    ? 'onCompositionEnd' === v && Wn && (y = tn())
                    : ((Je = 'value' in (Ze = i) ? Ze.value : Ze.textContent),
                      (Wn = !0))),
                0 < (b = Yr(r, v)).length &&
                  ((v = new xn(v, t, null, n, i)),
                  a.push({ event: v, listeners: b }),
                  y ? (v.data = y) : null !== (y = Un(n)) && (v.data = y))),
                (y = jn
                  ? (function (t, e) {
                      switch (t) {
                        case 'compositionend':
                          return Un(e)
                        case 'keypress':
                          return 32 !== e.which ? null : ((In = !0), Fn)
                        case 'textInput':
                          return (t = e.data) === Fn && In ? null : t
                        default:
                          return null
                      }
                    })(t, n)
                  : (function (t, e) {
                      if (Wn)
                        return 'compositionend' === t || (!An && Bn(t, e))
                          ? ((t = tn()), (Ge = Je = Ze = null), (Wn = !1), t)
                          : null
                      switch (t) {
                        case 'paste':
                        default:
                          return null
                        case 'keypress':
                          if (
                            !(e.ctrlKey || e.altKey || e.metaKey) ||
                            (e.ctrlKey && e.altKey)
                          ) {
                            if (e.char && 1 < e.char.length) return e.char
                            if (e.which) return String.fromCharCode(e.which)
                          }
                          return null
                        case 'compositionend':
                          return zn && 'ko' !== e.locale ? null : e.data
                      }
                    })(t, n)) &&
                  0 < (r = Yr(r, 'onBeforeInput')).length &&
                  ((i = new xn('onBeforeInput', 'beforeinput', null, n, i)),
                  a.push({ event: i, listeners: r }),
                  (i.data = y))
            }
            Fr(a, e)
          })
        }
        function $r(t, e, n) {
          return { instance: t, listener: e, currentTarget: n }
        }
        function Yr(t, e) {
          for (var n = e + 'Capture', r = []; null !== t; ) {
            var i = t,
              o = i.stateNode
            5 === i.tag &&
              null !== o &&
              ((i = o),
              null != (o = Rt(t, n)) && r.unshift($r(t, o, i)),
              null != (o = Rt(t, e)) && r.push($r(t, o, i))),
              (t = t.return)
          }
          return r
        }
        function qr(t) {
          if (null === t) return null
          do {
            t = t.return
          } while (t && 5 !== t.tag)
          return t || null
        }
        function Qr(t, e, n, r, i) {
          for (var o = e._reactName, a = []; null !== n && n !== r; ) {
            var s = n,
              l = s.alternate,
              c = s.stateNode
            if (null !== l && l === r) break
            5 === s.tag &&
              null !== c &&
              ((s = c),
              i
                ? null != (l = Rt(n, o)) && a.unshift($r(n, l, s))
                : i || (null != (l = Rt(n, o)) && a.push($r(n, l, s)))),
              (n = n.return)
          }
          0 !== a.length && t.push({ event: e, listeners: a })
        }
        var Xr = /\r\n?/g,
          Kr = /\u0000|\uFFFD/g
        function Zr(t) {
          return ('string' == typeof t ? t : '' + t)
            .replace(Xr, '\n')
            .replace(Kr, '')
        }
        function Jr(t, e, n) {
          if (((e = Zr(e)), Zr(t) !== e && n)) throw Error(o(425))
        }
        function Gr() {}
        var ti = null,
          ei = null
        function ni(t, e) {
          return (
            'textarea' === t ||
            'noscript' === t ||
            'string' == typeof e.children ||
            'number' == typeof e.children ||
            ('object' == typeof e.dangerouslySetInnerHTML &&
              null !== e.dangerouslySetInnerHTML &&
              null != e.dangerouslySetInnerHTML.__html)
          )
        }
        var ri = 'function' == typeof setTimeout ? setTimeout : void 0,
          ii = 'function' == typeof clearTimeout ? clearTimeout : void 0,
          oi = 'function' == typeof Promise ? Promise : void 0,
          ai =
            'function' == typeof queueMicrotask
              ? queueMicrotask
              : void 0 !== oi
                ? function (t) {
                    return oi.resolve(null).then(t).catch(si)
                  }
                : ri
        function si(t) {
          setTimeout(function () {
            throw t
          })
        }
        function li(t, e) {
          var n = e,
            r = 0
          do {
            var i = n.nextSibling
            if ((t.removeChild(n), i && 8 === i.nodeType))
              if ('/$' === (n = i.data)) {
                if (0 === r) return t.removeChild(i), void We(e)
                r--
              } else ('$' !== n && '$?' !== n && '$!' !== n) || r++
            n = i
          } while (n)
          We(e)
        }
        function ci(t) {
          for (; null != t; t = t.nextSibling) {
            var e = t.nodeType
            if (1 === e || 3 === e) break
            if (8 === e) {
              if ('$' === (e = t.data) || '$!' === e || '$?' === e) break
              if ('/$' === e) return null
            }
          }
          return t
        }
        function ui(t) {
          t = t.previousSibling
          for (var e = 0; t; ) {
            if (8 === t.nodeType) {
              var n = t.data
              if ('$' === n || '$!' === n || '$?' === n) {
                if (0 === e) return t
                e--
              } else '/$' === n && e++
            }
            t = t.previousSibling
          }
          return null
        }
        var di = Math.random().toString(36).slice(2),
          hi = '__reactFiber$' + di,
          fi = '__reactProps$' + di,
          pi = '__reactContainer$' + di,
          gi = '__reactEvents$' + di,
          mi = '__reactListeners$' + di,
          bi = '__reactHandles$' + di
        function yi(t) {
          var e = t[hi]
          if (e) return e
          for (var n = t.parentNode; n; ) {
            if ((e = n[pi] || n[hi])) {
              if (
                ((n = e.alternate),
                null !== e.child || (null !== n && null !== n.child))
              )
                for (t = ui(t); null !== t; ) {
                  if ((n = t[hi])) return n
                  t = ui(t)
                }
              return e
            }
            n = (t = n).parentNode
          }
          return null
        }
        function vi(t) {
          return !(t = t[hi] || t[pi]) ||
            (5 !== t.tag && 6 !== t.tag && 13 !== t.tag && 3 !== t.tag)
            ? null
            : t
        }
        function xi(t) {
          if (5 === t.tag || 6 === t.tag) return t.stateNode
          throw Error(o(33))
        }
        function wi(t) {
          return t[fi] || null
        }
        var _i = [],
          ki = -1
        function Si(t) {
          return { current: t }
        }
        function Ei(t) {
          0 > ki || ((t.current = _i[ki]), (_i[ki] = null), ki--)
        }
        function Ci(t, e) {
          ki++, (_i[ki] = t.current), (t.current = e)
        }
        var Mi = {},
          Pi = Si(Mi),
          Oi = Si(!1),
          Di = Mi
        function Ti(t, e) {
          var n = t.type.contextTypes
          if (!n) return Mi
          var r = t.stateNode
          if (r && r.__reactInternalMemoizedUnmaskedChildContext === e)
            return r.__reactInternalMemoizedMaskedChildContext
          var i,
            o = {}
          for (i in n) o[i] = e[i]
          return (
            r &&
              (((t = t.stateNode).__reactInternalMemoizedUnmaskedChildContext = e),
              (t.__reactInternalMemoizedMaskedChildContext = o)),
            o
          )
        }
        function Ri(t) {
          return null != (t = t.childContextTypes)
        }
        function Li() {
          Ei(Oi), Ei(Pi)
        }
        function Ai(t, e, n) {
          if (Pi.current !== Mi) throw Error(o(168))
          Ci(Pi, e), Ci(Oi, n)
        }
        function Ni(t, e, n) {
          var r = t.stateNode
          if (((e = e.childContextTypes), 'function' != typeof r.getChildContext))
            return n
          for (var i in (r = r.getChildContext()))
            if (!(i in e)) throw Error(o(108, V(t) || 'Unknown', i))
          return z({}, n, r)
        }
        function ji(t) {
          return (
            (t =
              ((t = t.stateNode) && t.__reactInternalMemoizedMergedChildContext) ||
              Mi),
            (Di = Pi.current),
            Ci(Pi, t),
            Ci(Oi, Oi.current),
            !0
          )
        }
        function zi(t, e, n) {
          var r = t.stateNode
          if (!r) throw Error(o(169))
          n
            ? ((t = Ni(t, e, Di)),
              (r.__reactInternalMemoizedMergedChildContext = t),
              Ei(Oi),
              Ei(Pi),
              Ci(Pi, t))
            : Ei(Oi),
            Ci(Oi, n)
        }
        var Fi = null,
          Ii = !1,
          Bi = !1
        function Ui(t) {
          null === Fi ? (Fi = [t]) : Fi.push(t)
        }
        function Wi() {
          if (!Bi && null !== Fi) {
            Bi = !0
            var t = 0,
              e = ve
            try {
              var n = Fi
              for (ve = 1; t < n.length; t++) {
                var r = n[t]
                do {
                  r = r(!0)
                } while (null !== r)
              }
              ;(Fi = null), (Ii = !1)
            } catch (e) {
              throw (null !== Fi && (Fi = Fi.slice(t + 1)), qt(Gt, Wi), e)
            } finally {
              ;(ve = e), (Bi = !1)
            }
          }
          return null
        }
        var Vi = [],
          Hi = 0,
          $i = null,
          Yi = 0,
          qi = [],
          Qi = 0,
          Xi = null,
          Ki = 1,
          Zi = ''
        function Ji(t, e) {
          ;(Vi[Hi++] = Yi), (Vi[Hi++] = $i), ($i = t), (Yi = e)
        }
        function Gi(t, e, n) {
          ;(qi[Qi++] = Ki), (qi[Qi++] = Zi), (qi[Qi++] = Xi), (Xi = t)
          var r = Ki
          t = Zi
          var i = 32 - ae(r) - 1
          ;(r &= ~(1 << i)), (n += 1)
          var o = 32 - ae(e) + i
          if (30 < o) {
            var a = i - (i % 5)
            ;(o = (r & ((1 << a) - 1)).toString(32)),
              (r >>= a),
              (i -= a),
              (Ki = (1 << (32 - ae(e) + i)) | (n << i) | r),
              (Zi = o + t)
          } else (Ki = (1 << o) | (n << i) | r), (Zi = t)
        }
        function to(t) {
          null !== t.return && (Ji(t, 1), Gi(t, 1, 0))
        }
        function eo(t) {
          for (; t === $i; )
            ($i = Vi[--Hi]), (Vi[Hi] = null), (Yi = Vi[--Hi]), (Vi[Hi] = null)
          for (; t === Xi; )
            (Xi = qi[--Qi]),
              (qi[Qi] = null),
              (Zi = qi[--Qi]),
              (qi[Qi] = null),
              (Ki = qi[--Qi]),
              (qi[Qi] = null)
        }
        var no = null,
          ro = null,
          io = !1,
          oo = null
        function ao(t, e) {
          var n = Rc(5, null, null, 0)
          ;(n.elementType = 'DELETED'),
            (n.stateNode = e),
            (n.return = t),
            null === (e = t.deletions)
              ? ((t.deletions = [n]), (t.flags |= 16))
              : e.push(n)
        }
        function so(t, e) {
          switch (t.tag) {
            case 5:
              var n = t.type
              return (
                null !==
                  (e =
                    1 !== e.nodeType || n.toLowerCase() !== e.nodeName.toLowerCase()
                      ? null
                      : e) &&
                ((t.stateNode = e), (no = t), (ro = ci(e.firstChild)), !0)
              )
            case 6:
              return (
                null !==
                  (e = '' === t.pendingProps || 3 !== e.nodeType ? null : e) &&
                ((t.stateNode = e), (no = t), (ro = null), !0)
              )
            case 13:
              return (
                null !== (e = 8 !== e.nodeType ? null : e) &&
                ((n = null !== Xi ? { id: Ki, overflow: Zi } : null),
                (t.memoizedState = {
                  dehydrated: e,
                  treeContext: n,
                  retryLane: 1073741824,
                }),
                ((n = Rc(18, null, null, 0)).stateNode = e),
                (n.return = t),
                (t.child = n),
                (no = t),
                (ro = null),
                !0)
              )
            default:
              return !1
          }
        }
        function lo(t) {
          return 0 != (1 & t.mode) && 0 == (128 & t.flags)
        }
        function co(t) {
          if (io) {
            var e = ro
            if (e) {
              var n = e
              if (!so(t, e)) {
                if (lo(t)) throw Error(o(418))
                e = ci(n.nextSibling)
                var r = no
                e && so(t, e)
                  ? ao(r, n)
                  : ((t.flags = (-4097 & t.flags) | 2), (io = !1), (no = t))
              }
            } else {
              if (lo(t)) throw Error(o(418))
              ;(t.flags = (-4097 & t.flags) | 2), (io = !1), (no = t)
            }
          }
        }
        function uo(t) {
          for (
            t = t.return;
            null !== t && 5 !== t.tag && 3 !== t.tag && 13 !== t.tag;

          )
            t = t.return
          no = t
        }
        function ho(t) {
          if (t !== no) return !1
          if (!io) return uo(t), (io = !0), !1
          var e
          if (
            ((e = 3 !== t.tag) &&
              !(e = 5 !== t.tag) &&
              (e =
                'head' !== (e = t.type) &&
                'body' !== e &&
                !ni(t.type, t.memoizedProps)),
            e && (e = ro))
          ) {
            if (lo(t)) throw (fo(), Error(o(418)))
            for (; e; ) ao(t, e), (e = ci(e.nextSibling))
          }
          if ((uo(t), 13 === t.tag)) {
            if (!(t = null !== (t = t.memoizedState) ? t.dehydrated : null))
              throw Error(o(317))
            t: {
              for (t = t.nextSibling, e = 0; t; ) {
                if (8 === t.nodeType) {
                  var n = t.data
                  if ('/$' === n) {
                    if (0 === e) {
                      ro = ci(t.nextSibling)
                      break t
                    }
                    e--
                  } else ('$' !== n && '$!' !== n && '$?' !== n) || e++
                }
                t = t.nextSibling
              }
              ro = null
            }
          } else ro = no ? ci(t.stateNode.nextSibling) : null
          return !0
        }
        function fo() {
          for (var t = ro; t; ) t = ci(t.nextSibling)
        }
        function po() {
          ;(ro = no = null), (io = !1)
        }
        function go(t) {
          null === oo ? (oo = [t]) : oo.push(t)
        }
        var mo = x.ReactCurrentBatchConfig
        function bo(t, e) {
          if (t && t.defaultProps) {
            for (var n in ((e = z({}, e)), (t = t.defaultProps)))
              void 0 === e[n] && (e[n] = t[n])
            return e
          }
          return e
        }
        var yo = Si(null),
          vo = null,
          xo = null,
          wo = null
        function _o() {
          wo = xo = vo = null
        }
        function ko(t) {
          var e = yo.current
          Ei(yo), (t._currentValue = e)
        }
        function So(t, e, n) {
          for (; null !== t; ) {
            var r = t.alternate
            if (
              ((t.childLanes & e) !== e
                ? ((t.childLanes |= e), null !== r && (r.childLanes |= e))
                : null !== r && (r.childLanes & e) !== e && (r.childLanes |= e),
              t === n)
            )
              break
            t = t.return
          }
        }
        function Eo(t, e) {
          ;(vo = t),
            (wo = xo = null),
            null !== (t = t.dependencies) &&
              null !== t.firstContext &&
              (0 != (t.lanes & e) && (xs = !0), (t.firstContext = null))
        }
        function Co(t) {
          var e = t._currentValue
          if (wo !== t)
            if (((t = { context: t, memoizedValue: e, next: null }), null === xo)) {
              if (null === vo) throw Error(o(308))
              ;(xo = t), (vo.dependencies = { lanes: 0, firstContext: t })
            } else xo = xo.next = t
          return e
        }
        var Mo = null
        function Po(t) {
          null === Mo ? (Mo = [t]) : Mo.push(t)
        }
        function Oo(t, e, n, r) {
          var i = e.interleaved
          return (
            null === i ? ((n.next = n), Po(e)) : ((n.next = i.next), (i.next = n)),
            (e.interleaved = n),
            Do(t, r)
          )
        }
        function Do(t, e) {
          t.lanes |= e
          var n = t.alternate
          for (null !== n && (n.lanes |= e), n = t, t = t.return; null !== t; )
            (t.childLanes |= e),
              null !== (n = t.alternate) && (n.childLanes |= e),
              (n = t),
              (t = t.return)
          return 3 === n.tag ? n.stateNode : null
        }
        var To = !1
        function Ro(t) {
          t.updateQueue = {
            baseState: t.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: { pending: null, interleaved: null, lanes: 0 },
            effects: null,
          }
        }
        function Lo(t, e) {
          ;(t = t.updateQueue),
            e.updateQueue === t &&
              (e.updateQueue = {
                baseState: t.baseState,
                firstBaseUpdate: t.firstBaseUpdate,
                lastBaseUpdate: t.lastBaseUpdate,
                shared: t.shared,
                effects: t.effects,
              })
        }
        function Ao(t, e) {
          return {
            eventTime: t,
            lane: e,
            tag: 0,
            payload: null,
            callback: null,
            next: null,
          }
        }
        function No(t, e, n) {
          var r = t.updateQueue
          if (null === r) return null
          if (((r = r.shared), 0 != (2 & Ol))) {
            var i = r.pending
            return (
              null === i ? (e.next = e) : ((e.next = i.next), (i.next = e)),
              (r.pending = e),
              Do(t, n)
            )
          }
          return (
            null === (i = r.interleaved)
              ? ((e.next = e), Po(r))
              : ((e.next = i.next), (i.next = e)),
            (r.interleaved = e),
            Do(t, n)
          )
        }
        function jo(t, e, n) {
          if (
            null !== (e = e.updateQueue) &&
            ((e = e.shared), 0 != (4194240 & n))
          ) {
            var r = e.lanes
            ;(n |= r &= t.pendingLanes), (e.lanes = n), ye(t, n)
          }
        }
        function zo(t, e) {
          var n = t.updateQueue,
            r = t.alternate
          if (null !== r && n === (r = r.updateQueue)) {
            var i = null,
              o = null
            if (null !== (n = n.firstBaseUpdate)) {
              do {
                var a = {
                  eventTime: n.eventTime,
                  lane: n.lane,
                  tag: n.tag,
                  payload: n.payload,
                  callback: n.callback,
                  next: null,
                }
                null === o ? (i = o = a) : (o = o.next = a), (n = n.next)
              } while (null !== n)
              null === o ? (i = o = e) : (o = o.next = e)
            } else i = o = e
            return (
              (n = {
                baseState: r.baseState,
                firstBaseUpdate: i,
                lastBaseUpdate: o,
                shared: r.shared,
                effects: r.effects,
              }),
              void (t.updateQueue = n)
            )
          }
          null === (t = n.lastBaseUpdate) ? (n.firstBaseUpdate = e) : (t.next = e),
            (n.lastBaseUpdate = e)
        }
        function Fo(t, e, n, r) {
          var i = t.updateQueue
          To = !1
          var o = i.firstBaseUpdate,
            a = i.lastBaseUpdate,
            s = i.shared.pending
          if (null !== s) {
            i.shared.pending = null
            var l = s,
              c = l.next
            ;(l.next = null), null === a ? (o = c) : (a.next = c), (a = l)
            var u = t.alternate
            null !== u &&
              (s = (u = u.updateQueue).lastBaseUpdate) !== a &&
              (null === s ? (u.firstBaseUpdate = c) : (s.next = c),
              (u.lastBaseUpdate = l))
          }
          if (null !== o) {
            var d = i.baseState
            for (a = 0, u = c = l = null, s = o; ; ) {
              var h = s.lane,
                f = s.eventTime
              if ((r & h) === h) {
                null !== u &&
                  (u = u.next =
                    {
                      eventTime: f,
                      lane: 0,
                      tag: s.tag,
                      payload: s.payload,
                      callback: s.callback,
                      next: null,
                    })
                t: {
                  var p = t,
                    g = s
                  switch (((h = e), (f = n), g.tag)) {
                    case 1:
                      if ('function' == typeof (p = g.payload)) {
                        d = p.call(f, d, h)
                        break t
                      }
                      d = p
                      break t
                    case 3:
                      p.flags = (-65537 & p.flags) | 128
                    case 0:
                      if (
                        null ==
                        (h =
                          'function' == typeof (p = g.payload)
                            ? p.call(f, d, h)
                            : p)
                      )
                        break t
                      d = z({}, d, h)
                      break t
                    case 2:
                      To = !0
                  }
                }
                null !== s.callback &&
                  0 !== s.lane &&
                  ((t.flags |= 64),
                  null === (h = i.effects) ? (i.effects = [s]) : h.push(s))
              } else
                (f = {
                  eventTime: f,
                  lane: h,
                  tag: s.tag,
                  payload: s.payload,
                  callback: s.callback,
                  next: null,
                }),
                  null === u ? ((c = u = f), (l = d)) : (u = u.next = f),
                  (a |= h)
              if (null === (s = s.next)) {
                if (null === (s = i.shared.pending)) break
                ;(s = (h = s).next),
                  (h.next = null),
                  (i.lastBaseUpdate = h),
                  (i.shared.pending = null)
              }
            }
            if (
              (null === u && (l = d),
              (i.baseState = l),
              (i.firstBaseUpdate = c),
              (i.lastBaseUpdate = u),
              null !== (e = i.shared.interleaved))
            ) {
              i = e
              do {
                ;(a |= i.lane), (i = i.next)
              } while (i !== e)
            } else null === o && (i.shared.lanes = 0)
            ;(zl |= a), (t.lanes = a), (t.memoizedState = d)
          }
        }
        function Io(t, e, n) {
          if (((t = e.effects), (e.effects = null), null !== t))
            for (e = 0; e < t.length; e++) {
              var r = t[e],
                i = r.callback
              if (null !== i) {
                if (((r.callback = null), (r = n), 'function' != typeof i))
                  throw Error(o(191, i))
                i.call(r)
              }
            }
        }
        var Bo = new r.Component().refs
        function Uo(t, e, n, r) {
          ;(n = null == (n = n(r, (e = t.memoizedState))) ? e : z({}, e, n)),
            (t.memoizedState = n),
            0 === t.lanes && (t.updateQueue.baseState = n)
        }
        var Wo = {
          isMounted: function (t) {
            return !!(t = t._reactInternals) && Wt(t) === t
          },
          enqueueSetState: function (t, e, n) {
            t = t._reactInternals
            var r = ec(),
              i = nc(t),
              o = Ao(r, i)
            ;(o.payload = e),
              null != n && (o.callback = n),
              null !== (e = No(t, o, i)) && (rc(e, t, i, r), jo(e, t, i))
          },
          enqueueReplaceState: function (t, e, n) {
            t = t._reactInternals
            var r = ec(),
              i = nc(t),
              o = Ao(r, i)
            ;(o.tag = 1),
              (o.payload = e),
              null != n && (o.callback = n),
              null !== (e = No(t, o, i)) && (rc(e, t, i, r), jo(e, t, i))
          },
          enqueueForceUpdate: function (t, e) {
            t = t._reactInternals
            var n = ec(),
              r = nc(t),
              i = Ao(n, r)
            ;(i.tag = 2),
              null != e && (i.callback = e),
              null !== (e = No(t, i, r)) && (rc(e, t, r, n), jo(e, t, r))
          },
        }
        function Vo(t, e, n, r, i, o, a) {
          return 'function' == typeof (t = t.stateNode).shouldComponentUpdate
            ? t.shouldComponentUpdate(r, o, a)
            : !e.prototype ||
                !e.prototype.isPureReactComponent ||
                !lr(n, r) ||
                !lr(i, o)
        }
        function Ho(t, e, n) {
          var r = !1,
            i = Mi,
            o = e.contextType
          return (
            'object' == typeof o && null !== o
              ? (o = Co(o))
              : ((i = Ri(e) ? Di : Pi.current),
                (o = (r = null != (r = e.contextTypes)) ? Ti(t, i) : Mi)),
            (e = new e(n, o)),
            (t.memoizedState =
              null !== e.state && void 0 !== e.state ? e.state : null),
            (e.updater = Wo),
            (t.stateNode = e),
            (e._reactInternals = t),
            r &&
              (((t = t.stateNode).__reactInternalMemoizedUnmaskedChildContext = i),
              (t.__reactInternalMemoizedMaskedChildContext = o)),
            e
          )
        }
        function $o(t, e, n, r) {
          ;(t = e.state),
            'function' == typeof e.componentWillReceiveProps &&
              e.componentWillReceiveProps(n, r),
            'function' == typeof e.UNSAFE_componentWillReceiveProps &&
              e.UNSAFE_componentWillReceiveProps(n, r),
            e.state !== t && Wo.enqueueReplaceState(e, e.state, null)
        }
        function Yo(t, e, n, r) {
          var i = t.stateNode
          ;(i.props = n), (i.state = t.memoizedState), (i.refs = Bo), Ro(t)
          var o = e.contextType
          'object' == typeof o && null !== o
            ? (i.context = Co(o))
            : ((o = Ri(e) ? Di : Pi.current), (i.context = Ti(t, o))),
            (i.state = t.memoizedState),
            'function' == typeof (o = e.getDerivedStateFromProps) &&
              (Uo(t, e, o, n), (i.state = t.memoizedState)),
            'function' == typeof e.getDerivedStateFromProps ||
              'function' == typeof i.getSnapshotBeforeUpdate ||
              ('function' != typeof i.UNSAFE_componentWillMount &&
                'function' != typeof i.componentWillMount) ||
              ((e = i.state),
              'function' == typeof i.componentWillMount && i.componentWillMount(),
              'function' == typeof i.UNSAFE_componentWillMount &&
                i.UNSAFE_componentWillMount(),
              e !== i.state && Wo.enqueueReplaceState(i, i.state, null),
              Fo(t, n, i, r),
              (i.state = t.memoizedState)),
            'function' == typeof i.componentDidMount && (t.flags |= 4194308)
        }
        function qo(t, e, n) {
          if (
            null !== (t = n.ref) &&
            'function' != typeof t &&
            'object' != typeof t
          ) {
            if (n._owner) {
              if ((n = n._owner)) {
                if (1 !== n.tag) throw Error(o(309))
                var r = n.stateNode
              }
              if (!r) throw Error(o(147, t))
              var i = r,
                a = '' + t
              return null !== e &&
                null !== e.ref &&
                'function' == typeof e.ref &&
                e.ref._stringRef === a
                ? e.ref
                : ((e = function (t) {
                    var e = i.refs
                    e === Bo && (e = i.refs = {}),
                      null === t ? delete e[a] : (e[a] = t)
                  }),
                  (e._stringRef = a),
                  e)
            }
            if ('string' != typeof t) throw Error(o(284))
            if (!n._owner) throw Error(o(290, t))
          }
          return t
        }
        function Qo(t, e) {
          throw (
            ((t = Object.prototype.toString.call(e)),
            Error(
              o(
                31,
                '[object Object]' === t
                  ? 'object with keys {' + Object.keys(e).join(', ') + '}'
                  : t,
              ),
            ))
          )
        }
        function Xo(t) {
          return (0, t._init)(t._payload)
        }
        function Ko(t) {
          function e(e, n) {
            if (t) {
              var r = e.deletions
              null === r ? ((e.deletions = [n]), (e.flags |= 16)) : r.push(n)
            }
          }
          function n(n, r) {
            if (!t) return null
            for (; null !== r; ) e(n, r), (r = r.sibling)
            return null
          }
          function r(t, e) {
            for (t = new Map(); null !== e; )
              null !== e.key ? t.set(e.key, e) : t.set(e.index, e), (e = e.sibling)
            return t
          }
          function i(t, e) {
            return ((t = Ac(t, e)).index = 0), (t.sibling = null), t
          }
          function a(e, n, r) {
            return (
              (e.index = r),
              t
                ? null !== (r = e.alternate)
                  ? (r = r.index) < n
                    ? ((e.flags |= 2), n)
                    : r
                  : ((e.flags |= 2), n)
                : ((e.flags |= 1048576), n)
            )
          }
          function s(e) {
            return t && null === e.alternate && (e.flags |= 2), e
          }
          function l(t, e, n, r) {
            return null === e || 6 !== e.tag
              ? (((e = Fc(n, t.mode, r)).return = t), e)
              : (((e = i(e, n)).return = t), e)
          }
          function c(t, e, n, r) {
            var o = n.type
            return o === k
              ? d(t, e, n.props.children, r, n.key)
              : null !== e &&
                  (e.elementType === o ||
                    ('object' == typeof o &&
                      null !== o &&
                      o.$$typeof === R &&
                      Xo(o) === e.type))
                ? (((r = i(e, n.props)).ref = qo(t, e, n)), (r.return = t), r)
                : (((r = Nc(n.type, n.key, n.props, null, t.mode, r)).ref = qo(
                    t,
                    e,
                    n,
                  )),
                  (r.return = t),
                  r)
          }
          function u(t, e, n, r) {
            return null === e ||
              4 !== e.tag ||
              e.stateNode.containerInfo !== n.containerInfo ||
              e.stateNode.implementation !== n.implementation
              ? (((e = Ic(n, t.mode, r)).return = t), e)
              : (((e = i(e, n.children || [])).return = t), e)
          }
          function d(t, e, n, r, o) {
            return null === e || 7 !== e.tag
              ? (((e = jc(n, t.mode, r, o)).return = t), e)
              : (((e = i(e, n)).return = t), e)
          }
          function h(t, e, n) {
            if (('string' == typeof e && '' !== e) || 'number' == typeof e)
              return ((e = Fc('' + e, t.mode, n)).return = t), e
            if ('object' == typeof e && null !== e) {
              switch (e.$$typeof) {
                case w:
                  return (
                    ((n = Nc(e.type, e.key, e.props, null, t.mode, n)).ref = qo(
                      t,
                      null,
                      e,
                    )),
                    (n.return = t),
                    n
                  )
                case _:
                  return ((e = Ic(e, t.mode, n)).return = t), e
                case R:
                  return h(t, (0, e._init)(e._payload), n)
              }
              if (et(e) || N(e)) return ((e = jc(e, t.mode, n, null)).return = t), e
              Qo(t, e)
            }
            return null
          }
          function f(t, e, n, r) {
            var i = null !== e ? e.key : null
            if (('string' == typeof n && '' !== n) || 'number' == typeof n)
              return null !== i ? null : l(t, e, '' + n, r)
            if ('object' == typeof n && null !== n) {
              switch (n.$$typeof) {
                case w:
                  return n.key === i ? c(t, e, n, r) : null
                case _:
                  return n.key === i ? u(t, e, n, r) : null
                case R:
                  return f(t, e, (i = n._init)(n._payload), r)
              }
              if (et(n) || N(n)) return null !== i ? null : d(t, e, n, r, null)
              Qo(t, n)
            }
            return null
          }
          function p(t, e, n, r, i) {
            if (('string' == typeof r && '' !== r) || 'number' == typeof r)
              return l(e, (t = t.get(n) || null), '' + r, i)
            if ('object' == typeof r && null !== r) {
              switch (r.$$typeof) {
                case w:
                  return c(e, (t = t.get(null === r.key ? n : r.key) || null), r, i)
                case _:
                  return u(e, (t = t.get(null === r.key ? n : r.key) || null), r, i)
                case R:
                  return p(t, e, n, (0, r._init)(r._payload), i)
              }
              if (et(r) || N(r)) return d(e, (t = t.get(n) || null), r, i, null)
              Qo(e, r)
            }
            return null
          }
          function g(i, o, s, l) {
            for (
              var c = null, u = null, d = o, g = (o = 0), m = null;
              null !== d && g < s.length;
              g++
            ) {
              d.index > g ? ((m = d), (d = null)) : (m = d.sibling)
              var b = f(i, d, s[g], l)
              if (null === b) {
                null === d && (d = m)
                break
              }
              t && d && null === b.alternate && e(i, d),
                (o = a(b, o, g)),
                null === u ? (c = b) : (u.sibling = b),
                (u = b),
                (d = m)
            }
            if (g === s.length) return n(i, d), io && Ji(i, g), c
            if (null === d) {
              for (; g < s.length; g++)
                null !== (d = h(i, s[g], l)) &&
                  ((o = a(d, o, g)),
                  null === u ? (c = d) : (u.sibling = d),
                  (u = d))
              return io && Ji(i, g), c
            }
            for (d = r(i, d); g < s.length; g++)
              null !== (m = p(d, i, g, s[g], l)) &&
                (t && null !== m.alternate && d.delete(null === m.key ? g : m.key),
                (o = a(m, o, g)),
                null === u ? (c = m) : (u.sibling = m),
                (u = m))
            return (
              t &&
                d.forEach(function (t) {
                  return e(i, t)
                }),
              io && Ji(i, g),
              c
            )
          }
          function m(i, s, l, c) {
            var u = N(l)
            if ('function' != typeof u) throw Error(o(150))
            if (null == (l = u.call(l))) throw Error(o(151))
            for (
              var d = (u = null), g = s, m = (s = 0), b = null, y = l.next();
              null !== g && !y.done;
              m++, y = l.next()
            ) {
              g.index > m ? ((b = g), (g = null)) : (b = g.sibling)
              var v = f(i, g, y.value, c)
              if (null === v) {
                null === g && (g = b)
                break
              }
              t && g && null === v.alternate && e(i, g),
                (s = a(v, s, m)),
                null === d ? (u = v) : (d.sibling = v),
                (d = v),
                (g = b)
            }
            if (y.done) return n(i, g), io && Ji(i, m), u
            if (null === g) {
              for (; !y.done; m++, y = l.next())
                null !== (y = h(i, y.value, c)) &&
                  ((s = a(y, s, m)),
                  null === d ? (u = y) : (d.sibling = y),
                  (d = y))
              return io && Ji(i, m), u
            }
            for (g = r(i, g); !y.done; m++, y = l.next())
              null !== (y = p(g, i, m, y.value, c)) &&
                (t && null !== y.alternate && g.delete(null === y.key ? m : y.key),
                (s = a(y, s, m)),
                null === d ? (u = y) : (d.sibling = y),
                (d = y))
            return (
              t &&
                g.forEach(function (t) {
                  return e(i, t)
                }),
              io && Ji(i, m),
              u
            )
          }
          return function t(r, o, a, l) {
            if (
              ('object' == typeof a &&
                null !== a &&
                a.type === k &&
                null === a.key &&
                (a = a.props.children),
              'object' == typeof a && null !== a)
            ) {
              switch (a.$$typeof) {
                case w:
                  t: {
                    for (var c = a.key, u = o; null !== u; ) {
                      if (u.key === c) {
                        if ((c = a.type) === k) {
                          if (7 === u.tag) {
                            n(r, u.sibling),
                              ((o = i(u, a.props.children)).return = r),
                              (r = o)
                            break t
                          }
                        } else if (
                          u.elementType === c ||
                          ('object' == typeof c &&
                            null !== c &&
                            c.$$typeof === R &&
                            Xo(c) === u.type)
                        ) {
                          n(r, u.sibling),
                            ((o = i(u, a.props)).ref = qo(r, u, a)),
                            (o.return = r),
                            (r = o)
                          break t
                        }
                        n(r, u)
                        break
                      }
                      e(r, u), (u = u.sibling)
                    }
                    a.type === k
                      ? (((o = jc(a.props.children, r.mode, l, a.key)).return = r),
                        (r = o))
                      : (((l = Nc(a.type, a.key, a.props, null, r.mode, l)).ref =
                          qo(r, o, a)),
                        (l.return = r),
                        (r = l))
                  }
                  return s(r)
                case _:
                  t: {
                    for (u = a.key; null !== o; ) {
                      if (o.key === u) {
                        if (
                          4 === o.tag &&
                          o.stateNode.containerInfo === a.containerInfo &&
                          o.stateNode.implementation === a.implementation
                        ) {
                          n(r, o.sibling),
                            ((o = i(o, a.children || [])).return = r),
                            (r = o)
                          break t
                        }
                        n(r, o)
                        break
                      }
                      e(r, o), (o = o.sibling)
                    }
                    ;((o = Ic(a, r.mode, l)).return = r), (r = o)
                  }
                  return s(r)
                case R:
                  return t(r, o, (u = a._init)(a._payload), l)
              }
              if (et(a)) return g(r, o, a, l)
              if (N(a)) return m(r, o, a, l)
              Qo(r, a)
            }
            return ('string' == typeof a && '' !== a) || 'number' == typeof a
              ? ((a = '' + a),
                null !== o && 6 === o.tag
                  ? (n(r, o.sibling), ((o = i(o, a)).return = r), (r = o))
                  : (n(r, o), ((o = Fc(a, r.mode, l)).return = r), (r = o)),
                s(r))
              : n(r, o)
          }
        }
        var Zo = Ko(!0),
          Jo = Ko(!1),
          Go = {},
          ta = Si(Go),
          ea = Si(Go),
          na = Si(Go)
        function ra(t) {
          if (t === Go) throw Error(o(174))
          return t
        }
        function ia(t, e) {
          switch ((Ci(na, e), Ci(ea, t), Ci(ta, Go), (t = e.nodeType))) {
            case 9:
            case 11:
              e = (e = e.documentElement) ? e.namespaceURI : lt(null, '')
              break
            default:
              e = lt(
                (e = (t = 8 === t ? e.parentNode : e).namespaceURI || null),
                (t = t.tagName),
              )
          }
          Ei(ta), Ci(ta, e)
        }
        function oa() {
          Ei(ta), Ei(ea), Ei(na)
        }
        function aa(t) {
          ra(na.current)
          var e = ra(ta.current),
            n = lt(e, t.type)
          e !== n && (Ci(ea, t), Ci(ta, n))
        }
        function sa(t) {
          ea.current === t && (Ei(ta), Ei(ea))
        }
        var la = Si(0)
        function ca(t) {
          for (var e = t; null !== e; ) {
            if (13 === e.tag) {
              var n = e.memoizedState
              if (
                null !== n &&
                (null === (n = n.dehydrated) || '$?' === n.data || '$!' === n.data)
              )
                return e
            } else if (19 === e.tag && void 0 !== e.memoizedProps.revealOrder) {
              if (0 != (128 & e.flags)) return e
            } else if (null !== e.child) {
              ;(e.child.return = e), (e = e.child)
              continue
            }
            if (e === t) break
            for (; null === e.sibling; ) {
              if (null === e.return || e.return === t) return null
              e = e.return
            }
            ;(e.sibling.return = e.return), (e = e.sibling)
          }
          return null
        }
        var ua = []
        function da() {
          for (var t = 0; t < ua.length; t++)
            ua[t]._workInProgressVersionPrimary = null
          ua.length = 0
        }
        var ha = x.ReactCurrentDispatcher,
          fa = x.ReactCurrentBatchConfig,
          pa = 0,
          ga = null,
          ma = null,
          ba = null,
          ya = !1,
          va = !1,
          xa = 0,
          wa = 0
        function _a() {
          throw Error(o(321))
        }
        function ka(t, e) {
          if (null === e) return !1
          for (var n = 0; n < e.length && n < t.length; n++)
            if (!sr(t[n], e[n])) return !1
          return !0
        }
        function Sa(t, e, n, r, i, a) {
          if (
            ((pa = a),
            (ga = e),
            (e.memoizedState = null),
            (e.updateQueue = null),
            (e.lanes = 0),
            (ha.current = null === t || null === t.memoizedState ? ss : ls),
            (t = n(r, i)),
            va)
          ) {
            a = 0
            do {
              if (((va = !1), (xa = 0), 25 <= a)) throw Error(o(301))
              ;(a += 1),
                (ba = ma = null),
                (e.updateQueue = null),
                (ha.current = cs),
                (t = n(r, i))
            } while (va)
          }
          if (
            ((ha.current = as),
            (e = null !== ma && null !== ma.next),
            (pa = 0),
            (ba = ma = ga = null),
            (ya = !1),
            e)
          )
            throw Error(o(300))
          return t
        }
        function Ea() {
          var t = 0 !== xa
          return (xa = 0), t
        }
        function Ca() {
          var t = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null,
          }
          return null === ba ? (ga.memoizedState = ba = t) : (ba = ba.next = t), ba
        }
        function Ma() {
          if (null === ma) {
            var t = ga.alternate
            t = null !== t ? t.memoizedState : null
          } else t = ma.next
          var e = null === ba ? ga.memoizedState : ba.next
          if (null !== e) (ba = e), (ma = t)
          else {
            if (null === t) throw Error(o(310))
            ;(t = {
              memoizedState: (ma = t).memoizedState,
              baseState: ma.baseState,
              baseQueue: ma.baseQueue,
              queue: ma.queue,
              next: null,
            }),
              null === ba ? (ga.memoizedState = ba = t) : (ba = ba.next = t)
          }
          return ba
        }
        function Pa(t, e) {
          return 'function' == typeof e ? e(t) : e
        }
        function Oa(t) {
          var e = Ma(),
            n = e.queue
          if (null === n) throw Error(o(311))
          n.lastRenderedReducer = t
          var r = ma,
            i = r.baseQueue,
            a = n.pending
          if (null !== a) {
            if (null !== i) {
              var s = i.next
              ;(i.next = a.next), (a.next = s)
            }
            ;(r.baseQueue = i = a), (n.pending = null)
          }
          if (null !== i) {
            ;(a = i.next), (r = r.baseState)
            var l = (s = null),
              c = null,
              u = a
            do {
              var d = u.lane
              if ((pa & d) === d)
                null !== c &&
                  (c = c.next =
                    {
                      lane: 0,
                      action: u.action,
                      hasEagerState: u.hasEagerState,
                      eagerState: u.eagerState,
                      next: null,
                    }),
                  (r = u.hasEagerState ? u.eagerState : t(r, u.action))
              else {
                var h = {
                  lane: d,
                  action: u.action,
                  hasEagerState: u.hasEagerState,
                  eagerState: u.eagerState,
                  next: null,
                }
                null === c ? ((l = c = h), (s = r)) : (c = c.next = h),
                  (ga.lanes |= d),
                  (zl |= d)
              }
              u = u.next
            } while (null !== u && u !== a)
            null === c ? (s = r) : (c.next = l),
              sr(r, e.memoizedState) || (xs = !0),
              (e.memoizedState = r),
              (e.baseState = s),
              (e.baseQueue = c),
              (n.lastRenderedState = r)
          }
          if (null !== (t = n.interleaved)) {
            i = t
            do {
              ;(a = i.lane), (ga.lanes |= a), (zl |= a), (i = i.next)
            } while (i !== t)
          } else null === i && (n.lanes = 0)
          return [e.memoizedState, n.dispatch]
        }
        function Da(t) {
          var e = Ma(),
            n = e.queue
          if (null === n) throw Error(o(311))
          n.lastRenderedReducer = t
          var r = n.dispatch,
            i = n.pending,
            a = e.memoizedState
          if (null !== i) {
            n.pending = null
            var s = (i = i.next)
            do {
              ;(a = t(a, s.action)), (s = s.next)
            } while (s !== i)
            sr(a, e.memoizedState) || (xs = !0),
              (e.memoizedState = a),
              null === e.baseQueue && (e.baseState = a),
              (n.lastRenderedState = a)
          }
          return [a, r]
        }
        function Ta() {}
        function Ra(t, e) {
          var n = ga,
            r = Ma(),
            i = e(),
            a = !sr(r.memoizedState, i)
          if (
            (a && ((r.memoizedState = i), (xs = !0)),
            (r = r.queue),
            Ha(Na.bind(null, n, r, t), [t]),
            r.getSnapshot !== e || a || (null !== ba && 1 & ba.memoizedState.tag))
          ) {
            if (
              ((n.flags |= 2048),
              Ia(9, Aa.bind(null, n, r, i, e), void 0, null),
              null === Dl)
            )
              throw Error(o(349))
            0 != (30 & pa) || La(n, e, i)
          }
          return i
        }
        function La(t, e, n) {
          ;(t.flags |= 16384),
            (t = { getSnapshot: e, value: n }),
            null === (e = ga.updateQueue)
              ? ((e = { lastEffect: null, stores: null }),
                (ga.updateQueue = e),
                (e.stores = [t]))
              : null === (n = e.stores)
                ? (e.stores = [t])
                : n.push(t)
        }
        function Aa(t, e, n, r) {
          ;(e.value = n), (e.getSnapshot = r), ja(e) && za(t)
        }
        function Na(t, e, n) {
          return n(function () {
            ja(e) && za(t)
          })
        }
        function ja(t) {
          var e = t.getSnapshot
          t = t.value
          try {
            var n = e()
            return !sr(t, n)
          } catch (t) {
            return !0
          }
        }
        function za(t) {
          var e = Do(t, 1)
          null !== e && rc(e, t, 1, -1)
        }
        function Fa(t) {
          var e = Ca()
          return (
            'function' == typeof t && (t = t()),
            (e.memoizedState = e.baseState = t),
            (t = {
              pending: null,
              interleaved: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: Pa,
              lastRenderedState: t,
            }),
            (e.queue = t),
            (t = t.dispatch = ns.bind(null, ga, t)),
            [e.memoizedState, t]
          )
        }
        function Ia(t, e, n, r) {
          return (
            (t = { tag: t, create: e, destroy: n, deps: r, next: null }),
            null === (e = ga.updateQueue)
              ? ((e = { lastEffect: null, stores: null }),
                (ga.updateQueue = e),
                (e.lastEffect = t.next = t))
              : null === (n = e.lastEffect)
                ? (e.lastEffect = t.next = t)
                : ((r = n.next), (n.next = t), (t.next = r), (e.lastEffect = t)),
            t
          )
        }
        function Ba() {
          return Ma().memoizedState
        }
        function Ua(t, e, n, r) {
          var i = Ca()
          ;(ga.flags |= t),
            (i.memoizedState = Ia(1 | e, n, void 0, void 0 === r ? null : r))
        }
        function Wa(t, e, n, r) {
          var i = Ma()
          r = void 0 === r ? null : r
          var o = void 0
          if (null !== ma) {
            var a = ma.memoizedState
            if (((o = a.destroy), null !== r && ka(r, a.deps)))
              return void (i.memoizedState = Ia(e, n, o, r))
          }
          ;(ga.flags |= t), (i.memoizedState = Ia(1 | e, n, o, r))
        }
        function Va(t, e) {
          return Ua(8390656, 8, t, e)
        }
        function Ha(t, e) {
          return Wa(2048, 8, t, e)
        }
        function $a(t, e) {
          return Wa(4, 2, t, e)
        }
        function Ya(t, e) {
          return Wa(4, 4, t, e)
        }
        function qa(t, e) {
          return 'function' == typeof e
            ? ((t = t()),
              e(t),
              function () {
                e(null)
              })
            : null != e
              ? ((t = t()),
                (e.current = t),
                function () {
                  e.current = null
                })
              : void 0
        }
        function Qa(t, e, n) {
          return (
            (n = null != n ? n.concat([t]) : null), Wa(4, 4, qa.bind(null, e, t), n)
          )
        }
        function Xa() {}
        function Ka(t, e) {
          var n = Ma()
          e = void 0 === e ? null : e
          var r = n.memoizedState
          return null !== r && null !== e && ka(e, r[1])
            ? r[0]
            : ((n.memoizedState = [t, e]), t)
        }
        function Za(t, e) {
          var n = Ma()
          e = void 0 === e ? null : e
          var r = n.memoizedState
          return null !== r && null !== e && ka(e, r[1])
            ? r[0]
            : ((t = t()), (n.memoizedState = [t, e]), t)
        }
        function Ja(t, e, n) {
          return 0 == (21 & pa)
            ? (t.baseState && ((t.baseState = !1), (xs = !0)),
              (t.memoizedState = n))
            : (sr(n, e) ||
                ((n = ge()), (ga.lanes |= n), (zl |= n), (t.baseState = !0)),
              e)
        }
        function Ga(t, e) {
          var n = ve
          ;(ve = 0 !== n && 4 > n ? n : 4), t(!0)
          var r = fa.transition
          fa.transition = {}
          try {
            t(!1), e()
          } finally {
            ;(ve = n), (fa.transition = r)
          }
        }
        function ts() {
          return Ma().memoizedState
        }
        function es(t, e, n) {
          var r = nc(t)
          if (
            ((n = {
              lane: r,
              action: n,
              hasEagerState: !1,
              eagerState: null,
              next: null,
            }),
            rs(t))
          )
            is(e, n)
          else if (null !== (n = Oo(t, e, n, r))) {
            rc(n, t, r, ec()), os(n, e, r)
          }
        }
        function ns(t, e, n) {
          var r = nc(t),
            i = {
              lane: r,
              action: n,
              hasEagerState: !1,
              eagerState: null,
              next: null,
            }
          if (rs(t)) is(e, i)
          else {
            var o = t.alternate
            if (
              0 === t.lanes &&
              (null === o || 0 === o.lanes) &&
              null !== (o = e.lastRenderedReducer)
            )
              try {
                var a = e.lastRenderedState,
                  s = o(a, n)
                if (((i.hasEagerState = !0), (i.eagerState = s), sr(s, a))) {
                  var l = e.interleaved
                  return (
                    null === l
                      ? ((i.next = i), Po(e))
                      : ((i.next = l.next), (l.next = i)),
                    void (e.interleaved = i)
                  )
                }
              } catch (t) {}
            null !== (n = Oo(t, e, i, r)) && (rc(n, t, r, (i = ec())), os(n, e, r))
          }
        }
        function rs(t) {
          var e = t.alternate
          return t === ga || (null !== e && e === ga)
        }
        function is(t, e) {
          va = ya = !0
          var n = t.pending
          null === n ? (e.next = e) : ((e.next = n.next), (n.next = e)),
            (t.pending = e)
        }
        function os(t, e, n) {
          if (0 != (4194240 & n)) {
            var r = e.lanes
            ;(n |= r &= t.pendingLanes), (e.lanes = n), ye(t, n)
          }
        }
        var as = {
            readContext: Co,
            useCallback: _a,
            useContext: _a,
            useEffect: _a,
            useImperativeHandle: _a,
            useInsertionEffect: _a,
            useLayoutEffect: _a,
            useMemo: _a,
            useReducer: _a,
            useRef: _a,
            useState: _a,
            useDebugValue: _a,
            useDeferredValue: _a,
            useTransition: _a,
            useMutableSource: _a,
            useSyncExternalStore: _a,
            useId: _a,
            unstable_isNewReconciler: !1,
          },
          ss = {
            readContext: Co,
            useCallback: function (t, e) {
              return (Ca().memoizedState = [t, void 0 === e ? null : e]), t
            },
            useContext: Co,
            useEffect: Va,
            useImperativeHandle: function (t, e, n) {
              return (
                (n = null != n ? n.concat([t]) : null),
                Ua(4194308, 4, qa.bind(null, e, t), n)
              )
            },
            useLayoutEffect: function (t, e) {
              return Ua(4194308, 4, t, e)
            },
            useInsertionEffect: function (t, e) {
              return Ua(4, 2, t, e)
            },
            useMemo: function (t, e) {
              var n = Ca()
              return (
                (e = void 0 === e ? null : e),
                (t = t()),
                (n.memoizedState = [t, e]),
                t
              )
            },
            useReducer: function (t, e, n) {
              var r = Ca()
              return (
                (e = void 0 !== n ? n(e) : e),
                (r.memoizedState = r.baseState = e),
                (t = {
                  pending: null,
                  interleaved: null,
                  lanes: 0,
                  dispatch: null,
                  lastRenderedReducer: t,
                  lastRenderedState: e,
                }),
                (r.queue = t),
                (t = t.dispatch = es.bind(null, ga, t)),
                [r.memoizedState, t]
              )
            },
            useRef: function (t) {
              return (t = { current: t }), (Ca().memoizedState = t)
            },
            useState: Fa,
            useDebugValue: Xa,
            useDeferredValue: function (t) {
              return (Ca().memoizedState = t)
            },
            useTransition: function () {
              var t = Fa(!1),
                e = t[0]
              return (t = Ga.bind(null, t[1])), (Ca().memoizedState = t), [e, t]
            },
            useMutableSource: function () {},
            useSyncExternalStore: function (t, e, n) {
              var r = ga,
                i = Ca()
              if (io) {
                if (void 0 === n) throw Error(o(407))
                n = n()
              } else {
                if (((n = e()), null === Dl)) throw Error(o(349))
                0 != (30 & pa) || La(r, e, n)
              }
              i.memoizedState = n
              var a = { value: n, getSnapshot: e }
              return (
                (i.queue = a),
                Va(Na.bind(null, r, a, t), [t]),
                (r.flags |= 2048),
                Ia(9, Aa.bind(null, r, a, n, e), void 0, null),
                n
              )
            },
            useId: function () {
              var t = Ca(),
                e = Dl.identifierPrefix
              if (io) {
                var n = Zi
                ;(e =
                  ':' +
                  e +
                  'R' +
                  (n = (Ki & ~(1 << (32 - ae(Ki) - 1))).toString(32) + n)),
                  0 < (n = xa++) && (e += 'H' + n.toString(32)),
                  (e += ':')
              } else e = ':' + e + 'r' + (n = wa++).toString(32) + ':'
              return (t.memoizedState = e)
            },
            unstable_isNewReconciler: !1,
          },
          ls = {
            readContext: Co,
            useCallback: Ka,
            useContext: Co,
            useEffect: Ha,
            useImperativeHandle: Qa,
            useInsertionEffect: $a,
            useLayoutEffect: Ya,
            useMemo: Za,
            useReducer: Oa,
            useRef: Ba,
            useState: function () {
              return Oa(Pa)
            },
            useDebugValue: Xa,
            useDeferredValue: function (t) {
              return Ja(Ma(), ma.memoizedState, t)
            },
            useTransition: function () {
              return [Oa(Pa)[0], Ma().memoizedState]
            },
            useMutableSource: Ta,
            useSyncExternalStore: Ra,
            useId: ts,
            unstable_isNewReconciler: !1,
          },
          cs = {
            readContext: Co,
            useCallback: Ka,
            useContext: Co,
            useEffect: Ha,
            useImperativeHandle: Qa,
            useInsertionEffect: $a,
            useLayoutEffect: Ya,
            useMemo: Za,
            useReducer: Da,
            useRef: Ba,
            useState: function () {
              return Da(Pa)
            },
            useDebugValue: Xa,
            useDeferredValue: function (t) {
              var e = Ma()
              return null === ma
                ? (e.memoizedState = t)
                : Ja(e, ma.memoizedState, t)
            },
            useTransition: function () {
              return [Da(Pa)[0], Ma().memoizedState]
            },
            useMutableSource: Ta,
            useSyncExternalStore: Ra,
            useId: ts,
            unstable_isNewReconciler: !1,
          }
        function us(t, e) {
          try {
            var n = '',
              r = e
            do {
              ;(n += U(r)), (r = r.return)
            } while (r)
            var i = n
          } catch (t) {
            i = '\nError generating stack: ' + t.message + '\n' + t.stack
          }
          return { value: t, source: e, stack: i, digest: null }
        }
        function ds(t, e, n) {
          return {
            value: t,
            source: null,
            stack: null != n ? n : null,
            digest: null != e ? e : null,
          }
        }
        function hs(t, e) {
          try {
            console.error(e.value)
          } catch (t) {
            setTimeout(function () {
              throw t
            })
          }
        }
        var fs = 'function' == typeof WeakMap ? WeakMap : Map
        function ps(t, e, n) {
          ;((n = Ao(-1, n)).tag = 3), (n.payload = { element: null })
          var r = e.value
          return (
            (n.callback = function () {
              $l || (($l = !0), (Yl = r)), hs(0, e)
            }),
            n
          )
        }
        function gs(t, e, n) {
          ;(n = Ao(-1, n)).tag = 3
          var r = t.type.getDerivedStateFromError
          if ('function' == typeof r) {
            var i = e.value
            ;(n.payload = function () {
              return r(i)
            }),
              (n.callback = function () {
                hs(0, e)
              })
          }
          var o = t.stateNode
          return (
            null !== o &&
              'function' == typeof o.componentDidCatch &&
              (n.callback = function () {
                hs(0, e),
                  'function' != typeof r &&
                    (null === ql ? (ql = new Set([this])) : ql.add(this))
                var t = e.stack
                this.componentDidCatch(e.value, {
                  componentStack: null !== t ? t : '',
                })
              }),
            n
          )
        }
        function ms(t, e, n) {
          var r = t.pingCache
          if (null === r) {
            r = t.pingCache = new fs()
            var i = new Set()
            r.set(e, i)
          } else void 0 === (i = r.get(e)) && ((i = new Set()), r.set(e, i))
          i.has(n) || (i.add(n), (t = Cc.bind(null, t, e, n)), e.then(t, t))
        }
        function bs(t) {
          do {
            var e
            if (
              ((e = 13 === t.tag) &&
                (e = null === (e = t.memoizedState) || null !== e.dehydrated),
              e)
            )
              return t
            t = t.return
          } while (null !== t)
          return null
        }
        function ys(t, e, n, r, i) {
          return 0 == (1 & t.mode)
            ? (t === e
                ? (t.flags |= 65536)
                : ((t.flags |= 128),
                  (n.flags |= 131072),
                  (n.flags &= -52805),
                  1 === n.tag &&
                    (null === n.alternate
                      ? (n.tag = 17)
                      : (((e = Ao(-1, 1)).tag = 2), No(n, e, 1))),
                  (n.lanes |= 1)),
              t)
            : ((t.flags |= 65536), (t.lanes = i), t)
        }
        var vs = x.ReactCurrentOwner,
          xs = !1
        function ws(t, e, n, r) {
          e.child = null === t ? Jo(e, null, n, r) : Zo(e, t.child, n, r)
        }
        function _s(t, e, n, r, i) {
          n = n.render
          var o = e.ref
          return (
            Eo(e, i),
            (r = Sa(t, e, n, r, o, i)),
            (n = Ea()),
            null === t || xs
              ? (io && n && to(e), (e.flags |= 1), ws(t, e, r, i), e.child)
              : ((e.updateQueue = t.updateQueue),
                (e.flags &= -2053),
                (t.lanes &= ~i),
                $s(t, e, i))
          )
        }
        function ks(t, e, n, r, i) {
          if (null === t) {
            var o = n.type
            return 'function' != typeof o ||
              Lc(o) ||
              void 0 !== o.defaultProps ||
              null !== n.compare ||
              void 0 !== n.defaultProps
              ? (((t = Nc(n.type, null, r, e, e.mode, i)).ref = e.ref),
                (t.return = e),
                (e.child = t))
              : ((e.tag = 15), (e.type = o), Ss(t, e, o, r, i))
          }
          if (((o = t.child), 0 == (t.lanes & i))) {
            var a = o.memoizedProps
            if ((n = null !== (n = n.compare) ? n : lr)(a, r) && t.ref === e.ref)
              return $s(t, e, i)
          }
          return (
            (e.flags |= 1),
            ((t = Ac(o, r)).ref = e.ref),
            (t.return = e),
            (e.child = t)
          )
        }
        function Ss(t, e, n, r, i) {
          if (null !== t) {
            var o = t.memoizedProps
            if (lr(o, r) && t.ref === e.ref) {
              if (((xs = !1), (e.pendingProps = r = o), 0 == (t.lanes & i)))
                return (e.lanes = t.lanes), $s(t, e, i)
              0 != (131072 & t.flags) && (xs = !0)
            }
          }
          return Ms(t, e, n, r, i)
        }
        function Es(t, e, n) {
          var r = e.pendingProps,
            i = r.children,
            o = null !== t ? t.memoizedState : null
          if ('hidden' === r.mode)
            if (0 == (1 & e.mode))
              (e.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
              }),
                Ci(Al, Ll),
                (Ll |= n)
            else {
              if (0 == (1073741824 & n))
                return (
                  (t = null !== o ? o.baseLanes | n : n),
                  (e.lanes = e.childLanes = 1073741824),
                  (e.memoizedState = {
                    baseLanes: t,
                    cachePool: null,
                    transitions: null,
                  }),
                  (e.updateQueue = null),
                  Ci(Al, Ll),
                  (Ll |= t),
                  null
                )
              ;(e.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
              }),
                (r = null !== o ? o.baseLanes : n),
                Ci(Al, Ll),
                (Ll |= r)
            }
          else
            null !== o
              ? ((r = o.baseLanes | n), (e.memoizedState = null))
              : (r = n),
              Ci(Al, Ll),
              (Ll |= r)
          return ws(t, e, i, n), e.child
        }
        function Cs(t, e) {
          var n = e.ref
          ;((null === t && null !== n) || (null !== t && t.ref !== n)) &&
            ((e.flags |= 512), (e.flags |= 2097152))
        }
        function Ms(t, e, n, r, i) {
          var o = Ri(n) ? Di : Pi.current
          return (
            (o = Ti(e, o)),
            Eo(e, i),
            (n = Sa(t, e, n, r, o, i)),
            (r = Ea()),
            null === t || xs
              ? (io && r && to(e), (e.flags |= 1), ws(t, e, n, i), e.child)
              : ((e.updateQueue = t.updateQueue),
                (e.flags &= -2053),
                (t.lanes &= ~i),
                $s(t, e, i))
          )
        }
        function Ps(t, e, n, r, i) {
          if (Ri(n)) {
            var o = !0
            ji(e)
          } else o = !1
          if ((Eo(e, i), null === e.stateNode))
            Hs(t, e), Ho(e, n, r), Yo(e, n, r, i), (r = !0)
          else if (null === t) {
            var a = e.stateNode,
              s = e.memoizedProps
            a.props = s
            var l = a.context,
              c = n.contextType
            'object' == typeof c && null !== c
              ? (c = Co(c))
              : (c = Ti(e, (c = Ri(n) ? Di : Pi.current)))
            var u = n.getDerivedStateFromProps,
              d =
                'function' == typeof u ||
                'function' == typeof a.getSnapshotBeforeUpdate
            d ||
              ('function' != typeof a.UNSAFE_componentWillReceiveProps &&
                'function' != typeof a.componentWillReceiveProps) ||
              ((s !== r || l !== c) && $o(e, a, r, c)),
              (To = !1)
            var h = e.memoizedState
            ;(a.state = h),
              Fo(e, r, a, i),
              (l = e.memoizedState),
              s !== r || h !== l || Oi.current || To
                ? ('function' == typeof u &&
                    (Uo(e, n, u, r), (l = e.memoizedState)),
                  (s = To || Vo(e, n, s, r, h, l, c))
                    ? (d ||
                        ('function' != typeof a.UNSAFE_componentWillMount &&
                          'function' != typeof a.componentWillMount) ||
                        ('function' == typeof a.componentWillMount &&
                          a.componentWillMount(),
                        'function' == typeof a.UNSAFE_componentWillMount &&
                          a.UNSAFE_componentWillMount()),
                      'function' == typeof a.componentDidMount &&
                        (e.flags |= 4194308))
                    : ('function' == typeof a.componentDidMount &&
                        (e.flags |= 4194308),
                      (e.memoizedProps = r),
                      (e.memoizedState = l)),
                  (a.props = r),
                  (a.state = l),
                  (a.context = c),
                  (r = s))
                : ('function' == typeof a.componentDidMount && (e.flags |= 4194308),
                  (r = !1))
          } else {
            ;(a = e.stateNode),
              Lo(t, e),
              (s = e.memoizedProps),
              (c = e.type === e.elementType ? s : bo(e.type, s)),
              (a.props = c),
              (d = e.pendingProps),
              (h = a.context),
              'object' == typeof (l = n.contextType) && null !== l
                ? (l = Co(l))
                : (l = Ti(e, (l = Ri(n) ? Di : Pi.current)))
            var f = n.getDerivedStateFromProps
            ;(u =
              'function' == typeof f ||
              'function' == typeof a.getSnapshotBeforeUpdate) ||
              ('function' != typeof a.UNSAFE_componentWillReceiveProps &&
                'function' != typeof a.componentWillReceiveProps) ||
              ((s !== d || h !== l) && $o(e, a, r, l)),
              (To = !1),
              (h = e.memoizedState),
              (a.state = h),
              Fo(e, r, a, i)
            var p = e.memoizedState
            s !== d || h !== p || Oi.current || To
              ? ('function' == typeof f && (Uo(e, n, f, r), (p = e.memoizedState)),
                (c = To || Vo(e, n, c, r, h, p, l) || !1)
                  ? (u ||
                      ('function' != typeof a.UNSAFE_componentWillUpdate &&
                        'function' != typeof a.componentWillUpdate) ||
                      ('function' == typeof a.componentWillUpdate &&
                        a.componentWillUpdate(r, p, l),
                      'function' == typeof a.UNSAFE_componentWillUpdate &&
                        a.UNSAFE_componentWillUpdate(r, p, l)),
                    'function' == typeof a.componentDidUpdate && (e.flags |= 4),
                    'function' == typeof a.getSnapshotBeforeUpdate &&
                      (e.flags |= 1024))
                  : ('function' != typeof a.componentDidUpdate ||
                      (s === t.memoizedProps && h === t.memoizedState) ||
                      (e.flags |= 4),
                    'function' != typeof a.getSnapshotBeforeUpdate ||
                      (s === t.memoizedProps && h === t.memoizedState) ||
                      (e.flags |= 1024),
                    (e.memoizedProps = r),
                    (e.memoizedState = p)),
                (a.props = r),
                (a.state = p),
                (a.context = l),
                (r = c))
              : ('function' != typeof a.componentDidUpdate ||
                  (s === t.memoizedProps && h === t.memoizedState) ||
                  (e.flags |= 4),
                'function' != typeof a.getSnapshotBeforeUpdate ||
                  (s === t.memoizedProps && h === t.memoizedState) ||
                  (e.flags |= 1024),
                (r = !1))
          }
          return Os(t, e, n, r, o, i)
        }
        function Os(t, e, n, r, i, o) {
          Cs(t, e)
          var a = 0 != (128 & e.flags)
          if (!r && !a) return i && zi(e, n, !1), $s(t, e, o)
          ;(r = e.stateNode), (vs.current = e)
          var s =
            a && 'function' != typeof n.getDerivedStateFromError ? null : r.render()
          return (
            (e.flags |= 1),
            null !== t && a
              ? ((e.child = Zo(e, t.child, null, o)), (e.child = Zo(e, null, s, o)))
              : ws(t, e, s, o),
            (e.memoizedState = r.state),
            i && zi(e, n, !0),
            e.child
          )
        }
        function Ds(t) {
          var e = t.stateNode
          e.pendingContext
            ? Ai(0, e.pendingContext, e.pendingContext !== e.context)
            : e.context && Ai(0, e.context, !1),
            ia(t, e.containerInfo)
        }
        function Ts(t, e, n, r, i) {
          return po(), go(i), (e.flags |= 256), ws(t, e, n, r), e.child
        }
        var Rs,
          Ls,
          As,
          Ns,
          js = { dehydrated: null, treeContext: null, retryLane: 0 }
        function zs(t) {
          return { baseLanes: t, cachePool: null, transitions: null }
        }
        function Fs(t, e, n) {
          var r,
            i = e.pendingProps,
            a = la.current,
            s = !1,
            l = 0 != (128 & e.flags)
          if (
            ((r = l) ||
              (r = (null === t || null !== t.memoizedState) && 0 != (2 & a)),
            r
              ? ((s = !0), (e.flags &= -129))
              : (null !== t && null === t.memoizedState) || (a |= 1),
            Ci(la, 1 & a),
            null === t)
          )
            return (
              co(e),
              null !== (t = e.memoizedState) && null !== (t = t.dehydrated)
                ? (0 == (1 & e.mode)
                    ? (e.lanes = 1)
                    : '$!' === t.data
                      ? (e.lanes = 8)
                      : (e.lanes = 1073741824),
                  null)
                : ((l = i.children),
                  (t = i.fallback),
                  s
                    ? ((i = e.mode),
                      (s = e.child),
                      (l = { mode: 'hidden', children: l }),
                      0 == (1 & i) && null !== s
                        ? ((s.childLanes = 0), (s.pendingProps = l))
                        : (s = zc(l, i, 0, null)),
                      (t = jc(t, i, n, null)),
                      (s.return = e),
                      (t.return = e),
                      (s.sibling = t),
                      (e.child = s),
                      (e.child.memoizedState = zs(n)),
                      (e.memoizedState = js),
                      t)
                    : Is(e, l))
            )
          if (null !== (a = t.memoizedState) && null !== (r = a.dehydrated))
            return (function (t, e, n, r, i, a, s) {
              if (n)
                return 256 & e.flags
                  ? ((e.flags &= -257), Bs(t, e, s, (r = ds(Error(o(422))))))
                  : null !== e.memoizedState
                    ? ((e.child = t.child), (e.flags |= 128), null)
                    : ((a = r.fallback),
                      (i = e.mode),
                      (r = zc(
                        { mode: 'visible', children: r.children },
                        i,
                        0,
                        null,
                      )),
                      ((a = jc(a, i, s, null)).flags |= 2),
                      (r.return = e),
                      (a.return = e),
                      (r.sibling = a),
                      (e.child = r),
                      0 != (1 & e.mode) && Zo(e, t.child, null, s),
                      (e.child.memoizedState = zs(s)),
                      (e.memoizedState = js),
                      a)
              if (0 == (1 & e.mode)) return Bs(t, e, s, null)
              if ('$!' === i.data) {
                if ((r = i.nextSibling && i.nextSibling.dataset)) var l = r.dgst
                return (
                  (r = l), Bs(t, e, s, (r = ds((a = Error(o(419))), r, void 0)))
                )
              }
              if (((l = 0 != (s & t.childLanes)), xs || l)) {
                if (null !== (r = Dl)) {
                  switch (s & -s) {
                    case 4:
                      i = 2
                      break
                    case 16:
                      i = 8
                      break
                    case 64:
                    case 128:
                    case 256:
                    case 512:
                    case 1024:
                    case 2048:
                    case 4096:
                    case 8192:
                    case 16384:
                    case 32768:
                    case 65536:
                    case 131072:
                    case 262144:
                    case 524288:
                    case 1048576:
                    case 2097152:
                    case 4194304:
                    case 8388608:
                    case 16777216:
                    case 33554432:
                    case 67108864:
                      i = 32
                      break
                    case 536870912:
                      i = 268435456
                      break
                    default:
                      i = 0
                  }
                  0 !== (i = 0 != (i & (r.suspendedLanes | s)) ? 0 : i) &&
                    i !== a.retryLane &&
                    ((a.retryLane = i), Do(t, i), rc(r, t, i, -1))
                }
                return mc(), Bs(t, e, s, (r = ds(Error(o(421)))))
              }
              return '$?' === i.data
                ? ((e.flags |= 128),
                  (e.child = t.child),
                  (e = Pc.bind(null, t)),
                  (i._reactRetry = e),
                  null)
                : ((t = a.treeContext),
                  (ro = ci(i.nextSibling)),
                  (no = e),
                  (io = !0),
                  (oo = null),
                  null !== t &&
                    ((qi[Qi++] = Ki),
                    (qi[Qi++] = Zi),
                    (qi[Qi++] = Xi),
                    (Ki = t.id),
                    (Zi = t.overflow),
                    (Xi = e)),
                  (e = Is(e, r.children)),
                  (e.flags |= 4096),
                  e)
            })(t, e, l, i, r, a, n)
          if (s) {
            ;(s = i.fallback), (l = e.mode), (r = (a = t.child).sibling)
            var c = { mode: 'hidden', children: i.children }
            return (
              0 == (1 & l) && e.child !== a
                ? (((i = e.child).childLanes = 0),
                  (i.pendingProps = c),
                  (e.deletions = null))
                : ((i = Ac(a, c)).subtreeFlags = 14680064 & a.subtreeFlags),
              null !== r ? (s = Ac(r, s)) : ((s = jc(s, l, n, null)).flags |= 2),
              (s.return = e),
              (i.return = e),
              (i.sibling = s),
              (e.child = i),
              (i = s),
              (s = e.child),
              (l =
                null === (l = t.child.memoizedState)
                  ? zs(n)
                  : {
                      baseLanes: l.baseLanes | n,
                      cachePool: null,
                      transitions: l.transitions,
                    }),
              (s.memoizedState = l),
              (s.childLanes = t.childLanes & ~n),
              (e.memoizedState = js),
              i
            )
          }
          return (
            (t = (s = t.child).sibling),
            (i = Ac(s, { mode: 'visible', children: i.children })),
            0 == (1 & e.mode) && (i.lanes = n),
            (i.return = e),
            (i.sibling = null),
            null !== t &&
              (null === (n = e.deletions)
                ? ((e.deletions = [t]), (e.flags |= 16))
                : n.push(t)),
            (e.child = i),
            (e.memoizedState = null),
            i
          )
        }
        function Is(t, e) {
          return (
            ((e = zc({ mode: 'visible', children: e }, t.mode, 0, null)).return =
              t),
            (t.child = e)
          )
        }
        function Bs(t, e, n, r) {
          return (
            null !== r && go(r),
            Zo(e, t.child, null, n),
            ((t = Is(e, e.pendingProps.children)).flags |= 2),
            (e.memoizedState = null),
            t
          )
        }
        function Us(t, e, n) {
          t.lanes |= e
          var r = t.alternate
          null !== r && (r.lanes |= e), So(t.return, e, n)
        }
        function Ws(t, e, n, r, i) {
          var o = t.memoizedState
          null === o
            ? (t.memoizedState = {
                isBackwards: e,
                rendering: null,
                renderingStartTime: 0,
                last: r,
                tail: n,
                tailMode: i,
              })
            : ((o.isBackwards = e),
              (o.rendering = null),
              (o.renderingStartTime = 0),
              (o.last = r),
              (o.tail = n),
              (o.tailMode = i))
        }
        function Vs(t, e, n) {
          var r = e.pendingProps,
            i = r.revealOrder,
            o = r.tail
          if ((ws(t, e, r.children, n), 0 != (2 & (r = la.current))))
            (r = (1 & r) | 2), (e.flags |= 128)
          else {
            if (null !== t && 0 != (128 & t.flags))
              t: for (t = e.child; null !== t; ) {
                if (13 === t.tag) null !== t.memoizedState && Us(t, n, e)
                else if (19 === t.tag) Us(t, n, e)
                else if (null !== t.child) {
                  ;(t.child.return = t), (t = t.child)
                  continue
                }
                if (t === e) break t
                for (; null === t.sibling; ) {
                  if (null === t.return || t.return === e) break t
                  t = t.return
                }
                ;(t.sibling.return = t.return), (t = t.sibling)
              }
            r &= 1
          }
          if ((Ci(la, r), 0 == (1 & e.mode))) e.memoizedState = null
          else
            switch (i) {
              case 'forwards':
                for (n = e.child, i = null; null !== n; )
                  null !== (t = n.alternate) && null === ca(t) && (i = n),
                    (n = n.sibling)
                null === (n = i)
                  ? ((i = e.child), (e.child = null))
                  : ((i = n.sibling), (n.sibling = null)),
                  Ws(e, !1, i, n, o)
                break
              case 'backwards':
                for (n = null, i = e.child, e.child = null; null !== i; ) {
                  if (null !== (t = i.alternate) && null === ca(t)) {
                    e.child = i
                    break
                  }
                  ;(t = i.sibling), (i.sibling = n), (n = i), (i = t)
                }
                Ws(e, !0, n, null, o)
                break
              case 'together':
                Ws(e, !1, null, null, void 0)
                break
              default:
                e.memoizedState = null
            }
          return e.child
        }
        function Hs(t, e) {
          0 == (1 & e.mode) &&
            null !== t &&
            ((t.alternate = null), (e.alternate = null), (e.flags |= 2))
        }
        function $s(t, e, n) {
          if (
            (null !== t && (e.dependencies = t.dependencies),
            (zl |= e.lanes),
            0 == (n & e.childLanes))
          )
            return null
          if (null !== t && e.child !== t.child) throw Error(o(153))
          if (null !== e.child) {
            for (
              n = Ac((t = e.child), t.pendingProps), e.child = n, n.return = e;
              null !== t.sibling;

            )
              (t = t.sibling), ((n = n.sibling = Ac(t, t.pendingProps)).return = e)
            n.sibling = null
          }
          return e.child
        }
        function Ys(t, e) {
          if (!io)
            switch (t.tailMode) {
              case 'hidden':
                e = t.tail
                for (var n = null; null !== e; )
                  null !== e.alternate && (n = e), (e = e.sibling)
                null === n ? (t.tail = null) : (n.sibling = null)
                break
              case 'collapsed':
                n = t.tail
                for (var r = null; null !== n; )
                  null !== n.alternate && (r = n), (n = n.sibling)
                null === r
                  ? e || null === t.tail
                    ? (t.tail = null)
                    : (t.tail.sibling = null)
                  : (r.sibling = null)
            }
        }
        function qs(t) {
          var e = null !== t.alternate && t.alternate.child === t.child,
            n = 0,
            r = 0
          if (e)
            for (var i = t.child; null !== i; )
              (n |= i.lanes | i.childLanes),
                (r |= 14680064 & i.subtreeFlags),
                (r |= 14680064 & i.flags),
                (i.return = t),
                (i = i.sibling)
          else
            for (i = t.child; null !== i; )
              (n |= i.lanes | i.childLanes),
                (r |= i.subtreeFlags),
                (r |= i.flags),
                (i.return = t),
                (i = i.sibling)
          return (t.subtreeFlags |= r), (t.childLanes = n), e
        }
        function Qs(t, e, n) {
          var r = e.pendingProps
          switch ((eo(e), e.tag)) {
            case 2:
            case 16:
            case 15:
            case 0:
            case 11:
            case 7:
            case 8:
            case 12:
            case 9:
            case 14:
              return qs(e), null
            case 1:
            case 17:
              return Ri(e.type) && Li(), qs(e), null
            case 3:
              return (
                (r = e.stateNode),
                oa(),
                Ei(Oi),
                Ei(Pi),
                da(),
                r.pendingContext &&
                  ((r.context = r.pendingContext), (r.pendingContext = null)),
                (null !== t && null !== t.child) ||
                  (ho(e)
                    ? (e.flags |= 4)
                    : null === t ||
                      (t.memoizedState.isDehydrated && 0 == (256 & e.flags)) ||
                      ((e.flags |= 1024), null !== oo && (sc(oo), (oo = null)))),
                Ls(t, e),
                qs(e),
                null
              )
            case 5:
              sa(e)
              var i = ra(na.current)
              if (((n = e.type), null !== t && null != e.stateNode))
                As(t, e, n, r, i),
                  t.ref !== e.ref && ((e.flags |= 512), (e.flags |= 2097152))
              else {
                if (!r) {
                  if (null === e.stateNode) throw Error(o(166))
                  return qs(e), null
                }
                if (((t = ra(ta.current)), ho(e))) {
                  ;(r = e.stateNode), (n = e.type)
                  var a = e.memoizedProps
                  switch (((r[hi] = e), (r[fi] = a), (t = 0 != (1 & e.mode)), n)) {
                    case 'dialog':
                      Ir('cancel', r), Ir('close', r)
                      break
                    case 'iframe':
                    case 'object':
                    case 'embed':
                      Ir('load', r)
                      break
                    case 'video':
                    case 'audio':
                      for (i = 0; i < Nr.length; i++) Ir(Nr[i], r)
                      break
                    case 'source':
                      Ir('error', r)
                      break
                    case 'img':
                    case 'image':
                    case 'link':
                      Ir('error', r), Ir('load', r)
                      break
                    case 'details':
                      Ir('toggle', r)
                      break
                    case 'input':
                      K(r, a), Ir('invalid', r)
                      break
                    case 'select':
                      ;(r._wrapperState = { wasMultiple: !!a.multiple }),
                        Ir('invalid', r)
                      break
                    case 'textarea':
                      it(r, a), Ir('invalid', r)
                  }
                  for (var l in (yt(n, a), (i = null), a))
                    if (a.hasOwnProperty(l)) {
                      var c = a[l]
                      'children' === l
                        ? 'string' == typeof c
                          ? r.textContent !== c &&
                            (!0 !== a.suppressHydrationWarning &&
                              Jr(r.textContent, c, t),
                            (i = ['children', c]))
                          : 'number' == typeof c &&
                            r.textContent !== '' + c &&
                            (!0 !== a.suppressHydrationWarning &&
                              Jr(r.textContent, c, t),
                            (i = ['children', '' + c]))
                        : s.hasOwnProperty(l) &&
                          null != c &&
                          'onScroll' === l &&
                          Ir('scroll', r)
                    }
                  switch (n) {
                    case 'input':
                      Y(r), G(r, a, !0)
                      break
                    case 'textarea':
                      Y(r), at(r)
                      break
                    case 'select':
                    case 'option':
                      break
                    default:
                      'function' == typeof a.onClick && (r.onclick = Gr)
                  }
                  ;(r = i), (e.updateQueue = r), null !== r && (e.flags |= 4)
                } else {
                  ;(l = 9 === i.nodeType ? i : i.ownerDocument),
                    'http://www.w3.org/1999/xhtml' === t && (t = st(n)),
                    'http://www.w3.org/1999/xhtml' === t
                      ? 'script' === n
                        ? (((t = l.createElement('div')).innerHTML =
                            '<script></script>'),
                          (t = t.removeChild(t.firstChild)))
                        : 'string' == typeof r.is
                          ? (t = l.createElement(n, { is: r.is }))
                          : ((t = l.createElement(n)),
                            'select' === n &&
                              ((l = t),
                              r.multiple
                                ? (l.multiple = !0)
                                : r.size && (l.size = r.size)))
                      : (t = l.createElementNS(t, n)),
                    (t[hi] = e),
                    (t[fi] = r),
                    Rs(t, e, !1, !1),
                    (e.stateNode = t)
                  t: {
                    switch (((l = vt(n, r)), n)) {
                      case 'dialog':
                        Ir('cancel', t), Ir('close', t), (i = r)
                        break
                      case 'iframe':
                      case 'object':
                      case 'embed':
                        Ir('load', t), (i = r)
                        break
                      case 'video':
                      case 'audio':
                        for (i = 0; i < Nr.length; i++) Ir(Nr[i], t)
                        i = r
                        break
                      case 'source':
                        Ir('error', t), (i = r)
                        break
                      case 'img':
                      case 'image':
                      case 'link':
                        Ir('error', t), Ir('load', t), (i = r)
                        break
                      case 'details':
                        Ir('toggle', t), (i = r)
                        break
                      case 'input':
                        K(t, r), (i = X(t, r)), Ir('invalid', t)
                        break
                      case 'option':
                      default:
                        i = r
                        break
                      case 'select':
                        ;(t._wrapperState = { wasMultiple: !!r.multiple }),
                          (i = z({}, r, { value: void 0 })),
                          Ir('invalid', t)
                        break
                      case 'textarea':
                        it(t, r), (i = rt(t, r)), Ir('invalid', t)
                    }
                    for (a in (yt(n, i), (c = i)))
                      if (c.hasOwnProperty(a)) {
                        var u = c[a]
                        'style' === a
                          ? mt(t, u)
                          : 'dangerouslySetInnerHTML' === a
                            ? null != (u = u ? u.__html : void 0) && dt(t, u)
                            : 'children' === a
                              ? 'string' == typeof u
                                ? ('textarea' !== n || '' !== u) && ht(t, u)
                                : 'number' == typeof u && ht(t, '' + u)
                              : 'suppressContentEditableWarning' !== a &&
                                'suppressHydrationWarning' !== a &&
                                'autoFocus' !== a &&
                                (s.hasOwnProperty(a)
                                  ? null != u && 'onScroll' === a && Ir('scroll', t)
                                  : null != u && v(t, a, u, l))
                      }
                    switch (n) {
                      case 'input':
                        Y(t), G(t, r, !1)
                        break
                      case 'textarea':
                        Y(t), at(t)
                        break
                      case 'option':
                        null != r.value && t.setAttribute('value', '' + H(r.value))
                        break
                      case 'select':
                        ;(t.multiple = !!r.multiple),
                          null != (a = r.value)
                            ? nt(t, !!r.multiple, a, !1)
                            : null != r.defaultValue &&
                              nt(t, !!r.multiple, r.defaultValue, !0)
                        break
                      default:
                        'function' == typeof i.onClick && (t.onclick = Gr)
                    }
                    switch (n) {
                      case 'button':
                      case 'input':
                      case 'select':
                      case 'textarea':
                        r = !!r.autoFocus
                        break t
                      case 'img':
                        r = !0
                        break t
                      default:
                        r = !1
                    }
                  }
                  r && (e.flags |= 4)
                }
                null !== e.ref && ((e.flags |= 512), (e.flags |= 2097152))
              }
              return qs(e), null
            case 6:
              if (t && null != e.stateNode) Ns(t, e, t.memoizedProps, r)
              else {
                if ('string' != typeof r && null === e.stateNode)
                  throw Error(o(166))
                if (((n = ra(na.current)), ra(ta.current), ho(e))) {
                  if (
                    ((r = e.stateNode),
                    (n = e.memoizedProps),
                    (r[hi] = e),
                    (a = r.nodeValue !== n) && null !== (t = no))
                  )
                    switch (t.tag) {
                      case 3:
                        Jr(r.nodeValue, n, 0 != (1 & t.mode))
                        break
                      case 5:
                        !0 !== t.memoizedProps.suppressHydrationWarning &&
                          Jr(r.nodeValue, n, 0 != (1 & t.mode))
                    }
                  a && (e.flags |= 4)
                } else
                  ((r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(r))[
                    hi
                  ] = e),
                    (e.stateNode = r)
              }
              return qs(e), null
            case 13:
              if (
                (Ei(la),
                (r = e.memoizedState),
                null === t ||
                  (null !== t.memoizedState && null !== t.memoizedState.dehydrated))
              ) {
                if (io && null !== ro && 0 != (1 & e.mode) && 0 == (128 & e.flags))
                  fo(), po(), (e.flags |= 98560), (a = !1)
                else if (((a = ho(e)), null !== r && null !== r.dehydrated)) {
                  if (null === t) {
                    if (!a) throw Error(o(318))
                    if (!(a = null !== (a = e.memoizedState) ? a.dehydrated : null))
                      throw Error(o(317))
                    a[hi] = e
                  } else
                    po(),
                      0 == (128 & e.flags) && (e.memoizedState = null),
                      (e.flags |= 4)
                  qs(e), (a = !1)
                } else null !== oo && (sc(oo), (oo = null)), (a = !0)
                if (!a) return 65536 & e.flags ? e : null
              }
              return 0 != (128 & e.flags)
                ? ((e.lanes = n), e)
                : ((r = null !== r) !== (null !== t && null !== t.memoizedState) &&
                    r &&
                    ((e.child.flags |= 8192),
                    0 != (1 & e.mode) &&
                      (null === t || 0 != (1 & la.current)
                        ? 0 === Nl && (Nl = 3)
                        : mc())),
                  null !== e.updateQueue && (e.flags |= 4),
                  qs(e),
                  null)
            case 4:
              return (
                oa(),
                Ls(t, e),
                null === t && Wr(e.stateNode.containerInfo),
                qs(e),
                null
              )
            case 10:
              return ko(e.type._context), qs(e), null
            case 19:
              if ((Ei(la), null === (a = e.memoizedState))) return qs(e), null
              if (((r = 0 != (128 & e.flags)), null === (l = a.rendering)))
                if (r) Ys(a, !1)
                else {
                  if (0 !== Nl || (null !== t && 0 != (128 & t.flags)))
                    for (t = e.child; null !== t; ) {
                      if (null !== (l = ca(t))) {
                        for (
                          e.flags |= 128,
                            Ys(a, !1),
                            null !== (r = l.updateQueue) &&
                              ((e.updateQueue = r), (e.flags |= 4)),
                            e.subtreeFlags = 0,
                            r = n,
                            n = e.child;
                          null !== n;

                        )
                          (t = r),
                            ((a = n).flags &= 14680066),
                            null === (l = a.alternate)
                              ? ((a.childLanes = 0),
                                (a.lanes = t),
                                (a.child = null),
                                (a.subtreeFlags = 0),
                                (a.memoizedProps = null),
                                (a.memoizedState = null),
                                (a.updateQueue = null),
                                (a.dependencies = null),
                                (a.stateNode = null))
                              : ((a.childLanes = l.childLanes),
                                (a.lanes = l.lanes),
                                (a.child = l.child),
                                (a.subtreeFlags = 0),
                                (a.deletions = null),
                                (a.memoizedProps = l.memoizedProps),
                                (a.memoizedState = l.memoizedState),
                                (a.updateQueue = l.updateQueue),
                                (a.type = l.type),
                                (t = l.dependencies),
                                (a.dependencies =
                                  null === t
                                    ? null
                                    : {
                                        lanes: t.lanes,
                                        firstContext: t.firstContext,
                                      })),
                            (n = n.sibling)
                        return Ci(la, (1 & la.current) | 2), e.child
                      }
                      t = t.sibling
                    }
                  null !== a.tail &&
                    Zt() > Vl &&
                    ((e.flags |= 128), (r = !0), Ys(a, !1), (e.lanes = 4194304))
                }
              else {
                if (!r)
                  if (null !== (t = ca(l))) {
                    if (
                      ((e.flags |= 128),
                      (r = !0),
                      null !== (n = t.updateQueue) &&
                        ((e.updateQueue = n), (e.flags |= 4)),
                      Ys(a, !0),
                      null === a.tail &&
                        'hidden' === a.tailMode &&
                        !l.alternate &&
                        !io)
                    )
                      return qs(e), null
                  } else
                    2 * Zt() - a.renderingStartTime > Vl &&
                      1073741824 !== n &&
                      ((e.flags |= 128), (r = !0), Ys(a, !1), (e.lanes = 4194304))
                a.isBackwards
                  ? ((l.sibling = e.child), (e.child = l))
                  : (null !== (n = a.last) ? (n.sibling = l) : (e.child = l),
                    (a.last = l))
              }
              return null !== a.tail
                ? ((e = a.tail),
                  (a.rendering = e),
                  (a.tail = e.sibling),
                  (a.renderingStartTime = Zt()),
                  (e.sibling = null),
                  (n = la.current),
                  Ci(la, r ? (1 & n) | 2 : 1 & n),
                  e)
                : (qs(e), null)
            case 22:
            case 23:
              return (
                hc(),
                (r = null !== e.memoizedState),
                null !== t && (null !== t.memoizedState) !== r && (e.flags |= 8192),
                r && 0 != (1 & e.mode)
                  ? 0 != (1073741824 & Ll) &&
                    (qs(e), 6 & e.subtreeFlags && (e.flags |= 8192))
                  : qs(e),
                null
              )
            case 24:
            case 25:
              return null
          }
          throw Error(o(156, e.tag))
        }
        function Xs(t, e) {
          switch ((eo(e), e.tag)) {
            case 1:
              return (
                Ri(e.type) && Li(),
                65536 & (t = e.flags) ? ((e.flags = (-65537 & t) | 128), e) : null
              )
            case 3:
              return (
                oa(),
                Ei(Oi),
                Ei(Pi),
                da(),
                0 != (65536 & (t = e.flags)) && 0 == (128 & t)
                  ? ((e.flags = (-65537 & t) | 128), e)
                  : null
              )
            case 5:
              return sa(e), null
            case 13:
              if (
                (Ei(la), null !== (t = e.memoizedState) && null !== t.dehydrated)
              ) {
                if (null === e.alternate) throw Error(o(340))
                po()
              }
              return 65536 & (t = e.flags)
                ? ((e.flags = (-65537 & t) | 128), e)
                : null
            case 19:
              return Ei(la), null
            case 4:
              return oa(), null
            case 10:
              return ko(e.type._context), null
            case 22:
            case 23:
              return hc(), null
            default:
              return null
          }
        }
        ;(Rs = function (t, e) {
          for (var n = e.child; null !== n; ) {
            if (5 === n.tag || 6 === n.tag) t.appendChild(n.stateNode)
            else if (4 !== n.tag && null !== n.child) {
              ;(n.child.return = n), (n = n.child)
              continue
            }
            if (n === e) break
            for (; null === n.sibling; ) {
              if (null === n.return || n.return === e) return
              n = n.return
            }
            ;(n.sibling.return = n.return), (n = n.sibling)
          }
        }),
          (Ls = function () {}),
          (As = function (t, e, n, r) {
            var i = t.memoizedProps
            if (i !== r) {
              ;(t = e.stateNode), ra(ta.current)
              var o,
                a = null
              switch (n) {
                case 'input':
                  ;(i = X(t, i)), (r = X(t, r)), (a = [])
                  break
                case 'select':
                  ;(i = z({}, i, { value: void 0 })),
                    (r = z({}, r, { value: void 0 })),
                    (a = [])
                  break
                case 'textarea':
                  ;(i = rt(t, i)), (r = rt(t, r)), (a = [])
                  break
                default:
                  'function' != typeof i.onClick &&
                    'function' == typeof r.onClick &&
                    (t.onclick = Gr)
              }
              for (u in (yt(n, r), (n = null), i))
                if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && null != i[u])
                  if ('style' === u) {
                    var l = i[u]
                    for (o in l) l.hasOwnProperty(o) && (n || (n = {}), (n[o] = ''))
                  } else
                    'dangerouslySetInnerHTML' !== u &&
                      'children' !== u &&
                      'suppressContentEditableWarning' !== u &&
                      'suppressHydrationWarning' !== u &&
                      'autoFocus' !== u &&
                      (s.hasOwnProperty(u)
                        ? a || (a = [])
                        : (a = a || []).push(u, null))
              for (u in r) {
                var c = r[u]
                if (
                  ((l = null != i ? i[u] : void 0),
                  r.hasOwnProperty(u) && c !== l && (null != c || null != l))
                )
                  if ('style' === u)
                    if (l) {
                      for (o in l)
                        !l.hasOwnProperty(o) ||
                          (c && c.hasOwnProperty(o)) ||
                          (n || (n = {}), (n[o] = ''))
                      for (o in c)
                        c.hasOwnProperty(o) &&
                          l[o] !== c[o] &&
                          (n || (n = {}), (n[o] = c[o]))
                    } else n || (a || (a = []), a.push(u, n)), (n = c)
                  else
                    'dangerouslySetInnerHTML' === u
                      ? ((c = c ? c.__html : void 0),
                        (l = l ? l.__html : void 0),
                        null != c && l !== c && (a = a || []).push(u, c))
                      : 'children' === u
                        ? ('string' != typeof c && 'number' != typeof c) ||
                          (a = a || []).push(u, '' + c)
                        : 'suppressContentEditableWarning' !== u &&
                          'suppressHydrationWarning' !== u &&
                          (s.hasOwnProperty(u)
                            ? (null != c && 'onScroll' === u && Ir('scroll', t),
                              a || l === c || (a = []))
                            : (a = a || []).push(u, c))
              }
              n && (a = a || []).push('style', n)
              var u = a
              ;(e.updateQueue = u) && (e.flags |= 4)
            }
          }),
          (Ns = function (t, e, n, r) {
            n !== r && (e.flags |= 4)
          })
        var Ks = !1,
          Zs = !1,
          Js = 'function' == typeof WeakSet ? WeakSet : Set,
          Gs = null
        function tl(t, e) {
          var n = t.ref
          if (null !== n)
            if ('function' == typeof n)
              try {
                n(null)
              } catch (n) {
                Ec(t, e, n)
              }
            else n.current = null
        }
        function el(t, e, n) {
          try {
            n()
          } catch (n) {
            Ec(t, e, n)
          }
        }
        var nl = !1
        function rl(t, e, n) {
          var r = e.updateQueue
          if (null !== (r = null !== r ? r.lastEffect : null)) {
            var i = (r = r.next)
            do {
              if ((i.tag & t) === t) {
                var o = i.destroy
                ;(i.destroy = void 0), void 0 !== o && el(e, n, o)
              }
              i = i.next
            } while (i !== r)
          }
        }
        function il(t, e) {
          if (null !== (e = null !== (e = e.updateQueue) ? e.lastEffect : null)) {
            var n = (e = e.next)
            do {
              if ((n.tag & t) === t) {
                var r = n.create
                n.destroy = r()
              }
              n = n.next
            } while (n !== e)
          }
        }
        function ol(t) {
          var e = t.ref
          if (null !== e) {
            var n = t.stateNode
            t.tag, (t = n), 'function' == typeof e ? e(t) : (e.current = t)
          }
        }
        function al(t) {
          var e = t.alternate
          null !== e && ((t.alternate = null), al(e)),
            (t.child = null),
            (t.deletions = null),
            (t.sibling = null),
            5 === t.tag &&
              null !== (e = t.stateNode) &&
              (delete e[hi],
              delete e[fi],
              delete e[gi],
              delete e[mi],
              delete e[bi]),
            (t.stateNode = null),
            (t.return = null),
            (t.dependencies = null),
            (t.memoizedProps = null),
            (t.memoizedState = null),
            (t.pendingProps = null),
            (t.stateNode = null),
            (t.updateQueue = null)
        }
        function sl(t) {
          return 5 === t.tag || 3 === t.tag || 4 === t.tag
        }
        function ll(t) {
          t: for (;;) {
            for (; null === t.sibling; ) {
              if (null === t.return || sl(t.return)) return null
              t = t.return
            }
            for (
              t.sibling.return = t.return, t = t.sibling;
              5 !== t.tag && 6 !== t.tag && 18 !== t.tag;

            ) {
              if (2 & t.flags) continue t
              if (null === t.child || 4 === t.tag) continue t
              ;(t.child.return = t), (t = t.child)
            }
            if (!(2 & t.flags)) return t.stateNode
          }
        }
        function cl(t, e, n) {
          var r = t.tag
          if (5 === r || 6 === r)
            (t = t.stateNode),
              e
                ? 8 === n.nodeType
                  ? n.parentNode.insertBefore(t, e)
                  : n.insertBefore(t, e)
                : (8 === n.nodeType
                    ? (e = n.parentNode).insertBefore(t, n)
                    : (e = n).appendChild(t),
                  null != (n = n._reactRootContainer) ||
                    null !== e.onclick ||
                    (e.onclick = Gr))
          else if (4 !== r && null !== (t = t.child))
            for (cl(t, e, n), t = t.sibling; null !== t; )
              cl(t, e, n), (t = t.sibling)
        }
        function ul(t, e, n) {
          var r = t.tag
          if (5 === r || 6 === r)
            (t = t.stateNode), e ? n.insertBefore(t, e) : n.appendChild(t)
          else if (4 !== r && null !== (t = t.child))
            for (ul(t, e, n), t = t.sibling; null !== t; )
              ul(t, e, n), (t = t.sibling)
        }
        var dl = null,
          hl = !1
        function fl(t, e, n) {
          for (n = n.child; null !== n; ) pl(t, e, n), (n = n.sibling)
        }
        function pl(t, e, n) {
          if (oe && 'function' == typeof oe.onCommitFiberUnmount)
            try {
              oe.onCommitFiberUnmount(ie, n)
            } catch (t) {}
          switch (n.tag) {
            case 5:
              Zs || tl(n, e)
            case 6:
              var r = dl,
                i = hl
              ;(dl = null),
                fl(t, e, n),
                (hl = i),
                null !== (dl = r) &&
                  (hl
                    ? ((t = dl),
                      (n = n.stateNode),
                      8 === t.nodeType
                        ? t.parentNode.removeChild(n)
                        : t.removeChild(n))
                    : dl.removeChild(n.stateNode))
              break
            case 18:
              null !== dl &&
                (hl
                  ? ((t = dl),
                    (n = n.stateNode),
                    8 === t.nodeType
                      ? li(t.parentNode, n)
                      : 1 === t.nodeType && li(t, n),
                    We(t))
                  : li(dl, n.stateNode))
              break
            case 4:
              ;(r = dl),
                (i = hl),
                (dl = n.stateNode.containerInfo),
                (hl = !0),
                fl(t, e, n),
                (dl = r),
                (hl = i)
              break
            case 0:
            case 11:
            case 14:
            case 15:
              if (
                !Zs &&
                null !== (r = n.updateQueue) &&
                null !== (r = r.lastEffect)
              ) {
                i = r = r.next
                do {
                  var o = i,
                    a = o.destroy
                  ;(o = o.tag),
                    void 0 !== a && (0 != (2 & o) || 0 != (4 & o)) && el(n, e, a),
                    (i = i.next)
                } while (i !== r)
              }
              fl(t, e, n)
              break
            case 1:
              if (
                !Zs &&
                (tl(n, e),
                'function' == typeof (r = n.stateNode).componentWillUnmount)
              )
                try {
                  ;(r.props = n.memoizedProps),
                    (r.state = n.memoizedState),
                    r.componentWillUnmount()
                } catch (t) {
                  Ec(n, e, t)
                }
              fl(t, e, n)
              break
            case 21:
              fl(t, e, n)
              break
            case 22:
              1 & n.mode
                ? ((Zs = (r = Zs) || null !== n.memoizedState),
                  fl(t, e, n),
                  (Zs = r))
                : fl(t, e, n)
              break
            default:
              fl(t, e, n)
          }
        }
        function gl(t) {
          var e = t.updateQueue
          if (null !== e) {
            t.updateQueue = null
            var n = t.stateNode
            null === n && (n = t.stateNode = new Js()),
              e.forEach(function (e) {
                var r = Oc.bind(null, t, e)
                n.has(e) || (n.add(e), e.then(r, r))
              })
          }
        }
        function ml(t, e) {
          var n = e.deletions
          if (null !== n)
            for (var r = 0; r < n.length; r++) {
              var i = n[r]
              try {
                var a = t,
                  s = e,
                  l = s
                t: for (; null !== l; ) {
                  switch (l.tag) {
                    case 5:
                      ;(dl = l.stateNode), (hl = !1)
                      break t
                    case 3:
                    case 4:
                      ;(dl = l.stateNode.containerInfo), (hl = !0)
                      break t
                  }
                  l = l.return
                }
                if (null === dl) throw Error(o(160))
                pl(a, s, i), (dl = null), (hl = !1)
                var c = i.alternate
                null !== c && (c.return = null), (i.return = null)
              } catch (t) {
                Ec(i, e, t)
              }
            }
          if (12854 & e.subtreeFlags)
            for (e = e.child; null !== e; ) bl(e, t), (e = e.sibling)
        }
        function bl(t, e) {
          var n = t.alternate,
            r = t.flags
          switch (t.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
              if ((ml(e, t), yl(t), 4 & r)) {
                try {
                  rl(3, t, t.return), il(3, t)
                } catch (e) {
                  Ec(t, t.return, e)
                }
                try {
                  rl(5, t, t.return)
                } catch (e) {
                  Ec(t, t.return, e)
                }
              }
              break
            case 1:
              ml(e, t), yl(t), 512 & r && null !== n && tl(n, n.return)
              break
            case 5:
              if (
                (ml(e, t),
                yl(t),
                512 & r && null !== n && tl(n, n.return),
                32 & t.flags)
              ) {
                var i = t.stateNode
                try {
                  ht(i, '')
                } catch (e) {
                  Ec(t, t.return, e)
                }
              }
              if (4 & r && null != (i = t.stateNode)) {
                var a = t.memoizedProps,
                  s = null !== n ? n.memoizedProps : a,
                  l = t.type,
                  c = t.updateQueue
                if (((t.updateQueue = null), null !== c))
                  try {
                    'input' === l &&
                      'radio' === a.type &&
                      null != a.name &&
                      Z(i, a),
                      vt(l, s)
                    var u = vt(l, a)
                    for (s = 0; s < c.length; s += 2) {
                      var d = c[s],
                        h = c[s + 1]
                      'style' === d
                        ? mt(i, h)
                        : 'dangerouslySetInnerHTML' === d
                          ? dt(i, h)
                          : 'children' === d
                            ? ht(i, h)
                            : v(i, d, h, u)
                    }
                    switch (l) {
                      case 'input':
                        J(i, a)
                        break
                      case 'textarea':
                        ot(i, a)
                        break
                      case 'select':
                        var f = i._wrapperState.wasMultiple
                        i._wrapperState.wasMultiple = !!a.multiple
                        var p = a.value
                        null != p
                          ? nt(i, !!a.multiple, p, !1)
                          : f !== !!a.multiple &&
                            (null != a.defaultValue
                              ? nt(i, !!a.multiple, a.defaultValue, !0)
                              : nt(i, !!a.multiple, a.multiple ? [] : '', !1))
                    }
                    i[fi] = a
                  } catch (e) {
                    Ec(t, t.return, e)
                  }
              }
              break
            case 6:
              if ((ml(e, t), yl(t), 4 & r)) {
                if (null === t.stateNode) throw Error(o(162))
                ;(i = t.stateNode), (a = t.memoizedProps)
                try {
                  i.nodeValue = a
                } catch (e) {
                  Ec(t, t.return, e)
                }
              }
              break
            case 3:
              if (
                (ml(e, t),
                yl(t),
                4 & r && null !== n && n.memoizedState.isDehydrated)
              )
                try {
                  We(e.containerInfo)
                } catch (e) {
                  Ec(t, t.return, e)
                }
              break
            case 4:
            default:
              ml(e, t), yl(t)
              break
            case 13:
              ml(e, t),
                yl(t),
                8192 & (i = t.child).flags &&
                  ((a = null !== i.memoizedState),
                  (i.stateNode.isHidden = a),
                  !a ||
                    (null !== i.alternate && null !== i.alternate.memoizedState) ||
                    (Wl = Zt())),
                4 & r && gl(t)
              break
            case 22:
              if (
                ((d = null !== n && null !== n.memoizedState),
                1 & t.mode ? ((Zs = (u = Zs) || d), ml(e, t), (Zs = u)) : ml(e, t),
                yl(t),
                8192 & r)
              ) {
                if (
                  ((u = null !== t.memoizedState),
                  (t.stateNode.isHidden = u) && !d && 0 != (1 & t.mode))
                )
                  for (Gs = t, d = t.child; null !== d; ) {
                    for (h = Gs = d; null !== Gs; ) {
                      switch (((p = (f = Gs).child), f.tag)) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                          rl(4, f, f.return)
                          break
                        case 1:
                          tl(f, f.return)
                          var g = f.stateNode
                          if ('function' == typeof g.componentWillUnmount) {
                            ;(r = f), (n = f.return)
                            try {
                              ;(e = r),
                                (g.props = e.memoizedProps),
                                (g.state = e.memoizedState),
                                g.componentWillUnmount()
                            } catch (t) {
                              Ec(r, n, t)
                            }
                          }
                          break
                        case 5:
                          tl(f, f.return)
                          break
                        case 22:
                          if (null !== f.memoizedState) {
                            _l(h)
                            continue
                          }
                      }
                      null !== p ? ((p.return = f), (Gs = p)) : _l(h)
                    }
                    d = d.sibling
                  }
                t: for (d = null, h = t; ; ) {
                  if (5 === h.tag) {
                    if (null === d) {
                      d = h
                      try {
                        ;(i = h.stateNode),
                          u
                            ? 'function' == typeof (a = i.style).setProperty
                              ? a.setProperty('display', 'none', 'important')
                              : (a.display = 'none')
                            : ((l = h.stateNode),
                              (s =
                                null != (c = h.memoizedProps.style) &&
                                c.hasOwnProperty('display')
                                  ? c.display
                                  : null),
                              (l.style.display = gt('display', s)))
                      } catch (e) {
                        Ec(t, t.return, e)
                      }
                    }
                  } else if (6 === h.tag) {
                    if (null === d)
                      try {
                        h.stateNode.nodeValue = u ? '' : h.memoizedProps
                      } catch (e) {
                        Ec(t, t.return, e)
                      }
                  } else if (
                    ((22 !== h.tag && 23 !== h.tag) ||
                      null === h.memoizedState ||
                      h === t) &&
                    null !== h.child
                  ) {
                    ;(h.child.return = h), (h = h.child)
                    continue
                  }
                  if (h === t) break t
                  for (; null === h.sibling; ) {
                    if (null === h.return || h.return === t) break t
                    d === h && (d = null), (h = h.return)
                  }
                  d === h && (d = null),
                    (h.sibling.return = h.return),
                    (h = h.sibling)
                }
              }
              break
            case 19:
              ml(e, t), yl(t), 4 & r && gl(t)
            case 21:
          }
        }
        function yl(t) {
          var e = t.flags
          if (2 & e) {
            try {
              t: {
                for (var n = t.return; null !== n; ) {
                  if (sl(n)) {
                    var r = n
                    break t
                  }
                  n = n.return
                }
                throw Error(o(160))
              }
              switch (r.tag) {
                case 5:
                  var i = r.stateNode
                  32 & r.flags && (ht(i, ''), (r.flags &= -33)), ul(t, ll(t), i)
                  break
                case 3:
                case 4:
                  var a = r.stateNode.containerInfo
                  cl(t, ll(t), a)
                  break
                default:
                  throw Error(o(161))
              }
            } catch (e) {
              Ec(t, t.return, e)
            }
            t.flags &= -3
          }
          4096 & e && (t.flags &= -4097)
        }
        function vl(t, e, n) {
          ;(Gs = t), xl(t, e, n)
        }
        function xl(t, e, n) {
          for (var r = 0 != (1 & t.mode); null !== Gs; ) {
            var i = Gs,
              o = i.child
            if (22 === i.tag && r) {
              var a = null !== i.memoizedState || Ks
              if (!a) {
                var s = i.alternate,
                  l = (null !== s && null !== s.memoizedState) || Zs
                s = Ks
                var c = Zs
                if (((Ks = a), (Zs = l) && !c))
                  for (Gs = i; null !== Gs; )
                    (l = (a = Gs).child),
                      22 === a.tag && null !== a.memoizedState
                        ? kl(i)
                        : null !== l
                          ? ((l.return = a), (Gs = l))
                          : kl(i)
                for (; null !== o; ) (Gs = o), xl(o, e, n), (o = o.sibling)
                ;(Gs = i), (Ks = s), (Zs = c)
              }
              wl(t)
            } else
              0 != (8772 & i.subtreeFlags) && null !== o
                ? ((o.return = i), (Gs = o))
                : wl(t)
          }
        }
        function wl(t) {
          for (; null !== Gs; ) {
            var e = Gs
            if (0 != (8772 & e.flags)) {
              var n = e.alternate
              try {
                if (0 != (8772 & e.flags))
                  switch (e.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Zs || il(5, e)
                      break
                    case 1:
                      var r = e.stateNode
                      if (4 & e.flags && !Zs)
                        if (null === n) r.componentDidMount()
                        else {
                          var i =
                            e.elementType === e.type
                              ? n.memoizedProps
                              : bo(e.type, n.memoizedProps)
                          r.componentDidUpdate(
                            i,
                            n.memoizedState,
                            r.__reactInternalSnapshotBeforeUpdate,
                          )
                        }
                      var a = e.updateQueue
                      null !== a && Io(e, a, r)
                      break
                    case 3:
                      var s = e.updateQueue
                      if (null !== s) {
                        if (((n = null), null !== e.child))
                          switch (e.child.tag) {
                            case 5:
                            case 1:
                              n = e.child.stateNode
                          }
                        Io(e, s, n)
                      }
                      break
                    case 5:
                      var l = e.stateNode
                      if (null === n && 4 & e.flags) {
                        n = l
                        var c = e.memoizedProps
                        switch (e.type) {
                          case 'button':
                          case 'input':
                          case 'select':
                          case 'textarea':
                            c.autoFocus && n.focus()
                            break
                          case 'img':
                            c.src && (n.src = c.src)
                        }
                      }
                      break
                    case 6:
                    case 4:
                    case 12:
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                      break
                    case 13:
                      if (null === e.memoizedState) {
                        var u = e.alternate
                        if (null !== u) {
                          var d = u.memoizedState
                          if (null !== d) {
                            var h = d.dehydrated
                            null !== h && We(h)
                          }
                        }
                      }
                      break
                    default:
                      throw Error(o(163))
                  }
                Zs || (512 & e.flags && ol(e))
              } catch (t) {
                Ec(e, e.return, t)
              }
            }
            if (e === t) {
              Gs = null
              break
            }
            if (null !== (n = e.sibling)) {
              ;(n.return = e.return), (Gs = n)
              break
            }
            Gs = e.return
          }
        }
        function _l(t) {
          for (; null !== Gs; ) {
            var e = Gs
            if (e === t) {
              Gs = null
              break
            }
            var n = e.sibling
            if (null !== n) {
              ;(n.return = e.return), (Gs = n)
              break
            }
            Gs = e.return
          }
        }
        function kl(t) {
          for (; null !== Gs; ) {
            var e = Gs
            try {
              switch (e.tag) {
                case 0:
                case 11:
                case 15:
                  var n = e.return
                  try {
                    il(4, e)
                  } catch (t) {
                    Ec(e, n, t)
                  }
                  break
                case 1:
                  var r = e.stateNode
                  if ('function' == typeof r.componentDidMount) {
                    var i = e.return
                    try {
                      r.componentDidMount()
                    } catch (t) {
                      Ec(e, i, t)
                    }
                  }
                  var o = e.return
                  try {
                    ol(e)
                  } catch (t) {
                    Ec(e, o, t)
                  }
                  break
                case 5:
                  var a = e.return
                  try {
                    ol(e)
                  } catch (t) {
                    Ec(e, a, t)
                  }
              }
            } catch (t) {
              Ec(e, e.return, t)
            }
            if (e === t) {
              Gs = null
              break
            }
            var s = e.sibling
            if (null !== s) {
              ;(s.return = e.return), (Gs = s)
              break
            }
            Gs = e.return
          }
        }
        var Sl,
          El = Math.ceil,
          Cl = x.ReactCurrentDispatcher,
          Ml = x.ReactCurrentOwner,
          Pl = x.ReactCurrentBatchConfig,
          Ol = 0,
          Dl = null,
          Tl = null,
          Rl = 0,
          Ll = 0,
          Al = Si(0),
          Nl = 0,
          jl = null,
          zl = 0,
          Fl = 0,
          Il = 0,
          Bl = null,
          Ul = null,
          Wl = 0,
          Vl = 1 / 0,
          Hl = null,
          $l = !1,
          Yl = null,
          ql = null,
          Ql = !1,
          Xl = null,
          Kl = 0,
          Zl = 0,
          Jl = null,
          Gl = -1,
          tc = 0
        function ec() {
          return 0 != (6 & Ol) ? Zt() : -1 !== Gl ? Gl : (Gl = Zt())
        }
        function nc(t) {
          return 0 == (1 & t.mode)
            ? 1
            : 0 != (2 & Ol) && 0 !== Rl
              ? Rl & -Rl
              : null !== mo.transition
                ? (0 === tc && (tc = ge()), tc)
                : 0 !== (t = ve)
                  ? t
                  : (t = void 0 === (t = window.event) ? 16 : Ke(t.type))
        }
        function rc(t, e, n, r) {
          if (50 < Zl) throw ((Zl = 0), (Jl = null), Error(o(185)))
          be(t, n, r),
            (0 != (2 & Ol) && t === Dl) ||
              (t === Dl && (0 == (2 & Ol) && (Fl |= n), 4 === Nl && lc(t, Rl)),
              ic(t, r),
              1 === n &&
                0 === Ol &&
                0 == (1 & e.mode) &&
                ((Vl = Zt() + 500), Ii && Wi()))
        }
        function ic(t, e) {
          var n = t.callbackNode
          !(function (t, e) {
            for (
              var n = t.suspendedLanes,
                r = t.pingedLanes,
                i = t.expirationTimes,
                o = t.pendingLanes;
              0 < o;

            ) {
              var a = 31 - ae(o),
                s = 1 << a,
                l = i[a]
              ;-1 === l
                ? (0 != (s & n) && 0 == (s & r)) || (i[a] = fe(s, e))
                : l <= e && (t.expiredLanes |= s),
                (o &= ~s)
            }
          })(t, e)
          var r = he(t, t === Dl ? Rl : 0)
          if (0 === r)
            null !== n && Qt(n), (t.callbackNode = null), (t.callbackPriority = 0)
          else if (((e = r & -r), t.callbackPriority !== e)) {
            if ((null != n && Qt(n), 1 === e))
              0 === t.tag
                ? (function (t) {
                    ;(Ii = !0), Ui(t)
                  })(cc.bind(null, t))
                : Ui(cc.bind(null, t)),
                ai(function () {
                  0 == (6 & Ol) && Wi()
                }),
                (n = null)
            else {
              switch (xe(r)) {
                case 1:
                  n = Gt
                  break
                case 4:
                  n = te
                  break
                case 16:
                default:
                  n = ee
                  break
                case 536870912:
                  n = re
              }
              n = Dc(n, oc.bind(null, t))
            }
            ;(t.callbackPriority = e), (t.callbackNode = n)
          }
        }
        function oc(t, e) {
          if (((Gl = -1), (tc = 0), 0 != (6 & Ol))) throw Error(o(327))
          var n = t.callbackNode
          if (kc() && t.callbackNode !== n) return null
          var r = he(t, t === Dl ? Rl : 0)
          if (0 === r) return null
          if (0 != (30 & r) || 0 != (r & t.expiredLanes) || e) e = bc(t, r)
          else {
            e = r
            var i = Ol
            Ol |= 2
            var a = gc()
            for (
              (Dl === t && Rl === e) || ((Hl = null), (Vl = Zt() + 500), fc(t, e));
              ;

            )
              try {
                vc()
                break
              } catch (e) {
                pc(t, e)
              }
            _o(),
              (Cl.current = a),
              (Ol = i),
              null !== Tl ? (e = 0) : ((Dl = null), (Rl = 0), (e = Nl))
          }
          if (0 !== e) {
            if (
              (2 === e && 0 !== (i = pe(t)) && ((r = i), (e = ac(t, i))), 1 === e)
            )
              throw ((n = jl), fc(t, 0), lc(t, r), ic(t, Zt()), n)
            if (6 === e) lc(t, r)
            else {
              if (
                ((i = t.current.alternate),
                0 == (30 & r) &&
                  !(function (t) {
                    for (var e = t; ; ) {
                      if (16384 & e.flags) {
                        var n = e.updateQueue
                        if (null !== n && null !== (n = n.stores))
                          for (var r = 0; r < n.length; r++) {
                            var i = n[r],
                              o = i.getSnapshot
                            i = i.value
                            try {
                              if (!sr(o(), i)) return !1
                            } catch (t) {
                              return !1
                            }
                          }
                      }
                      if (((n = e.child), 16384 & e.subtreeFlags && null !== n))
                        (n.return = e), (e = n)
                      else {
                        if (e === t) break
                        for (; null === e.sibling; ) {
                          if (null === e.return || e.return === t) return !0
                          e = e.return
                        }
                        ;(e.sibling.return = e.return), (e = e.sibling)
                      }
                    }
                    return !0
                  })(i) &&
                  (2 === (e = bc(t, r)) &&
                    0 !== (a = pe(t)) &&
                    ((r = a), (e = ac(t, a))),
                  1 === e))
              )
                throw ((n = jl), fc(t, 0), lc(t, r), ic(t, Zt()), n)
              switch (((t.finishedWork = i), (t.finishedLanes = r), e)) {
                case 0:
                case 1:
                  throw Error(o(345))
                case 2:
                case 5:
                  _c(t, Ul, Hl)
                  break
                case 3:
                  if (
                    (lc(t, r), (130023424 & r) === r && 10 < (e = Wl + 500 - Zt()))
                  ) {
                    if (0 !== he(t, 0)) break
                    if (((i = t.suspendedLanes) & r) !== r) {
                      ec(), (t.pingedLanes |= t.suspendedLanes & i)
                      break
                    }
                    t.timeoutHandle = ri(_c.bind(null, t, Ul, Hl), e)
                    break
                  }
                  _c(t, Ul, Hl)
                  break
                case 4:
                  if ((lc(t, r), (4194240 & r) === r)) break
                  for (e = t.eventTimes, i = -1; 0 < r; ) {
                    var s = 31 - ae(r)
                    ;(a = 1 << s), (s = e[s]) > i && (i = s), (r &= ~a)
                  }
                  if (
                    ((r = i),
                    10 <
                      (r =
                        (120 > (r = Zt() - r)
                          ? 120
                          : 480 > r
                            ? 480
                            : 1080 > r
                              ? 1080
                              : 1920 > r
                                ? 1920
                                : 3e3 > r
                                  ? 3e3
                                  : 4320 > r
                                    ? 4320
                                    : 1960 * El(r / 1960)) - r))
                  ) {
                    t.timeoutHandle = ri(_c.bind(null, t, Ul, Hl), r)
                    break
                  }
                  _c(t, Ul, Hl)
                  break
                default:
                  throw Error(o(329))
              }
            }
          }
          return ic(t, Zt()), t.callbackNode === n ? oc.bind(null, t) : null
        }
        function ac(t, e) {
          var n = Bl
          return (
            t.current.memoizedState.isDehydrated && (fc(t, e).flags |= 256),
            2 !== (t = bc(t, e)) && ((e = Ul), (Ul = n), null !== e && sc(e)),
            t
          )
        }
        function sc(t) {
          null === Ul ? (Ul = t) : Ul.push.apply(Ul, t)
        }
        function lc(t, e) {
          for (
            e &= ~Il,
              e &= ~Fl,
              t.suspendedLanes |= e,
              t.pingedLanes &= ~e,
              t = t.expirationTimes;
            0 < e;

          ) {
            var n = 31 - ae(e),
              r = 1 << n
            ;(t[n] = -1), (e &= ~r)
          }
        }
        function cc(t) {
          if (0 != (6 & Ol)) throw Error(o(327))
          kc()
          var e = he(t, 0)
          if (0 == (1 & e)) return ic(t, Zt()), null
          var n = bc(t, e)
          if (0 !== t.tag && 2 === n) {
            var r = pe(t)
            0 !== r && ((e = r), (n = ac(t, r)))
          }
          if (1 === n) throw ((n = jl), fc(t, 0), lc(t, e), ic(t, Zt()), n)
          if (6 === n) throw Error(o(345))
          return (
            (t.finishedWork = t.current.alternate),
            (t.finishedLanes = e),
            _c(t, Ul, Hl),
            ic(t, Zt()),
            null
          )
        }
        function uc(t, e) {
          var n = Ol
          Ol |= 1
          try {
            return t(e)
          } finally {
            0 === (Ol = n) && ((Vl = Zt() + 500), Ii && Wi())
          }
        }
        function dc(t) {
          null !== Xl && 0 === Xl.tag && 0 == (6 & Ol) && kc()
          var e = Ol
          Ol |= 1
          var n = Pl.transition,
            r = ve
          try {
            if (((Pl.transition = null), (ve = 1), t)) return t()
          } finally {
            ;(ve = r), (Pl.transition = n), 0 == (6 & (Ol = e)) && Wi()
          }
        }
        function hc() {
          ;(Ll = Al.current), Ei(Al)
        }
        function fc(t, e) {
          ;(t.finishedWork = null), (t.finishedLanes = 0)
          var n = t.timeoutHandle
          if ((-1 !== n && ((t.timeoutHandle = -1), ii(n)), null !== Tl))
            for (n = Tl.return; null !== n; ) {
              var r = n
              switch ((eo(r), r.tag)) {
                case 1:
                  null != (r = r.type.childContextTypes) && Li()
                  break
                case 3:
                  oa(), Ei(Oi), Ei(Pi), da()
                  break
                case 5:
                  sa(r)
                  break
                case 4:
                  oa()
                  break
                case 13:
                case 19:
                  Ei(la)
                  break
                case 10:
                  ko(r.type._context)
                  break
                case 22:
                case 23:
                  hc()
              }
              n = n.return
            }
          if (
            ((Dl = t),
            (Tl = t = Ac(t.current, null)),
            (Rl = Ll = e),
            (Nl = 0),
            (jl = null),
            (Il = Fl = zl = 0),
            (Ul = Bl = null),
            null !== Mo)
          ) {
            for (e = 0; e < Mo.length; e++)
              if (null !== (r = (n = Mo[e]).interleaved)) {
                n.interleaved = null
                var i = r.next,
                  o = n.pending
                if (null !== o) {
                  var a = o.next
                  ;(o.next = i), (r.next = a)
                }
                n.pending = r
              }
            Mo = null
          }
          return t
        }
        function pc(t, e) {
          for (;;) {
            var n = Tl
            try {
              if ((_o(), (ha.current = as), ya)) {
                for (var r = ga.memoizedState; null !== r; ) {
                  var i = r.queue
                  null !== i && (i.pending = null), (r = r.next)
                }
                ya = !1
              }
              if (
                ((pa = 0),
                (ba = ma = ga = null),
                (va = !1),
                (xa = 0),
                (Ml.current = null),
                null === n || null === n.return)
              ) {
                ;(Nl = 1), (jl = e), (Tl = null)
                break
              }
              t: {
                var a = t,
                  s = n.return,
                  l = n,
                  c = e
                if (
                  ((e = Rl),
                  (l.flags |= 32768),
                  null !== c && 'object' == typeof c && 'function' == typeof c.then)
                ) {
                  var u = c,
                    d = l,
                    h = d.tag
                  if (0 == (1 & d.mode) && (0 === h || 11 === h || 15 === h)) {
                    var f = d.alternate
                    f
                      ? ((d.updateQueue = f.updateQueue),
                        (d.memoizedState = f.memoizedState),
                        (d.lanes = f.lanes))
                      : ((d.updateQueue = null), (d.memoizedState = null))
                  }
                  var p = bs(s)
                  if (null !== p) {
                    ;(p.flags &= -257),
                      ys(p, s, l, 0, e),
                      1 & p.mode && ms(a, u, e),
                      (c = u)
                    var g = (e = p).updateQueue
                    if (null === g) {
                      var m = new Set()
                      m.add(c), (e.updateQueue = m)
                    } else g.add(c)
                    break t
                  }
                  if (0 == (1 & e)) {
                    ms(a, u, e), mc()
                    break t
                  }
                  c = Error(o(426))
                } else if (io && 1 & l.mode) {
                  var b = bs(s)
                  if (null !== b) {
                    0 == (65536 & b.flags) && (b.flags |= 256),
                      ys(b, s, l, 0, e),
                      go(us(c, l))
                    break t
                  }
                }
                ;(a = c = us(c, l)),
                  4 !== Nl && (Nl = 2),
                  null === Bl ? (Bl = [a]) : Bl.push(a),
                  (a = s)
                do {
                  switch (a.tag) {
                    case 3:
                      ;(a.flags |= 65536),
                        (e &= -e),
                        (a.lanes |= e),
                        zo(a, ps(0, c, e))
                      break t
                    case 1:
                      l = c
                      var y = a.type,
                        v = a.stateNode
                      if (
                        0 == (128 & a.flags) &&
                        ('function' == typeof y.getDerivedStateFromError ||
                          (null !== v &&
                            'function' == typeof v.componentDidCatch &&
                            (null === ql || !ql.has(v))))
                      ) {
                        ;(a.flags |= 65536),
                          (e &= -e),
                          (a.lanes |= e),
                          zo(a, gs(a, l, e))
                        break t
                      }
                  }
                  a = a.return
                } while (null !== a)
              }
              wc(n)
            } catch (t) {
              ;(e = t), Tl === n && null !== n && (Tl = n = n.return)
              continue
            }
            break
          }
        }
        function gc() {
          var t = Cl.current
          return (Cl.current = as), null === t ? as : t
        }
        function mc() {
          ;(0 !== Nl && 3 !== Nl && 2 !== Nl) || (Nl = 4),
            null === Dl ||
              (0 == (268435455 & zl) && 0 == (268435455 & Fl)) ||
              lc(Dl, Rl)
        }
        function bc(t, e) {
          var n = Ol
          Ol |= 2
          var r = gc()
          for ((Dl === t && Rl === e) || ((Hl = null), fc(t, e)); ; )
            try {
              yc()
              break
            } catch (e) {
              pc(t, e)
            }
          if ((_o(), (Ol = n), (Cl.current = r), null !== Tl)) throw Error(o(261))
          return (Dl = null), (Rl = 0), Nl
        }
        function yc() {
          for (; null !== Tl; ) xc(Tl)
        }
        function vc() {
          for (; null !== Tl && !Xt(); ) xc(Tl)
        }
        function xc(t) {
          var e = Sl(t.alternate, t, Ll)
          ;(t.memoizedProps = t.pendingProps),
            null === e ? wc(t) : (Tl = e),
            (Ml.current = null)
        }
        function wc(t) {
          var e = t
          do {
            var n = e.alternate
            if (((t = e.return), 0 == (32768 & e.flags))) {
              if (null !== (n = Qs(n, e, Ll))) return void (Tl = n)
            } else {
              if (null !== (n = Xs(n, e))) return (n.flags &= 32767), void (Tl = n)
              if (null === t) return (Nl = 6), void (Tl = null)
              ;(t.flags |= 32768), (t.subtreeFlags = 0), (t.deletions = null)
            }
            if (null !== (e = e.sibling)) return void (Tl = e)
            Tl = e = t
          } while (null !== e)
          0 === Nl && (Nl = 5)
        }
        function _c(t, e, n) {
          var r = ve,
            i = Pl.transition
          try {
            ;(Pl.transition = null),
              (ve = 1),
              (function (t, e, n, r) {
                do {
                  kc()
                } while (null !== Xl)
                if (0 != (6 & Ol)) throw Error(o(327))
                n = t.finishedWork
                var i = t.finishedLanes
                if (null === n) return null
                if (
                  ((t.finishedWork = null), (t.finishedLanes = 0), n === t.current)
                )
                  throw Error(o(177))
                ;(t.callbackNode = null), (t.callbackPriority = 0)
                var a = n.lanes | n.childLanes
                if (
                  ((function (t, e) {
                    var n = t.pendingLanes & ~e
                    ;(t.pendingLanes = e),
                      (t.suspendedLanes = 0),
                      (t.pingedLanes = 0),
                      (t.expiredLanes &= e),
                      (t.mutableReadLanes &= e),
                      (t.entangledLanes &= e),
                      (e = t.entanglements)
                    var r = t.eventTimes
                    for (t = t.expirationTimes; 0 < n; ) {
                      var i = 31 - ae(n),
                        o = 1 << i
                      ;(e[i] = 0), (r[i] = -1), (t[i] = -1), (n &= ~o)
                    }
                  })(t, a),
                  t === Dl && ((Tl = Dl = null), (Rl = 0)),
                  (0 == (2064 & n.subtreeFlags) && 0 == (2064 & n.flags)) ||
                    Ql ||
                    ((Ql = !0),
                    Dc(ee, function () {
                      return kc(), null
                    })),
                  (a = 0 != (15990 & n.flags)),
                  0 != (15990 & n.subtreeFlags) || a)
                ) {
                  ;(a = Pl.transition), (Pl.transition = null)
                  var s = ve
                  ve = 1
                  var l = Ol
                  ;(Ol |= 4),
                    (Ml.current = null),
                    (function (t, e) {
                      if (((ti = He), fr((t = hr())))) {
                        if ('selectionStart' in t)
                          var n = { start: t.selectionStart, end: t.selectionEnd }
                        else
                          t: {
                            var r =
                              (n =
                                ((n = t.ownerDocument) && n.defaultView) || window)
                                .getSelection && n.getSelection()
                            if (r && 0 !== r.rangeCount) {
                              n = r.anchorNode
                              var i = r.anchorOffset,
                                a = r.focusNode
                              r = r.focusOffset
                              try {
                                n.nodeType, a.nodeType
                              } catch (t) {
                                n = null
                                break t
                              }
                              var s = 0,
                                l = -1,
                                c = -1,
                                u = 0,
                                d = 0,
                                h = t,
                                f = null
                              e: for (;;) {
                                for (
                                  var p;
                                  h !== n ||
                                    (0 !== i && 3 !== h.nodeType) ||
                                    (l = s + i),
                                    h !== a ||
                                      (0 !== r && 3 !== h.nodeType) ||
                                      (c = s + r),
                                    3 === h.nodeType && (s += h.nodeValue.length),
                                    null !== (p = h.firstChild);

                                )
                                  (f = h), (h = p)
                                for (;;) {
                                  if (h === t) break e
                                  if (
                                    (f === n && ++u === i && (l = s),
                                    f === a && ++d === r && (c = s),
                                    null !== (p = h.nextSibling))
                                  )
                                    break
                                  f = (h = f).parentNode
                                }
                                h = p
                              }
                              n = -1 === l || -1 === c ? null : { start: l, end: c }
                            } else n = null
                          }
                        n = n || { start: 0, end: 0 }
                      } else n = null
                      for (
                        ei = { focusedElem: t, selectionRange: n }, He = !1, Gs = e;
                        null !== Gs;

                      )
                        if (
                          ((t = (e = Gs).child),
                          0 != (1028 & e.subtreeFlags) && null !== t)
                        )
                          (t.return = e), (Gs = t)
                        else
                          for (; null !== Gs; ) {
                            e = Gs
                            try {
                              var g = e.alternate
                              if (0 != (1024 & e.flags))
                                switch (e.tag) {
                                  case 0:
                                  case 11:
                                  case 15:
                                  case 5:
                                  case 6:
                                  case 4:
                                  case 17:
                                    break
                                  case 1:
                                    if (null !== g) {
                                      var m = g.memoizedProps,
                                        b = g.memoizedState,
                                        y = e.stateNode,
                                        v = y.getSnapshotBeforeUpdate(
                                          e.elementType === e.type
                                            ? m
                                            : bo(e.type, m),
                                          b,
                                        )
                                      y.__reactInternalSnapshotBeforeUpdate = v
                                    }
                                    break
                                  case 3:
                                    var x = e.stateNode.containerInfo
                                    1 === x.nodeType
                                      ? (x.textContent = '')
                                      : 9 === x.nodeType &&
                                        x.documentElement &&
                                        x.removeChild(x.documentElement)
                                    break
                                  default:
                                    throw Error(o(163))
                                }
                            } catch (t) {
                              Ec(e, e.return, t)
                            }
                            if (null !== (t = e.sibling)) {
                              ;(t.return = e.return), (Gs = t)
                              break
                            }
                            Gs = e.return
                          }
                      ;(g = nl), (nl = !1)
                    })(t, n),
                    bl(n, t),
                    pr(ei),
                    (He = !!ti),
                    (ei = ti = null),
                    (t.current = n),
                    vl(n, t, i),
                    Kt(),
                    (Ol = l),
                    (ve = s),
                    (Pl.transition = a)
                } else t.current = n
                if (
                  (Ql && ((Ql = !1), (Xl = t), (Kl = i)),
                  (a = t.pendingLanes),
                  0 === a && (ql = null),
                  (function (t) {
                    if (oe && 'function' == typeof oe.onCommitFiberRoot)
                      try {
                        oe.onCommitFiberRoot(
                          ie,
                          t,
                          void 0,
                          128 == (128 & t.current.flags),
                        )
                      } catch (t) {}
                  })(n.stateNode),
                  ic(t, Zt()),
                  null !== e)
                )
                  for (r = t.onRecoverableError, n = 0; n < e.length; n++)
                    (i = e[n]),
                      r(i.value, { componentStack: i.stack, digest: i.digest })
                if ($l) throw (($l = !1), (t = Yl), (Yl = null), t)
                0 != (1 & Kl) && 0 !== t.tag && kc(),
                  (a = t.pendingLanes),
                  0 != (1 & a)
                    ? t === Jl
                      ? Zl++
                      : ((Zl = 0), (Jl = t))
                    : (Zl = 0),
                  Wi()
              })(t, e, n, r)
          } finally {
            ;(Pl.transition = i), (ve = r)
          }
          return null
        }
        function kc() {
          if (null !== Xl) {
            var t = xe(Kl),
              e = Pl.transition,
              n = ve
            try {
              if (((Pl.transition = null), (ve = 16 > t ? 16 : t), null === Xl))
                var r = !1
              else {
                if (((t = Xl), (Xl = null), (Kl = 0), 0 != (6 & Ol)))
                  throw Error(o(331))
                var i = Ol
                for (Ol |= 4, Gs = t.current; null !== Gs; ) {
                  var a = Gs,
                    s = a.child
                  if (0 != (16 & Gs.flags)) {
                    var l = a.deletions
                    if (null !== l) {
                      for (var c = 0; c < l.length; c++) {
                        var u = l[c]
                        for (Gs = u; null !== Gs; ) {
                          var d = Gs
                          switch (d.tag) {
                            case 0:
                            case 11:
                            case 15:
                              rl(8, d, a)
                          }
                          var h = d.child
                          if (null !== h) (h.return = d), (Gs = h)
                          else
                            for (; null !== Gs; ) {
                              var f = (d = Gs).sibling,
                                p = d.return
                              if ((al(d), d === u)) {
                                Gs = null
                                break
                              }
                              if (null !== f) {
                                ;(f.return = p), (Gs = f)
                                break
                              }
                              Gs = p
                            }
                        }
                      }
                      var g = a.alternate
                      if (null !== g) {
                        var m = g.child
                        if (null !== m) {
                          g.child = null
                          do {
                            var b = m.sibling
                            ;(m.sibling = null), (m = b)
                          } while (null !== m)
                        }
                      }
                      Gs = a
                    }
                  }
                  if (0 != (2064 & a.subtreeFlags) && null !== s)
                    (s.return = a), (Gs = s)
                  else
                    t: for (; null !== Gs; ) {
                      if (0 != (2048 & (a = Gs).flags))
                        switch (a.tag) {
                          case 0:
                          case 11:
                          case 15:
                            rl(9, a, a.return)
                        }
                      var y = a.sibling
                      if (null !== y) {
                        ;(y.return = a.return), (Gs = y)
                        break t
                      }
                      Gs = a.return
                    }
                }
                var v = t.current
                for (Gs = v; null !== Gs; ) {
                  var x = (s = Gs).child
                  if (0 != (2064 & s.subtreeFlags) && null !== x)
                    (x.return = s), (Gs = x)
                  else
                    t: for (s = v; null !== Gs; ) {
                      if (0 != (2048 & (l = Gs).flags))
                        try {
                          switch (l.tag) {
                            case 0:
                            case 11:
                            case 15:
                              il(9, l)
                          }
                        } catch (t) {
                          Ec(l, l.return, t)
                        }
                      if (l === s) {
                        Gs = null
                        break t
                      }
                      var w = l.sibling
                      if (null !== w) {
                        ;(w.return = l.return), (Gs = w)
                        break t
                      }
                      Gs = l.return
                    }
                }
                if (
                  ((Ol = i),
                  Wi(),
                  oe && 'function' == typeof oe.onPostCommitFiberRoot)
                )
                  try {
                    oe.onPostCommitFiberRoot(ie, t)
                  } catch (t) {}
                r = !0
              }
              return r
            } finally {
              ;(ve = n), (Pl.transition = e)
            }
          }
          return !1
        }
        function Sc(t, e, n) {
          ;(t = No(t, (e = ps(0, (e = us(n, e)), 1)), 1)),
            (e = ec()),
            null !== t && (be(t, 1, e), ic(t, e))
        }
        function Ec(t, e, n) {
          if (3 === t.tag) Sc(t, t, n)
          else
            for (; null !== e; ) {
              if (3 === e.tag) {
                Sc(e, t, n)
                break
              }
              if (1 === e.tag) {
                var r = e.stateNode
                if (
                  'function' == typeof e.type.getDerivedStateFromError ||
                  ('function' == typeof r.componentDidCatch &&
                    (null === ql || !ql.has(r)))
                ) {
                  ;(e = No(e, (t = gs(e, (t = us(n, t)), 1)), 1)),
                    (t = ec()),
                    null !== e && (be(e, 1, t), ic(e, t))
                  break
                }
              }
              e = e.return
            }
        }
        function Cc(t, e, n) {
          var r = t.pingCache
          null !== r && r.delete(e),
            (e = ec()),
            (t.pingedLanes |= t.suspendedLanes & n),
            Dl === t &&
              (Rl & n) === n &&
              (4 === Nl || (3 === Nl && (130023424 & Rl) === Rl && 500 > Zt() - Wl)
                ? fc(t, 0)
                : (Il |= n)),
            ic(t, e)
        }
        function Mc(t, e) {
          0 === e &&
            (0 == (1 & t.mode)
              ? (e = 1)
              : ((e = ue), 0 == (130023424 & (ue <<= 1)) && (ue = 4194304)))
          var n = ec()
          null !== (t = Do(t, e)) && (be(t, e, n), ic(t, n))
        }
        function Pc(t) {
          var e = t.memoizedState,
            n = 0
          null !== e && (n = e.retryLane), Mc(t, n)
        }
        function Oc(t, e) {
          var n = 0
          switch (t.tag) {
            case 13:
              var r = t.stateNode,
                i = t.memoizedState
              null !== i && (n = i.retryLane)
              break
            case 19:
              r = t.stateNode
              break
            default:
              throw Error(o(314))
          }
          null !== r && r.delete(e), Mc(t, n)
        }
        function Dc(t, e) {
          return qt(t, e)
        }
        function Tc(t, e, n, r) {
          ;(this.tag = t),
            (this.key = n),
            (this.sibling =
              this.child =
              this.return =
              this.stateNode =
              this.type =
              this.elementType =
                null),
            (this.index = 0),
            (this.ref = null),
            (this.pendingProps = e),
            (this.dependencies =
              this.memoizedState =
              this.updateQueue =
              this.memoizedProps =
                null),
            (this.mode = r),
            (this.subtreeFlags = this.flags = 0),
            (this.deletions = null),
            (this.childLanes = this.lanes = 0),
            (this.alternate = null)
        }
        function Rc(t, e, n, r) {
          return new Tc(t, e, n, r)
        }
        function Lc(t) {
          return !(!(t = t.prototype) || !t.isReactComponent)
        }
        function Ac(t, e) {
          var n = t.alternate
          return (
            null === n
              ? (((n = Rc(t.tag, e, t.key, t.mode)).elementType = t.elementType),
                (n.type = t.type),
                (n.stateNode = t.stateNode),
                (n.alternate = t),
                (t.alternate = n))
              : ((n.pendingProps = e),
                (n.type = t.type),
                (n.flags = 0),
                (n.subtreeFlags = 0),
                (n.deletions = null)),
            (n.flags = 14680064 & t.flags),
            (n.childLanes = t.childLanes),
            (n.lanes = t.lanes),
            (n.child = t.child),
            (n.memoizedProps = t.memoizedProps),
            (n.memoizedState = t.memoizedState),
            (n.updateQueue = t.updateQueue),
            (e = t.dependencies),
            (n.dependencies =
              null === e ? null : { lanes: e.lanes, firstContext: e.firstContext }),
            (n.sibling = t.sibling),
            (n.index = t.index),
            (n.ref = t.ref),
            n
          )
        }
        function Nc(t, e, n, r, i, a) {
          var s = 2
          if (((r = t), 'function' == typeof t)) Lc(t) && (s = 1)
          else if ('string' == typeof t) s = 5
          else
            t: switch (t) {
              case k:
                return jc(n.children, i, a, e)
              case S:
                ;(s = 8), (i |= 8)
                break
              case E:
                return ((t = Rc(12, n, e, 2 | i)).elementType = E), (t.lanes = a), t
              case O:
                return ((t = Rc(13, n, e, i)).elementType = O), (t.lanes = a), t
              case D:
                return ((t = Rc(19, n, e, i)).elementType = D), (t.lanes = a), t
              case L:
                return zc(n, i, a, e)
              default:
                if ('object' == typeof t && null !== t)
                  switch (t.$$typeof) {
                    case C:
                      s = 10
                      break t
                    case M:
                      s = 9
                      break t
                    case P:
                      s = 11
                      break t
                    case T:
                      s = 14
                      break t
                    case R:
                      ;(s = 16), (r = null)
                      break t
                  }
                throw Error(o(130, null == t ? t : typeof t, ''))
            }
          return (
            ((e = Rc(s, n, e, i)).elementType = t), (e.type = r), (e.lanes = a), e
          )
        }
        function jc(t, e, n, r) {
          return ((t = Rc(7, t, r, e)).lanes = n), t
        }
        function zc(t, e, n, r) {
          return (
            ((t = Rc(22, t, r, e)).elementType = L),
            (t.lanes = n),
            (t.stateNode = { isHidden: !1 }),
            t
          )
        }
        function Fc(t, e, n) {
          return ((t = Rc(6, t, null, e)).lanes = n), t
        }
        function Ic(t, e, n) {
          return (
            ((e = Rc(4, null !== t.children ? t.children : [], t.key, e)).lanes =
              n),
            (e.stateNode = {
              containerInfo: t.containerInfo,
              pendingChildren: null,
              implementation: t.implementation,
            }),
            e
          )
        }
        function Bc(t, e, n, r, i) {
          ;(this.tag = e),
            (this.containerInfo = t),
            (this.finishedWork =
              this.pingCache =
              this.current =
              this.pendingChildren =
                null),
            (this.timeoutHandle = -1),
            (this.callbackNode = this.pendingContext = this.context = null),
            (this.callbackPriority = 0),
            (this.eventTimes = me(0)),
            (this.expirationTimes = me(-1)),
            (this.entangledLanes =
              this.finishedLanes =
              this.mutableReadLanes =
              this.expiredLanes =
              this.pingedLanes =
              this.suspendedLanes =
              this.pendingLanes =
                0),
            (this.entanglements = me(0)),
            (this.identifierPrefix = r),
            (this.onRecoverableError = i),
            (this.mutableSourceEagerHydrationData = null)
        }
        function Uc(t, e, n, r, i, o, a, s, l) {
          return (
            (t = new Bc(t, e, n, s, l)),
            1 === e ? ((e = 1), !0 === o && (e |= 8)) : (e = 0),
            (o = Rc(3, null, null, e)),
            (t.current = o),
            (o.stateNode = t),
            (o.memoizedState = {
              element: r,
              isDehydrated: n,
              cache: null,
              transitions: null,
              pendingSuspenseBoundaries: null,
            }),
            Ro(o),
            t
          )
        }
        function Wc(t) {
          if (!t) return Mi
          t: {
            if (Wt((t = t._reactInternals)) !== t || 1 !== t.tag)
              throw Error(o(170))
            var e = t
            do {
              switch (e.tag) {
                case 3:
                  e = e.stateNode.context
                  break t
                case 1:
                  if (Ri(e.type)) {
                    e = e.stateNode.__reactInternalMemoizedMergedChildContext
                    break t
                  }
              }
              e = e.return
            } while (null !== e)
            throw Error(o(171))
          }
          if (1 === t.tag) {
            var n = t.type
            if (Ri(n)) return Ni(t, n, e)
          }
          return e
        }
        function Vc(t, e, n, r, i, o, a, s, l) {
          return (
            ((t = Uc(n, r, !0, t, 0, o, 0, s, l)).context = Wc(null)),
            (n = t.current),
            ((o = Ao((r = ec()), (i = nc(n)))).callback = null != e ? e : null),
            No(n, o, i),
            (t.current.lanes = i),
            be(t, i, r),
            ic(t, r),
            t
          )
        }
        function Hc(t, e, n, r) {
          var i = e.current,
            o = ec(),
            a = nc(i)
          return (
            (n = Wc(n)),
            null === e.context ? (e.context = n) : (e.pendingContext = n),
            ((e = Ao(o, a)).payload = { element: t }),
            null !== (r = void 0 === r ? null : r) && (e.callback = r),
            null !== (t = No(i, e, a)) && (rc(t, i, a, o), jo(t, i, a)),
            a
          )
        }
        function $c(t) {
          return (t = t.current).child ? (t.child.tag, t.child.stateNode) : null
        }
        function Yc(t, e) {
          if (null !== (t = t.memoizedState) && null !== t.dehydrated) {
            var n = t.retryLane
            t.retryLane = 0 !== n && n < e ? n : e
          }
        }
        function qc(t, e) {
          Yc(t, e), (t = t.alternate) && Yc(t, e)
        }
        Sl = function (t, e, n) {
          if (null !== t)
            if (t.memoizedProps !== e.pendingProps || Oi.current) xs = !0
            else {
              if (0 == (t.lanes & n) && 0 == (128 & e.flags))
                return (
                  (xs = !1),
                  (function (t, e, n) {
                    switch (e.tag) {
                      case 3:
                        Ds(e), po()
                        break
                      case 5:
                        aa(e)
                        break
                      case 1:
                        Ri(e.type) && ji(e)
                        break
                      case 4:
                        ia(e, e.stateNode.containerInfo)
                        break
                      case 10:
                        var r = e.type._context,
                          i = e.memoizedProps.value
                        Ci(yo, r._currentValue), (r._currentValue = i)
                        break
                      case 13:
                        if (null !== (r = e.memoizedState))
                          return null !== r.dehydrated
                            ? (Ci(la, 1 & la.current), (e.flags |= 128), null)
                            : 0 != (n & e.child.childLanes)
                              ? Fs(t, e, n)
                              : (Ci(la, 1 & la.current),
                                null !== (t = $s(t, e, n)) ? t.sibling : null)
                        Ci(la, 1 & la.current)
                        break
                      case 19:
                        if (((r = 0 != (n & e.childLanes)), 0 != (128 & t.flags))) {
                          if (r) return Vs(t, e, n)
                          e.flags |= 128
                        }
                        if (
                          (null !== (i = e.memoizedState) &&
                            ((i.rendering = null),
                            (i.tail = null),
                            (i.lastEffect = null)),
                          Ci(la, la.current),
                          r)
                        )
                          break
                        return null
                      case 22:
                      case 23:
                        return (e.lanes = 0), Es(t, e, n)
                    }
                    return $s(t, e, n)
                  })(t, e, n)
                )
              xs = 0 != (131072 & t.flags)
            }
          else (xs = !1), io && 0 != (1048576 & e.flags) && Gi(e, Yi, e.index)
          switch (((e.lanes = 0), e.tag)) {
            case 2:
              var r = e.type
              Hs(t, e), (t = e.pendingProps)
              var i = Ti(e, Pi.current)
              Eo(e, n), (i = Sa(null, e, r, t, i, n))
              var a = Ea()
              return (
                (e.flags |= 1),
                'object' == typeof i &&
                null !== i &&
                'function' == typeof i.render &&
                void 0 === i.$$typeof
                  ? ((e.tag = 1),
                    (e.memoizedState = null),
                    (e.updateQueue = null),
                    Ri(r) ? ((a = !0), ji(e)) : (a = !1),
                    (e.memoizedState =
                      null !== i.state && void 0 !== i.state ? i.state : null),
                    Ro(e),
                    (i.updater = Wo),
                    (e.stateNode = i),
                    (i._reactInternals = e),
                    Yo(e, r, t, n),
                    (e = Os(null, e, r, !0, a, n)))
                  : ((e.tag = 0),
                    io && a && to(e),
                    ws(null, e, i, n),
                    (e = e.child)),
                e
              )
            case 16:
              r = e.elementType
              t: {
                switch (
                  (Hs(t, e),
                  (t = e.pendingProps),
                  (r = (i = r._init)(r._payload)),
                  (e.type = r),
                  (i = e.tag =
                    (function (t) {
                      if ('function' == typeof t) return Lc(t) ? 1 : 0
                      if (null != t) {
                        if ((t = t.$$typeof) === P) return 11
                        if (t === T) return 14
                      }
                      return 2
                    })(r)),
                  (t = bo(r, t)),
                  i)
                ) {
                  case 0:
                    e = Ms(null, e, r, t, n)
                    break t
                  case 1:
                    e = Ps(null, e, r, t, n)
                    break t
                  case 11:
                    e = _s(null, e, r, t, n)
                    break t
                  case 14:
                    e = ks(null, e, r, bo(r.type, t), n)
                    break t
                }
                throw Error(o(306, r, ''))
              }
              return e
            case 0:
              return (
                (r = e.type),
                (i = e.pendingProps),
                Ms(t, e, r, (i = e.elementType === r ? i : bo(r, i)), n)
              )
            case 1:
              return (
                (r = e.type),
                (i = e.pendingProps),
                Ps(t, e, r, (i = e.elementType === r ? i : bo(r, i)), n)
              )
            case 3:
              t: {
                if ((Ds(e), null === t)) throw Error(o(387))
                ;(r = e.pendingProps),
                  (i = (a = e.memoizedState).element),
                  Lo(t, e),
                  Fo(e, r, null, n)
                var s = e.memoizedState
                if (((r = s.element), a.isDehydrated)) {
                  if (
                    ((a = {
                      element: r,
                      isDehydrated: !1,
                      cache: s.cache,
                      pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
                      transitions: s.transitions,
                    }),
                    (e.updateQueue.baseState = a),
                    (e.memoizedState = a),
                    256 & e.flags)
                  ) {
                    e = Ts(t, e, r, n, (i = us(Error(o(423)), e)))
                    break t
                  }
                  if (r !== i) {
                    e = Ts(t, e, r, n, (i = us(Error(o(424)), e)))
                    break t
                  }
                  for (
                    ro = ci(e.stateNode.containerInfo.firstChild),
                      no = e,
                      io = !0,
                      oo = null,
                      n = Jo(e, null, r, n),
                      e.child = n;
                    n;

                  )
                    (n.flags = (-3 & n.flags) | 4096), (n = n.sibling)
                } else {
                  if ((po(), r === i)) {
                    e = $s(t, e, n)
                    break t
                  }
                  ws(t, e, r, n)
                }
                e = e.child
              }
              return e
            case 5:
              return (
                aa(e),
                null === t && co(e),
                (r = e.type),
                (i = e.pendingProps),
                (a = null !== t ? t.memoizedProps : null),
                (s = i.children),
                ni(r, i) ? (s = null) : null !== a && ni(r, a) && (e.flags |= 32),
                Cs(t, e),
                ws(t, e, s, n),
                e.child
              )
            case 6:
              return null === t && co(e), null
            case 13:
              return Fs(t, e, n)
            case 4:
              return (
                ia(e, e.stateNode.containerInfo),
                (r = e.pendingProps),
                null === t ? (e.child = Zo(e, null, r, n)) : ws(t, e, r, n),
                e.child
              )
            case 11:
              return (
                (r = e.type),
                (i = e.pendingProps),
                _s(t, e, r, (i = e.elementType === r ? i : bo(r, i)), n)
              )
            case 7:
              return ws(t, e, e.pendingProps, n), e.child
            case 8:
            case 12:
              return ws(t, e, e.pendingProps.children, n), e.child
            case 10:
              t: {
                if (
                  ((r = e.type._context),
                  (i = e.pendingProps),
                  (a = e.memoizedProps),
                  (s = i.value),
                  Ci(yo, r._currentValue),
                  (r._currentValue = s),
                  null !== a)
                )
                  if (sr(a.value, s)) {
                    if (a.children === i.children && !Oi.current) {
                      e = $s(t, e, n)
                      break t
                    }
                  } else
                    for (null !== (a = e.child) && (a.return = e); null !== a; ) {
                      var l = a.dependencies
                      if (null !== l) {
                        s = a.child
                        for (var c = l.firstContext; null !== c; ) {
                          if (c.context === r) {
                            if (1 === a.tag) {
                              ;(c = Ao(-1, n & -n)).tag = 2
                              var u = a.updateQueue
                              if (null !== u) {
                                var d = (u = u.shared).pending
                                null === d
                                  ? (c.next = c)
                                  : ((c.next = d.next), (d.next = c)),
                                  (u.pending = c)
                              }
                            }
                            ;(a.lanes |= n),
                              null !== (c = a.alternate) && (c.lanes |= n),
                              So(a.return, n, e),
                              (l.lanes |= n)
                            break
                          }
                          c = c.next
                        }
                      } else if (10 === a.tag)
                        s = a.type === e.type ? null : a.child
                      else if (18 === a.tag) {
                        if (null === (s = a.return)) throw Error(o(341))
                        ;(s.lanes |= n),
                          null !== (l = s.alternate) && (l.lanes |= n),
                          So(s, n, e),
                          (s = a.sibling)
                      } else s = a.child
                      if (null !== s) s.return = a
                      else
                        for (s = a; null !== s; ) {
                          if (s === e) {
                            s = null
                            break
                          }
                          if (null !== (a = s.sibling)) {
                            ;(a.return = s.return), (s = a)
                            break
                          }
                          s = s.return
                        }
                      a = s
                    }
                ws(t, e, i.children, n), (e = e.child)
              }
              return e
            case 9:
              return (
                (i = e.type),
                (r = e.pendingProps.children),
                Eo(e, n),
                (r = r((i = Co(i)))),
                (e.flags |= 1),
                ws(t, e, r, n),
                e.child
              )
            case 14:
              return (
                (i = bo((r = e.type), e.pendingProps)),
                ks(t, e, r, (i = bo(r.type, i)), n)
              )
            case 15:
              return Ss(t, e, e.type, e.pendingProps, n)
            case 17:
              return (
                (r = e.type),
                (i = e.pendingProps),
                (i = e.elementType === r ? i : bo(r, i)),
                Hs(t, e),
                (e.tag = 1),
                Ri(r) ? ((t = !0), ji(e)) : (t = !1),
                Eo(e, n),
                Ho(e, r, i),
                Yo(e, r, i, n),
                Os(null, e, r, !0, t, n)
              )
            case 19:
              return Vs(t, e, n)
            case 22:
              return Es(t, e, n)
          }
          throw Error(o(156, e.tag))
        }
        var Qc =
          'function' == typeof reportError
            ? reportError
            : function (t) {
                console.error(t)
              }
        function Xc(t) {
          this._internalRoot = t
        }
        function Kc(t) {
          this._internalRoot = t
        }
        function Zc(t) {
          return !(
            !t ||
            (1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType)
          )
        }
        function Jc(t) {
          return !(
            !t ||
            (1 !== t.nodeType &&
              9 !== t.nodeType &&
              11 !== t.nodeType &&
              (8 !== t.nodeType || ' react-mount-point-unstable ' !== t.nodeValue))
          )
        }
        function Gc() {}
        function tu(t, e, n, r, i) {
          var o = n._reactRootContainer
          if (o) {
            var a = o
            if ('function' == typeof i) {
              var s = i
              i = function () {
                var t = $c(a)
                s.call(t)
              }
            }
            Hc(e, a, t, i)
          } else
            a = (function (t, e, n, r, i) {
              if (i) {
                if ('function' == typeof r) {
                  var o = r
                  r = function () {
                    var t = $c(a)
                    o.call(t)
                  }
                }
                var a = Vc(e, r, t, 0, null, !1, 0, '', Gc)
                return (
                  (t._reactRootContainer = a),
                  (t[pi] = a.current),
                  Wr(8 === t.nodeType ? t.parentNode : t),
                  dc(),
                  a
                )
              }
              for (; (i = t.lastChild); ) t.removeChild(i)
              if ('function' == typeof r) {
                var s = r
                r = function () {
                  var t = $c(l)
                  s.call(t)
                }
              }
              var l = Uc(t, 0, !1, null, 0, !1, 0, '', Gc)
              return (
                (t._reactRootContainer = l),
                (t[pi] = l.current),
                Wr(8 === t.nodeType ? t.parentNode : t),
                dc(function () {
                  Hc(e, l, n, r)
                }),
                l
              )
            })(n, e, t, i, r)
          return $c(a)
        }
        ;(Kc.prototype.render = Xc.prototype.render =
          function (t) {
            var e = this._internalRoot
            if (null === e) throw Error(o(409))
            Hc(t, e, null, null)
          }),
          (Kc.prototype.unmount = Xc.prototype.unmount =
            function () {
              var t = this._internalRoot
              if (null !== t) {
                this._internalRoot = null
                var e = t.containerInfo
                dc(function () {
                  Hc(null, t, null, null)
                }),
                  (e[pi] = null)
              }
            }),
          (Kc.prototype.unstable_scheduleHydration = function (t) {
            if (t) {
              var e = Se()
              t = { blockedOn: null, target: t, priority: e }
              for (var n = 0; n < Le.length && 0 !== e && e < Le[n].priority; n++);
              Le.splice(n, 0, t), 0 === n && ze(t)
            }
          }),
          (we = function (t) {
            switch (t.tag) {
              case 3:
                var e = t.stateNode
                if (e.current.memoizedState.isDehydrated) {
                  var n = de(e.pendingLanes)
                  0 !== n &&
                    (ye(e, 1 | n),
                    ic(e, Zt()),
                    0 == (6 & Ol) && ((Vl = Zt() + 500), Wi()))
                }
                break
              case 13:
                dc(function () {
                  var e = Do(t, 1)
                  if (null !== e) {
                    var n = ec()
                    rc(e, t, 1, n)
                  }
                }),
                  qc(t, 1)
            }
          }),
          (_e = function (t) {
            if (13 === t.tag) {
              var e = Do(t, 134217728)
              if (null !== e) rc(e, t, 134217728, ec())
              qc(t, 134217728)
            }
          }),
          (ke = function (t) {
            if (13 === t.tag) {
              var e = nc(t),
                n = Do(t, e)
              if (null !== n) rc(n, t, e, ec())
              qc(t, e)
            }
          }),
          (Se = function () {
            return ve
          }),
          (Ee = function (t, e) {
            var n = ve
            try {
              return (ve = t), e()
            } finally {
              ve = n
            }
          }),
          (_t = function (t, e, n) {
            switch (e) {
              case 'input':
                if ((J(t, n), (e = n.name), 'radio' === n.type && null != e)) {
                  for (n = t; n.parentNode; ) n = n.parentNode
                  for (
                    n = n.querySelectorAll(
                      'input[name=' + JSON.stringify('' + e) + '][type="radio"]',
                    ),
                      e = 0;
                    e < n.length;
                    e++
                  ) {
                    var r = n[e]
                    if (r !== t && r.form === t.form) {
                      var i = wi(r)
                      if (!i) throw Error(o(90))
                      q(r), J(r, i)
                    }
                  }
                }
                break
              case 'textarea':
                ot(t, n)
                break
              case 'select':
                null != (e = n.value) && nt(t, !!n.multiple, e, !1)
            }
          }),
          (Pt = uc),
          (Ot = dc)
        var eu = { usingClientEntryPoint: !1, Events: [vi, xi, wi, Ct, Mt, uc] },
          nu = {
            findFiberByHostInstance: yi,
            bundleType: 0,
            version: '18.2.0',
            rendererPackageName: 'react-dom',
          },
          ru = {
            bundleType: nu.bundleType,
            version: nu.version,
            rendererPackageName: nu.rendererPackageName,
            rendererConfig: nu.rendererConfig,
            overrideHookState: null,
            overrideHookStateDeletePath: null,
            overrideHookStateRenamePath: null,
            overrideProps: null,
            overridePropsDeletePath: null,
            overridePropsRenamePath: null,
            setErrorHandler: null,
            setSuspenseHandler: null,
            scheduleUpdate: null,
            currentDispatcherRef: x.ReactCurrentDispatcher,
            findHostInstanceByFiber: function (t) {
              return null === (t = $t(t)) ? null : t.stateNode
            },
            findFiberByHostInstance:
              nu.findFiberByHostInstance ||
              function () {
                return null
              },
            findHostInstancesForRefresh: null,
            scheduleRefresh: null,
            scheduleRoot: null,
            setRefreshHandler: null,
            getCurrentFiber: null,
            reconcilerVersion: '18.2.0-next-9e3b772b8-20220608',
          }
        if ('undefined' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
          var iu = __REACT_DEVTOOLS_GLOBAL_HOOK__
          if (!iu.isDisabled && iu.supportsFiber)
            try {
              ;(ie = iu.inject(ru)), (oe = iu)
            } catch (ut) {}
        }
        ;(e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = eu),
          (e.createPortal = function (t, e) {
            var n =
              2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null
            if (!Zc(e)) throw Error(o(200))
            return (function (t, e, n) {
              var r =
                3 < arguments.length && void 0 !== arguments[3]
                  ? arguments[3]
                  : null
              return {
                $$typeof: _,
                key: null == r ? null : '' + r,
                children: t,
                containerInfo: e,
                implementation: n,
              }
            })(t, e, null, n)
          }),
          (e.createRoot = function (t, e) {
            if (!Zc(t)) throw Error(o(299))
            var n = !1,
              r = '',
              i = Qc
            return (
              null != e &&
                (!0 === e.unstable_strictMode && (n = !0),
                void 0 !== e.identifierPrefix && (r = e.identifierPrefix),
                void 0 !== e.onRecoverableError && (i = e.onRecoverableError)),
              (e = Uc(t, 1, !1, null, 0, n, 0, r, i)),
              (t[pi] = e.current),
              Wr(8 === t.nodeType ? t.parentNode : t),
              new Xc(e)
            )
          }),
          (e.findDOMNode = function (t) {
            if (null == t) return null
            if (1 === t.nodeType) return t
            var e = t._reactInternals
            if (void 0 === e) {
              if ('function' == typeof t.render) throw Error(o(188))
              throw ((t = Object.keys(t).join(',')), Error(o(268, t)))
            }
            return (t = null === (t = $t(e)) ? null : t.stateNode)
          }),
          (e.flushSync = function (t) {
            return dc(t)
          }),
          (e.hydrate = function (t, e, n) {
            if (!Jc(e)) throw Error(o(200))
            return tu(null, t, e, !0, n)
          }),
          (e.hydrateRoot = function (t, e, n) {
            if (!Zc(t)) throw Error(o(405))
            var r = (null != n && n.hydratedSources) || null,
              i = !1,
              a = '',
              s = Qc
            if (
              (null != n &&
                (!0 === n.unstable_strictMode && (i = !0),
                void 0 !== n.identifierPrefix && (a = n.identifierPrefix),
                void 0 !== n.onRecoverableError && (s = n.onRecoverableError)),
              (e = Vc(e, null, t, 1, null != n ? n : null, i, 0, a, s)),
              (t[pi] = e.current),
              Wr(t),
              r)
            )
              for (t = 0; t < r.length; t++)
                (i = (i = (n = r[t])._getVersion)(n._source)),
                  null == e.mutableSourceEagerHydrationData
                    ? (e.mutableSourceEagerHydrationData = [n, i])
                    : e.mutableSourceEagerHydrationData.push(n, i)
            return new Kc(e)
          }),
          (e.render = function (t, e, n) {
            if (!Jc(e)) throw Error(o(200))
            return tu(null, t, e, !1, n)
          }),
          (e.unmountComponentAtNode = function (t) {
            if (!Jc(t)) throw Error(o(40))
            return (
              !!t._reactRootContainer &&
              (dc(function () {
                tu(null, null, t, !1, function () {
                  ;(t._reactRootContainer = null), (t[pi] = null)
                })
              }),
              !0)
            )
          }),
          (e.unstable_batchedUpdates = uc),
          (e.unstable_renderSubtreeIntoContainer = function (t, e, n, r) {
            if (!Jc(n)) throw Error(o(200))
            if (null == t || void 0 === t._reactInternals) throw Error(o(38))
            return tu(t, e, n, !1, r)
          }),
          (e.version = '18.2.0-next-9e3b772b8-20220608')
      },
      745: (t, e, n) => {
        var r = n(935)
        ;(e.s = r.createRoot), r.hydrateRoot
      },
      935: (t, e, n) => {
        !(function t() {
          if (
            'undefined' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
            'function' == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
          )
            try {
              __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t)
            } catch (t) {
              console.error(t)
            }
        })(),
          (t.exports = n(448))
      },
      655: (t, e, n) => {
        var r, i
        n.d(e, { OL: () => M, cP: () => f, pG: () => _ })
        var o = n(294),
          a = n(935),
          s = n(250),
          l = n(599)
        function c() {
          return (
            (c = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e]
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                  }
                  return t
                }),
            c.apply(this, arguments)
          )
        }
        function u(t, e) {
          if (null == t) return {}
          var n,
            r,
            i = {},
            o = Object.keys(t)
          for (r = 0; r < o.length; r++)
            (n = o[r]), e.indexOf(n) >= 0 || (i[n] = t[n])
          return i
        }
        new Set([
          'application/x-www-form-urlencoded',
          'multipart/form-data',
          'text/plain',
        ])
        const d = [
            'onClick',
            'relative',
            'reloadDocument',
            'replace',
            'state',
            'target',
            'to',
            'preventScrollReset',
            'unstable_viewTransition',
          ],
          h = [
            'aria-current',
            'caseSensitive',
            'className',
            'end',
            'style',
            'to',
            'unstable_viewTransition',
            'children',
          ]
        function f(t, e) {
          return (0, l.p7)({
            basename: null == e ? void 0 : e.basename,
            future: c({}, null == e ? void 0 : e.future, {
              v7_prependBasename: !0,
            }),
            history: (0, l.q_)({ window: null == e ? void 0 : e.window }),
            hydrationData: (null == e ? void 0 : e.hydrationData) || p(),
            routes: t,
            mapRouteProperties: s.us,
            window: null == e ? void 0 : e.window,
          }).initialize()
        }
        function p() {
          var t
          let e = null == (t = window) ? void 0 : t.__staticRouterHydrationData
          return e && e.errors && (e = c({}, e, { errors: g(e.errors) })), e
        }
        function g(t) {
          if (!t) return null
          let e = Object.entries(t),
            n = {}
          for (let [t, r] of e)
            if (r && 'RouteErrorResponse' === r.__type)
              n[t] = new l.OF(r.status, r.statusText, r.data, !0 === r.internal)
            else if (r && 'Error' === r.__type) {
              if (r.__subType) {
                let e = window[r.__subType]
                if ('function' == typeof e)
                  try {
                    let i = new e(r.message)
                    ;(i.stack = ''), (n[t] = i)
                  } catch (t) {}
              }
              if (null == n[t]) {
                let e = new Error(r.message)
                ;(e.stack = ''), (n[t] = e)
              }
            } else n[t] = r
          return n
        }
        const m = o.createContext({ isTransitioning: !1 })
        const b = o.createContext(new Map())
        const y = (r || (r = n.t(o, 2))).startTransition,
          v = (i || (i = n.t(a, 2))).flushSync
        ;(r || (r = n.t(o, 2))).useId
        function x(t) {
          v ? v(t) : t()
        }
        class w {
          constructor() {
            ;(this.status = 'pending'),
              (this.promise = new Promise((t, e) => {
                ;(this.resolve = (e) => {
                  'pending' === this.status && ((this.status = 'resolved'), t(e))
                }),
                  (this.reject = (t) => {
                    'pending' === this.status && ((this.status = 'rejected'), e(t))
                  })
              }))
          }
        }
        function _(t) {
          let { fallbackElement: e, router: n, future: r } = t,
            [i, a] = o.useState(n.state),
            [l, c] = o.useState(),
            [u, d] = o.useState({ isTransitioning: !1 }),
            [h, f] = o.useState(),
            [p, g] = o.useState(),
            [v, _] = o.useState(),
            S = o.useRef(new Map()),
            { v7_startTransition: E } = r || {},
            C = o.useCallback(
              (t) => {
                E
                  ? (function (t) {
                      y ? y(t) : t()
                    })(t)
                  : t()
              },
              [E],
            ),
            M = o.useCallback(
              (t, e) => {
                let {
                  deletedFetchers: r,
                  unstable_flushSync: i,
                  unstable_viewTransitionOpts: o,
                } = e
                r.forEach((t) => S.current.delete(t)),
                  t.fetchers.forEach((t, e) => {
                    void 0 !== t.data && S.current.set(e, t.data)
                  })
                let s =
                  null == n.window ||
                  'function' != typeof n.window.document.startViewTransition
                if (o && !s) {
                  if (i) {
                    x(() => {
                      p && (h && h.resolve(), p.skipTransition()),
                        d({
                          isTransitioning: !0,
                          flushSync: !0,
                          currentLocation: o.currentLocation,
                          nextLocation: o.nextLocation,
                        })
                    })
                    let e = n.window.document.startViewTransition(() => {
                      x(() => a(t))
                    })
                    return (
                      e.finished.finally(() => {
                        x(() => {
                          f(void 0),
                            g(void 0),
                            c(void 0),
                            d({ isTransitioning: !1 })
                        })
                      }),
                      void x(() => g(e))
                    )
                  }
                  p
                    ? (h && h.resolve(),
                      p.skipTransition(),
                      _({
                        state: t,
                        currentLocation: o.currentLocation,
                        nextLocation: o.nextLocation,
                      }))
                    : (c(t),
                      d({
                        isTransitioning: !0,
                        flushSync: !1,
                        currentLocation: o.currentLocation,
                        nextLocation: o.nextLocation,
                      }))
                } else i ? x(() => a(t)) : C(() => a(t))
              },
              [n.window, p, h, S, C],
            )
          o.useLayoutEffect(() => n.subscribe(M), [n, M]),
            o.useEffect(() => {
              u.isTransitioning && !u.flushSync && f(new w())
            }, [u]),
            o.useEffect(() => {
              if (h && l && n.window) {
                let t = l,
                  e = h.promise,
                  r = n.window.document.startViewTransition(async () => {
                    C(() => a(t)), await e
                  })
                r.finished.finally(() => {
                  f(void 0), g(void 0), c(void 0), d({ isTransitioning: !1 })
                }),
                  g(r)
              }
            }, [C, l, h, n.window]),
            o.useEffect(() => {
              h && l && i.location.key === l.location.key && h.resolve()
            }, [h, p, i.location, l]),
            o.useEffect(() => {
              !u.isTransitioning &&
                v &&
                (c(v.state),
                d({
                  isTransitioning: !0,
                  flushSync: !1,
                  currentLocation: v.currentLocation,
                  nextLocation: v.nextLocation,
                }),
                _(void 0))
            }, [u.isTransitioning, v]),
            o.useEffect(() => {}, [])
          let P = o.useMemo(
              () => ({
                createHref: n.createHref,
                encodeLocation: n.encodeLocation,
                go: (t) => n.navigate(t),
                push: (t, e, r) =>
                  n.navigate(t, {
                    state: e,
                    preventScrollReset: null == r ? void 0 : r.preventScrollReset,
                  }),
                replace: (t, e, r) =>
                  n.navigate(t, {
                    replace: !0,
                    state: e,
                    preventScrollReset: null == r ? void 0 : r.preventScrollReset,
                  }),
              }),
              [n],
            ),
            O = n.basename || '/',
            D = o.useMemo(
              () => ({ router: n, navigator: P, static: !1, basename: O }),
              [n, P, O],
            )
          return o.createElement(
            o.Fragment,
            null,
            o.createElement(
              s.w3.Provider,
              { value: D },
              o.createElement(
                s.FR.Provider,
                { value: i },
                o.createElement(
                  b.Provider,
                  { value: S.current },
                  o.createElement(
                    m.Provider,
                    { value: u },
                    o.createElement(
                      s.F0,
                      {
                        basename: O,
                        location: i.location,
                        navigationType: i.historyAction,
                        navigator: P,
                        future: {
                          v7_relativeSplatPath: n.future.v7_relativeSplatPath,
                        },
                      },
                      i.initialized || n.future.v7_partialHydration
                        ? o.createElement(k, {
                            routes: n.routes,
                            future: n.future,
                            state: i,
                          })
                        : e,
                    ),
                  ),
                ),
              ),
            ),
            null,
          )
        }
        function k(t) {
          let { routes: e, future: n, state: r } = t
          return (0, s.DY)(e, void 0, r, n)
        }
        const S =
            'undefined' != typeof window &&
            void 0 !== window.document &&
            void 0 !== window.document.createElement,
          E = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
          C = o.forwardRef(function (t, e) {
            let n,
              {
                onClick: r,
                relative: i,
                reloadDocument: a,
                replace: h,
                state: f,
                target: p,
                to: g,
                preventScrollReset: m,
                unstable_viewTransition: b,
              } = t,
              y = u(t, d),
              { basename: v } = o.useContext(s.Us),
              x = !1
            if ('string' == typeof g && E.test(g) && ((n = g), S))
              try {
                let t = new URL(window.location.href),
                  e = g.startsWith('//') ? new URL(t.protocol + g) : new URL(g),
                  n = (0, l.Zn)(e.pathname, v)
                e.origin === t.origin && null != n
                  ? (g = n + e.search + e.hash)
                  : (x = !0)
              } catch (t) {}
            let w = (0, s.oQ)(g, { relative: i }),
              _ = (function (t, e) {
                let {
                    target: n,
                    replace: r,
                    state: i,
                    preventScrollReset: a,
                    relative: c,
                    unstable_viewTransition: u,
                  } = void 0 === e ? {} : e,
                  d = (0, s.s0)(),
                  h = (0, s.TH)(),
                  f = (0, s.WU)(t, { relative: c })
                return o.useCallback(
                  (e) => {
                    if (
                      (function (t, e) {
                        return !(
                          0 !== t.button ||
                          (e && '_self' !== e) ||
                          (function (t) {
                            return !!(
                              t.metaKey ||
                              t.altKey ||
                              t.ctrlKey ||
                              t.shiftKey
                            )
                          })(t)
                        )
                      })(e, n)
                    ) {
                      e.preventDefault()
                      let n = void 0 !== r ? r : (0, l.Ep)(h) === (0, l.Ep)(f)
                      d(t, {
                        replace: n,
                        state: i,
                        preventScrollReset: a,
                        relative: c,
                        unstable_viewTransition: u,
                      })
                    }
                  },
                  [h, d, f, r, i, n, t, a, c, u],
                )
              })(g, {
                replace: h,
                state: f,
                target: p,
                preventScrollReset: m,
                relative: i,
                unstable_viewTransition: b,
              })
            return o.createElement(
              'a',
              c({}, y, {
                href: n || w,
                onClick:
                  x || a
                    ? r
                    : function (t) {
                        r && r(t), t.defaultPrevented || _(t)
                      },
                ref: e,
                target: p,
              }),
            )
          })
        const M = o.forwardRef(function (t, e) {
          let {
              'aria-current': n = 'page',
              caseSensitive: r = !1,
              className: i = '',
              end: a = !1,
              style: d,
              to: f,
              unstable_viewTransition: p,
              children: g,
            } = t,
            b = u(t, h),
            y = (0, s.WU)(f, { relative: b.relative }),
            v = (0, s.TH)(),
            x = o.useContext(s.FR),
            { navigator: w, basename: _ } = o.useContext(s.Us),
            k =
              null != x &&
              (function (t, e) {
                void 0 === e && (e = {})
                let n = o.useContext(m)
                null == n && (0, l.J0)(!1)
                let { basename: r } = D(P.useViewTransitionState),
                  i = (0, s.WU)(t, { relative: e.relative })
                if (!n.isTransitioning) return !1
                let a =
                    (0, l.Zn)(n.currentLocation.pathname, r) ||
                    n.currentLocation.pathname,
                  c =
                    (0, l.Zn)(n.nextLocation.pathname, r) || n.nextLocation.pathname
                return (
                  null != (0, l.LX)(i.pathname, c) ||
                  null != (0, l.LX)(i.pathname, a)
                )
              })(y) &&
              !0 === p,
            S = w.encodeLocation ? w.encodeLocation(y).pathname : y.pathname,
            E = v.pathname,
            M =
              x && x.navigation && x.navigation.location
                ? x.navigation.location.pathname
                : null
          r ||
            ((E = E.toLowerCase()),
            (M = M ? M.toLowerCase() : null),
            (S = S.toLowerCase())),
            M && _ && (M = (0, l.Zn)(M, _) || M)
          const O = '/' !== S && S.endsWith('/') ? S.length - 1 : S.length
          let T,
            R = E === S || (!a && E.startsWith(S) && '/' === E.charAt(O)),
            L =
              null != M &&
              (M === S || (!a && M.startsWith(S) && '/' === M.charAt(S.length))),
            A = { isActive: R, isPending: L, isTransitioning: k },
            N = R ? n : void 0
          T =
            'function' == typeof i
              ? i(A)
              : [
                  i,
                  R ? 'active' : null,
                  L ? 'pending' : null,
                  k ? 'transitioning' : null,
                ]
                  .filter(Boolean)
                  .join(' ')
          let j = 'function' == typeof d ? d(A) : d
          return o.createElement(
            C,
            c({}, b, {
              'aria-current': N,
              className: T,
              ref: e,
              style: j,
              to: f,
              unstable_viewTransition: p,
            }),
            'function' == typeof g ? g(A) : g,
          )
        })
        var P, O
        function D(t) {
          let e = o.useContext(s.w3)
          return e || (0, l.J0)(!1), e
        }
        ;(function (t) {
          ;(t.UseScrollRestoration = 'useScrollRestoration'),
            (t.UseSubmit = 'useSubmit'),
            (t.UseSubmitFetcher = 'useSubmitFetcher'),
            (t.UseFetcher = 'useFetcher'),
            (t.useViewTransitionState = 'useViewTransitionState')
        })(P || (P = {})),
          (function (t) {
            ;(t.UseFetcher = 'useFetcher'),
              (t.UseFetchers = 'useFetchers'),
              (t.UseScrollRestoration = 'useScrollRestoration')
          })(O || (O = {}))
      },
      250: (t, e, n) => {
        var r
        n.d(e, {
          DY: () => x,
          F0: () => L,
          FR: () => l,
          TH: () => g,
          Us: () => c,
          WU: () => v,
          j3: () => R,
          oQ: () => f,
          s0: () => b,
          us: () => A,
          w3: () => s,
        })
        var i = n(294),
          o = n(599)
        function a() {
          return (
            (a = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e]
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                  }
                  return t
                }),
            a.apply(this, arguments)
          )
        }
        const s = i.createContext(null)
        const l = i.createContext(null)
        const c = i.createContext(null)
        const u = i.createContext(null)
        const d = i.createContext({ outlet: null, matches: [], isDataRoute: !1 })
        const h = i.createContext(null)
        function f(t, e) {
          let { relative: n } = void 0 === e ? {} : e
          p() || (0, o.J0)(!1)
          let { basename: r, navigator: a } = i.useContext(c),
            { hash: s, pathname: l, search: u } = v(t, { relative: n }),
            d = l
          return (
            '/' !== r && (d = '/' === l ? r : (0, o.RQ)([r, l])),
            a.createHref({ pathname: d, search: u, hash: s })
          )
        }
        function p() {
          return null != i.useContext(u)
        }
        function g() {
          return p() || (0, o.J0)(!1), i.useContext(u).location
        }
        function m(t) {
          i.useContext(c).static || i.useLayoutEffect(t)
        }
        function b() {
          let { isDataRoute: t } = i.useContext(d)
          return t
            ? (function () {
                let { router: t } = P(C.UseNavigateStable),
                  e = D(M.UseNavigateStable),
                  n = i.useRef(!1)
                return (
                  m(() => {
                    n.current = !0
                  }),
                  i.useCallback(
                    function (r, i) {
                      void 0 === i && (i = {}),
                        n.current &&
                          ('number' == typeof r
                            ? t.navigate(r)
                            : t.navigate(r, a({ fromRouteId: e }, i)))
                    },
                    [t, e],
                  )
                )
              })()
            : (function () {
                p() || (0, o.J0)(!1)
                let t = i.useContext(s),
                  { basename: e, future: n, navigator: r } = i.useContext(c),
                  { matches: a } = i.useContext(d),
                  { pathname: l } = g(),
                  u = JSON.stringify((0, o.cm)(a, n.v7_relativeSplatPath)),
                  h = i.useRef(!1)
                return (
                  m(() => {
                    h.current = !0
                  }),
                  i.useCallback(
                    function (n, i) {
                      if ((void 0 === i && (i = {}), !h.current)) return
                      if ('number' == typeof n) return void r.go(n)
                      let a = (0, o.pC)(n, JSON.parse(u), l, 'path' === i.relative)
                      null == t &&
                        '/' !== e &&
                        (a.pathname =
                          '/' === a.pathname ? e : (0, o.RQ)([e, a.pathname])),
                        (i.replace ? r.replace : r.push)(a, i.state, i)
                    },
                    [e, r, u, l, t],
                  )
                )
              })()
        }
        const y = i.createContext(null)
        function v(t, e) {
          let { relative: n } = void 0 === e ? {} : e,
            { future: r } = i.useContext(c),
            { matches: a } = i.useContext(d),
            { pathname: s } = g(),
            l = JSON.stringify((0, o.cm)(a, r.v7_relativeSplatPath))
          return i.useMemo(
            () => (0, o.pC)(t, JSON.parse(l), s, 'path' === n),
            [t, l, s, n],
          )
        }
        function x(t, e, n, r) {
          p() || (0, o.J0)(!1)
          let { navigator: s } = i.useContext(c),
            { matches: l } = i.useContext(d),
            h = l[l.length - 1],
            f = h ? h.params : {},
            m = (h && h.pathname, h ? h.pathnameBase : '/')
          h && h.route
          let b,
            y = g()
          if (e) {
            var v
            let t = 'string' == typeof e ? (0, o.cP)(e) : e
            '/' === m ||
              (null == (v = t.pathname) ? void 0 : v.startsWith(m)) ||
              (0, o.J0)(!1),
              (b = t)
          } else b = y
          let x = b.pathname || '/',
            w = '/' === m ? x : x.slice(m.length) || '/',
            _ = (0, o.fp)(t, { pathname: w })
          let k = E(
            _ &&
              _.map((t) =>
                Object.assign({}, t, {
                  params: Object.assign({}, f, t.params),
                  pathname: (0, o.RQ)([
                    m,
                    s.encodeLocation
                      ? s.encodeLocation(t.pathname).pathname
                      : t.pathname,
                  ]),
                  pathnameBase:
                    '/' === t.pathnameBase
                      ? m
                      : (0, o.RQ)([
                          m,
                          s.encodeLocation
                            ? s.encodeLocation(t.pathnameBase).pathname
                            : t.pathnameBase,
                        ]),
                }),
              ),
            l,
            n,
            r,
          )
          return e && k
            ? i.createElement(
                u.Provider,
                {
                  value: {
                    location: a(
                      {
                        pathname: '/',
                        search: '',
                        hash: '',
                        state: null,
                        key: 'default',
                      },
                      b,
                    ),
                    navigationType: o.aU.Pop,
                  },
                },
                k,
              )
            : k
        }
        function w() {
          let t = (function () {
              var t
              let e = i.useContext(h),
                n = O(M.UseRouteError),
                r = D(M.UseRouteError)
              if (void 0 !== e) return e
              return null == (t = n.errors) ? void 0 : t[r]
            })(),
            e = (0, o.WK)(t)
              ? t.status + ' ' + t.statusText
              : t instanceof Error
                ? t.message
                : JSON.stringify(t),
            n = t instanceof Error ? t.stack : null,
            r = 'rgba(200,200,200, 0.5)',
            a = { padding: '0.5rem', backgroundColor: r }
          return i.createElement(
            i.Fragment,
            null,
            i.createElement('h2', null, 'Unexpected Application Error!'),
            i.createElement('h3', { style: { fontStyle: 'italic' } }, e),
            n ? i.createElement('pre', { style: a }, n) : null,
            null,
          )
        }
        const _ = i.createElement(w, null)
        class k extends i.Component {
          constructor(t) {
            super(t),
              (this.state = {
                location: t.location,
                revalidation: t.revalidation,
                error: t.error,
              })
          }
          static getDerivedStateFromError(t) {
            return { error: t }
          }
          static getDerivedStateFromProps(t, e) {
            return e.location !== t.location ||
              ('idle' !== e.revalidation && 'idle' === t.revalidation)
              ? {
                  error: t.error,
                  location: t.location,
                  revalidation: t.revalidation,
                }
              : {
                  error: void 0 !== t.error ? t.error : e.error,
                  location: e.location,
                  revalidation: t.revalidation || e.revalidation,
                }
          }
          componentDidCatch(t, e) {
            console.error(
              'React Router caught the following error during render',
              t,
              e,
            )
          }
          render() {
            return void 0 !== this.state.error
              ? i.createElement(
                  d.Provider,
                  { value: this.props.routeContext },
                  i.createElement(h.Provider, {
                    value: this.state.error,
                    children: this.props.component,
                  }),
                )
              : this.props.children
          }
        }
        function S(t) {
          let { routeContext: e, match: n, children: r } = t,
            o = i.useContext(s)
          return (
            o &&
              o.static &&
              o.staticContext &&
              (n.route.errorElement || n.route.ErrorBoundary) &&
              (o.staticContext._deepestRenderedBoundaryId = n.route.id),
            i.createElement(d.Provider, { value: e }, r)
          )
        }
        function E(t, e, n, r) {
          var a
          if (
            (void 0 === e && (e = []),
            void 0 === n && (n = null),
            void 0 === r && (r = null),
            null == t)
          ) {
            var s
            if (null == (s = n) || !s.errors) return null
            t = n.matches
          }
          let l = t,
            c = null == (a = n) ? void 0 : a.errors
          if (null != c) {
            let t = l.findIndex(
              (t) => t.route.id && (null == c ? void 0 : c[t.route.id]),
            )
            t >= 0 || (0, o.J0)(!1), (l = l.slice(0, Math.min(l.length, t + 1)))
          }
          let u = !1,
            d = -1
          if (n && r && r.v7_partialHydration)
            for (let t = 0; t < l.length; t++) {
              let e = l[t]
              if (
                ((e.route.HydrateFallback || e.route.hydrateFallbackElement) &&
                  (d = t),
                e.route.id)
              ) {
                let { loaderData: t, errors: r } = n,
                  i =
                    e.route.loader &&
                    void 0 === t[e.route.id] &&
                    (!r || void 0 === r[e.route.id])
                if (e.route.lazy || i) {
                  ;(u = !0), (l = d >= 0 ? l.slice(0, d + 1) : [l[0]])
                  break
                }
              }
            }
          return l.reduceRight((t, r, o) => {
            let a,
              s = !1,
              h = null,
              f = null
            var p
            n &&
              ((a = c && r.route.id ? c[r.route.id] : void 0),
              (h = r.route.errorElement || _),
              u &&
                (d < 0 && 0 === o
                  ? ((p = 'route-fallback'),
                    !1 || T[p] || (T[p] = !0),
                    (s = !0),
                    (f = null))
                  : d === o &&
                    ((s = !0), (f = r.route.hydrateFallbackElement || null))))
            let g = e.concat(l.slice(0, o + 1)),
              m = () => {
                let e
                return (
                  (e = a
                    ? h
                    : s
                      ? f
                      : r.route.Component
                        ? i.createElement(r.route.Component, null)
                        : r.route.element
                          ? r.route.element
                          : t),
                  i.createElement(S, {
                    match: r,
                    routeContext: { outlet: t, matches: g, isDataRoute: null != n },
                    children: e,
                  })
                )
              }
            return n && (r.route.ErrorBoundary || r.route.errorElement || 0 === o)
              ? i.createElement(k, {
                  location: n.location,
                  revalidation: n.revalidation,
                  component: h,
                  error: a,
                  children: m(),
                  routeContext: { outlet: null, matches: g, isDataRoute: !0 },
                })
              : m()
          }, null)
        }
        var C = (function (t) {
            return (
              (t.UseBlocker = 'useBlocker'),
              (t.UseRevalidator = 'useRevalidator'),
              (t.UseNavigateStable = 'useNavigate'),
              t
            )
          })(C || {}),
          M = (function (t) {
            return (
              (t.UseBlocker = 'useBlocker'),
              (t.UseLoaderData = 'useLoaderData'),
              (t.UseActionData = 'useActionData'),
              (t.UseRouteError = 'useRouteError'),
              (t.UseNavigation = 'useNavigation'),
              (t.UseRouteLoaderData = 'useRouteLoaderData'),
              (t.UseMatches = 'useMatches'),
              (t.UseRevalidator = 'useRevalidator'),
              (t.UseNavigateStable = 'useNavigate'),
              (t.UseRouteId = 'useRouteId'),
              t
            )
          })(M || {})
        function P(t) {
          let e = i.useContext(s)
          return e || (0, o.J0)(!1), e
        }
        function O(t) {
          let e = i.useContext(l)
          return e || (0, o.J0)(!1), e
        }
        function D(t) {
          let e = (function (t) {
              let e = i.useContext(d)
              return e || (0, o.J0)(!1), e
            })(),
            n = e.matches[e.matches.length - 1]
          return n.route.id || (0, o.J0)(!1), n.route.id
        }
        const T = {}
        ;(r || (r = n.t(i, 2))).startTransition
        function R(t) {
          return (function (t) {
            let e = i.useContext(d).outlet
            return e ? i.createElement(y.Provider, { value: t }, e) : e
          })(t.context)
        }
        function L(t) {
          let {
            basename: e = '/',
            children: n = null,
            location: r,
            navigationType: s = o.aU.Pop,
            navigator: l,
            static: d = !1,
            future: h,
          } = t
          p() && (0, o.J0)(!1)
          let f = e.replace(/^\/*/, '/'),
            g = i.useMemo(
              () => ({
                basename: f,
                navigator: l,
                static: d,
                future: a({ v7_relativeSplatPath: !1 }, h),
              }),
              [f, h, l, d],
            )
          'string' == typeof r && (r = (0, o.cP)(r))
          let {
              pathname: m = '/',
              search: b = '',
              hash: y = '',
              state: v = null,
              key: x = 'default',
            } = r,
            w = i.useMemo(() => {
              let t = (0, o.Zn)(m, f)
              return null == t
                ? null
                : {
                    location: { pathname: t, search: b, hash: y, state: v, key: x },
                    navigationType: s,
                  }
            }, [f, m, b, y, v, x, s])
          return null == w
            ? null
            : i.createElement(
                c.Provider,
                { value: g },
                i.createElement(u.Provider, { children: n, value: w }),
              )
        }
        new Promise(() => {})
        i.Component
        function A(t) {
          let e = {
            hasErrorBoundary: null != t.ErrorBoundary || null != t.errorElement,
          }
          return (
            t.Component &&
              Object.assign(e, {
                element: i.createElement(t.Component),
                Component: void 0,
              }),
            t.HydrateFallback &&
              Object.assign(e, {
                hydrateFallbackElement: i.createElement(t.HydrateFallback),
                HydrateFallback: void 0,
              }),
            t.ErrorBoundary &&
              Object.assign(e, {
                errorElement: i.createElement(t.ErrorBoundary),
                ErrorBoundary: void 0,
              }),
            e
          )
        }
      },
      251: (t, e, n) => {
        var r = n(294),
          i = Symbol.for('react.element'),
          o = Symbol.for('react.fragment'),
          a = Object.prototype.hasOwnProperty,
          s =
            r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
          l = { key: !0, ref: !0, __self: !0, __source: !0 }
        function c(t, e, n) {
          var r,
            o = {},
            c = null,
            u = null
          for (r in (void 0 !== n && (c = '' + n),
          void 0 !== e.key && (c = '' + e.key),
          void 0 !== e.ref && (u = e.ref),
          e))
            a.call(e, r) && !l.hasOwnProperty(r) && (o[r] = e[r])
          if (t && t.defaultProps)
            for (r in (e = t.defaultProps)) void 0 === o[r] && (o[r] = e[r])
          return {
            $$typeof: i,
            type: t,
            key: c,
            ref: u,
            props: o,
            _owner: s.current,
          }
        }
        ;(e.Fragment = o), (e.jsx = c), (e.jsxs = c)
      },
      408: (t, e) => {
        var n = Symbol.for('react.element'),
          r = Symbol.for('react.portal'),
          i = Symbol.for('react.fragment'),
          o = Symbol.for('react.strict_mode'),
          a = Symbol.for('react.profiler'),
          s = Symbol.for('react.provider'),
          l = Symbol.for('react.context'),
          c = Symbol.for('react.forward_ref'),
          u = Symbol.for('react.suspense'),
          d = Symbol.for('react.memo'),
          h = Symbol.for('react.lazy'),
          f = Symbol.iterator
        var p = {
            isMounted: function () {
              return !1
            },
            enqueueForceUpdate: function () {},
            enqueueReplaceState: function () {},
            enqueueSetState: function () {},
          },
          g = Object.assign,
          m = {}
        function b(t, e, n) {
          ;(this.props = t),
            (this.context = e),
            (this.refs = m),
            (this.updater = n || p)
        }
        function y() {}
        function v(t, e, n) {
          ;(this.props = t),
            (this.context = e),
            (this.refs = m),
            (this.updater = n || p)
        }
        ;(b.prototype.isReactComponent = {}),
          (b.prototype.setState = function (t, e) {
            if ('object' != typeof t && 'function' != typeof t && null != t)
              throw Error(
                'setState(...): takes an object of state variables to update or a function which returns an object of state variables.',
              )
            this.updater.enqueueSetState(this, t, e, 'setState')
          }),
          (b.prototype.forceUpdate = function (t) {
            this.updater.enqueueForceUpdate(this, t, 'forceUpdate')
          }),
          (y.prototype = b.prototype)
        var x = (v.prototype = new y())
        ;(x.constructor = v), g(x, b.prototype), (x.isPureReactComponent = !0)
        var w = Array.isArray,
          _ = Object.prototype.hasOwnProperty,
          k = { current: null },
          S = { key: !0, ref: !0, __self: !0, __source: !0 }
        function E(t, e, r) {
          var i,
            o = {},
            a = null,
            s = null
          if (null != e)
            for (i in (void 0 !== e.ref && (s = e.ref),
            void 0 !== e.key && (a = '' + e.key),
            e))
              _.call(e, i) && !S.hasOwnProperty(i) && (o[i] = e[i])
          var l = arguments.length - 2
          if (1 === l) o.children = r
          else if (1 < l) {
            for (var c = Array(l), u = 0; u < l; u++) c[u] = arguments[u + 2]
            o.children = c
          }
          if (t && t.defaultProps)
            for (i in (l = t.defaultProps)) void 0 === o[i] && (o[i] = l[i])
          return {
            $$typeof: n,
            type: t,
            key: a,
            ref: s,
            props: o,
            _owner: k.current,
          }
        }
        function C(t) {
          return 'object' == typeof t && null !== t && t.$$typeof === n
        }
        var M = /\/+/g
        function P(t, e) {
          return 'object' == typeof t && null !== t && null != t.key
            ? (function (t) {
                var e = { '=': '=0', ':': '=2' }
                return (
                  '$' +
                  t.replace(/[=:]/g, function (t) {
                    return e[t]
                  })
                )
              })('' + t.key)
            : e.toString(36)
        }
        function O(t, e, i, o, a) {
          var s = typeof t
          ;('undefined' !== s && 'boolean' !== s) || (t = null)
          var l = !1
          if (null === t) l = !0
          else
            switch (s) {
              case 'string':
              case 'number':
                l = !0
                break
              case 'object':
                switch (t.$$typeof) {
                  case n:
                  case r:
                    l = !0
                }
            }
          if (l)
            return (
              (a = a((l = t))),
              (t = '' === o ? '.' + P(l, 0) : o),
              w(a)
                ? ((i = ''),
                  null != t && (i = t.replace(M, '$&/') + '/'),
                  O(a, e, i, '', function (t) {
                    return t
                  }))
                : null != a &&
                  (C(a) &&
                    (a = (function (t, e) {
                      return {
                        $$typeof: n,
                        type: t.type,
                        key: e,
                        ref: t.ref,
                        props: t.props,
                        _owner: t._owner,
                      }
                    })(
                      a,
                      i +
                        (!a.key || (l && l.key === a.key)
                          ? ''
                          : ('' + a.key).replace(M, '$&/') + '/') +
                        t,
                    )),
                  e.push(a)),
              1
            )
          if (((l = 0), (o = '' === o ? '.' : o + ':'), w(t)))
            for (var c = 0; c < t.length; c++) {
              var u = o + P((s = t[c]), c)
              l += O(s, e, i, u, a)
            }
          else if (
            ((u = (function (t) {
              return null === t || 'object' != typeof t
                ? null
                : 'function' == typeof (t = (f && t[f]) || t['@@iterator'])
                  ? t
                  : null
            })(t)),
            'function' == typeof u)
          )
            for (t = u.call(t), c = 0; !(s = t.next()).done; )
              l += O((s = s.value), e, i, (u = o + P(s, c++)), a)
          else if ('object' === s)
            throw (
              ((e = String(t)),
              Error(
                'Objects are not valid as a React child (found: ' +
                  ('[object Object]' === e
                    ? 'object with keys {' + Object.keys(t).join(', ') + '}'
                    : e) +
                  '). If you meant to render a collection of children, use an array instead.',
              ))
            )
          return l
        }
        function D(t, e, n) {
          if (null == t) return t
          var r = [],
            i = 0
          return (
            O(t, r, '', '', function (t) {
              return e.call(n, t, i++)
            }),
            r
          )
        }
        function T(t) {
          if (-1 === t._status) {
            var e = t._result
            ;(e = e()).then(
              function (e) {
                ;(0 !== t._status && -1 !== t._status) ||
                  ((t._status = 1), (t._result = e))
              },
              function (e) {
                ;(0 !== t._status && -1 !== t._status) ||
                  ((t._status = 2), (t._result = e))
              },
            ),
              -1 === t._status && ((t._status = 0), (t._result = e))
          }
          if (1 === t._status) return t._result.default
          throw t._result
        }
        var R = { current: null },
          L = { transition: null },
          A = {
            ReactCurrentDispatcher: R,
            ReactCurrentBatchConfig: L,
            ReactCurrentOwner: k,
          }
        ;(e.Children = {
          map: D,
          forEach: function (t, e, n) {
            D(
              t,
              function () {
                e.apply(this, arguments)
              },
              n,
            )
          },
          count: function (t) {
            var e = 0
            return (
              D(t, function () {
                e++
              }),
              e
            )
          },
          toArray: function (t) {
            return (
              D(t, function (t) {
                return t
              }) || []
            )
          },
          only: function (t) {
            if (!C(t))
              throw Error(
                'React.Children.only expected to receive a single React element child.',
              )
            return t
          },
        }),
          (e.Component = b),
          (e.Fragment = i),
          (e.Profiler = a),
          (e.PureComponent = v),
          (e.StrictMode = o),
          (e.Suspense = u),
          (e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = A),
          (e.cloneElement = function (t, e, r) {
            if (null == t)
              throw Error(
                'React.cloneElement(...): The argument must be a React element, but you passed ' +
                  t +
                  '.',
              )
            var i = g({}, t.props),
              o = t.key,
              a = t.ref,
              s = t._owner
            if (null != e) {
              if (
                (void 0 !== e.ref && ((a = e.ref), (s = k.current)),
                void 0 !== e.key && (o = '' + e.key),
                t.type && t.type.defaultProps)
              )
                var l = t.type.defaultProps
              for (c in e)
                _.call(e, c) &&
                  !S.hasOwnProperty(c) &&
                  (i[c] = void 0 === e[c] && void 0 !== l ? l[c] : e[c])
            }
            var c = arguments.length - 2
            if (1 === c) i.children = r
            else if (1 < c) {
              l = Array(c)
              for (var u = 0; u < c; u++) l[u] = arguments[u + 2]
              i.children = l
            }
            return {
              $$typeof: n,
              type: t.type,
              key: o,
              ref: a,
              props: i,
              _owner: s,
            }
          }),
          (e.createContext = function (t) {
            return (
              ((t = {
                $$typeof: l,
                _currentValue: t,
                _currentValue2: t,
                _threadCount: 0,
                Provider: null,
                Consumer: null,
                _defaultValue: null,
                _globalName: null,
              }).Provider = { $$typeof: s, _context: t }),
              (t.Consumer = t)
            )
          }),
          (e.createElement = E),
          (e.createFactory = function (t) {
            var e = E.bind(null, t)
            return (e.type = t), e
          }),
          (e.createRef = function () {
            return { current: null }
          }),
          (e.forwardRef = function (t) {
            return { $$typeof: c, render: t }
          }),
          (e.isValidElement = C),
          (e.lazy = function (t) {
            return { $$typeof: h, _payload: { _status: -1, _result: t }, _init: T }
          }),
          (e.memo = function (t, e) {
            return { $$typeof: d, type: t, compare: void 0 === e ? null : e }
          }),
          (e.startTransition = function (t) {
            var e = L.transition
            L.transition = {}
            try {
              t()
            } finally {
              L.transition = e
            }
          }),
          (e.unstable_act = function () {
            throw Error('act(...) is not supported in production builds of React.')
          }),
          (e.useCallback = function (t, e) {
            return R.current.useCallback(t, e)
          }),
          (e.useContext = function (t) {
            return R.current.useContext(t)
          }),
          (e.useDebugValue = function () {}),
          (e.useDeferredValue = function (t) {
            return R.current.useDeferredValue(t)
          }),
          (e.useEffect = function (t, e) {
            return R.current.useEffect(t, e)
          }),
          (e.useId = function () {
            return R.current.useId()
          }),
          (e.useImperativeHandle = function (t, e, n) {
            return R.current.useImperativeHandle(t, e, n)
          }),
          (e.useInsertionEffect = function (t, e) {
            return R.current.useInsertionEffect(t, e)
          }),
          (e.useLayoutEffect = function (t, e) {
            return R.current.useLayoutEffect(t, e)
          }),
          (e.useMemo = function (t, e) {
            return R.current.useMemo(t, e)
          }),
          (e.useReducer = function (t, e, n) {
            return R.current.useReducer(t, e, n)
          }),
          (e.useRef = function (t) {
            return R.current.useRef(t)
          }),
          (e.useState = function (t) {
            return R.current.useState(t)
          }),
          (e.useSyncExternalStore = function (t, e, n) {
            return R.current.useSyncExternalStore(t, e, n)
          }),
          (e.useTransition = function () {
            return R.current.useTransition()
          }),
          (e.version = '18.2.0')
      },
      294: (t, e, n) => {
        t.exports = n(408)
      },
      893: (t, e, n) => {
        t.exports = n(251)
      },
      53: (t, e) => {
        function n(t, e) {
          var n = t.length
          t.push(e)
          t: for (; 0 < n; ) {
            var r = (n - 1) >>> 1,
              i = t[r]
            if (!(0 < o(i, e))) break t
            ;(t[r] = e), (t[n] = i), (n = r)
          }
        }
        function r(t) {
          return 0 === t.length ? null : t[0]
        }
        function i(t) {
          if (0 === t.length) return null
          var e = t[0],
            n = t.pop()
          if (n !== e) {
            t[0] = n
            t: for (var r = 0, i = t.length, a = i >>> 1; r < a; ) {
              var s = 2 * (r + 1) - 1,
                l = t[s],
                c = s + 1,
                u = t[c]
              if (0 > o(l, n))
                c < i && 0 > o(u, l)
                  ? ((t[r] = u), (t[c] = n), (r = c))
                  : ((t[r] = l), (t[s] = n), (r = s))
              else {
                if (!(c < i && 0 > o(u, n))) break t
                ;(t[r] = u), (t[c] = n), (r = c)
              }
            }
          }
          return e
        }
        function o(t, e) {
          var n = t.sortIndex - e.sortIndex
          return 0 !== n ? n : t.id - e.id
        }
        if (
          'object' == typeof performance &&
          'function' == typeof performance.now
        ) {
          var a = performance
          e.unstable_now = function () {
            return a.now()
          }
        } else {
          var s = Date,
            l = s.now()
          e.unstable_now = function () {
            return s.now() - l
          }
        }
        var c = [],
          u = [],
          d = 1,
          h = null,
          f = 3,
          p = !1,
          g = !1,
          m = !1,
          b = 'function' == typeof setTimeout ? setTimeout : null,
          y = 'function' == typeof clearTimeout ? clearTimeout : null,
          v = 'undefined' != typeof setImmediate ? setImmediate : null
        function x(t) {
          for (var e = r(u); null !== e; ) {
            if (null === e.callback) i(u)
            else {
              if (!(e.startTime <= t)) break
              i(u), (e.sortIndex = e.expirationTime), n(c, e)
            }
            e = r(u)
          }
        }
        function w(t) {
          if (((m = !1), x(t), !g))
            if (null !== r(c)) (g = !0), L(_)
            else {
              var e = r(u)
              null !== e && A(w, e.startTime - t)
            }
        }
        function _(t, n) {
          ;(g = !1), m && ((m = !1), y(C), (C = -1)), (p = !0)
          var o = f
          try {
            for (
              x(n), h = r(c);
              null !== h && (!(h.expirationTime > n) || (t && !O()));

            ) {
              var a = h.callback
              if ('function' == typeof a) {
                ;(h.callback = null), (f = h.priorityLevel)
                var s = a(h.expirationTime <= n)
                ;(n = e.unstable_now()),
                  'function' == typeof s ? (h.callback = s) : h === r(c) && i(c),
                  x(n)
              } else i(c)
              h = r(c)
            }
            if (null !== h) var l = !0
            else {
              var d = r(u)
              null !== d && A(w, d.startTime - n), (l = !1)
            }
            return l
          } finally {
            ;(h = null), (f = o), (p = !1)
          }
        }
        'undefined' != typeof navigator &&
          void 0 !== navigator.scheduling &&
          void 0 !== navigator.scheduling.isInputPending &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling)
        var k,
          S = !1,
          E = null,
          C = -1,
          M = 5,
          P = -1
        function O() {
          return !(e.unstable_now() - P < M)
        }
        function D() {
          if (null !== E) {
            var t = e.unstable_now()
            P = t
            var n = !0
            try {
              n = E(!0, t)
            } finally {
              n ? k() : ((S = !1), (E = null))
            }
          } else S = !1
        }
        if ('function' == typeof v)
          k = function () {
            v(D)
          }
        else if ('undefined' != typeof MessageChannel) {
          var T = new MessageChannel(),
            R = T.port2
          ;(T.port1.onmessage = D),
            (k = function () {
              R.postMessage(null)
            })
        } else
          k = function () {
            b(D, 0)
          }
        function L(t) {
          ;(E = t), S || ((S = !0), k())
        }
        function A(t, n) {
          C = b(function () {
            t(e.unstable_now())
          }, n)
        }
        ;(e.unstable_IdlePriority = 5),
          (e.unstable_ImmediatePriority = 1),
          (e.unstable_LowPriority = 4),
          (e.unstable_NormalPriority = 3),
          (e.unstable_Profiling = null),
          (e.unstable_UserBlockingPriority = 2),
          (e.unstable_cancelCallback = function (t) {
            t.callback = null
          }),
          (e.unstable_continueExecution = function () {
            g || p || ((g = !0), L(_))
          }),
          (e.unstable_forceFrameRate = function (t) {
            0 > t || 125 < t
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
                )
              : (M = 0 < t ? Math.floor(1e3 / t) : 5)
          }),
          (e.unstable_getCurrentPriorityLevel = function () {
            return f
          }),
          (e.unstable_getFirstCallbackNode = function () {
            return r(c)
          }),
          (e.unstable_next = function (t) {
            switch (f) {
              case 1:
              case 2:
              case 3:
                var e = 3
                break
              default:
                e = f
            }
            var n = f
            f = e
            try {
              return t()
            } finally {
              f = n
            }
          }),
          (e.unstable_pauseExecution = function () {}),
          (e.unstable_requestPaint = function () {}),
          (e.unstable_runWithPriority = function (t, e) {
            switch (t) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break
              default:
                t = 3
            }
            var n = f
            f = t
            try {
              return e()
            } finally {
              f = n
            }
          }),
          (e.unstable_scheduleCallback = function (t, i, o) {
            var a = e.unstable_now()
            switch (
              ('object' == typeof o && null !== o
                ? (o = 'number' == typeof (o = o.delay) && 0 < o ? a + o : a)
                : (o = a),
              t)
            ) {
              case 1:
                var s = -1
                break
              case 2:
                s = 250
                break
              case 5:
                s = 1073741823
                break
              case 4:
                s = 1e4
                break
              default:
                s = 5e3
            }
            return (
              (t = {
                id: d++,
                callback: i,
                priorityLevel: t,
                startTime: o,
                expirationTime: (s = o + s),
                sortIndex: -1,
              }),
              o > a
                ? ((t.sortIndex = o),
                  n(u, t),
                  null === r(c) &&
                    t === r(u) &&
                    (m ? (y(C), (C = -1)) : (m = !0), A(w, o - a)))
                : ((t.sortIndex = s), n(c, t), g || p || ((g = !0), L(_))),
              t
            )
          }),
          (e.unstable_shouldYield = O),
          (e.unstable_wrapCallback = function (t) {
            var e = f
            return function () {
              var n = f
              f = e
              try {
                return t.apply(this, arguments)
              } finally {
                f = n
              }
            }
          })
      },
      840: (t, e, n) => {
        t.exports = n(53)
      },
      257: (t, e, n) => {
        n.d(e, { Z: () => qt })
        var r = {}
        function i(t, e) {
          return function () {
            return t.apply(e, arguments)
          }
        }
        n.r(r),
          n.d(r, {
            hasBrowserEnv: () => rt,
            hasStandardBrowserEnv: () => it,
            hasStandardBrowserWebWorkerEnv: () => at,
          })
        const { toString: o } = Object.prototype,
          { getPrototypeOf: a } = Object,
          s =
            ((l = Object.create(null)),
            (t) => {
              const e = o.call(t)
              return l[e] || (l[e] = e.slice(8, -1).toLowerCase())
            })
        var l
        const c = (t) => ((t = t.toLowerCase()), (e) => s(e) === t),
          u = (t) => (e) => typeof e === t,
          { isArray: d } = Array,
          h = u('undefined')
        const f = c('ArrayBuffer')
        const p = u('string'),
          g = u('function'),
          m = u('number'),
          b = (t) => null !== t && 'object' == typeof t,
          y = (t) => {
            if ('object' !== s(t)) return !1
            const e = a(t)
            return !(
              (null !== e &&
                e !== Object.prototype &&
                null !== Object.getPrototypeOf(e)) ||
              Symbol.toStringTag in t ||
              Symbol.iterator in t
            )
          },
          v = c('Date'),
          x = c('File'),
          w = c('Blob'),
          _ = c('FileList'),
          k = c('URLSearchParams')
        function S(t, e, { allOwnKeys: n = !1 } = {}) {
          if (null == t) return
          let r, i
          if (('object' != typeof t && (t = [t]), d(t)))
            for (r = 0, i = t.length; r < i; r++) e.call(null, t[r], r, t)
          else {
            const i = n ? Object.getOwnPropertyNames(t) : Object.keys(t),
              o = i.length
            let a
            for (r = 0; r < o; r++) (a = i[r]), e.call(null, t[a], a, t)
          }
        }
        function E(t, e) {
          e = e.toLowerCase()
          const n = Object.keys(t)
          let r,
            i = n.length
          for (; i-- > 0; ) if (((r = n[i]), e === r.toLowerCase())) return r
          return null
        }
        const C =
            'undefined' != typeof globalThis
              ? globalThis
              : 'undefined' != typeof self
                ? self
                : 'undefined' != typeof window
                  ? window
                  : global,
          M = (t) => !h(t) && t !== C
        const P =
          ((O = 'undefined' != typeof Uint8Array && a(Uint8Array)),
          (t) => O && t instanceof O)
        var O
        const D = c('HTMLFormElement'),
          T = (
            ({ hasOwnProperty: t }) =>
            (e, n) =>
              t.call(e, n)
          )(Object.prototype),
          R = c('RegExp'),
          L = (t, e) => {
            const n = Object.getOwnPropertyDescriptors(t),
              r = {}
            S(n, (n, i) => {
              let o
              !1 !== (o = e(n, i, t)) && (r[i] = o || n)
            }),
              Object.defineProperties(t, r)
          },
          A = 'abcdefghijklmnopqrstuvwxyz',
          N = '0123456789',
          j = { DIGIT: N, ALPHA: A, ALPHA_DIGIT: A + A.toUpperCase() + N }
        const z = c('AsyncFunction'),
          F = {
            isArray: d,
            isArrayBuffer: f,
            isBuffer: function (t) {
              return (
                null !== t &&
                !h(t) &&
                null !== t.constructor &&
                !h(t.constructor) &&
                g(t.constructor.isBuffer) &&
                t.constructor.isBuffer(t)
              )
            },
            isFormData: (t) => {
              let e
              return (
                t &&
                (('function' == typeof FormData && t instanceof FormData) ||
                  (g(t.append) &&
                    ('formdata' === (e = s(t)) ||
                      ('object' === e &&
                        g(t.toString) &&
                        '[object FormData]' === t.toString()))))
              )
            },
            isArrayBufferView: function (t) {
              let e
              return (
                (e =
                  'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
                    ? ArrayBuffer.isView(t)
                    : t && t.buffer && f(t.buffer)),
                e
              )
            },
            isString: p,
            isNumber: m,
            isBoolean: (t) => !0 === t || !1 === t,
            isObject: b,
            isPlainObject: y,
            isUndefined: h,
            isDate: v,
            isFile: x,
            isBlob: w,
            isRegExp: R,
            isFunction: g,
            isStream: (t) => b(t) && g(t.pipe),
            isURLSearchParams: k,
            isTypedArray: P,
            isFileList: _,
            forEach: S,
            merge: function t() {
              const { caseless: e } = (M(this) && this) || {},
                n = {},
                r = (r, i) => {
                  const o = (e && E(n, i)) || i
                  y(n[o]) && y(r)
                    ? (n[o] = t(n[o], r))
                    : y(r)
                      ? (n[o] = t({}, r))
                      : d(r)
                        ? (n[o] = r.slice())
                        : (n[o] = r)
                }
              for (let t = 0, e = arguments.length; t < e; t++)
                arguments[t] && S(arguments[t], r)
              return n
            },
            extend: (t, e, n, { allOwnKeys: r } = {}) => (
              S(
                e,
                (e, r) => {
                  n && g(e) ? (t[r] = i(e, n)) : (t[r] = e)
                },
                { allOwnKeys: r },
              ),
              t
            ),
            trim: (t) =>
              t.trim
                ? t.trim()
                : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''),
            stripBOM: (t) => (65279 === t.charCodeAt(0) && (t = t.slice(1)), t),
            inherits: (t, e, n, r) => {
              ;(t.prototype = Object.create(e.prototype, r)),
                (t.prototype.constructor = t),
                Object.defineProperty(t, 'super', { value: e.prototype }),
                n && Object.assign(t.prototype, n)
            },
            toFlatObject: (t, e, n, r) => {
              let i, o, s
              const l = {}
              if (((e = e || {}), null == t)) return e
              do {
                for (i = Object.getOwnPropertyNames(t), o = i.length; o-- > 0; )
                  (s = i[o]),
                    (r && !r(s, t, e)) || l[s] || ((e[s] = t[s]), (l[s] = !0))
                t = !1 !== n && a(t)
              } while (t && (!n || n(t, e)) && t !== Object.prototype)
              return e
            },
            kindOf: s,
            kindOfTest: c,
            endsWith: (t, e, n) => {
              ;(t = String(t)),
                (void 0 === n || n > t.length) && (n = t.length),
                (n -= e.length)
              const r = t.indexOf(e, n)
              return -1 !== r && r === n
            },
            toArray: (t) => {
              if (!t) return null
              if (d(t)) return t
              let e = t.length
              if (!m(e)) return null
              const n = new Array(e)
              for (; e-- > 0; ) n[e] = t[e]
              return n
            },
            forEachEntry: (t, e) => {
              const n = (t && t[Symbol.iterator]).call(t)
              let r
              for (; (r = n.next()) && !r.done; ) {
                const n = r.value
                e.call(t, n[0], n[1])
              }
            },
            matchAll: (t, e) => {
              let n
              const r = []
              for (; null !== (n = t.exec(e)); ) r.push(n)
              return r
            },
            isHTMLForm: D,
            hasOwnProperty: T,
            hasOwnProp: T,
            reduceDescriptors: L,
            freezeMethods: (t) => {
              L(t, (e, n) => {
                if (g(t) && -1 !== ['arguments', 'caller', 'callee'].indexOf(n))
                  return !1
                const r = t[n]
                g(r) &&
                  ((e.enumerable = !1),
                  'writable' in e
                    ? (e.writable = !1)
                    : e.set ||
                      (e.set = () => {
                        throw Error("Can not rewrite read-only method '" + n + "'")
                      }))
              })
            },
            toObjectSet: (t, e) => {
              const n = {},
                r = (t) => {
                  t.forEach((t) => {
                    n[t] = !0
                  })
                }
              return d(t) ? r(t) : r(String(t).split(e)), n
            },
            toCamelCase: (t) =>
              t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (t, e, n) {
                return e.toUpperCase() + n
              }),
            noop: () => {},
            toFiniteNumber: (t, e) => ((t = +t), Number.isFinite(t) ? t : e),
            findKey: E,
            global: C,
            isContextDefined: M,
            ALPHABET: j,
            generateString: (t = 16, e = j.ALPHA_DIGIT) => {
              let n = ''
              const { length: r } = e
              for (; t--; ) n += e[(Math.random() * r) | 0]
              return n
            },
            isSpecCompliantForm: function (t) {
              return !!(
                t &&
                g(t.append) &&
                'FormData' === t[Symbol.toStringTag] &&
                t[Symbol.iterator]
              )
            },
            toJSONObject: (t) => {
              const e = new Array(10),
                n = (t, r) => {
                  if (b(t)) {
                    if (e.indexOf(t) >= 0) return
                    if (!('toJSON' in t)) {
                      e[r] = t
                      const i = d(t) ? [] : {}
                      return (
                        S(t, (t, e) => {
                          const o = n(t, r + 1)
                          !h(o) && (i[e] = o)
                        }),
                        (e[r] = void 0),
                        i
                      )
                    }
                  }
                  return t
                }
              return n(t, 0)
            },
            isAsyncFn: z,
            isThenable: (t) => t && (b(t) || g(t)) && g(t.then) && g(t.catch),
          }
        function I(t, e, n, r, i) {
          Error.call(this),
            Error.captureStackTrace
              ? Error.captureStackTrace(this, this.constructor)
              : (this.stack = new Error().stack),
            (this.message = t),
            (this.name = 'AxiosError'),
            e && (this.code = e),
            n && (this.config = n),
            r && (this.request = r),
            i && (this.response = i)
        }
        F.inherits(I, Error, {
          toJSON: function () {
            return {
              message: this.message,
              name: this.name,
              description: this.description,
              number: this.number,
              fileName: this.fileName,
              lineNumber: this.lineNumber,
              columnNumber: this.columnNumber,
              stack: this.stack,
              config: F.toJSONObject(this.config),
              code: this.code,
              status:
                this.response && this.response.status ? this.response.status : null,
            }
          },
        })
        const B = I.prototype,
          U = {}
        ;[
          'ERR_BAD_OPTION_VALUE',
          'ERR_BAD_OPTION',
          'ECONNABORTED',
          'ETIMEDOUT',
          'ERR_NETWORK',
          'ERR_FR_TOO_MANY_REDIRECTS',
          'ERR_DEPRECATED',
          'ERR_BAD_RESPONSE',
          'ERR_BAD_REQUEST',
          'ERR_CANCELED',
          'ERR_NOT_SUPPORT',
          'ERR_INVALID_URL',
        ].forEach((t) => {
          U[t] = { value: t }
        }),
          Object.defineProperties(I, U),
          Object.defineProperty(B, 'isAxiosError', { value: !0 }),
          (I.from = (t, e, n, r, i, o) => {
            const a = Object.create(B)
            return (
              F.toFlatObject(
                t,
                a,
                function (t) {
                  return t !== Error.prototype
                },
                (t) => 'isAxiosError' !== t,
              ),
              I.call(a, t.message, e, n, r, i),
              (a.cause = t),
              (a.name = t.name),
              o && Object.assign(a, o),
              a
            )
          })
        const W = I
        function V(t) {
          return F.isPlainObject(t) || F.isArray(t)
        }
        function H(t) {
          return F.endsWith(t, '[]') ? t.slice(0, -2) : t
        }
        function $(t, e, n) {
          return t
            ? t
                .concat(e)
                .map(function (t, e) {
                  return (t = H(t)), !n && e ? '[' + t + ']' : t
                })
                .join(n ? '.' : '')
            : e
        }
        const Y = F.toFlatObject(F, {}, null, function (t) {
          return /^is[A-Z]/.test(t)
        })
        const q = function (t, e, n) {
          if (!F.isObject(t)) throw new TypeError('target must be an object')
          e = e || new FormData()
          const r = (n = F.toFlatObject(
              n,
              { metaTokens: !0, dots: !1, indexes: !1 },
              !1,
              function (t, e) {
                return !F.isUndefined(e[t])
              },
            )).metaTokens,
            i = n.visitor || c,
            o = n.dots,
            a = n.indexes,
            s =
              (n.Blob || ('undefined' != typeof Blob && Blob)) &&
              F.isSpecCompliantForm(e)
          if (!F.isFunction(i)) throw new TypeError('visitor must be a function')
          function l(t) {
            if (null === t) return ''
            if (F.isDate(t)) return t.toISOString()
            if (!s && F.isBlob(t))
              throw new W('Blob is not supported. Use a Buffer instead.')
            return F.isArrayBuffer(t) || F.isTypedArray(t)
              ? s && 'function' == typeof Blob
                ? new Blob([t])
                : Buffer.from(t)
              : t
          }
          function c(t, n, i) {
            let s = t
            if (t && !i && 'object' == typeof t)
              if (F.endsWith(n, '{}'))
                (n = r ? n : n.slice(0, -2)), (t = JSON.stringify(t))
              else if (
                (F.isArray(t) &&
                  (function (t) {
                    return F.isArray(t) && !t.some(V)
                  })(t)) ||
                ((F.isFileList(t) || F.endsWith(n, '[]')) && (s = F.toArray(t)))
              )
                return (
                  (n = H(n)),
                  s.forEach(function (t, r) {
                    !F.isUndefined(t) &&
                      null !== t &&
                      e.append(
                        !0 === a ? $([n], r, o) : null === a ? n : n + '[]',
                        l(t),
                      )
                  }),
                  !1
                )
            return !!V(t) || (e.append($(i, n, o), l(t)), !1)
          }
          const u = [],
            d = Object.assign(Y, {
              defaultVisitor: c,
              convertValue: l,
              isVisitable: V,
            })
          if (!F.isObject(t)) throw new TypeError('data must be an object')
          return (
            (function t(n, r) {
              if (!F.isUndefined(n)) {
                if (-1 !== u.indexOf(n))
                  throw Error('Circular reference detected in ' + r.join('.'))
                u.push(n),
                  F.forEach(n, function (n, o) {
                    !0 ===
                      (!(F.isUndefined(n) || null === n) &&
                        i.call(e, n, F.isString(o) ? o.trim() : o, r, d)) &&
                      t(n, r ? r.concat(o) : [o])
                  }),
                  u.pop()
              }
            })(t),
            e
          )
        }
        function Q(t) {
          const e = {
            '!': '%21',
            "'": '%27',
            '(': '%28',
            ')': '%29',
            '~': '%7E',
            '%20': '+',
            '%00': '\0',
          }
          return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function (t) {
            return e[t]
          })
        }
        function X(t, e) {
          ;(this._pairs = []), t && q(t, this, e)
        }
        const K = X.prototype
        ;(K.append = function (t, e) {
          this._pairs.push([t, e])
        }),
          (K.toString = function (t) {
            const e = t
              ? function (e) {
                  return t.call(this, e, Q)
                }
              : Q
            return this._pairs
              .map(function (t) {
                return e(t[0]) + '=' + e(t[1])
              }, '')
              .join('&')
          })
        const Z = X
        function J(t) {
          return encodeURIComponent(t)
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',')
            .replace(/%20/g, '+')
            .replace(/%5B/gi, '[')
            .replace(/%5D/gi, ']')
        }
        function G(t, e, n) {
          if (!e) return t
          const r = (n && n.encode) || J,
            i = n && n.serialize
          let o
          if (
            ((o = i
              ? i(e, n)
              : F.isURLSearchParams(e)
                ? e.toString()
                : new Z(e, n).toString(r)),
            o)
          ) {
            const e = t.indexOf('#')
            ;-1 !== e && (t = t.slice(0, e)),
              (t += (-1 === t.indexOf('?') ? '?' : '&') + o)
          }
          return t
        }
        const tt = class {
            constructor() {
              this.handlers = []
            }
            use(t, e, n) {
              return (
                this.handlers.push({
                  fulfilled: t,
                  rejected: e,
                  synchronous: !!n && n.synchronous,
                  runWhen: n ? n.runWhen : null,
                }),
                this.handlers.length - 1
              )
            }
            eject(t) {
              this.handlers[t] && (this.handlers[t] = null)
            }
            clear() {
              this.handlers && (this.handlers = [])
            }
            forEach(t) {
              F.forEach(this.handlers, function (e) {
                null !== e && t(e)
              })
            }
          },
          et = {
            silentJSONParsing: !0,
            forcedJSONParsing: !0,
            clarifyTimeoutError: !1,
          },
          nt = {
            isBrowser: !0,
            classes: {
              URLSearchParams:
                'undefined' != typeof URLSearchParams ? URLSearchParams : Z,
              FormData: 'undefined' != typeof FormData ? FormData : null,
              Blob: 'undefined' != typeof Blob ? Blob : null,
            },
            protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
          },
          rt = 'undefined' != typeof window && 'undefined' != typeof document,
          it =
            ((ot = 'undefined' != typeof navigator && navigator.product),
            rt && ['ReactNative', 'NativeScript', 'NS'].indexOf(ot) < 0)
        var ot
        const at =
            'undefined' != typeof WorkerGlobalScope &&
            self instanceof WorkerGlobalScope &&
            'function' == typeof self.importScripts,
          st = { ...r, ...nt }
        const lt = function (t) {
          function e(t, n, r, i) {
            let o = t[i++]
            if ('__proto__' === o) return !0
            const a = Number.isFinite(+o),
              s = i >= t.length
            if (((o = !o && F.isArray(r) ? r.length : o), s))
              return F.hasOwnProp(r, o) ? (r[o] = [r[o], n]) : (r[o] = n), !a
            ;(r[o] && F.isObject(r[o])) || (r[o] = [])
            return (
              e(t, n, r[o], i) &&
                F.isArray(r[o]) &&
                (r[o] = (function (t) {
                  const e = {},
                    n = Object.keys(t)
                  let r
                  const i = n.length
                  let o
                  for (r = 0; r < i; r++) (o = n[r]), (e[o] = t[o])
                  return e
                })(r[o])),
              !a
            )
          }
          if (F.isFormData(t) && F.isFunction(t.entries)) {
            const n = {}
            return (
              F.forEachEntry(t, (t, r) => {
                e(
                  (function (t) {
                    return F.matchAll(/\w+|\[(\w*)]/g, t).map((t) =>
                      '[]' === t[0] ? '' : t[1] || t[0],
                    )
                  })(t),
                  r,
                  n,
                  0,
                )
              }),
              n
            )
          }
          return null
        }
        const ct = {
          transitional: et,
          adapter: ['xhr', 'http'],
          transformRequest: [
            function (t, e) {
              const n = e.getContentType() || '',
                r = n.indexOf('application/json') > -1,
                i = F.isObject(t)
              i && F.isHTMLForm(t) && (t = new FormData(t))
              if (F.isFormData(t)) return r ? JSON.stringify(lt(t)) : t
              if (
                F.isArrayBuffer(t) ||
                F.isBuffer(t) ||
                F.isStream(t) ||
                F.isFile(t) ||
                F.isBlob(t)
              )
                return t
              if (F.isArrayBufferView(t)) return t.buffer
              if (F.isURLSearchParams(t))
                return (
                  e.setContentType(
                    'application/x-www-form-urlencoded;charset=utf-8',
                    !1,
                  ),
                  t.toString()
                )
              let o
              if (i) {
                if (n.indexOf('application/x-www-form-urlencoded') > -1)
                  return (function (t, e) {
                    return q(
                      t,
                      new st.classes.URLSearchParams(),
                      Object.assign(
                        {
                          visitor: function (t, e, n, r) {
                            return st.isNode && F.isBuffer(t)
                              ? (this.append(e, t.toString('base64')), !1)
                              : r.defaultVisitor.apply(this, arguments)
                          },
                        },
                        e,
                      ),
                    )
                  })(t, this.formSerializer).toString()
                if (
                  (o = F.isFileList(t)) ||
                  n.indexOf('multipart/form-data') > -1
                ) {
                  const e = this.env && this.env.FormData
                  return q(
                    o ? { 'files[]': t } : t,
                    e && new e(),
                    this.formSerializer,
                  )
                }
              }
              return i || r
                ? (e.setContentType('application/json', !1),
                  (function (t, e, n) {
                    if (F.isString(t))
                      try {
                        return (e || JSON.parse)(t), F.trim(t)
                      } catch (t) {
                        if ('SyntaxError' !== t.name) throw t
                      }
                    return (n || JSON.stringify)(t)
                  })(t))
                : t
            },
          ],
          transformResponse: [
            function (t) {
              const e = this.transitional || ct.transitional,
                n = e && e.forcedJSONParsing,
                r = 'json' === this.responseType
              if (t && F.isString(t) && ((n && !this.responseType) || r)) {
                const n = !(e && e.silentJSONParsing) && r
                try {
                  return JSON.parse(t)
                } catch (t) {
                  if (n) {
                    if ('SyntaxError' === t.name)
                      throw W.from(t, W.ERR_BAD_RESPONSE, this, null, this.response)
                    throw t
                  }
                }
              }
              return t
            },
          ],
          timeout: 0,
          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',
          maxContentLength: -1,
          maxBodyLength: -1,
          env: { FormData: st.classes.FormData, Blob: st.classes.Blob },
          validateStatus: function (t) {
            return t >= 200 && t < 300
          },
          headers: {
            common: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': void 0,
            },
          },
        }
        F.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (t) => {
          ct.headers[t] = {}
        })
        const ut = ct,
          dt = F.toObjectSet([
            'age',
            'authorization',
            'content-length',
            'content-type',
            'etag',
            'expires',
            'from',
            'host',
            'if-modified-since',
            'if-unmodified-since',
            'last-modified',
            'location',
            'max-forwards',
            'proxy-authorization',
            'referer',
            'retry-after',
            'user-agent',
          ]),
          ht = Symbol('internals')
        function ft(t) {
          return t && String(t).trim().toLowerCase()
        }
        function pt(t) {
          return !1 === t || null == t ? t : F.isArray(t) ? t.map(pt) : String(t)
        }
        function gt(t, e, n, r, i) {
          return F.isFunction(r)
            ? r.call(this, e, n)
            : (i && (e = n),
              F.isString(e)
                ? F.isString(r)
                  ? -1 !== e.indexOf(r)
                  : F.isRegExp(r)
                    ? r.test(e)
                    : void 0
                : void 0)
        }
        class mt {
          constructor(t) {
            t && this.set(t)
          }
          set(t, e, n) {
            const r = this
            function i(t, e, n) {
              const i = ft(e)
              if (!i) throw new Error('header name must be a non-empty string')
              const o = F.findKey(r, i)
              ;(!o ||
                void 0 === r[o] ||
                !0 === n ||
                (void 0 === n && !1 !== r[o])) &&
                (r[o || e] = pt(t))
            }
            const o = (t, e) => F.forEach(t, (t, n) => i(t, n, e))
            return (
              F.isPlainObject(t) || t instanceof this.constructor
                ? o(t, e)
                : F.isString(t) &&
                    (t = t.trim()) &&
                    !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim())
                  ? o(
                      ((t) => {
                        const e = {}
                        let n, r, i
                        return (
                          t &&
                            t.split('\n').forEach(function (t) {
                              ;(i = t.indexOf(':')),
                                (n = t.substring(0, i).trim().toLowerCase()),
                                (r = t.substring(i + 1).trim()),
                                !n ||
                                  (e[n] && dt[n]) ||
                                  ('set-cookie' === n
                                    ? e[n]
                                      ? e[n].push(r)
                                      : (e[n] = [r])
                                    : (e[n] = e[n] ? e[n] + ', ' + r : r))
                            }),
                          e
                        )
                      })(t),
                      e,
                    )
                  : null != t && i(e, t, n),
              this
            )
          }
          get(t, e) {
            if ((t = ft(t))) {
              const n = F.findKey(this, t)
              if (n) {
                const t = this[n]
                if (!e) return t
                if (!0 === e)
                  return (function (t) {
                    const e = Object.create(null),
                      n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g
                    let r
                    for (; (r = n.exec(t)); ) e[r[1]] = r[2]
                    return e
                  })(t)
                if (F.isFunction(e)) return e.call(this, t, n)
                if (F.isRegExp(e)) return e.exec(t)
                throw new TypeError('parser must be boolean|regexp|function')
              }
            }
          }
          has(t, e) {
            if ((t = ft(t))) {
              const n = F.findKey(this, t)
              return !(!n || void 0 === this[n] || (e && !gt(0, this[n], n, e)))
            }
            return !1
          }
          delete(t, e) {
            const n = this
            let r = !1
            function i(t) {
              if ((t = ft(t))) {
                const i = F.findKey(n, t)
                !i || (e && !gt(0, n[i], i, e)) || (delete n[i], (r = !0))
              }
            }
            return F.isArray(t) ? t.forEach(i) : i(t), r
          }
          clear(t) {
            const e = Object.keys(this)
            let n = e.length,
              r = !1
            for (; n--; ) {
              const i = e[n]
              ;(t && !gt(0, this[i], i, t, !0)) || (delete this[i], (r = !0))
            }
            return r
          }
          normalize(t) {
            const e = this,
              n = {}
            return (
              F.forEach(this, (r, i) => {
                const o = F.findKey(n, i)
                if (o) return (e[o] = pt(r)), void delete e[i]
                const a = t
                  ? (function (t) {
                      return t
                        .trim()
                        .toLowerCase()
                        .replace(
                          /([a-z\d])(\w*)/g,
                          (t, e, n) => e.toUpperCase() + n,
                        )
                    })(i)
                  : String(i).trim()
                a !== i && delete e[i], (e[a] = pt(r)), (n[a] = !0)
              }),
              this
            )
          }
          concat(...t) {
            return this.constructor.concat(this, ...t)
          }
          toJSON(t) {
            const e = Object.create(null)
            return (
              F.forEach(this, (n, r) => {
                null != n &&
                  !1 !== n &&
                  (e[r] = t && F.isArray(n) ? n.join(', ') : n)
              }),
              e
            )
          }
          [Symbol.iterator]() {
            return Object.entries(this.toJSON())[Symbol.iterator]()
          }
          toString() {
            return Object.entries(this.toJSON())
              .map(([t, e]) => t + ': ' + e)
              .join('\n')
          }
          get [Symbol.toStringTag]() {
            return 'AxiosHeaders'
          }
          static from(t) {
            return t instanceof this ? t : new this(t)
          }
          static concat(t, ...e) {
            const n = new this(t)
            return e.forEach((t) => n.set(t)), n
          }
          static accessor(t) {
            const e = (this[ht] = this[ht] = { accessors: {} }).accessors,
              n = this.prototype
            function r(t) {
              const r = ft(t)
              e[r] ||
                (!(function (t, e) {
                  const n = F.toCamelCase(' ' + e)
                  ;['get', 'set', 'has'].forEach((r) => {
                    Object.defineProperty(t, r + n, {
                      value: function (t, n, i) {
                        return this[r].call(this, e, t, n, i)
                      },
                      configurable: !0,
                    })
                  })
                })(n, t),
                (e[r] = !0))
            }
            return F.isArray(t) ? t.forEach(r) : r(t), this
          }
        }
        mt.accessor([
          'Content-Type',
          'Content-Length',
          'Accept',
          'Accept-Encoding',
          'User-Agent',
          'Authorization',
        ]),
          F.reduceDescriptors(mt.prototype, ({ value: t }, e) => {
            let n = e[0].toUpperCase() + e.slice(1)
            return {
              get: () => t,
              set(t) {
                this[n] = t
              },
            }
          }),
          F.freezeMethods(mt)
        const bt = mt
        function yt(t, e) {
          const n = this || ut,
            r = e || n,
            i = bt.from(r.headers)
          let o = r.data
          return (
            F.forEach(t, function (t) {
              o = t.call(n, o, i.normalize(), e ? e.status : void 0)
            }),
            i.normalize(),
            o
          )
        }
        function vt(t) {
          return !(!t || !t.__CANCEL__)
        }
        function xt(t, e, n) {
          W.call(this, null == t ? 'canceled' : t, W.ERR_CANCELED, e, n),
            (this.name = 'CanceledError')
        }
        F.inherits(xt, W, { __CANCEL__: !0 })
        const wt = xt
        const _t = st.hasStandardBrowserEnv
          ? {
              write(t, e, n, r, i, o) {
                const a = [t + '=' + encodeURIComponent(e)]
                F.isNumber(n) && a.push('expires=' + new Date(n).toGMTString()),
                  F.isString(r) && a.push('path=' + r),
                  F.isString(i) && a.push('domain=' + i),
                  !0 === o && a.push('secure'),
                  (document.cookie = a.join('; '))
              },
              read(t) {
                const e = document.cookie.match(
                  new RegExp('(^|;\\s*)(' + t + ')=([^;]*)'),
                )
                return e ? decodeURIComponent(e[3]) : null
              },
              remove(t) {
                this.write(t, '', Date.now() - 864e5)
              },
            }
          : { write() {}, read: () => null, remove() {} }
        function kt(t, e) {
          return t && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
            ? (function (t, e) {
                return e ? t.replace(/\/?\/$/, '') + '/' + e.replace(/^\/+/, '') : t
              })(t, e)
            : e
        }
        const St = st.hasStandardBrowserEnv
          ? (function () {
              const t = /(msie|trident)/i.test(navigator.userAgent),
                e = document.createElement('a')
              let n
              function r(n) {
                let r = n
                return (
                  t && (e.setAttribute('href', r), (r = e.href)),
                  e.setAttribute('href', r),
                  {
                    href: e.href,
                    protocol: e.protocol ? e.protocol.replace(/:$/, '') : '',
                    host: e.host,
                    search: e.search ? e.search.replace(/^\?/, '') : '',
                    hash: e.hash ? e.hash.replace(/^#/, '') : '',
                    hostname: e.hostname,
                    port: e.port,
                    pathname:
                      '/' === e.pathname.charAt(0) ? e.pathname : '/' + e.pathname,
                  }
                )
              }
              return (
                (n = r(window.location.href)),
                function (t) {
                  const e = F.isString(t) ? r(t) : t
                  return e.protocol === n.protocol && e.host === n.host
                }
              )
            })()
          : function () {
              return !0
            }
        const Et = function (t, e) {
          t = t || 10
          const n = new Array(t),
            r = new Array(t)
          let i,
            o = 0,
            a = 0
          return (
            (e = void 0 !== e ? e : 1e3),
            function (s) {
              const l = Date.now(),
                c = r[a]
              i || (i = l), (n[o] = s), (r[o] = l)
              let u = a,
                d = 0
              for (; u !== o; ) (d += n[u++]), (u %= t)
              if (((o = (o + 1) % t), o === a && (a = (a + 1) % t), l - i < e))
                return
              const h = c && l - c
              return h ? Math.round((1e3 * d) / h) : void 0
            }
          )
        }
        function Ct(t, e) {
          let n = 0
          const r = Et(50, 250)
          return (i) => {
            const o = i.loaded,
              a = i.lengthComputable ? i.total : void 0,
              s = o - n,
              l = r(s)
            n = o
            const c = {
              loaded: o,
              total: a,
              progress: a ? o / a : void 0,
              bytes: s,
              rate: l || void 0,
              estimated: l && a && o <= a ? (a - o) / l : void 0,
              event: i,
            }
            ;(c[e ? 'download' : 'upload'] = !0), t(c)
          }
        }
        const Mt = {
          http: null,
          xhr:
            'undefined' != typeof XMLHttpRequest &&
            function (t) {
              return new Promise(function (e, n) {
                let r = t.data
                const i = bt.from(t.headers).normalize()
                let o,
                  a,
                  { responseType: s, withXSRFToken: l } = t
                function c() {
                  t.cancelToken && t.cancelToken.unsubscribe(o),
                    t.signal && t.signal.removeEventListener('abort', o)
                }
                if (F.isFormData(r))
                  if (st.hasStandardBrowserEnv || st.hasStandardBrowserWebWorkerEnv)
                    i.setContentType(!1)
                  else if (!1 !== (a = i.getContentType())) {
                    const [t, ...e] = a
                      ? a
                          .split(';')
                          .map((t) => t.trim())
                          .filter(Boolean)
                      : []
                    i.setContentType([t || 'multipart/form-data', ...e].join('; '))
                  }
                let u = new XMLHttpRequest()
                if (t.auth) {
                  const e = t.auth.username || '',
                    n = t.auth.password
                      ? unescape(encodeURIComponent(t.auth.password))
                      : ''
                  i.set('Authorization', 'Basic ' + btoa(e + ':' + n))
                }
                const d = kt(t.baseURL, t.url)
                function h() {
                  if (!u) return
                  const r = bt.from(
                    'getAllResponseHeaders' in u && u.getAllResponseHeaders(),
                  )
                  !(function (t, e, n) {
                    const r = n.config.validateStatus
                    n.status && r && !r(n.status)
                      ? e(
                          new W(
                            'Request failed with status code ' + n.status,
                            [W.ERR_BAD_REQUEST, W.ERR_BAD_RESPONSE][
                              Math.floor(n.status / 100) - 4
                            ],
                            n.config,
                            n.request,
                            n,
                          ),
                        )
                      : t(n)
                  })(
                    function (t) {
                      e(t), c()
                    },
                    function (t) {
                      n(t), c()
                    },
                    {
                      data:
                        s && 'text' !== s && 'json' !== s
                          ? u.response
                          : u.responseText,
                      status: u.status,
                      statusText: u.statusText,
                      headers: r,
                      config: t,
                      request: u,
                    },
                  ),
                    (u = null)
                }
                if (
                  (u.open(
                    t.method.toUpperCase(),
                    G(d, t.params, t.paramsSerializer),
                    !0,
                  ),
                  (u.timeout = t.timeout),
                  'onloadend' in u
                    ? (u.onloadend = h)
                    : (u.onreadystatechange = function () {
                        u &&
                          4 === u.readyState &&
                          (0 !== u.status ||
                            (u.responseURL &&
                              0 === u.responseURL.indexOf('file:'))) &&
                          setTimeout(h)
                      }),
                  (u.onabort = function () {
                    u &&
                      (n(new W('Request aborted', W.ECONNABORTED, t, u)),
                      (u = null))
                  }),
                  (u.onerror = function () {
                    n(new W('Network Error', W.ERR_NETWORK, t, u)), (u = null)
                  }),
                  (u.ontimeout = function () {
                    let e = t.timeout
                      ? 'timeout of ' + t.timeout + 'ms exceeded'
                      : 'timeout exceeded'
                    const r = t.transitional || et
                    t.timeoutErrorMessage && (e = t.timeoutErrorMessage),
                      n(
                        new W(
                          e,
                          r.clarifyTimeoutError ? W.ETIMEDOUT : W.ECONNABORTED,
                          t,
                          u,
                        ),
                      ),
                      (u = null)
                  }),
                  st.hasStandardBrowserEnv &&
                    (l && F.isFunction(l) && (l = l(t)), l || (!1 !== l && St(d))))
                ) {
                  const e =
                    t.xsrfHeaderName &&
                    t.xsrfCookieName &&
                    _t.read(t.xsrfCookieName)
                  e && i.set(t.xsrfHeaderName, e)
                }
                void 0 === r && i.setContentType(null),
                  'setRequestHeader' in u &&
                    F.forEach(i.toJSON(), function (t, e) {
                      u.setRequestHeader(e, t)
                    }),
                  F.isUndefined(t.withCredentials) ||
                    (u.withCredentials = !!t.withCredentials),
                  s && 'json' !== s && (u.responseType = t.responseType),
                  'function' == typeof t.onDownloadProgress &&
                    u.addEventListener('progress', Ct(t.onDownloadProgress, !0)),
                  'function' == typeof t.onUploadProgress &&
                    u.upload &&
                    u.upload.addEventListener('progress', Ct(t.onUploadProgress)),
                  (t.cancelToken || t.signal) &&
                    ((o = (e) => {
                      u &&
                        (n(!e || e.type ? new wt(null, t, u) : e),
                        u.abort(),
                        (u = null))
                    }),
                    t.cancelToken && t.cancelToken.subscribe(o),
                    t.signal &&
                      (t.signal.aborted
                        ? o()
                        : t.signal.addEventListener('abort', o)))
                const f = (function (t) {
                  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t)
                  return (e && e[1]) || ''
                })(d)
                f && -1 === st.protocols.indexOf(f)
                  ? n(
                      new W(
                        'Unsupported protocol ' + f + ':',
                        W.ERR_BAD_REQUEST,
                        t,
                      ),
                    )
                  : u.send(r || null)
              })
            },
        }
        F.forEach(Mt, (t, e) => {
          if (t) {
            try {
              Object.defineProperty(t, 'name', { value: e })
            } catch (t) {}
            Object.defineProperty(t, 'adapterName', { value: e })
          }
        })
        const Pt = (t) => `- ${t}`,
          Ot = (t) => F.isFunction(t) || null === t || !1 === t,
          Dt = (t) => {
            t = F.isArray(t) ? t : [t]
            const { length: e } = t
            let n, r
            const i = {}
            for (let o = 0; o < e; o++) {
              let e
              if (
                ((n = t[o]),
                (r = n),
                !Ot(n) && ((r = Mt[(e = String(n)).toLowerCase()]), void 0 === r))
              )
                throw new W(`Unknown adapter '${e}'`)
              if (r) break
              i[e || '#' + o] = r
            }
            if (!r) {
              const t = Object.entries(i).map(
                ([t, e]) =>
                  `adapter ${t} ` +
                  (!1 === e
                    ? 'is not supported by the environment'
                    : 'is not available in the build'),
              )
              let n = e
                ? t.length > 1
                  ? 'since :\n' + t.map(Pt).join('\n')
                  : ' ' + Pt(t[0])
                : 'as no adapter specified'
              throw new W(
                'There is no suitable adapter to dispatch the request ' + n,
                'ERR_NOT_SUPPORT',
              )
            }
            return r
          }
        function Tt(t) {
          if (
            (t.cancelToken && t.cancelToken.throwIfRequested(),
            t.signal && t.signal.aborted)
          )
            throw new wt(null, t)
        }
        function Rt(t) {
          Tt(t),
            (t.headers = bt.from(t.headers)),
            (t.data = yt.call(t, t.transformRequest)),
            -1 !== ['post', 'put', 'patch'].indexOf(t.method) &&
              t.headers.setContentType('application/x-www-form-urlencoded', !1)
          return Dt(t.adapter || ut.adapter)(t).then(
            function (e) {
              return (
                Tt(t),
                (e.data = yt.call(t, t.transformResponse, e)),
                (e.headers = bt.from(e.headers)),
                e
              )
            },
            function (e) {
              return (
                vt(e) ||
                  (Tt(t),
                  e &&
                    e.response &&
                    ((e.response.data = yt.call(
                      t,
                      t.transformResponse,
                      e.response,
                    )),
                    (e.response.headers = bt.from(e.response.headers)))),
                Promise.reject(e)
              )
            },
          )
        }
        const Lt = (t) => (t instanceof bt ? t.toJSON() : t)
        function At(t, e) {
          e = e || {}
          const n = {}
          function r(t, e, n) {
            return F.isPlainObject(t) && F.isPlainObject(e)
              ? F.merge.call({ caseless: n }, t, e)
              : F.isPlainObject(e)
                ? F.merge({}, e)
                : F.isArray(e)
                  ? e.slice()
                  : e
          }
          function i(t, e, n) {
            return F.isUndefined(e)
              ? F.isUndefined(t)
                ? void 0
                : r(void 0, t, n)
              : r(t, e, n)
          }
          function o(t, e) {
            if (!F.isUndefined(e)) return r(void 0, e)
          }
          function a(t, e) {
            return F.isUndefined(e)
              ? F.isUndefined(t)
                ? void 0
                : r(void 0, t)
              : r(void 0, e)
          }
          function s(n, i, o) {
            return o in e ? r(n, i) : o in t ? r(void 0, n) : void 0
          }
          const l = {
            url: o,
            method: o,
            data: o,
            baseURL: a,
            transformRequest: a,
            transformResponse: a,
            paramsSerializer: a,
            timeout: a,
            timeoutMessage: a,
            withCredentials: a,
            withXSRFToken: a,
            adapter: a,
            responseType: a,
            xsrfCookieName: a,
            xsrfHeaderName: a,
            onUploadProgress: a,
            onDownloadProgress: a,
            decompress: a,
            maxContentLength: a,
            maxBodyLength: a,
            beforeRedirect: a,
            transport: a,
            httpAgent: a,
            httpsAgent: a,
            cancelToken: a,
            socketPath: a,
            responseEncoding: a,
            validateStatus: s,
            headers: (t, e) => i(Lt(t), Lt(e), !0),
          }
          return (
            F.forEach(Object.keys(Object.assign({}, t, e)), function (r) {
              const o = l[r] || i,
                a = o(t[r], e[r], r)
              ;(F.isUndefined(a) && o !== s) || (n[r] = a)
            }),
            n
          )
        }
        const Nt = '1.6.7',
          jt = {}
        ;['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(
          (t, e) => {
            jt[t] = function (n) {
              return typeof n === t || 'a' + (e < 1 ? 'n ' : ' ') + t
            }
          },
        )
        const zt = {}
        jt.transitional = function (t, e, n) {
          function r(t, e) {
            return (
              "[Axios v1.6.7] Transitional option '" +
              t +
              "'" +
              e +
              (n ? '. ' + n : '')
            )
          }
          return (n, i, o) => {
            if (!1 === t)
              throw new W(
                r(i, ' has been removed' + (e ? ' in ' + e : '')),
                W.ERR_DEPRECATED,
              )
            return (
              e &&
                !zt[i] &&
                ((zt[i] = !0),
                console.warn(
                  r(
                    i,
                    ' has been deprecated since v' +
                      e +
                      ' and will be removed in the near future',
                  ),
                )),
              !t || t(n, i, o)
            )
          }
        }
        const Ft = {
            assertOptions: function (t, e, n) {
              if ('object' != typeof t)
                throw new W('options must be an object', W.ERR_BAD_OPTION_VALUE)
              const r = Object.keys(t)
              let i = r.length
              for (; i-- > 0; ) {
                const o = r[i],
                  a = e[o]
                if (a) {
                  const e = t[o],
                    n = void 0 === e || a(e, o, t)
                  if (!0 !== n)
                    throw new W(
                      'option ' + o + ' must be ' + n,
                      W.ERR_BAD_OPTION_VALUE,
                    )
                } else if (!0 !== n)
                  throw new W('Unknown option ' + o, W.ERR_BAD_OPTION)
              }
            },
            validators: jt,
          },
          It = Ft.validators
        class Bt {
          constructor(t) {
            ;(this.defaults = t),
              (this.interceptors = { request: new tt(), response: new tt() })
          }
          async request(t, e) {
            try {
              return await this._request(t, e)
            } catch (t) {
              if (t instanceof Error) {
                let e
                Error.captureStackTrace
                  ? Error.captureStackTrace((e = {}))
                  : (e = new Error())
                const n = e.stack ? e.stack.replace(/^.+\n/, '') : ''
                t.stack
                  ? n &&
                    !String(t.stack).endsWith(n.replace(/^.+\n.+\n/, '')) &&
                    (t.stack += '\n' + n)
                  : (t.stack = n)
              }
              throw t
            }
          }
          _request(t, e) {
            'string' == typeof t ? ((e = e || {}).url = t) : (e = t || {}),
              (e = At(this.defaults, e))
            const { transitional: n, paramsSerializer: r, headers: i } = e
            void 0 !== n &&
              Ft.assertOptions(
                n,
                {
                  silentJSONParsing: It.transitional(It.boolean),
                  forcedJSONParsing: It.transitional(It.boolean),
                  clarifyTimeoutError: It.transitional(It.boolean),
                },
                !1,
              ),
              null != r &&
                (F.isFunction(r)
                  ? (e.paramsSerializer = { serialize: r })
                  : Ft.assertOptions(
                      r,
                      { encode: It.function, serialize: It.function },
                      !0,
                    )),
              (e.method = (e.method || this.defaults.method || 'get').toLowerCase())
            let o = i && F.merge(i.common, i[e.method])
            i &&
              F.forEach(
                ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
                (t) => {
                  delete i[t]
                },
              ),
              (e.headers = bt.concat(o, i))
            const a = []
            let s = !0
            this.interceptors.request.forEach(function (t) {
              ;('function' == typeof t.runWhen && !1 === t.runWhen(e)) ||
                ((s = s && t.synchronous), a.unshift(t.fulfilled, t.rejected))
            })
            const l = []
            let c
            this.interceptors.response.forEach(function (t) {
              l.push(t.fulfilled, t.rejected)
            })
            let u,
              d = 0
            if (!s) {
              const t = [Rt.bind(this), void 0]
              for (
                t.unshift.apply(t, a),
                  t.push.apply(t, l),
                  u = t.length,
                  c = Promise.resolve(e);
                d < u;

              )
                c = c.then(t[d++], t[d++])
              return c
            }
            u = a.length
            let h = e
            for (d = 0; d < u; ) {
              const t = a[d++],
                e = a[d++]
              try {
                h = t(h)
              } catch (t) {
                e.call(this, t)
                break
              }
            }
            try {
              c = Rt.call(this, h)
            } catch (t) {
              return Promise.reject(t)
            }
            for (d = 0, u = l.length; d < u; ) c = c.then(l[d++], l[d++])
            return c
          }
          getUri(t) {
            return G(
              kt((t = At(this.defaults, t)).baseURL, t.url),
              t.params,
              t.paramsSerializer,
            )
          }
        }
        F.forEach(['delete', 'get', 'head', 'options'], function (t) {
          Bt.prototype[t] = function (e, n) {
            return this.request(
              At(n || {}, { method: t, url: e, data: (n || {}).data }),
            )
          }
        }),
          F.forEach(['post', 'put', 'patch'], function (t) {
            function e(e) {
              return function (n, r, i) {
                return this.request(
                  At(i || {}, {
                    method: t,
                    headers: e ? { 'Content-Type': 'multipart/form-data' } : {},
                    url: n,
                    data: r,
                  }),
                )
              }
            }
            ;(Bt.prototype[t] = e()), (Bt.prototype[t + 'Form'] = e(!0))
          })
        const Ut = Bt
        class Wt {
          constructor(t) {
            if ('function' != typeof t)
              throw new TypeError('executor must be a function.')
            let e
            this.promise = new Promise(function (t) {
              e = t
            })
            const n = this
            this.promise.then((t) => {
              if (!n._listeners) return
              let e = n._listeners.length
              for (; e-- > 0; ) n._listeners[e](t)
              n._listeners = null
            }),
              (this.promise.then = (t) => {
                let e
                const r = new Promise((t) => {
                  n.subscribe(t), (e = t)
                }).then(t)
                return (
                  (r.cancel = function () {
                    n.unsubscribe(e)
                  }),
                  r
                )
              }),
              t(function (t, r, i) {
                n.reason || ((n.reason = new wt(t, r, i)), e(n.reason))
              })
          }
          throwIfRequested() {
            if (this.reason) throw this.reason
          }
          subscribe(t) {
            this.reason
              ? t(this.reason)
              : this._listeners
                ? this._listeners.push(t)
                : (this._listeners = [t])
          }
          unsubscribe(t) {
            if (!this._listeners) return
            const e = this._listeners.indexOf(t)
            ;-1 !== e && this._listeners.splice(e, 1)
          }
          static source() {
            let t
            return {
              token: new Wt(function (e) {
                t = e
              }),
              cancel: t,
            }
          }
        }
        const Vt = Wt
        const Ht = {
          Continue: 100,
          SwitchingProtocols: 101,
          Processing: 102,
          EarlyHints: 103,
          Ok: 200,
          Created: 201,
          Accepted: 202,
          NonAuthoritativeInformation: 203,
          NoContent: 204,
          ResetContent: 205,
          PartialContent: 206,
          MultiStatus: 207,
          AlreadyReported: 208,
          ImUsed: 226,
          MultipleChoices: 300,
          MovedPermanently: 301,
          Found: 302,
          SeeOther: 303,
          NotModified: 304,
          UseProxy: 305,
          Unused: 306,
          TemporaryRedirect: 307,
          PermanentRedirect: 308,
          BadRequest: 400,
          Unauthorized: 401,
          PaymentRequired: 402,
          Forbidden: 403,
          NotFound: 404,
          MethodNotAllowed: 405,
          NotAcceptable: 406,
          ProxyAuthenticationRequired: 407,
          RequestTimeout: 408,
          Conflict: 409,
          Gone: 410,
          LengthRequired: 411,
          PreconditionFailed: 412,
          PayloadTooLarge: 413,
          UriTooLong: 414,
          UnsupportedMediaType: 415,
          RangeNotSatisfiable: 416,
          ExpectationFailed: 417,
          ImATeapot: 418,
          MisdirectedRequest: 421,
          UnprocessableEntity: 422,
          Locked: 423,
          FailedDependency: 424,
          TooEarly: 425,
          UpgradeRequired: 426,
          PreconditionRequired: 428,
          TooManyRequests: 429,
          RequestHeaderFieldsTooLarge: 431,
          UnavailableForLegalReasons: 451,
          InternalServerError: 500,
          NotImplemented: 501,
          BadGateway: 502,
          ServiceUnavailable: 503,
          GatewayTimeout: 504,
          HttpVersionNotSupported: 505,
          VariantAlsoNegotiates: 506,
          InsufficientStorage: 507,
          LoopDetected: 508,
          NotExtended: 510,
          NetworkAuthenticationRequired: 511,
        }
        Object.entries(Ht).forEach(([t, e]) => {
          Ht[e] = t
        })
        const $t = Ht
        const Yt = (function t(e) {
          const n = new Ut(e),
            r = i(Ut.prototype.request, n)
          return (
            F.extend(r, Ut.prototype, n, { allOwnKeys: !0 }),
            F.extend(r, n, null, { allOwnKeys: !0 }),
            (r.create = function (n) {
              return t(At(e, n))
            }),
            r
          )
        })(ut)
        ;(Yt.Axios = Ut),
          (Yt.CanceledError = wt),
          (Yt.CancelToken = Vt),
          (Yt.isCancel = vt),
          (Yt.VERSION = Nt),
          (Yt.toFormData = q),
          (Yt.AxiosError = W),
          (Yt.Cancel = Yt.CanceledError),
          (Yt.all = function (t) {
            return Promise.all(t)
          }),
          (Yt.spread = function (t) {
            return function (e) {
              return t.apply(null, e)
            }
          }),
          (Yt.isAxiosError = function (t) {
            return F.isObject(t) && !0 === t.isAxiosError
          }),
          (Yt.mergeConfig = At),
          (Yt.AxiosHeaders = bt),
          (Yt.formToJSON = (t) => lt(F.isHTMLForm(t) ? new FormData(t) : t)),
          (Yt.getAdapter = Dt),
          (Yt.HttpStatusCode = $t),
          (Yt.default = Yt)
        const qt = Yt
      },
    },
    o = {}
  function a(t) {
    var e = o[t]
    if (void 0 !== e) return e.exports
    var n = (o[t] = { exports: {} })
    return i[t].call(n.exports, n, n.exports, a), n.exports
  }
  ;(a.m = i),
    (e = Object.getPrototypeOf
      ? (t) => Object.getPrototypeOf(t)
      : (t) => t.__proto__),
    (a.t = function (n, r) {
      if ((1 & r && (n = this(n)), 8 & r)) return n
      if ('object' == typeof n && n) {
        if (4 & r && n.__esModule) return n
        if (16 & r && 'function' == typeof n.then) return n
      }
      var i = Object.create(null)
      a.r(i)
      var o = {}
      t = t || [null, e({}), e([]), e(e)]
      for (var s = 2 & r && n; 'object' == typeof s && !~t.indexOf(s); s = e(s))
        Object.getOwnPropertyNames(s).forEach((t) => (o[t] = () => n[t]))
      return (o.default = () => n), a.d(i, o), i
    }),
    (a.d = (t, e) => {
      for (var n in e)
        a.o(e, n) &&
          !a.o(t, n) &&
          Object.defineProperty(t, n, { enumerable: !0, get: e[n] })
    }),
    (a.f = {}),
    (a.e = (t) =>
      Promise.all(Object.keys(a.f).reduce((e, n) => (a.f[n](t, e), e), []))),
    (a.u = (t) => t + '.bundle.js'),
    (a.miniCssF = (t) => t + '.css'),
    (a.g = (function () {
      if ('object' == typeof globalThis) return globalThis
      try {
        return this || new Function('return this')()
      } catch (t) {
        if ('object' == typeof window) return window
      }
    })()),
    (a.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (n = {}),
    (r = 'currency-tracker:'),
    (a.l = (t, e, i, o) => {
      if (n[t]) n[t].push(e)
      else {
        var s, l
        if (void 0 !== i)
          for (
            var c = document.getElementsByTagName('script'), u = 0;
            u < c.length;
            u++
          ) {
            var d = c[u]
            if (
              d.getAttribute('src') == t ||
              d.getAttribute('data-webpack') == r + i
            ) {
              s = d
              break
            }
          }
        s ||
          ((l = !0),
          ((s = document.createElement('script')).charset = 'utf-8'),
          (s.timeout = 120),
          a.nc && s.setAttribute('nonce', a.nc),
          s.setAttribute('data-webpack', r + i),
          (s.src = t)),
          (n[t] = [e])
        var h = (e, r) => {
            ;(s.onerror = s.onload = null), clearTimeout(f)
            var i = n[t]
            if (
              (delete n[t],
              s.parentNode && s.parentNode.removeChild(s),
              i && i.forEach((t) => t(r)),
              e)
            )
              return e(r)
          },
          f = setTimeout(h.bind(null, void 0, { type: 'timeout', target: s }), 12e4)
        ;(s.onerror = h.bind(null, s.onerror)),
          (s.onload = h.bind(null, s.onload)),
          l && document.head.appendChild(s)
      }
    }),
    (a.r = (t) => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 })
    }),
    (() => {
      var t
      a.g.importScripts && (t = a.g.location + '')
      var e = a.g.document
      if (!t && e && (e.currentScript && (t = e.currentScript.src), !t)) {
        var n = e.getElementsByTagName('script')
        if (n.length) for (var r = n.length - 1; r > -1 && !t; ) t = n[r--].src
      }
      if (!t)
        throw new Error('Automatic publicPath is not supported in this browser')
      ;(t = t
        .replace(/#.*$/, '')
        .replace(/\?.*$/, '')
        .replace(/\/[^\/]+$/, '/')),
        (a.p = t)
    })(),
    (() => {
      if ('undefined' != typeof document) {
        var t = (t) =>
            new Promise((e, n) => {
              var r = a.miniCssF(t),
                i = a.p + r
              if (
                ((t, e) => {
                  for (
                    var n = document.getElementsByTagName('link'), r = 0;
                    r < n.length;
                    r++
                  ) {
                    var i =
                      (a = n[r]).getAttribute('data-href') || a.getAttribute('href')
                    if ('stylesheet' === a.rel && (i === t || i === e)) return a
                  }
                  var o = document.getElementsByTagName('style')
                  for (r = 0; r < o.length; r++) {
                    var a
                    if ((i = (a = o[r]).getAttribute('data-href')) === t || i === e)
                      return a
                  }
                })(r, i)
              )
                return e()
              ;((t, e, n, r, i) => {
                var o = document.createElement('link')
                ;(o.rel = 'stylesheet'),
                  (o.type = 'text/css'),
                  (o.onerror = o.onload =
                    (n) => {
                      if (((o.onerror = o.onload = null), 'load' === n.type)) r()
                      else {
                        var a = n && n.type,
                          s = (n && n.target && n.target.href) || e,
                          l = new Error(
                            'Loading CSS chunk ' +
                              t +
                              ' failed.\n(' +
                              a +
                              ': ' +
                              s +
                              ')',
                          )
                        ;(l.name = 'ChunkLoadError'),
                          (l.code = 'CSS_CHUNK_LOAD_FAILED'),
                          (l.type = a),
                          (l.request = s),
                          o.parentNode && o.parentNode.removeChild(o),
                          i(l)
                      }
                    }),
                  (o.href = e),
                  n
                    ? n.parentNode.insertBefore(o, n.nextSibling)
                    : document.head.appendChild(o)
              })(t, i, null, e, n)
            }),
          e = { 179: 0 }
        a.f.miniCss = (n, r) => {
          e[n]
            ? r.push(e[n])
            : 0 !== e[n] &&
              { 28: 1, 107: 1, 429: 1, 966: 1 }[n] &&
              r.push(
                (e[n] = t(n).then(
                  () => {
                    e[n] = 0
                  },
                  (t) => {
                    throw (delete e[n], t)
                  },
                )),
              )
        }
      }
    })(),
    (() => {
      var t = { 179: 0 }
      a.f.j = (e, n) => {
        var r = a.o(t, e) ? t[e] : void 0
        if (0 !== r)
          if (r) n.push(r[2])
          else {
            var i = new Promise((n, i) => (r = t[e] = [n, i]))
            n.push((r[2] = i))
            var o = a.p + a.u(e),
              s = new Error()
            a.l(
              o,
              (n) => {
                if (a.o(t, e) && (0 !== (r = t[e]) && (t[e] = void 0), r)) {
                  var i = n && ('load' === n.type ? 'missing' : n.type),
                    o = n && n.target && n.target.src
                  ;(s.message =
                    'Loading chunk ' + e + ' failed.\n(' + i + ': ' + o + ')'),
                    (s.name = 'ChunkLoadError'),
                    (s.type = i),
                    (s.request = o),
                    r[1](s)
                }
              },
              'chunk-' + e,
              e,
            )
          }
      }
      var e = (e, n) => {
          var r,
            i,
            [o, s, l] = n,
            c = 0
          if (o.some((e) => 0 !== t[e])) {
            for (r in s) a.o(s, r) && (a.m[r] = s[r])
            if (l) l(a)
          }
          for (e && e(n); c < o.length; c++)
            (i = o[c]), a.o(t, i) && t[i] && t[i][0](), (t[i] = 0)
        },
        n = (self.webpackChunkcurrency_tracker =
          self.webpackChunkcurrency_tracker || [])
      n.forEach(e.bind(null, 0)), (n.push = e.bind(null, n.push.bind(n)))
    })(),
    (() => {
      var t = a(745)
      const e = 'C08rACX0k6lwI5rytwj1'
      var n = a(893)
      const r = function () {
        return (0, n.jsx)('section', {
          className: e,
          children: (0, n.jsx)('span', { children: 'Loading...' }),
        })
      }
      var i = a(294),
        o = a(250),
        s = a(370),
        l = a(649)
      const c = {
        inner: 'o856cXNbgh412ufYrB6N',
        content: 'oS3zqnt02asbKf9ryE31',
        left: 'ph2bywetDfzixWHoVmeA',
        right: 'GaiY4LZNBcKzCWTMTbbA',
        title: 'c9LBqxI9cqfNHwF6oZCu',
        big: 'Homc43qPb5AD2BSLgBg7',
        small: 'It_1nk1bhtHMwquTlDvL',
        text: 'h3gK3Sz58HY9T0IIRUsB',
        logo: 'VH4C0tcGpItJxXxusXLY',
      }
      const u = function () {
        return (0, n.jsx)('section', {
          className: c.banner,
          children: (0, n.jsx)('div', {
            className: c.inner,
            children: (0, n.jsxs)('div', {
              className: c.content,
              children: [
                (0, n.jsxs)('div', {
                  className: c.left,
                  children: [
                    (0, n.jsx)('p', {
                      className: c.title + ' ' + c.small,
                      children: 'Modsen Currency',
                    }),
                    (0, n.jsx)('p', {
                      className: c.title + ' ' + c.big,
                      children: 'Tracker',
                    }),
                    (0, n.jsxs)('p', {
                      className: c.text,
                      children: [
                        'Quotes for the dollar and other',
                        (0, n.jsx)('br', {}),
                        'international currencies.',
                      ],
                    }),
                  ],
                }),
                (0, n.jsx)('div', {
                  className: c.right,
                  children: (0, n.jsx)(l.Z, {
                    width: 300,
                    height: 312,
                    className: c.logo,
                  }),
                }),
              ],
            }),
          }),
        })
      }
      var d = a(680),
        h = a(454),
        f = a(985)
      const p = 'kxy_5rB6jf1qXu88lCvN',
        g = 'uhjUTdiINLs3CLyHHVwZ',
        m = 'sXTaxRtSGiU3hrCrimLb',
        b = 'cwStCCGLKTgp3WiZeXGw',
        y = 'm9EcZkV6c8Xi4DzeQhZQ'
      const v = function () {
        var t,
          e,
          r,
          i = Number(localStorage.getItem('lastUpdated'))
        return (
          Date.now() - i > f.w$ &&
            ((i = Date.now()), localStorage.setItem('lastUpdated', i)),
          (0, n.jsxs)('section', {
            className: p,
            children: [
              (0, n.jsx)('div', {
                className: g,
                children: (0, n.jsx)('div', {
                  className: m,
                  children: (0, n.jsx)('div', { className: b }),
                }),
              }),
              (0, n.jsxs)('span', {
                className: y,
                children: [
                  'Last updated at ',
                  ((t = i),
                  (e = new Date(t)),
                  (r = e.getHours() > 12),
                  (r ? e.getHours() - 12 : e.getHours()) +
                    ':' +
                    (e.getMinutes() < 10 ? '0' + e.getMinutes() : e.getMinutes()) +
                    (r ? 'pm' : 'am')),
                ],
              }),
            ],
          })
        )
      }
      const x = function () {
        return (0, n.jsxs)(n.Fragment, {
          children: [
            (0, n.jsx)(h.Z, {}),
            (0, n.jsx)(u, {}),
            (0, n.jsx)(v, {}),
            (0, n.jsx)(i.Suspense, {
              fallback: (0, n.jsx)(r, {}),
              children: (0, n.jsx)(s.Z, {
                children: (0, n.jsx)('main', { children: (0, n.jsx)(o.j3, {}) }),
              }),
            }),
            (0, n.jsx)(d.Z, {}),
          ],
        })
      }
      var w = a(257),
        _ = a(356)
      function k(t) {
        return (t + 0.5) | 0
      }
      const S = (t, e, n) => Math.max(Math.min(t, n), e)
      function E(t) {
        return S(k(2.55 * t), 0, 255)
      }
      function C(t) {
        return S(k(255 * t), 0, 255)
      }
      function M(t) {
        return S(k(t / 2.55) / 100, 0, 1)
      }
      function P(t) {
        return S(k(100 * t), 0, 100)
      }
      const O = {
          0: 0,
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
          A: 10,
          B: 11,
          C: 12,
          D: 13,
          E: 14,
          F: 15,
          a: 10,
          b: 11,
          c: 12,
          d: 13,
          e: 14,
          f: 15,
        },
        D = [...'0123456789ABCDEF'],
        T = (t) => D[15 & t],
        R = (t) => D[(240 & t) >> 4] + D[15 & t],
        L = (t) => (240 & t) >> 4 == (15 & t)
      function A(t) {
        var e = ((t) => L(t.r) && L(t.g) && L(t.b) && L(t.a))(t) ? T : R
        return t
          ? '#' +
              e(t.r) +
              e(t.g) +
              e(t.b) +
              ((t, e) => (t < 255 ? e(t) : ''))(t.a, e)
          : void 0
      }
      const N =
        /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/
      function j(t, e, n) {
        const r = e * Math.min(n, 1 - n),
          i = (e, i = (e + t / 30) % 12) =>
            n - r * Math.max(Math.min(i - 3, 9 - i, 1), -1)
        return [i(0), i(8), i(4)]
      }
      function z(t, e, n) {
        const r = (r, i = (r + t / 60) % 6) =>
          n - n * e * Math.max(Math.min(i, 4 - i, 1), 0)
        return [r(5), r(3), r(1)]
      }
      function F(t, e, n) {
        const r = j(t, 1, 0.5)
        let i
        for (
          e + n > 1 && ((i = 1 / (e + n)), (e *= i), (n *= i)), i = 0;
          i < 3;
          i++
        )
          (r[i] *= 1 - e - n), (r[i] += e)
        return r
      }
      function I(t) {
        const e = t.r / 255,
          n = t.g / 255,
          r = t.b / 255,
          i = Math.max(e, n, r),
          o = Math.min(e, n, r),
          a = (i + o) / 2
        let s, l, c
        return (
          i !== o &&
            ((c = i - o),
            (l = a > 0.5 ? c / (2 - i - o) : c / (i + o)),
            (s = (function (t, e, n, r, i) {
              return t === i
                ? (e - n) / r + (e < n ? 6 : 0)
                : e === i
                  ? (n - t) / r + 2
                  : (t - e) / r + 4
            })(e, n, r, c, i)),
            (s = 60 * s + 0.5)),
          [0 | s, l || 0, a]
        )
      }
      function B(t, e, n, r) {
        return (Array.isArray(e) ? t(e[0], e[1], e[2]) : t(e, n, r)).map(C)
      }
      function U(t, e, n) {
        return B(j, t, e, n)
      }
      function W(t) {
        return ((t % 360) + 360) % 360
      }
      function V(t) {
        const e = N.exec(t)
        let n,
          r = 255
        if (!e) return
        e[5] !== n && (r = e[6] ? E(+e[5]) : C(+e[5]))
        const i = W(+e[2]),
          o = +e[3] / 100,
          a = +e[4] / 100
        return (
          (n =
            'hwb' === e[1]
              ? (function (t, e, n) {
                  return B(F, t, e, n)
                })(i, o, a)
              : 'hsv' === e[1]
                ? (function (t, e, n) {
                    return B(z, t, e, n)
                  })(i, o, a)
                : U(i, o, a)),
          { r: n[0], g: n[1], b: n[2], a: r }
        )
      }
      const H = {
          x: 'dark',
          Z: 'light',
          Y: 're',
          X: 'blu',
          W: 'gr',
          V: 'medium',
          U: 'slate',
          A: 'ee',
          T: 'ol',
          S: 'or',
          B: 'ra',
          C: 'lateg',
          D: 'ights',
          R: 'in',
          Q: 'turquois',
          E: 'hi',
          P: 'ro',
          O: 'al',
          N: 'le',
          M: 'de',
          L: 'yello',
          F: 'en',
          K: 'ch',
          G: 'arks',
          H: 'ea',
          I: 'ightg',
          J: 'wh',
        },
        $ = {
          OiceXe: 'f0f8ff',
          antiquewEte: 'faebd7',
          aqua: 'ffff',
          aquamarRe: '7fffd4',
          azuY: 'f0ffff',
          beige: 'f5f5dc',
          bisque: 'ffe4c4',
          black: '0',
          blanKedOmond: 'ffebcd',
          Xe: 'ff',
          XeviTet: '8a2be2',
          bPwn: 'a52a2a',
          burlywood: 'deb887',
          caMtXe: '5f9ea0',
          KartYuse: '7fff00',
          KocTate: 'd2691e',
          cSO: 'ff7f50',
          cSnflowerXe: '6495ed',
          cSnsilk: 'fff8dc',
          crimson: 'dc143c',
          cyan: 'ffff',
          xXe: '8b',
          xcyan: '8b8b',
          xgTMnPd: 'b8860b',
          xWay: 'a9a9a9',
          xgYF: '6400',
          xgYy: 'a9a9a9',
          xkhaki: 'bdb76b',
          xmagFta: '8b008b',
          xTivegYF: '556b2f',
          xSange: 'ff8c00',
          xScEd: '9932cc',
          xYd: '8b0000',
          xsOmon: 'e9967a',
          xsHgYF: '8fbc8f',
          xUXe: '483d8b',
          xUWay: '2f4f4f',
          xUgYy: '2f4f4f',
          xQe: 'ced1',
          xviTet: '9400d3',
          dAppRk: 'ff1493',
          dApskyXe: 'bfff',
          dimWay: '696969',
          dimgYy: '696969',
          dodgerXe: '1e90ff',
          fiYbrick: 'b22222',
          flSOwEte: 'fffaf0',
          foYstWAn: '228b22',
          fuKsia: 'ff00ff',
          gaRsbSo: 'dcdcdc',
          ghostwEte: 'f8f8ff',
          gTd: 'ffd700',
          gTMnPd: 'daa520',
          Way: '808080',
          gYF: '8000',
          gYFLw: 'adff2f',
          gYy: '808080',
          honeyMw: 'f0fff0',
          hotpRk: 'ff69b4',
          RdianYd: 'cd5c5c',
          Rdigo: '4b0082',
          ivSy: 'fffff0',
          khaki: 'f0e68c',
          lavFMr: 'e6e6fa',
          lavFMrXsh: 'fff0f5',
          lawngYF: '7cfc00',
          NmoncEffon: 'fffacd',
          ZXe: 'add8e6',
          ZcSO: 'f08080',
          Zcyan: 'e0ffff',
          ZgTMnPdLw: 'fafad2',
          ZWay: 'd3d3d3',
          ZgYF: '90ee90',
          ZgYy: 'd3d3d3',
          ZpRk: 'ffb6c1',
          ZsOmon: 'ffa07a',
          ZsHgYF: '20b2aa',
          ZskyXe: '87cefa',
          ZUWay: '778899',
          ZUgYy: '778899',
          ZstAlXe: 'b0c4de',
          ZLw: 'ffffe0',
          lime: 'ff00',
          limegYF: '32cd32',
          lRF: 'faf0e6',
          magFta: 'ff00ff',
          maPon: '800000',
          VaquamarRe: '66cdaa',
          VXe: 'cd',
          VScEd: 'ba55d3',
          VpurpN: '9370db',
          VsHgYF: '3cb371',
          VUXe: '7b68ee',
          VsprRggYF: 'fa9a',
          VQe: '48d1cc',
          VviTetYd: 'c71585',
          midnightXe: '191970',
          mRtcYam: 'f5fffa',
          mistyPse: 'ffe4e1',
          moccasR: 'ffe4b5',
          navajowEte: 'ffdead',
          navy: '80',
          Tdlace: 'fdf5e6',
          Tive: '808000',
          TivedBb: '6b8e23',
          Sange: 'ffa500',
          SangeYd: 'ff4500',
          ScEd: 'da70d6',
          pOegTMnPd: 'eee8aa',
          pOegYF: '98fb98',
          pOeQe: 'afeeee',
          pOeviTetYd: 'db7093',
          papayawEp: 'ffefd5',
          pHKpuff: 'ffdab9',
          peru: 'cd853f',
          pRk: 'ffc0cb',
          plum: 'dda0dd',
          powMrXe: 'b0e0e6',
          purpN: '800080',
          YbeccapurpN: '663399',
          Yd: 'ff0000',
          Psybrown: 'bc8f8f',
          PyOXe: '4169e1',
          saddNbPwn: '8b4513',
          sOmon: 'fa8072',
          sandybPwn: 'f4a460',
          sHgYF: '2e8b57',
          sHshell: 'fff5ee',
          siFna: 'a0522d',
          silver: 'c0c0c0',
          skyXe: '87ceeb',
          UXe: '6a5acd',
          UWay: '708090',
          UgYy: '708090',
          snow: 'fffafa',
          sprRggYF: 'ff7f',
          stAlXe: '4682b4',
          tan: 'd2b48c',
          teO: '8080',
          tEstN: 'd8bfd8',
          tomato: 'ff6347',
          Qe: '40e0d0',
          viTet: 'ee82ee',
          JHt: 'f5deb3',
          wEte: 'ffffff',
          wEtesmoke: 'f5f5f5',
          Lw: 'ffff00',
          LwgYF: '9acd32',
        }
      let Y
      function q(t) {
        Y ||
          ((Y = (function () {
            const t = {},
              e = Object.keys($),
              n = Object.keys(H)
            let r, i, o, a, s
            for (r = 0; r < e.length; r++) {
              for (a = s = e[r], i = 0; i < n.length; i++)
                (o = n[i]), (s = s.replace(o, H[o]))
              ;(o = parseInt($[a], 16)),
                (t[s] = [(o >> 16) & 255, (o >> 8) & 255, 255 & o])
            }
            return t
          })()),
          (Y.transparent = [0, 0, 0, 0]))
        const e = Y[t.toLowerCase()]
        return e && { r: e[0], g: e[1], b: e[2], a: 4 === e.length ? e[3] : 255 }
      }
      const Q =
        /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/
      const X = (t) =>
          t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055,
        K = (t) => (t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4))
      function Z(t, e, n) {
        if (t) {
          let r = I(t)
          ;(r[e] = Math.max(0, Math.min(r[e] + r[e] * n, 0 === e ? 360 : 1))),
            (r = U(r)),
            (t.r = r[0]),
            (t.g = r[1]),
            (t.b = r[2])
        }
      }
      function J(t, e) {
        return t ? Object.assign(e || {}, t) : t
      }
      function G(t) {
        var e = { r: 0, g: 0, b: 0, a: 255 }
        return (
          Array.isArray(t)
            ? t.length >= 3 &&
              ((e = { r: t[0], g: t[1], b: t[2], a: 255 }),
              t.length > 3 && (e.a = C(t[3])))
            : ((e = J(t, { r: 0, g: 0, b: 0, a: 1 })).a = C(e.a)),
          e
        )
      }
      function tt(t) {
        return 'r' === t.charAt(0)
          ? (function (t) {
              const e = Q.exec(t)
              let n,
                r,
                i,
                o = 255
              if (e) {
                if (e[7] !== n) {
                  const t = +e[7]
                  o = e[8] ? E(t) : S(255 * t, 0, 255)
                }
                return (
                  (n = +e[1]),
                  (r = +e[3]),
                  (i = +e[5]),
                  (n = 255 & (e[2] ? E(n) : S(n, 0, 255))),
                  (r = 255 & (e[4] ? E(r) : S(r, 0, 255))),
                  (i = 255 & (e[6] ? E(i) : S(i, 0, 255))),
                  { r: n, g: r, b: i, a: o }
                )
              }
            })(t)
          : V(t)
      }
      class et {
        constructor(t) {
          if (t instanceof et) return t
          const e = typeof t
          let n
          var r, i, o
          'object' === e
            ? (n = G(t))
            : 'string' === e &&
              ((o = (r = t).length),
              '#' === r[0] &&
                (4 === o || 5 === o
                  ? (i = {
                      r: 255 & (17 * O[r[1]]),
                      g: 255 & (17 * O[r[2]]),
                      b: 255 & (17 * O[r[3]]),
                      a: 5 === o ? 17 * O[r[4]] : 255,
                    })
                  : (7 !== o && 9 !== o) ||
                    (i = {
                      r: (O[r[1]] << 4) | O[r[2]],
                      g: (O[r[3]] << 4) | O[r[4]],
                      b: (O[r[5]] << 4) | O[r[6]],
                      a: 9 === o ? (O[r[7]] << 4) | O[r[8]] : 255,
                    })),
              (n = i || q(t) || tt(t))),
            (this._rgb = n),
            (this._valid = !!n)
        }
        get valid() {
          return this._valid
        }
        get rgb() {
          var t = J(this._rgb)
          return t && (t.a = M(t.a)), t
        }
        set rgb(t) {
          this._rgb = G(t)
        }
        rgbString() {
          return this._valid
            ? (t = this._rgb) &&
                (t.a < 255
                  ? `rgba(${t.r}, ${t.g}, ${t.b}, ${M(t.a)})`
                  : `rgb(${t.r}, ${t.g}, ${t.b})`)
            : void 0
          var t
        }
        hexString() {
          return this._valid ? A(this._rgb) : void 0
        }
        hslString() {
          return this._valid
            ? (function (t) {
                if (!t) return
                const e = I(t),
                  n = e[0],
                  r = P(e[1]),
                  i = P(e[2])
                return t.a < 255
                  ? `hsla(${n}, ${r}%, ${i}%, ${M(t.a)})`
                  : `hsl(${n}, ${r}%, ${i}%)`
              })(this._rgb)
            : void 0
        }
        mix(t, e) {
          if (t) {
            const n = this.rgb,
              r = t.rgb
            let i
            const o = e === i ? 0.5 : e,
              a = 2 * o - 1,
              s = n.a - r.a,
              l = ((a * s == -1 ? a : (a + s) / (1 + a * s)) + 1) / 2
            ;(i = 1 - l),
              (n.r = 255 & (l * n.r + i * r.r + 0.5)),
              (n.g = 255 & (l * n.g + i * r.g + 0.5)),
              (n.b = 255 & (l * n.b + i * r.b + 0.5)),
              (n.a = o * n.a + (1 - o) * r.a),
              (this.rgb = n)
          }
          return this
        }
        interpolate(t, e) {
          return (
            t &&
              (this._rgb = (function (t, e, n) {
                const r = K(M(t.r)),
                  i = K(M(t.g)),
                  o = K(M(t.b))
                return {
                  r: C(X(r + n * (K(M(e.r)) - r))),
                  g: C(X(i + n * (K(M(e.g)) - i))),
                  b: C(X(o + n * (K(M(e.b)) - o))),
                  a: t.a + n * (e.a - t.a),
                }
              })(this._rgb, t._rgb, e)),
            this
          )
        }
        clone() {
          return new et(this.rgb)
        }
        alpha(t) {
          return (this._rgb.a = C(t)), this
        }
        clearer(t) {
          return (this._rgb.a *= 1 - t), this
        }
        greyscale() {
          const t = this._rgb,
            e = k(0.3 * t.r + 0.59 * t.g + 0.11 * t.b)
          return (t.r = t.g = t.b = e), this
        }
        opaquer(t) {
          return (this._rgb.a *= 1 + t), this
        }
        negate() {
          const t = this._rgb
          return (t.r = 255 - t.r), (t.g = 255 - t.g), (t.b = 255 - t.b), this
        }
        lighten(t) {
          return Z(this._rgb, 2, t), this
        }
        darken(t) {
          return Z(this._rgb, 2, -t), this
        }
        saturate(t) {
          return Z(this._rgb, 1, t), this
        }
        desaturate(t) {
          return Z(this._rgb, 1, -t), this
        }
        rotate(t) {
          return (
            (function (t, e) {
              var n = I(t)
              ;(n[0] = W(n[0] + e)),
                (n = U(n)),
                (t.r = n[0]),
                (t.g = n[1]),
                (t.b = n[2])
            })(this._rgb, t),
            this
          )
        }
      }
      function nt() {}
      const rt = (() => {
        let t = 0
        return () => t++
      })()
      function it(t) {
        return null == t
      }
      function ot(t) {
        if (Array.isArray && Array.isArray(t)) return !0
        const e = Object.prototype.toString.call(t)
        return '[object' === e.slice(0, 7) && 'Array]' === e.slice(-6)
      }
      function at(t) {
        return null !== t && '[object Object]' === Object.prototype.toString.call(t)
      }
      function st(t) {
        return ('number' == typeof t || t instanceof Number) && isFinite(+t)
      }
      function lt(t, e) {
        return st(t) ? t : e
      }
      function ct(t, e) {
        return void 0 === t ? e : t
      }
      const ut = (t, e) =>
        'string' == typeof t && t.endsWith('%') ? (parseFloat(t) / 100) * e : +t
      function dt(t, e, n) {
        if (t && 'function' == typeof t.call) return t.apply(n, e)
      }
      function ht(t, e, n, r) {
        let i, o, a
        if (ot(t))
          if (((o = t.length), r)) for (i = o - 1; i >= 0; i--) e.call(n, t[i], i)
          else for (i = 0; i < o; i++) e.call(n, t[i], i)
        else if (at(t))
          for (a = Object.keys(t), o = a.length, i = 0; i < o; i++)
            e.call(n, t[a[i]], a[i])
      }
      function ft(t, e) {
        let n, r, i, o
        if (!t || !e || t.length !== e.length) return !1
        for (n = 0, r = t.length; n < r; ++n)
          if (
            ((i = t[n]),
            (o = e[n]),
            i.datasetIndex !== o.datasetIndex || i.index !== o.index)
          )
            return !1
        return !0
      }
      function pt(t) {
        if (ot(t)) return t.map(pt)
        if (at(t)) {
          const e = Object.create(null),
            n = Object.keys(t),
            r = n.length
          let i = 0
          for (; i < r; ++i) e[n[i]] = pt(t[n[i]])
          return e
        }
        return t
      }
      function gt(t) {
        return -1 === ['__proto__', 'prototype', 'constructor'].indexOf(t)
      }
      function mt(t, e, n, r) {
        if (!gt(t)) return
        const i = e[t],
          o = n[t]
        at(i) && at(o) ? bt(i, o, r) : (e[t] = pt(o))
      }
      function bt(t, e, n) {
        const r = ot(e) ? e : [e],
          i = r.length
        if (!at(t)) return t
        const o = (n = n || {}).merger || mt
        let a
        for (let e = 0; e < i; ++e) {
          if (((a = r[e]), !at(a))) continue
          const i = Object.keys(a)
          for (let e = 0, r = i.length; e < r; ++e) o(i[e], t, a, n)
        }
        return t
      }
      function yt(t, e) {
        return bt(t, e, { merger: vt })
      }
      function vt(t, e, n) {
        if (!gt(t)) return
        const r = e[t],
          i = n[t]
        at(r) && at(i)
          ? yt(r, i)
          : Object.prototype.hasOwnProperty.call(e, t) || (e[t] = pt(i))
      }
      const xt = { '': (t) => t, x: (t) => t.x, y: (t) => t.y }
      function wt(t, e) {
        const n =
          xt[e] ||
          (xt[e] = (function (t) {
            const e = (function (t) {
              const e = t.split('.'),
                n = []
              let r = ''
              for (const t of e)
                (r += t),
                  r.endsWith('\\')
                    ? (r = r.slice(0, -1) + '.')
                    : (n.push(r), (r = ''))
              return n
            })(t)
            return (t) => {
              for (const n of e) {
                if ('' === n) break
                t = t && t[n]
              }
              return t
            }
          })(e))
        return n(t)
      }
      function _t(t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
      }
      const kt = (t) => void 0 !== t,
        St = (t) => 'function' == typeof t,
        Et = (t, e) => {
          if (t.size !== e.size) return !1
          for (const n of t) if (!e.has(n)) return !1
          return !0
        }
      const Ct = Math.PI,
        Mt = 2 * Ct,
        Pt = Mt + Ct,
        Ot = Number.POSITIVE_INFINITY,
        Dt = Ct / 180,
        Tt = Ct / 2,
        Rt = Ct / 4,
        Lt = (2 * Ct) / 3,
        At = Math.log10,
        Nt = Math.sign
      function jt(t, e, n) {
        return Math.abs(t - e) < n
      }
      function zt(t) {
        const e = Math.round(t)
        t = jt(t, e, t / 1e3) ? e : t
        const n = Math.pow(10, Math.floor(At(t))),
          r = t / n
        return (r <= 1 ? 1 : r <= 2 ? 2 : r <= 5 ? 5 : 10) * n
      }
      function Ft(t) {
        return !isNaN(parseFloat(t)) && isFinite(t)
      }
      function It(t, e, n) {
        let r, i, o
        for (r = 0, i = t.length; r < i; r++)
          (o = t[r][n]),
            isNaN(o) || ((e.min = Math.min(e.min, o)), (e.max = Math.max(e.max, o)))
      }
      function Bt(t) {
        return t * (Ct / 180)
      }
      function Ut(t) {
        return t * (180 / Ct)
      }
      function Wt(t) {
        if (!st(t)) return
        let e = 1,
          n = 0
        for (; Math.round(t * e) / e !== t; ) (e *= 10), n++
        return n
      }
      function Vt(t, e) {
        const n = e.x - t.x,
          r = e.y - t.y,
          i = Math.sqrt(n * n + r * r)
        let o = Math.atan2(r, n)
        return o < -0.5 * Ct && (o += Mt), { angle: o, distance: i }
      }
      function Ht(t, e) {
        return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
      }
      function $t(t, e) {
        return ((t - e + Pt) % Mt) - Ct
      }
      function Yt(t) {
        return ((t % Mt) + Mt) % Mt
      }
      function qt(t, e, n, r) {
        const i = Yt(t),
          o = Yt(e),
          a = Yt(n),
          s = Yt(o - i),
          l = Yt(a - i),
          c = Yt(i - o),
          u = Yt(i - a)
        return i === o || i === a || (r && o === a) || (s > l && c < u)
      }
      function Qt(t, e, n) {
        return Math.max(e, Math.min(n, t))
      }
      function Xt(t, e, n, r = 1e-6) {
        return t >= Math.min(e, n) - r && t <= Math.max(e, n) + r
      }
      function Kt(t, e, n) {
        n = n || ((n) => t[n] < e)
        let r,
          i = t.length - 1,
          o = 0
        for (; i - o > 1; ) (r = (o + i) >> 1), n(r) ? (o = r) : (i = r)
        return { lo: o, hi: i }
      }
      const Zt = (t, e, n, r) =>
          Kt(
            t,
            n,
            r
              ? (r) => {
                  const i = t[r][e]
                  return i < n || (i === n && t[r + 1][e] === n)
                }
              : (r) => t[r][e] < n,
          ),
        Jt = (t, e, n) => Kt(t, n, (r) => t[r][e] >= n)
      const Gt = ['push', 'pop', 'shift', 'splice', 'unshift']
      function te(t, e) {
        const n = t._chartjs
        if (!n) return
        const r = n.listeners,
          i = r.indexOf(e)
        ;-1 !== i && r.splice(i, 1),
          r.length > 0 ||
            (Gt.forEach((e) => {
              delete t[e]
            }),
            delete t._chartjs)
      }
      function ee(t) {
        const e = new Set(t)
        return e.size === t.length ? t : Array.from(e)
      }
      const ne =
        'undefined' == typeof window
          ? function (t) {
              return t()
            }
          : window.requestAnimationFrame
      function re(t, e) {
        let n = [],
          r = !1
        return function (...i) {
          ;(n = i),
            r ||
              ((r = !0),
              ne.call(window, () => {
                ;(r = !1), t.apply(e, n)
              }))
        }
      }
      const ie = (t) => ('start' === t ? 'left' : 'end' === t ? 'right' : 'center'),
        oe = (t, e, n) => ('start' === t ? e : 'end' === t ? n : (e + n) / 2)
      function ae(t, e, n) {
        const r = e.length
        let i = 0,
          o = r
        if (t._sorted) {
          const { iScale: a, _parsed: s } = t,
            l = a.axis,
            { min: c, max: u, minDefined: d, maxDefined: h } = a.getUserBounds()
          d &&
            (i = Qt(
              Math.min(Zt(s, l, c).lo, n ? r : Zt(e, l, a.getPixelForValue(c)).lo),
              0,
              r - 1,
            )),
            (o = h
              ? Qt(
                  Math.max(
                    Zt(s, a.axis, u, !0).hi + 1,
                    n ? 0 : Zt(e, l, a.getPixelForValue(u), !0).hi + 1,
                  ),
                  i,
                  r,
                ) - i
              : r - i)
        }
        return { start: i, count: o }
      }
      function se(t) {
        const { xScale: e, yScale: n, _scaleRanges: r } = t,
          i = { xmin: e.min, xmax: e.max, ymin: n.min, ymax: n.max }
        if (!r) return (t._scaleRanges = i), !0
        const o =
          r.xmin !== e.min ||
          r.xmax !== e.max ||
          r.ymin !== n.min ||
          r.ymax !== n.max
        return Object.assign(r, i), o
      }
      const le = (t) => 0 === t || 1 === t,
        ce = (t, e, n) =>
          -Math.pow(2, 10 * (t -= 1)) * Math.sin(((t - e) * Mt) / n),
        ue = (t, e, n) => Math.pow(2, -10 * t) * Math.sin(((t - e) * Mt) / n) + 1,
        de = {
          linear: (t) => t,
          easeInQuad: (t) => t * t,
          easeOutQuad: (t) => -t * (t - 2),
          easeInOutQuad: (t) =>
            (t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1),
          easeInCubic: (t) => t * t * t,
          easeOutCubic: (t) => (t -= 1) * t * t + 1,
          easeInOutCubic: (t) =>
            (t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2),
          easeInQuart: (t) => t * t * t * t,
          easeOutQuart: (t) => -((t -= 1) * t * t * t - 1),
          easeInOutQuart: (t) =>
            (t /= 0.5) < 1
              ? 0.5 * t * t * t * t
              : -0.5 * ((t -= 2) * t * t * t - 2),
          easeInQuint: (t) => t * t * t * t * t,
          easeOutQuint: (t) => (t -= 1) * t * t * t * t + 1,
          easeInOutQuint: (t) =>
            (t /= 0.5) < 1
              ? 0.5 * t * t * t * t * t
              : 0.5 * ((t -= 2) * t * t * t * t + 2),
          easeInSine: (t) => 1 - Math.cos(t * Tt),
          easeOutSine: (t) => Math.sin(t * Tt),
          easeInOutSine: (t) => -0.5 * (Math.cos(Ct * t) - 1),
          easeInExpo: (t) => (0 === t ? 0 : Math.pow(2, 10 * (t - 1))),
          easeOutExpo: (t) => (1 === t ? 1 : 1 - Math.pow(2, -10 * t)),
          easeInOutExpo: (t) =>
            le(t)
              ? t
              : t < 0.5
                ? 0.5 * Math.pow(2, 10 * (2 * t - 1))
                : 0.5 * (2 - Math.pow(2, -10 * (2 * t - 1))),
          easeInCirc: (t) => (t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1)),
          easeOutCirc: (t) => Math.sqrt(1 - (t -= 1) * t),
          easeInOutCirc: (t) =>
            (t /= 0.5) < 1
              ? -0.5 * (Math.sqrt(1 - t * t) - 1)
              : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
          easeInElastic: (t) => (le(t) ? t : ce(t, 0.075, 0.3)),
          easeOutElastic: (t) => (le(t) ? t : ue(t, 0.075, 0.3)),
          easeInOutElastic(t) {
            const e = 0.1125
            return le(t)
              ? t
              : t < 0.5
                ? 0.5 * ce(2 * t, e, 0.45)
                : 0.5 + 0.5 * ue(2 * t - 1, e, 0.45)
          },
          easeInBack(t) {
            const e = 1.70158
            return t * t * ((e + 1) * t - e)
          },
          easeOutBack(t) {
            const e = 1.70158
            return (t -= 1) * t * ((e + 1) * t + e) + 1
          },
          easeInOutBack(t) {
            let e = 1.70158
            return (t /= 0.5) < 1
              ? t * t * ((1 + (e *= 1.525)) * t - e) * 0.5
              : 0.5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2)
          },
          easeInBounce: (t) => 1 - de.easeOutBounce(1 - t),
          easeOutBounce(t) {
            const e = 7.5625,
              n = 2.75
            return t < 1 / n
              ? e * t * t
              : t < 2 / n
                ? e * (t -= 1.5 / n) * t + 0.75
                : t < 2.5 / n
                  ? e * (t -= 2.25 / n) * t + 0.9375
                  : e * (t -= 2.625 / n) * t + 0.984375
          },
          easeInOutBounce: (t) =>
            t < 0.5
              ? 0.5 * de.easeInBounce(2 * t)
              : 0.5 * de.easeOutBounce(2 * t - 1) + 0.5,
        }
      function he(t) {
        if (t && 'object' == typeof t) {
          const e = t.toString()
          return '[object CanvasPattern]' === e || '[object CanvasGradient]' === e
        }
        return !1
      }
      function fe(t) {
        return he(t) ? t : new et(t)
      }
      function pe(t) {
        return he(t) ? t : new et(t).saturate(0.5).darken(0.1).hexString()
      }
      const ge = ['x', 'y', 'borderWidth', 'radius', 'tension'],
        me = ['color', 'borderColor', 'backgroundColor']
      const be = new Map()
      function ye(t, e, n) {
        return (function (t, e) {
          e = e || {}
          const n = t + JSON.stringify(e)
          let r = be.get(n)
          return r || ((r = new Intl.NumberFormat(t, e)), be.set(n, r)), r
        })(e, n).format(t)
      }
      const ve = {
        values: (t) => (ot(t) ? t : '' + t),
        numeric(t, e, n) {
          if (0 === t) return '0'
          const r = this.chart.options.locale
          let i,
            o = t
          if (n.length > 1) {
            const e = Math.max(
              Math.abs(n[0].value),
              Math.abs(n[n.length - 1].value),
            )
            ;(e < 1e-4 || e > 1e15) && (i = 'scientific'),
              (o = (function (t, e) {
                let n =
                  e.length > 3 ? e[2].value - e[1].value : e[1].value - e[0].value
                Math.abs(n) >= 1 && t !== Math.floor(t) && (n = t - Math.floor(t))
                return n
              })(t, n))
          }
          const a = At(Math.abs(o)),
            s = isNaN(a) ? 1 : Math.max(Math.min(-1 * Math.floor(a), 20), 0),
            l = { notation: i, minimumFractionDigits: s, maximumFractionDigits: s }
          return Object.assign(l, this.options.ticks.format), ye(t, r, l)
        },
        logarithmic(t, e, n) {
          if (0 === t) return '0'
          const r = n[e].significand || t / Math.pow(10, Math.floor(At(t)))
          return [1, 2, 3, 5, 10, 15].includes(r) || e > 0.8 * n.length
            ? ve.numeric.call(this, t, e, n)
            : ''
        },
      }
      var xe = { formatters: ve }
      const we = Object.create(null),
        _e = Object.create(null)
      function ke(t, e) {
        if (!e) return t
        const n = e.split('.')
        for (let e = 0, r = n.length; e < r; ++e) {
          const r = n[e]
          t = t[r] || (t[r] = Object.create(null))
        }
        return t
      }
      function Se(t, e, n) {
        return 'string' == typeof e ? bt(ke(t, e), n) : bt(ke(t, ''), e)
      }
      class Ee {
        constructor(t, e) {
          ;(this.animation = void 0),
            (this.backgroundColor = 'rgba(0,0,0,0.1)'),
            (this.borderColor = 'rgba(0,0,0,0.1)'),
            (this.color = '#666'),
            (this.datasets = {}),
            (this.devicePixelRatio = (t) => t.chart.platform.getDevicePixelRatio()),
            (this.elements = {}),
            (this.events = [
              'mousemove',
              'mouseout',
              'click',
              'touchstart',
              'touchmove',
            ]),
            (this.font = {
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              size: 12,
              style: 'normal',
              lineHeight: 1.2,
              weight: null,
            }),
            (this.hover = {}),
            (this.hoverBackgroundColor = (t, e) => pe(e.backgroundColor)),
            (this.hoverBorderColor = (t, e) => pe(e.borderColor)),
            (this.hoverColor = (t, e) => pe(e.color)),
            (this.indexAxis = 'x'),
            (this.interaction = {
              mode: 'nearest',
              intersect: !0,
              includeInvisible: !1,
            }),
            (this.maintainAspectRatio = !0),
            (this.onHover = null),
            (this.onClick = null),
            (this.parsing = !0),
            (this.plugins = {}),
            (this.responsive = !0),
            (this.scale = void 0),
            (this.scales = {}),
            (this.showLine = !0),
            (this.drawActiveElementsOnTop = !0),
            this.describe(t),
            this.apply(e)
        }
        set(t, e) {
          return Se(this, t, e)
        }
        get(t) {
          return ke(this, t)
        }
        describe(t, e) {
          return Se(_e, t, e)
        }
        override(t, e) {
          return Se(we, t, e)
        }
        route(t, e, n, r) {
          const i = ke(this, t),
            o = ke(this, n),
            a = '_' + e
          Object.defineProperties(i, {
            [a]: { value: i[e], writable: !0 },
            [e]: {
              enumerable: !0,
              get() {
                const t = this[a],
                  e = o[r]
                return at(t) ? Object.assign({}, e, t) : ct(t, e)
              },
              set(t) {
                this[a] = t
              },
            },
          })
        }
        apply(t) {
          t.forEach((t) => t(this))
        }
      }
      var Ce = new Ee(
        {
          _scriptable: (t) => !t.startsWith('on'),
          _indexable: (t) => 'events' !== t,
          hover: { _fallback: 'interaction' },
          interaction: { _scriptable: !1, _indexable: !1 },
        },
        [
          function (t) {
            t.set('animation', {
              delay: void 0,
              duration: 1e3,
              easing: 'easeOutQuart',
              fn: void 0,
              from: void 0,
              loop: void 0,
              to: void 0,
              type: void 0,
            }),
              t.describe('animation', {
                _fallback: !1,
                _indexable: !1,
                _scriptable: (t) =>
                  'onProgress' !== t && 'onComplete' !== t && 'fn' !== t,
              }),
              t.set('animations', {
                colors: { type: 'color', properties: me },
                numbers: { type: 'number', properties: ge },
              }),
              t.describe('animations', { _fallback: 'animation' }),
              t.set('transitions', {
                active: { animation: { duration: 400 } },
                resize: { animation: { duration: 0 } },
                show: {
                  animations: {
                    colors: { from: 'transparent' },
                    visible: { type: 'boolean', duration: 0 },
                  },
                },
                hide: {
                  animations: {
                    colors: { to: 'transparent' },
                    visible: {
                      type: 'boolean',
                      easing: 'linear',
                      fn: (t) => 0 | t,
                    },
                  },
                },
              })
          },
          function (t) {
            t.set('layout', {
              autoPadding: !0,
              padding: { top: 0, right: 0, bottom: 0, left: 0 },
            })
          },
          function (t) {
            t.set('scale', {
              display: !0,
              offset: !1,
              reverse: !1,
              beginAtZero: !1,
              bounds: 'ticks',
              clip: !0,
              grace: 0,
              grid: {
                display: !0,
                lineWidth: 1,
                drawOnChartArea: !0,
                drawTicks: !0,
                tickLength: 8,
                tickWidth: (t, e) => e.lineWidth,
                tickColor: (t, e) => e.color,
                offset: !1,
              },
              border: { display: !0, dash: [], dashOffset: 0, width: 1 },
              title: { display: !1, text: '', padding: { top: 4, bottom: 4 } },
              ticks: {
                minRotation: 0,
                maxRotation: 50,
                mirror: !1,
                textStrokeWidth: 0,
                textStrokeColor: '',
                padding: 3,
                display: !0,
                autoSkip: !0,
                autoSkipPadding: 3,
                labelOffset: 0,
                callback: xe.formatters.values,
                minor: {},
                major: {},
                align: 'center',
                crossAlign: 'near',
                showLabelBackdrop: !1,
                backdropColor: 'rgba(255, 255, 255, 0.75)',
                backdropPadding: 2,
              },
            }),
              t.route('scale.ticks', 'color', '', 'color'),
              t.route('scale.grid', 'color', '', 'borderColor'),
              t.route('scale.border', 'color', '', 'borderColor'),
              t.route('scale.title', 'color', '', 'color'),
              t.describe('scale', {
                _fallback: !1,
                _scriptable: (t) =>
                  !t.startsWith('before') &&
                  !t.startsWith('after') &&
                  'callback' !== t &&
                  'parser' !== t,
                _indexable: (t) =>
                  'borderDash' !== t && 'tickBorderDash' !== t && 'dash' !== t,
              }),
              t.describe('scales', { _fallback: 'scale' }),
              t.describe('scale.ticks', {
                _scriptable: (t) => 'backdropPadding' !== t && 'callback' !== t,
                _indexable: (t) => 'backdropPadding' !== t,
              })
          },
        ],
      )
      function Me(t, e, n, r, i) {
        let o = e[i]
        return (
          o || ((o = e[i] = t.measureText(i).width), n.push(i)), o > r && (r = o), r
        )
      }
      function Pe(t, e, n, r) {
        let i = ((r = r || {}).data = r.data || {}),
          o = (r.garbageCollect = r.garbageCollect || [])
        r.font !== e &&
          ((i = r.data = {}), (o = r.garbageCollect = []), (r.font = e)),
          t.save(),
          (t.font = e)
        let a = 0
        const s = n.length
        let l, c, u, d, h
        for (l = 0; l < s; l++)
          if (((d = n[l]), null == d || ot(d))) {
            if (ot(d))
              for (c = 0, u = d.length; c < u; c++)
                (h = d[c]), null == h || ot(h) || (a = Me(t, i, o, a, h))
          } else a = Me(t, i, o, a, d)
        t.restore()
        const f = o.length / 2
        if (f > n.length) {
          for (l = 0; l < f; l++) delete i[o[l]]
          o.splice(0, f)
        }
        return a
      }
      function Oe(t, e, n) {
        const r = t.currentDevicePixelRatio,
          i = 0 !== n ? Math.max(n / 2, 0.5) : 0
        return Math.round((e - i) * r) / r + i
      }
      function De(t, e) {
        ;(e = e || t.getContext('2d')).save(),
          e.resetTransform(),
          e.clearRect(0, 0, t.width, t.height),
          e.restore()
      }
      function Te(t, e, n, r) {
        Re(t, e, n, r, null)
      }
      function Re(t, e, n, r, i) {
        let o, a, s, l, c, u, d, h
        const f = e.pointStyle,
          p = e.rotation,
          g = e.radius
        let m = (p || 0) * Dt
        if (
          f &&
          'object' == typeof f &&
          ((o = f.toString()),
          '[object HTMLImageElement]' === o || '[object HTMLCanvasElement]' === o)
        )
          return (
            t.save(),
            t.translate(n, r),
            t.rotate(m),
            t.drawImage(f, -f.width / 2, -f.height / 2, f.width, f.height),
            void t.restore()
          )
        if (!(isNaN(g) || g <= 0)) {
          switch ((t.beginPath(), f)) {
            default:
              i ? t.ellipse(n, r, i / 2, g, 0, 0, Mt) : t.arc(n, r, g, 0, Mt),
                t.closePath()
              break
            case 'triangle':
              ;(u = i ? i / 2 : g),
                t.moveTo(n + Math.sin(m) * u, r - Math.cos(m) * g),
                (m += Lt),
                t.lineTo(n + Math.sin(m) * u, r - Math.cos(m) * g),
                (m += Lt),
                t.lineTo(n + Math.sin(m) * u, r - Math.cos(m) * g),
                t.closePath()
              break
            case 'rectRounded':
              ;(c = 0.516 * g),
                (l = g - c),
                (a = Math.cos(m + Rt) * l),
                (d = Math.cos(m + Rt) * (i ? i / 2 - c : l)),
                (s = Math.sin(m + Rt) * l),
                (h = Math.sin(m + Rt) * (i ? i / 2 - c : l)),
                t.arc(n - d, r - s, c, m - Ct, m - Tt),
                t.arc(n + h, r - a, c, m - Tt, m),
                t.arc(n + d, r + s, c, m, m + Tt),
                t.arc(n - h, r + a, c, m + Tt, m + Ct),
                t.closePath()
              break
            case 'rect':
              if (!p) {
                ;(l = Math.SQRT1_2 * g),
                  (u = i ? i / 2 : l),
                  t.rect(n - u, r - l, 2 * u, 2 * l)
                break
              }
              m += Rt
            case 'rectRot':
              ;(d = Math.cos(m) * (i ? i / 2 : g)),
                (a = Math.cos(m) * g),
                (s = Math.sin(m) * g),
                (h = Math.sin(m) * (i ? i / 2 : g)),
                t.moveTo(n - d, r - s),
                t.lineTo(n + h, r - a),
                t.lineTo(n + d, r + s),
                t.lineTo(n - h, r + a),
                t.closePath()
              break
            case 'crossRot':
              m += Rt
            case 'cross':
              ;(d = Math.cos(m) * (i ? i / 2 : g)),
                (a = Math.cos(m) * g),
                (s = Math.sin(m) * g),
                (h = Math.sin(m) * (i ? i / 2 : g)),
                t.moveTo(n - d, r - s),
                t.lineTo(n + d, r + s),
                t.moveTo(n + h, r - a),
                t.lineTo(n - h, r + a)
              break
            case 'star':
              ;(d = Math.cos(m) * (i ? i / 2 : g)),
                (a = Math.cos(m) * g),
                (s = Math.sin(m) * g),
                (h = Math.sin(m) * (i ? i / 2 : g)),
                t.moveTo(n - d, r - s),
                t.lineTo(n + d, r + s),
                t.moveTo(n + h, r - a),
                t.lineTo(n - h, r + a),
                (m += Rt),
                (d = Math.cos(m) * (i ? i / 2 : g)),
                (a = Math.cos(m) * g),
                (s = Math.sin(m) * g),
                (h = Math.sin(m) * (i ? i / 2 : g)),
                t.moveTo(n - d, r - s),
                t.lineTo(n + d, r + s),
                t.moveTo(n + h, r - a),
                t.lineTo(n - h, r + a)
              break
            case 'line':
              ;(a = i ? i / 2 : Math.cos(m) * g),
                (s = Math.sin(m) * g),
                t.moveTo(n - a, r - s),
                t.lineTo(n + a, r + s)
              break
            case 'dash':
              t.moveTo(n, r),
                t.lineTo(n + Math.cos(m) * (i ? i / 2 : g), r + Math.sin(m) * g)
              break
            case !1:
              t.closePath()
          }
          t.fill(), e.borderWidth > 0 && t.stroke()
        }
      }
      function Le(t, e, n) {
        return (
          (n = n || 0.5),
          !e ||
            (t &&
              t.x > e.left - n &&
              t.x < e.right + n &&
              t.y > e.top - n &&
              t.y < e.bottom + n)
        )
      }
      function Ae(t, e) {
        t.save(),
          t.beginPath(),
          t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top),
          t.clip()
      }
      function Ne(t) {
        t.restore()
      }
      function je(t, e, n, r, i) {
        if (!e) return t.lineTo(n.x, n.y)
        if ('middle' === i) {
          const r = (e.x + n.x) / 2
          t.lineTo(r, e.y), t.lineTo(r, n.y)
        } else ('after' === i) != !!r ? t.lineTo(e.x, n.y) : t.lineTo(n.x, e.y)
        t.lineTo(n.x, n.y)
      }
      function ze(t, e, n, r) {
        if (!e) return t.lineTo(n.x, n.y)
        t.bezierCurveTo(
          r ? e.cp1x : e.cp2x,
          r ? e.cp1y : e.cp2y,
          r ? n.cp2x : n.cp1x,
          r ? n.cp2y : n.cp1y,
          n.x,
          n.y,
        )
      }
      function Fe(t, e, n, r, i) {
        if (i.strikethrough || i.underline) {
          const o = t.measureText(r),
            a = e - o.actualBoundingBoxLeft,
            s = e + o.actualBoundingBoxRight,
            l = n - o.actualBoundingBoxAscent,
            c = n + o.actualBoundingBoxDescent,
            u = i.strikethrough ? (l + c) / 2 : c
          ;(t.strokeStyle = t.fillStyle),
            t.beginPath(),
            (t.lineWidth = i.decorationWidth || 2),
            t.moveTo(a, u),
            t.lineTo(s, u),
            t.stroke()
        }
      }
      function Ie(t, e) {
        const n = t.fillStyle
        ;(t.fillStyle = e.color),
          t.fillRect(e.left, e.top, e.width, e.height),
          (t.fillStyle = n)
      }
      function Be(t, e, n, r, i, o = {}) {
        const a = ot(e) ? e : [e],
          s = o.strokeWidth > 0 && '' !== o.strokeColor
        let l, c
        for (
          t.save(),
            t.font = i.string,
            (function (t, e) {
              e.translation && t.translate(e.translation[0], e.translation[1]),
                it(e.rotation) || t.rotate(e.rotation),
                e.color && (t.fillStyle = e.color),
                e.textAlign && (t.textAlign = e.textAlign),
                e.textBaseline && (t.textBaseline = e.textBaseline)
            })(t, o),
            l = 0;
          l < a.length;
          ++l
        )
          (c = a[l]),
            o.backdrop && Ie(t, o.backdrop),
            s &&
              (o.strokeColor && (t.strokeStyle = o.strokeColor),
              it(o.strokeWidth) || (t.lineWidth = o.strokeWidth),
              t.strokeText(c, n, r, o.maxWidth)),
            t.fillText(c, n, r, o.maxWidth),
            Fe(t, n, r, c, o),
            (r += Number(i.lineHeight))
        t.restore()
      }
      function Ue(t, e) {
        const { x: n, y: r, w: i, h: o, radius: a } = e
        t.arc(n + a.topLeft, r + a.topLeft, a.topLeft, 1.5 * Ct, Ct, !0),
          t.lineTo(n, r + o - a.bottomLeft),
          t.arc(n + a.bottomLeft, r + o - a.bottomLeft, a.bottomLeft, Ct, Tt, !0),
          t.lineTo(n + i - a.bottomRight, r + o),
          t.arc(
            n + i - a.bottomRight,
            r + o - a.bottomRight,
            a.bottomRight,
            Tt,
            0,
            !0,
          ),
          t.lineTo(n + i, r + a.topRight),
          t.arc(n + i - a.topRight, r + a.topRight, a.topRight, 0, -Tt, !0),
          t.lineTo(n + a.topLeft, r)
      }
      const We = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,
        Ve = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/
      function He(t, e) {
        const n = ('' + t).match(We)
        if (!n || 'normal' === n[1]) return 1.2 * e
        switch (((t = +n[2]), n[3])) {
          case 'px':
            return t
          case '%':
            t /= 100
        }
        return e * t
      }
      const $e = (t) => +t || 0
      function Ye(t, e) {
        const n = {},
          r = at(e),
          i = r ? Object.keys(e) : e,
          o = at(t) ? (r ? (n) => ct(t[n], t[e[n]]) : (e) => t[e]) : () => t
        for (const t of i) n[t] = $e(o(t))
        return n
      }
      function qe(t) {
        return Ye(t, { top: 'y', right: 'x', bottom: 'y', left: 'x' })
      }
      function Qe(t) {
        return Ye(t, ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'])
      }
      function Xe(t) {
        const e = qe(t)
        return (e.width = e.left + e.right), (e.height = e.top + e.bottom), e
      }
      function Ke(t, e) {
        ;(t = t || {}), (e = e || Ce.font)
        let n = ct(t.size, e.size)
        'string' == typeof n && (n = parseInt(n, 10))
        let r = ct(t.style, e.style)
        r &&
          !('' + r).match(Ve) &&
          (console.warn('Invalid font style specified: "' + r + '"'), (r = void 0))
        const i = {
          family: ct(t.family, e.family),
          lineHeight: He(ct(t.lineHeight, e.lineHeight), n),
          size: n,
          style: r,
          weight: ct(t.weight, e.weight),
          string: '',
        }
        return (
          (i.string = (function (t) {
            return !t || it(t.size) || it(t.family)
              ? null
              : (t.style ? t.style + ' ' : '') +
                  (t.weight ? t.weight + ' ' : '') +
                  t.size +
                  'px ' +
                  t.family
          })(i)),
          i
        )
      }
      function Ze(t, e, n, r) {
        let i,
          o,
          a,
          s = !0
        for (i = 0, o = t.length; i < o; ++i)
          if (
            ((a = t[i]),
            void 0 !== a &&
              (void 0 !== e && 'function' == typeof a && ((a = a(e)), (s = !1)),
              void 0 !== n && ot(a) && ((a = a[n % a.length]), (s = !1)),
              void 0 !== a))
          )
            return r && !s && (r.cacheable = !1), a
      }
      function Je(t, e) {
        return Object.assign(Object.create(t), e)
      }
      function Ge(t, e = [''], n, r, i = () => t[0]) {
        const o = n || t
        void 0 === r && (r = dn('_fallback', t))
        const a = {
          [Symbol.toStringTag]: 'Object',
          _cacheable: !0,
          _scopes: t,
          _rootScopes: o,
          _fallback: r,
          _getTarget: i,
          override: (n) => Ge([n, ...t], e, o, r),
        }
        return new Proxy(a, {
          deleteProperty: (e, n) => (
            delete e[n], delete e._keys, delete t[0][n], !0
          ),
          get: (n, r) =>
            on(n, r, () =>
              (function (t, e, n, r) {
                let i
                for (const o of e)
                  if (((i = dn(nn(o, t), n)), void 0 !== i))
                    return rn(t, i) ? cn(n, r, t, i) : i
              })(r, e, t, n),
            ),
          getOwnPropertyDescriptor: (t, e) =>
            Reflect.getOwnPropertyDescriptor(t._scopes[0], e),
          getPrototypeOf: () => Reflect.getPrototypeOf(t[0]),
          has: (t, e) => hn(t).includes(e),
          ownKeys: (t) => hn(t),
          set(t, e, n) {
            const r = t._storage || (t._storage = i())
            return (t[e] = r[e] = n), delete t._keys, !0
          },
        })
      }
      function tn(t, e, n, r) {
        const i = {
          _cacheable: !1,
          _proxy: t,
          _context: e,
          _subProxy: n,
          _stack: new Set(),
          _descriptors: en(t, r),
          setContext: (e) => tn(t, e, n, r),
          override: (i) => tn(t.override(i), e, n, r),
        }
        return new Proxy(i, {
          deleteProperty: (e, n) => (delete e[n], delete t[n], !0),
          get: (t, e, n) =>
            on(t, e, () =>
              (function (t, e, n) {
                const { _proxy: r, _context: i, _subProxy: o, _descriptors: a } = t
                let s = r[e]
                St(s) &&
                  a.isScriptable(e) &&
                  (s = (function (t, e, n, r) {
                    const { _proxy: i, _context: o, _subProxy: a, _stack: s } = n
                    if (s.has(t))
                      throw new Error(
                        'Recursion detected: ' +
                          Array.from(s).join('->') +
                          '->' +
                          t,
                      )
                    s.add(t)
                    let l = e(o, a || r)
                    s.delete(t), rn(t, l) && (l = cn(i._scopes, i, t, l))
                    return l
                  })(e, s, t, n))
                ot(s) &&
                  s.length &&
                  (s = (function (t, e, n, r) {
                    const {
                      _proxy: i,
                      _context: o,
                      _subProxy: a,
                      _descriptors: s,
                    } = n
                    if (void 0 !== o.index && r(t)) return e[o.index % e.length]
                    if (at(e[0])) {
                      const n = e,
                        r = i._scopes.filter((t) => t !== n)
                      e = []
                      for (const l of n) {
                        const n = cn(r, i, t, l)
                        e.push(tn(n, o, a && a[t], s))
                      }
                    }
                    return e
                  })(e, s, t, a.isIndexable))
                rn(e, s) && (s = tn(s, i, o && o[e], a))
                return s
              })(t, e, n),
            ),
          getOwnPropertyDescriptor: (e, n) =>
            e._descriptors.allKeys
              ? Reflect.has(t, n)
                ? { enumerable: !0, configurable: !0 }
                : void 0
              : Reflect.getOwnPropertyDescriptor(t, n),
          getPrototypeOf: () => Reflect.getPrototypeOf(t),
          has: (e, n) => Reflect.has(t, n),
          ownKeys: () => Reflect.ownKeys(t),
          set: (e, n, r) => ((t[n] = r), delete e[n], !0),
        })
      }
      function en(t, e = { scriptable: !0, indexable: !0 }) {
        const {
          _scriptable: n = e.scriptable,
          _indexable: r = e.indexable,
          _allKeys: i = e.allKeys,
        } = t
        return {
          allKeys: i,
          scriptable: n,
          indexable: r,
          isScriptable: St(n) ? n : () => n,
          isIndexable: St(r) ? r : () => r,
        }
      }
      const nn = (t, e) => (t ? t + _t(e) : e),
        rn = (t, e) =>
          at(e) &&
          'adapters' !== t &&
          (null === Object.getPrototypeOf(e) || e.constructor === Object)
      function on(t, e, n) {
        if (Object.prototype.hasOwnProperty.call(t, e)) return t[e]
        const r = n()
        return (t[e] = r), r
      }
      function an(t, e, n) {
        return St(t) ? t(e, n) : t
      }
      const sn = (t, e) => (!0 === t ? e : 'string' == typeof t ? wt(e, t) : void 0)
      function ln(t, e, n, r, i) {
        for (const o of e) {
          const e = sn(n, o)
          if (e) {
            t.add(e)
            const o = an(e._fallback, n, i)
            if (void 0 !== o && o !== n && o !== r) return o
          } else if (!1 === e && void 0 !== r && n !== r) return null
        }
        return !1
      }
      function cn(t, e, n, r) {
        const i = e._rootScopes,
          o = an(e._fallback, n, r),
          a = [...t, ...i],
          s = new Set()
        s.add(r)
        let l = un(s, a, n, o || n, r)
        return (
          null !== l &&
          (void 0 === o || o === n || ((l = un(s, a, o, l, r)), null !== l)) &&
          Ge(Array.from(s), [''], i, o, () =>
            (function (t, e, n) {
              const r = t._getTarget()
              e in r || (r[e] = {})
              const i = r[e]
              if (ot(i) && at(n)) return n
              return i || {}
            })(e, n, r),
          )
        )
      }
      function un(t, e, n, r, i) {
        for (; n; ) n = ln(t, e, n, r, i)
        return n
      }
      function dn(t, e) {
        for (const n of e) {
          if (!n) continue
          const e = n[t]
          if (void 0 !== e) return e
        }
      }
      function hn(t) {
        let e = t._keys
        return (
          e ||
            (e = t._keys =
              (function (t) {
                const e = new Set()
                for (const n of t)
                  for (const t of Object.keys(n).filter((t) => !t.startsWith('_')))
                    e.add(t)
                return Array.from(e)
              })(t._scopes)),
          e
        )
      }
      function fn(t, e, n, r) {
        const { iScale: i } = t,
          { key: o = 'r' } = this._parsing,
          a = new Array(r)
        let s, l, c, u
        for (s = 0, l = r; s < l; ++s)
          (c = s + n), (u = e[c]), (a[s] = { r: i.parse(wt(u, o), c) })
        return a
      }
      const pn = Number.EPSILON || 1e-14,
        gn = (t, e) => e < t.length && !t[e].skip && t[e],
        mn = (t) => ('x' === t ? 'y' : 'x')
      function bn(t, e, n, r) {
        const i = t.skip ? e : t,
          o = e,
          a = n.skip ? e : n,
          s = Ht(o, i),
          l = Ht(a, o)
        let c = s / (s + l),
          u = l / (s + l)
        ;(c = isNaN(c) ? 0 : c), (u = isNaN(u) ? 0 : u)
        const d = r * c,
          h = r * u
        return {
          previous: { x: o.x - d * (a.x - i.x), y: o.y - d * (a.y - i.y) },
          next: { x: o.x + h * (a.x - i.x), y: o.y + h * (a.y - i.y) },
        }
      }
      function yn(t, e = 'x') {
        const n = mn(e),
          r = t.length,
          i = Array(r).fill(0),
          o = Array(r)
        let a,
          s,
          l,
          c = gn(t, 0)
        for (a = 0; a < r; ++a)
          if (((s = l), (l = c), (c = gn(t, a + 1)), l)) {
            if (c) {
              const t = c[e] - l[e]
              i[a] = 0 !== t ? (c[n] - l[n]) / t : 0
            }
            o[a] = s
              ? c
                ? Nt(i[a - 1]) !== Nt(i[a])
                  ? 0
                  : (i[a - 1] + i[a]) / 2
                : i[a - 1]
              : i[a]
          }
        !(function (t, e, n) {
          const r = t.length
          let i,
            o,
            a,
            s,
            l,
            c = gn(t, 0)
          for (let u = 0; u < r - 1; ++u)
            (l = c),
              (c = gn(t, u + 1)),
              l &&
                c &&
                (jt(e[u], 0, pn)
                  ? (n[u] = n[u + 1] = 0)
                  : ((i = n[u] / e[u]),
                    (o = n[u + 1] / e[u]),
                    (s = Math.pow(i, 2) + Math.pow(o, 2)),
                    s <= 9 ||
                      ((a = 3 / Math.sqrt(s)),
                      (n[u] = i * a * e[u]),
                      (n[u + 1] = o * a * e[u]))))
        })(t, i, o),
          (function (t, e, n = 'x') {
            const r = mn(n),
              i = t.length
            let o,
              a,
              s,
              l = gn(t, 0)
            for (let c = 0; c < i; ++c) {
              if (((a = s), (s = l), (l = gn(t, c + 1)), !s)) continue
              const i = s[n],
                u = s[r]
              a &&
                ((o = (i - a[n]) / 3),
                (s[`cp1${n}`] = i - o),
                (s[`cp1${r}`] = u - o * e[c])),
                l &&
                  ((o = (l[n] - i) / 3),
                  (s[`cp2${n}`] = i + o),
                  (s[`cp2${r}`] = u + o * e[c]))
            }
          })(t, o, e)
      }
      function vn(t, e, n) {
        return Math.max(Math.min(t, n), e)
      }
      function xn(t, e, n, r, i) {
        let o, a, s, l
        if (
          (e.spanGaps && (t = t.filter((t) => !t.skip)),
          'monotone' === e.cubicInterpolationMode)
        )
          yn(t, i)
        else {
          let n = r ? t[t.length - 1] : t[0]
          for (o = 0, a = t.length; o < a; ++o)
            (s = t[o]),
              (l = bn(n, s, t[Math.min(o + 1, a - (r ? 0 : 1)) % a], e.tension)),
              (s.cp1x = l.previous.x),
              (s.cp1y = l.previous.y),
              (s.cp2x = l.next.x),
              (s.cp2y = l.next.y),
              (n = s)
        }
        e.capBezierPoints &&
          (function (t, e) {
            let n,
              r,
              i,
              o,
              a,
              s = Le(t[0], e)
            for (n = 0, r = t.length; n < r; ++n)
              (a = o),
                (o = s),
                (s = n < r - 1 && Le(t[n + 1], e)),
                o &&
                  ((i = t[n]),
                  a &&
                    ((i.cp1x = vn(i.cp1x, e.left, e.right)),
                    (i.cp1y = vn(i.cp1y, e.top, e.bottom))),
                  s &&
                    ((i.cp2x = vn(i.cp2x, e.left, e.right)),
                    (i.cp2y = vn(i.cp2y, e.top, e.bottom))))
          })(t, n)
      }
      function wn() {
        return 'undefined' != typeof window && 'undefined' != typeof document
      }
      function _n(t) {
        let e = t.parentNode
        return e && '[object ShadowRoot]' === e.toString() && (e = e.host), e
      }
      function kn(t, e, n) {
        let r
        return (
          'string' == typeof t
            ? ((r = parseInt(t, 10)),
              -1 !== t.indexOf('%') && (r = (r / 100) * e.parentNode[n]))
            : (r = t),
          r
        )
      }
      const Sn = (t) => t.ownerDocument.defaultView.getComputedStyle(t, null)
      const En = ['top', 'right', 'bottom', 'left']
      function Cn(t, e, n) {
        const r = {}
        n = n ? '-' + n : ''
        for (let i = 0; i < 4; i++) {
          const o = En[i]
          r[o] = parseFloat(t[e + '-' + o + n]) || 0
        }
        return (r.width = r.left + r.right), (r.height = r.top + r.bottom), r
      }
      const Mn = (t, e, n) => (t > 0 || e > 0) && (!n || !n.shadowRoot)
      function Pn(t, e) {
        if ('native' in t) return t
        const { canvas: n, currentDevicePixelRatio: r } = e,
          i = Sn(n),
          o = 'border-box' === i.boxSizing,
          a = Cn(i, 'padding'),
          s = Cn(i, 'border', 'width'),
          {
            x: l,
            y: c,
            box: u,
          } = (function (t, e) {
            const n = t.touches,
              r = n && n.length ? n[0] : t,
              { offsetX: i, offsetY: o } = r
            let a,
              s,
              l = !1
            if (Mn(i, o, t.target)) (a = i), (s = o)
            else {
              const t = e.getBoundingClientRect()
              ;(a = r.clientX - t.left), (s = r.clientY - t.top), (l = !0)
            }
            return { x: a, y: s, box: l }
          })(t, n),
          d = a.left + (u && s.left),
          h = a.top + (u && s.top)
        let { width: f, height: p } = e
        return (
          o && ((f -= a.width + s.width), (p -= a.height + s.height)),
          {
            x: Math.round((((l - d) / f) * n.width) / r),
            y: Math.round((((c - h) / p) * n.height) / r),
          }
        )
      }
      const On = (t) => Math.round(10 * t) / 10
      function Dn(t, e, n, r) {
        const i = Sn(t),
          o = Cn(i, 'margin'),
          a = kn(i.maxWidth, t, 'clientWidth') || Ot,
          s = kn(i.maxHeight, t, 'clientHeight') || Ot,
          l = (function (t, e, n) {
            let r, i
            if (void 0 === e || void 0 === n) {
              const o = _n(t)
              if (o) {
                const t = o.getBoundingClientRect(),
                  a = Sn(o),
                  s = Cn(a, 'border', 'width'),
                  l = Cn(a, 'padding')
                ;(e = t.width - l.width - s.width),
                  (n = t.height - l.height - s.height),
                  (r = kn(a.maxWidth, o, 'clientWidth')),
                  (i = kn(a.maxHeight, o, 'clientHeight'))
              } else (e = t.clientWidth), (n = t.clientHeight)
            }
            return { width: e, height: n, maxWidth: r || Ot, maxHeight: i || Ot }
          })(t, e, n)
        let { width: c, height: u } = l
        if ('content-box' === i.boxSizing) {
          const t = Cn(i, 'border', 'width'),
            e = Cn(i, 'padding')
          ;(c -= e.width + t.width), (u -= e.height + t.height)
        }
        ;(c = Math.max(0, c - o.width)),
          (u = Math.max(0, r ? c / r : u - o.height)),
          (c = On(Math.min(c, a, l.maxWidth))),
          (u = On(Math.min(u, s, l.maxHeight))),
          c && !u && (u = On(c / 2))
        return (
          (void 0 !== e || void 0 !== n) &&
            r &&
            l.height &&
            u > l.height &&
            ((u = l.height), (c = On(Math.floor(u * r)))),
          { width: c, height: u }
        )
      }
      function Tn(t, e, n) {
        const r = e || 1,
          i = Math.floor(t.height * r),
          o = Math.floor(t.width * r)
        ;(t.height = Math.floor(t.height)), (t.width = Math.floor(t.width))
        const a = t.canvas
        return (
          a.style &&
            (n || (!a.style.height && !a.style.width)) &&
            ((a.style.height = `${t.height}px`), (a.style.width = `${t.width}px`)),
          (t.currentDevicePixelRatio !== r || a.height !== i || a.width !== o) &&
            ((t.currentDevicePixelRatio = r),
            (a.height = i),
            (a.width = o),
            t.ctx.setTransform(r, 0, 0, r, 0, 0),
            !0)
        )
      }
      const Rn = (function () {
        let t = !1
        try {
          const e = {
            get passive() {
              return (t = !0), !1
            },
          }
          wn() &&
            (window.addEventListener('test', null, e),
            window.removeEventListener('test', null, e))
        } catch (t) {}
        return t
      })()
      function Ln(t, e) {
        const n = (function (t, e) {
            return Sn(t).getPropertyValue(e)
          })(t, e),
          r = n && n.match(/^(\d+)(\.\d+)?px$/)
        return r ? +r[1] : void 0
      }
      function An(t, e, n, r) {
        return { x: t.x + n * (e.x - t.x), y: t.y + n * (e.y - t.y) }
      }
      function Nn(t, e, n, r) {
        return {
          x: t.x + n * (e.x - t.x),
          y:
            'middle' === r
              ? n < 0.5
                ? t.y
                : e.y
              : 'after' === r
                ? n < 1
                  ? t.y
                  : e.y
                : n > 0
                  ? e.y
                  : t.y,
        }
      }
      function jn(t, e, n, r) {
        const i = { x: t.cp2x, y: t.cp2y },
          o = { x: e.cp1x, y: e.cp1y },
          a = An(t, i, n),
          s = An(i, o, n),
          l = An(o, e, n),
          c = An(a, s, n),
          u = An(s, l, n)
        return An(c, u, n)
      }
      function zn(t, e, n) {
        return t
          ? (function (t, e) {
              return {
                x: (n) => t + t + e - n,
                setWidth(t) {
                  e = t
                },
                textAlign: (t) =>
                  'center' === t ? t : 'right' === t ? 'left' : 'right',
                xPlus: (t, e) => t - e,
                leftForLtr: (t, e) => t - e,
              }
            })(e, n)
          : {
              x: (t) => t,
              setWidth(t) {},
              textAlign: (t) => t,
              xPlus: (t, e) => t + e,
              leftForLtr: (t, e) => t,
            }
      }
      function Fn(t, e) {
        let n, r
        ;('ltr' !== e && 'rtl' !== e) ||
          ((n = t.canvas.style),
          (r = [
            n.getPropertyValue('direction'),
            n.getPropertyPriority('direction'),
          ]),
          n.setProperty('direction', e, 'important'),
          (t.prevTextDirection = r))
      }
      function In(t, e) {
        void 0 !== e &&
          (delete t.prevTextDirection,
          t.canvas.style.setProperty('direction', e[0], e[1]))
      }
      function Bn(t) {
        return 'angle' === t
          ? { between: qt, compare: $t, normalize: Yt }
          : { between: Xt, compare: (t, e) => t - e, normalize: (t) => t }
      }
      function Un({ start: t, end: e, count: n, loop: r, style: i }) {
        return {
          start: t % n,
          end: e % n,
          loop: r && (e - t + 1) % n == 0,
          style: i,
        }
      }
      function Wn(t, e, n) {
        if (!n) return [t]
        const { property: r, start: i, end: o } = n,
          a = e.length,
          { compare: s, between: l, normalize: c } = Bn(r),
          {
            start: u,
            end: d,
            loop: h,
            style: f,
          } = (function (t, e, n) {
            const { property: r, start: i, end: o } = n,
              { between: a, normalize: s } = Bn(r),
              l = e.length
            let c,
              u,
              { start: d, end: h, loop: f } = t
            if (f) {
              for (
                d += l, h += l, c = 0, u = l;
                c < u && a(s(e[d % l][r]), i, o);
                ++c
              )
                d--, h--
              ;(d %= l), (h %= l)
            }
            return h < d && (h += l), { start: d, end: h, loop: f, style: t.style }
          })(t, e, n),
          p = []
        let g,
          m,
          b,
          y = !1,
          v = null
        const x = () => y || (l(i, b, g) && 0 !== s(i, b)),
          w = () => !y || 0 === s(o, g) || l(o, b, g)
        for (let t = u, n = u; t <= d; ++t)
          (m = e[t % a]),
            m.skip ||
              ((g = c(m[r])),
              g !== b &&
                ((y = l(g, i, o)),
                null === v && x() && (v = 0 === s(g, i) ? t : n),
                null !== v &&
                  w() &&
                  (p.push(Un({ start: v, end: t, loop: h, count: a, style: f })),
                  (v = null)),
                (n = t),
                (b = g)))
        return (
          null !== v &&
            p.push(Un({ start: v, end: d, loop: h, count: a, style: f })),
          p
        )
      }
      function Vn(t, e) {
        const n = [],
          r = t.segments
        for (let i = 0; i < r.length; i++) {
          const o = Wn(r[i], t.points, e)
          o.length && n.push(...o)
        }
        return n
      }
      function Hn(t, e, n, r) {
        return r && r.setContext && n
          ? (function (t, e, n, r) {
              const i = t._chart.getContext(),
                o = $n(t.options),
                {
                  _datasetIndex: a,
                  options: { spanGaps: s },
                } = t,
                l = n.length,
                c = []
              let u = o,
                d = e[0].start,
                h = d
              function f(t, e, r, i) {
                const o = s ? -1 : 1
                if (t !== e) {
                  for (t += l; n[t % l].skip; ) t -= o
                  for (; n[e % l].skip; ) e += o
                  t % l != e % l &&
                    (c.push({ start: t % l, end: e % l, loop: r, style: i }),
                    (u = i),
                    (d = e % l))
                }
              }
              for (const t of e) {
                d = s ? d : t.start
                let e,
                  o = n[d % l]
                for (h = d + 1; h <= t.end; h++) {
                  const s = n[h % l]
                  ;(e = $n(
                    r.setContext(
                      Je(i, {
                        type: 'segment',
                        p0: o,
                        p1: s,
                        p0DataIndex: (h - 1) % l,
                        p1DataIndex: h % l,
                        datasetIndex: a,
                      }),
                    ),
                  )),
                    Yn(e, u) && f(d, h - 1, t.loop, u),
                    (o = s),
                    (u = e)
                }
                d < h - 1 && f(d, h - 1, t.loop, u)
              }
              return c
            })(t, e, n, r)
          : e
      }
      function $n(t) {
        return {
          backgroundColor: t.backgroundColor,
          borderCapStyle: t.borderCapStyle,
          borderDash: t.borderDash,
          borderDashOffset: t.borderDashOffset,
          borderJoinStyle: t.borderJoinStyle,
          borderWidth: t.borderWidth,
          borderColor: t.borderColor,
        }
      }
      function Yn(t, e) {
        if (!e) return !1
        const n = [],
          r = function (t, e) {
            return he(e) ? (n.includes(e) || n.push(e), n.indexOf(e)) : e
          }
        return JSON.stringify(t, r) !== JSON.stringify(e, r)
      }
      class qn {
        constructor() {
          ;(this._request = null),
            (this._charts = new Map()),
            (this._running = !1),
            (this._lastDate = void 0)
        }
        _notify(t, e, n, r) {
          const i = e.listeners[r],
            o = e.duration
          i.forEach((r) =>
            r({
              chart: t,
              initial: e.initial,
              numSteps: o,
              currentStep: Math.min(n - e.start, o),
            }),
          )
        }
        _refresh() {
          this._request ||
            ((this._running = !0),
            (this._request = ne.call(window, () => {
              this._update(),
                (this._request = null),
                this._running && this._refresh()
            })))
        }
        _update(t = Date.now()) {
          let e = 0
          this._charts.forEach((n, r) => {
            if (!n.running || !n.items.length) return
            const i = n.items
            let o,
              a = i.length - 1,
              s = !1
            for (; a >= 0; --a)
              (o = i[a]),
                o._active
                  ? (o._total > n.duration && (n.duration = o._total),
                    o.tick(t),
                    (s = !0))
                  : ((i[a] = i[i.length - 1]), i.pop())
            s && (r.draw(), this._notify(r, n, t, 'progress')),
              i.length ||
                ((n.running = !1),
                this._notify(r, n, t, 'complete'),
                (n.initial = !1)),
              (e += i.length)
          }),
            (this._lastDate = t),
            0 === e && (this._running = !1)
        }
        _getAnims(t) {
          const e = this._charts
          let n = e.get(t)
          return (
            n ||
              ((n = {
                running: !1,
                initial: !0,
                items: [],
                listeners: { complete: [], progress: [] },
              }),
              e.set(t, n)),
            n
          )
        }
        listen(t, e, n) {
          this._getAnims(t).listeners[e].push(n)
        }
        add(t, e) {
          e && e.length && this._getAnims(t).items.push(...e)
        }
        has(t) {
          return this._getAnims(t).items.length > 0
        }
        start(t) {
          const e = this._charts.get(t)
          e &&
            ((e.running = !0),
            (e.start = Date.now()),
            (e.duration = e.items.reduce((t, e) => Math.max(t, e._duration), 0)),
            this._refresh())
        }
        running(t) {
          if (!this._running) return !1
          const e = this._charts.get(t)
          return !!(e && e.running && e.items.length)
        }
        stop(t) {
          const e = this._charts.get(t)
          if (!e || !e.items.length) return
          const n = e.items
          let r = n.length - 1
          for (; r >= 0; --r) n[r].cancel()
          ;(e.items = []), this._notify(t, e, Date.now(), 'complete')
        }
        remove(t) {
          return this._charts.delete(t)
        }
      }
      var Qn = new qn()
      const Xn = 'transparent',
        Kn = {
          boolean: (t, e, n) => (n > 0.5 ? e : t),
          color(t, e, n) {
            const r = fe(t || Xn),
              i = r.valid && fe(e || Xn)
            return i && i.valid ? i.mix(r, n).hexString() : e
          },
          number: (t, e, n) => t + (e - t) * n,
        }
      class Zn {
        constructor(t, e, n, r) {
          const i = e[n]
          r = Ze([t.to, r, i, t.from])
          const o = Ze([t.from, i, r])
          ;(this._active = !0),
            (this._fn = t.fn || Kn[t.type || typeof o]),
            (this._easing = de[t.easing] || de.linear),
            (this._start = Math.floor(Date.now() + (t.delay || 0))),
            (this._duration = this._total = Math.floor(t.duration)),
            (this._loop = !!t.loop),
            (this._target = e),
            (this._prop = n),
            (this._from = o),
            (this._to = r),
            (this._promises = void 0)
        }
        active() {
          return this._active
        }
        update(t, e, n) {
          if (this._active) {
            this._notify(!1)
            const r = this._target[this._prop],
              i = n - this._start,
              o = this._duration - i
            ;(this._start = n),
              (this._duration = Math.floor(Math.max(o, t.duration))),
              (this._total += i),
              (this._loop = !!t.loop),
              (this._to = Ze([t.to, e, r, t.from])),
              (this._from = Ze([t.from, r, e]))
          }
        }
        cancel() {
          this._active &&
            (this.tick(Date.now()), (this._active = !1), this._notify(!1))
        }
        tick(t) {
          const e = t - this._start,
            n = this._duration,
            r = this._prop,
            i = this._from,
            o = this._loop,
            a = this._to
          let s
          if (((this._active = i !== a && (o || e < n)), !this._active))
            return (this._target[r] = a), void this._notify(!0)
          e < 0
            ? (this._target[r] = i)
            : ((s = (e / n) % 2),
              (s = o && s > 1 ? 2 - s : s),
              (s = this._easing(Math.min(1, Math.max(0, s)))),
              (this._target[r] = this._fn(i, a, s)))
        }
        wait() {
          const t = this._promises || (this._promises = [])
          return new Promise((e, n) => {
            t.push({ res: e, rej: n })
          })
        }
        _notify(t) {
          const e = t ? 'res' : 'rej',
            n = this._promises || []
          for (let t = 0; t < n.length; t++) n[t][e]()
        }
      }
      class Jn {
        constructor(t, e) {
          ;(this._chart = t), (this._properties = new Map()), this.configure(e)
        }
        configure(t) {
          if (!at(t)) return
          const e = Object.keys(Ce.animation),
            n = this._properties
          Object.getOwnPropertyNames(t).forEach((r) => {
            const i = t[r]
            if (!at(i)) return
            const o = {}
            for (const t of e) o[t] = i[t]
            ;((ot(i.properties) && i.properties) || [r]).forEach((t) => {
              ;(t !== r && n.has(t)) || n.set(t, o)
            })
          })
        }
        _animateOptions(t, e) {
          const n = e.options,
            r = (function (t, e) {
              if (!e) return
              let n = t.options
              if (!n) return void (t.options = e)
              n.$shared &&
                (t.options = n =
                  Object.assign({}, n, { $shared: !1, $animations: {} }))
              return n
            })(t, n)
          if (!r) return []
          const i = this._createAnimations(r, n)
          return (
            n.$shared &&
              (function (t, e) {
                const n = [],
                  r = Object.keys(e)
                for (let e = 0; e < r.length; e++) {
                  const i = t[r[e]]
                  i && i.active() && n.push(i.wait())
                }
                return Promise.all(n)
              })(t.options.$animations, n).then(
                () => {
                  t.options = n
                },
                () => {},
              ),
            i
          )
        }
        _createAnimations(t, e) {
          const n = this._properties,
            r = [],
            i = t.$animations || (t.$animations = {}),
            o = Object.keys(e),
            a = Date.now()
          let s
          for (s = o.length - 1; s >= 0; --s) {
            const l = o[s]
            if ('$' === l.charAt(0)) continue
            if ('options' === l) {
              r.push(...this._animateOptions(t, e))
              continue
            }
            const c = e[l]
            let u = i[l]
            const d = n.get(l)
            if (u) {
              if (d && u.active()) {
                u.update(d, c, a)
                continue
              }
              u.cancel()
            }
            d && d.duration
              ? ((i[l] = u = new Zn(d, t, l, c)), r.push(u))
              : (t[l] = c)
          }
          return r
        }
        update(t, e) {
          if (0 === this._properties.size) return void Object.assign(t, e)
          const n = this._createAnimations(t, e)
          return n.length ? (Qn.add(this._chart, n), !0) : void 0
        }
      }
      function Gn(t, e) {
        const n = (t && t.options) || {},
          r = n.reverse,
          i = void 0 === n.min ? e : 0,
          o = void 0 === n.max ? e : 0
        return { start: r ? o : i, end: r ? i : o }
      }
      function tr(t, e) {
        const n = [],
          r = t._getSortedDatasetMetas(e)
        let i, o
        for (i = 0, o = r.length; i < o; ++i) n.push(r[i].index)
        return n
      }
      function er(t, e, n, r = {}) {
        const i = t.keys,
          o = 'single' === r.mode
        let a, s, l, c
        if (null !== e) {
          for (a = 0, s = i.length; a < s; ++a) {
            if (((l = +i[a]), l === n)) {
              if (r.all) continue
              break
            }
            ;(c = t.values[l]),
              st(c) && (o || 0 === e || Nt(e) === Nt(c)) && (e += c)
          }
          return e
        }
      }
      function nr(t, e) {
        const n = t && t.options.stacked
        return n || (void 0 === n && void 0 !== e.stack)
      }
      function rr(t, e, n) {
        const r = t[e] || (t[e] = {})
        return r[n] || (r[n] = {})
      }
      function ir(t, e, n, r) {
        for (const i of e.getMatchingVisibleMetas(r).reverse()) {
          const e = t[i.index]
          if ((n && e > 0) || (!n && e < 0)) return i.index
        }
        return null
      }
      function or(t, e) {
        const { chart: n, _cachedMeta: r } = t,
          i = n._stacks || (n._stacks = {}),
          { iScale: o, vScale: a, index: s } = r,
          l = o.axis,
          c = a.axis,
          u = (function (t, e, n) {
            return `${t.id}.${e.id}.${n.stack || n.type}`
          })(o, a, r),
          d = e.length
        let h
        for (let t = 0; t < d; ++t) {
          const n = e[t],
            { [l]: o, [c]: d } = n
          ;(h = (n._stacks || (n._stacks = {}))[c] = rr(i, u, o)),
            (h[s] = d),
            (h._top = ir(h, a, !0, r.type)),
            (h._bottom = ir(h, a, !1, r.type))
          ;(h._visualValues || (h._visualValues = {}))[s] = d
        }
      }
      function ar(t, e) {
        const n = t.scales
        return Object.keys(n)
          .filter((t) => n[t].axis === e)
          .shift()
      }
      function sr(t, e) {
        const n = t.controller.index,
          r = t.vScale && t.vScale.axis
        if (r) {
          e = e || t._parsed
          for (const t of e) {
            const e = t._stacks
            if (!e || void 0 === e[r] || void 0 === e[r][n]) return
            delete e[r][n],
              void 0 !== e[r]._visualValues &&
                void 0 !== e[r]._visualValues[n] &&
                delete e[r]._visualValues[n]
          }
        }
      }
      const lr = (t) => 'reset' === t || 'none' === t,
        cr = (t, e) => (e ? t : Object.assign({}, t))
      class ur {
        static defaults = {}
        static datasetElementType = null
        static dataElementType = null
        constructor(t, e) {
          ;(this.chart = t),
            (this._ctx = t.ctx),
            (this.index = e),
            (this._cachedDataOpts = {}),
            (this._cachedMeta = this.getMeta()),
            (this._type = this._cachedMeta.type),
            (this.options = void 0),
            (this._parsing = !1),
            (this._data = void 0),
            (this._objectData = void 0),
            (this._sharedOptions = void 0),
            (this._drawStart = void 0),
            (this._drawCount = void 0),
            (this.enableOptionSharing = !1),
            (this.supportsDecimation = !1),
            (this.$context = void 0),
            (this._syncList = []),
            (this.datasetElementType = new.target.datasetElementType),
            (this.dataElementType = new.target.dataElementType),
            this.initialize()
        }
        initialize() {
          const t = this._cachedMeta
          this.configure(),
            this.linkScales(),
            (t._stacked = nr(t.vScale, t)),
            this.addElements(),
            this.options.fill &&
              !this.chart.isPluginEnabled('filler') &&
              console.warn(
                "Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options",
              )
        }
        updateIndex(t) {
          this.index !== t && sr(this._cachedMeta), (this.index = t)
        }
        linkScales() {
          const t = this.chart,
            e = this._cachedMeta,
            n = this.getDataset(),
            r = (t, e, n, r) => ('x' === t ? e : 'r' === t ? r : n),
            i = (e.xAxisID = ct(n.xAxisID, ar(t, 'x'))),
            o = (e.yAxisID = ct(n.yAxisID, ar(t, 'y'))),
            a = (e.rAxisID = ct(n.rAxisID, ar(t, 'r'))),
            s = e.indexAxis,
            l = (e.iAxisID = r(s, i, o, a)),
            c = (e.vAxisID = r(s, o, i, a))
          ;(e.xScale = this.getScaleForId(i)),
            (e.yScale = this.getScaleForId(o)),
            (e.rScale = this.getScaleForId(a)),
            (e.iScale = this.getScaleForId(l)),
            (e.vScale = this.getScaleForId(c))
        }
        getDataset() {
          return this.chart.data.datasets[this.index]
        }
        getMeta() {
          return this.chart.getDatasetMeta(this.index)
        }
        getScaleForId(t) {
          return this.chart.scales[t]
        }
        _getOtherScale(t) {
          const e = this._cachedMeta
          return t === e.iScale ? e.vScale : e.iScale
        }
        reset() {
          this._update('reset')
        }
        _destroy() {
          const t = this._cachedMeta
          this._data && te(this._data, this), t._stacked && sr(t)
        }
        _dataCheck() {
          const t = this.getDataset(),
            e = t.data || (t.data = []),
            n = this._data
          if (at(e))
            this._data = (function (t) {
              const e = Object.keys(t),
                n = new Array(e.length)
              let r, i, o
              for (r = 0, i = e.length; r < i; ++r)
                (o = e[r]), (n[r] = { x: o, y: t[o] })
              return n
            })(e)
          else if (n !== e) {
            if (n) {
              te(n, this)
              const t = this._cachedMeta
              sr(t), (t._parsed = [])
            }
            e &&
              Object.isExtensible(e) &&
              ((i = this),
              (r = e)._chartjs
                ? r._chartjs.listeners.push(i)
                : (Object.defineProperty(r, '_chartjs', {
                    configurable: !0,
                    enumerable: !1,
                    value: { listeners: [i] },
                  }),
                  Gt.forEach((t) => {
                    const e = '_onData' + _t(t),
                      n = r[t]
                    Object.defineProperty(r, t, {
                      configurable: !0,
                      enumerable: !1,
                      value(...t) {
                        const i = n.apply(this, t)
                        return (
                          r._chartjs.listeners.forEach((n) => {
                            'function' == typeof n[e] && n[e](...t)
                          }),
                          i
                        )
                      },
                    })
                  }))),
              (this._syncList = []),
              (this._data = e)
          }
          var r, i
        }
        addElements() {
          const t = this._cachedMeta
          this._dataCheck(),
            this.datasetElementType && (t.dataset = new this.datasetElementType())
        }
        buildOrUpdateElements(t) {
          const e = this._cachedMeta,
            n = this.getDataset()
          let r = !1
          this._dataCheck()
          const i = e._stacked
          ;(e._stacked = nr(e.vScale, e)),
            e.stack !== n.stack && ((r = !0), sr(e), (e.stack = n.stack)),
            this._resyncElements(t),
            (r || i !== e._stacked) && or(this, e._parsed)
        }
        configure() {
          const t = this.chart.config,
            e = t.datasetScopeKeys(this._type),
            n = t.getOptionScopes(this.getDataset(), e, !0)
          ;(this.options = t.createResolver(n, this.getContext())),
            (this._parsing = this.options.parsing),
            (this._cachedDataOpts = {})
        }
        parse(t, e) {
          const { _cachedMeta: n, _data: r } = this,
            { iScale: i, _stacked: o } = n,
            a = i.axis
          let s,
            l,
            c,
            u = (0 === t && e === r.length) || n._sorted,
            d = t > 0 && n._parsed[t - 1]
          if (!1 === this._parsing) (n._parsed = r), (n._sorted = !0), (c = r)
          else {
            c = ot(r[t])
              ? this.parseArrayData(n, r, t, e)
              : at(r[t])
                ? this.parseObjectData(n, r, t, e)
                : this.parsePrimitiveData(n, r, t, e)
            const i = () => null === l[a] || (d && l[a] < d[a])
            for (s = 0; s < e; ++s)
              (n._parsed[s + t] = l = c[s]), u && (i() && (u = !1), (d = l))
            n._sorted = u
          }
          o && or(this, c)
        }
        parsePrimitiveData(t, e, n, r) {
          const { iScale: i, vScale: o } = t,
            a = i.axis,
            s = o.axis,
            l = i.getLabels(),
            c = i === o,
            u = new Array(r)
          let d, h, f
          for (d = 0, h = r; d < h; ++d)
            (f = d + n),
              (u[d] = { [a]: c || i.parse(l[f], f), [s]: o.parse(e[f], f) })
          return u
        }
        parseArrayData(t, e, n, r) {
          const { xScale: i, yScale: o } = t,
            a = new Array(r)
          let s, l, c, u
          for (s = 0, l = r; s < l; ++s)
            (c = s + n),
              (u = e[c]),
              (a[s] = { x: i.parse(u[0], c), y: o.parse(u[1], c) })
          return a
        }
        parseObjectData(t, e, n, r) {
          const { xScale: i, yScale: o } = t,
            { xAxisKey: a = 'x', yAxisKey: s = 'y' } = this._parsing,
            l = new Array(r)
          let c, u, d, h
          for (c = 0, u = r; c < u; ++c)
            (d = c + n),
              (h = e[d]),
              (l[c] = { x: i.parse(wt(h, a), d), y: o.parse(wt(h, s), d) })
          return l
        }
        getParsed(t) {
          return this._cachedMeta._parsed[t]
        }
        getDataElement(t) {
          return this._cachedMeta.data[t]
        }
        applyStack(t, e, n) {
          const r = this.chart,
            i = this._cachedMeta,
            o = e[t.axis]
          return er(
            { keys: tr(r, !0), values: e._stacks[t.axis]._visualValues },
            o,
            i.index,
            { mode: n },
          )
        }
        updateRangeFromParsed(t, e, n, r) {
          const i = n[e.axis]
          let o = null === i ? NaN : i
          const a = r && n._stacks[e.axis]
          r && a && ((r.values = a), (o = er(r, i, this._cachedMeta.index))),
            (t.min = Math.min(t.min, o)),
            (t.max = Math.max(t.max, o))
        }
        getMinMax(t, e) {
          const n = this._cachedMeta,
            r = n._parsed,
            i = n._sorted && t === n.iScale,
            o = r.length,
            a = this._getOtherScale(t),
            s = ((t, e, n) =>
              t && !e.hidden && e._stacked && { keys: tr(n, !0), values: null })(
              e,
              n,
              this.chart,
            ),
            l = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
            { min: c, max: u } = (function (t) {
              const {
                min: e,
                max: n,
                minDefined: r,
                maxDefined: i,
              } = t.getUserBounds()
              return {
                min: r ? e : Number.NEGATIVE_INFINITY,
                max: i ? n : Number.POSITIVE_INFINITY,
              }
            })(a)
          let d, h
          function f() {
            h = r[d]
            const e = h[a.axis]
            return !st(h[t.axis]) || c > e || u < e
          }
          for (
            d = 0;
            d < o && (f() || (this.updateRangeFromParsed(l, t, h, s), !i));
            ++d
          );
          if (i)
            for (d = o - 1; d >= 0; --d)
              if (!f()) {
                this.updateRangeFromParsed(l, t, h, s)
                break
              }
          return l
        }
        getAllParsedValues(t) {
          const e = this._cachedMeta._parsed,
            n = []
          let r, i, o
          for (r = 0, i = e.length; r < i; ++r)
            (o = e[r][t.axis]), st(o) && n.push(o)
          return n
        }
        getMaxOverflow() {
          return !1
        }
        getLabelAndValue(t) {
          const e = this._cachedMeta,
            n = e.iScale,
            r = e.vScale,
            i = this.getParsed(t)
          return {
            label: n ? '' + n.getLabelForValue(i[n.axis]) : '',
            value: r ? '' + r.getLabelForValue(i[r.axis]) : '',
          }
        }
        _update(t) {
          const e = this._cachedMeta
          this.update(t || 'default'),
            (e._clip = (function (t) {
              let e, n, r, i
              return (
                at(t)
                  ? ((e = t.top), (n = t.right), (r = t.bottom), (i = t.left))
                  : (e = n = r = i = t),
                { top: e, right: n, bottom: r, left: i, disabled: !1 === t }
              )
            })(
              ct(
                this.options.clip,
                (function (t, e, n) {
                  if (!1 === n) return !1
                  const r = Gn(t, n),
                    i = Gn(e, n)
                  return {
                    top: i.end,
                    right: r.end,
                    bottom: i.start,
                    left: r.start,
                  }
                })(e.xScale, e.yScale, this.getMaxOverflow()),
              ),
            ))
        }
        update(t) {}
        draw() {
          const t = this._ctx,
            e = this.chart,
            n = this._cachedMeta,
            r = n.data || [],
            i = e.chartArea,
            o = [],
            a = this._drawStart || 0,
            s = this._drawCount || r.length - a,
            l = this.options.drawActiveElementsOnTop
          let c
          for (n.dataset && n.dataset.draw(t, i, a, s), c = a; c < a + s; ++c) {
            const e = r[c]
            e.hidden || (e.active && l ? o.push(e) : e.draw(t, i))
          }
          for (c = 0; c < o.length; ++c) o[c].draw(t, i)
        }
        getStyle(t, e) {
          const n = e ? 'active' : 'default'
          return void 0 === t && this._cachedMeta.dataset
            ? this.resolveDatasetElementOptions(n)
            : this.resolveDataElementOptions(t || 0, n)
        }
        getContext(t, e, n) {
          const r = this.getDataset()
          let i
          if (t >= 0 && t < this._cachedMeta.data.length) {
            const e = this._cachedMeta.data[t]
            ;(i =
              e.$context ||
              (e.$context = (function (t, e, n) {
                return Je(t, {
                  active: !1,
                  dataIndex: e,
                  parsed: void 0,
                  raw: void 0,
                  element: n,
                  index: e,
                  mode: 'default',
                  type: 'data',
                })
              })(this.getContext(), t, e))),
              (i.parsed = this.getParsed(t)),
              (i.raw = r.data[t]),
              (i.index = i.dataIndex = t)
          } else
            (i =
              this.$context ||
              (this.$context = (function (t, e) {
                return Je(t, {
                  active: !1,
                  dataset: void 0,
                  datasetIndex: e,
                  index: e,
                  mode: 'default',
                  type: 'dataset',
                })
              })(this.chart.getContext(), this.index))),
              (i.dataset = r),
              (i.index = i.datasetIndex = this.index)
          return (i.active = !!e), (i.mode = n), i
        }
        resolveDatasetElementOptions(t) {
          return this._resolveElementOptions(this.datasetElementType.id, t)
        }
        resolveDataElementOptions(t, e) {
          return this._resolveElementOptions(this.dataElementType.id, e, t)
        }
        _resolveElementOptions(t, e = 'default', n) {
          const r = 'active' === e,
            i = this._cachedDataOpts,
            o = t + '-' + e,
            a = i[o],
            s = this.enableOptionSharing && kt(n)
          if (a) return cr(a, s)
          const l = this.chart.config,
            c = l.datasetElementScopeKeys(this._type, t),
            u = r ? [`${t}Hover`, 'hover', t, ''] : [t, ''],
            d = l.getOptionScopes(this.getDataset(), c),
            h = Object.keys(Ce.elements[t]),
            f = l.resolveNamedOptions(d, h, () => this.getContext(n, r, e), u)
          return f.$shared && ((f.$shared = s), (i[o] = Object.freeze(cr(f, s)))), f
        }
        _resolveAnimations(t, e, n) {
          const r = this.chart,
            i = this._cachedDataOpts,
            o = `animation-${e}`,
            a = i[o]
          if (a) return a
          let s
          if (!1 !== r.options.animation) {
            const r = this.chart.config,
              i = r.datasetAnimationScopeKeys(this._type, e),
              o = r.getOptionScopes(this.getDataset(), i)
            s = r.createResolver(o, this.getContext(t, n, e))
          }
          const l = new Jn(r, s && s.animations)
          return s && s._cacheable && (i[o] = Object.freeze(l)), l
        }
        getSharedOptions(t) {
          if (t.$shared)
            return (
              this._sharedOptions || (this._sharedOptions = Object.assign({}, t))
            )
        }
        includeOptions(t, e) {
          return !e || lr(t) || this.chart._animationsDisabled
        }
        _getSharedOptions(t, e) {
          const n = this.resolveDataElementOptions(t, e),
            r = this._sharedOptions,
            i = this.getSharedOptions(n),
            o = this.includeOptions(e, i) || i !== r
          return (
            this.updateSharedOptions(i, e, n),
            { sharedOptions: i, includeOptions: o }
          )
        }
        updateElement(t, e, n, r) {
          lr(r) ? Object.assign(t, n) : this._resolveAnimations(e, r).update(t, n)
        }
        updateSharedOptions(t, e, n) {
          t && !lr(e) && this._resolveAnimations(void 0, e).update(t, n)
        }
        _setStyle(t, e, n, r) {
          t.active = r
          const i = this.getStyle(e, r)
          this._resolveAnimations(e, n, r).update(t, {
            options: (!r && this.getSharedOptions(i)) || i,
          })
        }
        removeHoverStyle(t, e, n) {
          this._setStyle(t, n, 'active', !1)
        }
        setHoverStyle(t, e, n) {
          this._setStyle(t, n, 'active', !0)
        }
        _removeDatasetHoverStyle() {
          const t = this._cachedMeta.dataset
          t && this._setStyle(t, void 0, 'active', !1)
        }
        _setDatasetHoverStyle() {
          const t = this._cachedMeta.dataset
          t && this._setStyle(t, void 0, 'active', !0)
        }
        _resyncElements(t) {
          const e = this._data,
            n = this._cachedMeta.data
          for (const [t, e, n] of this._syncList) this[t](e, n)
          this._syncList = []
          const r = n.length,
            i = e.length,
            o = Math.min(i, r)
          o && this.parse(0, o),
            i > r
              ? this._insertElements(r, i - r, t)
              : i < r && this._removeElements(i, r - i)
        }
        _insertElements(t, e, n = !0) {
          const r = this._cachedMeta,
            i = r.data,
            o = t + e
          let a
          const s = (t) => {
            for (t.length += e, a = t.length - 1; a >= o; a--) t[a] = t[a - e]
          }
          for (s(i), a = t; a < o; ++a) i[a] = new this.dataElementType()
          this._parsing && s(r._parsed),
            this.parse(t, e),
            n && this.updateElements(i, t, e, 'reset')
        }
        updateElements(t, e, n, r) {}
        _removeElements(t, e) {
          const n = this._cachedMeta
          if (this._parsing) {
            const r = n._parsed.splice(t, e)
            n._stacked && sr(n, r)
          }
          n.data.splice(t, e)
        }
        _sync(t) {
          if (this._parsing) this._syncList.push(t)
          else {
            const [e, n, r] = t
            this[e](n, r)
          }
          this.chart._dataChanges.push([this.index, ...t])
        }
        _onDataPush() {
          const t = arguments.length
          this._sync(['_insertElements', this.getDataset().data.length - t, t])
        }
        _onDataPop() {
          this._sync(['_removeElements', this._cachedMeta.data.length - 1, 1])
        }
        _onDataShift() {
          this._sync(['_removeElements', 0, 1])
        }
        _onDataSplice(t, e) {
          e && this._sync(['_removeElements', t, e])
          const n = arguments.length - 2
          n && this._sync(['_insertElements', t, n])
        }
        _onDataUnshift() {
          this._sync(['_insertElements', 0, arguments.length])
        }
      }
      function dr(t) {
        const e = t.iScale,
          n = (function (t, e) {
            if (!t._cache.$bar) {
              const n = t.getMatchingVisibleMetas(e)
              let r = []
              for (let e = 0, i = n.length; e < i; e++)
                r = r.concat(n[e].controller.getAllParsedValues(t))
              t._cache.$bar = ee(r.sort((t, e) => t - e))
            }
            return t._cache.$bar
          })(e, t.type)
        let r,
          i,
          o,
          a,
          s = e._length
        const l = () => {
          32767 !== o &&
            -32768 !== o &&
            (kt(a) && (s = Math.min(s, Math.abs(o - a) || s)), (a = o))
        }
        for (r = 0, i = n.length; r < i; ++r) (o = e.getPixelForValue(n[r])), l()
        for (a = void 0, r = 0, i = e.ticks.length; r < i; ++r)
          (o = e.getPixelForTick(r)), l()
        return s
      }
      function hr(t, e, n, r) {
        return (
          ot(t)
            ? (function (t, e, n, r) {
                const i = n.parse(t[0], r),
                  o = n.parse(t[1], r),
                  a = Math.min(i, o),
                  s = Math.max(i, o)
                let l = a,
                  c = s
                Math.abs(a) > Math.abs(s) && ((l = s), (c = a)),
                  (e[n.axis] = c),
                  (e._custom = {
                    barStart: l,
                    barEnd: c,
                    start: i,
                    end: o,
                    min: a,
                    max: s,
                  })
              })(t, e, n, r)
            : (e[n.axis] = n.parse(t, r)),
          e
        )
      }
      function fr(t, e, n, r) {
        const i = t.iScale,
          o = t.vScale,
          a = i.getLabels(),
          s = i === o,
          l = []
        let c, u, d, h
        for (c = n, u = n + r; c < u; ++c)
          (h = e[c]),
            (d = {}),
            (d[i.axis] = s || i.parse(a[c], c)),
            l.push(hr(h, d, o, c))
        return l
      }
      function pr(t) {
        return t && void 0 !== t.barStart && void 0 !== t.barEnd
      }
      function gr(t, e, n, r) {
        let i = e.borderSkipped
        const o = {}
        if (!i) return void (t.borderSkipped = o)
        if (!0 === i)
          return void (t.borderSkipped = {
            top: !0,
            right: !0,
            bottom: !0,
            left: !0,
          })
        const {
          start: a,
          end: s,
          reverse: l,
          top: c,
          bottom: u,
        } = (function (t) {
          let e, n, r, i, o
          return (
            t.horizontal
              ? ((e = t.base > t.x), (n = 'left'), (r = 'right'))
              : ((e = t.base < t.y), (n = 'bottom'), (r = 'top')),
            e ? ((i = 'end'), (o = 'start')) : ((i = 'start'), (o = 'end')),
            { start: n, end: r, reverse: e, top: i, bottom: o }
          )
        })(t)
        'middle' === i &&
          n &&
          ((t.enableBorderRadius = !0),
          (n._top || 0) === r
            ? (i = c)
            : (n._bottom || 0) === r
              ? (i = u)
              : ((o[mr(u, a, s, l)] = !0), (i = c))),
          (o[mr(i, a, s, l)] = !0),
          (t.borderSkipped = o)
      }
      function mr(t, e, n, r) {
        var i, o, a
        return (
          r
            ? ((a = n),
              (t = br((t = (i = t) === (o = e) ? a : i === a ? o : i), n, e)))
            : (t = br(t, e, n)),
          t
        )
      }
      function br(t, e, n) {
        return 'start' === t ? e : 'end' === t ? n : t
      }
      function yr(t, { inflateAmount: e }, n) {
        t.inflateAmount = 'auto' === e ? (1 === n ? 0.33 : 0) : e
      }
      class vr extends ur {
        static id = 'bar'
        static defaults = {
          datasetElementType: !1,
          dataElementType: 'bar',
          categoryPercentage: 0.8,
          barPercentage: 0.9,
          grouped: !0,
          animations: {
            numbers: {
              type: 'number',
              properties: ['x', 'y', 'base', 'width', 'height'],
            },
          },
        }
        static overrides = {
          scales: {
            _index_: { type: 'category', offset: !0, grid: { offset: !0 } },
            _value_: { type: 'linear', beginAtZero: !0 },
          },
        }
        parsePrimitiveData(t, e, n, r) {
          return fr(t, e, n, r)
        }
        parseArrayData(t, e, n, r) {
          return fr(t, e, n, r)
        }
        parseObjectData(t, e, n, r) {
          const { iScale: i, vScale: o } = t,
            { xAxisKey: a = 'x', yAxisKey: s = 'y' } = this._parsing,
            l = 'x' === i.axis ? a : s,
            c = 'x' === o.axis ? a : s,
            u = []
          let d, h, f, p
          for (d = n, h = n + r; d < h; ++d)
            (p = e[d]),
              (f = {}),
              (f[i.axis] = i.parse(wt(p, l), d)),
              u.push(hr(wt(p, c), f, o, d))
          return u
        }
        updateRangeFromParsed(t, e, n, r) {
          super.updateRangeFromParsed(t, e, n, r)
          const i = n._custom
          i &&
            e === this._cachedMeta.vScale &&
            ((t.min = Math.min(t.min, i.min)), (t.max = Math.max(t.max, i.max)))
        }
        getMaxOverflow() {
          return 0
        }
        getLabelAndValue(t) {
          const e = this._cachedMeta,
            { iScale: n, vScale: r } = e,
            i = this.getParsed(t),
            o = i._custom,
            a = pr(o)
              ? '[' + o.start + ', ' + o.end + ']'
              : '' + r.getLabelForValue(i[r.axis])
          return { label: '' + n.getLabelForValue(i[n.axis]), value: a }
        }
        initialize() {
          ;(this.enableOptionSharing = !0), super.initialize()
          this._cachedMeta.stack = this.getDataset().stack
        }
        update(t) {
          const e = this._cachedMeta
          this.updateElements(e.data, 0, e.data.length, t)
        }
        updateElements(t, e, n, r) {
          const i = 'reset' === r,
            {
              index: o,
              _cachedMeta: { vScale: a },
            } = this,
            s = a.getBasePixel(),
            l = a.isHorizontal(),
            c = this._getRuler(),
            { sharedOptions: u, includeOptions: d } = this._getSharedOptions(e, r)
          for (let h = e; h < e + n; h++) {
            const e = this.getParsed(h),
              n =
                i || it(e[a.axis])
                  ? { base: s, head: s }
                  : this._calculateBarValuePixels(h),
              f = this._calculateBarIndexPixels(h, c),
              p = (e._stacks || {})[a.axis],
              g = {
                horizontal: l,
                base: n.base,
                enableBorderRadius:
                  !p || pr(e._custom) || o === p._top || o === p._bottom,
                x: l ? n.head : f.center,
                y: l ? f.center : n.head,
                height: l ? f.size : Math.abs(n.size),
                width: l ? Math.abs(n.size) : f.size,
              }
            d &&
              (g.options =
                u || this.resolveDataElementOptions(h, t[h].active ? 'active' : r))
            const m = g.options || t[h].options
            gr(g, m, p, o), yr(g, m, c.ratio), this.updateElement(t[h], h, g, r)
          }
        }
        _getStacks(t, e) {
          const { iScale: n } = this._cachedMeta,
            r = n
              .getMatchingVisibleMetas(this._type)
              .filter((t) => t.controller.options.grouped),
            i = n.options.stacked,
            o = [],
            a = (t) => {
              const n = t.controller.getParsed(e),
                r = n && n[t.vScale.axis]
              if (it(r) || isNaN(r)) return !0
            }
          for (const n of r)
            if (
              (void 0 === e || !a(n)) &&
              ((!1 === i ||
                -1 === o.indexOf(n.stack) ||
                (void 0 === i && void 0 === n.stack)) &&
                o.push(n.stack),
              n.index === t)
            )
              break
          return o.length || o.push(void 0), o
        }
        _getStackCount(t) {
          return this._getStacks(void 0, t).length
        }
        _getStackIndex(t, e, n) {
          const r = this._getStacks(t, n),
            i = void 0 !== e ? r.indexOf(e) : -1
          return -1 === i ? r.length - 1 : i
        }
        _getRuler() {
          const t = this.options,
            e = this._cachedMeta,
            n = e.iScale,
            r = []
          let i, o
          for (i = 0, o = e.data.length; i < o; ++i)
            r.push(n.getPixelForValue(this.getParsed(i)[n.axis], i))
          const a = t.barThickness
          return {
            min: a || dr(e),
            pixels: r,
            start: n._startPixel,
            end: n._endPixel,
            stackCount: this._getStackCount(),
            scale: n,
            grouped: t.grouped,
            ratio: a ? 1 : t.categoryPercentage * t.barPercentage,
          }
        }
        _calculateBarValuePixels(t) {
          const {
              _cachedMeta: { vScale: e, _stacked: n, index: r },
              options: { base: i, minBarLength: o },
            } = this,
            a = i || 0,
            s = this.getParsed(t),
            l = s._custom,
            c = pr(l)
          let u,
            d,
            h = s[e.axis],
            f = 0,
            p = n ? this.applyStack(e, s, n) : h
          p !== h && ((f = p - h), (p = h)),
            c &&
              ((h = l.barStart),
              (p = l.barEnd - l.barStart),
              0 !== h && Nt(h) !== Nt(l.barEnd) && (f = 0),
              (f += h))
          const g = it(i) || c ? f : i
          let m = e.getPixelForValue(g)
          if (
            ((u = this.chart.getDataVisibility(t) ? e.getPixelForValue(f + p) : m),
            (d = u - m),
            Math.abs(d) < o)
          ) {
            ;(d =
              (function (t, e, n) {
                return 0 !== t
                  ? Nt(t)
                  : (e.isHorizontal() ? 1 : -1) * (e.min >= n ? 1 : -1)
              })(d, e, a) * o),
              h === a && (m -= d / 2)
            const t = e.getPixelForDecimal(0),
              i = e.getPixelForDecimal(1),
              l = Math.min(t, i),
              f = Math.max(t, i)
            ;(m = Math.max(Math.min(m, f), l)),
              (u = m + d),
              n &&
                !c &&
                (s._stacks[e.axis]._visualValues[r] =
                  e.getValueForPixel(u) - e.getValueForPixel(m))
          }
          if (m === e.getPixelForValue(a)) {
            const t = (Nt(d) * e.getLineWidthForValue(a)) / 2
            ;(m += t), (d -= t)
          }
          return { size: d, base: m, head: u, center: u + d / 2 }
        }
        _calculateBarIndexPixels(t, e) {
          const n = e.scale,
            r = this.options,
            i = r.skipNull,
            o = ct(r.maxBarThickness, 1 / 0)
          let a, s
          if (e.grouped) {
            const n = i ? this._getStackCount(t) : e.stackCount,
              l =
                'flex' === r.barThickness
                  ? (function (t, e, n, r) {
                      const i = e.pixels,
                        o = i[t]
                      let a = t > 0 ? i[t - 1] : null,
                        s = t < i.length - 1 ? i[t + 1] : null
                      const l = n.categoryPercentage
                      null === a &&
                        (a = o - (null === s ? e.end - e.start : s - o)),
                        null === s && (s = o + o - a)
                      const c = o - ((o - Math.min(a, s)) / 2) * l
                      return {
                        chunk: ((Math.abs(s - a) / 2) * l) / r,
                        ratio: n.barPercentage,
                        start: c,
                      }
                    })(t, e, r, n)
                  : (function (t, e, n, r) {
                      const i = n.barThickness
                      let o, a
                      return (
                        it(i)
                          ? ((o = e.min * n.categoryPercentage),
                            (a = n.barPercentage))
                          : ((o = i * r), (a = 1)),
                        { chunk: o / r, ratio: a, start: e.pixels[t] - o / 2 }
                      )
                    })(t, e, r, n),
              c = this._getStackIndex(
                this.index,
                this._cachedMeta.stack,
                i ? t : void 0,
              )
            ;(a = l.start + l.chunk * c + l.chunk / 2),
              (s = Math.min(o, l.chunk * l.ratio))
          } else
            (a = n.getPixelForValue(this.getParsed(t)[n.axis], t)),
              (s = Math.min(o, e.min * e.ratio))
          return { base: a - s / 2, head: a + s / 2, center: a, size: s }
        }
        draw() {
          const t = this._cachedMeta,
            e = t.vScale,
            n = t.data,
            r = n.length
          let i = 0
          for (; i < r; ++i)
            null !== this.getParsed(i)[e.axis] && n[i].draw(this._ctx)
        }
      }
      class xr extends ur {
        static id = 'doughnut'
        static defaults = {
          datasetElementType: !1,
          dataElementType: 'arc',
          animation: { animateRotate: !0, animateScale: !1 },
          animations: {
            numbers: {
              type: 'number',
              properties: [
                'circumference',
                'endAngle',
                'innerRadius',
                'outerRadius',
                'startAngle',
                'x',
                'y',
                'offset',
                'borderWidth',
                'spacing',
              ],
            },
          },
          cutout: '50%',
          rotation: 0,
          circumference: 360,
          radius: '100%',
          spacing: 0,
          indexAxis: 'r',
        }
        static descriptors = {
          _scriptable: (t) => 'spacing' !== t,
          _indexable: (t) =>
            'spacing' !== t &&
            !t.startsWith('borderDash') &&
            !t.startsWith('hoverBorderDash'),
        }
        static overrides = {
          aspectRatio: 1,
          plugins: {
            legend: {
              labels: {
                generateLabels(t) {
                  const e = t.data
                  if (e.labels.length && e.datasets.length) {
                    const {
                      labels: { pointStyle: n, color: r },
                    } = t.legend.options
                    return e.labels.map((e, i) => {
                      const o = t.getDatasetMeta(0).controller.getStyle(i)
                      return {
                        text: e,
                        fillStyle: o.backgroundColor,
                        strokeStyle: o.borderColor,
                        fontColor: r,
                        lineWidth: o.borderWidth,
                        pointStyle: n,
                        hidden: !t.getDataVisibility(i),
                        index: i,
                      }
                    })
                  }
                  return []
                },
              },
              onClick(t, e, n) {
                n.chart.toggleDataVisibility(e.index), n.chart.update()
              },
            },
          },
        }
        constructor(t, e) {
          super(t, e),
            (this.enableOptionSharing = !0),
            (this.innerRadius = void 0),
            (this.outerRadius = void 0),
            (this.offsetX = void 0),
            (this.offsetY = void 0)
        }
        linkScales() {}
        parse(t, e) {
          const n = this.getDataset().data,
            r = this._cachedMeta
          if (!1 === this._parsing) r._parsed = n
          else {
            let i,
              o,
              a = (t) => +n[t]
            if (at(n[t])) {
              const { key: t = 'value' } = this._parsing
              a = (e) => +wt(n[e], t)
            }
            for (i = t, o = t + e; i < o; ++i) r._parsed[i] = a(i)
          }
        }
        _getRotation() {
          return Bt(this.options.rotation - 90)
        }
        _getCircumference() {
          return Bt(this.options.circumference)
        }
        _getRotationExtents() {
          let t = Mt,
            e = -Mt
          for (let n = 0; n < this.chart.data.datasets.length; ++n)
            if (
              this.chart.isDatasetVisible(n) &&
              this.chart.getDatasetMeta(n).type === this._type
            ) {
              const r = this.chart.getDatasetMeta(n).controller,
                i = r._getRotation(),
                o = r._getCircumference()
              ;(t = Math.min(t, i)), (e = Math.max(e, i + o))
            }
          return { rotation: t, circumference: e - t }
        }
        update(t) {
          const e = this.chart,
            { chartArea: n } = e,
            r = this._cachedMeta,
            i = r.data,
            o =
              this.getMaxBorderWidth() +
              this.getMaxOffset(i) +
              this.options.spacing,
            a = Math.max((Math.min(n.width, n.height) - o) / 2, 0),
            s = Math.min(
              ((l = this.options.cutout),
              (c = a),
              'string' == typeof l && l.endsWith('%')
                ? parseFloat(l) / 100
                : +l / c),
              1,
            )
          var l, c
          const u = this._getRingWeight(this.index),
            { circumference: d, rotation: h } = this._getRotationExtents(),
            {
              ratioX: f,
              ratioY: p,
              offsetX: g,
              offsetY: m,
            } = (function (t, e, n) {
              let r = 1,
                i = 1,
                o = 0,
                a = 0
              if (e < Mt) {
                const s = t,
                  l = s + e,
                  c = Math.cos(s),
                  u = Math.sin(s),
                  d = Math.cos(l),
                  h = Math.sin(l),
                  f = (t, e, r) =>
                    qt(t, s, l, !0) ? 1 : Math.max(e, e * n, r, r * n),
                  p = (t, e, r) =>
                    qt(t, s, l, !0) ? -1 : Math.min(e, e * n, r, r * n),
                  g = f(0, c, d),
                  m = f(Tt, u, h),
                  b = p(Ct, c, d),
                  y = p(Ct + Tt, u, h)
                ;(r = (g - b) / 2),
                  (i = (m - y) / 2),
                  (o = -(g + b) / 2),
                  (a = -(m + y) / 2)
              }
              return { ratioX: r, ratioY: i, offsetX: o, offsetY: a }
            })(h, d, s),
            b = (n.width - o) / f,
            y = (n.height - o) / p,
            v = Math.max(Math.min(b, y) / 2, 0),
            x = ut(this.options.radius, v),
            w = (x - Math.max(x * s, 0)) / this._getVisibleDatasetWeightTotal()
          ;(this.offsetX = g * x),
            (this.offsetY = m * x),
            (r.total = this.calculateTotal()),
            (this.outerRadius = x - w * this._getRingWeightOffset(this.index)),
            (this.innerRadius = Math.max(this.outerRadius - w * u, 0)),
            this.updateElements(i, 0, i.length, t)
        }
        _circumference(t, e) {
          const n = this.options,
            r = this._cachedMeta,
            i = this._getCircumference()
          return (e && n.animation.animateRotate) ||
            !this.chart.getDataVisibility(t) ||
            null === r._parsed[t] ||
            r.data[t].hidden
            ? 0
            : this.calculateCircumference((r._parsed[t] * i) / Mt)
        }
        updateElements(t, e, n, r) {
          const i = 'reset' === r,
            o = this.chart,
            a = o.chartArea,
            s = o.options.animation,
            l = (a.left + a.right) / 2,
            c = (a.top + a.bottom) / 2,
            u = i && s.animateScale,
            d = u ? 0 : this.innerRadius,
            h = u ? 0 : this.outerRadius,
            { sharedOptions: f, includeOptions: p } = this._getSharedOptions(e, r)
          let g,
            m = this._getRotation()
          for (g = 0; g < e; ++g) m += this._circumference(g, i)
          for (g = e; g < e + n; ++g) {
            const e = this._circumference(g, i),
              n = t[g],
              o = {
                x: l + this.offsetX,
                y: c + this.offsetY,
                startAngle: m,
                endAngle: m + e,
                circumference: e,
                outerRadius: h,
                innerRadius: d,
              }
            p &&
              (o.options =
                f || this.resolveDataElementOptions(g, n.active ? 'active' : r)),
              (m += e),
              this.updateElement(n, g, o, r)
          }
        }
        calculateTotal() {
          const t = this._cachedMeta,
            e = t.data
          let n,
            r = 0
          for (n = 0; n < e.length; n++) {
            const i = t._parsed[n]
            null === i ||
              isNaN(i) ||
              !this.chart.getDataVisibility(n) ||
              e[n].hidden ||
              (r += Math.abs(i))
          }
          return r
        }
        calculateCircumference(t) {
          const e = this._cachedMeta.total
          return e > 0 && !isNaN(t) ? Mt * (Math.abs(t) / e) : 0
        }
        getLabelAndValue(t) {
          const e = this._cachedMeta,
            n = this.chart,
            r = n.data.labels || [],
            i = ye(e._parsed[t], n.options.locale)
          return { label: r[t] || '', value: i }
        }
        getMaxBorderWidth(t) {
          let e = 0
          const n = this.chart
          let r, i, o, a, s
          if (!t)
            for (r = 0, i = n.data.datasets.length; r < i; ++r)
              if (n.isDatasetVisible(r)) {
                ;(o = n.getDatasetMeta(r)), (t = o.data), (a = o.controller)
                break
              }
          if (!t) return 0
          for (r = 0, i = t.length; r < i; ++r)
            (s = a.resolveDataElementOptions(r)),
              'inner' !== s.borderAlign &&
                (e = Math.max(e, s.borderWidth || 0, s.hoverBorderWidth || 0))
          return e
        }
        getMaxOffset(t) {
          let e = 0
          for (let n = 0, r = t.length; n < r; ++n) {
            const t = this.resolveDataElementOptions(n)
            e = Math.max(e, t.offset || 0, t.hoverOffset || 0)
          }
          return e
        }
        _getRingWeightOffset(t) {
          let e = 0
          for (let n = 0; n < t; ++n)
            this.chart.isDatasetVisible(n) && (e += this._getRingWeight(n))
          return e
        }
        _getRingWeight(t) {
          return Math.max(ct(this.chart.data.datasets[t].weight, 1), 0)
        }
        _getVisibleDatasetWeightTotal() {
          return this._getRingWeightOffset(this.chart.data.datasets.length) || 1
        }
      }
      class wr extends ur {
        static id = 'polarArea'
        static defaults = {
          dataElementType: 'arc',
          animation: { animateRotate: !0, animateScale: !0 },
          animations: {
            numbers: {
              type: 'number',
              properties: [
                'x',
                'y',
                'startAngle',
                'endAngle',
                'innerRadius',
                'outerRadius',
              ],
            },
          },
          indexAxis: 'r',
          startAngle: 0,
        }
        static overrides = {
          aspectRatio: 1,
          plugins: {
            legend: {
              labels: {
                generateLabels(t) {
                  const e = t.data
                  if (e.labels.length && e.datasets.length) {
                    const {
                      labels: { pointStyle: n, color: r },
                    } = t.legend.options
                    return e.labels.map((e, i) => {
                      const o = t.getDatasetMeta(0).controller.getStyle(i)
                      return {
                        text: e,
                        fillStyle: o.backgroundColor,
                        strokeStyle: o.borderColor,
                        fontColor: r,
                        lineWidth: o.borderWidth,
                        pointStyle: n,
                        hidden: !t.getDataVisibility(i),
                        index: i,
                      }
                    })
                  }
                  return []
                },
              },
              onClick(t, e, n) {
                n.chart.toggleDataVisibility(e.index), n.chart.update()
              },
            },
          },
          scales: {
            r: {
              type: 'radialLinear',
              angleLines: { display: !1 },
              beginAtZero: !0,
              grid: { circular: !0 },
              pointLabels: { display: !1 },
              startAngle: 0,
            },
          },
        }
        constructor(t, e) {
          super(t, e), (this.innerRadius = void 0), (this.outerRadius = void 0)
        }
        getLabelAndValue(t) {
          const e = this._cachedMeta,
            n = this.chart,
            r = n.data.labels || [],
            i = ye(e._parsed[t].r, n.options.locale)
          return { label: r[t] || '', value: i }
        }
        parseObjectData(t, e, n, r) {
          return fn.bind(this)(t, e, n, r)
        }
        update(t) {
          const e = this._cachedMeta.data
          this._updateRadius(), this.updateElements(e, 0, e.length, t)
        }
        getMinMax() {
          const t = this._cachedMeta,
            e = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY }
          return (
            t.data.forEach((t, n) => {
              const r = this.getParsed(n).r
              !isNaN(r) &&
                this.chart.getDataVisibility(n) &&
                (r < e.min && (e.min = r), r > e.max && (e.max = r))
            }),
            e
          )
        }
        _updateRadius() {
          const t = this.chart,
            e = t.chartArea,
            n = t.options,
            r = Math.min(e.right - e.left, e.bottom - e.top),
            i = Math.max(r / 2, 0),
            o =
              (i -
                Math.max(
                  n.cutoutPercentage ? (i / 100) * n.cutoutPercentage : 1,
                  0,
                )) /
              t.getVisibleDatasetCount()
          ;(this.outerRadius = i - o * this.index),
            (this.innerRadius = this.outerRadius - o)
        }
        updateElements(t, e, n, r) {
          const i = 'reset' === r,
            o = this.chart,
            a = o.options.animation,
            s = this._cachedMeta.rScale,
            l = s.xCenter,
            c = s.yCenter,
            u = s.getIndexAngle(0) - 0.5 * Ct
          let d,
            h = u
          const f = 360 / this.countVisibleElements()
          for (d = 0; d < e; ++d) h += this._computeAngle(d, r, f)
          for (d = e; d < e + n; d++) {
            const e = t[d]
            let n = h,
              p = h + this._computeAngle(d, r, f),
              g = o.getDataVisibility(d)
                ? s.getDistanceFromCenterForValue(this.getParsed(d).r)
                : 0
            ;(h = p),
              i && (a.animateScale && (g = 0), a.animateRotate && (n = p = u))
            const m = {
              x: l,
              y: c,
              innerRadius: 0,
              outerRadius: g,
              startAngle: n,
              endAngle: p,
              options: this.resolveDataElementOptions(d, e.active ? 'active' : r),
            }
            this.updateElement(e, d, m, r)
          }
        }
        countVisibleElements() {
          const t = this._cachedMeta
          let e = 0
          return (
            t.data.forEach((t, n) => {
              !isNaN(this.getParsed(n).r) && this.chart.getDataVisibility(n) && e++
            }),
            e
          )
        }
        _computeAngle(t, e, n) {
          return this.chart.getDataVisibility(t)
            ? Bt(this.resolveDataElementOptions(t, e).angle || n)
            : 0
        }
      }
      var _r = Object.freeze({
        __proto__: null,
        BarController: vr,
        BubbleController: class extends ur {
          static id = 'bubble'
          static defaults = {
            datasetElementType: !1,
            dataElementType: 'point',
            animations: {
              numbers: {
                type: 'number',
                properties: ['x', 'y', 'borderWidth', 'radius'],
              },
            },
          }
          static overrides = {
            scales: { x: { type: 'linear' }, y: { type: 'linear' } },
          }
          initialize() {
            ;(this.enableOptionSharing = !0), super.initialize()
          }
          parsePrimitiveData(t, e, n, r) {
            const i = super.parsePrimitiveData(t, e, n, r)
            for (let t = 0; t < i.length; t++)
              i[t]._custom = this.resolveDataElementOptions(t + n).radius
            return i
          }
          parseArrayData(t, e, n, r) {
            const i = super.parseArrayData(t, e, n, r)
            for (let t = 0; t < i.length; t++) {
              const r = e[n + t]
              i[t]._custom = ct(r[2], this.resolveDataElementOptions(t + n).radius)
            }
            return i
          }
          parseObjectData(t, e, n, r) {
            const i = super.parseObjectData(t, e, n, r)
            for (let t = 0; t < i.length; t++) {
              const r = e[n + t]
              i[t]._custom = ct(
                r && r.r && +r.r,
                this.resolveDataElementOptions(t + n).radius,
              )
            }
            return i
          }
          getMaxOverflow() {
            const t = this._cachedMeta.data
            let e = 0
            for (let n = t.length - 1; n >= 0; --n)
              e = Math.max(e, t[n].size(this.resolveDataElementOptions(n)) / 2)
            return e > 0 && e
          }
          getLabelAndValue(t) {
            const e = this._cachedMeta,
              n = this.chart.data.labels || [],
              { xScale: r, yScale: i } = e,
              o = this.getParsed(t),
              a = r.getLabelForValue(o.x),
              s = i.getLabelForValue(o.y),
              l = o._custom
            return {
              label: n[t] || '',
              value: '(' + a + ', ' + s + (l ? ', ' + l : '') + ')',
            }
          }
          update(t) {
            const e = this._cachedMeta.data
            this.updateElements(e, 0, e.length, t)
          }
          updateElements(t, e, n, r) {
            const i = 'reset' === r,
              { iScale: o, vScale: a } = this._cachedMeta,
              { sharedOptions: s, includeOptions: l } = this._getSharedOptions(
                e,
                r,
              ),
              c = o.axis,
              u = a.axis
            for (let d = e; d < e + n; d++) {
              const e = t[d],
                n = !i && this.getParsed(d),
                h = {},
                f = (h[c] = i
                  ? o.getPixelForDecimal(0.5)
                  : o.getPixelForValue(n[c])),
                p = (h[u] = i ? a.getBasePixel() : a.getPixelForValue(n[u]))
              ;(h.skip = isNaN(f) || isNaN(p)),
                l &&
                  ((h.options =
                    s ||
                    this.resolveDataElementOptions(d, e.active ? 'active' : r)),
                  i && (h.options.radius = 0)),
                this.updateElement(e, d, h, r)
            }
          }
          resolveDataElementOptions(t, e) {
            const n = this.getParsed(t)
            let r = super.resolveDataElementOptions(t, e)
            r.$shared && (r = Object.assign({}, r, { $shared: !1 }))
            const i = r.radius
            return (
              'active' !== e && (r.radius = 0),
              (r.radius += ct(n && n._custom, i)),
              r
            )
          }
        },
        DoughnutController: xr,
        LineController: class extends ur {
          static id = 'line'
          static defaults = {
            datasetElementType: 'line',
            dataElementType: 'point',
            showLine: !0,
            spanGaps: !1,
          }
          static overrides = {
            scales: { _index_: { type: 'category' }, _value_: { type: 'linear' } },
          }
          initialize() {
            ;(this.enableOptionSharing = !0),
              (this.supportsDecimation = !0),
              super.initialize()
          }
          update(t) {
            const e = this._cachedMeta,
              { dataset: n, data: r = [], _dataset: i } = e,
              o = this.chart._animationsDisabled
            let { start: a, count: s } = ae(e, r, o)
            ;(this._drawStart = a),
              (this._drawCount = s),
              se(e) && ((a = 0), (s = r.length)),
              (n._chart = this.chart),
              (n._datasetIndex = this.index),
              (n._decimated = !!i._decimated),
              (n.points = r)
            const l = this.resolveDatasetElementOptions(t)
            this.options.showLine || (l.borderWidth = 0),
              (l.segment = this.options.segment),
              this.updateElement(n, void 0, { animated: !o, options: l }, t),
              this.updateElements(r, a, s, t)
          }
          updateElements(t, e, n, r) {
            const i = 'reset' === r,
              { iScale: o, vScale: a, _stacked: s, _dataset: l } = this._cachedMeta,
              { sharedOptions: c, includeOptions: u } = this._getSharedOptions(
                e,
                r,
              ),
              d = o.axis,
              h = a.axis,
              { spanGaps: f, segment: p } = this.options,
              g = Ft(f) ? f : Number.POSITIVE_INFINITY,
              m = this.chart._animationsDisabled || i || 'none' === r,
              b = e + n,
              y = t.length
            let v = e > 0 && this.getParsed(e - 1)
            for (let n = 0; n < y; ++n) {
              const f = t[n],
                y = m ? f : {}
              if (n < e || n >= b) {
                y.skip = !0
                continue
              }
              const x = this.getParsed(n),
                w = it(x[h]),
                _ = (y[d] = o.getPixelForValue(x[d], n)),
                k = (y[h] =
                  i || w
                    ? a.getBasePixel()
                    : a.getPixelForValue(s ? this.applyStack(a, x, s) : x[h], n))
              ;(y.skip = isNaN(_) || isNaN(k) || w),
                (y.stop = n > 0 && Math.abs(x[d] - v[d]) > g),
                p && ((y.parsed = x), (y.raw = l.data[n])),
                u &&
                  (y.options =
                    c ||
                    this.resolveDataElementOptions(n, f.active ? 'active' : r)),
                m || this.updateElement(f, n, y, r),
                (v = x)
            }
          }
          getMaxOverflow() {
            const t = this._cachedMeta,
              e = t.dataset,
              n = (e.options && e.options.borderWidth) || 0,
              r = t.data || []
            if (!r.length) return n
            const i = r[0].size(this.resolveDataElementOptions(0)),
              o = r[r.length - 1].size(this.resolveDataElementOptions(r.length - 1))
            return Math.max(n, i, o) / 2
          }
          draw() {
            const t = this._cachedMeta
            t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis),
              super.draw()
          }
        },
        PieController: class extends xr {
          static id = 'pie'
          static defaults = {
            cutout: 0,
            rotation: 0,
            circumference: 360,
            radius: '100%',
          }
        },
        PolarAreaController: wr,
        RadarController: class extends ur {
          static id = 'radar'
          static defaults = {
            datasetElementType: 'line',
            dataElementType: 'point',
            indexAxis: 'r',
            showLine: !0,
            elements: { line: { fill: 'start' } },
          }
          static overrides = {
            aspectRatio: 1,
            scales: { r: { type: 'radialLinear' } },
          }
          getLabelAndValue(t) {
            const e = this._cachedMeta.vScale,
              n = this.getParsed(t)
            return {
              label: e.getLabels()[t],
              value: '' + e.getLabelForValue(n[e.axis]),
            }
          }
          parseObjectData(t, e, n, r) {
            return fn.bind(this)(t, e, n, r)
          }
          update(t) {
            const e = this._cachedMeta,
              n = e.dataset,
              r = e.data || [],
              i = e.iScale.getLabels()
            if (((n.points = r), 'resize' !== t)) {
              const e = this.resolveDatasetElementOptions(t)
              this.options.showLine || (e.borderWidth = 0)
              const o = { _loop: !0, _fullLoop: i.length === r.length, options: e }
              this.updateElement(n, void 0, o, t)
            }
            this.updateElements(r, 0, r.length, t)
          }
          updateElements(t, e, n, r) {
            const i = this._cachedMeta.rScale,
              o = 'reset' === r
            for (let a = e; a < e + n; a++) {
              const e = t[a],
                n = this.resolveDataElementOptions(a, e.active ? 'active' : r),
                s = i.getPointPositionForValue(a, this.getParsed(a).r),
                l = o ? i.xCenter : s.x,
                c = o ? i.yCenter : s.y,
                u = {
                  x: l,
                  y: c,
                  angle: s.angle,
                  skip: isNaN(l) || isNaN(c),
                  options: n,
                }
              this.updateElement(e, a, u, r)
            }
          }
        },
        ScatterController: class extends ur {
          static id = 'scatter'
          static defaults = {
            datasetElementType: !1,
            dataElementType: 'point',
            showLine: !1,
            fill: !1,
          }
          static overrides = {
            interaction: { mode: 'point' },
            scales: { x: { type: 'linear' }, y: { type: 'linear' } },
          }
          getLabelAndValue(t) {
            const e = this._cachedMeta,
              n = this.chart.data.labels || [],
              { xScale: r, yScale: i } = e,
              o = this.getParsed(t),
              a = r.getLabelForValue(o.x),
              s = i.getLabelForValue(o.y)
            return { label: n[t] || '', value: '(' + a + ', ' + s + ')' }
          }
          update(t) {
            const e = this._cachedMeta,
              { data: n = [] } = e,
              r = this.chart._animationsDisabled
            let { start: i, count: o } = ae(e, n, r)
            if (
              ((this._drawStart = i),
              (this._drawCount = o),
              se(e) && ((i = 0), (o = n.length)),
              this.options.showLine)
            ) {
              this.datasetElementType || this.addElements()
              const { dataset: i, _dataset: o } = e
              ;(i._chart = this.chart),
                (i._datasetIndex = this.index),
                (i._decimated = !!o._decimated),
                (i.points = n)
              const a = this.resolveDatasetElementOptions(t)
              ;(a.segment = this.options.segment),
                this.updateElement(i, void 0, { animated: !r, options: a }, t)
            } else
              this.datasetElementType &&
                (delete e.dataset, (this.datasetElementType = !1))
            this.updateElements(n, i, o, t)
          }
          addElements() {
            const { showLine: t } = this.options
            !this.datasetElementType &&
              t &&
              (this.datasetElementType = this.chart.registry.getElement('line')),
              super.addElements()
          }
          updateElements(t, e, n, r) {
            const i = 'reset' === r,
              { iScale: o, vScale: a, _stacked: s, _dataset: l } = this._cachedMeta,
              c = this.resolveDataElementOptions(e, r),
              u = this.getSharedOptions(c),
              d = this.includeOptions(r, u),
              h = o.axis,
              f = a.axis,
              { spanGaps: p, segment: g } = this.options,
              m = Ft(p) ? p : Number.POSITIVE_INFINITY,
              b = this.chart._animationsDisabled || i || 'none' === r
            let y = e > 0 && this.getParsed(e - 1)
            for (let c = e; c < e + n; ++c) {
              const e = t[c],
                n = this.getParsed(c),
                p = b ? e : {},
                v = it(n[f]),
                x = (p[h] = o.getPixelForValue(n[h], c)),
                w = (p[f] =
                  i || v
                    ? a.getBasePixel()
                    : a.getPixelForValue(s ? this.applyStack(a, n, s) : n[f], c))
              ;(p.skip = isNaN(x) || isNaN(w) || v),
                (p.stop = c > 0 && Math.abs(n[h] - y[h]) > m),
                g && ((p.parsed = n), (p.raw = l.data[c])),
                d &&
                  (p.options =
                    u ||
                    this.resolveDataElementOptions(c, e.active ? 'active' : r)),
                b || this.updateElement(e, c, p, r),
                (y = n)
            }
            this.updateSharedOptions(u, r, c)
          }
          getMaxOverflow() {
            const t = this._cachedMeta,
              e = t.data || []
            if (!this.options.showLine) {
              let t = 0
              for (let n = e.length - 1; n >= 0; --n)
                t = Math.max(t, e[n].size(this.resolveDataElementOptions(n)) / 2)
              return t > 0 && t
            }
            const n = t.dataset,
              r = (n.options && n.options.borderWidth) || 0
            if (!e.length) return r
            const i = e[0].size(this.resolveDataElementOptions(0)),
              o = e[e.length - 1].size(this.resolveDataElementOptions(e.length - 1))
            return Math.max(r, i, o) / 2
          }
        },
      })
      function kr() {
        throw new Error(
          'This method is not implemented: Check that a complete date adapter is provided.',
        )
      }
      class Sr {
        static override(t) {
          Object.assign(Sr.prototype, t)
        }
        options
        constructor(t) {
          this.options = t || {}
        }
        init() {}
        formats() {
          return kr()
        }
        parse() {
          return kr()
        }
        format() {
          return kr()
        }
        add() {
          return kr()
        }
        diff() {
          return kr()
        }
        startOf() {
          return kr()
        }
        endOf() {
          return kr()
        }
      }
      var Er = Sr
      function Cr(t, e, n, r) {
        const { controller: i, data: o, _sorted: a } = t,
          s = i._cachedMeta.iScale
        if (s && e === s.axis && 'r' !== e && a && o.length) {
          const t = s._reversePixels ? Jt : Zt
          if (!r) return t(o, e, n)
          if (i._sharedOptions) {
            const r = o[0],
              i = 'function' == typeof r.getRange && r.getRange(e)
            if (i) {
              const r = t(o, e, n - i),
                a = t(o, e, n + i)
              return { lo: r.lo, hi: a.hi }
            }
          }
        }
        return { lo: 0, hi: o.length - 1 }
      }
      function Mr(t, e, n, r, i) {
        const o = t.getSortedVisibleDatasetMetas(),
          a = n[e]
        for (let t = 0, n = o.length; t < n; ++t) {
          const { index: n, data: s } = o[t],
            { lo: l, hi: c } = Cr(o[t], e, a, i)
          for (let t = l; t <= c; ++t) {
            const e = s[t]
            e.skip || r(e, n, t)
          }
        }
      }
      function Pr(t, e, n, r, i) {
        const o = []
        if (!i && !t.isPointInArea(e)) return o
        return (
          Mr(
            t,
            n,
            e,
            function (n, a, s) {
              ;(i || Le(n, t.chartArea, 0)) &&
                n.inRange(e.x, e.y, r) &&
                o.push({ element: n, datasetIndex: a, index: s })
            },
            !0,
          ),
          o
        )
      }
      function Or(t, e, n, r, i, o) {
        let a = []
        const s = (function (t) {
          const e = -1 !== t.indexOf('x'),
            n = -1 !== t.indexOf('y')
          return function (t, r) {
            const i = e ? Math.abs(t.x - r.x) : 0,
              o = n ? Math.abs(t.y - r.y) : 0
            return Math.sqrt(Math.pow(i, 2) + Math.pow(o, 2))
          }
        })(n)
        let l = Number.POSITIVE_INFINITY
        return (
          Mr(t, n, e, function (n, c, u) {
            const d = n.inRange(e.x, e.y, i)
            if (r && !d) return
            const h = n.getCenterPoint(i)
            if (!(!!o || t.isPointInArea(h)) && !d) return
            const f = s(e, h)
            f < l
              ? ((a = [{ element: n, datasetIndex: c, index: u }]), (l = f))
              : f === l && a.push({ element: n, datasetIndex: c, index: u })
          }),
          a
        )
      }
      function Dr(t, e, n, r, i, o) {
        return o || t.isPointInArea(e)
          ? 'r' !== n || r
            ? Or(t, e, n, r, i, o)
            : (function (t, e, n, r) {
                let i = []
                return (
                  Mr(t, n, e, function (t, n, o) {
                    const { startAngle: a, endAngle: s } = t.getProps(
                        ['startAngle', 'endAngle'],
                        r,
                      ),
                      { angle: l } = Vt(t, { x: e.x, y: e.y })
                    qt(l, a, s) && i.push({ element: t, datasetIndex: n, index: o })
                  }),
                  i
                )
              })(t, e, n, i)
          : []
      }
      function Tr(t, e, n, r, i) {
        const o = [],
          a = 'x' === n ? 'inXRange' : 'inYRange'
        let s = !1
        return (
          Mr(t, n, e, (t, r, l) => {
            t[a](e[n], i) &&
              (o.push({ element: t, datasetIndex: r, index: l }),
              (s = s || t.inRange(e.x, e.y, i)))
          }),
          r && !s ? [] : o
        )
      }
      var Rr = {
        evaluateInteractionItems: Mr,
        modes: {
          index(t, e, n, r) {
            const i = Pn(e, t),
              o = n.axis || 'x',
              a = n.includeInvisible || !1,
              s = n.intersect ? Pr(t, i, o, r, a) : Dr(t, i, o, !1, r, a),
              l = []
            return s.length
              ? (t.getSortedVisibleDatasetMetas().forEach((t) => {
                  const e = s[0].index,
                    n = t.data[e]
                  n &&
                    !n.skip &&
                    l.push({ element: n, datasetIndex: t.index, index: e })
                }),
                l)
              : []
          },
          dataset(t, e, n, r) {
            const i = Pn(e, t),
              o = n.axis || 'xy',
              a = n.includeInvisible || !1
            let s = n.intersect ? Pr(t, i, o, r, a) : Dr(t, i, o, !1, r, a)
            if (s.length > 0) {
              const e = s[0].datasetIndex,
                n = t.getDatasetMeta(e).data
              s = []
              for (let t = 0; t < n.length; ++t)
                s.push({ element: n[t], datasetIndex: e, index: t })
            }
            return s
          },
          point: (t, e, n, r) =>
            Pr(t, Pn(e, t), n.axis || 'xy', r, n.includeInvisible || !1),
          nearest(t, e, n, r) {
            const i = Pn(e, t),
              o = n.axis || 'xy',
              a = n.includeInvisible || !1
            return Dr(t, i, o, n.intersect, r, a)
          },
          x: (t, e, n, r) => Tr(t, Pn(e, t), 'x', n.intersect, r),
          y: (t, e, n, r) => Tr(t, Pn(e, t), 'y', n.intersect, r),
        },
      }
      const Lr = ['left', 'top', 'right', 'bottom']
      function Ar(t, e) {
        return t.filter((t) => t.pos === e)
      }
      function Nr(t, e) {
        return t.filter((t) => -1 === Lr.indexOf(t.pos) && t.box.axis === e)
      }
      function jr(t, e) {
        return t.sort((t, n) => {
          const r = e ? n : t,
            i = e ? t : n
          return r.weight === i.weight ? r.index - i.index : r.weight - i.weight
        })
      }
      function zr(t, e) {
        const n = (function (t) {
            const e = {}
            for (const n of t) {
              const { stack: t, pos: r, stackWeight: i } = n
              if (!t || !Lr.includes(r)) continue
              const o = e[t] || (e[t] = { count: 0, placed: 0, weight: 0, size: 0 })
              o.count++, (o.weight += i)
            }
            return e
          })(t),
          { vBoxMaxWidth: r, hBoxMaxHeight: i } = e
        let o, a, s
        for (o = 0, a = t.length; o < a; ++o) {
          s = t[o]
          const { fullSize: a } = s.box,
            l = n[s.stack],
            c = l && s.stackWeight / l.weight
          s.horizontal
            ? ((s.width = c ? c * r : a && e.availableWidth), (s.height = i))
            : ((s.width = r), (s.height = c ? c * i : a && e.availableHeight))
        }
        return n
      }
      function Fr(t, e, n, r) {
        return Math.max(t[n], e[n]) + Math.max(t[r], e[r])
      }
      function Ir(t, e) {
        ;(t.top = Math.max(t.top, e.top)),
          (t.left = Math.max(t.left, e.left)),
          (t.bottom = Math.max(t.bottom, e.bottom)),
          (t.right = Math.max(t.right, e.right))
      }
      function Br(t, e, n, r) {
        const { pos: i, box: o } = n,
          a = t.maxPadding
        if (!at(i)) {
          n.size && (t[i] -= n.size)
          const e = r[n.stack] || { size: 0, count: 1 }
          ;(e.size = Math.max(e.size, n.horizontal ? o.height : o.width)),
            (n.size = e.size / e.count),
            (t[i] += n.size)
        }
        o.getPadding && Ir(a, o.getPadding())
        const s = Math.max(0, e.outerWidth - Fr(a, t, 'left', 'right')),
          l = Math.max(0, e.outerHeight - Fr(a, t, 'top', 'bottom')),
          c = s !== t.w,
          u = l !== t.h
        return (
          (t.w = s),
          (t.h = l),
          n.horizontal ? { same: c, other: u } : { same: u, other: c }
        )
      }
      function Ur(t, e) {
        const n = e.maxPadding
        function r(t) {
          const r = { left: 0, top: 0, right: 0, bottom: 0 }
          return (
            t.forEach((t) => {
              r[t] = Math.max(e[t], n[t])
            }),
            r
          )
        }
        return r(t ? ['left', 'right'] : ['top', 'bottom'])
      }
      function Wr(t, e, n, r) {
        const i = []
        let o, a, s, l, c, u
        for (o = 0, a = t.length, c = 0; o < a; ++o) {
          ;(s = t[o]),
            (l = s.box),
            l.update(s.width || e.w, s.height || e.h, Ur(s.horizontal, e))
          const { same: a, other: d } = Br(e, n, s, r)
          ;(c |= a && i.length), (u = u || d), l.fullSize || i.push(s)
        }
        return (c && Wr(i, e, n, r)) || u
      }
      function Vr(t, e, n, r, i) {
        ;(t.top = n),
          (t.left = e),
          (t.right = e + r),
          (t.bottom = n + i),
          (t.width = r),
          (t.height = i)
      }
      function Hr(t, e, n, r) {
        const i = n.padding
        let { x: o, y: a } = e
        for (const s of t) {
          const t = s.box,
            l = r[s.stack] || { count: 1, placed: 0, weight: 1 },
            c = s.stackWeight / l.weight || 1
          if (s.horizontal) {
            const r = e.w * c,
              o = l.size || t.height
            kt(l.start) && (a = l.start),
              t.fullSize
                ? Vr(t, i.left, a, n.outerWidth - i.right - i.left, o)
                : Vr(t, e.left + l.placed, a, r, o),
              (l.start = a),
              (l.placed += r),
              (a = t.bottom)
          } else {
            const r = e.h * c,
              a = l.size || t.width
            kt(l.start) && (o = l.start),
              t.fullSize
                ? Vr(t, o, i.top, a, n.outerHeight - i.bottom - i.top)
                : Vr(t, o, e.top + l.placed, a, r),
              (l.start = o),
              (l.placed += r),
              (o = t.right)
          }
        }
        ;(e.x = o), (e.y = a)
      }
      var $r = {
        addBox(t, e) {
          t.boxes || (t.boxes = []),
            (e.fullSize = e.fullSize || !1),
            (e.position = e.position || 'top'),
            (e.weight = e.weight || 0),
            (e._layers =
              e._layers ||
              function () {
                return [
                  {
                    z: 0,
                    draw(t) {
                      e.draw(t)
                    },
                  },
                ]
              }),
            t.boxes.push(e)
        },
        removeBox(t, e) {
          const n = t.boxes ? t.boxes.indexOf(e) : -1
          ;-1 !== n && t.boxes.splice(n, 1)
        },
        configure(t, e, n) {
          ;(e.fullSize = n.fullSize),
            (e.position = n.position),
            (e.weight = n.weight)
        },
        update(t, e, n, r) {
          if (!t) return
          const i = Xe(t.options.layout.padding),
            o = Math.max(e - i.width, 0),
            a = Math.max(n - i.height, 0),
            s = (function (t) {
              const e = (function (t) {
                  const e = []
                  let n, r, i, o, a, s
                  for (n = 0, r = (t || []).length; n < r; ++n)
                    (i = t[n]),
                      ({
                        position: o,
                        options: { stack: a, stackWeight: s = 1 },
                      } = i),
                      e.push({
                        index: n,
                        box: i,
                        pos: o,
                        horizontal: i.isHorizontal(),
                        weight: i.weight,
                        stack: a && o + a,
                        stackWeight: s,
                      })
                  return e
                })(t),
                n = jr(
                  e.filter((t) => t.box.fullSize),
                  !0,
                ),
                r = jr(Ar(e, 'left'), !0),
                i = jr(Ar(e, 'right')),
                o = jr(Ar(e, 'top'), !0),
                a = jr(Ar(e, 'bottom')),
                s = Nr(e, 'x'),
                l = Nr(e, 'y')
              return {
                fullSize: n,
                leftAndTop: r.concat(o),
                rightAndBottom: i.concat(l).concat(a).concat(s),
                chartArea: Ar(e, 'chartArea'),
                vertical: r.concat(i).concat(l),
                horizontal: o.concat(a).concat(s),
              }
            })(t.boxes),
            l = s.vertical,
            c = s.horizontal
          ht(t.boxes, (t) => {
            'function' == typeof t.beforeLayout && t.beforeLayout()
          })
          const u =
              l.reduce(
                (t, e) =>
                  e.box.options && !1 === e.box.options.display ? t : t + 1,
                0,
              ) || 1,
            d = Object.freeze({
              outerWidth: e,
              outerHeight: n,
              padding: i,
              availableWidth: o,
              availableHeight: a,
              vBoxMaxWidth: o / 2 / u,
              hBoxMaxHeight: a / 2,
            }),
            h = Object.assign({}, i)
          Ir(h, Xe(r))
          const f = Object.assign(
              { maxPadding: h, w: o, h: a, x: i.left, y: i.top },
              i,
            ),
            p = zr(l.concat(c), d)
          Wr(s.fullSize, f, d, p),
            Wr(l, f, d, p),
            Wr(c, f, d, p) && Wr(l, f, d, p),
            (function (t) {
              const e = t.maxPadding
              function n(n) {
                const r = Math.max(e[n] - t[n], 0)
                return (t[n] += r), r
              }
              ;(t.y += n('top')), (t.x += n('left')), n('right'), n('bottom')
            })(f),
            Hr(s.leftAndTop, f, d, p),
            (f.x += f.w),
            (f.y += f.h),
            Hr(s.rightAndBottom, f, d, p),
            (t.chartArea = {
              left: f.left,
              top: f.top,
              right: f.left + f.w,
              bottom: f.top + f.h,
              height: f.h,
              width: f.w,
            }),
            ht(s.chartArea, (e) => {
              const n = e.box
              Object.assign(n, t.chartArea),
                n.update(f.w, f.h, { left: 0, top: 0, right: 0, bottom: 0 })
            })
        },
      }
      class Yr {
        acquireContext(t, e) {}
        releaseContext(t) {
          return !1
        }
        addEventListener(t, e, n) {}
        removeEventListener(t, e, n) {}
        getDevicePixelRatio() {
          return 1
        }
        getMaximumSize(t, e, n, r) {
          return (
            (e = Math.max(0, e || t.width)),
            (n = n || t.height),
            { width: e, height: Math.max(0, r ? Math.floor(e / r) : n) }
          )
        }
        isAttached(t) {
          return !0
        }
        updateConfig(t) {}
      }
      class qr extends Yr {
        acquireContext(t) {
          return (t && t.getContext && t.getContext('2d')) || null
        }
        updateConfig(t) {
          t.options.animation = !1
        }
      }
      const Qr = '$chartjs',
        Xr = {
          touchstart: 'mousedown',
          touchmove: 'mousemove',
          touchend: 'mouseup',
          pointerenter: 'mouseenter',
          pointerdown: 'mousedown',
          pointermove: 'mousemove',
          pointerup: 'mouseup',
          pointerleave: 'mouseout',
          pointerout: 'mouseout',
        },
        Kr = (t) => null === t || '' === t
      const Zr = !!Rn && { passive: !0 }
      function Jr(t, e, n) {
        t.canvas.removeEventListener(e, n, Zr)
      }
      function Gr(t, e) {
        for (const n of t) if (n === e || n.contains(e)) return !0
      }
      function ti(t, e, n) {
        const r = t.canvas,
          i = new MutationObserver((t) => {
            let e = !1
            for (const n of t)
              (e = e || Gr(n.addedNodes, r)), (e = e && !Gr(n.removedNodes, r))
            e && n()
          })
        return i.observe(document, { childList: !0, subtree: !0 }), i
      }
      function ei(t, e, n) {
        const r = t.canvas,
          i = new MutationObserver((t) => {
            let e = !1
            for (const n of t)
              (e = e || Gr(n.removedNodes, r)), (e = e && !Gr(n.addedNodes, r))
            e && n()
          })
        return i.observe(document, { childList: !0, subtree: !0 }), i
      }
      const ni = new Map()
      let ri = 0
      function ii() {
        const t = window.devicePixelRatio
        t !== ri &&
          ((ri = t),
          ni.forEach((e, n) => {
            n.currentDevicePixelRatio !== t && e()
          }))
      }
      function oi(t, e, n) {
        const r = t.canvas,
          i = r && _n(r)
        if (!i) return
        const o = re((t, e) => {
            const r = i.clientWidth
            n(t, e), r < i.clientWidth && n()
          }, window),
          a = new ResizeObserver((t) => {
            const e = t[0],
              n = e.contentRect.width,
              r = e.contentRect.height
            ;(0 === n && 0 === r) || o(n, r)
          })
        return (
          a.observe(i),
          (function (t, e) {
            ni.size || window.addEventListener('resize', ii), ni.set(t, e)
          })(t, o),
          a
        )
      }
      function ai(t, e, n) {
        n && n.disconnect(),
          'resize' === e &&
            (function (t) {
              ni.delete(t), ni.size || window.removeEventListener('resize', ii)
            })(t)
      }
      function si(t, e, n) {
        const r = t.canvas,
          i = re((e) => {
            null !== t.ctx &&
              n(
                (function (t, e) {
                  const n = Xr[t.type] || t.type,
                    { x: r, y: i } = Pn(t, e)
                  return {
                    type: n,
                    chart: e,
                    native: t,
                    x: void 0 !== r ? r : null,
                    y: void 0 !== i ? i : null,
                  }
                })(e, t),
              )
          }, t)
        return (
          (function (t, e, n) {
            t.addEventListener(e, n, Zr)
          })(r, e, i),
          i
        )
      }
      class li extends Yr {
        acquireContext(t, e) {
          const n = t && t.getContext && t.getContext('2d')
          return n && n.canvas === t
            ? ((function (t, e) {
                const n = t.style,
                  r = t.getAttribute('height'),
                  i = t.getAttribute('width')
                if (
                  ((t[Qr] = {
                    initial: {
                      height: r,
                      width: i,
                      style: {
                        display: n.display,
                        height: n.height,
                        width: n.width,
                      },
                    },
                  }),
                  (n.display = n.display || 'block'),
                  (n.boxSizing = n.boxSizing || 'border-box'),
                  Kr(i))
                ) {
                  const e = Ln(t, 'width')
                  void 0 !== e && (t.width = e)
                }
                if (Kr(r))
                  if ('' === t.style.height) t.height = t.width / (e || 2)
                  else {
                    const e = Ln(t, 'height')
                    void 0 !== e && (t.height = e)
                  }
              })(t, e),
              n)
            : null
        }
        releaseContext(t) {
          const e = t.canvas
          if (!e[Qr]) return !1
          const n = e[Qr].initial
          ;['height', 'width'].forEach((t) => {
            const r = n[t]
            it(r) ? e.removeAttribute(t) : e.setAttribute(t, r)
          })
          const r = n.style || {}
          return (
            Object.keys(r).forEach((t) => {
              e.style[t] = r[t]
            }),
            (e.width = e.width),
            delete e[Qr],
            !0
          )
        }
        addEventListener(t, e, n) {
          this.removeEventListener(t, e)
          const r = t.$proxies || (t.$proxies = {}),
            i = { attach: ti, detach: ei, resize: oi }[e] || si
          r[e] = i(t, e, n)
        }
        removeEventListener(t, e) {
          const n = t.$proxies || (t.$proxies = {}),
            r = n[e]
          if (!r) return
          ;(({ attach: ai, detach: ai, resize: ai })[e] || Jr)(t, e, r),
            (n[e] = void 0)
        }
        getDevicePixelRatio() {
          return window.devicePixelRatio
        }
        getMaximumSize(t, e, n, r) {
          return Dn(t, e, n, r)
        }
        isAttached(t) {
          const e = _n(t)
          return !(!e || !e.isConnected)
        }
      }
      class ci {
        static defaults = {}
        static defaultRoutes = void 0
        x
        y
        active = !1
        options
        $animations
        tooltipPosition(t) {
          const { x: e, y: n } = this.getProps(['x', 'y'], t)
          return { x: e, y: n }
        }
        hasValue() {
          return Ft(this.x) && Ft(this.y)
        }
        getProps(t, e) {
          const n = this.$animations
          if (!e || !n) return this
          const r = {}
          return (
            t.forEach((t) => {
              r[t] = n[t] && n[t].active() ? n[t]._to : this[t]
            }),
            r
          )
        }
      }
      function ui(t, e) {
        const n = t.options.ticks,
          r = (function (t) {
            const e = t.options.offset,
              n = t._tickSize(),
              r = t._length / n + (e ? 0 : 1),
              i = t._maxLength / n
            return Math.floor(Math.min(r, i))
          })(t),
          i = Math.min(n.maxTicksLimit || r, r),
          o = n.major.enabled
            ? (function (t) {
                const e = []
                let n, r
                for (n = 0, r = t.length; n < r; n++) t[n].major && e.push(n)
                return e
              })(e)
            : [],
          a = o.length,
          s = o[0],
          l = o[a - 1],
          c = []
        if (a > i)
          return (
            (function (t, e, n, r) {
              let i,
                o = 0,
                a = n[0]
              for (r = Math.ceil(r), i = 0; i < t.length; i++)
                i === a && (e.push(t[i]), o++, (a = n[o * r]))
            })(e, c, o, a / i),
            c
          )
        const u = (function (t, e, n) {
          const r = (function (t) {
              const e = t.length
              let n, r
              if (e < 2) return !1
              for (r = t[0], n = 1; n < e; ++n) if (t[n] - t[n - 1] !== r) return !1
              return r
            })(t),
            i = e.length / n
          if (!r) return Math.max(i, 1)
          const o = (function (t) {
            const e = [],
              n = Math.sqrt(t)
            let r
            for (r = 1; r < n; r++) t % r == 0 && (e.push(r), e.push(t / r))
            return n === (0 | n) && e.push(n), e.sort((t, e) => t - e).pop(), e
          })(r)
          for (let t = 0, e = o.length - 1; t < e; t++) {
            const e = o[t]
            if (e > i) return e
          }
          return Math.max(i, 1)
        })(o, e, i)
        if (a > 0) {
          let t, n
          const r = a > 1 ? Math.round((l - s) / (a - 1)) : null
          for (di(e, c, u, it(r) ? 0 : s - r, s), t = 0, n = a - 1; t < n; t++)
            di(e, c, u, o[t], o[t + 1])
          return di(e, c, u, l, it(r) ? e.length : l + r), c
        }
        return di(e, c, u), c
      }
      function di(t, e, n, r, i) {
        const o = ct(r, 0),
          a = Math.min(ct(i, t.length), t.length)
        let s,
          l,
          c,
          u = 0
        for (
          n = Math.ceil(n), i && ((s = i - r), (n = s / Math.floor(s / n))), c = o;
          c < 0;

        )
          u++, (c = Math.round(o + u * n))
        for (l = Math.max(o, 0); l < a; l++)
          l === c && (e.push(t[l]), u++, (c = Math.round(o + u * n)))
      }
      const hi = (t, e, n) => ('top' === e || 'left' === e ? t[e] + n : t[e] - n),
        fi = (t, e) => Math.min(e || t, t)
      function pi(t, e) {
        const n = [],
          r = t.length / e,
          i = t.length
        let o = 0
        for (; o < i; o += r) n.push(t[Math.floor(o)])
        return n
      }
      function gi(t, e, n) {
        const r = t.ticks.length,
          i = Math.min(e, r - 1),
          o = t._startPixel,
          a = t._endPixel,
          s = 1e-6
        let l,
          c = t.getPixelForTick(i)
        if (
          !(
            n &&
            ((l =
              1 === r
                ? Math.max(c - o, a - c)
                : 0 === e
                  ? (t.getPixelForTick(1) - c) / 2
                  : (c - t.getPixelForTick(i - 1)) / 2),
            (c += i < e ? l : -l),
            c < o - s || c > a + s)
          )
        )
          return c
      }
      function mi(t) {
        return t.drawTicks ? t.tickLength : 0
      }
      function bi(t, e) {
        if (!t.display) return 0
        const n = Ke(t.font, e),
          r = Xe(t.padding)
        return (ot(t.text) ? t.text.length : 1) * n.lineHeight + r.height
      }
      function yi(t, e, n) {
        let r = ie(t)
        return (
          ((n && 'right' !== e) || (!n && 'right' === e)) &&
            (r = ((t) => ('left' === t ? 'right' : 'right' === t ? 'left' : t))(r)),
          r
        )
      }
      class vi extends ci {
        constructor(t) {
          super(),
            (this.id = t.id),
            (this.type = t.type),
            (this.options = void 0),
            (this.ctx = t.ctx),
            (this.chart = t.chart),
            (this.top = void 0),
            (this.bottom = void 0),
            (this.left = void 0),
            (this.right = void 0),
            (this.width = void 0),
            (this.height = void 0),
            (this._margins = { left: 0, right: 0, top: 0, bottom: 0 }),
            (this.maxWidth = void 0),
            (this.maxHeight = void 0),
            (this.paddingTop = void 0),
            (this.paddingBottom = void 0),
            (this.paddingLeft = void 0),
            (this.paddingRight = void 0),
            (this.axis = void 0),
            (this.labelRotation = void 0),
            (this.min = void 0),
            (this.max = void 0),
            (this._range = void 0),
            (this.ticks = []),
            (this._gridLineItems = null),
            (this._labelItems = null),
            (this._labelSizes = null),
            (this._length = 0),
            (this._maxLength = 0),
            (this._longestTextCache = {}),
            (this._startPixel = void 0),
            (this._endPixel = void 0),
            (this._reversePixels = !1),
            (this._userMax = void 0),
            (this._userMin = void 0),
            (this._suggestedMax = void 0),
            (this._suggestedMin = void 0),
            (this._ticksLength = 0),
            (this._borderValue = 0),
            (this._cache = {}),
            (this._dataLimitsCached = !1),
            (this.$context = void 0)
        }
        init(t) {
          ;(this.options = t.setContext(this.getContext())),
            (this.axis = t.axis),
            (this._userMin = this.parse(t.min)),
            (this._userMax = this.parse(t.max)),
            (this._suggestedMin = this.parse(t.suggestedMin)),
            (this._suggestedMax = this.parse(t.suggestedMax))
        }
        parse(t, e) {
          return t
        }
        getUserBounds() {
          let {
            _userMin: t,
            _userMax: e,
            _suggestedMin: n,
            _suggestedMax: r,
          } = this
          return (
            (t = lt(t, Number.POSITIVE_INFINITY)),
            (e = lt(e, Number.NEGATIVE_INFINITY)),
            (n = lt(n, Number.POSITIVE_INFINITY)),
            (r = lt(r, Number.NEGATIVE_INFINITY)),
            { min: lt(t, n), max: lt(e, r), minDefined: st(t), maxDefined: st(e) }
          )
        }
        getMinMax(t) {
          let e,
            { min: n, max: r, minDefined: i, maxDefined: o } = this.getUserBounds()
          if (i && o) return { min: n, max: r }
          const a = this.getMatchingVisibleMetas()
          for (let s = 0, l = a.length; s < l; ++s)
            (e = a[s].controller.getMinMax(this, t)),
              i || (n = Math.min(n, e.min)),
              o || (r = Math.max(r, e.max))
          return (
            (n = o && n > r ? r : n),
            (r = i && n > r ? n : r),
            { min: lt(n, lt(r, n)), max: lt(r, lt(n, r)) }
          )
        }
        getPadding() {
          return {
            left: this.paddingLeft || 0,
            top: this.paddingTop || 0,
            right: this.paddingRight || 0,
            bottom: this.paddingBottom || 0,
          }
        }
        getTicks() {
          return this.ticks
        }
        getLabels() {
          const t = this.chart.data
          return (
            this.options.labels ||
            (this.isHorizontal() ? t.xLabels : t.yLabels) ||
            t.labels ||
            []
          )
        }
        getLabelItems(t = this.chart.chartArea) {
          return this._labelItems || (this._labelItems = this._computeLabelItems(t))
        }
        beforeLayout() {
          ;(this._cache = {}), (this._dataLimitsCached = !1)
        }
        beforeUpdate() {
          dt(this.options.beforeUpdate, [this])
        }
        update(t, e, n) {
          const { beginAtZero: r, grace: i, ticks: o } = this.options,
            a = o.sampleSize
          this.beforeUpdate(),
            (this.maxWidth = t),
            (this.maxHeight = e),
            (this._margins = n =
              Object.assign({ left: 0, right: 0, top: 0, bottom: 0 }, n)),
            (this.ticks = null),
            (this._labelSizes = null),
            (this._gridLineItems = null),
            (this._labelItems = null),
            this.beforeSetDimensions(),
            this.setDimensions(),
            this.afterSetDimensions(),
            (this._maxLength = this.isHorizontal()
              ? this.width + n.left + n.right
              : this.height + n.top + n.bottom),
            this._dataLimitsCached ||
              (this.beforeDataLimits(),
              this.determineDataLimits(),
              this.afterDataLimits(),
              (this._range = (function (t, e, n) {
                const { min: r, max: i } = t,
                  o = ut(e, (i - r) / 2),
                  a = (t, e) => (n && 0 === t ? 0 : t + e)
                return { min: a(r, -Math.abs(o)), max: a(i, o) }
              })(this, i, r)),
              (this._dataLimitsCached = !0)),
            this.beforeBuildTicks(),
            (this.ticks = this.buildTicks() || []),
            this.afterBuildTicks()
          const s = a < this.ticks.length
          this._convertTicksToLabels(s ? pi(this.ticks, a) : this.ticks),
            this.configure(),
            this.beforeCalculateLabelRotation(),
            this.calculateLabelRotation(),
            this.afterCalculateLabelRotation(),
            o.display &&
              (o.autoSkip || 'auto' === o.source) &&
              ((this.ticks = ui(this, this.ticks)),
              (this._labelSizes = null),
              this.afterAutoSkip()),
            s && this._convertTicksToLabels(this.ticks),
            this.beforeFit(),
            this.fit(),
            this.afterFit(),
            this.afterUpdate()
        }
        configure() {
          let t,
            e,
            n = this.options.reverse
          this.isHorizontal()
            ? ((t = this.left), (e = this.right))
            : ((t = this.top), (e = this.bottom), (n = !n)),
            (this._startPixel = t),
            (this._endPixel = e),
            (this._reversePixels = n),
            (this._length = e - t),
            (this._alignToPixels = this.options.alignToPixels)
        }
        afterUpdate() {
          dt(this.options.afterUpdate, [this])
        }
        beforeSetDimensions() {
          dt(this.options.beforeSetDimensions, [this])
        }
        setDimensions() {
          this.isHorizontal()
            ? ((this.width = this.maxWidth),
              (this.left = 0),
              (this.right = this.width))
            : ((this.height = this.maxHeight),
              (this.top = 0),
              (this.bottom = this.height)),
            (this.paddingLeft = 0),
            (this.paddingTop = 0),
            (this.paddingRight = 0),
            (this.paddingBottom = 0)
        }
        afterSetDimensions() {
          dt(this.options.afterSetDimensions, [this])
        }
        _callHooks(t) {
          this.chart.notifyPlugins(t, this.getContext()),
            dt(this.options[t], [this])
        }
        beforeDataLimits() {
          this._callHooks('beforeDataLimits')
        }
        determineDataLimits() {}
        afterDataLimits() {
          this._callHooks('afterDataLimits')
        }
        beforeBuildTicks() {
          this._callHooks('beforeBuildTicks')
        }
        buildTicks() {
          return []
        }
        afterBuildTicks() {
          this._callHooks('afterBuildTicks')
        }
        beforeTickToLabelConversion() {
          dt(this.options.beforeTickToLabelConversion, [this])
        }
        generateTickLabels(t) {
          const e = this.options.ticks
          let n, r, i
          for (n = 0, r = t.length; n < r; n++)
            (i = t[n]), (i.label = dt(e.callback, [i.value, n, t], this))
        }
        afterTickToLabelConversion() {
          dt(this.options.afterTickToLabelConversion, [this])
        }
        beforeCalculateLabelRotation() {
          dt(this.options.beforeCalculateLabelRotation, [this])
        }
        calculateLabelRotation() {
          const t = this.options,
            e = t.ticks,
            n = fi(this.ticks.length, t.ticks.maxTicksLimit),
            r = e.minRotation || 0,
            i = e.maxRotation
          let o,
            a,
            s,
            l = r
          if (
            !this._isVisible() ||
            !e.display ||
            r >= i ||
            n <= 1 ||
            !this.isHorizontal()
          )
            return void (this.labelRotation = r)
          const c = this._getLabelSizes(),
            u = c.widest.width,
            d = c.highest.height,
            h = Qt(this.chart.width - u, 0, this.maxWidth)
          ;(o = t.offset ? this.maxWidth / n : h / (n - 1)),
            u + 6 > o &&
              ((o = h / (n - (t.offset ? 0.5 : 1))),
              (a =
                this.maxHeight -
                mi(t.grid) -
                e.padding -
                bi(t.title, this.chart.options.font)),
              (s = Math.sqrt(u * u + d * d)),
              (l = Ut(
                Math.min(
                  Math.asin(Qt((c.highest.height + 6) / o, -1, 1)),
                  Math.asin(Qt(a / s, -1, 1)) - Math.asin(Qt(d / s, -1, 1)),
                ),
              )),
              (l = Math.max(r, Math.min(i, l)))),
            (this.labelRotation = l)
        }
        afterCalculateLabelRotation() {
          dt(this.options.afterCalculateLabelRotation, [this])
        }
        afterAutoSkip() {}
        beforeFit() {
          dt(this.options.beforeFit, [this])
        }
        fit() {
          const t = { width: 0, height: 0 },
            {
              chart: e,
              options: { ticks: n, title: r, grid: i },
            } = this,
            o = this._isVisible(),
            a = this.isHorizontal()
          if (o) {
            const o = bi(r, e.options.font)
            if (
              (a
                ? ((t.width = this.maxWidth), (t.height = mi(i) + o))
                : ((t.height = this.maxHeight), (t.width = mi(i) + o)),
              n.display && this.ticks.length)
            ) {
              const {
                  first: e,
                  last: r,
                  widest: i,
                  highest: o,
                } = this._getLabelSizes(),
                s = 2 * n.padding,
                l = Bt(this.labelRotation),
                c = Math.cos(l),
                u = Math.sin(l)
              if (a) {
                const e = n.mirror ? 0 : u * i.width + c * o.height
                t.height = Math.min(this.maxHeight, t.height + e + s)
              } else {
                const e = n.mirror ? 0 : c * i.width + u * o.height
                t.width = Math.min(this.maxWidth, t.width + e + s)
              }
              this._calculatePadding(e, r, u, c)
            }
          }
          this._handleMargins(),
            a
              ? ((this.width = this._length =
                  e.width - this._margins.left - this._margins.right),
                (this.height = t.height))
              : ((this.width = t.width),
                (this.height = this._length =
                  e.height - this._margins.top - this._margins.bottom))
        }
        _calculatePadding(t, e, n, r) {
          const {
              ticks: { align: i, padding: o },
              position: a,
            } = this.options,
            s = 0 !== this.labelRotation,
            l = 'top' !== a && 'x' === this.axis
          if (this.isHorizontal()) {
            const a = this.getPixelForTick(0) - this.left,
              c = this.right - this.getPixelForTick(this.ticks.length - 1)
            let u = 0,
              d = 0
            s
              ? l
                ? ((u = r * t.width), (d = n * e.height))
                : ((u = n * t.height), (d = r * e.width))
              : 'start' === i
                ? (d = e.width)
                : 'end' === i
                  ? (u = t.width)
                  : 'inner' !== i && ((u = t.width / 2), (d = e.width / 2)),
              (this.paddingLeft = Math.max(
                ((u - a + o) * this.width) / (this.width - a),
                0,
              )),
              (this.paddingRight = Math.max(
                ((d - c + o) * this.width) / (this.width - c),
                0,
              ))
          } else {
            let n = e.height / 2,
              r = t.height / 2
            'start' === i
              ? ((n = 0), (r = t.height))
              : 'end' === i && ((n = e.height), (r = 0)),
              (this.paddingTop = n + o),
              (this.paddingBottom = r + o)
          }
        }
        _handleMargins() {
          this._margins &&
            ((this._margins.left = Math.max(this.paddingLeft, this._margins.left)),
            (this._margins.top = Math.max(this.paddingTop, this._margins.top)),
            (this._margins.right = Math.max(
              this.paddingRight,
              this._margins.right,
            )),
            (this._margins.bottom = Math.max(
              this.paddingBottom,
              this._margins.bottom,
            )))
        }
        afterFit() {
          dt(this.options.afterFit, [this])
        }
        isHorizontal() {
          const { axis: t, position: e } = this.options
          return 'top' === e || 'bottom' === e || 'x' === t
        }
        isFullSize() {
          return this.options.fullSize
        }
        _convertTicksToLabels(t) {
          let e, n
          for (
            this.beforeTickToLabelConversion(),
              this.generateTickLabels(t),
              e = 0,
              n = t.length;
            e < n;
            e++
          )
            it(t[e].label) && (t.splice(e, 1), n--, e--)
          this.afterTickToLabelConversion()
        }
        _getLabelSizes() {
          let t = this._labelSizes
          if (!t) {
            const e = this.options.ticks.sampleSize
            let n = this.ticks
            e < n.length && (n = pi(n, e)),
              (this._labelSizes = t =
                this._computeLabelSizes(
                  n,
                  n.length,
                  this.options.ticks.maxTicksLimit,
                ))
          }
          return t
        }
        _computeLabelSizes(t, e, n) {
          const { ctx: r, _longestTextCache: i } = this,
            o = [],
            a = [],
            s = Math.floor(e / fi(e, n))
          let l,
            c,
            u,
            d,
            h,
            f,
            p,
            g,
            m,
            b,
            y,
            v = 0,
            x = 0
          for (l = 0; l < e; l += s) {
            if (
              ((d = t[l].label),
              (h = this._resolveTickFontOptions(l)),
              (r.font = f = h.string),
              (p = i[f] = i[f] || { data: {}, gc: [] }),
              (g = h.lineHeight),
              (m = b = 0),
              it(d) || ot(d))
            ) {
              if (ot(d))
                for (c = 0, u = d.length; c < u; ++c)
                  (y = d[c]),
                    it(y) || ot(y) || ((m = Me(r, p.data, p.gc, m, y)), (b += g))
            } else (m = Me(r, p.data, p.gc, m, d)), (b = g)
            o.push(m), a.push(b), (v = Math.max(m, v)), (x = Math.max(b, x))
          }
          !(function (t, e) {
            ht(t, (t) => {
              const n = t.gc,
                r = n.length / 2
              let i
              if (r > e) {
                for (i = 0; i < r; ++i) delete t.data[n[i]]
                n.splice(0, r)
              }
            })
          })(i, e)
          const w = o.indexOf(v),
            _ = a.indexOf(x),
            k = (t) => ({ width: o[t] || 0, height: a[t] || 0 })
          return {
            first: k(0),
            last: k(e - 1),
            widest: k(w),
            highest: k(_),
            widths: o,
            heights: a,
          }
        }
        getLabelForValue(t) {
          return t
        }
        getPixelForValue(t, e) {
          return NaN
        }
        getValueForPixel(t) {}
        getPixelForTick(t) {
          const e = this.ticks
          return t < 0 || t > e.length - 1
            ? null
            : this.getPixelForValue(e[t].value)
        }
        getPixelForDecimal(t) {
          this._reversePixels && (t = 1 - t)
          const e = this._startPixel + t * this._length
          return Qt(this._alignToPixels ? Oe(this.chart, e, 0) : e, -32768, 32767)
        }
        getDecimalForPixel(t) {
          const e = (t - this._startPixel) / this._length
          return this._reversePixels ? 1 - e : e
        }
        getBasePixel() {
          return this.getPixelForValue(this.getBaseValue())
        }
        getBaseValue() {
          const { min: t, max: e } = this
          return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0
        }
        getContext(t) {
          const e = this.ticks || []
          if (t >= 0 && t < e.length) {
            const n = e[t]
            return (
              n.$context ||
              (n.$context = (function (t, e, n) {
                return Je(t, { tick: n, index: e, type: 'tick' })
              })(this.getContext(), t, n))
            )
          }
          return (
            this.$context ||
            (this.$context = Je(this.chart.getContext(), {
              scale: this,
              type: 'scale',
            }))
          )
        }
        _tickSize() {
          const t = this.options.ticks,
            e = Bt(this.labelRotation),
            n = Math.abs(Math.cos(e)),
            r = Math.abs(Math.sin(e)),
            i = this._getLabelSizes(),
            o = t.autoSkipPadding || 0,
            a = i ? i.widest.width + o : 0,
            s = i ? i.highest.height + o : 0
          return this.isHorizontal()
            ? s * n > a * r
              ? a / n
              : s / r
            : s * r < a * n
              ? s / n
              : a / r
        }
        _isVisible() {
          const t = this.options.display
          return 'auto' !== t ? !!t : this.getMatchingVisibleMetas().length > 0
        }
        _computeGridLineItems(t) {
          const e = this.axis,
            n = this.chart,
            r = this.options,
            { grid: i, position: o, border: a } = r,
            s = i.offset,
            l = this.isHorizontal(),
            c = this.ticks.length + (s ? 1 : 0),
            u = mi(i),
            d = [],
            h = a.setContext(this.getContext()),
            f = h.display ? h.width : 0,
            p = f / 2,
            g = function (t) {
              return Oe(n, t, f)
            }
          let m, b, y, v, x, w, _, k, S, E, C, M
          if ('top' === o)
            (m = g(this.bottom)),
              (w = this.bottom - u),
              (k = m - p),
              (E = g(t.top) + p),
              (M = t.bottom)
          else if ('bottom' === o)
            (m = g(this.top)),
              (E = t.top),
              (M = g(t.bottom) - p),
              (w = m + p),
              (k = this.top + u)
          else if ('left' === o)
            (m = g(this.right)),
              (x = this.right - u),
              (_ = m - p),
              (S = g(t.left) + p),
              (C = t.right)
          else if ('right' === o)
            (m = g(this.left)),
              (S = t.left),
              (C = g(t.right) - p),
              (x = m + p),
              (_ = this.left + u)
          else if ('x' === e) {
            if ('center' === o) m = g((t.top + t.bottom) / 2 + 0.5)
            else if (at(o)) {
              const t = Object.keys(o)[0],
                e = o[t]
              m = g(this.chart.scales[t].getPixelForValue(e))
            }
            ;(E = t.top), (M = t.bottom), (w = m + p), (k = w + u)
          } else if ('y' === e) {
            if ('center' === o) m = g((t.left + t.right) / 2)
            else if (at(o)) {
              const t = Object.keys(o)[0],
                e = o[t]
              m = g(this.chart.scales[t].getPixelForValue(e))
            }
            ;(x = m - p), (_ = x - u), (S = t.left), (C = t.right)
          }
          const P = ct(r.ticks.maxTicksLimit, c),
            O = Math.max(1, Math.ceil(c / P))
          for (b = 0; b < c; b += O) {
            const t = this.getContext(b),
              e = i.setContext(t),
              r = a.setContext(t),
              o = e.lineWidth,
              c = e.color,
              u = r.dash || [],
              h = r.dashOffset,
              f = e.tickWidth,
              p = e.tickColor,
              g = e.tickBorderDash || [],
              m = e.tickBorderDashOffset
            ;(y = gi(this, b, s)),
              void 0 !== y &&
                ((v = Oe(n, y, o)),
                l ? (x = _ = S = C = v) : (w = k = E = M = v),
                d.push({
                  tx1: x,
                  ty1: w,
                  tx2: _,
                  ty2: k,
                  x1: S,
                  y1: E,
                  x2: C,
                  y2: M,
                  width: o,
                  color: c,
                  borderDash: u,
                  borderDashOffset: h,
                  tickWidth: f,
                  tickColor: p,
                  tickBorderDash: g,
                  tickBorderDashOffset: m,
                }))
          }
          return (this._ticksLength = c), (this._borderValue = m), d
        }
        _computeLabelItems(t) {
          const e = this.axis,
            n = this.options,
            { position: r, ticks: i } = n,
            o = this.isHorizontal(),
            a = this.ticks,
            { align: s, crossAlign: l, padding: c, mirror: u } = i,
            d = mi(n.grid),
            h = d + c,
            f = u ? -c : h,
            p = -Bt(this.labelRotation),
            g = []
          let m,
            b,
            y,
            v,
            x,
            w,
            _,
            k,
            S,
            E,
            C,
            M,
            P = 'middle'
          if ('top' === r)
            (w = this.bottom - f), (_ = this._getXAxisLabelAlignment())
          else if ('bottom' === r)
            (w = this.top + f), (_ = this._getXAxisLabelAlignment())
          else if ('left' === r) {
            const t = this._getYAxisLabelAlignment(d)
            ;(_ = t.textAlign), (x = t.x)
          } else if ('right' === r) {
            const t = this._getYAxisLabelAlignment(d)
            ;(_ = t.textAlign), (x = t.x)
          } else if ('x' === e) {
            if ('center' === r) w = (t.top + t.bottom) / 2 + h
            else if (at(r)) {
              const t = Object.keys(r)[0],
                e = r[t]
              w = this.chart.scales[t].getPixelForValue(e) + h
            }
            _ = this._getXAxisLabelAlignment()
          } else if ('y' === e) {
            if ('center' === r) x = (t.left + t.right) / 2 - h
            else if (at(r)) {
              const t = Object.keys(r)[0],
                e = r[t]
              x = this.chart.scales[t].getPixelForValue(e)
            }
            _ = this._getYAxisLabelAlignment(d).textAlign
          }
          'y' === e && ('start' === s ? (P = 'top') : 'end' === s && (P = 'bottom'))
          const O = this._getLabelSizes()
          for (m = 0, b = a.length; m < b; ++m) {
            ;(y = a[m]), (v = y.label)
            const t = i.setContext(this.getContext(m))
            ;(k = this.getPixelForTick(m) + i.labelOffset),
              (S = this._resolveTickFontOptions(m)),
              (E = S.lineHeight),
              (C = ot(v) ? v.length : 1)
            const e = C / 2,
              n = t.color,
              s = t.textStrokeColor,
              c = t.textStrokeWidth
            let d,
              h = _
            if (
              (o
                ? ((x = k),
                  'inner' === _ &&
                    (h =
                      m === b - 1
                        ? this.options.reverse
                          ? 'left'
                          : 'right'
                        : 0 === m
                          ? this.options.reverse
                            ? 'right'
                            : 'left'
                          : 'center'),
                  (M =
                    'top' === r
                      ? 'near' === l || 0 !== p
                        ? -C * E + E / 2
                        : 'center' === l
                          ? -O.highest.height / 2 - e * E + E
                          : -O.highest.height + E / 2
                      : 'near' === l || 0 !== p
                        ? E / 2
                        : 'center' === l
                          ? O.highest.height / 2 - e * E
                          : O.highest.height - C * E),
                  u && (M *= -1),
                  0 === p || t.showLabelBackdrop || (x += (E / 2) * Math.sin(p)))
                : ((w = k), (M = ((1 - C) * E) / 2)),
              t.showLabelBackdrop)
            ) {
              const e = Xe(t.backdropPadding),
                n = O.heights[m],
                r = O.widths[m]
              let i = M - e.top,
                o = 0 - e.left
              switch (P) {
                case 'middle':
                  i -= n / 2
                  break
                case 'bottom':
                  i -= n
              }
              switch (_) {
                case 'center':
                  o -= r / 2
                  break
                case 'right':
                  o -= r
                  break
                case 'inner':
                  m === b - 1 ? (o -= r) : m > 0 && (o -= r / 2)
              }
              d = {
                left: o,
                top: i,
                width: r + e.width,
                height: n + e.height,
                color: t.backdropColor,
              }
            }
            g.push({
              label: v,
              font: S,
              textOffset: M,
              options: {
                rotation: p,
                color: n,
                strokeColor: s,
                strokeWidth: c,
                textAlign: h,
                textBaseline: P,
                translation: [x, w],
                backdrop: d,
              },
            })
          }
          return g
        }
        _getXAxisLabelAlignment() {
          const { position: t, ticks: e } = this.options
          if (-Bt(this.labelRotation)) return 'top' === t ? 'left' : 'right'
          let n = 'center'
          return (
            'start' === e.align
              ? (n = 'left')
              : 'end' === e.align
                ? (n = 'right')
                : 'inner' === e.align && (n = 'inner'),
            n
          )
        }
        _getYAxisLabelAlignment(t) {
          const {
              position: e,
              ticks: { crossAlign: n, mirror: r, padding: i },
            } = this.options,
            o = t + i,
            a = this._getLabelSizes().widest.width
          let s, l
          return (
            'left' === e
              ? r
                ? ((l = this.right + i),
                  'near' === n
                    ? (s = 'left')
                    : 'center' === n
                      ? ((s = 'center'), (l += a / 2))
                      : ((s = 'right'), (l += a)))
                : ((l = this.right - o),
                  'near' === n
                    ? (s = 'right')
                    : 'center' === n
                      ? ((s = 'center'), (l -= a / 2))
                      : ((s = 'left'), (l = this.left)))
              : 'right' === e
                ? r
                  ? ((l = this.left + i),
                    'near' === n
                      ? (s = 'right')
                      : 'center' === n
                        ? ((s = 'center'), (l -= a / 2))
                        : ((s = 'left'), (l -= a)))
                  : ((l = this.left + o),
                    'near' === n
                      ? (s = 'left')
                      : 'center' === n
                        ? ((s = 'center'), (l += a / 2))
                        : ((s = 'right'), (l = this.right)))
                : (s = 'right'),
            { textAlign: s, x: l }
          )
        }
        _computeLabelArea() {
          if (this.options.ticks.mirror) return
          const t = this.chart,
            e = this.options.position
          return 'left' === e || 'right' === e
            ? { top: 0, left: this.left, bottom: t.height, right: this.right }
            : 'top' === e || 'bottom' === e
              ? { top: this.top, left: 0, bottom: this.bottom, right: t.width }
              : void 0
        }
        drawBackground() {
          const {
            ctx: t,
            options: { backgroundColor: e },
            left: n,
            top: r,
            width: i,
            height: o,
          } = this
          e && (t.save(), (t.fillStyle = e), t.fillRect(n, r, i, o), t.restore())
        }
        getLineWidthForValue(t) {
          const e = this.options.grid
          if (!this._isVisible() || !e.display) return 0
          const n = this.ticks.findIndex((e) => e.value === t)
          if (n >= 0) {
            return e.setContext(this.getContext(n)).lineWidth
          }
          return 0
        }
        drawGrid(t) {
          const e = this.options.grid,
            n = this.ctx,
            r =
              this._gridLineItems ||
              (this._gridLineItems = this._computeGridLineItems(t))
          let i, o
          const a = (t, e, r) => {
            r.width &&
              r.color &&
              (n.save(),
              (n.lineWidth = r.width),
              (n.strokeStyle = r.color),
              n.setLineDash(r.borderDash || []),
              (n.lineDashOffset = r.borderDashOffset),
              n.beginPath(),
              n.moveTo(t.x, t.y),
              n.lineTo(e.x, e.y),
              n.stroke(),
              n.restore())
          }
          if (e.display)
            for (i = 0, o = r.length; i < o; ++i) {
              const t = r[i]
              e.drawOnChartArea && a({ x: t.x1, y: t.y1 }, { x: t.x2, y: t.y2 }, t),
                e.drawTicks &&
                  a(
                    { x: t.tx1, y: t.ty1 },
                    { x: t.tx2, y: t.ty2 },
                    {
                      color: t.tickColor,
                      width: t.tickWidth,
                      borderDash: t.tickBorderDash,
                      borderDashOffset: t.tickBorderDashOffset,
                    },
                  )
            }
        }
        drawBorder() {
          const {
              chart: t,
              ctx: e,
              options: { border: n, grid: r },
            } = this,
            i = n.setContext(this.getContext()),
            o = n.display ? i.width : 0
          if (!o) return
          const a = r.setContext(this.getContext(0)).lineWidth,
            s = this._borderValue
          let l, c, u, d
          this.isHorizontal()
            ? ((l = Oe(t, this.left, o) - o / 2),
              (c = Oe(t, this.right, a) + a / 2),
              (u = d = s))
            : ((u = Oe(t, this.top, o) - o / 2),
              (d = Oe(t, this.bottom, a) + a / 2),
              (l = c = s)),
            e.save(),
            (e.lineWidth = i.width),
            (e.strokeStyle = i.color),
            e.beginPath(),
            e.moveTo(l, u),
            e.lineTo(c, d),
            e.stroke(),
            e.restore()
        }
        drawLabels(t) {
          if (!this.options.ticks.display) return
          const e = this.ctx,
            n = this._computeLabelArea()
          n && Ae(e, n)
          const r = this.getLabelItems(t)
          for (const t of r) {
            const n = t.options,
              r = t.font
            Be(e, t.label, 0, t.textOffset, r, n)
          }
          n && Ne(e)
        }
        drawTitle() {
          const {
            ctx: t,
            options: { position: e, title: n, reverse: r },
          } = this
          if (!n.display) return
          const i = Ke(n.font),
            o = Xe(n.padding),
            a = n.align
          let s = i.lineHeight / 2
          'bottom' === e || 'center' === e || at(e)
            ? ((s += o.bottom),
              ot(n.text) && (s += i.lineHeight * (n.text.length - 1)))
            : (s += o.top)
          const {
            titleX: l,
            titleY: c,
            maxWidth: u,
            rotation: d,
          } = (function (t, e, n, r) {
            const { top: i, left: o, bottom: a, right: s, chart: l } = t,
              { chartArea: c, scales: u } = l
            let d,
              h,
              f,
              p = 0
            const g = a - i,
              m = s - o
            if (t.isHorizontal()) {
              if (((h = oe(r, o, s)), at(n))) {
                const t = Object.keys(n)[0],
                  r = n[t]
                f = u[t].getPixelForValue(r) + g - e
              } else
                f = 'center' === n ? (c.bottom + c.top) / 2 + g - e : hi(t, n, e)
              d = s - o
            } else {
              if (at(n)) {
                const t = Object.keys(n)[0],
                  r = n[t]
                h = u[t].getPixelForValue(r) - m + e
              } else
                h = 'center' === n ? (c.left + c.right) / 2 - m + e : hi(t, n, e)
              ;(f = oe(r, a, i)), (p = 'left' === n ? -Tt : Tt)
            }
            return { titleX: h, titleY: f, maxWidth: d, rotation: p }
          })(this, s, e, a)
          Be(t, n.text, 0, 0, i, {
            color: n.color,
            maxWidth: u,
            rotation: d,
            textAlign: yi(a, e, r),
            textBaseline: 'middle',
            translation: [l, c],
          })
        }
        draw(t) {
          this._isVisible() &&
            (this.drawBackground(),
            this.drawGrid(t),
            this.drawBorder(),
            this.drawTitle(),
            this.drawLabels(t))
        }
        _layers() {
          const t = this.options,
            e = (t.ticks && t.ticks.z) || 0,
            n = ct(t.grid && t.grid.z, -1),
            r = ct(t.border && t.border.z, 0)
          return this._isVisible() && this.draw === vi.prototype.draw
            ? [
                {
                  z: n,
                  draw: (t) => {
                    this.drawBackground(), this.drawGrid(t), this.drawTitle()
                  },
                },
                {
                  z: r,
                  draw: () => {
                    this.drawBorder()
                  },
                },
                {
                  z: e,
                  draw: (t) => {
                    this.drawLabels(t)
                  },
                },
              ]
            : [
                {
                  z: e,
                  draw: (t) => {
                    this.draw(t)
                  },
                },
              ]
        }
        getMatchingVisibleMetas(t) {
          const e = this.chart.getSortedVisibleDatasetMetas(),
            n = this.axis + 'AxisID',
            r = []
          let i, o
          for (i = 0, o = e.length; i < o; ++i) {
            const o = e[i]
            o[n] !== this.id || (t && o.type !== t) || r.push(o)
          }
          return r
        }
        _resolveTickFontOptions(t) {
          return Ke(this.options.ticks.setContext(this.getContext(t)).font)
        }
        _maxDigits() {
          const t = this._resolveTickFontOptions(0).lineHeight
          return (this.isHorizontal() ? this.width : this.height) / t
        }
      }
      class xi {
        constructor(t, e, n) {
          ;(this.type = t),
            (this.scope = e),
            (this.override = n),
            (this.items = Object.create(null))
        }
        isForType(t) {
          return Object.prototype.isPrototypeOf.call(
            this.type.prototype,
            t.prototype,
          )
        }
        register(t) {
          const e = Object.getPrototypeOf(t)
          let n
          ;(function (t) {
            return 'id' in t && 'defaults' in t
          })(e) && (n = this.register(e))
          const r = this.items,
            i = t.id,
            o = this.scope + '.' + i
          if (!i) throw new Error('class does not have id: ' + t)
          return (
            i in r ||
              ((r[i] = t),
              (function (t, e, n) {
                const r = bt(Object.create(null), [
                  n ? Ce.get(n) : {},
                  Ce.get(e),
                  t.defaults,
                ])
                Ce.set(e, r),
                  t.defaultRoutes &&
                    (function (t, e) {
                      Object.keys(e).forEach((n) => {
                        const r = n.split('.'),
                          i = r.pop(),
                          o = [t].concat(r).join('.'),
                          a = e[n].split('.'),
                          s = a.pop(),
                          l = a.join('.')
                        Ce.route(o, i, l, s)
                      })
                    })(e, t.defaultRoutes)
                t.descriptors && Ce.describe(e, t.descriptors)
              })(t, o, n),
              this.override && Ce.override(t.id, t.overrides)),
            o
          )
        }
        get(t) {
          return this.items[t]
        }
        unregister(t) {
          const e = this.items,
            n = t.id,
            r = this.scope
          n in e && delete e[n],
            r && n in Ce[r] && (delete Ce[r][n], this.override && delete we[n])
        }
      }
      class wi {
        constructor() {
          ;(this.controllers = new xi(ur, 'datasets', !0)),
            (this.elements = new xi(ci, 'elements')),
            (this.plugins = new xi(Object, 'plugins')),
            (this.scales = new xi(vi, 'scales')),
            (this._typedRegistries = [this.controllers, this.scales, this.elements])
        }
        add(...t) {
          this._each('register', t)
        }
        remove(...t) {
          this._each('unregister', t)
        }
        addControllers(...t) {
          this._each('register', t, this.controllers)
        }
        addElements(...t) {
          this._each('register', t, this.elements)
        }
        addPlugins(...t) {
          this._each('register', t, this.plugins)
        }
        addScales(...t) {
          this._each('register', t, this.scales)
        }
        getController(t) {
          return this._get(t, this.controllers, 'controller')
        }
        getElement(t) {
          return this._get(t, this.elements, 'element')
        }
        getPlugin(t) {
          return this._get(t, this.plugins, 'plugin')
        }
        getScale(t) {
          return this._get(t, this.scales, 'scale')
        }
        removeControllers(...t) {
          this._each('unregister', t, this.controllers)
        }
        removeElements(...t) {
          this._each('unregister', t, this.elements)
        }
        removePlugins(...t) {
          this._each('unregister', t, this.plugins)
        }
        removeScales(...t) {
          this._each('unregister', t, this.scales)
        }
        _each(t, e, n) {
          ;[...e].forEach((e) => {
            const r = n || this._getRegistryForType(e)
            n || r.isForType(e) || (r === this.plugins && e.id)
              ? this._exec(t, r, e)
              : ht(e, (e) => {
                  const r = n || this._getRegistryForType(e)
                  this._exec(t, r, e)
                })
          })
        }
        _exec(t, e, n) {
          const r = _t(t)
          dt(n['before' + r], [], n), e[t](n), dt(n['after' + r], [], n)
        }
        _getRegistryForType(t) {
          for (let e = 0; e < this._typedRegistries.length; e++) {
            const n = this._typedRegistries[e]
            if (n.isForType(t)) return n
          }
          return this.plugins
        }
        _get(t, e, n) {
          const r = e.get(t)
          if (void 0 === r)
            throw new Error('"' + t + '" is not a registered ' + n + '.')
          return r
        }
      }
      var _i = new wi()
      class ki {
        constructor() {
          this._init = []
        }
        notify(t, e, n, r) {
          'beforeInit' === e &&
            ((this._init = this._createDescriptors(t, !0)),
            this._notify(this._init, t, 'install'))
          const i = r ? this._descriptors(t).filter(r) : this._descriptors(t),
            o = this._notify(i, t, e, n)
          return (
            'afterDestroy' === e &&
              (this._notify(i, t, 'stop'),
              this._notify(this._init, t, 'uninstall')),
            o
          )
        }
        _notify(t, e, n, r) {
          r = r || {}
          for (const i of t) {
            const t = i.plugin
            if (!1 === dt(t[n], [e, r, i.options], t) && r.cancelable) return !1
          }
          return !0
        }
        invalidate() {
          it(this._cache) ||
            ((this._oldCache = this._cache), (this._cache = void 0))
        }
        _descriptors(t) {
          if (this._cache) return this._cache
          const e = (this._cache = this._createDescriptors(t))
          return this._notifyStateChanges(t), e
        }
        _createDescriptors(t, e) {
          const n = t && t.config,
            r = ct(n.options && n.options.plugins, {}),
            i = (function (t) {
              const e = {},
                n = [],
                r = Object.keys(_i.plugins.items)
              for (let t = 0; t < r.length; t++) n.push(_i.getPlugin(r[t]))
              const i = t.plugins || []
              for (let t = 0; t < i.length; t++) {
                const r = i[t]
                ;-1 === n.indexOf(r) && (n.push(r), (e[r.id] = !0))
              }
              return { plugins: n, localIds: e }
            })(n)
          return !1 !== r || e
            ? (function (t, { plugins: e, localIds: n }, r, i) {
                const o = [],
                  a = t.getContext()
                for (const s of e) {
                  const e = s.id,
                    l = Si(r[e], i)
                  null !== l &&
                    o.push({
                      plugin: s,
                      options: Ei(t.config, { plugin: s, local: n[e] }, l, a),
                    })
                }
                return o
              })(t, i, r, e)
            : []
        }
        _notifyStateChanges(t) {
          const e = this._oldCache || [],
            n = this._cache,
            r = (t, e) =>
              t.filter((t) => !e.some((e) => t.plugin.id === e.plugin.id))
          this._notify(r(e, n), t, 'stop'), this._notify(r(n, e), t, 'start')
        }
      }
      function Si(t, e) {
        return e || !1 !== t ? (!0 === t ? {} : t) : null
      }
      function Ei(t, { plugin: e, local: n }, r, i) {
        const o = t.pluginScopeKeys(e),
          a = t.getOptionScopes(r, o)
        return (
          n && e.defaults && a.push(e.defaults),
          t.createResolver(a, i, [''], {
            scriptable: !1,
            indexable: !1,
            allKeys: !0,
          })
        )
      }
      function Ci(t, e) {
        const n = Ce.datasets[t] || {}
        return (
          ((e.datasets || {})[t] || {}).indexAxis ||
          e.indexAxis ||
          n.indexAxis ||
          'x'
        )
      }
      function Mi(t) {
        if ('x' === t || 'y' === t || 'r' === t) return t
      }
      function Pi(t, ...e) {
        if (Mi(t)) return t
        for (const r of e) {
          const e =
            r.axis ||
            ('top' === (n = r.position) || 'bottom' === n
              ? 'x'
              : 'left' === n || 'right' === n
                ? 'y'
                : void 0) ||
            (t.length > 1 && Mi(t[0].toLowerCase()))
          if (e) return e
        }
        var n
        throw new Error(
          `Cannot determine type of '${t}' axis. Please provide 'axis' or 'position' option.`,
        )
      }
      function Oi(t, e, n) {
        if (n[e + 'AxisID'] === t) return { axis: e }
      }
      function Di(t, e) {
        const n = we[t.type] || { scales: {} },
          r = e.scales || {},
          i = Ci(t.type, e),
          o = Object.create(null)
        return (
          Object.keys(r).forEach((e) => {
            const a = r[e]
            if (!at(a))
              return console.error(`Invalid scale configuration for scale: ${e}`)
            if (a._proxy)
              return console.warn(
                `Ignoring resolver passed as options for scale: ${e}`,
              )
            const s = Pi(
                e,
                a,
                (function (t, e) {
                  if (e.data && e.data.datasets) {
                    const n = e.data.datasets.filter(
                      (e) => e.xAxisID === t || e.yAxisID === t,
                    )
                    if (n.length) return Oi(t, 'x', n[0]) || Oi(t, 'y', n[0])
                  }
                  return {}
                })(e, t),
                Ce.scales[a.type],
              ),
              l = (function (t, e) {
                return t === e ? '_index_' : '_value_'
              })(s, i),
              c = n.scales || {}
            o[e] = yt(Object.create(null), [{ axis: s }, a, c[s], c[l]])
          }),
          t.data.datasets.forEach((n) => {
            const i = n.type || t.type,
              a = n.indexAxis || Ci(i, e),
              s = (we[i] || {}).scales || {}
            Object.keys(s).forEach((t) => {
              const e = (function (t, e) {
                  let n = t
                  return (
                    '_index_' === t
                      ? (n = e)
                      : '_value_' === t && (n = 'x' === e ? 'y' : 'x'),
                    n
                  )
                })(t, a),
                i = n[e + 'AxisID'] || e
              ;(o[i] = o[i] || Object.create(null)),
                yt(o[i], [{ axis: e }, r[i], s[t]])
            })
          }),
          Object.keys(o).forEach((t) => {
            const e = o[t]
            yt(e, [Ce.scales[e.type], Ce.scale])
          }),
          o
        )
      }
      function Ti(t) {
        const e = t.options || (t.options = {})
        ;(e.plugins = ct(e.plugins, {})), (e.scales = Di(t, e))
      }
      function Ri(t) {
        return (
          ((t = t || {}).datasets = t.datasets || []),
          (t.labels = t.labels || []),
          t
        )
      }
      const Li = new Map(),
        Ai = new Set()
      function Ni(t, e) {
        let n = Li.get(t)
        return n || ((n = e()), Li.set(t, n), Ai.add(n)), n
      }
      const ji = (t, e, n) => {
        const r = wt(e, n)
        void 0 !== r && t.add(r)
      }
      class zi {
        constructor(t) {
          ;(this._config = (function (t) {
            return ((t = t || {}).data = Ri(t.data)), Ti(t), t
          })(t)),
            (this._scopeCache = new Map()),
            (this._resolverCache = new Map())
        }
        get platform() {
          return this._config.platform
        }
        get type() {
          return this._config.type
        }
        set type(t) {
          this._config.type = t
        }
        get data() {
          return this._config.data
        }
        set data(t) {
          this._config.data = Ri(t)
        }
        get options() {
          return this._config.options
        }
        set options(t) {
          this._config.options = t
        }
        get plugins() {
          return this._config.plugins
        }
        update() {
          const t = this._config
          this.clearCache(), Ti(t)
        }
        clearCache() {
          this._scopeCache.clear(), this._resolverCache.clear()
        }
        datasetScopeKeys(t) {
          return Ni(t, () => [[`datasets.${t}`, '']])
        }
        datasetAnimationScopeKeys(t, e) {
          return Ni(`${t}.transition.${e}`, () => [
            [`datasets.${t}.transitions.${e}`, `transitions.${e}`],
            [`datasets.${t}`, ''],
          ])
        }
        datasetElementScopeKeys(t, e) {
          return Ni(`${t}-${e}`, () => [
            [`datasets.${t}.elements.${e}`, `datasets.${t}`, `elements.${e}`, ''],
          ])
        }
        pluginScopeKeys(t) {
          const e = t.id
          return Ni(`${this.type}-plugin-${e}`, () => [
            [`plugins.${e}`, ...(t.additionalOptionScopes || [])],
          ])
        }
        _cachedScopes(t, e) {
          const n = this._scopeCache
          let r = n.get(t)
          return (r && !e) || ((r = new Map()), n.set(t, r)), r
        }
        getOptionScopes(t, e, n) {
          const { options: r, type: i } = this,
            o = this._cachedScopes(t, n),
            a = o.get(e)
          if (a) return a
          const s = new Set()
          e.forEach((e) => {
            t && (s.add(t), e.forEach((e) => ji(s, t, e))),
              e.forEach((t) => ji(s, r, t)),
              e.forEach((t) => ji(s, we[i] || {}, t)),
              e.forEach((t) => ji(s, Ce, t)),
              e.forEach((t) => ji(s, _e, t))
          })
          const l = Array.from(s)
          return (
            0 === l.length && l.push(Object.create(null)),
            Ai.has(e) && o.set(e, l),
            l
          )
        }
        chartOptionScopes() {
          const { options: t, type: e } = this
          return [t, we[e] || {}, Ce.datasets[e] || {}, { type: e }, Ce, _e]
        }
        resolveNamedOptions(t, e, n, r = ['']) {
          const i = { $shared: !0 },
            { resolver: o, subPrefixes: a } = Fi(this._resolverCache, t, r)
          let s = o
          if (
            (function (t, e) {
              const { isScriptable: n, isIndexable: r } = en(t)
              for (const i of e) {
                const e = n(i),
                  o = r(i),
                  a = (o || e) && t[i]
                if ((e && (St(a) || Ii(a))) || (o && ot(a))) return !0
              }
              return !1
            })(o, e)
          ) {
            i.$shared = !1
            s = tn(o, (n = St(n) ? n() : n), this.createResolver(t, n, a))
          }
          for (const t of e) i[t] = s[t]
          return i
        }
        createResolver(t, e, n = [''], r) {
          const { resolver: i } = Fi(this._resolverCache, t, n)
          return at(e) ? tn(i, e, void 0, r) : i
        }
      }
      function Fi(t, e, n) {
        let r = t.get(e)
        r || ((r = new Map()), t.set(e, r))
        const i = n.join()
        let o = r.get(i)
        if (!o) {
          ;(o = {
            resolver: Ge(e, n),
            subPrefixes: n.filter((t) => !t.toLowerCase().includes('hover')),
          }),
            r.set(i, o)
        }
        return o
      }
      const Ii = (t) => at(t) && Object.getOwnPropertyNames(t).some((e) => St(t[e]))
      const Bi = ['top', 'bottom', 'left', 'right', 'chartArea']
      function Ui(t, e) {
        return 'top' === t || 'bottom' === t || (-1 === Bi.indexOf(t) && 'x' === e)
      }
      function Wi(t, e) {
        return function (n, r) {
          return n[t] === r[t] ? n[e] - r[e] : n[t] - r[t]
        }
      }
      function Vi(t) {
        const e = t.chart,
          n = e.options.animation
        e.notifyPlugins('afterRender'), dt(n && n.onComplete, [t], e)
      }
      function Hi(t) {
        const e = t.chart,
          n = e.options.animation
        dt(n && n.onProgress, [t], e)
      }
      function $i(t) {
        return (
          wn() && 'string' == typeof t
            ? (t = document.getElementById(t))
            : t && t.length && (t = t[0]),
          t && t.canvas && (t = t.canvas),
          t
        )
      }
      const Yi = {},
        qi = (t) => {
          const e = $i(t)
          return Object.values(Yi)
            .filter((t) => t.canvas === e)
            .pop()
        }
      function Qi(t, e, n) {
        const r = Object.keys(t)
        for (const i of r) {
          const r = +i
          if (r >= e) {
            const o = t[i]
            delete t[i], (n > 0 || r > e) && (t[r + n] = o)
          }
        }
      }
      function Xi(t, e, n) {
        return t.options.clip ? t[n] : e[n]
      }
      class Ki {
        static defaults = Ce
        static instances = Yi
        static overrides = we
        static registry = _i
        static version = '4.4.1'
        static getChart = qi
        static register(...t) {
          _i.add(...t), Zi()
        }
        static unregister(...t) {
          _i.remove(...t), Zi()
        }
        constructor(t, e) {
          const n = (this.config = new zi(e)),
            r = $i(t),
            i = qi(r)
          if (i)
            throw new Error(
              "Canvas is already in use. Chart with ID '" +
                i.id +
                "' must be destroyed before the canvas with ID '" +
                i.canvas.id +
                "' can be reused.",
            )
          const o = n.createResolver(n.chartOptionScopes(), this.getContext())
          ;(this.platform = new (n.platform ||
            (function (t) {
              return !wn() ||
                ('undefined' != typeof OffscreenCanvas &&
                  t instanceof OffscreenCanvas)
                ? qr
                : li
            })(r))()),
            this.platform.updateConfig(n)
          const a = this.platform.acquireContext(r, o.aspectRatio),
            s = a && a.canvas,
            l = s && s.height,
            c = s && s.width
          ;(this.id = rt()),
            (this.ctx = a),
            (this.canvas = s),
            (this.width = c),
            (this.height = l),
            (this._options = o),
            (this._aspectRatio = this.aspectRatio),
            (this._layers = []),
            (this._metasets = []),
            (this._stacks = void 0),
            (this.boxes = []),
            (this.currentDevicePixelRatio = void 0),
            (this.chartArea = void 0),
            (this._active = []),
            (this._lastEvent = void 0),
            (this._listeners = {}),
            (this._responsiveListeners = void 0),
            (this._sortedMetasets = []),
            (this.scales = {}),
            (this._plugins = new ki()),
            (this.$proxies = {}),
            (this._hiddenIndices = {}),
            (this.attached = !1),
            (this._animationsDisabled = void 0),
            (this.$context = void 0),
            (this._doResize = (function (t, e) {
              let n
              return function (...r) {
                return (
                  e
                    ? (clearTimeout(n), (n = setTimeout(t, e, r)))
                    : t.apply(this, r),
                  e
                )
              }
            })((t) => this.update(t), o.resizeDelay || 0)),
            (this._dataChanges = []),
            (Yi[this.id] = this),
            a && s
              ? (Qn.listen(this, 'complete', Vi),
                Qn.listen(this, 'progress', Hi),
                this._initialize(),
                this.attached && this.update())
              : console.error(
                  "Failed to create chart: can't acquire context from the given item",
                )
        }
        get aspectRatio() {
          const {
            options: { aspectRatio: t, maintainAspectRatio: e },
            width: n,
            height: r,
            _aspectRatio: i,
          } = this
          return it(t) ? (e && i ? i : r ? n / r : null) : t
        }
        get data() {
          return this.config.data
        }
        set data(t) {
          this.config.data = t
        }
        get options() {
          return this._options
        }
        set options(t) {
          this.config.options = t
        }
        get registry() {
          return _i
        }
        _initialize() {
          return (
            this.notifyPlugins('beforeInit'),
            this.options.responsive
              ? this.resize()
              : Tn(this, this.options.devicePixelRatio),
            this.bindEvents(),
            this.notifyPlugins('afterInit'),
            this
          )
        }
        clear() {
          return De(this.canvas, this.ctx), this
        }
        stop() {
          return Qn.stop(this), this
        }
        resize(t, e) {
          Qn.running(this)
            ? (this._resizeBeforeDraw = { width: t, height: e })
            : this._resize(t, e)
        }
        _resize(t, e) {
          const n = this.options,
            r = this.canvas,
            i = n.maintainAspectRatio && this.aspectRatio,
            o = this.platform.getMaximumSize(r, t, e, i),
            a = n.devicePixelRatio || this.platform.getDevicePixelRatio(),
            s = this.width ? 'resize' : 'attach'
          ;(this.width = o.width),
            (this.height = o.height),
            (this._aspectRatio = this.aspectRatio),
            Tn(this, a, !0) &&
              (this.notifyPlugins('resize', { size: o }),
              dt(n.onResize, [this, o], this),
              this.attached && this._doResize(s) && this.render())
        }
        ensureScalesHaveIDs() {
          ht(this.options.scales || {}, (t, e) => {
            t.id = e
          })
        }
        buildOrUpdateScales() {
          const t = this.options,
            e = t.scales,
            n = this.scales,
            r = Object.keys(n).reduce((t, e) => ((t[e] = !1), t), {})
          let i = []
          e &&
            (i = i.concat(
              Object.keys(e).map((t) => {
                const n = e[t],
                  r = Pi(t, n),
                  i = 'r' === r,
                  o = 'x' === r
                return {
                  options: n,
                  dposition: i ? 'chartArea' : o ? 'bottom' : 'left',
                  dtype: i ? 'radialLinear' : o ? 'category' : 'linear',
                }
              }),
            )),
            ht(i, (e) => {
              const i = e.options,
                o = i.id,
                a = Pi(o, i),
                s = ct(i.type, e.dtype)
              ;(void 0 !== i.position && Ui(i.position, a) === Ui(e.dposition)) ||
                (i.position = e.dposition),
                (r[o] = !0)
              let l = null
              if (o in n && n[o].type === s) l = n[o]
              else {
                ;(l = new (_i.getScale(s))({
                  id: o,
                  type: s,
                  ctx: this.ctx,
                  chart: this,
                })),
                  (n[l.id] = l)
              }
              l.init(i, t)
            }),
            ht(r, (t, e) => {
              t || delete n[e]
            }),
            ht(n, (t) => {
              $r.configure(this, t, t.options), $r.addBox(this, t)
            })
        }
        _updateMetasets() {
          const t = this._metasets,
            e = this.data.datasets.length,
            n = t.length
          if ((t.sort((t, e) => t.index - e.index), n > e)) {
            for (let t = e; t < n; ++t) this._destroyDatasetMeta(t)
            t.splice(e, n - e)
          }
          this._sortedMetasets = t.slice(0).sort(Wi('order', 'index'))
        }
        _removeUnreferencedMetasets() {
          const {
            _metasets: t,
            data: { datasets: e },
          } = this
          t.length > e.length && delete this._stacks,
            t.forEach((t, n) => {
              0 === e.filter((e) => e === t._dataset).length &&
                this._destroyDatasetMeta(n)
            })
        }
        buildOrUpdateControllers() {
          const t = [],
            e = this.data.datasets
          let n, r
          for (
            this._removeUnreferencedMetasets(), n = 0, r = e.length;
            n < r;
            n++
          ) {
            const r = e[n]
            let i = this.getDatasetMeta(n)
            const o = r.type || this.config.type
            if (
              (i.type &&
                i.type !== o &&
                (this._destroyDatasetMeta(n), (i = this.getDatasetMeta(n))),
              (i.type = o),
              (i.indexAxis = r.indexAxis || Ci(o, this.options)),
              (i.order = r.order || 0),
              (i.index = n),
              (i.label = '' + r.label),
              (i.visible = this.isDatasetVisible(n)),
              i.controller)
            )
              i.controller.updateIndex(n), i.controller.linkScales()
            else {
              const e = _i.getController(o),
                { datasetElementType: r, dataElementType: a } = Ce.datasets[o]
              Object.assign(e, {
                dataElementType: _i.getElement(a),
                datasetElementType: r && _i.getElement(r),
              }),
                (i.controller = new e(this, n)),
                t.push(i.controller)
            }
          }
          return this._updateMetasets(), t
        }
        _resetElements() {
          ht(
            this.data.datasets,
            (t, e) => {
              this.getDatasetMeta(e).controller.reset()
            },
            this,
          )
        }
        reset() {
          this._resetElements(), this.notifyPlugins('reset')
        }
        update(t) {
          const e = this.config
          e.update()
          const n = (this._options = e.createResolver(
              e.chartOptionScopes(),
              this.getContext(),
            )),
            r = (this._animationsDisabled = !n.animation)
          if (
            (this._updateScales(),
            this._checkEventBindings(),
            this._updateHiddenIndices(),
            this._plugins.invalidate(),
            !1 === this.notifyPlugins('beforeUpdate', { mode: t, cancelable: !0 }))
          )
            return
          const i = this.buildOrUpdateControllers()
          this.notifyPlugins('beforeElementsUpdate')
          let o = 0
          for (let t = 0, e = this.data.datasets.length; t < e; t++) {
            const { controller: e } = this.getDatasetMeta(t),
              n = !r && -1 === i.indexOf(e)
            e.buildOrUpdateElements(n), (o = Math.max(+e.getMaxOverflow(), o))
          }
          ;(o = this._minPadding = n.layout.autoPadding ? o : 0),
            this._updateLayout(o),
            r ||
              ht(i, (t) => {
                t.reset()
              }),
            this._updateDatasets(t),
            this.notifyPlugins('afterUpdate', { mode: t }),
            this._layers.sort(Wi('z', '_idx'))
          const { _active: a, _lastEvent: s } = this
          s
            ? this._eventHandler(s, !0)
            : a.length && this._updateHoverStyles(a, a, !0),
            this.render()
        }
        _updateScales() {
          ht(this.scales, (t) => {
            $r.removeBox(this, t)
          }),
            this.ensureScalesHaveIDs(),
            this.buildOrUpdateScales()
        }
        _checkEventBindings() {
          const t = this.options,
            e = new Set(Object.keys(this._listeners)),
            n = new Set(t.events)
          ;(Et(e, n) && !!this._responsiveListeners === t.responsive) ||
            (this.unbindEvents(), this.bindEvents())
        }
        _updateHiddenIndices() {
          const { _hiddenIndices: t } = this,
            e = this._getUniformDataChanges() || []
          for (const { method: n, start: r, count: i } of e) {
            Qi(t, r, '_removeElements' === n ? -i : i)
          }
        }
        _getUniformDataChanges() {
          const t = this._dataChanges
          if (!t || !t.length) return
          this._dataChanges = []
          const e = this.data.datasets.length,
            n = (e) =>
              new Set(
                t
                  .filter((t) => t[0] === e)
                  .map((t, e) => e + ',' + t.splice(1).join(',')),
              ),
            r = n(0)
          for (let t = 1; t < e; t++) if (!Et(r, n(t))) return
          return Array.from(r)
            .map((t) => t.split(','))
            .map((t) => ({ method: t[1], start: +t[2], count: +t[3] }))
        }
        _updateLayout(t) {
          if (!1 === this.notifyPlugins('beforeLayout', { cancelable: !0 })) return
          $r.update(this, this.width, this.height, t)
          const e = this.chartArea,
            n = e.width <= 0 || e.height <= 0
          ;(this._layers = []),
            ht(
              this.boxes,
              (t) => {
                ;(n && 'chartArea' === t.position) ||
                  (t.configure && t.configure(), this._layers.push(...t._layers()))
              },
              this,
            ),
            this._layers.forEach((t, e) => {
              t._idx = e
            }),
            this.notifyPlugins('afterLayout')
        }
        _updateDatasets(t) {
          if (
            !1 !==
            this.notifyPlugins('beforeDatasetsUpdate', { mode: t, cancelable: !0 })
          ) {
            for (let t = 0, e = this.data.datasets.length; t < e; ++t)
              this.getDatasetMeta(t).controller.configure()
            for (let e = 0, n = this.data.datasets.length; e < n; ++e)
              this._updateDataset(e, St(t) ? t({ datasetIndex: e }) : t)
            this.notifyPlugins('afterDatasetsUpdate', { mode: t })
          }
        }
        _updateDataset(t, e) {
          const n = this.getDatasetMeta(t),
            r = { meta: n, index: t, mode: e, cancelable: !0 }
          !1 !== this.notifyPlugins('beforeDatasetUpdate', r) &&
            (n.controller._update(e),
            (r.cancelable = !1),
            this.notifyPlugins('afterDatasetUpdate', r))
        }
        render() {
          !1 !== this.notifyPlugins('beforeRender', { cancelable: !0 }) &&
            (Qn.has(this)
              ? this.attached && !Qn.running(this) && Qn.start(this)
              : (this.draw(), Vi({ chart: this })))
        }
        draw() {
          let t
          if (this._resizeBeforeDraw) {
            const { width: t, height: e } = this._resizeBeforeDraw
            this._resize(t, e), (this._resizeBeforeDraw = null)
          }
          if ((this.clear(), this.width <= 0 || this.height <= 0)) return
          if (!1 === this.notifyPlugins('beforeDraw', { cancelable: !0 })) return
          const e = this._layers
          for (t = 0; t < e.length && e[t].z <= 0; ++t) e[t].draw(this.chartArea)
          for (this._drawDatasets(); t < e.length; ++t) e[t].draw(this.chartArea)
          this.notifyPlugins('afterDraw')
        }
        _getSortedDatasetMetas(t) {
          const e = this._sortedMetasets,
            n = []
          let r, i
          for (r = 0, i = e.length; r < i; ++r) {
            const i = e[r]
            ;(t && !i.visible) || n.push(i)
          }
          return n
        }
        getSortedVisibleDatasetMetas() {
          return this._getSortedDatasetMetas(!0)
        }
        _drawDatasets() {
          if (!1 === this.notifyPlugins('beforeDatasetsDraw', { cancelable: !0 }))
            return
          const t = this.getSortedVisibleDatasetMetas()
          for (let e = t.length - 1; e >= 0; --e) this._drawDataset(t[e])
          this.notifyPlugins('afterDatasetsDraw')
        }
        _drawDataset(t) {
          const e = this.ctx,
            n = t._clip,
            r = !n.disabled,
            i = (function (t, e) {
              const { xScale: n, yScale: r } = t
              return n && r
                ? {
                    left: Xi(n, e, 'left'),
                    right: Xi(n, e, 'right'),
                    top: Xi(r, e, 'top'),
                    bottom: Xi(r, e, 'bottom'),
                  }
                : e
            })(t, this.chartArea),
            o = { meta: t, index: t.index, cancelable: !0 }
          !1 !== this.notifyPlugins('beforeDatasetDraw', o) &&
            (r &&
              Ae(e, {
                left: !1 === n.left ? 0 : i.left - n.left,
                right: !1 === n.right ? this.width : i.right + n.right,
                top: !1 === n.top ? 0 : i.top - n.top,
                bottom: !1 === n.bottom ? this.height : i.bottom + n.bottom,
              }),
            t.controller.draw(),
            r && Ne(e),
            (o.cancelable = !1),
            this.notifyPlugins('afterDatasetDraw', o))
        }
        isPointInArea(t) {
          return Le(t, this.chartArea, this._minPadding)
        }
        getElementsAtEventForMode(t, e, n, r) {
          const i = Rr.modes[e]
          return 'function' == typeof i ? i(this, t, n, r) : []
        }
        getDatasetMeta(t) {
          const e = this.data.datasets[t],
            n = this._metasets
          let r = n.filter((t) => t && t._dataset === e).pop()
          return (
            r ||
              ((r = {
                type: null,
                data: [],
                dataset: null,
                controller: null,
                hidden: null,
                xAxisID: null,
                yAxisID: null,
                order: (e && e.order) || 0,
                index: t,
                _dataset: e,
                _parsed: [],
                _sorted: !1,
              }),
              n.push(r)),
            r
          )
        }
        getContext() {
          return (
            this.$context ||
            (this.$context = Je(null, { chart: this, type: 'chart' }))
          )
        }
        getVisibleDatasetCount() {
          return this.getSortedVisibleDatasetMetas().length
        }
        isDatasetVisible(t) {
          const e = this.data.datasets[t]
          if (!e) return !1
          const n = this.getDatasetMeta(t)
          return 'boolean' == typeof n.hidden ? !n.hidden : !e.hidden
        }
        setDatasetVisibility(t, e) {
          this.getDatasetMeta(t).hidden = !e
        }
        toggleDataVisibility(t) {
          this._hiddenIndices[t] = !this._hiddenIndices[t]
        }
        getDataVisibility(t) {
          return !this._hiddenIndices[t]
        }
        _updateVisibility(t, e, n) {
          const r = n ? 'show' : 'hide',
            i = this.getDatasetMeta(t),
            o = i.controller._resolveAnimations(void 0, r)
          kt(e)
            ? ((i.data[e].hidden = !n), this.update())
            : (this.setDatasetVisibility(t, n),
              o.update(i, { visible: n }),
              this.update((e) => (e.datasetIndex === t ? r : void 0)))
        }
        hide(t, e) {
          this._updateVisibility(t, e, !1)
        }
        show(t, e) {
          this._updateVisibility(t, e, !0)
        }
        _destroyDatasetMeta(t) {
          const e = this._metasets[t]
          e && e.controller && e.controller._destroy(), delete this._metasets[t]
        }
        _stop() {
          let t, e
          for (
            this.stop(), Qn.remove(this), t = 0, e = this.data.datasets.length;
            t < e;
            ++t
          )
            this._destroyDatasetMeta(t)
        }
        destroy() {
          this.notifyPlugins('beforeDestroy')
          const { canvas: t, ctx: e } = this
          this._stop(),
            this.config.clearCache(),
            t &&
              (this.unbindEvents(),
              De(t, e),
              this.platform.releaseContext(e),
              (this.canvas = null),
              (this.ctx = null)),
            delete Yi[this.id],
            this.notifyPlugins('afterDestroy')
        }
        toBase64Image(...t) {
          return this.canvas.toDataURL(...t)
        }
        bindEvents() {
          this.bindUserEvents(),
            this.options.responsive
              ? this.bindResponsiveEvents()
              : (this.attached = !0)
        }
        bindUserEvents() {
          const t = this._listeners,
            e = this.platform,
            n = (n, r) => {
              e.addEventListener(this, n, r), (t[n] = r)
            },
            r = (t, e, n) => {
              ;(t.offsetX = e), (t.offsetY = n), this._eventHandler(t)
            }
          ht(this.options.events, (t) => n(t, r))
        }
        bindResponsiveEvents() {
          this._responsiveListeners || (this._responsiveListeners = {})
          const t = this._responsiveListeners,
            e = this.platform,
            n = (n, r) => {
              e.addEventListener(this, n, r), (t[n] = r)
            },
            r = (n, r) => {
              t[n] && (e.removeEventListener(this, n, r), delete t[n])
            },
            i = (t, e) => {
              this.canvas && this.resize(t, e)
            }
          let o
          const a = () => {
            r('attach', a),
              (this.attached = !0),
              this.resize(),
              n('resize', i),
              n('detach', o)
          }
          ;(o = () => {
            ;(this.attached = !1),
              r('resize', i),
              this._stop(),
              this._resize(0, 0),
              n('attach', a)
          }),
            e.isAttached(this.canvas) ? a() : o()
        }
        unbindEvents() {
          ht(this._listeners, (t, e) => {
            this.platform.removeEventListener(this, e, t)
          }),
            (this._listeners = {}),
            ht(this._responsiveListeners, (t, e) => {
              this.platform.removeEventListener(this, e, t)
            }),
            (this._responsiveListeners = void 0)
        }
        updateHoverStyle(t, e, n) {
          const r = n ? 'set' : 'remove'
          let i, o, a, s
          for (
            'dataset' === e &&
              ((i = this.getDatasetMeta(t[0].datasetIndex)),
              i.controller['_' + r + 'DatasetHoverStyle']()),
              a = 0,
              s = t.length;
            a < s;
            ++a
          ) {
            o = t[a]
            const e = o && this.getDatasetMeta(o.datasetIndex).controller
            e && e[r + 'HoverStyle'](o.element, o.datasetIndex, o.index)
          }
        }
        getActiveElements() {
          return this._active || []
        }
        setActiveElements(t) {
          const e = this._active || [],
            n = t.map(({ datasetIndex: t, index: e }) => {
              const n = this.getDatasetMeta(t)
              if (!n) throw new Error('No dataset found at index ' + t)
              return { datasetIndex: t, element: n.data[e], index: e }
            })
          !ft(n, e) &&
            ((this._active = n),
            (this._lastEvent = null),
            this._updateHoverStyles(n, e))
        }
        notifyPlugins(t, e, n) {
          return this._plugins.notify(this, t, e, n)
        }
        isPluginEnabled(t) {
          return 1 === this._plugins._cache.filter((e) => e.plugin.id === t).length
        }
        _updateHoverStyles(t, e, n) {
          const r = this.options.hover,
            i = (t, e) =>
              t.filter(
                (t) =>
                  !e.some(
                    (e) => t.datasetIndex === e.datasetIndex && t.index === e.index,
                  ),
              ),
            o = i(e, t),
            a = n ? t : i(t, e)
          o.length && this.updateHoverStyle(o, r.mode, !1),
            a.length && r.mode && this.updateHoverStyle(a, r.mode, !0)
        }
        _eventHandler(t, e) {
          const n = {
              event: t,
              replay: e,
              cancelable: !0,
              inChartArea: this.isPointInArea(t),
            },
            r = (e) =>
              (e.options.events || this.options.events).includes(t.native.type)
          if (!1 === this.notifyPlugins('beforeEvent', n, r)) return
          const i = this._handleEvent(t, e, n.inChartArea)
          return (
            (n.cancelable = !1),
            this.notifyPlugins('afterEvent', n, r),
            (i || n.changed) && this.render(),
            this
          )
        }
        _handleEvent(t, e, n) {
          const { _active: r = [], options: i } = this,
            o = e,
            a = this._getActiveElements(t, r, n, o),
            s = (function (t) {
              return (
                'mouseup' === t.type ||
                'click' === t.type ||
                'contextmenu' === t.type
              )
            })(t),
            l = (function (t, e, n, r) {
              return n && 'mouseout' !== t.type ? (r ? e : t) : null
            })(t, this._lastEvent, n, s)
          n &&
            ((this._lastEvent = null),
            dt(i.onHover, [t, a, this], this),
            s && dt(i.onClick, [t, a, this], this))
          const c = !ft(a, r)
          return (
            (c || e) && ((this._active = a), this._updateHoverStyles(a, r, e)),
            (this._lastEvent = l),
            c
          )
        }
        _getActiveElements(t, e, n, r) {
          if ('mouseout' === t.type) return []
          if (!n) return e
          const i = this.options.hover
          return this.getElementsAtEventForMode(t, i.mode, i, r)
        }
      }
      function Zi() {
        return ht(Ki.instances, (t) => t._plugins.invalidate())
      }
      function Ji(t, e, n, r) {
        const i = Ye(t.options.borderRadius, [
          'outerStart',
          'outerEnd',
          'innerStart',
          'innerEnd',
        ])
        const o = (n - e) / 2,
          a = Math.min(o, (r * e) / 2),
          s = (t) => {
            const e = ((n - Math.min(o, t)) * r) / 2
            return Qt(t, 0, Math.min(o, e))
          }
        return {
          outerStart: s(i.outerStart),
          outerEnd: s(i.outerEnd),
          innerStart: Qt(i.innerStart, 0, a),
          innerEnd: Qt(i.innerEnd, 0, a),
        }
      }
      function Gi(t, e, n, r) {
        return { x: n + t * Math.cos(e), y: r + t * Math.sin(e) }
      }
      function to(t, e, n, r, i, o) {
        const { x: a, y: s, startAngle: l, pixelMargin: c, innerRadius: u } = e,
          d = Math.max(e.outerRadius + r + n - c, 0),
          h = u > 0 ? u + r + n + c : 0
        let f = 0
        const p = i - l
        if (r) {
          const t = ((u > 0 ? u - r : 0) + (d > 0 ? d - r : 0)) / 2
          f = (p - (0 !== t ? (p * t) / (t + r) : p)) / 2
        }
        const g = (p - Math.max(0.001, p * d - n / Ct) / d) / 2,
          m = l + g + f,
          b = i - g - f,
          {
            outerStart: y,
            outerEnd: v,
            innerStart: x,
            innerEnd: w,
          } = Ji(e, h, d, b - m),
          _ = d - y,
          k = d - v,
          S = m + y / _,
          E = b - v / k,
          C = h + x,
          M = h + w,
          P = m + x / C,
          O = b - w / M
        if ((t.beginPath(), o)) {
          const e = (S + E) / 2
          if ((t.arc(a, s, d, S, e), t.arc(a, s, d, e, E), v > 0)) {
            const e = Gi(k, E, a, s)
            t.arc(e.x, e.y, v, E, b + Tt)
          }
          const n = Gi(M, b, a, s)
          if ((t.lineTo(n.x, n.y), w > 0)) {
            const e = Gi(M, O, a, s)
            t.arc(e.x, e.y, w, b + Tt, O + Math.PI)
          }
          const r = (b - w / h + (m + x / h)) / 2
          if (
            (t.arc(a, s, h, b - w / h, r, !0),
            t.arc(a, s, h, r, m + x / h, !0),
            x > 0)
          ) {
            const e = Gi(C, P, a, s)
            t.arc(e.x, e.y, x, P + Math.PI, m - Tt)
          }
          const i = Gi(_, m, a, s)
          if ((t.lineTo(i.x, i.y), y > 0)) {
            const e = Gi(_, S, a, s)
            t.arc(e.x, e.y, y, m - Tt, S)
          }
        } else {
          t.moveTo(a, s)
          const e = Math.cos(S) * d + a,
            n = Math.sin(S) * d + s
          t.lineTo(e, n)
          const r = Math.cos(E) * d + a,
            i = Math.sin(E) * d + s
          t.lineTo(r, i)
        }
        t.closePath()
      }
      function eo(t, e, n, r, i) {
        const { fullCircles: o, startAngle: a, circumference: s, options: l } = e,
          {
            borderWidth: c,
            borderJoinStyle: u,
            borderDash: d,
            borderDashOffset: h,
          } = l,
          f = 'inner' === l.borderAlign
        if (!c) return
        t.setLineDash(d || []),
          (t.lineDashOffset = h),
          f
            ? ((t.lineWidth = 2 * c), (t.lineJoin = u || 'round'))
            : ((t.lineWidth = c), (t.lineJoin = u || 'bevel'))
        let p = e.endAngle
        if (o) {
          to(t, e, n, r, p, i)
          for (let e = 0; e < o; ++e) t.stroke()
          isNaN(s) || (p = a + (s % Mt || Mt))
        }
        f &&
          (function (t, e, n) {
            const {
              startAngle: r,
              pixelMargin: i,
              x: o,
              y: a,
              outerRadius: s,
              innerRadius: l,
            } = e
            let c = i / s
            t.beginPath(),
              t.arc(o, a, s, r - c, n + c),
              l > i
                ? ((c = i / l), t.arc(o, a, l, n + c, r - c, !0))
                : t.arc(o, a, i, n + Tt, r - Tt),
              t.closePath(),
              t.clip()
          })(t, e, p),
          o || (to(t, e, n, r, p, i), t.stroke())
      }
      function no(t, e, n = e) {
        ;(t.lineCap = ct(n.borderCapStyle, e.borderCapStyle)),
          t.setLineDash(ct(n.borderDash, e.borderDash)),
          (t.lineDashOffset = ct(n.borderDashOffset, e.borderDashOffset)),
          (t.lineJoin = ct(n.borderJoinStyle, e.borderJoinStyle)),
          (t.lineWidth = ct(n.borderWidth, e.borderWidth)),
          (t.strokeStyle = ct(n.borderColor, e.borderColor))
      }
      function ro(t, e, n) {
        t.lineTo(n.x, n.y)
      }
      function io(t, e, n = {}) {
        const r = t.length,
          { start: i = 0, end: o = r - 1 } = n,
          { start: a, end: s } = e,
          l = Math.max(i, a),
          c = Math.min(o, s),
          u = (i < a && o < a) || (i > s && o > s)
        return {
          count: r,
          start: l,
          loop: e.loop,
          ilen: c < l && !u ? r + c - l : c - l,
        }
      }
      function oo(t, e, n, r) {
        const { points: i, options: o } = e,
          { count: a, start: s, loop: l, ilen: c } = io(i, n, r),
          u = (function (t) {
            return t.stepped
              ? je
              : t.tension || 'monotone' === t.cubicInterpolationMode
                ? ze
                : ro
          })(o)
        let d,
          h,
          f,
          { move: p = !0, reverse: g } = r || {}
        for (d = 0; d <= c; ++d)
          (h = i[(s + (g ? c - d : d)) % a]),
            h.skip ||
              (p ? (t.moveTo(h.x, h.y), (p = !1)) : u(t, f, h, g, o.stepped),
              (f = h))
        return l && ((h = i[(s + (g ? c : 0)) % a]), u(t, f, h, g, o.stepped)), !!l
      }
      function ao(t, e, n, r) {
        const i = e.points,
          { count: o, start: a, ilen: s } = io(i, n, r),
          { move: l = !0, reverse: c } = r || {}
        let u,
          d,
          h,
          f,
          p,
          g,
          m = 0,
          b = 0
        const y = (t) => (a + (c ? s - t : t)) % o,
          v = () => {
            f !== p && (t.lineTo(m, p), t.lineTo(m, f), t.lineTo(m, g))
          }
        for (l && ((d = i[y(0)]), t.moveTo(d.x, d.y)), u = 0; u <= s; ++u) {
          if (((d = i[y(u)]), d.skip)) continue
          const e = d.x,
            n = d.y,
            r = 0 | e
          r === h
            ? (n < f ? (f = n) : n > p && (p = n), (m = (b * m + e) / ++b))
            : (v(), t.lineTo(e, n), (h = r), (b = 0), (f = p = n)),
            (g = n)
        }
        v()
      }
      function so(t) {
        const e = t.options,
          n = e.borderDash && e.borderDash.length
        return !(
          t._decimated ||
          t._loop ||
          e.tension ||
          'monotone' === e.cubicInterpolationMode ||
          e.stepped ||
          n
        )
          ? ao
          : oo
      }
      const lo = 'function' == typeof Path2D
      function co(t, e, n, r) {
        lo && !e.options.segment
          ? (function (t, e, n, r) {
              let i = e._path
              i || ((i = e._path = new Path2D()), e.path(i, n, r) && i.closePath()),
                no(t, e.options),
                t.stroke(i)
            })(t, e, n, r)
          : (function (t, e, n, r) {
              const { segments: i, options: o } = e,
                a = so(e)
              for (const s of i)
                no(t, o, s.style),
                  t.beginPath(),
                  a(t, e, s, { start: n, end: n + r - 1 }) && t.closePath(),
                  t.stroke()
            })(t, e, n, r)
      }
      class uo extends ci {
        static id = 'line'
        static defaults = {
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: 'miter',
          borderWidth: 3,
          capBezierPoints: !0,
          cubicInterpolationMode: 'default',
          fill: !1,
          spanGaps: !1,
          stepped: !1,
          tension: 0,
        }
        static defaultRoutes = {
          backgroundColor: 'backgroundColor',
          borderColor: 'borderColor',
        }
        static descriptors = {
          _scriptable: !0,
          _indexable: (t) => 'borderDash' !== t && 'fill' !== t,
        }
        constructor(t) {
          super(),
            (this.animated = !0),
            (this.options = void 0),
            (this._chart = void 0),
            (this._loop = void 0),
            (this._fullLoop = void 0),
            (this._path = void 0),
            (this._points = void 0),
            (this._segments = void 0),
            (this._decimated = !1),
            (this._pointsUpdated = !1),
            (this._datasetIndex = void 0),
            t && Object.assign(this, t)
        }
        updateControlPoints(t, e) {
          const n = this.options
          if (
            (n.tension || 'monotone' === n.cubicInterpolationMode) &&
            !n.stepped &&
            !this._pointsUpdated
          ) {
            const r = n.spanGaps ? this._loop : this._fullLoop
            xn(this._points, n, t, r, e), (this._pointsUpdated = !0)
          }
        }
        set points(t) {
          ;(this._points = t),
            delete this._segments,
            delete this._path,
            (this._pointsUpdated = !1)
        }
        get points() {
          return this._points
        }
        get segments() {
          return (
            this._segments ||
            (this._segments = (function (t, e) {
              const n = t.points,
                r = t.options.spanGaps,
                i = n.length
              if (!i) return []
              const o = !!t._loop,
                { start: a, end: s } = (function (t, e, n, r) {
                  let i = 0,
                    o = e - 1
                  if (n && !r) for (; i < e && !t[i].skip; ) i++
                  for (; i < e && t[i].skip; ) i++
                  for (i %= e, n && (o += i); o > i && t[o % e].skip; ) o--
                  return (o %= e), { start: i, end: o }
                })(n, i, o, r)
              return Hn(
                t,
                !0 === r
                  ? [{ start: a, end: s, loop: o }]
                  : (function (t, e, n, r) {
                      const i = t.length,
                        o = []
                      let a,
                        s = e,
                        l = t[e]
                      for (a = e + 1; a <= n; ++a) {
                        const n = t[a % i]
                        n.skip || n.stop
                          ? l.skip ||
                            ((r = !1),
                            o.push({ start: e % i, end: (a - 1) % i, loop: r }),
                            (e = s = n.stop ? a : null))
                          : ((s = a), l.skip && (e = a)),
                          (l = n)
                      }
                      return (
                        null !== s && o.push({ start: e % i, end: s % i, loop: r }),
                        o
                      )
                    })(
                      n,
                      a,
                      s < a ? s + i : s,
                      !!t._fullLoop && 0 === a && s === i - 1,
                    ),
                n,
                e,
              )
            })(this, this.options.segment))
          )
        }
        first() {
          const t = this.segments,
            e = this.points
          return t.length && e[t[0].start]
        }
        last() {
          const t = this.segments,
            e = this.points,
            n = t.length
          return n && e[t[n - 1].end]
        }
        interpolate(t, e) {
          const n = this.options,
            r = t[e],
            i = this.points,
            o = Vn(this, { property: e, start: r, end: r })
          if (!o.length) return
          const a = [],
            s = (function (t) {
              return t.stepped
                ? Nn
                : t.tension || 'monotone' === t.cubicInterpolationMode
                  ? jn
                  : An
            })(n)
          let l, c
          for (l = 0, c = o.length; l < c; ++l) {
            const { start: c, end: u } = o[l],
              d = i[c],
              h = i[u]
            if (d === h) {
              a.push(d)
              continue
            }
            const f = s(d, h, Math.abs((r - d[e]) / (h[e] - d[e])), n.stepped)
            ;(f[e] = t[e]), a.push(f)
          }
          return 1 === a.length ? a[0] : a
        }
        pathSegment(t, e, n) {
          return so(this)(t, this, e, n)
        }
        path(t, e, n) {
          const r = this.segments,
            i = so(this)
          let o = this._loop
          ;(e = e || 0), (n = n || this.points.length - e)
          for (const a of r) o &= i(t, this, a, { start: e, end: e + n - 1 })
          return !!o
        }
        draw(t, e, n, r) {
          const i = this.options || {}
          ;(this.points || []).length &&
            i.borderWidth &&
            (t.save(), co(t, this, n, r), t.restore()),
            this.animated && ((this._pointsUpdated = !1), (this._path = void 0))
        }
      }
      function ho(t, e, n, r) {
        const i = t.options,
          { [n]: o } = t.getProps([n], r)
        return Math.abs(e - o) < i.radius + i.hitRadius
      }
      function fo(t, e) {
        const {
          x: n,
          y: r,
          base: i,
          width: o,
          height: a,
        } = t.getProps(['x', 'y', 'base', 'width', 'height'], e)
        let s, l, c, u, d
        return (
          t.horizontal
            ? ((d = a / 2),
              (s = Math.min(n, i)),
              (l = Math.max(n, i)),
              (c = r - d),
              (u = r + d))
            : ((d = o / 2),
              (s = n - d),
              (l = n + d),
              (c = Math.min(r, i)),
              (u = Math.max(r, i))),
          { left: s, top: c, right: l, bottom: u }
        )
      }
      function po(t, e, n, r) {
        return t ? 0 : Qt(e, n, r)
      }
      function go(t) {
        const e = fo(t),
          n = e.right - e.left,
          r = e.bottom - e.top,
          i = (function (t, e, n) {
            const r = t.options.borderWidth,
              i = t.borderSkipped,
              o = qe(r)
            return {
              t: po(i.top, o.top, 0, n),
              r: po(i.right, o.right, 0, e),
              b: po(i.bottom, o.bottom, 0, n),
              l: po(i.left, o.left, 0, e),
            }
          })(t, n / 2, r / 2),
          o = (function (t, e, n) {
            const { enableBorderRadius: r } = t.getProps(['enableBorderRadius']),
              i = t.options.borderRadius,
              o = Qe(i),
              a = Math.min(e, n),
              s = t.borderSkipped,
              l = r || at(i)
            return {
              topLeft: po(!l || s.top || s.left, o.topLeft, 0, a),
              topRight: po(!l || s.top || s.right, o.topRight, 0, a),
              bottomLeft: po(!l || s.bottom || s.left, o.bottomLeft, 0, a),
              bottomRight: po(!l || s.bottom || s.right, o.bottomRight, 0, a),
            }
          })(t, n / 2, r / 2)
        return {
          outer: { x: e.left, y: e.top, w: n, h: r, radius: o },
          inner: {
            x: e.left + i.l,
            y: e.top + i.t,
            w: n - i.l - i.r,
            h: r - i.t - i.b,
            radius: {
              topLeft: Math.max(0, o.topLeft - Math.max(i.t, i.l)),
              topRight: Math.max(0, o.topRight - Math.max(i.t, i.r)),
              bottomLeft: Math.max(0, o.bottomLeft - Math.max(i.b, i.l)),
              bottomRight: Math.max(0, o.bottomRight - Math.max(i.b, i.r)),
            },
          },
        }
      }
      function mo(t, e, n, r) {
        const i = null === e,
          o = null === n,
          a = t && !(i && o) && fo(t, r)
        return a && (i || Xt(e, a.left, a.right)) && (o || Xt(n, a.top, a.bottom))
      }
      function bo(t, e) {
        t.rect(e.x, e.y, e.w, e.h)
      }
      function yo(t, e, n = {}) {
        const r = t.x !== n.x ? -e : 0,
          i = t.y !== n.y ? -e : 0,
          o = (t.x + t.w !== n.x + n.w ? e : 0) - r,
          a = (t.y + t.h !== n.y + n.h ? e : 0) - i
        return { x: t.x + r, y: t.y + i, w: t.w + o, h: t.h + a, radius: t.radius }
      }
      var vo = Object.freeze({
        __proto__: null,
        ArcElement: class extends ci {
          static id = 'arc'
          static defaults = {
            borderAlign: 'center',
            borderColor: '#fff',
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: void 0,
            borderRadius: 0,
            borderWidth: 2,
            offset: 0,
            spacing: 0,
            angle: void 0,
            circular: !0,
          }
          static defaultRoutes = { backgroundColor: 'backgroundColor' }
          static descriptors = {
            _scriptable: !0,
            _indexable: (t) => 'borderDash' !== t,
          }
          circumference
          endAngle
          fullCircles
          innerRadius
          outerRadius
          pixelMargin
          startAngle
          constructor(t) {
            super(),
              (this.options = void 0),
              (this.circumference = void 0),
              (this.startAngle = void 0),
              (this.endAngle = void 0),
              (this.innerRadius = void 0),
              (this.outerRadius = void 0),
              (this.pixelMargin = 0),
              (this.fullCircles = 0),
              t && Object.assign(this, t)
          }
          inRange(t, e, n) {
            const r = this.getProps(['x', 'y'], n),
              { angle: i, distance: o } = Vt(r, { x: t, y: e }),
              {
                startAngle: a,
                endAngle: s,
                innerRadius: l,
                outerRadius: c,
                circumference: u,
              } = this.getProps(
                [
                  'startAngle',
                  'endAngle',
                  'innerRadius',
                  'outerRadius',
                  'circumference',
                ],
                n,
              ),
              d = (this.options.spacing + this.options.borderWidth) / 2,
              h = ct(u, s - a) >= Mt || qt(i, a, s),
              f = Xt(o, l + d, c + d)
            return h && f
          }
          getCenterPoint(t) {
            const {
                x: e,
                y: n,
                startAngle: r,
                endAngle: i,
                innerRadius: o,
                outerRadius: a,
              } = this.getProps(
                ['x', 'y', 'startAngle', 'endAngle', 'innerRadius', 'outerRadius'],
                t,
              ),
              { offset: s, spacing: l } = this.options,
              c = (r + i) / 2,
              u = (o + a + l + s) / 2
            return { x: e + Math.cos(c) * u, y: n + Math.sin(c) * u }
          }
          tooltipPosition(t) {
            return this.getCenterPoint(t)
          }
          draw(t) {
            const { options: e, circumference: n } = this,
              r = (e.offset || 0) / 4,
              i = (e.spacing || 0) / 2,
              o = e.circular
            if (
              ((this.pixelMargin = 'inner' === e.borderAlign ? 0.33 : 0),
              (this.fullCircles = n > Mt ? Math.floor(n / Mt) : 0),
              0 === n || this.innerRadius < 0 || this.outerRadius < 0)
            )
              return
            t.save()
            const a = (this.startAngle + this.endAngle) / 2
            t.translate(Math.cos(a) * r, Math.sin(a) * r)
            const s = r * (1 - Math.sin(Math.min(Ct, n || 0)))
            ;(t.fillStyle = e.backgroundColor),
              (t.strokeStyle = e.borderColor),
              (function (t, e, n, r, i) {
                const { fullCircles: o, startAngle: a, circumference: s } = e
                let l = e.endAngle
                if (o) {
                  to(t, e, n, r, l, i)
                  for (let e = 0; e < o; ++e) t.fill()
                  isNaN(s) || (l = a + (s % Mt || Mt))
                }
                to(t, e, n, r, l, i), t.fill()
              })(t, this, s, i, o),
              eo(t, this, s, i, o),
              t.restore()
          }
        },
        BarElement: class extends ci {
          static id = 'bar'
          static defaults = {
            borderSkipped: 'start',
            borderWidth: 0,
            borderRadius: 0,
            inflateAmount: 'auto',
            pointStyle: void 0,
          }
          static defaultRoutes = {
            backgroundColor: 'backgroundColor',
            borderColor: 'borderColor',
          }
          constructor(t) {
            super(),
              (this.options = void 0),
              (this.horizontal = void 0),
              (this.base = void 0),
              (this.width = void 0),
              (this.height = void 0),
              (this.inflateAmount = void 0),
              t && Object.assign(this, t)
          }
          draw(t) {
            const {
                inflateAmount: e,
                options: { borderColor: n, backgroundColor: r },
              } = this,
              { inner: i, outer: o } = go(this),
              a =
                (s = o.radius).topLeft ||
                s.topRight ||
                s.bottomLeft ||
                s.bottomRight
                  ? Ue
                  : bo
            var s
            t.save(),
              (o.w === i.w && o.h === i.h) ||
                (t.beginPath(),
                a(t, yo(o, e, i)),
                t.clip(),
                a(t, yo(i, -e, o)),
                (t.fillStyle = n),
                t.fill('evenodd')),
              t.beginPath(),
              a(t, yo(i, e)),
              (t.fillStyle = r),
              t.fill(),
              t.restore()
          }
          inRange(t, e, n) {
            return mo(this, t, e, n)
          }
          inXRange(t, e) {
            return mo(this, t, null, e)
          }
          inYRange(t, e) {
            return mo(this, null, t, e)
          }
          getCenterPoint(t) {
            const {
              x: e,
              y: n,
              base: r,
              horizontal: i,
            } = this.getProps(['x', 'y', 'base', 'horizontal'], t)
            return { x: i ? (e + r) / 2 : e, y: i ? n : (n + r) / 2 }
          }
          getRange(t) {
            return 'x' === t ? this.width / 2 : this.height / 2
          }
        },
        LineElement: uo,
        PointElement: class extends ci {
          static id = 'point'
          parsed
          skip
          stop
          static defaults = {
            borderWidth: 1,
            hitRadius: 1,
            hoverBorderWidth: 1,
            hoverRadius: 4,
            pointStyle: 'circle',
            radius: 3,
            rotation: 0,
          }
          static defaultRoutes = {
            backgroundColor: 'backgroundColor',
            borderColor: 'borderColor',
          }
          constructor(t) {
            super(),
              (this.options = void 0),
              (this.parsed = void 0),
              (this.skip = void 0),
              (this.stop = void 0),
              t && Object.assign(this, t)
          }
          inRange(t, e, n) {
            const r = this.options,
              { x: i, y: o } = this.getProps(['x', 'y'], n)
            return (
              Math.pow(t - i, 2) + Math.pow(e - o, 2) <
              Math.pow(r.hitRadius + r.radius, 2)
            )
          }
          inXRange(t, e) {
            return ho(this, t, 'x', e)
          }
          inYRange(t, e) {
            return ho(this, t, 'y', e)
          }
          getCenterPoint(t) {
            const { x: e, y: n } = this.getProps(['x', 'y'], t)
            return { x: e, y: n }
          }
          size(t) {
            let e = (t = t || this.options || {}).radius || 0
            e = Math.max(e, (e && t.hoverRadius) || 0)
            return 2 * (e + ((e && t.borderWidth) || 0))
          }
          draw(t, e) {
            const n = this.options
            this.skip ||
              n.radius < 0.1 ||
              !Le(this, e, this.size(n) / 2) ||
              ((t.strokeStyle = n.borderColor),
              (t.lineWidth = n.borderWidth),
              (t.fillStyle = n.backgroundColor),
              Te(t, n, this.x, this.y))
          }
          getRange() {
            const t = this.options || {}
            return t.radius + t.hitRadius
          }
        },
      })
      const xo = [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        wo = xo.map((t) => t.replace('rgb(', 'rgba(').replace(')', ', 0.5)'))
      function _o(t) {
        return xo[t % xo.length]
      }
      function ko(t) {
        return wo[t % wo.length]
      }
      function So(t) {
        let e = 0
        return (n, r) => {
          const i = t.getDatasetMeta(r).controller
          i instanceof xr
            ? (e = (function (t, e) {
                return (t.backgroundColor = t.data.map(() => _o(e++))), e
              })(n, e))
            : i instanceof wr
              ? (e = (function (t, e) {
                  return (t.backgroundColor = t.data.map(() => ko(e++))), e
                })(n, e))
              : i &&
                (e = (function (t, e) {
                  return (t.borderColor = _o(e)), (t.backgroundColor = ko(e)), ++e
                })(n, e))
        }
      }
      function Eo(t) {
        let e
        for (e in t) if (t[e].borderColor || t[e].backgroundColor) return !0
        return !1
      }
      var Co = {
        id: 'colors',
        defaults: { enabled: !0, forceOverride: !1 },
        beforeLayout(t, e, n) {
          if (!n.enabled) return
          const {
              data: { datasets: r },
              options: i,
            } = t.config,
            { elements: o } = i
          if (
            !n.forceOverride &&
            (Eo(r) ||
              ((a = i) && (a.borderColor || a.backgroundColor)) ||
              (o && Eo(o)))
          )
            return
          var a
          const s = So(t)
          r.forEach(s)
        },
      }
      function Mo(t) {
        if (t._decimated) {
          const e = t._data
          delete t._decimated,
            delete t._data,
            Object.defineProperty(t, 'data', {
              configurable: !0,
              enumerable: !0,
              writable: !0,
              value: e,
            })
        }
      }
      function Po(t) {
        t.data.datasets.forEach((t) => {
          Mo(t)
        })
      }
      var Oo = {
        id: 'decimation',
        defaults: { algorithm: 'min-max', enabled: !1 },
        beforeElementsUpdate: (t, e, n) => {
          if (!n.enabled) return void Po(t)
          const r = t.width
          t.data.datasets.forEach((e, i) => {
            const { _data: o, indexAxis: a } = e,
              s = t.getDatasetMeta(i),
              l = o || e.data
            if ('y' === Ze([a, t.options.indexAxis])) return
            if (!s.controller.supportsDecimation) return
            const c = t.scales[s.xAxisID]
            if ('linear' !== c.type && 'time' !== c.type) return
            if (t.options.parsing) return
            let { start: u, count: d } = (function (t, e) {
              const n = e.length
              let r,
                i = 0
              const { iScale: o } = t,
                { min: a, max: s, minDefined: l, maxDefined: c } = o.getUserBounds()
              return (
                l && (i = Qt(Zt(e, o.axis, a).lo, 0, n - 1)),
                (r = c ? Qt(Zt(e, o.axis, s).hi + 1, i, n) - i : n - i),
                { start: i, count: r }
              )
            })(s, l)
            if (d <= (n.threshold || 4 * r)) return void Mo(e)
            let h
            switch (
              (it(o) &&
                ((e._data = l),
                delete e.data,
                Object.defineProperty(e, 'data', {
                  configurable: !0,
                  enumerable: !0,
                  get: function () {
                    return this._decimated
                  },
                  set: function (t) {
                    this._data = t
                  },
                })),
              n.algorithm)
            ) {
              case 'lttb':
                h = (function (t, e, n, r, i) {
                  const o = i.samples || r
                  if (o >= n) return t.slice(e, e + n)
                  const a = [],
                    s = (n - 2) / (o - 2)
                  let l = 0
                  const c = e + n - 1
                  let u,
                    d,
                    h,
                    f,
                    p,
                    g = e
                  for (a[l++] = t[g], u = 0; u < o - 2; u++) {
                    let r,
                      i = 0,
                      o = 0
                    const c = Math.floor((u + 1) * s) + 1 + e,
                      m = Math.min(Math.floor((u + 2) * s) + 1, n) + e,
                      b = m - c
                    for (r = c; r < m; r++) (i += t[r].x), (o += t[r].y)
                    ;(i /= b), (o /= b)
                    const y = Math.floor(u * s) + 1 + e,
                      v = Math.min(Math.floor((u + 1) * s) + 1, n) + e,
                      { x, y: w } = t[g]
                    for (h = f = -1, r = y; r < v; r++)
                      (f =
                        0.5 *
                        Math.abs((x - i) * (t[r].y - w) - (x - t[r].x) * (o - w))),
                        f > h && ((h = f), (d = t[r]), (p = r))
                    ;(a[l++] = d), (g = p)
                  }
                  return (a[l++] = t[c]), a
                })(l, u, d, r, n)
                break
              case 'min-max':
                h = (function (t, e, n, r) {
                  let i,
                    o,
                    a,
                    s,
                    l,
                    c,
                    u,
                    d,
                    h,
                    f,
                    p = 0,
                    g = 0
                  const m = [],
                    b = e + n - 1,
                    y = t[e].x,
                    v = t[b].x - y
                  for (i = e; i < e + n; ++i) {
                    ;(o = t[i]), (a = ((o.x - y) / v) * r), (s = o.y)
                    const e = 0 | a
                    if (e === l)
                      s < h ? ((h = s), (c = i)) : s > f && ((f = s), (u = i)),
                        (p = (g * p + o.x) / ++g)
                    else {
                      const n = i - 1
                      if (!it(c) && !it(u)) {
                        const e = Math.min(c, u),
                          r = Math.max(c, u)
                        e !== d && e !== n && m.push({ ...t[e], x: p }),
                          r !== d && r !== n && m.push({ ...t[r], x: p })
                      }
                      i > 0 && n !== d && m.push(t[n]),
                        m.push(o),
                        (l = e),
                        (g = 0),
                        (h = f = s),
                        (c = u = d = i)
                    }
                  }
                  return m
                })(l, u, d, r)
                break
              default:
                throw new Error(`Unsupported decimation algorithm '${n.algorithm}'`)
            }
            e._decimated = h
          })
        },
        destroy(t) {
          Po(t)
        },
      }
      function Do(t, e, n, r) {
        if (r) return
        let i = e[t],
          o = n[t]
        return (
          'angle' === t && ((i = Yt(i)), (o = Yt(o))),
          { property: t, start: i, end: o }
        )
      }
      function To(t, e, n) {
        for (; e > t; e--) {
          const t = n[e]
          if (!isNaN(t.x) && !isNaN(t.y)) break
        }
        return e
      }
      function Ro(t, e, n, r) {
        return t && e ? r(t[n], e[n]) : t ? t[n] : e ? e[n] : 0
      }
      function Lo(t, e) {
        let n = [],
          r = !1
        return (
          ot(t)
            ? ((r = !0), (n = t))
            : (n = (function (t, e) {
                const { x: n = null, y: r = null } = t || {},
                  i = e.points,
                  o = []
                return (
                  e.segments.forEach(({ start: t, end: e }) => {
                    e = To(t, e, i)
                    const a = i[t],
                      s = i[e]
                    null !== r
                      ? (o.push({ x: a.x, y: r }), o.push({ x: s.x, y: r }))
                      : null !== n &&
                        (o.push({ x: n, y: a.y }), o.push({ x: n, y: s.y }))
                  }),
                  o
                )
              })(t, e)),
          n.length
            ? new uo({ points: n, options: { tension: 0 }, _loop: r, _fullLoop: r })
            : null
        )
      }
      function Ao(t) {
        return t && !1 !== t.fill
      }
      function No(t, e, n) {
        let r = t[e].fill
        const i = [e]
        let o
        if (!n) return r
        for (; !1 !== r && -1 === i.indexOf(r); ) {
          if (!st(r)) return r
          if (((o = t[r]), !o)) return !1
          if (o.visible) return r
          i.push(r), (r = o.fill)
        }
        return !1
      }
      function jo(t, e, n) {
        const r = (function (t) {
          const e = t.options,
            n = e.fill
          let r = ct(n && n.target, n)
          void 0 === r && (r = !!e.backgroundColor)
          if (!1 === r || null === r) return !1
          if (!0 === r) return 'origin'
          return r
        })(t)
        if (at(r)) return !isNaN(r.value) && r
        let i = parseFloat(r)
        return st(i) && Math.floor(i) === i
          ? (function (t, e, n, r) {
              ;('-' !== t && '+' !== t) || (n = e + n)
              if (n === e || n < 0 || n >= r) return !1
              return n
            })(r[0], e, i, n)
          : ['origin', 'start', 'end', 'stack', 'shape'].indexOf(r) >= 0 && r
      }
      function zo(t, e, n) {
        const r = []
        for (let i = 0; i < n.length; i++) {
          const o = n[i],
            { first: a, last: s, point: l } = Fo(o, e, 'x')
          if (!(!l || (a && s)))
            if (a) r.unshift(l)
            else if ((t.push(l), !s)) break
        }
        t.push(...r)
      }
      function Fo(t, e, n) {
        const r = t.interpolate(e, n)
        if (!r) return {}
        const i = r[n],
          o = t.segments,
          a = t.points
        let s = !1,
          l = !1
        for (let t = 0; t < o.length; t++) {
          const e = o[t],
            r = a[e.start][n],
            c = a[e.end][n]
          if (Xt(i, r, c)) {
            ;(s = i === r), (l = i === c)
            break
          }
        }
        return { first: s, last: l, point: r }
      }
      class Io {
        constructor(t) {
          ;(this.x = t.x), (this.y = t.y), (this.radius = t.radius)
        }
        pathSegment(t, e, n) {
          const { x: r, y: i, radius: o } = this
          return (
            (e = e || { start: 0, end: Mt }),
            t.arc(r, i, o, e.end, e.start, !0),
            !n.bounds
          )
        }
        interpolate(t) {
          const { x: e, y: n, radius: r } = this,
            i = t.angle
          return { x: e + Math.cos(i) * r, y: n + Math.sin(i) * r, angle: i }
        }
      }
      function Bo(t) {
        const { chart: e, fill: n, line: r } = t
        if (st(n))
          return (function (t, e) {
            const n = t.getDatasetMeta(e),
              r = n && t.isDatasetVisible(e)
            return r ? n.dataset : null
          })(e, n)
        if ('stack' === n)
          return (function (t) {
            const { scale: e, index: n, line: r } = t,
              i = [],
              o = r.segments,
              a = r.points,
              s = (function (t, e) {
                const n = [],
                  r = t.getMatchingVisibleMetas('line')
                for (let t = 0; t < r.length; t++) {
                  const i = r[t]
                  if (i.index === e) break
                  i.hidden || n.unshift(i.dataset)
                }
                return n
              })(e, n)
            s.push(Lo({ x: null, y: e.bottom }, r))
            for (let t = 0; t < o.length; t++) {
              const e = o[t]
              for (let t = e.start; t <= e.end; t++) zo(i, a[t], s)
            }
            return new uo({ points: i, options: {} })
          })(t)
        if ('shape' === n) return !0
        const i = (function (t) {
          const e = t.scale || {}
          if (e.getPointPositionForValue)
            return (function (t) {
              const { scale: e, fill: n } = t,
                r = e.options,
                i = e.getLabels().length,
                o = r.reverse ? e.max : e.min,
                a = (function (t, e, n) {
                  let r
                  return (
                    (r =
                      'start' === t
                        ? n
                        : 'end' === t
                          ? e.options.reverse
                            ? e.min
                            : e.max
                          : at(t)
                            ? t.value
                            : e.getBaseValue()),
                    r
                  )
                })(n, e, o),
                s = []
              if (r.grid.circular) {
                const t = e.getPointPositionForValue(0, o)
                return new Io({
                  x: t.x,
                  y: t.y,
                  radius: e.getDistanceFromCenterForValue(a),
                })
              }
              for (let t = 0; t < i; ++t) s.push(e.getPointPositionForValue(t, a))
              return s
            })(t)
          return (function (t) {
            const { scale: e = {}, fill: n } = t,
              r = (function (t, e) {
                let n = null
                return (
                  'start' === t
                    ? (n = e.bottom)
                    : 'end' === t
                      ? (n = e.top)
                      : at(t)
                        ? (n = e.getPixelForValue(t.value))
                        : e.getBasePixel && (n = e.getBasePixel()),
                  n
                )
              })(n, e)
            if (st(r)) {
              const t = e.isHorizontal()
              return { x: t ? r : null, y: t ? null : r }
            }
            return null
          })(t)
        })(t)
        return i instanceof Io ? i : Lo(i, r)
      }
      function Uo(t, e, n) {
        const r = Bo(e),
          { line: i, scale: o, axis: a } = e,
          s = i.options,
          l = s.fill,
          c = s.backgroundColor,
          { above: u = c, below: d = c } = l || {}
        r &&
          i.points.length &&
          (Ae(t, n),
          (function (t, e) {
            const { line: n, target: r, above: i, below: o, area: a, scale: s } = e,
              l = n._loop ? 'angle' : e.axis
            t.save(),
              'x' === l &&
                o !== i &&
                (Wo(t, r, a.top),
                Vo(t, { line: n, target: r, color: i, scale: s, property: l }),
                t.restore(),
                t.save(),
                Wo(t, r, a.bottom))
            Vo(t, { line: n, target: r, color: o, scale: s, property: l }),
              t.restore()
          })(t, {
            line: i,
            target: r,
            above: u,
            below: d,
            area: n,
            scale: o,
            axis: a,
          }),
          Ne(t))
      }
      function Wo(t, e, n) {
        const { segments: r, points: i } = e
        let o = !0,
          a = !1
        t.beginPath()
        for (const s of r) {
          const { start: r, end: l } = s,
            c = i[r],
            u = i[To(r, l, i)]
          o
            ? (t.moveTo(c.x, c.y), (o = !1))
            : (t.lineTo(c.x, n), t.lineTo(c.x, c.y)),
            (a = !!e.pathSegment(t, s, { move: a })),
            a ? t.closePath() : t.lineTo(u.x, n)
        }
        t.lineTo(e.first().x, n), t.closePath(), t.clip()
      }
      function Vo(t, e) {
        const { line: n, target: r, property: i, color: o, scale: a } = e,
          s = (function (t, e, n) {
            const r = t.segments,
              i = t.points,
              o = e.points,
              a = []
            for (const t of r) {
              let { start: r, end: s } = t
              s = To(r, s, i)
              const l = Do(n, i[r], i[s], t.loop)
              if (!e.segments) {
                a.push({ source: t, target: l, start: i[r], end: i[s] })
                continue
              }
              const c = Vn(e, l)
              for (const e of c) {
                const r = Do(n, o[e.start], o[e.end], e.loop),
                  s = Wn(t, i, r)
                for (const t of s)
                  a.push({
                    source: t,
                    target: e,
                    start: { [n]: Ro(l, r, 'start', Math.max) },
                    end: { [n]: Ro(l, r, 'end', Math.min) },
                  })
              }
            }
            return a
          })(n, r, i)
        for (const { source: e, target: l, start: c, end: u } of s) {
          const { style: { backgroundColor: s = o } = {} } = e,
            d = !0 !== r
          t.save(), (t.fillStyle = s), Ho(t, a, d && Do(i, c, u)), t.beginPath()
          const h = !!n.pathSegment(t, e)
          let f
          if (d) {
            h ? t.closePath() : $o(t, r, u, i)
            const e = !!r.pathSegment(t, l, { move: h, reverse: !0 })
            ;(f = h && e), f || $o(t, r, c, i)
          }
          t.closePath(), t.fill(f ? 'evenodd' : 'nonzero'), t.restore()
        }
      }
      function Ho(t, e, n) {
        const { top: r, bottom: i } = e.chart.chartArea,
          { property: o, start: a, end: s } = n || {}
        'x' === o && (t.beginPath(), t.rect(a, r, s - a, i - r), t.clip())
      }
      function $o(t, e, n, r) {
        const i = e.interpolate(n, r)
        i && t.lineTo(i.x, i.y)
      }
      var Yo = {
        id: 'filler',
        afterDatasetsUpdate(t, e, n) {
          const r = (t.data.datasets || []).length,
            i = []
          let o, a, s, l
          for (a = 0; a < r; ++a)
            (o = t.getDatasetMeta(a)),
              (s = o.dataset),
              (l = null),
              s &&
                s.options &&
                s instanceof uo &&
                (l = {
                  visible: t.isDatasetVisible(a),
                  index: a,
                  fill: jo(s, a, r),
                  chart: t,
                  axis: o.controller.options.indexAxis,
                  scale: o.vScale,
                  line: s,
                }),
              (o.$filler = l),
              i.push(l)
          for (a = 0; a < r; ++a)
            (l = i[a]), l && !1 !== l.fill && (l.fill = No(i, a, n.propagate))
        },
        beforeDraw(t, e, n) {
          const r = 'beforeDraw' === n.drawTime,
            i = t.getSortedVisibleDatasetMetas(),
            o = t.chartArea
          for (let e = i.length - 1; e >= 0; --e) {
            const n = i[e].$filler
            n &&
              (n.line.updateControlPoints(o, n.axis),
              r && n.fill && Uo(t.ctx, n, o))
          }
        },
        beforeDatasetsDraw(t, e, n) {
          if ('beforeDatasetsDraw' !== n.drawTime) return
          const r = t.getSortedVisibleDatasetMetas()
          for (let e = r.length - 1; e >= 0; --e) {
            const n = r[e].$filler
            Ao(n) && Uo(t.ctx, n, t.chartArea)
          }
        },
        beforeDatasetDraw(t, e, n) {
          const r = e.meta.$filler
          Ao(r) && 'beforeDatasetDraw' === n.drawTime && Uo(t.ctx, r, t.chartArea)
        },
        defaults: { propagate: !0, drawTime: 'beforeDatasetDraw' },
      }
      const qo = (t, e) => {
        let { boxHeight: n = e, boxWidth: r = e } = t
        return (
          t.usePointStyle &&
            ((n = Math.min(n, e)), (r = t.pointStyleWidth || Math.min(r, e))),
          { boxWidth: r, boxHeight: n, itemHeight: Math.max(e, n) }
        )
      }
      class Qo extends ci {
        constructor(t) {
          super(),
            (this._added = !1),
            (this.legendHitBoxes = []),
            (this._hoveredItem = null),
            (this.doughnutMode = !1),
            (this.chart = t.chart),
            (this.options = t.options),
            (this.ctx = t.ctx),
            (this.legendItems = void 0),
            (this.columnSizes = void 0),
            (this.lineWidths = void 0),
            (this.maxHeight = void 0),
            (this.maxWidth = void 0),
            (this.top = void 0),
            (this.bottom = void 0),
            (this.left = void 0),
            (this.right = void 0),
            (this.height = void 0),
            (this.width = void 0),
            (this._margins = void 0),
            (this.position = void 0),
            (this.weight = void 0),
            (this.fullSize = void 0)
        }
        update(t, e, n) {
          ;(this.maxWidth = t),
            (this.maxHeight = e),
            (this._margins = n),
            this.setDimensions(),
            this.buildLabels(),
            this.fit()
        }
        setDimensions() {
          this.isHorizontal()
            ? ((this.width = this.maxWidth),
              (this.left = this._margins.left),
              (this.right = this.width))
            : ((this.height = this.maxHeight),
              (this.top = this._margins.top),
              (this.bottom = this.height))
        }
        buildLabels() {
          const t = this.options.labels || {}
          let e = dt(t.generateLabels, [this.chart], this) || []
          t.filter && (e = e.filter((e) => t.filter(e, this.chart.data))),
            t.sort && (e = e.sort((e, n) => t.sort(e, n, this.chart.data))),
            this.options.reverse && e.reverse(),
            (this.legendItems = e)
        }
        fit() {
          const { options: t, ctx: e } = this
          if (!t.display) return void (this.width = this.height = 0)
          const n = t.labels,
            r = Ke(n.font),
            i = r.size,
            o = this._computeTitleHeight(),
            { boxWidth: a, itemHeight: s } = qo(n, i)
          let l, c
          ;(e.font = r.string),
            this.isHorizontal()
              ? ((l = this.maxWidth), (c = this._fitRows(o, i, a, s) + 10))
              : ((c = this.maxHeight), (l = this._fitCols(o, r, a, s) + 10)),
            (this.width = Math.min(l, t.maxWidth || this.maxWidth)),
            (this.height = Math.min(c, t.maxHeight || this.maxHeight))
        }
        _fitRows(t, e, n, r) {
          const {
              ctx: i,
              maxWidth: o,
              options: {
                labels: { padding: a },
              },
            } = this,
            s = (this.legendHitBoxes = []),
            l = (this.lineWidths = [0]),
            c = r + a
          let u = t
          ;(i.textAlign = 'left'), (i.textBaseline = 'middle')
          let d = -1,
            h = -c
          return (
            this.legendItems.forEach((t, f) => {
              const p = n + e / 2 + i.measureText(t.text).width
              ;(0 === f || l[l.length - 1] + p + 2 * a > o) &&
                ((u += c), (l[l.length - (f > 0 ? 0 : 1)] = 0), (h += c), d++),
                (s[f] = { left: 0, top: h, row: d, width: p, height: r }),
                (l[l.length - 1] += p + a)
            }),
            u
          )
        }
        _fitCols(t, e, n, r) {
          const {
              ctx: i,
              maxHeight: o,
              options: {
                labels: { padding: a },
              },
            } = this,
            s = (this.legendHitBoxes = []),
            l = (this.columnSizes = []),
            c = o - t
          let u = a,
            d = 0,
            h = 0,
            f = 0,
            p = 0
          return (
            this.legendItems.forEach((t, o) => {
              const { itemWidth: g, itemHeight: m } = (function (t, e, n, r, i) {
                const o = (function (t, e, n, r) {
                    let i = t.text
                    i &&
                      'string' != typeof i &&
                      (i = i.reduce((t, e) => (t.length > e.length ? t : e)))
                    return e + n.size / 2 + r.measureText(i).width
                  })(r, t, e, n),
                  a = (function (t, e, n) {
                    let r = t
                    'string' != typeof e.text && (r = Xo(e, n))
                    return r
                  })(i, r, e.lineHeight)
                return { itemWidth: o, itemHeight: a }
              })(n, e, i, t, r)
              o > 0 &&
                h + m + 2 * a > c &&
                ((u += d + a),
                l.push({ width: d, height: h }),
                (f += d + a),
                p++,
                (d = h = 0)),
                (s[o] = { left: f, top: h, col: p, width: g, height: m }),
                (d = Math.max(d, g)),
                (h += m + a)
            }),
            (u += d),
            l.push({ width: d, height: h }),
            u
          )
        }
        adjustHitBoxes() {
          if (!this.options.display) return
          const t = this._computeTitleHeight(),
            {
              legendHitBoxes: e,
              options: {
                align: n,
                labels: { padding: r },
                rtl: i,
              },
            } = this,
            o = zn(i, this.left, this.width)
          if (this.isHorizontal()) {
            let i = 0,
              a = oe(n, this.left + r, this.right - this.lineWidths[i])
            for (const s of e)
              i !== s.row &&
                ((i = s.row),
                (a = oe(n, this.left + r, this.right - this.lineWidths[i]))),
                (s.top += this.top + t + r),
                (s.left = o.leftForLtr(o.x(a), s.width)),
                (a += s.width + r)
          } else {
            let i = 0,
              a = oe(n, this.top + t + r, this.bottom - this.columnSizes[i].height)
            for (const s of e)
              s.col !== i &&
                ((i = s.col),
                (a = oe(
                  n,
                  this.top + t + r,
                  this.bottom - this.columnSizes[i].height,
                ))),
                (s.top = a),
                (s.left += this.left + r),
                (s.left = o.leftForLtr(o.x(s.left), s.width)),
                (a += s.height + r)
          }
        }
        isHorizontal() {
          return (
            'top' === this.options.position || 'bottom' === this.options.position
          )
        }
        draw() {
          if (this.options.display) {
            const t = this.ctx
            Ae(t, this), this._draw(), Ne(t)
          }
        }
        _draw() {
          const { options: t, columnSizes: e, lineWidths: n, ctx: r } = this,
            { align: i, labels: o } = t,
            a = Ce.color,
            s = zn(t.rtl, this.left, this.width),
            l = Ke(o.font),
            { padding: c } = o,
            u = l.size,
            d = u / 2
          let h
          this.drawTitle(),
            (r.textAlign = s.textAlign('left')),
            (r.textBaseline = 'middle'),
            (r.lineWidth = 0.5),
            (r.font = l.string)
          const { boxWidth: f, boxHeight: p, itemHeight: g } = qo(o, u),
            m = this.isHorizontal(),
            b = this._computeTitleHeight()
          ;(h = m
            ? {
                x: oe(i, this.left + c, this.right - n[0]),
                y: this.top + c + b,
                line: 0,
              }
            : {
                x: this.left + c,
                y: oe(i, this.top + b + c, this.bottom - e[0].height),
                line: 0,
              }),
            Fn(this.ctx, t.textDirection)
          const y = g + c
          this.legendItems.forEach((v, x) => {
            ;(r.strokeStyle = v.fontColor), (r.fillStyle = v.fontColor)
            const w = r.measureText(v.text).width,
              _ = s.textAlign(v.textAlign || (v.textAlign = o.textAlign)),
              k = f + d + w
            let S = h.x,
              E = h.y
            s.setWidth(this.width),
              m
                ? x > 0 &&
                  S + k + c > this.right &&
                  ((E = h.y += y),
                  h.line++,
                  (S = h.x = oe(i, this.left + c, this.right - n[h.line])))
                : x > 0 &&
                  E + y > this.bottom &&
                  ((S = h.x = S + e[h.line].width + c),
                  h.line++,
                  (E = h.y =
                    oe(i, this.top + b + c, this.bottom - e[h.line].height)))
            if (
              ((function (t, e, n) {
                if (isNaN(f) || f <= 0 || isNaN(p) || p < 0) return
                r.save()
                const i = ct(n.lineWidth, 1)
                if (
                  ((r.fillStyle = ct(n.fillStyle, a)),
                  (r.lineCap = ct(n.lineCap, 'butt')),
                  (r.lineDashOffset = ct(n.lineDashOffset, 0)),
                  (r.lineJoin = ct(n.lineJoin, 'miter')),
                  (r.lineWidth = i),
                  (r.strokeStyle = ct(n.strokeStyle, a)),
                  r.setLineDash(ct(n.lineDash, [])),
                  o.usePointStyle)
                ) {
                  const a = {
                      radius: (p * Math.SQRT2) / 2,
                      pointStyle: n.pointStyle,
                      rotation: n.rotation,
                      borderWidth: i,
                    },
                    l = s.xPlus(t, f / 2)
                  Re(r, a, l, e + d, o.pointStyleWidth && f)
                } else {
                  const o = e + Math.max((u - p) / 2, 0),
                    a = s.leftForLtr(t, f),
                    l = Qe(n.borderRadius)
                  r.beginPath(),
                    Object.values(l).some((t) => 0 !== t)
                      ? Ue(r, { x: a, y: o, w: f, h: p, radius: l })
                      : r.rect(a, o, f, p),
                    r.fill(),
                    0 !== i && r.stroke()
                }
                r.restore()
              })(s.x(S), E, v),
              (S = ((t, e, n, r) =>
                t === (r ? 'left' : 'right')
                  ? n
                  : 'center' === t
                    ? (e + n) / 2
                    : e)(_, S + f + d, m ? S + k : this.right, t.rtl)),
              (function (t, e, n) {
                Be(r, n.text, t, e + g / 2, l, {
                  strikethrough: n.hidden,
                  textAlign: s.textAlign(n.textAlign),
                })
              })(s.x(S), E, v),
              m)
            )
              h.x += k + c
            else if ('string' != typeof v.text) {
              const t = l.lineHeight
              h.y += Xo(v, t) + c
            } else h.y += y
          }),
            In(this.ctx, t.textDirection)
        }
        drawTitle() {
          const t = this.options,
            e = t.title,
            n = Ke(e.font),
            r = Xe(e.padding)
          if (!e.display) return
          const i = zn(t.rtl, this.left, this.width),
            o = this.ctx,
            a = e.position,
            s = n.size / 2,
            l = r.top + s
          let c,
            u = this.left,
            d = this.width
          if (this.isHorizontal())
            (d = Math.max(...this.lineWidths)),
              (c = this.top + l),
              (u = oe(t.align, u, this.right - d))
          else {
            const e = this.columnSizes.reduce((t, e) => Math.max(t, e.height), 0)
            c =
              l +
              oe(
                t.align,
                this.top,
                this.bottom - e - t.labels.padding - this._computeTitleHeight(),
              )
          }
          const h = oe(a, u, u + d)
          ;(o.textAlign = i.textAlign(ie(a))),
            (o.textBaseline = 'middle'),
            (o.strokeStyle = e.color),
            (o.fillStyle = e.color),
            (o.font = n.string),
            Be(o, e.text, h, c, n)
        }
        _computeTitleHeight() {
          const t = this.options.title,
            e = Ke(t.font),
            n = Xe(t.padding)
          return t.display ? e.lineHeight + n.height : 0
        }
        _getLegendItemAt(t, e) {
          let n, r, i
          if (Xt(t, this.left, this.right) && Xt(e, this.top, this.bottom))
            for (i = this.legendHitBoxes, n = 0; n < i.length; ++n)
              if (
                ((r = i[n]),
                Xt(t, r.left, r.left + r.width) && Xt(e, r.top, r.top + r.height))
              )
                return this.legendItems[n]
          return null
        }
        handleEvent(t) {
          const e = this.options
          if (
            !(function (t, e) {
              if (
                ('mousemove' === t || 'mouseout' === t) &&
                (e.onHover || e.onLeave)
              )
                return !0
              if (e.onClick && ('click' === t || 'mouseup' === t)) return !0
              return !1
            })(t.type, e)
          )
            return
          const n = this._getLegendItemAt(t.x, t.y)
          if ('mousemove' === t.type || 'mouseout' === t.type) {
            const o = this._hoveredItem,
              a =
                ((i = n),
                null !== (r = o) &&
                  null !== i &&
                  r.datasetIndex === i.datasetIndex &&
                  r.index === i.index)
            o && !a && dt(e.onLeave, [t, o, this], this),
              (this._hoveredItem = n),
              n && !a && dt(e.onHover, [t, n, this], this)
          } else n && dt(e.onClick, [t, n, this], this)
          var r, i
        }
      }
      function Xo(t, e) {
        return e * (t.text ? t.text.length : 0)
      }
      var Ko = {
        id: 'legend',
        _element: Qo,
        start(t, e, n) {
          const r = (t.legend = new Qo({ ctx: t.ctx, options: n, chart: t }))
          $r.configure(t, r, n), $r.addBox(t, r)
        },
        stop(t) {
          $r.removeBox(t, t.legend), delete t.legend
        },
        beforeUpdate(t, e, n) {
          const r = t.legend
          $r.configure(t, r, n), (r.options = n)
        },
        afterUpdate(t) {
          const e = t.legend
          e.buildLabels(), e.adjustHitBoxes()
        },
        afterEvent(t, e) {
          e.replay || t.legend.handleEvent(e.event)
        },
        defaults: {
          display: !0,
          position: 'top',
          align: 'center',
          fullSize: !0,
          reverse: !1,
          weight: 1e3,
          onClick(t, e, n) {
            const r = e.datasetIndex,
              i = n.chart
            i.isDatasetVisible(r)
              ? (i.hide(r), (e.hidden = !0))
              : (i.show(r), (e.hidden = !1))
          },
          onHover: null,
          onLeave: null,
          labels: {
            color: (t) => t.chart.options.color,
            boxWidth: 40,
            padding: 10,
            generateLabels(t) {
              const e = t.data.datasets,
                {
                  labels: {
                    usePointStyle: n,
                    pointStyle: r,
                    textAlign: i,
                    color: o,
                    useBorderRadius: a,
                    borderRadius: s,
                  },
                } = t.legend.options
              return t._getSortedDatasetMetas().map((t) => {
                const l = t.controller.getStyle(n ? 0 : void 0),
                  c = Xe(l.borderWidth)
                return {
                  text: e[t.index].label,
                  fillStyle: l.backgroundColor,
                  fontColor: o,
                  hidden: !t.visible,
                  lineCap: l.borderCapStyle,
                  lineDash: l.borderDash,
                  lineDashOffset: l.borderDashOffset,
                  lineJoin: l.borderJoinStyle,
                  lineWidth: (c.width + c.height) / 4,
                  strokeStyle: l.borderColor,
                  pointStyle: r || l.pointStyle,
                  rotation: l.rotation,
                  textAlign: i || l.textAlign,
                  borderRadius: a && (s || l.borderRadius),
                  datasetIndex: t.index,
                }
              }, this)
            },
          },
          title: {
            color: (t) => t.chart.options.color,
            display: !1,
            position: 'center',
            text: '',
          },
        },
        descriptors: {
          _scriptable: (t) => !t.startsWith('on'),
          labels: {
            _scriptable: (t) => !['generateLabels', 'filter', 'sort'].includes(t),
          },
        },
      }
      class Zo extends ci {
        constructor(t) {
          super(),
            (this.chart = t.chart),
            (this.options = t.options),
            (this.ctx = t.ctx),
            (this._padding = void 0),
            (this.top = void 0),
            (this.bottom = void 0),
            (this.left = void 0),
            (this.right = void 0),
            (this.width = void 0),
            (this.height = void 0),
            (this.position = void 0),
            (this.weight = void 0),
            (this.fullSize = void 0)
        }
        update(t, e) {
          const n = this.options
          if (((this.left = 0), (this.top = 0), !n.display))
            return void (this.width = this.height = this.right = this.bottom = 0)
          ;(this.width = this.right = t), (this.height = this.bottom = e)
          const r = ot(n.text) ? n.text.length : 1
          this._padding = Xe(n.padding)
          const i = r * Ke(n.font).lineHeight + this._padding.height
          this.isHorizontal() ? (this.height = i) : (this.width = i)
        }
        isHorizontal() {
          const t = this.options.position
          return 'top' === t || 'bottom' === t
        }
        _drawArgs(t) {
          const { top: e, left: n, bottom: r, right: i, options: o } = this,
            a = o.align
          let s,
            l,
            c,
            u = 0
          return (
            this.isHorizontal()
              ? ((l = oe(a, n, i)), (c = e + t), (s = i - n))
              : ('left' === o.position
                  ? ((l = n + t), (c = oe(a, r, e)), (u = -0.5 * Ct))
                  : ((l = i - t), (c = oe(a, e, r)), (u = 0.5 * Ct)),
                (s = r - e)),
            { titleX: l, titleY: c, maxWidth: s, rotation: u }
          )
        }
        draw() {
          const t = this.ctx,
            e = this.options
          if (!e.display) return
          const n = Ke(e.font),
            r = n.lineHeight / 2 + this._padding.top,
            { titleX: i, titleY: o, maxWidth: a, rotation: s } = this._drawArgs(r)
          Be(t, e.text, 0, 0, n, {
            color: e.color,
            maxWidth: a,
            rotation: s,
            textAlign: ie(e.align),
            textBaseline: 'middle',
            translation: [i, o],
          })
        }
      }
      var Jo = {
        id: 'title',
        _element: Zo,
        start(t, e, n) {
          !(function (t, e) {
            const n = new Zo({ ctx: t.ctx, options: e, chart: t })
            $r.configure(t, n, e), $r.addBox(t, n), (t.titleBlock = n)
          })(t, n)
        },
        stop(t) {
          const e = t.titleBlock
          $r.removeBox(t, e), delete t.titleBlock
        },
        beforeUpdate(t, e, n) {
          const r = t.titleBlock
          $r.configure(t, r, n), (r.options = n)
        },
        defaults: {
          align: 'center',
          display: !1,
          font: { weight: 'bold' },
          fullSize: !0,
          padding: 10,
          position: 'top',
          text: '',
          weight: 2e3,
        },
        defaultRoutes: { color: 'color' },
        descriptors: { _scriptable: !0, _indexable: !1 },
      }
      const Go = new WeakMap()
      var ta = {
        id: 'subtitle',
        start(t, e, n) {
          const r = new Zo({ ctx: t.ctx, options: n, chart: t })
          $r.configure(t, r, n), $r.addBox(t, r), Go.set(t, r)
        },
        stop(t) {
          $r.removeBox(t, Go.get(t)), Go.delete(t)
        },
        beforeUpdate(t, e, n) {
          const r = Go.get(t)
          $r.configure(t, r, n), (r.options = n)
        },
        defaults: {
          align: 'center',
          display: !1,
          font: { weight: 'normal' },
          fullSize: !0,
          padding: 0,
          position: 'top',
          text: '',
          weight: 1500,
        },
        defaultRoutes: { color: 'color' },
        descriptors: { _scriptable: !0, _indexable: !1 },
      }
      const ea = {
        average(t) {
          if (!t.length) return !1
          let e,
            n,
            r = 0,
            i = 0,
            o = 0
          for (e = 0, n = t.length; e < n; ++e) {
            const n = t[e].element
            if (n && n.hasValue()) {
              const t = n.tooltipPosition()
              ;(r += t.x), (i += t.y), ++o
            }
          }
          return { x: r / o, y: i / o }
        },
        nearest(t, e) {
          if (!t.length) return !1
          let n,
            r,
            i,
            o = e.x,
            a = e.y,
            s = Number.POSITIVE_INFINITY
          for (n = 0, r = t.length; n < r; ++n) {
            const r = t[n].element
            if (r && r.hasValue()) {
              const t = Ht(e, r.getCenterPoint())
              t < s && ((s = t), (i = r))
            }
          }
          if (i) {
            const t = i.tooltipPosition()
            ;(o = t.x), (a = t.y)
          }
          return { x: o, y: a }
        },
      }
      function na(t, e) {
        return e && (ot(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t
      }
      function ra(t) {
        return ('string' == typeof t || t instanceof String) && t.indexOf('\n') > -1
          ? t.split('\n')
          : t
      }
      function ia(t, e) {
        const { element: n, datasetIndex: r, index: i } = e,
          o = t.getDatasetMeta(r).controller,
          { label: a, value: s } = o.getLabelAndValue(i)
        return {
          chart: t,
          label: a,
          parsed: o.getParsed(i),
          raw: t.data.datasets[r].data[i],
          formattedValue: s,
          dataset: o.getDataset(),
          dataIndex: i,
          datasetIndex: r,
          element: n,
        }
      }
      function oa(t, e) {
        const n = t.chart.ctx,
          { body: r, footer: i, title: o } = t,
          { boxWidth: a, boxHeight: s } = e,
          l = Ke(e.bodyFont),
          c = Ke(e.titleFont),
          u = Ke(e.footerFont),
          d = o.length,
          h = i.length,
          f = r.length,
          p = Xe(e.padding)
        let g = p.height,
          m = 0,
          b = r.reduce(
            (t, e) => t + e.before.length + e.lines.length + e.after.length,
            0,
          )
        if (
          ((b += t.beforeBody.length + t.afterBody.length),
          d &&
            (g +=
              d * c.lineHeight + (d - 1) * e.titleSpacing + e.titleMarginBottom),
          b)
        ) {
          g +=
            f * (e.displayColors ? Math.max(s, l.lineHeight) : l.lineHeight) +
            (b - f) * l.lineHeight +
            (b - 1) * e.bodySpacing
        }
        h && (g += e.footerMarginTop + h * u.lineHeight + (h - 1) * e.footerSpacing)
        let y = 0
        const v = function (t) {
          m = Math.max(m, n.measureText(t).width + y)
        }
        return (
          n.save(),
          (n.font = c.string),
          ht(t.title, v),
          (n.font = l.string),
          ht(t.beforeBody.concat(t.afterBody), v),
          (y = e.displayColors ? a + 2 + e.boxPadding : 0),
          ht(r, (t) => {
            ht(t.before, v), ht(t.lines, v), ht(t.after, v)
          }),
          (y = 0),
          (n.font = u.string),
          ht(t.footer, v),
          n.restore(),
          (m += p.width),
          { width: m, height: g }
        )
      }
      function aa(t, e, n, r) {
        const { x: i, width: o } = n,
          {
            width: a,
            chartArea: { left: s, right: l },
          } = t
        let c = 'center'
        return (
          'center' === r
            ? (c = i <= (s + l) / 2 ? 'left' : 'right')
            : i <= o / 2
              ? (c = 'left')
              : i >= a - o / 2 && (c = 'right'),
          (function (t, e, n, r) {
            const { x: i, width: o } = r,
              a = n.caretSize + n.caretPadding
            return (
              ('left' === t && i + o + a > e.width) ||
              ('right' === t && i - o - a < 0) ||
              void 0
            )
          })(c, t, e, n) && (c = 'center'),
          c
        )
      }
      function sa(t, e, n) {
        const r =
          n.yAlign ||
          e.yAlign ||
          (function (t, e) {
            const { y: n, height: r } = e
            return n < r / 2 ? 'top' : n > t.height - r / 2 ? 'bottom' : 'center'
          })(t, n)
        return { xAlign: n.xAlign || e.xAlign || aa(t, e, n, r), yAlign: r }
      }
      function la(t, e, n, r) {
        const { caretSize: i, caretPadding: o, cornerRadius: a } = t,
          { xAlign: s, yAlign: l } = n,
          c = i + o,
          { topLeft: u, topRight: d, bottomLeft: h, bottomRight: f } = Qe(a)
        let p = (function (t, e) {
          let { x: n, width: r } = t
          return 'right' === e ? (n -= r) : 'center' === e && (n -= r / 2), n
        })(e, s)
        const g = (function (t, e, n) {
          let { y: r, height: i } = t
          return 'top' === e ? (r += n) : (r -= 'bottom' === e ? i + n : i / 2), r
        })(e, l, c)
        return (
          'center' === l
            ? 'left' === s
              ? (p += c)
              : 'right' === s && (p -= c)
            : 'left' === s
              ? (p -= Math.max(u, h) + i)
              : 'right' === s && (p += Math.max(d, f) + i),
          { x: Qt(p, 0, r.width - e.width), y: Qt(g, 0, r.height - e.height) }
        )
      }
      function ca(t, e, n) {
        const r = Xe(n.padding)
        return 'center' === e
          ? t.x + t.width / 2
          : 'right' === e
            ? t.x + t.width - r.right
            : t.x + r.left
      }
      function ua(t) {
        return na([], ra(t))
      }
      function da(t, e) {
        const n = e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks
        return n ? t.override(n) : t
      }
      const ha = {
        beforeTitle: nt,
        title(t) {
          if (t.length > 0) {
            const e = t[0],
              n = e.chart.data.labels,
              r = n ? n.length : 0
            if (this && this.options && 'dataset' === this.options.mode)
              return e.dataset.label || ''
            if (e.label) return e.label
            if (r > 0 && e.dataIndex < r) return n[e.dataIndex]
          }
          return ''
        },
        afterTitle: nt,
        beforeBody: nt,
        beforeLabel: nt,
        label(t) {
          if (this && this.options && 'dataset' === this.options.mode)
            return t.label + ': ' + t.formattedValue || t.formattedValue
          let e = t.dataset.label || ''
          e && (e += ': ')
          const n = t.formattedValue
          return it(n) || (e += n), e
        },
        labelColor(t) {
          const e = t.chart
            .getDatasetMeta(t.datasetIndex)
            .controller.getStyle(t.dataIndex)
          return {
            borderColor: e.borderColor,
            backgroundColor: e.backgroundColor,
            borderWidth: e.borderWidth,
            borderDash: e.borderDash,
            borderDashOffset: e.borderDashOffset,
            borderRadius: 0,
          }
        },
        labelTextColor() {
          return this.options.bodyColor
        },
        labelPointStyle(t) {
          const e = t.chart
            .getDatasetMeta(t.datasetIndex)
            .controller.getStyle(t.dataIndex)
          return { pointStyle: e.pointStyle, rotation: e.rotation }
        },
        afterLabel: nt,
        afterBody: nt,
        beforeFooter: nt,
        footer: nt,
        afterFooter: nt,
      }
      function fa(t, e, n, r) {
        const i = t[e].call(n, r)
        return void 0 === i ? ha[e].call(n, r) : i
      }
      class pa extends ci {
        static positioners = ea
        constructor(t) {
          super(),
            (this.opacity = 0),
            (this._active = []),
            (this._eventPosition = void 0),
            (this._size = void 0),
            (this._cachedAnimations = void 0),
            (this._tooltipItems = []),
            (this.$animations = void 0),
            (this.$context = void 0),
            (this.chart = t.chart),
            (this.options = t.options),
            (this.dataPoints = void 0),
            (this.title = void 0),
            (this.beforeBody = void 0),
            (this.body = void 0),
            (this.afterBody = void 0),
            (this.footer = void 0),
            (this.xAlign = void 0),
            (this.yAlign = void 0),
            (this.x = void 0),
            (this.y = void 0),
            (this.height = void 0),
            (this.width = void 0),
            (this.caretX = void 0),
            (this.caretY = void 0),
            (this.labelColors = void 0),
            (this.labelPointStyles = void 0),
            (this.labelTextColors = void 0)
        }
        initialize(t) {
          ;(this.options = t),
            (this._cachedAnimations = void 0),
            (this.$context = void 0)
        }
        _resolveAnimations() {
          const t = this._cachedAnimations
          if (t) return t
          const e = this.chart,
            n = this.options.setContext(this.getContext()),
            r = n.enabled && e.options.animation && n.animations,
            i = new Jn(this.chart, r)
          return r._cacheable && (this._cachedAnimations = Object.freeze(i)), i
        }
        getContext() {
          return (
            this.$context ||
            (this.$context =
              ((t = this.chart.getContext()),
              (e = this),
              (n = this._tooltipItems),
              Je(t, { tooltip: e, tooltipItems: n, type: 'tooltip' })))
          )
          var t, e, n
        }
        getTitle(t, e) {
          const { callbacks: n } = e,
            r = fa(n, 'beforeTitle', this, t),
            i = fa(n, 'title', this, t),
            o = fa(n, 'afterTitle', this, t)
          let a = []
          return (a = na(a, ra(r))), (a = na(a, ra(i))), (a = na(a, ra(o))), a
        }
        getBeforeBody(t, e) {
          return ua(fa(e.callbacks, 'beforeBody', this, t))
        }
        getBody(t, e) {
          const { callbacks: n } = e,
            r = []
          return (
            ht(t, (t) => {
              const e = { before: [], lines: [], after: [] },
                i = da(n, t)
              na(e.before, ra(fa(i, 'beforeLabel', this, t))),
                na(e.lines, fa(i, 'label', this, t)),
                na(e.after, ra(fa(i, 'afterLabel', this, t))),
                r.push(e)
            }),
            r
          )
        }
        getAfterBody(t, e) {
          return ua(fa(e.callbacks, 'afterBody', this, t))
        }
        getFooter(t, e) {
          const { callbacks: n } = e,
            r = fa(n, 'beforeFooter', this, t),
            i = fa(n, 'footer', this, t),
            o = fa(n, 'afterFooter', this, t)
          let a = []
          return (a = na(a, ra(r))), (a = na(a, ra(i))), (a = na(a, ra(o))), a
        }
        _createItems(t) {
          const e = this._active,
            n = this.chart.data,
            r = [],
            i = [],
            o = []
          let a,
            s,
            l = []
          for (a = 0, s = e.length; a < s; ++a) l.push(ia(this.chart, e[a]))
          return (
            t.filter && (l = l.filter((e, r, i) => t.filter(e, r, i, n))),
            t.itemSort && (l = l.sort((e, r) => t.itemSort(e, r, n))),
            ht(l, (e) => {
              const n = da(t.callbacks, e)
              r.push(fa(n, 'labelColor', this, e)),
                i.push(fa(n, 'labelPointStyle', this, e)),
                o.push(fa(n, 'labelTextColor', this, e))
            }),
            (this.labelColors = r),
            (this.labelPointStyles = i),
            (this.labelTextColors = o),
            (this.dataPoints = l),
            l
          )
        }
        update(t, e) {
          const n = this.options.setContext(this.getContext()),
            r = this._active
          let i,
            o = []
          if (r.length) {
            const t = ea[n.position].call(this, r, this._eventPosition)
            ;(o = this._createItems(n)),
              (this.title = this.getTitle(o, n)),
              (this.beforeBody = this.getBeforeBody(o, n)),
              (this.body = this.getBody(o, n)),
              (this.afterBody = this.getAfterBody(o, n)),
              (this.footer = this.getFooter(o, n))
            const e = (this._size = oa(this, n)),
              a = Object.assign({}, t, e),
              s = sa(this.chart, n, a),
              l = la(n, a, s, this.chart)
            ;(this.xAlign = s.xAlign),
              (this.yAlign = s.yAlign),
              (i = {
                opacity: 1,
                x: l.x,
                y: l.y,
                width: e.width,
                height: e.height,
                caretX: t.x,
                caretY: t.y,
              })
          } else 0 !== this.opacity && (i = { opacity: 0 })
          ;(this._tooltipItems = o),
            (this.$context = void 0),
            i && this._resolveAnimations().update(this, i),
            t &&
              n.external &&
              n.external.call(this, { chart: this.chart, tooltip: this, replay: e })
        }
        drawCaret(t, e, n, r) {
          const i = this.getCaretPosition(t, n, r)
          e.lineTo(i.x1, i.y1), e.lineTo(i.x2, i.y2), e.lineTo(i.x3, i.y3)
        }
        getCaretPosition(t, e, n) {
          const { xAlign: r, yAlign: i } = this,
            { caretSize: o, cornerRadius: a } = n,
            { topLeft: s, topRight: l, bottomLeft: c, bottomRight: u } = Qe(a),
            { x: d, y: h } = t,
            { width: f, height: p } = e
          let g, m, b, y, v, x
          return (
            'center' === i
              ? ((v = h + p / 2),
                'left' === r
                  ? ((g = d), (m = g - o), (y = v + o), (x = v - o))
                  : ((g = d + f), (m = g + o), (y = v - o), (x = v + o)),
                (b = g))
              : ((m =
                  'left' === r
                    ? d + Math.max(s, c) + o
                    : 'right' === r
                      ? d + f - Math.max(l, u) - o
                      : this.caretX),
                'top' === i
                  ? ((y = h), (v = y - o), (g = m - o), (b = m + o))
                  : ((y = h + p), (v = y + o), (g = m + o), (b = m - o)),
                (x = y)),
            { x1: g, x2: m, x3: b, y1: y, y2: v, y3: x }
          )
        }
        drawTitle(t, e, n) {
          const r = this.title,
            i = r.length
          let o, a, s
          if (i) {
            const l = zn(n.rtl, this.x, this.width)
            for (
              t.x = ca(this, n.titleAlign, n),
                e.textAlign = l.textAlign(n.titleAlign),
                e.textBaseline = 'middle',
                o = Ke(n.titleFont),
                a = n.titleSpacing,
                e.fillStyle = n.titleColor,
                e.font = o.string,
                s = 0;
              s < i;
              ++s
            )
              e.fillText(r[s], l.x(t.x), t.y + o.lineHeight / 2),
                (t.y += o.lineHeight + a),
                s + 1 === i && (t.y += n.titleMarginBottom - a)
          }
        }
        _drawColorBox(t, e, n, r, i) {
          const o = this.labelColors[n],
            a = this.labelPointStyles[n],
            { boxHeight: s, boxWidth: l } = i,
            c = Ke(i.bodyFont),
            u = ca(this, 'left', i),
            d = r.x(u),
            h = s < c.lineHeight ? (c.lineHeight - s) / 2 : 0,
            f = e.y + h
          if (i.usePointStyle) {
            const e = {
                radius: Math.min(l, s) / 2,
                pointStyle: a.pointStyle,
                rotation: a.rotation,
                borderWidth: 1,
              },
              n = r.leftForLtr(d, l) + l / 2,
              c = f + s / 2
            ;(t.strokeStyle = i.multiKeyBackground),
              (t.fillStyle = i.multiKeyBackground),
              Te(t, e, n, c),
              (t.strokeStyle = o.borderColor),
              (t.fillStyle = o.backgroundColor),
              Te(t, e, n, c)
          } else {
            ;(t.lineWidth = at(o.borderWidth)
              ? Math.max(...Object.values(o.borderWidth))
              : o.borderWidth || 1),
              (t.strokeStyle = o.borderColor),
              t.setLineDash(o.borderDash || []),
              (t.lineDashOffset = o.borderDashOffset || 0)
            const e = r.leftForLtr(d, l),
              n = r.leftForLtr(r.xPlus(d, 1), l - 2),
              a = Qe(o.borderRadius)
            Object.values(a).some((t) => 0 !== t)
              ? (t.beginPath(),
                (t.fillStyle = i.multiKeyBackground),
                Ue(t, { x: e, y: f, w: l, h: s, radius: a }),
                t.fill(),
                t.stroke(),
                (t.fillStyle = o.backgroundColor),
                t.beginPath(),
                Ue(t, { x: n, y: f + 1, w: l - 2, h: s - 2, radius: a }),
                t.fill())
              : ((t.fillStyle = i.multiKeyBackground),
                t.fillRect(e, f, l, s),
                t.strokeRect(e, f, l, s),
                (t.fillStyle = o.backgroundColor),
                t.fillRect(n, f + 1, l - 2, s - 2))
          }
          t.fillStyle = this.labelTextColors[n]
        }
        drawBody(t, e, n) {
          const { body: r } = this,
            {
              bodySpacing: i,
              bodyAlign: o,
              displayColors: a,
              boxHeight: s,
              boxWidth: l,
              boxPadding: c,
            } = n,
            u = Ke(n.bodyFont)
          let d = u.lineHeight,
            h = 0
          const f = zn(n.rtl, this.x, this.width),
            p = function (n) {
              e.fillText(n, f.x(t.x + h), t.y + d / 2), (t.y += d + i)
            },
            g = f.textAlign(o)
          let m, b, y, v, x, w, _
          for (
            e.textAlign = o,
              e.textBaseline = 'middle',
              e.font = u.string,
              t.x = ca(this, g, n),
              e.fillStyle = n.bodyColor,
              ht(this.beforeBody, p),
              h = a && 'right' !== g ? ('center' === o ? l / 2 + c : l + 2 + c) : 0,
              v = 0,
              w = r.length;
            v < w;
            ++v
          ) {
            for (
              m = r[v],
                b = this.labelTextColors[v],
                e.fillStyle = b,
                ht(m.before, p),
                y = m.lines,
                a &&
                  y.length &&
                  (this._drawColorBox(e, t, v, f, n),
                  (d = Math.max(u.lineHeight, s))),
                x = 0,
                _ = y.length;
              x < _;
              ++x
            )
              p(y[x]), (d = u.lineHeight)
            ht(m.after, p)
          }
          ;(h = 0), (d = u.lineHeight), ht(this.afterBody, p), (t.y -= i)
        }
        drawFooter(t, e, n) {
          const r = this.footer,
            i = r.length
          let o, a
          if (i) {
            const s = zn(n.rtl, this.x, this.width)
            for (
              t.x = ca(this, n.footerAlign, n),
                t.y += n.footerMarginTop,
                e.textAlign = s.textAlign(n.footerAlign),
                e.textBaseline = 'middle',
                o = Ke(n.footerFont),
                e.fillStyle = n.footerColor,
                e.font = o.string,
                a = 0;
              a < i;
              ++a
            )
              e.fillText(r[a], s.x(t.x), t.y + o.lineHeight / 2),
                (t.y += o.lineHeight + n.footerSpacing)
          }
        }
        drawBackground(t, e, n, r) {
          const { xAlign: i, yAlign: o } = this,
            { x: a, y: s } = t,
            { width: l, height: c } = n,
            {
              topLeft: u,
              topRight: d,
              bottomLeft: h,
              bottomRight: f,
            } = Qe(r.cornerRadius)
          ;(e.fillStyle = r.backgroundColor),
            (e.strokeStyle = r.borderColor),
            (e.lineWidth = r.borderWidth),
            e.beginPath(),
            e.moveTo(a + u, s),
            'top' === o && this.drawCaret(t, e, n, r),
            e.lineTo(a + l - d, s),
            e.quadraticCurveTo(a + l, s, a + l, s + d),
            'center' === o && 'right' === i && this.drawCaret(t, e, n, r),
            e.lineTo(a + l, s + c - f),
            e.quadraticCurveTo(a + l, s + c, a + l - f, s + c),
            'bottom' === o && this.drawCaret(t, e, n, r),
            e.lineTo(a + h, s + c),
            e.quadraticCurveTo(a, s + c, a, s + c - h),
            'center' === o && 'left' === i && this.drawCaret(t, e, n, r),
            e.lineTo(a, s + u),
            e.quadraticCurveTo(a, s, a + u, s),
            e.closePath(),
            e.fill(),
            r.borderWidth > 0 && e.stroke()
        }
        _updateAnimationTarget(t) {
          const e = this.chart,
            n = this.$animations,
            r = n && n.x,
            i = n && n.y
          if (r || i) {
            const n = ea[t.position].call(this, this._active, this._eventPosition)
            if (!n) return
            const o = (this._size = oa(this, t)),
              a = Object.assign({}, n, this._size),
              s = sa(e, t, a),
              l = la(t, a, s, e)
            ;(r._to === l.x && i._to === l.y) ||
              ((this.xAlign = s.xAlign),
              (this.yAlign = s.yAlign),
              (this.width = o.width),
              (this.height = o.height),
              (this.caretX = n.x),
              (this.caretY = n.y),
              this._resolveAnimations().update(this, l))
          }
        }
        _willRender() {
          return !!this.opacity
        }
        draw(t) {
          const e = this.options.setContext(this.getContext())
          let n = this.opacity
          if (!n) return
          this._updateAnimationTarget(e)
          const r = { width: this.width, height: this.height },
            i = { x: this.x, y: this.y }
          n = Math.abs(n) < 0.001 ? 0 : n
          const o = Xe(e.padding),
            a =
              this.title.length ||
              this.beforeBody.length ||
              this.body.length ||
              this.afterBody.length ||
              this.footer.length
          e.enabled &&
            a &&
            (t.save(),
            (t.globalAlpha = n),
            this.drawBackground(i, t, r, e),
            Fn(t, e.textDirection),
            (i.y += o.top),
            this.drawTitle(i, t, e),
            this.drawBody(i, t, e),
            this.drawFooter(i, t, e),
            In(t, e.textDirection),
            t.restore())
        }
        getActiveElements() {
          return this._active || []
        }
        setActiveElements(t, e) {
          const n = this._active,
            r = t.map(({ datasetIndex: t, index: e }) => {
              const n = this.chart.getDatasetMeta(t)
              if (!n) throw new Error('Cannot find a dataset at index ' + t)
              return { datasetIndex: t, element: n.data[e], index: e }
            }),
            i = !ft(n, r),
            o = this._positionChanged(r, e)
          ;(i || o) &&
            ((this._active = r),
            (this._eventPosition = e),
            (this._ignoreReplayEvents = !0),
            this.update(!0))
        }
        handleEvent(t, e, n = !0) {
          if (e && this._ignoreReplayEvents) return !1
          this._ignoreReplayEvents = !1
          const r = this.options,
            i = this._active || [],
            o = this._getActiveElements(t, i, e, n),
            a = this._positionChanged(o, t),
            s = e || !ft(o, i) || a
          return (
            s &&
              ((this._active = o),
              (r.enabled || r.external) &&
                ((this._eventPosition = { x: t.x, y: t.y }), this.update(!0, e))),
            s
          )
        }
        _getActiveElements(t, e, n, r) {
          const i = this.options
          if ('mouseout' === t.type) return []
          if (!r)
            return e.filter(
              (t) =>
                this.chart.data.datasets[t.datasetIndex] &&
                void 0 !==
                  this.chart
                    .getDatasetMeta(t.datasetIndex)
                    .controller.getParsed(t.index),
            )
          const o = this.chart.getElementsAtEventForMode(t, i.mode, i, n)
          return i.reverse && o.reverse(), o
        }
        _positionChanged(t, e) {
          const { caretX: n, caretY: r, options: i } = this,
            o = ea[i.position].call(this, t, e)
          return !1 !== o && (n !== o.x || r !== o.y)
        }
      }
      var ga = {
          id: 'tooltip',
          _element: pa,
          positioners: ea,
          afterInit(t, e, n) {
            n && (t.tooltip = new pa({ chart: t, options: n }))
          },
          beforeUpdate(t, e, n) {
            t.tooltip && t.tooltip.initialize(n)
          },
          reset(t, e, n) {
            t.tooltip && t.tooltip.initialize(n)
          },
          afterDraw(t) {
            const e = t.tooltip
            if (e && e._willRender()) {
              const n = { tooltip: e }
              if (
                !1 ===
                t.notifyPlugins('beforeTooltipDraw', { ...n, cancelable: !0 })
              )
                return
              e.draw(t.ctx), t.notifyPlugins('afterTooltipDraw', n)
            }
          },
          afterEvent(t, e) {
            if (t.tooltip) {
              const n = e.replay
              t.tooltip.handleEvent(e.event, n, e.inChartArea) && (e.changed = !0)
            }
          },
          defaults: {
            enabled: !0,
            external: null,
            position: 'average',
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleColor: '#fff',
            titleFont: { weight: 'bold' },
            titleSpacing: 2,
            titleMarginBottom: 6,
            titleAlign: 'left',
            bodyColor: '#fff',
            bodySpacing: 2,
            bodyFont: {},
            bodyAlign: 'left',
            footerColor: '#fff',
            footerSpacing: 2,
            footerMarginTop: 6,
            footerFont: { weight: 'bold' },
            footerAlign: 'left',
            padding: 6,
            caretPadding: 2,
            caretSize: 5,
            cornerRadius: 6,
            boxHeight: (t, e) => e.bodyFont.size,
            boxWidth: (t, e) => e.bodyFont.size,
            multiKeyBackground: '#fff',
            displayColors: !0,
            boxPadding: 0,
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 0,
            animation: { duration: 400, easing: 'easeOutQuart' },
            animations: {
              numbers: {
                type: 'number',
                properties: ['x', 'y', 'width', 'height', 'caretX', 'caretY'],
              },
              opacity: { easing: 'linear', duration: 200 },
            },
            callbacks: ha,
          },
          defaultRoutes: {
            bodyFont: 'font',
            footerFont: 'font',
            titleFont: 'font',
          },
          descriptors: {
            _scriptable: (t) =>
              'filter' !== t && 'itemSort' !== t && 'external' !== t,
            _indexable: !1,
            callbacks: { _scriptable: !1, _indexable: !1 },
            animation: { _fallback: !1 },
            animations: { _fallback: 'animation' },
          },
          additionalOptionScopes: ['interaction'],
        },
        ma = Object.freeze({
          __proto__: null,
          Colors: Co,
          Decimation: Oo,
          Filler: Yo,
          Legend: Ko,
          SubTitle: ta,
          Title: Jo,
          Tooltip: ga,
        })
      function ba(t, e, n, r) {
        const i = t.indexOf(e)
        if (-1 === i)
          return ((t, e, n, r) => (
            'string' == typeof e
              ? ((n = t.push(e) - 1), r.unshift({ index: n, label: e }))
              : isNaN(e) && (n = null),
            n
          ))(t, e, n, r)
        return i !== t.lastIndexOf(e) ? n : i
      }
      function ya(t) {
        const e = this.getLabels()
        return t >= 0 && t < e.length ? e[t] : t
      }
      class va extends vi {
        static id = 'category'
        static defaults = { ticks: { callback: ya } }
        constructor(t) {
          super(t),
            (this._startValue = void 0),
            (this._valueRange = 0),
            (this._addedLabels = [])
        }
        init(t) {
          const e = this._addedLabels
          if (e.length) {
            const t = this.getLabels()
            for (const { index: n, label: r } of e) t[n] === r && t.splice(n, 1)
            this._addedLabels = []
          }
          super.init(t)
        }
        parse(t, e) {
          if (it(t)) return null
          const n = this.getLabels()
          return ((t, e) => (null === t ? null : Qt(Math.round(t), 0, e)))(
            (e =
              isFinite(e) && n[e] === t
                ? e
                : ba(n, t, ct(e, t), this._addedLabels)),
            n.length - 1,
          )
        }
        determineDataLimits() {
          const { minDefined: t, maxDefined: e } = this.getUserBounds()
          let { min: n, max: r } = this.getMinMax(!0)
          'ticks' === this.options.bounds &&
            (t || (n = 0), e || (r = this.getLabels().length - 1)),
            (this.min = n),
            (this.max = r)
        }
        buildTicks() {
          const t = this.min,
            e = this.max,
            n = this.options.offset,
            r = []
          let i = this.getLabels()
          ;(i = 0 === t && e === i.length - 1 ? i : i.slice(t, e + 1)),
            (this._valueRange = Math.max(i.length - (n ? 0 : 1), 1)),
            (this._startValue = this.min - (n ? 0.5 : 0))
          for (let n = t; n <= e; n++) r.push({ value: n })
          return r
        }
        getLabelForValue(t) {
          return ya.call(this, t)
        }
        configure() {
          super.configure(),
            this.isHorizontal() || (this._reversePixels = !this._reversePixels)
        }
        getPixelForValue(t) {
          return (
            'number' != typeof t && (t = this.parse(t)),
            null === t
              ? NaN
              : this.getPixelForDecimal((t - this._startValue) / this._valueRange)
          )
        }
        getPixelForTick(t) {
          const e = this.ticks
          return t < 0 || t > e.length - 1
            ? null
            : this.getPixelForValue(e[t].value)
        }
        getValueForPixel(t) {
          return Math.round(
            this._startValue + this.getDecimalForPixel(t) * this._valueRange,
          )
        }
        getBasePixel() {
          return this.bottom
        }
      }
      function xa(t, e) {
        const n = [],
          {
            bounds: r,
            step: i,
            min: o,
            max: a,
            precision: s,
            count: l,
            maxTicks: c,
            maxDigits: u,
            includeBounds: d,
          } = t,
          h = i || 1,
          f = c - 1,
          { min: p, max: g } = e,
          m = !it(o),
          b = !it(a),
          y = !it(l),
          v = (g - p) / (u + 1)
        let x,
          w,
          _,
          k,
          S = zt((g - p) / f / h) * h
        if (S < 1e-14 && !m && !b) return [{ value: p }, { value: g }]
        ;(k = Math.ceil(g / S) - Math.floor(p / S)),
          k > f && (S = zt((k * S) / f / h) * h),
          it(s) || ((x = Math.pow(10, s)), (S = Math.ceil(S * x) / x)),
          'ticks' === r
            ? ((w = Math.floor(p / S) * S), (_ = Math.ceil(g / S) * S))
            : ((w = p), (_ = g)),
          m &&
          b &&
          i &&
          (function (t, e) {
            const n = Math.round(t)
            return n - e <= t && n + e >= t
          })((a - o) / i, S / 1e3)
            ? ((k = Math.round(Math.min((a - o) / S, c))),
              (S = (a - o) / k),
              (w = o),
              (_ = a))
            : y
              ? ((w = m ? o : w), (_ = b ? a : _), (k = l - 1), (S = (_ - w) / k))
              : ((k = (_ - w) / S),
                (k = jt(k, Math.round(k), S / 1e3) ? Math.round(k) : Math.ceil(k)))
        const E = Math.max(Wt(S), Wt(w))
        ;(x = Math.pow(10, it(s) ? E : s)),
          (w = Math.round(w * x) / x),
          (_ = Math.round(_ * x) / x)
        let C = 0
        for (
          m &&
          (d && w !== o
            ? (n.push({ value: o }),
              w < o && C++,
              jt(Math.round((w + C * S) * x) / x, o, wa(o, v, t)) && C++)
            : w < o && C++);
          C < k;
          ++C
        ) {
          const t = Math.round((w + C * S) * x) / x
          if (b && t > a) break
          n.push({ value: t })
        }
        return (
          b && d && _ !== a
            ? n.length && jt(n[n.length - 1].value, a, wa(a, v, t))
              ? (n[n.length - 1].value = a)
              : n.push({ value: a })
            : (b && _ !== a) || n.push({ value: _ }),
          n
        )
      }
      function wa(t, e, { horizontal: n, minRotation: r }) {
        const i = Bt(r),
          o = (n ? Math.sin(i) : Math.cos(i)) || 0.001,
          a = 0.75 * e * ('' + t).length
        return Math.min(e / o, a)
      }
      class _a extends vi {
        constructor(t) {
          super(t),
            (this.start = void 0),
            (this.end = void 0),
            (this._startValue = void 0),
            (this._endValue = void 0),
            (this._valueRange = 0)
        }
        parse(t, e) {
          return it(t) ||
            (('number' == typeof t || t instanceof Number) && !isFinite(+t))
            ? null
            : +t
        }
        handleTickRangeOptions() {
          const { beginAtZero: t } = this.options,
            { minDefined: e, maxDefined: n } = this.getUserBounds()
          let { min: r, max: i } = this
          const o = (t) => (r = e ? r : t),
            a = (t) => (i = n ? i : t)
          if (t) {
            const t = Nt(r),
              e = Nt(i)
            t < 0 && e < 0 ? a(0) : t > 0 && e > 0 && o(0)
          }
          if (r === i) {
            let e = 0 === i ? 1 : Math.abs(0.05 * i)
            a(i + e), t || o(r - e)
          }
          ;(this.min = r), (this.max = i)
        }
        getTickLimit() {
          const t = this.options.ticks
          let e,
            { maxTicksLimit: n, stepSize: r } = t
          return (
            r
              ? ((e = Math.ceil(this.max / r) - Math.floor(this.min / r) + 1),
                e > 1e3 &&
                  (console.warn(
                    `scales.${this.id}.ticks.stepSize: ${r} would result generating up to ${e} ticks. Limiting to 1000.`,
                  ),
                  (e = 1e3)))
              : ((e = this.computeTickLimit()), (n = n || 11)),
            n && (e = Math.min(n, e)),
            e
          )
        }
        computeTickLimit() {
          return Number.POSITIVE_INFINITY
        }
        buildTicks() {
          const t = this.options,
            e = t.ticks
          let n = this.getTickLimit()
          n = Math.max(2, n)
          const r = xa(
            {
              maxTicks: n,
              bounds: t.bounds,
              min: t.min,
              max: t.max,
              precision: e.precision,
              step: e.stepSize,
              count: e.count,
              maxDigits: this._maxDigits(),
              horizontal: this.isHorizontal(),
              minRotation: e.minRotation || 0,
              includeBounds: !1 !== e.includeBounds,
            },
            this._range || this,
          )
          return (
            'ticks' === t.bounds && It(r, this, 'value'),
            t.reverse
              ? (r.reverse(), (this.start = this.max), (this.end = this.min))
              : ((this.start = this.min), (this.end = this.max)),
            r
          )
        }
        configure() {
          const t = this.ticks
          let e = this.min,
            n = this.max
          if ((super.configure(), this.options.offset && t.length)) {
            const r = (n - e) / Math.max(t.length - 1, 1) / 2
            ;(e -= r), (n += r)
          }
          ;(this._startValue = e), (this._endValue = n), (this._valueRange = n - e)
        }
        getLabelForValue(t) {
          return ye(t, this.chart.options.locale, this.options.ticks.format)
        }
      }
      class ka extends _a {
        static id = 'linear'
        static defaults = { ticks: { callback: xe.formatters.numeric } }
        determineDataLimits() {
          const { min: t, max: e } = this.getMinMax(!0)
          ;(this.min = st(t) ? t : 0),
            (this.max = st(e) ? e : 1),
            this.handleTickRangeOptions()
        }
        computeTickLimit() {
          const t = this.isHorizontal(),
            e = t ? this.width : this.height,
            n = Bt(this.options.ticks.minRotation),
            r = (t ? Math.sin(n) : Math.cos(n)) || 0.001,
            i = this._resolveTickFontOptions(0)
          return Math.ceil(e / Math.min(40, i.lineHeight / r))
        }
        getPixelForValue(t) {
          return null === t
            ? NaN
            : this.getPixelForDecimal((t - this._startValue) / this._valueRange)
        }
        getValueForPixel(t) {
          return this._startValue + this.getDecimalForPixel(t) * this._valueRange
        }
      }
      const Sa = (t) => Math.floor(At(t)),
        Ea = (t, e) => Math.pow(10, Sa(t) + e)
      function Ca(t) {
        return 1 === t / Math.pow(10, Sa(t))
      }
      function Ma(t, e, n) {
        const r = Math.pow(10, n),
          i = Math.floor(t / r)
        return Math.ceil(e / r) - i
      }
      function Pa(t, { min: e, max: n }) {
        e = lt(t.min, e)
        const r = [],
          i = Sa(e)
        let o = (function (t, e) {
            let n = Sa(e - t)
            for (; Ma(t, e, n) > 10; ) n++
            for (; Ma(t, e, n) < 10; ) n--
            return Math.min(n, Sa(t))
          })(e, n),
          a = o < 0 ? Math.pow(10, Math.abs(o)) : 1
        const s = Math.pow(10, o),
          l = i > o ? Math.pow(10, i) : 0,
          c = Math.round((e - l) * a) / a,
          u = Math.floor((e - l) / s / 10) * s * 10
        let d = Math.floor((c - u) / Math.pow(10, o)),
          h = lt(t.min, Math.round((l + u + d * Math.pow(10, o)) * a) / a)
        for (; h < n; )
          r.push({ value: h, major: Ca(h), significand: d }),
            d >= 10 ? (d = d < 15 ? 15 : 20) : d++,
            d >= 20 && (o++, (d = 2), (a = o >= 0 ? 1 : a)),
            (h = Math.round((l + u + d * Math.pow(10, o)) * a) / a)
        const f = lt(t.max, h)
        return r.push({ value: f, major: Ca(f), significand: d }), r
      }
      class Oa extends vi {
        static id = 'logarithmic'
        static defaults = {
          ticks: { callback: xe.formatters.logarithmic, major: { enabled: !0 } },
        }
        constructor(t) {
          super(t),
            (this.start = void 0),
            (this.end = void 0),
            (this._startValue = void 0),
            (this._valueRange = 0)
        }
        parse(t, e) {
          const n = _a.prototype.parse.apply(this, [t, e])
          if (0 !== n) return st(n) && n > 0 ? n : null
          this._zero = !0
        }
        determineDataLimits() {
          const { min: t, max: e } = this.getMinMax(!0)
          ;(this.min = st(t) ? Math.max(0, t) : null),
            (this.max = st(e) ? Math.max(0, e) : null),
            this.options.beginAtZero && (this._zero = !0),
            this._zero &&
              this.min !== this._suggestedMin &&
              !st(this._userMin) &&
              (this.min =
                t === Ea(this.min, 0) ? Ea(this.min, -1) : Ea(this.min, 0)),
            this.handleTickRangeOptions()
        }
        handleTickRangeOptions() {
          const { minDefined: t, maxDefined: e } = this.getUserBounds()
          let n = this.min,
            r = this.max
          const i = (e) => (n = t ? n : e),
            o = (t) => (r = e ? r : t)
          n === r && (n <= 0 ? (i(1), o(10)) : (i(Ea(n, -1)), o(Ea(r, 1)))),
            n <= 0 && i(Ea(r, -1)),
            r <= 0 && o(Ea(n, 1)),
            (this.min = n),
            (this.max = r)
        }
        buildTicks() {
          const t = this.options,
            e = Pa({ min: this._userMin, max: this._userMax }, this)
          return (
            'ticks' === t.bounds && It(e, this, 'value'),
            t.reverse
              ? (e.reverse(), (this.start = this.max), (this.end = this.min))
              : ((this.start = this.min), (this.end = this.max)),
            e
          )
        }
        getLabelForValue(t) {
          return void 0 === t
            ? '0'
            : ye(t, this.chart.options.locale, this.options.ticks.format)
        }
        configure() {
          const t = this.min
          super.configure(),
            (this._startValue = At(t)),
            (this._valueRange = At(this.max) - At(t))
        }
        getPixelForValue(t) {
          return (
            (void 0 !== t && 0 !== t) || (t = this.min),
            null === t || isNaN(t)
              ? NaN
              : this.getPixelForDecimal(
                  t === this.min
                    ? 0
                    : (At(t) - this._startValue) / this._valueRange,
                )
          )
        }
        getValueForPixel(t) {
          const e = this.getDecimalForPixel(t)
          return Math.pow(10, this._startValue + e * this._valueRange)
        }
      }
      function Da(t) {
        const e = t.ticks
        if (e.display && t.display) {
          const t = Xe(e.backdropPadding)
          return ct(e.font && e.font.size, Ce.font.size) + t.height
        }
        return 0
      }
      function Ta(t, e, n, r, i) {
        return t === r || t === i
          ? { start: e - n / 2, end: e + n / 2 }
          : t < r || t > i
            ? { start: e - n, end: e }
            : { start: e, end: e + n }
      }
      function Ra(t) {
        const e = {
            l: t.left + t._padding.left,
            r: t.right - t._padding.right,
            t: t.top + t._padding.top,
            b: t.bottom - t._padding.bottom,
          },
          n = Object.assign({}, e),
          r = [],
          i = [],
          o = t._pointLabels.length,
          a = t.options.pointLabels,
          s = a.centerPointLabels ? Ct / o : 0
        for (let d = 0; d < o; d++) {
          const o = a.setContext(t.getPointLabelContext(d))
          i[d] = o.padding
          const h = t.getPointPosition(d, t.drawingArea + i[d], s),
            f = Ke(o.font),
            p =
              ((l = t.ctx),
              (c = f),
              (u = ot((u = t._pointLabels[d])) ? u : [u]),
              { w: Pe(l, c.string, u), h: u.length * c.lineHeight })
          r[d] = p
          const g = Yt(t.getIndexAngle(d) + s),
            m = Math.round(Ut(g))
          La(n, e, g, Ta(m, h.x, p.w, 0, 180), Ta(m, h.y, p.h, 90, 270))
        }
        var l, c, u
        t.setCenterPoint(e.l - n.l, n.r - e.r, e.t - n.t, n.b - e.b),
          (t._pointLabelItems = (function (t, e, n) {
            const r = [],
              i = t._pointLabels.length,
              o = t.options,
              { centerPointLabels: a, display: s } = o.pointLabels,
              l = { extra: Da(o) / 2, additionalAngle: a ? Ct / i : 0 }
            let c
            for (let o = 0; o < i; o++) {
              ;(l.padding = n[o]), (l.size = e[o])
              const i = Aa(t, o, l)
              r.push(i),
                'auto' === s && ((i.visible = Na(i, c)), i.visible && (c = i))
            }
            return r
          })(t, r, i))
      }
      function La(t, e, n, r, i) {
        const o = Math.abs(Math.sin(n)),
          a = Math.abs(Math.cos(n))
        let s = 0,
          l = 0
        r.start < e.l
          ? ((s = (e.l - r.start) / o), (t.l = Math.min(t.l, e.l - s)))
          : r.end > e.r &&
            ((s = (r.end - e.r) / o), (t.r = Math.max(t.r, e.r + s))),
          i.start < e.t
            ? ((l = (e.t - i.start) / a), (t.t = Math.min(t.t, e.t - l)))
            : i.end > e.b &&
              ((l = (i.end - e.b) / a), (t.b = Math.max(t.b, e.b + l)))
      }
      function Aa(t, e, n) {
        const r = t.drawingArea,
          { extra: i, additionalAngle: o, padding: a, size: s } = n,
          l = t.getPointPosition(e, r + i + a, o),
          c = Math.round(Ut(Yt(l.angle + Tt))),
          u = (function (t, e, n) {
            90 === n || 270 === n ? (t -= e / 2) : (n > 270 || n < 90) && (t -= e)
            return t
          })(l.y, s.h, c),
          d = (function (t) {
            if (0 === t || 180 === t) return 'center'
            if (t < 180) return 'left'
            return 'right'
          })(c),
          h = (function (t, e, n) {
            'right' === n ? (t -= e) : 'center' === n && (t -= e / 2)
            return t
          })(l.x, s.w, d)
        return {
          visible: !0,
          x: l.x,
          y: u,
          textAlign: d,
          left: h,
          top: u,
          right: h + s.w,
          bottom: u + s.h,
        }
      }
      function Na(t, e) {
        if (!e) return !0
        const { left: n, top: r, right: i, bottom: o } = t
        return !(
          Le({ x: n, y: r }, e) ||
          Le({ x: n, y: o }, e) ||
          Le({ x: i, y: r }, e) ||
          Le({ x: i, y: o }, e)
        )
      }
      function ja(t, e, n) {
        const { left: r, top: i, right: o, bottom: a } = n,
          { backdropColor: s } = e
        if (!it(s)) {
          const n = Qe(e.borderRadius),
            l = Xe(e.backdropPadding)
          t.fillStyle = s
          const c = r - l.left,
            u = i - l.top,
            d = o - r + l.width,
            h = a - i + l.height
          Object.values(n).some((t) => 0 !== t)
            ? (t.beginPath(), Ue(t, { x: c, y: u, w: d, h, radius: n }), t.fill())
            : t.fillRect(c, u, d, h)
        }
      }
      function za(t, e, n, r) {
        const { ctx: i } = t
        if (n) i.arc(t.xCenter, t.yCenter, e, 0, Mt)
        else {
          let n = t.getPointPosition(0, e)
          i.moveTo(n.x, n.y)
          for (let o = 1; o < r; o++)
            (n = t.getPointPosition(o, e)), i.lineTo(n.x, n.y)
        }
      }
      class Fa extends _a {
        static id = 'radialLinear'
        static defaults = {
          display: !0,
          animate: !0,
          position: 'chartArea',
          angleLines: {
            display: !0,
            lineWidth: 1,
            borderDash: [],
            borderDashOffset: 0,
          },
          grid: { circular: !1 },
          startAngle: 0,
          ticks: { showLabelBackdrop: !0, callback: xe.formatters.numeric },
          pointLabels: {
            backdropColor: void 0,
            backdropPadding: 2,
            display: !0,
            font: { size: 10 },
            callback: (t) => t,
            padding: 5,
            centerPointLabels: !1,
          },
        }
        static defaultRoutes = {
          'angleLines.color': 'borderColor',
          'pointLabels.color': 'color',
          'ticks.color': 'color',
        }
        static descriptors = { angleLines: { _fallback: 'grid' } }
        constructor(t) {
          super(t),
            (this.xCenter = void 0),
            (this.yCenter = void 0),
            (this.drawingArea = void 0),
            (this._pointLabels = []),
            (this._pointLabelItems = [])
        }
        setDimensions() {
          const t = (this._padding = Xe(Da(this.options) / 2)),
            e = (this.width = this.maxWidth - t.width),
            n = (this.height = this.maxHeight - t.height)
          ;(this.xCenter = Math.floor(this.left + e / 2 + t.left)),
            (this.yCenter = Math.floor(this.top + n / 2 + t.top)),
            (this.drawingArea = Math.floor(Math.min(e, n) / 2))
        }
        determineDataLimits() {
          const { min: t, max: e } = this.getMinMax(!1)
          ;(this.min = st(t) && !isNaN(t) ? t : 0),
            (this.max = st(e) && !isNaN(e) ? e : 0),
            this.handleTickRangeOptions()
        }
        computeTickLimit() {
          return Math.ceil(this.drawingArea / Da(this.options))
        }
        generateTickLabels(t) {
          _a.prototype.generateTickLabels.call(this, t),
            (this._pointLabels = this.getLabels()
              .map((t, e) => {
                const n = dt(this.options.pointLabels.callback, [t, e], this)
                return n || 0 === n ? n : ''
              })
              .filter((t, e) => this.chart.getDataVisibility(e)))
        }
        fit() {
          const t = this.options
          t.display && t.pointLabels.display
            ? Ra(this)
            : this.setCenterPoint(0, 0, 0, 0)
        }
        setCenterPoint(t, e, n, r) {
          ;(this.xCenter += Math.floor((t - e) / 2)),
            (this.yCenter += Math.floor((n - r) / 2)),
            (this.drawingArea -= Math.min(
              this.drawingArea / 2,
              Math.max(t, e, n, r),
            ))
        }
        getIndexAngle(t) {
          return Yt(
            t * (Mt / (this._pointLabels.length || 1)) +
              Bt(this.options.startAngle || 0),
          )
        }
        getDistanceFromCenterForValue(t) {
          if (it(t)) return NaN
          const e = this.drawingArea / (this.max - this.min)
          return this.options.reverse ? (this.max - t) * e : (t - this.min) * e
        }
        getValueForDistanceFromCenter(t) {
          if (it(t)) return NaN
          const e = t / (this.drawingArea / (this.max - this.min))
          return this.options.reverse ? this.max - e : this.min + e
        }
        getPointLabelContext(t) {
          const e = this._pointLabels || []
          if (t >= 0 && t < e.length) {
            const n = e[t]
            return (function (t, e, n) {
              return Je(t, { label: n, index: e, type: 'pointLabel' })
            })(this.getContext(), t, n)
          }
        }
        getPointPosition(t, e, n = 0) {
          const r = this.getIndexAngle(t) - Tt + n
          return {
            x: Math.cos(r) * e + this.xCenter,
            y: Math.sin(r) * e + this.yCenter,
            angle: r,
          }
        }
        getPointPositionForValue(t, e) {
          return this.getPointPosition(t, this.getDistanceFromCenterForValue(e))
        }
        getBasePosition(t) {
          return this.getPointPositionForValue(t || 0, this.getBaseValue())
        }
        getPointLabelPosition(t) {
          const { left: e, top: n, right: r, bottom: i } = this._pointLabelItems[t]
          return { left: e, top: n, right: r, bottom: i }
        }
        drawBackground() {
          const {
            backgroundColor: t,
            grid: { circular: e },
          } = this.options
          if (t) {
            const n = this.ctx
            n.save(),
              n.beginPath(),
              za(
                this,
                this.getDistanceFromCenterForValue(this._endValue),
                e,
                this._pointLabels.length,
              ),
              n.closePath(),
              (n.fillStyle = t),
              n.fill(),
              n.restore()
          }
        }
        drawGrid() {
          const t = this.ctx,
            e = this.options,
            { angleLines: n, grid: r, border: i } = e,
            o = this._pointLabels.length
          let a, s, l
          if (
            (e.pointLabels.display &&
              (function (t, e) {
                const {
                  ctx: n,
                  options: { pointLabels: r },
                } = t
                for (let i = e - 1; i >= 0; i--) {
                  const e = t._pointLabelItems[i]
                  if (!e.visible) continue
                  const o = r.setContext(t.getPointLabelContext(i))
                  ja(n, o, e)
                  const a = Ke(o.font),
                    { x: s, y: l, textAlign: c } = e
                  Be(n, t._pointLabels[i], s, l + a.lineHeight / 2, a, {
                    color: o.color,
                    textAlign: c,
                    textBaseline: 'middle',
                  })
                }
              })(this, o),
            r.display &&
              this.ticks.forEach((t, e) => {
                if (0 !== e) {
                  s = this.getDistanceFromCenterForValue(t.value)
                  const n = this.getContext(e),
                    a = r.setContext(n),
                    l = i.setContext(n)
                  !(function (t, e, n, r, i) {
                    const o = t.ctx,
                      a = e.circular,
                      { color: s, lineWidth: l } = e
                    ;(!a && !r) ||
                      !s ||
                      !l ||
                      n < 0 ||
                      (o.save(),
                      (o.strokeStyle = s),
                      (o.lineWidth = l),
                      o.setLineDash(i.dash),
                      (o.lineDashOffset = i.dashOffset),
                      o.beginPath(),
                      za(t, n, a, r),
                      o.closePath(),
                      o.stroke(),
                      o.restore())
                  })(this, a, s, o, l)
                }
              }),
            n.display)
          ) {
            for (t.save(), a = o - 1; a >= 0; a--) {
              const r = n.setContext(this.getPointLabelContext(a)),
                { color: i, lineWidth: o } = r
              o &&
                i &&
                ((t.lineWidth = o),
                (t.strokeStyle = i),
                t.setLineDash(r.borderDash),
                (t.lineDashOffset = r.borderDashOffset),
                (s = this.getDistanceFromCenterForValue(
                  e.ticks.reverse ? this.min : this.max,
                )),
                (l = this.getPointPosition(a, s)),
                t.beginPath(),
                t.moveTo(this.xCenter, this.yCenter),
                t.lineTo(l.x, l.y),
                t.stroke())
            }
            t.restore()
          }
        }
        drawBorder() {}
        drawLabels() {
          const t = this.ctx,
            e = this.options,
            n = e.ticks
          if (!n.display) return
          const r = this.getIndexAngle(0)
          let i, o
          t.save(),
            t.translate(this.xCenter, this.yCenter),
            t.rotate(r),
            (t.textAlign = 'center'),
            (t.textBaseline = 'middle'),
            this.ticks.forEach((r, a) => {
              if (0 === a && !e.reverse) return
              const s = n.setContext(this.getContext(a)),
                l = Ke(s.font)
              if (
                ((i = this.getDistanceFromCenterForValue(this.ticks[a].value)),
                s.showLabelBackdrop)
              ) {
                ;(t.font = l.string),
                  (o = t.measureText(r.label).width),
                  (t.fillStyle = s.backdropColor)
                const e = Xe(s.backdropPadding)
                t.fillRect(
                  -o / 2 - e.left,
                  -i - l.size / 2 - e.top,
                  o + e.width,
                  l.size + e.height,
                )
              }
              Be(t, r.label, 0, -i, l, {
                color: s.color,
                strokeColor: s.textStrokeColor,
                strokeWidth: s.textStrokeWidth,
              })
            }),
            t.restore()
        }
        drawTitle() {}
      }
      const Ia = {
          millisecond: { common: !0, size: 1, steps: 1e3 },
          second: { common: !0, size: 1e3, steps: 60 },
          minute: { common: !0, size: 6e4, steps: 60 },
          hour: { common: !0, size: 36e5, steps: 24 },
          day: { common: !0, size: 864e5, steps: 30 },
          week: { common: !1, size: 6048e5, steps: 4 },
          month: { common: !0, size: 2628e6, steps: 12 },
          quarter: { common: !1, size: 7884e6, steps: 4 },
          year: { common: !0, size: 3154e7 },
        },
        Ba = Object.keys(Ia)
      function Ua(t, e) {
        return t - e
      }
      function Wa(t, e) {
        if (it(e)) return null
        const n = t._adapter,
          { parser: r, round: i, isoWeekday: o } = t._parseOpts
        let a = e
        return (
          'function' == typeof r && (a = r(a)),
          st(a) || (a = 'string' == typeof r ? n.parse(a, r) : n.parse(a)),
          null === a
            ? null
            : (i &&
                (a =
                  'week' !== i || (!Ft(o) && !0 !== o)
                    ? n.startOf(a, i)
                    : n.startOf(a, 'isoWeek', o)),
              +a)
        )
      }
      function Va(t, e, n, r) {
        const i = Ba.length
        for (let o = Ba.indexOf(t); o < i - 1; ++o) {
          const t = Ia[Ba[o]],
            i = t.steps ? t.steps : Number.MAX_SAFE_INTEGER
          if (t.common && Math.ceil((n - e) / (i * t.size)) <= r) return Ba[o]
        }
        return Ba[i - 1]
      }
      function Ha(t, e, n) {
        if (n) {
          if (n.length) {
            const { lo: r, hi: i } = Kt(n, e)
            t[n[r] >= e ? n[r] : n[i]] = !0
          }
        } else t[e] = !0
      }
      function $a(t, e, n) {
        const r = [],
          i = {},
          o = e.length
        let a, s
        for (a = 0; a < o; ++a)
          (s = e[a]), (i[s] = a), r.push({ value: s, major: !1 })
        return 0 !== o && n
          ? (function (t, e, n, r) {
              const i = t._adapter,
                o = +i.startOf(e[0].value, r),
                a = e[e.length - 1].value
              let s, l
              for (s = o; s <= a; s = +i.add(s, 1, r))
                (l = n[s]), l >= 0 && (e[l].major = !0)
              return e
            })(t, r, i, n)
          : r
      }
      class Ya extends vi {
        static id = 'time'
        static defaults = {
          bounds: 'data',
          adapters: {},
          time: {
            parser: !1,
            unit: !1,
            round: !1,
            isoWeekday: !1,
            minUnit: 'millisecond',
            displayFormats: {},
          },
          ticks: { source: 'auto', callback: !1, major: { enabled: !1 } },
        }
        constructor(t) {
          super(t),
            (this._cache = { data: [], labels: [], all: [] }),
            (this._unit = 'day'),
            (this._majorUnit = void 0),
            (this._offsets = {}),
            (this._normalized = !1),
            (this._parseOpts = void 0)
        }
        init(t, e = {}) {
          const n = t.time || (t.time = {}),
            r = (this._adapter = new Er(t.adapters.date))
          r.init(e),
            yt(n.displayFormats, r.formats()),
            (this._parseOpts = {
              parser: n.parser,
              round: n.round,
              isoWeekday: n.isoWeekday,
            }),
            super.init(t),
            (this._normalized = e.normalized)
        }
        parse(t, e) {
          return void 0 === t ? null : Wa(this, t)
        }
        beforeLayout() {
          super.beforeLayout(), (this._cache = { data: [], labels: [], all: [] })
        }
        determineDataLimits() {
          const t = this.options,
            e = this._adapter,
            n = t.time.unit || 'day'
          let {
            min: r,
            max: i,
            minDefined: o,
            maxDefined: a,
          } = this.getUserBounds()
          function s(t) {
            o || isNaN(t.min) || (r = Math.min(r, t.min)),
              a || isNaN(t.max) || (i = Math.max(i, t.max))
          }
          ;(o && a) ||
            (s(this._getLabelBounds()),
            ('ticks' === t.bounds && 'labels' === t.ticks.source) ||
              s(this.getMinMax(!1))),
            (r = st(r) && !isNaN(r) ? r : +e.startOf(Date.now(), n)),
            (i = st(i) && !isNaN(i) ? i : +e.endOf(Date.now(), n) + 1),
            (this.min = Math.min(r, i - 1)),
            (this.max = Math.max(r + 1, i))
        }
        _getLabelBounds() {
          const t = this.getLabelTimestamps()
          let e = Number.POSITIVE_INFINITY,
            n = Number.NEGATIVE_INFINITY
          return t.length && ((e = t[0]), (n = t[t.length - 1])), { min: e, max: n }
        }
        buildTicks() {
          const t = this.options,
            e = t.time,
            n = t.ticks,
            r = 'labels' === n.source ? this.getLabelTimestamps() : this._generate()
          'ticks' === t.bounds &&
            r.length &&
            ((this.min = this._userMin || r[0]),
            (this.max = this._userMax || r[r.length - 1]))
          const i = this.min,
            o = (function (t, e, n) {
              let r = 0,
                i = t.length
              for (; r < i && t[r] < e; ) r++
              for (; i > r && t[i - 1] > n; ) i--
              return r > 0 || i < t.length ? t.slice(r, i) : t
            })(r, i, this.max)
          return (
            (this._unit =
              e.unit ||
              (n.autoSkip
                ? Va(e.minUnit, this.min, this.max, this._getLabelCapacity(i))
                : (function (t, e, n, r, i) {
                    for (let o = Ba.length - 1; o >= Ba.indexOf(n); o--) {
                      const n = Ba[o]
                      if (Ia[n].common && t._adapter.diff(i, r, n) >= e - 1)
                        return n
                    }
                    return Ba[n ? Ba.indexOf(n) : 0]
                  })(this, o.length, e.minUnit, this.min, this.max))),
            (this._majorUnit =
              n.major.enabled && 'year' !== this._unit
                ? (function (t) {
                    for (let e = Ba.indexOf(t) + 1, n = Ba.length; e < n; ++e)
                      if (Ia[Ba[e]].common) return Ba[e]
                  })(this._unit)
                : void 0),
            this.initOffsets(r),
            t.reverse && o.reverse(),
            $a(this, o, this._majorUnit)
          )
        }
        afterAutoSkip() {
          this.options.offsetAfterAutoskip &&
            this.initOffsets(this.ticks.map((t) => +t.value))
        }
        initOffsets(t = []) {
          let e,
            n,
            r = 0,
            i = 0
          this.options.offset &&
            t.length &&
            ((e = this.getDecimalForValue(t[0])),
            (r = 1 === t.length ? 1 - e : (this.getDecimalForValue(t[1]) - e) / 2),
            (n = this.getDecimalForValue(t[t.length - 1])),
            (i =
              1 === t.length
                ? n
                : (n - this.getDecimalForValue(t[t.length - 2])) / 2))
          const o = t.length < 3 ? 0.5 : 0.25
          ;(r = Qt(r, 0, o)),
            (i = Qt(i, 0, o)),
            (this._offsets = { start: r, end: i, factor: 1 / (r + 1 + i) })
        }
        _generate() {
          const t = this._adapter,
            e = this.min,
            n = this.max,
            r = this.options,
            i = r.time,
            o = i.unit || Va(i.minUnit, e, n, this._getLabelCapacity(e)),
            a = ct(r.ticks.stepSize, 1),
            s = 'week' === o && i.isoWeekday,
            l = Ft(s) || !0 === s,
            c = {}
          let u,
            d,
            h = e
          if (
            (l && (h = +t.startOf(h, 'isoWeek', s)),
            (h = +t.startOf(h, l ? 'day' : o)),
            t.diff(n, e, o) > 1e5 * a)
          )
            throw new Error(
              e +
                ' and ' +
                n +
                ' are too far apart with stepSize of ' +
                a +
                ' ' +
                o,
            )
          const f = 'data' === r.ticks.source && this.getDataTimestamps()
          for (u = h, d = 0; u < n; u = +t.add(u, a, o), d++) Ha(c, u, f)
          return (
            (u !== n && 'ticks' !== r.bounds && 1 !== d) || Ha(c, u, f),
            Object.keys(c)
              .sort(Ua)
              .map((t) => +t)
          )
        }
        getLabelForValue(t) {
          const e = this._adapter,
            n = this.options.time
          return n.tooltipFormat
            ? e.format(t, n.tooltipFormat)
            : e.format(t, n.displayFormats.datetime)
        }
        format(t, e) {
          const n = this.options.time.displayFormats,
            r = this._unit,
            i = e || n[r]
          return this._adapter.format(t, i)
        }
        _tickFormatFunction(t, e, n, r) {
          const i = this.options,
            o = i.ticks.callback
          if (o) return dt(o, [t, e, n], this)
          const a = i.time.displayFormats,
            s = this._unit,
            l = this._majorUnit,
            c = s && a[s],
            u = l && a[l],
            d = n[e],
            h = l && u && d && d.major
          return this._adapter.format(t, r || (h ? u : c))
        }
        generateTickLabels(t) {
          let e, n, r
          for (e = 0, n = t.length; e < n; ++e)
            (r = t[e]), (r.label = this._tickFormatFunction(r.value, e, t))
        }
        getDecimalForValue(t) {
          return null === t ? NaN : (t - this.min) / (this.max - this.min)
        }
        getPixelForValue(t) {
          const e = this._offsets,
            n = this.getDecimalForValue(t)
          return this.getPixelForDecimal((e.start + n) * e.factor)
        }
        getValueForPixel(t) {
          const e = this._offsets,
            n = this.getDecimalForPixel(t) / e.factor - e.end
          return this.min + n * (this.max - this.min)
        }
        _getLabelSize(t) {
          const e = this.options.ticks,
            n = this.ctx.measureText(t).width,
            r = Bt(this.isHorizontal() ? e.maxRotation : e.minRotation),
            i = Math.cos(r),
            o = Math.sin(r),
            a = this._resolveTickFontOptions(0).size
          return { w: n * i + a * o, h: n * o + a * i }
        }
        _getLabelCapacity(t) {
          const e = this.options.time,
            n = e.displayFormats,
            r = n[e.unit] || n.millisecond,
            i = this._tickFormatFunction(t, 0, $a(this, [t], this._majorUnit), r),
            o = this._getLabelSize(i),
            a =
              Math.floor(
                this.isHorizontal() ? this.width / o.w : this.height / o.h,
              ) - 1
          return a > 0 ? a : 1
        }
        getDataTimestamps() {
          let t,
            e,
            n = this._cache.data || []
          if (n.length) return n
          const r = this.getMatchingVisibleMetas()
          if (this._normalized && r.length)
            return (this._cache.data = r[0].controller.getAllParsedValues(this))
          for (t = 0, e = r.length; t < e; ++t)
            n = n.concat(r[t].controller.getAllParsedValues(this))
          return (this._cache.data = this.normalize(n))
        }
        getLabelTimestamps() {
          const t = this._cache.labels || []
          let e, n
          if (t.length) return t
          const r = this.getLabels()
          for (e = 0, n = r.length; e < n; ++e) t.push(Wa(this, r[e]))
          return (this._cache.labels = this._normalized ? t : this.normalize(t))
        }
        normalize(t) {
          return ee(t.sort(Ua))
        }
      }
      function qa(t, e, n) {
        let r,
          i,
          o,
          a,
          s = 0,
          l = t.length - 1
        n
          ? (e >= t[s].pos && e <= t[l].pos && ({ lo: s, hi: l } = Zt(t, 'pos', e)),
            ({ pos: r, time: o } = t[s]),
            ({ pos: i, time: a } = t[l]))
          : (e >= t[s].time &&
              e <= t[l].time &&
              ({ lo: s, hi: l } = Zt(t, 'time', e)),
            ({ time: r, pos: o } = t[s]),
            ({ time: i, pos: a } = t[l]))
        const c = i - r
        return c ? o + ((a - o) * (e - r)) / c : o
      }
      const Qa = [
        _r,
        vo,
        ma,
        Object.freeze({
          __proto__: null,
          CategoryScale: va,
          LinearScale: ka,
          LogarithmicScale: Oa,
          RadialLinearScale: Fa,
          TimeScale: Ya,
          TimeSeriesScale: class extends Ya {
            static id = 'timeseries'
            static defaults = Ya.defaults
            constructor(t) {
              super(t),
                (this._table = []),
                (this._minPos = void 0),
                (this._tableRange = void 0)
            }
            initOffsets() {
              const t = this._getTimestampsForTable(),
                e = (this._table = this.buildLookupTable(t))
              ;(this._minPos = qa(e, this.min)),
                (this._tableRange = qa(e, this.max) - this._minPos),
                super.initOffsets(t)
            }
            buildLookupTable(t) {
              const { min: e, max: n } = this,
                r = [],
                i = []
              let o, a, s, l, c
              for (o = 0, a = t.length; o < a; ++o)
                (l = t[o]), l >= e && l <= n && r.push(l)
              if (r.length < 2)
                return [
                  { time: e, pos: 0 },
                  { time: n, pos: 1 },
                ]
              for (o = 0, a = r.length; o < a; ++o)
                (c = r[o + 1]),
                  (s = r[o - 1]),
                  (l = r[o]),
                  Math.round((c + s) / 2) !== l &&
                    i.push({ time: l, pos: o / (a - 1) })
              return i
            }
            _generate() {
              const t = this.min,
                e = this.max
              let n = super.getDataTimestamps()
              return (
                (n.includes(t) && n.length) || n.splice(0, 0, t),
                (n.includes(e) && 1 !== n.length) || n.push(e),
                n.sort((t, e) => t - e)
              )
            }
            _getTimestampsForTable() {
              let t = this._cache.all || []
              if (t.length) return t
              const e = this.getDataTimestamps(),
                n = this.getLabelTimestamps()
              return (
                (t =
                  e.length && n.length
                    ? this.normalize(e.concat(n))
                    : e.length
                      ? e
                      : n),
                (t = this._cache.all = t),
                t
              )
            }
            getDecimalForValue(t) {
              return (qa(this._table, t) - this._minPos) / this._tableRange
            }
            getValueForPixel(t) {
              const e = this._offsets,
                n = this.getDecimalForPixel(t) / e.factor - e.end
              return qa(this._table, n * this._tableRange + this._minPos, !0)
            }
          },
        }),
      ]
      Ki.register(...Qa)
      const Xa = Ki
      var Ka = {
        dark: {
          candlestickGreen: '#16c782',
          candlestickRed: '#ea3943',
          gridLinesColor: 'rgba(255, 255, 255, 0.1)',
          crosshairColor: '#ff971d',
          crosshairTextColor: '#ffffff',
          axesTextColor: '#ffffff',
          axesColor: '#8f8e8d',
        },
        light: {
          candlestickGreen: '#16c782',
          candlestickRed: '#ea3943',
          gridLinesColor: 'rgba(0, 0, 0, 0.1)',
          crosshairColor: '#ff971d',
          crosshairTextColor: '#ffffff',
          axesTextColor: '#000000',
          axesColor: '#8f8e8d',
        },
      }
      const Za = function (t) {
        return {
          id: 'arrowPlugin',
          afterDatasetsDraw: function (e) {
            var n = e.ctx,
              r = e.chartArea,
              i = r.top,
              o = r.bottom,
              a = r.left,
              s = r.right
            n.save(),
              n.beginPath(),
              (n.lineWidth = 1),
              (n.strokeStyle = Ka[t].axesColor),
              n.moveTo(a - 1, i + 3),
              n.lineTo(a + 5, i + 10),
              n.moveTo(a + 1, i + 3),
              n.lineTo(a - 5, i + 10),
              n.moveTo(a, i + 5),
              n.lineTo(a, o),
              n.lineTo(s - 5, o),
              n.moveTo(s - 3, o + 1),
              n.lineTo(s - 10, o - 5),
              n.moveTo(s - 3, o - 1),
              n.lineTo(s - 10, o + 5),
              n.stroke(),
              n.closePath()
          },
        }
      }
      var Ja = function (t) {
          var e = t.chart.data.datasets[0].data,
            n = e[0].open
          return (
            e.forEach(function (t) {
              var e = Math.min.apply(
                null,
                Object.values(t).filter(function (e) {
                  return t.id !== e && !Number.isNaN(Number(e))
                }),
              )
              e < n && (n = e)
            }),
            n - n * f.KM
          )
        },
        Ga = function (t) {
          var e = t.chart.data.datasets[0].data,
            n = e[0].open
          return (
            e.forEach(function (t) {
              var e = Math.max.apply(
                null,
                Object.values(t).filter(function (e) {
                  return t.id !== e && !Number.isNaN(Number(e))
                }),
              )
              e > n && (n = e)
            }),
            n + n * f.KM
          )
        }
      const ts = function (t) {
        return {
          id: 'candlestickPlugin',
          beforeDatasetsDraw: function (e) {
            var n = e.ctx,
              r = e.data,
              i = e.scales.y
            n.save(),
              (n.lineWidth = 3),
              r.datasets[0].data.forEach(function (o, a) {
                n.beginPath(),
                  n.moveTo(
                    e.getDatasetMeta(0).data[a].x,
                    e.getDatasetMeta(0).data[a].y,
                  ),
                  n.lineTo(
                    e.getDatasetMeta(0).data[a].x,
                    i.getPixelForValue(r.datasets[0].data[a].high),
                  ),
                  o.close > o.open
                    ? (n.strokeStyle = Ka[t].candlestickGreen)
                    : (n.strokeStyle = Ka[t].candlestickRed),
                  n.stroke(),
                  n.beginPath(),
                  n.moveTo(
                    e.getDatasetMeta(0).data[a].x,
                    e.getDatasetMeta(0).data[a].y,
                  ),
                  n.lineTo(
                    e.getDatasetMeta(0).data[a].x,
                    i.getPixelForValue(r.datasets[0].data[a].low),
                  ),
                  o.close > o.open
                    ? (n.strokeStyle = Ka[t].candlestickGreen)
                    : (n.strokeStyle = Ka[t].candlestickRed),
                  n.stroke()
              })
          },
        }
      }
      const es = function (t) {
        return {
          id: 'crosshairPlugin',
          crosshair: void 0,
          afterDatasetsDraw: function (e) {
            var n = e.ctx,
              r = e.chartArea.left,
              i = e.scales.y
            ;(n.lineWidth = 1),
              (n.strokeStyle = Ka[t].crosshairColor),
              this.crosshair &&
                (n.save(),
                n.beginPath(),
                this.crosshair.forEach(function (t) {
                  n.moveTo(t.startX, t.startY), n.lineTo(t.endX, t.endY), n.stroke()
                }),
                (n.fillStyle = Ka[t].crosshairColor),
                n.fillRect(0, this.crosshair[0].startY - 10, r, 20),
                (n.font = 'Poppins'),
                (n.textAlign = 'center'),
                (n.fillStyle = Ka[t].crosshairTextColor),
                n.fillText(
                  i.getValueForPixel(this.crosshair[0].startY).toFixed(3),
                  r / 2,
                  this.crosshair[0].startY + 5,
                ))
          },
          afterEvent: function (e, n) {
            var r = e.ctx,
              i = e.chartArea,
              o = i.left,
              a = i.right,
              s = i.top,
              l = i.bottom,
              c = n.event.x,
              u = n.event.y
            ;(r.lineWidth = 1),
              (r.strokeStyle = Ka[t].crosshairColor),
              !n.inChartArea && this.crosshair
                ? (this.crosshair = void 0)
                : n.inChartArea &&
                  (this.crosshair = [
                    { startX: o, startY: u, endX: a, endY: u },
                    { startX: c, startY: s, endX: c, endY: l },
                  ])
          },
        }
      }
      var ns = function (t, e) {
          return {
            datasets: [
              {
                data: t,
                barPercentage: 0.7,
                categoryPercentage: 1.3,
                backgroundColor: function (t) {
                  return t.raw.close > t.raw.open
                    ? Ka[e].candlestickGreen
                    : Ka[e].candlestickRed
                },
              },
            ],
          }
        },
        rs = { padding: { left: 10 } },
        is = { xAxisKey: 'date', yAxisKey: 'body', options: { animation: !1 } },
        os = { legend: { display: !1 } },
        as = function (t) {
          return {
            y1: {
              position: 'left',
              beginAtZero: !0,
              title: {
                align: 'end',
                display: !0,
                text: 'Value',
                font: { family: 'Poppins', weight: 400, size: 16 },
                color: Ka[t].axesTextColor,
              },
              ticks: { display: !1 },
              min: function (t) {
                return Ja(t)
              },
              max: function (t) {
                return Ga(t)
              },
              grid: { display: !1 },
            },
            y: {
              position: 'right',
              beginAtZero: !0,
              ticks: {
                display: !0,
                padding: window.innerWidth < 768 ? 30 : 50,
                font: { family: 'Poppins', weight: 400, size: 16 },
                color: Ka[t].axesTextColor,
                callback: function (t) {
                  return t.toFixed(3)
                },
              },
              min: function (t) {
                return Ja(t)
              },
              max: function (t) {
                return Ga(t)
              },
              grid: { display: !0, color: Ka[t].gridLinesColor },
            },
            x: {
              title: {
                align: 'end',
                display: !0,
                text: 'DAY',
                font: { family: 'Poppins', weight: 400, size: 16 },
                color: Ka[t].axesTextColor,
              },
              ticks: { display: !1 },
              grid: { color: Ka[t].gridLinesColor },
            },
          }
        },
        ss = function (t) {
          return [ts(t), Za(t), es(t)]
        },
        ls = function (t, e) {
          return {
            plugins: ss(e),
            data: ns(t, e),
            options: {
              maintainAspectRatio: !1,
              layout: rs,
              scales: as(e),
              parsing: is,
              plugins: os,
            },
          }
        }
      const cs = 'label'
      function us(t, e) {
        'function' == typeof t ? t(e) : t && (t.current = e)
      }
      function ds(t, e) {
        t.labels = e
      }
      function hs(t, e) {
        let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : cs
        const r = []
        t.datasets = e.map((e) => {
          const i = t.datasets.find((t) => t[n] === e[n])
          return i && e.data && !r.includes(i)
            ? (r.push(i), Object.assign(i, e), i)
            : { ...e }
        })
      }
      function fs(t) {
        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : cs
        const n = { labels: [], datasets: [] }
        return ds(n, t.labels), hs(n, t.datasets, e), n
      }
      function ps(t, e) {
        const {
            height: n = 150,
            width: r = 300,
            redraw: o = !1,
            datasetIdKey: a,
            type: s,
            data: l,
            options: c,
            plugins: u = [],
            fallbackContent: d,
            updateMode: h,
            ...f
          } = t,
          p = (0, i.useRef)(null),
          g = (0, i.useRef)(),
          m = () => {
            p.current &&
              ((g.current = new Ki(p.current, {
                type: s,
                data: fs(l, a),
                options: c && { ...c },
                plugins: u,
              })),
              us(e, g.current))
          },
          b = () => {
            us(e, null), g.current && (g.current.destroy(), (g.current = null))
          }
        return (
          (0, i.useEffect)(() => {
            !o &&
              g.current &&
              c &&
              (function (t, e) {
                const n = t.options
                n && e && Object.assign(n, e)
              })(g.current, c)
          }, [o, c]),
          (0, i.useEffect)(() => {
            !o && g.current && ds(g.current.config.data, l.labels)
          }, [o, l.labels]),
          (0, i.useEffect)(() => {
            !o &&
              g.current &&
              l.datasets &&
              hs(g.current.config.data, l.datasets, a)
          }, [o, l.datasets]),
          (0, i.useEffect)(() => {
            g.current && (o ? (b(), setTimeout(m)) : g.current.update(h))
          }, [o, c, l.labels, l.datasets, h]),
          (0, i.useEffect)(() => {
            g.current && (b(), setTimeout(m))
          }, [s]),
          (0, i.useEffect)(() => (m(), () => b()), []),
          i.createElement(
            'canvas',
            Object.assign({ ref: p, role: 'img', height: n, width: r }, f),
            d,
          )
        )
      }
      const gs = (0, i.forwardRef)(ps)
      function ms(t, e) {
        return (
          Ki.register(e),
          (0, i.forwardRef)((e, n) =>
            i.createElement(gs, Object.assign({}, e, { ref: n, type: t })),
          )
        )
      }
      const bs = ms('bar', vr)
      var ys = a(761),
        vs = a(389)
      const xs = 'xEQPt8ItCpnvCVBcPQom'
      function ws() {
        return (
          (ws = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var n = arguments[e]
                  for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                }
                return t
              }),
          ws.apply(this, arguments)
        )
      }
      function _s(t, e) {
        return (
          (_s = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t
              }),
          _s(t, e)
        )
      }
      Xa.register(va)
      var ks = (function (t) {
        var e, r
        function i(e) {
          var n
          return (
            ((n = t.call(this, e) || this).update = function (t) {
              n.setState({ currency: t.currency, dataset: t.dataset })
            }),
            (n.state = { dataset: [], currency: Object.keys(f.s)[0] }),
            n
          )
        }
        ;(r = t),
          ((e = i).prototype = Object.create(r.prototype)),
          (e.prototype.constructor = e),
          _s(e, r)
        var o = i.prototype
        return (
          (o.componentDidMount = function () {
            var t = this,
              e = this.state.currency
            ys.Z.subscribe(this),
              w.Z.get('' + f.CG.mockapi_request + e.toLowerCase()).then(
                function (e) {
                  var n = e.data.map(function (t) {
                    return ws({}, t, { body: [t.close, t.open] })
                  })
                  return t.setState({ dataset: n }), ys.Z.notify(null, n), !0
                },
              )
          }),
          (o.componentDidUpdate = function (t, e) {
            var n = this,
              r = this.state.currency
            e.currency !== r &&
              w.Z.get(
                'https://65cbe39eefec34d9ed883c24.mockapi.io/api/v1/' +
                  r.toLowerCase(),
              ).then(function (t) {
                var e = t.data.map(function (t) {
                  return ws({}, t, { body: [t.close, t.open] })
                })
                return n.setState({ dataset: e }), ys.Z.notify(null, e), !0
              })
          }),
          (o.render = function () {
            var t = this.state.dataset,
              e = this.context.theme
            return (0, n.jsx)('section', {
              className: xs,
              children: t.length > 0 && (0, n.jsx)(bs, ws({}, ls(t, e))),
            })
          }),
          i
        )
      })(i.Component)
      ks.contextType = vs.N
      const Ss = ks,
        Es = 'szMERKSi_8OSHpeSvZ8U',
        Cs = 'BknhEv9U4Nam8LT6_Mr8',
        Ms = 'IyjkAa636miQZHK1vYVL',
        Ps = '_Z8XUUc2Oft2UrAa3Cqd',
        Os = 'qO6T3bLfG0DGCfQuQTUX',
        Ds = 'MltahGGmJEDPHz_9zUu8',
        Ts = 'W7RBG9o8Q_63uI618DS0',
        Rs = 'NK9e8D1uHvvFGSWfe0EU'
      function Ls(t, e) {
        return (
          (Ls = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t
              }),
          Ls(t, e)
        )
      }
      var As = (function (t) {
        var e, r
        function i(e) {
          var n
          return (
            ((n = t.call(this, e) || this).update = function (t) {
              n.setState({ selectedCurrency: t.currency })
            }),
            (n.onClickOption = function (t) {
              var e = n.state.isClicked,
                r = Object.entries(f.s).filter(function (e) {
                  return e[1] === t.target.textContent ? e[0] : null
                })[0][0]
              n.setState({ selectedCurrency: r, isClicked: !e }),
                ys.Z.notify(r, null)
            }),
            (n.onSelectClicked = function () {
              var t = n.state.isClicked
              n.setState({ isClicked: !t })
            }),
            (n.state = { isClicked: !1, selectedCurrency: Object.keys(f.s)[0] }),
            n
          )
        }
        ;(r = t),
          ((e = i).prototype = Object.create(r.prototype)),
          (e.prototype.constructor = e),
          Ls(e, r)
        var o = i.prototype
        return (
          (o.componentDidMount = function () {
            ys.Z.subscribe(this)
          }),
          (o.render = function () {
            var t = this,
              e = this.state,
              r = e.isClicked,
              i = e.selectedCurrency
            return (0, n.jsxs)('section', {
              className: Es,
              children: [
                (0, n.jsx)('div', {
                  className: r ? Cs + ' ' + Ms : Cs + ' ' + Ps,
                  onClick: this.onSelectClicked,
                  'data-cy': 'timeline-select',
                  children: i.length > 13 ? i.substring(0, 12) + '...' : i,
                }),
                (0, n.jsx)('div', {
                  className: r ? Os + ' ' + Ts : Os + ' ' + Rs,
                  'data-cy': 'timeline-select-pop-up',
                  children: Object.values(f.s).map(function (e, r) {
                    return (0, n.jsx)(
                      'div',
                      { className: Ds, onClick: t.onClickOption, children: e },
                      r,
                    )
                  }),
                }),
              ],
            })
          }),
          i
        )
      })(i.Component)
      const Ns = As
      var js = a(358)
      const zs = {
        card: 'xQHsm58mm5aeQH68Cm2A',
        right: 'seNQ1qcQ19Efe7B0gIt_',
        title: 'ZyEnYAVvAFwv1qheNB18',
        symbol: 'hQ9gQ57QPXA3YrOzDTvO',
        icon: 'qmfx_vMx0auEJ10lNUNi',
      }
      function Fs(t, e) {
        return (
          (Fs = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t
              }),
          Fs(t, e)
        )
      }
      const Is = (function (t) {
        var e, r
        function i(e) {
          var n
          return (
            ((n = t.call(this, e) || this).update = function (t) {
              n.setState({ currency: t.currency })
            }),
            (n.state = { currency: Object.keys(f.s)[0] }),
            n
          )
        }
        ;(r = t),
          ((e = i).prototype = Object.create(r.prototype)),
          (e.prototype.constructor = e),
          Fs(e, r)
        var o = i.prototype
        return (
          (o.componentDidMount = function () {
            ys.Z.subscribe(this)
          }),
          (o.render = function () {
            var t = this.state.currency,
              e = Object.entries(f.s).filter(function (e) {
                return e[0] === t ? e[0] : null
              })[0][0]
            return (0, n.jsxs)('section', {
              className: zs.card,
              children: [
                (0, n.jsx)('div', {
                  className: zs.left,
                  children: js.Z[e]({ className: zs.icon }),
                }),
                (0, n.jsxs)('div', {
                  className: zs.right,
                  children: [
                    (0, n.jsx)('p', {
                      className: zs.title,
                      'data-cy': 'timeline-currency-card-title',
                      children: t,
                    }),
                    (0, n.jsx)('span', { className: zs.symbol, children: e }),
                  ],
                }),
              ],
            })
          }),
          i
        )
      })(i.Component)
      var Bs = a(935)
      const Us = {
        timeline: 'HllrriZyPDbzlxEMVmZs',
        cardAndButtons: 'QgVs9t95gXg6xBNulWpw',
        buttons: 'jzYg3ueT0Ar_T3AxpboA',
        button: 'Jo5ZouJNPgsfuDUSxXNB',
        edit: 'GNKOpA3h8UXIa1l4T6sh',
        delete: 'OuUNLzqdspX8oR8fLl8D',
        add: 'm7N1D4bfB_6aThzD4b_o',
      }
      function Ws(t, e) {
        return (
          (Ws = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t
              }),
          Ws(t, e)
        )
      }
      const Vs = (function (t) {
        var e, r
        function i(e) {
          var n
          return (
            ((n = t.call(this, e) || this).handleDelete = function () {
              n.setState({ type: 'delete' }),
                ys.Z.notify(null, ys.Z.dataset.slice(0, ys.Z.dataset.length - 1)),
                w.Z.delete(
                  '' +
                    f.CG.mockapi_request +
                    ys.Z.currency.toLowerCase() +
                    '/' +
                    (ys.Z.dataset.length + 1),
                )
                  .then(function (t) {
                    return t
                  })
                  .catch(function (t) {
                    return n.setState({ error: t })
                  })
            }),
            (n.onModalClose = function () {
              n.setState({ show: !1, type: '' })
            }),
            (n.update = function (t) {
              30 === t.dataset.length &&
                n.setState({ type: f.Ny.message, show: !0 })
            }),
            (n.onOpenAddModal = function () {
              n.setState({ show: !0, type: f.Ny.add })
            }),
            (n.onOpenEditModal = function () {
              n.setState({ show: !0, type: f.Ny.edit })
            }),
            (n.state = { show: !1, type: '', error: {} }),
            n
          )
        }
        ;(r = t),
          ((e = i).prototype = Object.create(r.prototype)),
          (e.prototype.constructor = e),
          Ws(e, r)
        var o = i.prototype
        return (
          (o.componentDidUpdate = function () {
            ys.Z.subscribe(this)
          }),
          (o.render = function () {
            var t = this.state,
              e = t.show,
              r = t.type,
              i = t.error
            if (i.message) throw new Error(i.message + '. Please, try again later')
            return (0, n.jsxs)('article', {
              className: Us.timeline,
              children: [
                (0, n.jsx)('section', {
                  className: 'container',
                  children: (0, n.jsxs)('div', {
                    className: Us.inner,
                    children: [
                      (0, n.jsx)(Ns, {}),
                      (0, n.jsxs)('section', {
                        className: Us.cardAndButtons,
                        children: [
                          (0, n.jsx)(Is, {}),
                          (0, n.jsxs)('div', {
                            className: Us.buttons,
                            children: [
                              (0, n.jsx)('button', {
                                type: 'button',
                                className: Us.button + ' ' + Us.add,
                                onClick: this.onOpenAddModal,
                                'data-cy': 'timeline-add-button',
                                children: 'Add day',
                              }),
                              (0, n.jsx)('button', {
                                type: 'button',
                                className: Us.button + ' ' + Us.edit,
                                onClick: this.onOpenEditModal,
                                'data-cy': 'timeline-edit-button',
                                children: 'Edit day',
                              }),
                              (0, n.jsx)('button', {
                                type: 'button',
                                className: Us.button + ' ' + Us.delete,
                                onClick: this.handleDelete,
                                'data-cy': 'timeline-delete-button',
                                children: 'Delete day',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                !0 === e || r === f.Ny.message
                  ? (0, Bs.createPortal)(
                      (0, n.jsx)(_.Z, { type: r, onModalClose: this.onModalClose }),
                      document.body,
                    )
                  : null,
                (0, n.jsx)(Ss, {}),
              ],
            })
          }),
          i
        )
      })(i.Component)
      var Hs = (0, i.lazy)(function () {
          return Promise.all([a.e(429), a.e(966)]).then(a.bind(a, 966))
        }),
        $s = (0, i.lazy)(function () {
          return a.e(28).then(a.bind(a, 28))
        }),
        Ys = (0, i.lazy)(function () {
          return a.e(107).then(a.bind(a, 107))
        }),
        qs = [
          {
            path: f.yy.default,
            element: (0, n.jsx)(x, {}),
            children: [
              { path: f.yy.timeline, element: (0, n.jsx)(Vs, {}) },
              { path: f.yy.bankCard, element: (0, n.jsx)(Hs, {}) },
              { path: f.yy.default, element: (0, n.jsx)($s, {}) },
            ],
          },
          {
            path: f.yy.default,
            element: (0, n.jsx)(i.Suspense, {
              fallback: (0, n.jsx)(r, {}),
              children: (0, n.jsx)(Ys, {}),
            }),
            children: [{ path: f.yy.contato, element: (0, n.jsx)(Ys, {}) }],
          },
        ],
        Qs = a(655)
      const Xs = function () {
        return (0, n.jsx)(vs.Z, {
          children: (0, n.jsx)(Qs.pG, { router: (0, Qs.cP)(qs) }),
        })
      }
      ;(document.body.innerHTML = '<div id="root"></div>'),
        (0, t.s)(document.getElementById('root')).render((0, n.jsx)(Xs, {}))
    })()
})()
