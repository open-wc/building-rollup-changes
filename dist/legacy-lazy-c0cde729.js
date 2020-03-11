System.register([], function (_export, _context) {
  "use strict";

  var _, _t, importMeta, Foo, myTemplate;

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

  function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function html() {}

  function asyncFunction() {
    return _asyncFunction.apply(this, arguments);
  }

  function _asyncFunction() {
    _asyncFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 1);
              });

            case 2:
              return _context2.abrupt("return", true);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    }));
    return _asyncFunction.apply(this, arguments);
  }

  function forOf() {
    var map = new Map();
    map.set('a', 1);
    map.set('2', 2);
    var total = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2),
            k = _step$value[0],
            v = _step$value[1];

        total += v;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return total;
  }

  _export("_t", void 0);

  return {
    setters: [],
    execute: function () {
      _ = t => t;

      importMeta = {
        url: new URL('./demo/js/lazy.js', _context.meta.url).href
      };
      console.log('lazy loaded');

      Foo = /*#__PURE__*/function () {
        function Foo() {
          _classCallCheck(this, Foo);
        }

        _createClass(Foo, [{
          key: "bar",
          value: function bar() {
            return 'x';
          }
        }]);

        return Foo;
      }();

      myTemplate = html(_t || (_t = _`
  foo bar
`));
      console.log(Foo);
      console.log(myTemplate);
      console.log('async function compiled to: ', asyncFunction.toString());
      console.log('forOf function compiled to: ', forOf.toString());
      window.__startsWith = 'foo'.startsWith('fo');
      window.__map = new Map().set('foo', 'bar').get('foo') === 'bar';
      window.__importMeta = importMeta.url.startsWith(window.location.origin) && importMeta.url.endsWith('syntax.js');
      window.__asyncFunction = asyncFunction();
      window.__forOf = forOf() === 3;
    }
  };
});
