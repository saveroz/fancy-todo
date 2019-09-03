// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/index.js":[function(require,module,exports) {
$(document).ready(function () {
  $('.signUpForm').show();
  $('.signInForm').hide();

  if (localStorage.getItem('token')) {
    isLoggedIn(true);
  } else {
    isLoggedIn(false);
  }

  $('#click_register').click(function () {
    // $('#homepage_text').hide()
    $('.signUpForm').show();
    $('.signInForm').hide();
    $('.createTodo').hide();
    $('.todo').hide();
  });
  $('#click_login').click(function () {
    $('.signUpForm').hide();
    $('.signInForm').show();
    $('.createTodo').hide(); // $('.todo').hide()
  });
  $('#click_todo').click(function () {
    $('.todo').show();
  });
});
var server_url = "http://35.240.188.102";

function isLoggedIn(condition) {
  if (condition) {
    $('#click_todo').show();
    $('#signout').show();
    $('#PoetryBox').show();
    $('#click_register').hide();
    $('#click_login').hide();
    $('#todo').show();
    $('#todoButtonCreate').show();
    $('.signUpForm').hide();
    $('.signInForm').hide();
    getAlltodo();
    randomPoetry();
  } else {
    $('#signout').hide();
    $('#todo').hide();
    $('#todoButtonCreate').hide();
    $('#click_todo').hide();
    $('.signUpForm').show();
    $('#PoetryBox').hide();
  }
}

function login() {
  var email = $('#email2').val();
  var password = $('#password2').val();
  console.log(email, password);
  event.preventDefault();
  axios.post("".concat(server_url, "/users/login"), {
    email: email,
    password: password
  }).then(function (_ref) {
    var data = _ref.data;
    // console.log(data)
    localStorage.setItem('token', data); // console.log(data)
    // getAlltodo()
    // $('#todo').show()
    // $('#click_todo').show()
    // $('#signout').show()
    // $('.signInForm').hide()

    $('#click_register').hide();
    $('#click_login').hide();
    $('.signUpForm').hide();
    $('.signInForm').hide();
    $('#signout').show();
    $('#PoetryBox').show();
    getAlltodo();
    randomPoetry();
    swal("Success!", 'You have successfully login', "success");
    $('#todoButtonCreate').show();
  }).catch(function (err) {
    // console.log(err.message)
    swal("Error!", err.message, "error");
  });
}

function createTodo() {
  console.log("masuk ke create todo");
  var name = $('#inputTitleCreate').val();
  var description = $('#inputDescriptionCreate').val();
  var duedate = $('#inputDueDateCreate').val();
  var token = localStorage.getItem('token');
  event.preventDefault();
  $.ajax({
    url: "".concat(server_url, "/todo/create"),
    method: 'POST',
    data: {
      name: name,
      description: description,
      duedate: duedate
    },
    headers: {
      token: token
    }
  }).done(function (data) {
    swal("Success!", 'You have successfully created Task', "success");
    getAlltodo();
    $('.createTodo').hide(); // $('#student-list').prepend('<li>' + newStudent.name + '</li>');

    $('#inputDescriptionCreate').val(null);
    $('#inputTitleCreate').val(null);
    $('#inputDueDateCreate').val(null);
    $('#ModalCreate').modal('hide');
  }).fail(function (err) {
    var errMessage = err.responseJSON.message;
    swal("Error!", errMessage, "error");
  });
}

function deleteTodo(todoId) {
  var token = localStorage.getItem('token'); // let id = '5d50365ef9e4091ff0edff18'

  var id = todoId;
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true
  }).then(function (willDelete) {
    if (willDelete) {
      event.preventDefault();
      $.ajax({
        url: "".concat(server_url, "/todo"),
        method: "DELETE",
        data: {
          id: id
        },
        headers: {
          token: token
        }
      }).done(function (result) {
        swal("Success!", 'You have successfully  delete Task', "success");
        getAlltodo(); // console.log(result)
      }).fail(function (err) {
        console.log(err);
      });
    } else {
      swal("Your imaginary file is safe!");
    }
  });
}

function getAlltodo() {
  console.log('masuke ke get all'); // $('#homepage_text').hide()

  $('#todo').show();
  $('#alltask').show();
  $('.signUpForm').hide();
  $('.signInForm').hide();
  var token = localStorage.getItem('token');
  $.ajax({
    url: "".concat(server_url, "/todo"),
    method: 'GET',
    headers: {
      'token': token
    }
  }).done(function (alltodo) {
    $('#alltask').empty();
    $('.signUpForm').hide();
    var num = 1;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = alltodo[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var todo = _step.value;
        var objtodo = JSON.stringify(todo);
        var status = "";
        status = todo.status === true ? status = "completed" : status = "uncompleted";
        var color = todo.status === true ? "text-white bg-primary" : "text-white bg-danger";
        var cardclass = "card w-100 ".concat(color);
        var template = "<div class=\"col-4 d-flex align-items-stretch mb-4\">\n                <div class=\"".concat(cardclass, "\">\n                  <div class=\"card-body\">\n                    <h5 class=\"card-title\">").concat(todo.name, "</h5>\n                    <p class=\"card-text\">").concat(todo.description, "</p>\n                    <p class=\"card-text\">").concat(new Date(todo.duedate).toLocaleDateString("en-US", {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }), "</p>\n                    <p class=\"card-text\">").concat(status, "</p>\n                  </div>\n                  <div class=\"card-footer\" >\n                    <button class=\"btn btn-light\" data-toggle=\"modal\" data-target=\"#ModalEdit\" onclick='editForm(").concat(objtodo, ")'>edit</button> |||   \n                    <button class=\"btn btn-light\" onclick=\"deleteTodo('").concat(todo._id, "')\">delete</button>\n                    </div>\n                    </div>\n                </div>");
        num += 1;
        $('#alltask').append(template);
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
  }).fail(function (err) {
    console.log(err);
  });
}

function editForm(obj) {
  var todo = obj;
  var template = "\n    <form id=\"updateToDo\">\n    <div class=\"form-group\">\n        <label for=\"inputTitle\">Title</label>\n        <input type=\"text\" class=\"form-control\" id=\"inputTitleUpdate\" value=\"".concat(todo.name, "\"\n            required>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"inputDescription\">Description</label>\n        <textarea class=\"form-control\" id=\"inputDescriptionUpdate\" rows=\"3\"\n        > ").concat(todo.description, "</textarea>\n    </div>\n   \n    <div class=\"form-group\">\n        <label for=\"inputDueDate\">Due Date</label>\n        <input type=\"date\" class=\"form-control\" id=\"inputDueDateUpdate\"\n            value=\"").concat(new Date(todo.duedate).toLocaleDateString("en-US", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }), "\" required>\n    </div>\n\n    <div class=\"custom-control custom-radio\">\n             <input type=\"radio\" id=\"customRadio1\" name=\"inputStatus\" value=\"true\" class=\"inputStatus custom-control-input\">\n             <label class=\"custom-control-label\" for=\"customRadio1\">Done</label>\n            </div>\n         <div class=\"custom-control custom-radio\">\n            <input type=\"radio\" id=\"customRadio2\" name=\"inputStatus\" value=\"false\" class=\"inputStatus custom-control-input\">\n            <label class=\"custom-control-label\" for=\"customRadio2\">Not Done Yet</label>\n    </div>\n            <div class=\"modal-footer\">      \n                <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Close</button>\n            <button type=\"submit\" class=\"btn btn-primary\" data-dismiss=\"modal\"\n             onclick=\"editTodo('").concat(todo._id, "')\" >Submit!</button>\n            </div>\n        </form> \n  ");
  $('#updateTodoModalForm').html(template);
}

function editTodo(todoId) {
  var cuy = todoId;
  console.log(cuy);
  var id = todoId;
  var name = $('#inputTitleUpdate').val();
  var description = $('#inputDescriptionUpdate').val();
  var duedate = $('#inputDueDateUpdate').val();
  var status = $('input[name=inputStatus]:checked').val(); // console.log(status)

  status = status === "true" ? status = true : status = false; // console.log(status)

  var token = localStorage.getItem('token');
  event.preventDefault();
  $.ajax({
    url: "".concat(server_url, "/todo"),
    method: "PATCH",
    data: {
      id: id,
      name: name,
      description: description,
      duedate: duedate,
      status: status
    },
    headers: {
      token: token
    }
  }).done(function (result) {
    // console.log(result)
    swal("Success!", 'You have successfully edited Task', "success");
    getAlltodo();
  }).fail(function (err) {
    console.log(err);
  });
}

function signUp() {
  var username = $('#username').val();
  var email = $('#email').val();
  var password = $('#password').val();
  console.log('masuk ke signup');
  event.preventDefault();
  axios.post("".concat(server_url, "/users/register"), {
    username: username,
    email: email,
    password: password
  }).then(function (_ref2) {
    var data = _ref2.data;
    $('.signUpForm').hide();
    swal("Success!", data, "success");
  }).catch(function (err) {
    // console.log(err.message)
    swal("Error!", err.message, "error");
  });
}

function onSignIn(googleUser) {
  var idToken = googleUser.getAuthResponse().id_token;
  axios({
    method: "POST",
    url: "".concat(server_url, "/users/signIn"),
    data: {
      idToken: idToken
    }
  }).then(function (response) {
    console.log(response.data);
    localStorage.setItem('token', response.data);
    $('.signUpForm').hide();
    $('.signInForm').hide();
    $('#signout').show();
    $('#PoetryBox').show();
    $('#PoetryThirdApi').empty();
    $('#click_register').hide();
    $('#click_login').hide();
    getAlltodo();
    swal("Success!", 'You have successfully login', "success");
    $('#todoButtonCreate').show();
    randomPoetry();
  }).catch(function (err) {
    console.log("error");
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  $('#click_register').show();
  $('#click_login').show();
  $('#signout').hide();
  $('#click_todo').hide();
  $('.todo').hide();
  $('#todoButtonCreate').hide();
  $('#PoetryThirdApi').empty();
  $('#PoetryBox').hide();
  localStorage.removeItem('token');
  auth2.signOut().then(function () {
    console.log('User signed out.');
  }).catch(function (err) {
    console.log(err);
  });
}

function randomPoetry() {
  var proxyurl = "https://cors-anywhere.herokuapp.com/";
  var url = "https://www.poemist.com/api/v1/randompoems";
  $('#PoetryThirdApi').empty();
  axios({
    method: "GET",
    url: "".concat(proxyurl + url),
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }).then(function (poems) {
    var poemContent = poems.data[0].content;
    var poemTitle = poems.data[0].title;
    poemContent = poemContent.split('\n').slice(6).join("");
    var template = "\n        <div class='col-md-6 bg-light' style=\"border:8px solid gray;\" id=\"PoetryThirdApi\">\n            \n        <h2 class=\"mt-2\">".concat(poemTitle, "</h2>\n        <br>\n    \n        <p class=\"text-justify p-2\"  >\n        ").concat(poemContent, "\n           \n            \n        </p>\n        </div>\n        ");
    $('#PoetryBox').append(template); // console.log(poemTitle)
    // console.log(poemContent)
  }).catch(function (err) {
    console.log("error");
  });
}
},{}],"../../../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "36509" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map