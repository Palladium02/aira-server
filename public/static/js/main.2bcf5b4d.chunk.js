(this["webpackJsonpaira-studio"] = this["webpackJsonpaira-studio"] || []).push([
  [0],
  {
    30: function (e, t, s) {},
    31: function (e, t, s) {},
    37: function (e, t, s) {},
    41: function (e, t, s) {},
    42: function (e, t, s) {},
    43: function (e, t, s) {
      "use strict";
      s.r(t);
      var a = s(1),
        c = s.n(a),
        r = s(21),
        n = s.n(r),
        i = s(4),
        d = s.n(i),
        l = s(9),
        j = s(7),
        b = (s(30), s(31), s(0)),
        o = function (e) {
          var t = e.username;
          return Object(b.jsxs)("div", {
            className: "app__header",
            children: [
              Object(b.jsx)("div", { className: "header__left" }),
              Object(b.jsxs)("div", {
                className: "header__center",
                children: ["AiraDB Studio - ", t],
              }),
              Object(b.jsx)("div", { className: "header__right" }),
            ],
          });
        },
        u = s(11),
        h = s(2),
        _ = s(10),
        O = s(24),
        m = s(22),
        x = s.n(m),
        p =
          (s(37),
          function () {
            var e = Object(a.useState)({ bytes: 1, tables: 0 }),
              t = Object(j.a)(e, 2),
              s = t[0],
              c = t[1],
              r = Object(a.useState)({
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Son"],
                datasets: [
                  {
                    label: "Requests on that day",
                    data: [0, 0, 0, 0, 0, 0, 0],
                    fill: !1,
                    borderColor: "rgb(86, 88, 214)",
                    tension: 0.3,
                  },
                ],
              }),
              n = Object(j.a)(r, 2),
              i = (n[0], n[1]),
              o = Object(a.useState)(null),
              h = Object(j.a)(o, 2),
              m = h[0],
              p = h[1];
            function v() {
              return (v = Object(l.a)(
                d.a.mark(function e() {
                  var t;
                  return d.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (e.next = 2), fetch("/api/getTotalStorageUsage")
                          );
                        case 2:
                          return (e.next = 4), e.sent.json();
                        case 4:
                          return (
                            (t = e.sent),
                            c({ bytes: t.bytes, tables: t.tables }),
                            e.abrupt("return", t)
                          );
                        case 7:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              )).apply(this, arguments);
            }
            function f() {
              return (f = Object(l.a)(
                d.a.mark(function e() {
                  var t, s;
                  return d.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (e.next = 2), fetch("/api/getTotalAmountOfRequests")
                          );
                        case 2:
                          return (e.next = 4), e.sent.json();
                        case 4:
                          return (
                            (t = e.sent),
                            i({
                              labels: [
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                                "Son",
                              ],
                              datasets: [
                                {
                                  label: "Requests on that day",
                                  data: t.requests,
                                  fill: !1,
                                  borderColor: "rgb(86, 88, 214)",
                                  tension: 0.3,
                                },
                              ],
                            }),
                            m && m.destroy(),
                            (s = new O.a(
                              document.querySelector("canvas#request__graph"),
                              {
                                type: "line",
                                data: {
                                  labels: [
                                    "Mon",
                                    "Tue",
                                    "Wed",
                                    "Thu",
                                    "Fri",
                                    "Sat",
                                    "Son",
                                  ],
                                  datasets: [
                                    {
                                      label: "Requests on that day",
                                      data: t.requests,
                                      fill: !1,
                                      borderColor: "rgb(86, 88, 214)",
                                      tension: 0.3,
                                    },
                                  ],
                                },
                              }
                            )),
                            p(s),
                            e.abrupt("return", t)
                          );
                        case 10:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              )).apply(this, arguments);
            }
            return (
              Object(a.useEffect)(function () {
                !(function () {
                  v.apply(this, arguments);
                })(),
                  (function () {
                    f.apply(this, arguments);
                  })();
              }, []),
              Object(b.jsxs)("div", {
                className: "dashboard",
                children: [
                  Object(b.jsx)("div", {
                    className: "dashboard__title",
                    children: Object(b.jsx)("h1", { children: "Dashboard" }),
                  }),
                  Object(b.jsxs)("div", {
                    className: "dashboard__body",
                    children: [
                      Object(b.jsxs)("div", {
                        className: "metrics__row",
                        children: [
                          Object(b.jsxs)("div", {
                            className: "storage__metrics",
                            children: [
                              Object(b.jsxs)("div", {
                                className:
                                  "storage__metrics__tableCount storage__metric",
                                children: [
                                  Object(b.jsx)("div", {
                                    className: "metrics__tableCount__number",
                                    children: s.tables,
                                  }),
                                  Object(b.jsx)("div", {
                                    className: "metrics__tableCount__title",
                                    children: "no. of tables",
                                  }),
                                ],
                              }),
                              Object(b.jsx)("div", {
                                className: "storage__metrics__divider",
                                children: Object(b.jsx)("div", {
                                  className: "divider__bar",
                                }),
                              }),
                              Object(b.jsxs)("div", {
                                className:
                                  "storage__metrics__storageUsed storage__metric",
                                children: [
                                  Object(b.jsx)("div", {
                                    className: "metrics__storageUsed__number",
                                    children: x()(
                                      (null === s || void 0 === s
                                        ? void 0
                                        : s.bytes) || 0
                                    ),
                                  }),
                                  Object(b.jsx)("div", {
                                    className: "metrics__storageUsed__title",
                                    children: "storage used",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          Object(b.jsx)("div", {
                            className: "add__table",
                            "data-title": "Add table",
                            children: Object(b.jsx)(u.b, {
                              to: "/addTable",
                              children: Object(b.jsx)(_.Plus, {
                                color: "rgb(209, 209, 209)",
                                size: 32,
                              }),
                            }),
                          }),
                        ],
                      }),
                      Object(b.jsx)("div", {
                        className: "request__metrics",
                        children: Object(b.jsx)("div", {
                          className: "request__amount",
                          children: Object(b.jsx)("canvas", {
                            className: "",
                            id: "request__graph",
                            height: "600",
                            width: "1000",
                          }),
                        }),
                      }),
                    ],
                  }),
                ],
              })
            );
          }),
        v = function () {
          return Object(b.jsx)("div", {
            className: "tableOverview",
            children: Object(b.jsx)("h1", { children: "TableOverview" }),
          });
        },
        f = function (e, t) {
          if (e.length <= t) return e;
          var s = e.split("");
          return s.splice(t, s.length - t), "".concat(s.join(""), "...");
        },
        N = function (e) {
          var t = e.fieldName,
            s = e.properties;
          return Object(b.jsxs)("div", {
            className: "addTable__sidebar__item",
            children: [
              Object(b.jsx)("span", { children: f(t, 17) }),
              Object(b.jsxs)("div", {
                className: "addTable__sidebar__item__specs",
                children: [
                  Object(b.jsx)("div", {
                    className: "item__specs__line",
                    children: Object(b.jsx)("div", {}),
                  }),
                  Object(b.jsx)("div", {
                    className: "item__specs__container",
                    children: s.map(function (e, t) {
                      return Object(b.jsx)("div", { children: e }, e + t);
                    }),
                  }),
                ],
              }),
            ],
          });
        },
        g =
          (s(41),
          function () {
            return Object(b.jsxs)("div", {
              className: "addTable",
              children: [
                Object(b.jsx)("div", {
                  className: "addTable__header",
                  children: Object(b.jsx)("h1", { children: "Add Table" }),
                }),
                Object(b.jsxs)("div", {
                  className: "addTable__body",
                  children: [
                    Object(b.jsxs)("div", {
                      className: "addTable__sidebar",
                      children: [
                        Object(b.jsx)("div", {
                          className: "addTable__sidebar__header",
                          children: "Fields:",
                        }),
                        Object(b.jsx)(N, {
                          fieldName: "_id",
                          properties: ["string", "unique"],
                        }),
                        Object(b.jsx)(N, {
                          fieldName: "age",
                          properties: ["number"],
                        }),
                        Object(b.jsx)(N, {
                          fieldName: "testtetetewertwtasda",
                          properties: ["string", "unique"],
                        }),
                      ],
                    }),
                    Object(b.jsx)("div", { className: "addTable__form" }),
                  ],
                }),
              ],
            });
          }),
        y =
          (s(42),
          function (e) {
            var t = (function () {
              var e = Object(l.a)(
                d.a.mark(function e(t) {
                  return d.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            t.preventDefault(),
                            (e.next = 3),
                            fetch("/auth/logout")
                          );
                        case 3:
                          window.location.reload();
                        case 4:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              );
              return function (t) {
                return e.apply(this, arguments);
              };
            })();
            return Object(b.jsx)("div", {
              className: "app__body",
              children: Object(b.jsxs)(u.a, {
                children: [
                  Object(b.jsxs)("div", {
                    className: "body__sidebar",
                    children: [
                      Object(b.jsx)(u.c, {
                        to: "/",
                        activeClassName: "sidebar__item__active",
                        exact: !0,
                        children: Object(b.jsx)("div", {
                          className: "sidebar__item",
                          children: Object(b.jsx)(_.Home, {}),
                        }),
                      }),
                      Object(b.jsx)(u.c, {
                        to: "/tableOverview",
                        activeClassName: "sidebar__item__active",
                        children: Object(b.jsx)("div", {
                          className: "sidebar__item",
                          children: Object(b.jsx)(_.Grid, {}),
                        }),
                      }),
                      Object(b.jsx)(u.c, {
                        to: "/addTable",
                        activeClassName: "sidebar__item__active",
                        children: Object(b.jsx)("div", {
                          className: "sidebar__item",
                          children: Object(b.jsx)(_.Plus, {}),
                        }),
                      }),
                      Object(b.jsx)("a", {
                        href: "/auth/logout",
                        onClick: t,
                        children: Object(b.jsx)("div", {
                          className: "sidebar__item",
                          children: Object(b.jsx)(_.SignOut, {}),
                        }),
                      }),
                    ],
                  }),
                  Object(b.jsx)("div", {
                    className: "body__pages",
                    children: Object(b.jsxs)(h.c, {
                      children: [
                        Object(b.jsx)(h.a, {
                          exact: !0,
                          path: "/",
                          children: Object(b.jsx)(p, {}),
                        }),
                        Object(b.jsx)(h.a, {
                          path: "/tableOverview",
                          children: Object(b.jsx)(v, {}),
                        }),
                        Object(b.jsx)(h.a, {
                          path: "/addTable",
                          children: Object(b.jsx)(g, {}),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            });
          }),
        w = Object(a.createContext)(null),
        T = function () {
          var e = Object(a.useState)({ email: "", username: "", id: "" }),
            t = Object(j.a)(e, 2),
            s = t[0],
            c = t[1];
          function r() {
            return (r = Object(l.a)(
              d.a.mark(function e() {
                var t, s;
                return d.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.next = 2), fetch("/api/getUserInfo");
                      case 2:
                        return (t = e.sent), (e.next = 5), t.json();
                      case 5:
                        return (s = e.sent), c(s), e.abrupt("return", s);
                      case 8:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          return (
            Object(a.useEffect)(function () {
              !(function () {
                r.apply(this, arguments);
              })();
            }, []),
            Object(b.jsx)("div", {
              className: "app",
              children: Object(b.jsxs)(w.Provider, {
                value: { user: s, setUser: c },
                children: [
                  Object(b.jsx)(o, { username: s.username }),
                  Object(b.jsx)(y, {}),
                ],
              }),
            })
          );
        },
        S = function () {
          var e = Object(a.useState)(""),
            t = Object(j.a)(e, 2),
            s = t[0],
            c = t[1],
            r = Object(a.useState)(""),
            n = Object(j.a)(r, 2),
            i = n[0],
            o = n[1],
            u = Object(a.useState)(""),
            h = Object(j.a)(u, 2),
            _ = h[0],
            O = h[1];
          function m() {
            return (m = Object(l.a)(
              d.a.mark(function e() {
                var t, a;
                return d.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.next = 2),
                          fetch("/auth/weblogin", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email: s, password: i }),
                          })
                        );
                      case 2:
                        return (t = e.sent), (e.next = 5), t.json();
                      case 5:
                        (a = e.sent).isAuth
                          ? window.location.reload()
                          : O(a.error);
                      case 7:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          return Object(b.jsx)("div", {
            className: "login",
            children: Object(b.jsxs)("form", {
              method: "post",
              onSubmit: function (e) {
                e.preventDefault(),
                  (function () {
                    m.apply(this, arguments);
                  })();
              },
              children: [
                Object(b.jsx)("input", {
                  type: "email",
                  name: "email",
                  onChange: function (e) {
                    c(e.target.value);
                  },
                  placeholder: "Email",
                }),
                Object(b.jsx)("input", {
                  type: "password",
                  name: "password",
                  onChange: function (e) {
                    o(e.target.value);
                  },
                  placeholder: "Password",
                }),
                Object(b.jsx)("input", { type: "submit", value: "Login" }),
                Object(b.jsx)("span", { children: _ }),
              ],
            }),
          });
        };
      var C = function () {
        var e = Object(a.useState)(!1),
          t = Object(j.a)(e, 2),
          s = t[0],
          c = t[1];
        function r() {
          return (r = Object(l.a)(
            d.a.mark(function e() {
              var t, s;
              return d.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (e.next = 2), fetch("/auth/isAuth");
                    case 2:
                      return (t = e.sent), (e.next = 5), t.json();
                    case 5:
                      (s = e.sent), c(s.isAuth);
                    case 7:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          )).apply(this, arguments);
        }
        return (
          Object(a.useEffect)(function () {
            !(function () {
              r.apply(this, arguments);
            })();
          }, []),
          Object(b.jsx)(b.Fragment, {
            children: s ? Object(b.jsx)(T, {}) : Object(b.jsx)(S, {}),
          })
        );
      };
      n.a.render(
        Object(b.jsx)(c.a.StrictMode, { children: Object(b.jsx)(C, {}) }),
        document.getElementById("root")
      );
    },
  },
  [[43, 1, 2]],
]);
//# sourceMappingURL=main.2bcf5b4d.chunk.js.map
