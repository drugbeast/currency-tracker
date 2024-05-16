'use strict'
;(self.webpackChunkcurrency_tracker = self.webpackChunkcurrency_tracker || []).push(
  [
    [966],
    {
      966: (e, t, n) => {
        n.r(t), n.d(t, { default: () => k })
        var r = n(427),
          a = n(985),
          c = n(294)
        const s = '_q02zntlBZ_seRQa62nP',
          o = 'Rzz6_qkX3yUs0FbzudSw'
        var i = n(893)
        function u(e, t) {
          return (
            (u = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (e, t) {
                  return (e.__proto__ = t), e
                }),
            u(e, t)
          )
        }
        r.config.apiKey = a.CG.maptiler_api_key
        const l = (function (e) {
          var t, n
          function l(t) {
            var n
            return (
              ((n = e.call(this, t) || this).state = {
                zoom: 10,
                centerLng: a.wC.lng,
                centerLat: a.wC.lat,
              }),
              (n.mapContainer = (0, c.createRef)(null)),
              (n.card = (0, c.createRef)(null)),
              n
            )
          }
          ;(n = e),
            ((t = l).prototype = Object.create(n.prototype)),
            (t.prototype.constructor = t),
            u(t, n)
          var p = l.prototype
          return (
            (p.componentDidMount = function () {
              var e = this,
                t = this.state,
                n = t.zoom,
                c = t.centerLng,
                s = t.centerLat
              ;(this.card.current = new r.Map({
                container: this.mapContainer.current,
                style: r.MapStyle.STREETS,
                center: [c, s],
                zoom: n,
              })),
                a.Gn.forEach(function (t) {
                  return new r.Marker({ color: a.sG })
                    .setLngLat([t.lng, t.lat])
                    .addTo(e.card.current)
                })
            }),
            (p.shouldComponentUpdate = function (e) {
              var t = this.props.searchValue
              return e.searchValue !== t
            }),
            (p.componentDidUpdate = function (e) {
              var t = this,
                n = this.state,
                c = n.zoom,
                s = n.centerLng,
                o = n.centerLat,
                i = this.props.searchValue
              ;(c === e.zoom && o === e.centerLat && s === e.centerLng) ||
                ((this.card.current = new r.Map({
                  container: this.mapContainer.current,
                  style: r.MapStyle.STREETS,
                  center: [s, o],
                  zoom: c,
                })),
                a.Gn.forEach(function (e) {
                  Object.entries(e.currencies).some(function (n) {
                    return n[0].toLowerCase().includes(i.toLowerCase()) ||
                      n[1].toLowerCase().includes(i.toLowerCase())
                      ? new r.Marker({ color: a.sG })
                          .setLngLat([e.lng, e.lat])
                          .addTo(t.card.current)
                      : null
                  })
                }))
            }),
            (p.render = function () {
              return (0, i.jsx)('section', {
                className: s,
                children: (0, i.jsx)('div', {
                  ref: this.mapContainer,
                  className: o,
                }),
              })
            }),
            l
          )
        })(c.Component)
        var p
        function h() {
          return (
            (h = Object.assign
              ? Object.assign.bind()
              : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t]
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                  }
                  return e
                }),
            h.apply(this, arguments)
          )
        }
        const d = function (e) {
            return c.createElement(
              'svg',
              h(
                {
                  xmlns: 'http://www.w3.org/2000/svg',
                  width: '1em',
                  height: '1em',
                  fill: 'none',
                  viewBox: '0 0 24 24',
                },
                e,
              ),
              p ||
                (p = c.createElement('path', {
                  fill: '#9E9E9E',
                  d: 'M11.5 21.75c-5.65 0-10.25-4.6-10.25-10.25S5.85 1.25 11.5 1.25s10.25 4.6 10.25 10.25-4.6 10.25-10.25 10.25m0-19c-4.83 0-8.75 3.93-8.75 8.75s3.92 8.75 8.75 8.75 8.75-3.93 8.75-8.75-3.92-8.75-8.75-8.75M22 22.75c-.19 0-.38-.07-.53-.22l-2-2a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2 2c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22',
                })),
            )
          },
          f = 'G39J4FmEE3ENrQr09a5S'
        const y = (0, c.forwardRef)(function (e, t) {
          var n = e.type,
            r = e.placeholder,
            a = e.value,
            s = e.onChange,
            o = e.onKeyDown,
            u = (0, c.useRef)(null)
          return (
            (0, c.useImperativeHandle)(t, function () {
              return {
                blur: function () {
                  u.current.blur()
                },
              }
            }),
            (0, i.jsx)('input', {
              type: n,
              placeholder: r,
              value: a,
              onChange: s,
              onKeyDown: o,
              className: f,
              'data-cy': 'elastic-search-input',
              ref: u,
            })
          )
        })
        const m = 'KDxnRCoiFtpIdEoUYiSH',
          v = 'fxbjLhBzrcJ0Z9ounEu_',
          C = 'ZT1E2A13WLj0ZCP1eK1l',
          w = 'vpwpY7m6Q2CgQhhY5v9Q',
          V = 'qx8SzZ2dV5G6XXjfaksQ',
          j = '_CZags61XxqK7iGmBxi9',
          S = 'A4DoWSO0BdqoYdP_RSp5'
        function g(e, t) {
          return (
            (g = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (e, t) {
                  return (e.__proto__ = t), e
                }),
            g(e, t)
          )
        }
        const b = (function (e) {
            var t, n
            function r(t) {
              var n
              return (
                ((n = e.call(this, t) || this).checkTheOccurence = function () {
                  var e = n.state.inputValue,
                    t = []
                  a.wd.filter(function (n) {
                    return n.symbol.toLowerCase().includes(e.toLowerCase()) ||
                      n.name.toLowerCase().includes(e.toLowerCase())
                      ? t.push(n)
                      : null
                  }),
                    n.setState({ currenciesAppeared: t, displayVariants: !0 })
                }),
                (n.setInputValue = function (e) {
                  n.setState({ inputValue: e.target.value })
                }),
                (n.handleSearch = function () {
                  ;(0, n.props.setSearchValue)(n.state.inputValue),
                    n.setState({ displayVariants: !1 })
                }),
                (n.handleClickCard = function (e) {
                  ;(0, n.props.setSearchValue)(e.name),
                    n.setState({ inputValue: e.name, displayVariants: !1 }),
                    n.inputRef.current.blur()
                }),
                (n.handleKeyDown = function (e) {
                  var t = n.props.setSearchValue,
                    r = n.state.inputValue
                  'Escape' === e.key && n.setState({ displayVariants: !1 }),
                    'Enter' === e.key && (t(r), n.setState({ displayVariants: !1 }))
                }),
                (n.state = {
                  inputValue: '',
                  currenciesAppeared: [],
                  displayVariants: !1,
                }),
                (n.inputRef = (0, c.createRef)(null)),
                n
              )
            }
            ;(n = e),
              ((t = r).prototype = Object.create(n.prototype)),
              (t.prototype.constructor = t),
              g(t, n)
            var s = r.prototype
            return (
              (s.componentDidUpdate = function (e, t) {
                var n = this.state.inputValue
                t.inputValue !== n && this.checkTheOccurence()
              }),
              (s.render = function () {
                var e = this,
                  t = this.state,
                  n = t.inputValue,
                  r = t.currenciesAppeared,
                  a = t.displayVariants
                return (0, i.jsx)('section', {
                  className: m,
                  children: (0, i.jsxs)('div', {
                    className: v,
                    children: [
                      (0, i.jsx)(d, {
                        width: 24,
                        height: 24,
                        className: C,
                        onClick: this.handleSearch,
                        'data-cy': 'search-icon',
                      }),
                      (0, i.jsx)(y, {
                        type: 'text',
                        className: 'elastic-search-input',
                        placeholder: 'Currency search...',
                        value: n,
                        onChange: this.setInputValue,
                        onKeyDown: this.handleKeyDown,
                        dataCy: 'elastic-search-input',
                        ref: this.inputRef,
                      }),
                      0 !== r.length &&
                        (0, i.jsx)('div', {
                          className: a ? w : w + ' ' + j,
                          children: r.map(function (t) {
                            return (0, i.jsx)(
                              'div',
                              {
                                className: V,
                                onClick: function () {
                                  return e.handleClickCard(t)
                                },
                                'data-cy': 'currency-card-appeared',
                                children: t.name,
                              },
                              t.id,
                            )
                          }),
                        }),
                      0 === r.length &&
                        '' !== n &&
                        (0, i.jsx)('span', {
                          className: S,
                          'data-cy': 'bankCard-error',
                          children: 'Oops... There is no such currency!',
                        }),
                    ],
                  }),
                })
              }),
              r
            )
          })(c.Component),
          O = 'vgRQmD5T4AJYdeQR2UW0',
          x = 'fLWOaGyfgpESGYta3cn0',
          L = 'L8VFnuClfj5l05XwVWhf'
        function _(e, t) {
          return (
            (_ = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (e, t) {
                  return (e.__proto__ = t), e
                }),
            _(e, t)
          )
        }
        const k = (function (e) {
          var t, n
          function r(t) {
            var n
            return (
              ((n = e.call(this, t) || this).setSearchValue = function (e) {
                n.setState({ searchValue: e })
              }),
              (n.state = { searchValue: '', doSearch: !1 }),
              n
            )
          }
          return (
            (n = e),
            ((t = r).prototype = Object.create(n.prototype)),
            (t.prototype.constructor = t),
            _(t, n),
            (r.prototype.render = function () {
              var e = this.state,
                t = e.searchValue,
                n = e.doSearch
              return (0, i.jsxs)('article', {
                className: O,
                children: [
                  (0, i.jsx)('div', {
                    className: 'container',
                    children: (0, i.jsxs)('section', {
                      className: x,
                      children: [
                        (0, i.jsx)('p', {
                          className: L,
                          children: 'Search currency in the bank',
                        }),
                        (0, i.jsx)(b, { setSearchValue: this.setSearchValue }),
                      ],
                    }),
                  }),
                  (0, i.jsx)(l, { searchValue: t, doSearch: n }),
                ],
              })
            }),
            r
          )
        })(c.Component)
      },
    },
  ],
)
