'use strict'
;(self.webpackChunkcurrency_tracker = self.webpackChunkcurrency_tracker || []).push(
  [
    [28],
    {
      28: (e, t, a) => {
        a.r(t), a.d(t, { default: () => w })
        var s = a(257),
          r = a(985),
          n = a(358),
          c = a(294)
        const l = 'XrC_O0ehkYBAtF9tHxUG',
          o = 'X6zkDJdhM6E7rniV07s1',
          i = 'nxcS93n6cQjwJiVDRV3r',
          u = 'QVeGTvtZRIy6A8Wzp5L8',
          d = 'zc5nHAuJNOczYfHEEKQd',
          m = 'qJW_xgxVS1xWV5cNAhVA'
        var y = a(893)
        const h = (0, c.memo)(function (e) {
          var t = e.setCardClicked,
            a = e.setShow,
            s = e.symbol,
            c = e.rate
          return (0, y.jsx)('section', {
            className: l,
            onClick: function () {
              a(!0), t({ rate: Number(c), symbol: s })
            },
            'data-cy': 'card',
            role: 'presentation',
            children: (0, y.jsxs)('div', {
              className: o,
              children: [
                n.Z[s]({ className: m }),
                (0, y.jsxs)('div', {
                  className: i,
                  children: [
                    (0, y.jsx)('span', { className: u, children: r.Xx[s] }),
                    (0, y.jsxs)('span', { className: d, children: ['R$ ', c] }),
                  ],
                }),
              ],
            }),
          })
        })
        var N = a(356),
          f = a(935)
        const x = 'F6J9714dOLHN_ZIKw20V',
          p = 'E4dvTdVn04b5SUR6_37Y',
          b = 'celPFavHWG7w6UM13Ep3',
          S = 'ErdJbotH7qx0uywBK1tA'
        const w = function () {
          var e,
            t = localStorage.getItem('lastUpdated'),
            a = (0, c.useState)(
              null == (e = localStorage.getItem('rates')) || window.Cypress
                ? window.Cypress
                  ? r._v
                  : []
                : JSON.parse(e),
            ),
            n = a[0],
            l = a[1],
            o = (0, c.useState)(null != t ? JSON.parse(t) : 0),
            i = o[0],
            u = o[1],
            d = (0, c.useState)({ symbol: '', rate: 0 }),
            m = d[0],
            w = d[1],
            k = (0, c.useState)(!1),
            v = k[0],
            C = k[1],
            g = (0, c.useState)({}),
            j = g[0],
            _ = g[1],
            J = (0, c.useCallback)(function (e) {
              w(e)
            }, []),
            V = (0, c.useCallback)(function (e) {
              C(e)
            }, [])
          if (
            ((0, c.useEffect)(function () {
              ;(Date.now() - t > r.w$ || 0 === n.length) &&
                s.Z.get('' + r.CG.currencybeacon_request, {
                  params: { api_key: '' + r.CG.currencybeacon_api_key },
                })
                  .then(function (e) {
                    u(Date.now())
                    var t = Object.keys(e.data.rates)
                      .map(function (t) {
                        return t in r.Xx
                          ? {
                              rate:
                                'BTC' !== t
                                  ? Number(e.data.rates[t]).toFixed(2)
                                  : Number(e.data.rates[t]),
                              symbol: t,
                            }
                          : null
                      })
                      .filter(function (e) {
                        return null != e
                      })
                    return (
                      l(t),
                      localStorage.setItem('rates', JSON.stringify(t)),
                      localStorage.setItem('lastUpdated', JSON.stringify(i)),
                      !0
                    )
                  })
                  .catch(function (e) {
                    return _(e)
                  })
            }, []),
            j.message)
          )
            throw new Error(j.message + '. Please, try again later.')
          return (0, y.jsxs)('article', {
            className: x,
            children: [
              v
                ? (0, f.createPortal)(
                    (0, y.jsx)(N.Z, {
                      type: r.Ny.converter,
                      onModalClose: V,
                      currency: m,
                    }),
                    document.body,
                  )
                : null,
              (0, y.jsx)('div', {
                className: 'container',
                children: (0, y.jsxs)('div', {
                  className: p,
                  children: [
                    (0, y.jsx)('div', { className: b, children: 'Quotes' }),
                    (0, y.jsx)('section', {
                      className: S,
                      role: 'grid',
                      children: n.map(function (e, t) {
                        return (0, y.jsx)(
                          h,
                          {
                            setCardClicked: J,
                            setShow: V,
                            symbol: e.symbol,
                            rate: e.rate,
                          },
                          t,
                        )
                      }),
                    }),
                  ],
                }),
              }),
            ],
          })
        }
      },
    },
  ],
)
