'use strict'
;(self.webpackChunkcurrency_tracker = self.webpackChunkcurrency_tracker || []).push(
  [
    [107],
    {
      107: (t, n, r) => {
        r.r(n), r.d(n, { default: () => m })
        var a = r(680),
          e = r(454),
          i = r(294),
          o = [
            {
              id: 1,
              informationPartName: 'City',
              informationPartValue: 'New York',
            },
            {
              id: 2,
              informationPartName: 'Phone',
              informationPartValue: '(555) 555-1234',
            },
            {
              id: 3,
              informationPartName: 'CEO',
              informationPartValue: 'Gerry Weber',
            },
            {
              id: 4,
              informationPartName: 'Email',
              informationPartValue: 'modsencurrencytracker@gmail.com',
            },
          ]
        const c = {
          content: 'sapQjDWR_T8GvGseHBuL',
          information: 'Ck0F_zgSsViOLj_qHvV9',
          title: 'XaaWNHoScjggcTkSqEz2',
          contacts: 'Mzc_n2GGgv1VhdoaqRMY',
          inf: 'ahwl30XVTjb9ZaNmcIkE',
          informationPart: 'C3JFFONB5HcyW0lEhjY6',
        }
        var s = r(893)
        function l(t, n) {
          return (
            (l = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (t, n) {
                  return (t.__proto__ = n), t
                }),
            l(t, n)
          )
        }
        const m = (function (t) {
          var n, r
          function i(n) {
            var r
            return ((r = t.call(this, n) || this).state = {}), r
          }
          return (
            (r = t),
            ((n = i).prototype = Object.create(r.prototype)),
            (n.prototype.constructor = n),
            l(n, r),
            (i.prototype.render = function () {
              return (0, s.jsxs)(s.Fragment, {
                children: [
                  (0, s.jsx)(e.Z, {}),
                  (0, s.jsx)('main', {
                    className: c.content,
                    children: (0, s.jsx)('div', {
                      className: 'container',
                      children: (0, s.jsxs)('div', {
                        className: c.information,
                        children: [
                          (0, s.jsx)('div', {
                            className: c.left,
                            children: (0, s.jsx)('span', {
                              className: c.title,
                              children: 'Our contacts',
                            }),
                          }),
                          (0, s.jsx)('div', {
                            className: c.right,
                            children: (0, s.jsx)('div', {
                              className: c.inner,
                              children: (0, s.jsx)('div', {
                                className: c.contacts,
                                children: o.map(function (t) {
                                  return (0, s.jsxs)(
                                    'p',
                                    {
                                      className: c.inf,
                                      children: [
                                        (0, s.jsxs)('span', {
                                          className: c.informationPart,
                                          children: [t.informationPartName, ':'],
                                        }),
                                        ' ',
                                        t.informationPartValue,
                                      ],
                                    },
                                    t.id,
                                  )
                                }),
                              }),
                            }),
                          }),
                        ],
                      }),
                    }),
                  }),
                  (0, s.jsx)(a.Z, {}),
                ],
              })
            }),
            i
          )
        })(i.Component)
      },
    },
  ],
)
