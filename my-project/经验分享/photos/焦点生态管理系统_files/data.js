/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var $$config = __webpack_require__(1);
	var $$request = __webpack_require__(2);
	
	var app = {
	    mount: function (uiApp, domId) {
	        var app = new uiApp.constructor();
	        app.$mount(domId);
	    },
	    getToken: function (fn) {
	        $$request.ajax({
	            url: '//house-be-manage.focus' + window.env + '.cn/user/getToken',
	            withCredentials: true,
	            complete: function (data) {
	                var token = data && data.data && data.data.token || 'noToken';
	                fn(token);
	            }
	        });
	    },
	    adapter: function (uiApp) {
	        uiApp.router.on(function () {
	            var route = uiApp.router.getRoute();
	            if (route.path === '/component/detail-table') {
	                __webpack_require__(13);
	            }
	            if (route.path === '/component/manual-update-tab') {
	                __webpack_require__(19);
	            }
	        });
	    }
	};
	
	app.getToken(function (token) {
	    window.token = token;
	    var uiApp = window[$$config.namespace];
	    var domId = '#app-' + $$config.namespace;
	    app.mount(uiApp, domId);
	    app.adapter(uiApp);
	
	    if (document.getElementById('app-loupan')) {
	        uiApp.router.pushState('/404');
	    }
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
		"mdev-template": "vue",
		"public-path": "./",
		"debug": true,
		"element-ui": false,
		"namespace": "uiAppLouPan",
		"data-model": "data",
		"global-library": [
			"/src/ui/lib/reset.v3.1.1.css",
			"/src/ui/lib/global.css",
			"/src/ui/lib/global.js"
		],
		"dependencies": {},
		"port": 4010
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var $$request = __webpack_require__(4);
	var $$requestIframe = __webpack_require__(5);
	var $$limit = __webpack_require__(7);
	var $$querystring = __webpack_require__(9);
	__webpack_require__(12);
	
	
	var request = {
	    // params {object}
	    // params.url {string}
	    // params.type {string}
	    // params.data {object}
	    // params.complete {function}
	    // params.contentType {string}
	    // params.withCredentials {boolean}
	    // params.cache {boolean}
	    ajax: function (params) {
	        params = $$limit.requestFormat(params);
	
	        var url = params.url;
	        var type = params.type;
	        var headers = {};
	        var body = '';
	
	        var fnInitParams = function () {
	            // type
	            var methods = [ 'GET', 'POST' ];
	            if (typeof params.type !== 'string' || methods.indexOf(params.type.toUpperCase()) < 0) {
	                params.type = 'GET';
	            }
	
	            // Content-Type
	            if (params.type === 'POST') {
	                if (typeof params.contentType === 'string' && params.contentType.indexOf('application/json') >= 0) {
	                    headers['Content-Type'] = 'application/json; charset=UTF-8';
	                } else {
	                    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	                }
	            }
	
	            // body
	            var paramsDataString = $$querystring.stringify(params.data);
	            if (params.type === 'GET') {
	                if (paramsDataString && paramsDataString !== '') {
	                    if (params.url.indexOf('?') >= 0) {
	                        url += '&' + paramsDataString;
	                    } else {
	                        url += '?' + paramsDataString;
	                    }
	                }
	            }
	
	            if (params.type === 'POST') {
	                if (typeof params.contentType === 'string' && params.contentType.indexOf('application/json') >= 0 ) {
	                    body = JSON.stringify(params.data);
	                } else {
	                    body = $$querystring.stringify(params.data);
	                }
	            }
	
	            // cache
	            if (params.cache !== false) {
	                if (url.indexOf('?') >= 0) {
	                    url += '&_t=' + (+new Date());
	                } else {
	                    url += '?_t=' + (+new Date());
	                }
	            }
	        };
	        fnInitParams();
	
	        var fn = function (xhr) {
	            var data;
	
	            if (!xhr || typeof xhr.responseText !== 'string') {
	                data = {
	                    code: 'LR-01',
	                    msg: '请求失败',
	                    data: {}
	                }
	                console.error('[LIB-REQUEST] [SERVER ERROR]');
	            } else {
	                try {
	                    data = JSON.parse(xhr.responseText);
	                } catch (e) {
	                    data = {
	                        code: 'LR-02',
	                        msg: 'JSON格式化错误',
	                        data: {}
	                    }
	                    console.error('[LIB-REQUEST] [PARSE JSON ERROR]');
	                }
	            }
	
	            if (typeof params.complete === 'function') {
	                data = $$limit.responseFormat(data);
	                params.complete(data);
	            }
	        };
	
	        var fnIsCrossDomain = function () {
	            if (url.match(/^\/\//)) {
	                url = window.location.protocol + url;
	            }
	
	            var rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/;
	            var ajaxLocParts = rurl.exec(window.location.href.toLowerCase()) || [];
	            var parts = rurl.exec(url.toLowerCase());
	
	            return crossDomain = !!(
	                parts &&
	                    (parts[1] !== ajaxLocParts[1] ||
	                      parts[2] !== ajaxLocParts[2] ||
	                      (parts[3] ||
	                        (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] ||
	                          (ajaxLocParts[1] === "http:" ? "80" : "443")))
	            );
	        };
	
	        var isIframe = false;
	        if (fnIsCrossDomain()) {
	            if (window.navigator.userAgent.indexOf('MSIE 9.0') >= 0) {
	                isIframe = true;
	            }
	            if (window.navigator.userAgent.indexOf('MSIE 8.0') >= 0) {
	                isIframe = true;
	            }
	        }
	        if (isIframe) {
	            $$requestIframe.ajax(url, type, headers, body, params.withCredentials, fn);
	        } else {
	            $$request.ajax(url, type, headers, body, params.withCredentials, fn);
	        }
	    },
	    request: function (url, type, headers, body, withCredentials, fn) {
	        $$request.ajax(url, type, headers, body, withCredentials, fn);
	    },
	    requestByIframe: function (url, type, headers, body, withCredentials, fn) {
	        $$requestIframe.ajax(url, type, headers, body, withCredentials, fn);
	    },
	    pushWhiteList: function (url, key) {
	        $$limit.pushWhiteList(url, key);
	    },
	    pushParamsWhiteList: function (url, key) {
	        $$limit.pushParamsWhiteList(url, key);
	    }
	};
	
	
	module.exports = request;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var fnAddHeaders = function (headers, xmlhttp) {
	    var key, val;
	    for (key in headers) {
	        if (!headers.hasOwnProperty(key)) {
	            continue;
	        }
	        val = headers[key];
	        xmlhttp.setRequestHeader(key, val);
	    }
	};
	
	var fnIsCrossDomain = function (url) {
	    if (url.match(/^\/\//)) {
	        url = window.location.protocol + url;
	    }
	
	    var rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/;
	    var ajaxLocParts = rurl.exec(window.location.href.toLowerCase()) || [];
	    var parts = rurl.exec(url.toLowerCase());
	
	    return crossDomain = !!(
	        parts &&
	            (parts[1] !== ajaxLocParts[1] ||
	              parts[2] !== ajaxLocParts[2] ||
	              (parts[3] ||
	                (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] ||
	                  (ajaxLocParts[1] === "http:" ? "80" : "443")))
	    );
	};
	
	// url {String}
	// method {String}
	// headers {Object}
	// body {String}
	// credentials {Boolean}
	// complete {Function}
	var fnXmlHttpRequest = function (url, method, headers, body, credentials, complete) {
	    var fnFormatParams = function () {
	        var fnFormatHeaders = function () {
	            // header
	            if (headers instanceof Object !== true) {
	                headers = {};
	            }
	
	            // X-Requested-With
	            if (fnIsCrossDomain(url) !== true) {
	                headers['X-Requested-With'] = 'XMLHttpRequest';
	            }
	
	            // Accept
	            headers.Accept = typeof headers.Accept !== 'string' ? '*/*' : headers.Accept;
	        };
	
	        if (typeof url !== 'string' || url === '') {
	            url = window.location.href;
	        }
	
	        if (typeof method !== 'string') {
	            method = 'GET';
	        }
	
	        fnFormatHeaders();
	
	        credentials = (fnIsCrossDomain(url) === true && credentials === true) ? true : false ;
	
	        body = typeof body === 'string' ? body : '';
	    };
	
	    var fn = function () {
	        if (this.readyState === 3) {
	            this.responseHeader = this.getAllResponseHeaders();
	        }
	        if (this.readyState === 4) {
	            if (typeof complete === 'function') {
	                complete(this);
	            }
	        }
	    };
	
	    fnFormatParams();
	
	    var xmlhttp = new XMLHttpRequest();
	    xmlhttp.onreadystatechange = fn;
	    xmlhttp.open(method, url, true);
	    fnAddHeaders(headers, xmlhttp);
	    xmlhttp.withCredentials = credentials;
	    xmlhttp.send(body);
	};
	
	
	exports.ajax = fnXmlHttpRequest;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Messager = __webpack_require__(6).Messager;
	
	var fnGetMessager = (function () {
	    var messagerStorage = {};
	
	    var mapFnKeyStorage = {};
	
	    var messagerTag = Math.random();
	
	    var fnCreateIframe = function (domain) {
	        var protocol = window.location.protocol;
	        var iframe = window.document.createElement('iframe');
	        iframe.src = protocol + '//' + domain + '/crossdomain.html?tag=' + messagerTag;
	        iframe.style.display = 'none';
	        window.document.body.appendChild(iframe);
	
	        return iframe;
	    };
	
	    var fn = function (domain, fn) {
	        var messager = messagerStorage[domain] || {};
	
	        if (messager.ready === false) {
	            messager.readyFns = messager.readyFns || [];
	            messager.readyFns.push(fn);
	            return;
	        }
	
	        if (messager.ready === true) {
	            fn && fn(messager);
	            return;
	        }
	
	        // create messager
	        messager.frame = fnCreateIframe(domain);
	        messager.ready = false;
	        messager.readyFns = [ fn ];
	        messager.post = function (msg, fn) {
	            var key = 'key-' + (+new Date()) + window.Math.random().toFixed(15);
	            msg = key + ',' + encodeURIComponent(msg);
	            mapFnKeyStorage[key] = fn;
	            Messager.post(messager.frame.contentWindow, messagerTag + ',' + domain + ',' + 'child', msg);
	        };
	        messagerStorage[domain] = messager;
	
	        // listen
	        Messager.listen(messagerTag + ',' + domain + ',' + 'parent', function(msg) {
	            if (msg === '[[ready]]') {
	                messager.ready = true;
	                (function () {
	                    var i, fn;
	                    for (i = 0; i < messager.readyFns.length; i++) {
	                        fn = messager.readyFns[i];
	                        fn && fn(messager);
	                    }
	                }());
	            } else {
	                msg = msg.split(',');
	                mapFnKeyStorage[msg[0]] && mapFnKeyStorage[msg[0]](decodeURIComponent(msg[1]));
	            }
	        });
	    };
	
	    Messager.createListener(window);
	
	    return fn;
	}());
	
	var fnRequest = function (opt, fn) {
	    var domain = opt.url.match(/\/\/(.*?)\//);
	    if (domain) {
	        domain = domain[1];
	    } else {
	        domain = window.location.host;
	    }
	
	    fnGetMessager(domain, function (messager) {
	        var msg = JSON.stringify(opt);
	
	        messager.post(msg, function (msg) {
	            msg = JSON.parse(msg);
	            fn && fn(msg);
	        });
	    });
	};
	
	var fnAjax = function (url, method, headers, body, credentials, complete) {
	    var opt = {
	        url: url,
	        method: method,
	        headers: headers,
	        body: body,
	        credentials: credentials
	    };
	
	    fnRequest(opt, complete);
	};
	
	exports.ajax = fnAjax;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var separator = '[[[SP]]]';
	
	
	var callbackStorage = {};
	
	
	var Messager = {};
	
	
	Messager.createListener = function (target) {
	    var callback = function (msg) {
	        if (typeof msg !== 'object') {
	            return;
	        }
	
	        // 验证是否是匹配的信息
	        msg = typeof msg.data === 'string' ? msg.data : '';
	        msg = msg.split(separator);
	        if (msg.length !== 2) {
	            return;
	        }
	
	        // 执行用户自定义回调
	        callbackStorage[msg[0]] = callbackStorage[msg[0]] || [];
	        var fns = callbackStorage[msg[0]];
	        var i;
	        for (i = 0; i < fns.length; i++) {
	            fns[i](msg[1]);
	        }
	    };
	
	    if ('addEventListener' in document) {
	        target.addEventListener('message', callback, false);
	    } else if ('attachEvent' in document) {
	        target.attachEvent('onmessage', callback);
	    }
	};
	
	
	Messager.listen = function (category, fn) {
	    callbackStorage[category] = callbackStorage[category] || [];
	    if (typeof fn === 'function') {
	        callbackStorage[category].push(fn);
	    }
	};
	
	
	Messager.post = function (target, category, msg) {
	    if (typeof msg !== 'string') {
	        console.log('msg should be string');
	        return;
	    }
	    target.postMessage(category + separator + msg, '*');
	};
	
	
	exports.Messager = Messager;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var $$util = __webpack_require__(8);
	var $$querystring = __webpack_require__(9);
	var responseWhiteList = {};
	var requestWhiteList = {};
	
	
	var limit = {
	    requestFormat: function (params) {
	        var fnValidateQueryString = function (data) {
	            var fnValidate = function (key, val) {
	                var msg = '[LIB-REQUEST] [REQUEST FEILD ERROR] [' + key + ': ' + val + ']';
	
	                if (val instanceof Object === true) {
	                    console.error(msg);
	                    return false;
	                }
	
	                if (typeof val !== 'string') {
	                    val = JSON.stringify(val) || '';
	                }
	
	                while (val.indexOf('%') >= 0) {
	                    try {
	                        val = decodeURIComponent(val);
	                    } catch(e) {
	                        break;
	                    }
	                }
	
	                try {
	                    val = JSON.parse(val);
	                    if (val instanceof Object === true) {
	                        console.error(msg);
	                        return false;
	                    }
	                } catch (e) {}
	
	                return true;
	            };
	
	            var formatMap = {};
	            var key, val;
	            for (key in data) {
	                if (!data.hasOwnProperty(key)) {
	                    continue;
	                }
	                val = data[key];
	                if (fnValidate(key, val) === true) {
	                    formatMap[key] = val;
	                }
	            }
	            
	            return formatMap;
	        };
	
	        var fnValidateUrl = function (url) {
	            if (typeof url !== 'string' || url === '') {
	                url = window.location.href;
	            }
	
	            var qs = url.split('?')[1];
	            var obj = $$querystring.parse(qs);
	            qs = $$querystring.stringify(fnValidateQueryString(obj));
	            if (qs && qs !== '') {
	                return url.split('?')[0] + '?' + qs;
	            } else {
	                return url.split('?')[0];
	            }
	        };
	
	        var fnValidateJson = function (data) {
	            if (data instanceof Object === false) {
	                return {};
	            }
	        
	            var fnWalkObject, fnWalkArray;
	
	            fnWalkArray = function (array) {
	                var tbasic = false;
	                var tobject = false;
	                var isOneKeyObject = true;
	
	                $$util.arrayClear(array);
	
	                array.forEach(function (item, i) {
	                    var it = $$util.type(item);
	                    if (it === 'array') {
	                        array[i] = '[LIB-REQUEST] [REQUEST ARRAY ERROR]';
	                        return;
	                    }
	                    if (it === 'object') {
	                        tobject = true;
	                        if ($$util.getObjectKeys(item).length > 1) {
	                            isOneKeyObject = false;
	                        }
	                        return;
	                    }
	                    tbasic = true;
	                });
	
	                if (tbasic === true && tobject === true) {
	                    array = '[LIB-REQUEST] [REQUEST ARRAY ERROR]';
	                    return;
	                }
	
	                if (tobject === true && array.length > 0 && isOneKeyObject === true) {
	                    (function () {
	                        var key = $$util.getObjectKeys(array[0])[0];
	                        array.forEach(function (item, i) {
	                            array[i] = item[key];
	                        });
	                    }());
	                    return;
	                }
	
	                if (tobject === true && array.length > 0 && isOneKeyObject === false) {
	                    array.forEach(function (item) {
	                        fnWalkObject(item);
	                    });
	                }
	            };
	
	            fnWalkObject = function (object) {
	                var key, val, vt;
	                for (key in object) {
	                    if (!object.hasOwnProperty(key)) {
	                        continue;
	                    }
	                    val = object[key];
	                    vt = $$util.type(val);
	                    if (vt === 'object') {
	                        if (val === null) {
	                            delete object[key];
	                        } else if ($$util.isEmptyObject(val)) {
	                            delete object[key];
	                        } else {
	                            fnWalkObject(val);
	                        }
	                    } else if (vt === 'array') {
	                        fnWalkArray(val);
	                    } else if (vt === 'undefined') {
	                        delete object[key];
	                    }
	                }
	            };
	
	            fnWalkObject(data);
	
	            return data;
	        };
	
	        // url
	        params.url = fnValidateUrl(params.url);
	
	        // data
	        if (params.type === 'POST' && params.contentType === 'application/json') {
	            params.data = fnValidateJson(params.data);
	        } else {
	            params.data = fnValidateQueryString(params.data);
	        }
	
	        return params;
	    },
	    responseFormat: function (data) {
	        var fnValidateStructure = function (data) {
	            var msg = '[LIB-REQUEST] [RESPONSE STRUCTURE ERROR]';
	            var vdata = {
	                code: 'LR-03',
	                msg: msg,
	                data: {}
	            };
	
	            if (data instanceof Object === false) {
	                data = vdata;
	            }
	
	            var ctype = $$util.type(data.code);
	            var mtype = $$util.type(data.msg);
	            var dtype = $$util.type(data.data);
	
	            var pass = true;
	
	            if (['number', 'string'].indexOf(ctype) < 0) {
	                data.code = vdata.code;
	                pass = false;
	            }
	            if (['string'].indexOf(mtype) < 0) {
	                data.msg = vdata.msg;
	                pass = false;
	            }
	            if (['number', 'boolean', 'string', 'array', 'object'].indexOf(dtype) < 0) {
	                data.data = vdata.data;
	                pass = false;
	            }
	
	            return data;
	        };
	
	        var fnProcessApi = function (data) {
	            if (data instanceof Object === false) {
	                return {};
	            }
	
	            var fnWalkObject, fnWalkArray;
	
	            fnWalkArray = function (array) {
	                var tbasic = false;
	                var tobject = false;
	                var tarray = false;
	                var isOneKeyObject = true;
	
	                $$util.arrayClear(array);
	
	                array.forEach(function (item, i) {
	                    var it = $$util.type(item);
	                    if (it === 'array') {
	                        array[i] = '[LIB-REQUEST] [RESPONSE ARRAY ERROR]';
	                        return;
	                    }
	                    if (it === 'object') {
	                        tobject = true;
	                        if ($$util.getObjectKeys(item).length > 1) {
	                            isOneKeyObject = false;
	                        }
	                        return;
	                    }
	                    tbasic = true;
	                });
	
	                if (tbasic === true && tobject === true) {
	                    array = '[LIB-REQUEST] [RESPONSE ARRAY ERROR]';
	                    return;
	                }
	
	                // one key
	                if (tobject === true && array.length > 0 && isOneKeyObject === true) {
	                    (function () {
	                        var key = $$util.getObjectKeys(array[0])[0];
	                        array.forEach(function (item, i) {
	                            array[i] = item[key];
	                        });
	                    }());
	                    return;
	                }
	
	                // basic
	                if (tbasic === true && tobject === false) {
	                    array.forEach(function (item, i) {
	                        array[i] = item.toString();
	                    });
	                    return;
	                }
	
	                // object
	                if (tobject === true && array.length > 0 && isOneKeyObject === false) {
	                    array.forEach(function (item) {
	                        fnWalkObject(item);
	                    });
	                }
	            };
	
	            fnWalkObject = function (object) {
	                var key, val, vt;
	                for (key in object) {
	                    if (!object.hasOwnProperty(key)) {
	                        continue;
	                    }
	                    val = object[key];
	                    vt = $$util.type(val);
	                    if (vt === 'object') {
	                        if (val === null) {
	                            delete object[key];
	                        } else if ($$util.isEmptyObject(val)) {
	                            delete object[key];
	                        } else {
	                            fnWalkObject(val);
	                        }
	                    } else if (vt === 'array') {
	                        fnWalkArray(val);
	                    } else if (vt === 'undefined') {
	                        delete object[key];
	                    } else {
	                        try {
	                            object[key] = val.toString();
	                        } catch (e) {}
	                    }
	                }
	            };
	
	            fnWalkObject(data);
	
	            return data;
	        };
	
	        data = fnValidateStructure(data);
	        data = fnProcessApi(data);
	
	        return data;
	    },
	    pushWhiteList: function (url, key) {
	        if (typeof url !== 'string' || url === '') {
	            return;
	        }
	        if (typeof key !== 'string' || key === '') {
	            return;
	        }
	        responseWhiteList[url] = responseWhiteList[url] || [];
	        responseWhiteList[url].push(key);
	    },
	    pushParamsWhiteList: function (url, key) {
	        if (typeof url !== 'string' || url === '') {
	            return;
	        }
	        if (typeof key !== 'string' || key === '') {
	            return;
	        }
	        requestWhiteList[url] = requestWhiteList[url] || [];
	        requestWhiteList[url].push(key);
	    }
	};
	
	
	module.exports = limit;


/***/ },
/* 8 */
/***/ function(module, exports) {

	exports.type = function (val) {
	    var t = typeof val;
	    if (t === 'object' && val instanceof Array === true) {
	        t = 'array';
	    }
	    return t;
	};
	
	exports.isEmptyObject = function (object) {
	    var _this = this;
	    if (_this.type(object) !== 'object') {
	        return false;
	    }
	
	    var key;
	    for (key in object) {
	        if (object.hasOwnProperty(key)) {
	            return false;
	        }
	    }
	    return true;
	};
	
	exports.arrayClear = function (array, val) {
	    var _this = this;
	    var cnt = 0;
	    var i, item;
	    var match;
	    var i1;
	    for (i = 0; i < array.length; i++) {
	        match = false;
	        item = array[i];
	        if (item === null) {
	            match = true;
	        } else if (item === undefined) {
	            match = true;
	        } else if (_this.type(item) === 'object' && JSON.stringify(item) === '{}') {
	            match = true;
	        }
	
	        if (match) {
	            for (i1 = i; i1 < array.length; i1++) {
	                array[i1] = array[i1 + 1];
	            }
	            array.length = array.length - 1;
	        }
	    }
	};
	
	exports.getObjectKeys = function (object) {
	    var akey = [];
	    var key;
	    for (key in object) {
	        if (object.hasOwnProperty(key)) {
	            akey.push(key);
	        }
	    }
	    return akey;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(10);
	exports.encode = exports.stringify = __webpack_require__(11);


/***/ },
/* 10 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};
	
	var isArray = Array.isArray || function (xs) {
	  return Object.prototype.toString.call(xs) === '[object Array]';
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if (typeof obj === 'object') {
	    return map(objectKeys(obj), function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (isArray(obj[k])) {
	        return map(obj[k], function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};
	
	var isArray = Array.isArray || function (xs) {
	  return Object.prototype.toString.call(xs) === '[object Array]';
	};
	
	function map (xs, f) {
	  if (xs.map) return xs.map(f);
	  var res = [];
	  for (var i = 0; i < xs.length; i++) {
	    res.push(f(xs[i], i));
	  }
	  return res;
	}
	
	var objectKeys = Object.keys || function (obj) {
	  var res = [];
	  for (var key in obj) {
	    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
	  }
	  return res;
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	/*---------------------------------------*
	* Array
	*---------------------------------------*/
	(function (ap) {
	    // indexOf
	    if (ap.indexOf) {
	        return;
	    }
	
	    ap.indexOf = function (val) {
	        var i, item;
	        for (i = 0; i < this.length; i++) {
	            item = this[i];
	            if (val === item) {
	                break;
	            }
	        }
	
	        if (i < this.length) {
	            return i;
	        } else {
	            return -1;
	        }
	    };
	
	    // forEach
	    if (ap.forEach) {
	        return;
	    }
	
	    ap.forEach = function (fn) {
	        if (typeof fn !== 'function') {
	            return;
	        }
	
	        var i, item;
	        for (i = 0; i < this.length; i++) {
	            item = this[i];
	            fn.call(this, item, i);
	        }
	    };
	}(Array.prototype));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var $$config = __webpack_require__(1);
	var $$format = __webpack_require__(14);
	var $$request = __webpack_require__(2);
	var $$domain = __webpack_require__(15);
	var uiApp = window[$$config.namespace];
	var $$querystring = __webpack_require__(9);
	
	
	var controller = {
	    detailTable: {
	        renderList: function () {
	            let $$loupanInfo = __webpack_require__(16);
	            let ui = uiApp.getModule('module-detail-table');
	            let ud = ui.get();
	
	            if (ud.showTabName === 'album') {
	                let ui = uiApp.getModule('module-loupan-photos');
	                $$loupanInfo.getAlbumInfo(ud.messageId, ud.showTabName, function (data) {
	                        data = data && data.data || {};
	                        data.detail = data.detail || [];
	                        data.detail.map(function(item) {
	                            item.actualValue = item.actualValue || {};
	                            item.showValue = item.showValue || {};
	                            item.categoryId = item.actualValue.photoType;
	                            item.selected = false;
	                        });
	                        data.detail.forEach(function(item) {
	                            item.categoryError = false;
	                        });
	                        ui.set('photoList', data.detail);
	                        ui.set('messageId', data.messageId);
	                    }
	                );
	                return;
	            }
	
	            ui.set('loading1', true);
	            ui.set('loading2', true);
	            ui.set('contentType', ud.tabs[0].contentType);
	            //debugger
	            $$loupanInfo.getLoupanInfo(ud.messageId, ud.showTabName, ud.tabs[0].contentType,
	                function (data) {
	                    //debugger
	                    if (data.code !== "200") {
	                        return;
	                    }
	
	                    var data = data || data.data || [];
	                    if (data.data) {
	                       $$loupanInfo.parseTab(data.data.detail);
	                    }
	    
	                    data.data = data.data || {};
	                    if(data.data.status == 1 || data.data.status ==2) {
	                        ui.set('auditFinished', true);
	                    }
	
	                    if(data.data.status == 0) {
	                        ui.set('auditFinished', false);
	                    }
	
	                    ui.set('from', data.data.url);
	                    ui.set('pid', data.data.pid);
	                    ui.set('showTab', data.data);
	                    ui.set('loading1', false);
	                },
	                function (data) {
	                    var data = data || data.data || [];
	
	                    // if (data.data) {
	                    //    $$loupanInfo.parseTab2(data.data.detail);
	                    // }
	
	                    // //debugger
	                    // if (ud.showTabName === 'layout') {
	                    //     ui.set('showTab3', data.data);
	                    // } else {
	                    //     ui.set('showTab2', data.data);
	                    // }
	                    ui.set('showTab2', data.data);
	                    ui.set('loading2', false);
	                },
	                function (data) {                   
	                    if (data.code !== '200') {
	                        return;
	                    }
	                    var data = data || data.data || [];
	                    ud.updateTab = [];
	                    var k;
	                    for (k in data.data) {
	                        if (data.data[k] == '0') {
	                            ud.updateTab.push(k);
	                        }
	                    }
	                    ui.set('updateTab', ud.updateTab);
	                }
	            );
	        }
	    }
	};
	
	
	var fnInsertFeild = function (fieldName, fieldId, actualValue) {
	    return new Promise((resolve, reject) => {
	        var data = uiApp.getModule('module-detail-table').get();
	        var url = `${$$domain}/spiderMessage/insertComplexToProject/${data.showTabName}/${data.messageId}/${fieldName}`;
	        $$request.ajax({
	            url: url,
	            type: 'POST',
	            contentType: 'application/json',
	            withCredentials: true,
	            data: {
	                token: window.token,
	                fieldId: fieldId,
	                actualValue: actualValue
	            },
	            complete: function (data) {
	                typeof resolve === 'function' && resolve(data);
	            }
	        });
	    });
	};
	
	
	var fnUpdateFeild = function (fieldName, originId, fieldId, actualValue) {
	    return new Promise((resolve, reject) => {
	        var data = uiApp.getModule('module-detail-table').get();
	        var url = `${$$domain}/spiderMessage/updateComplexToProject/${data.showTabName}/${data.messageId}/${fieldName}`;
	        $$request.ajax({
	            url: url,
	            type: 'POST',
	            contentType: 'application/json',
	            withCredentials: true,
	            data: {
	                token: window.token,
	                originId: originId,
	                fieldId: fieldId,
	                actualValue: actualValue
	            },
	            complete: function (data) {
	                typeof resolve === 'function' && resolve(data);
	            }
	        });
	    });
	};
	
	
	var fnAddEvent = function () {
	    var fnIssuePrice = function () {
	        uiApp.evt.on('module-issue-price', 'cancel', function (next) {
	            next();
	            uiApp.router.pushState('/component/detail-table');
	        });
	        uiApp.evt.on('module-issue-price', 'saveData', function (next) {
	            var data = uiApp.getModule('module-issue-price').get();
	            fnInsertFeild('salePriceList', data.cache.fieldId, {
	                priceType: data.priceStatus,
	                lowPrice: data.minPrice,
	                avgPrice: data.averagePrice,
	                highPrice: data.maxPrice,
	                priceTime: data.date,
	                priceDesc: data.discriptiveInfo
	            }).then(function (data) {
	                if (data.code === '200') {
	                    next();
	                    uiApp.router.pushState('/component/detail-table');
	                } else {
	                    alert('服务器错误：' + data.msg);
	                }
	            });
	        });
	    };
	
	    var fnLicense = function () {
	        uiApp.evt.on('module-license-info', 'cancel', function (next) {
	            next();
	            uiApp.router.pushState('/component/detail-table');
	        });
	        uiApp.evt.on('module-license-info', 'saveData', function (next) {
	            var data = uiApp.getModule('module-license-info').get();
	            fnInsertFeild('licence', data.cache.fieldId, {
	                licencePhoto: data.liceseImg,
	                licenceGetTime: data.date,
	                licenceNo: data.liceseNum,
	                saleScope: data.sailRange
	            }).then(function (data) {
	                if (data.code === '200') {
	                    next();
	                    uiApp.router.pushState('/component/detail-table');
	                } else {
	                    alert('服务器错误：' + data.msg);
	                }
	            });
	        });
	    };
	
	    var fnOpening = function () {
	        uiApp.evt.on('module-issue-opening-quotation-info', 'cancel', function (next) {
	            uiApp.router.pushState('/component/detail-table');
	        });
	        uiApp.evt.on('module-issue-opening-quotation-info', 'saveData', function (next) {
	            var data = uiApp.getModule('module-issue-opening-quotation-info').get();
	            //debugger;
	
	            fnInsertFeild('openInfoList', data.cache.fieldId, {
	                openingYear: data.yearId == -1 ? 0 : data.monthId,
	                openingMonth: data.monthId == -1 ? 0 : data.monthId,
	                openingDay: data.dayId == -1 ? 0 : data.monthId,
	                openingDesc: data.discriptiveInfo
	            }).then(function (data) {
	                if (data.code === '200') {
	                    next();
	                    uiApp.router.pushState('/component/detail-table');
	                } else {
	                    alert('服务器错误：' + data.msg);
	                }
	            });
	        });
	    };
	
	    var fnSubmitted = function () {
	        uiApp.evt.on('module-issue-submitted-info', 'cancel', function (next) {
	            next();
	            uiApp.router.pushState('/component/detail-table');
	        });
	        uiApp.evt.on('module-issue-submitted-info', 'saveData', function (next) {
	            var data = uiApp.getModule('module-issue-submitted-info').get();
	            fnInsertFeild('deliInfoList', data.cache.fieldId, {
	                deliveryYear: data.yearId == -1 ? 0 : data.yearId,
	                deliveryMonth: data.monthId == -1 ? 0 : data.monthId,
	                deliveryDay: data.dayId == -1 ? 0 : data.dayId,
	                deliveryDesc: data.discriptiveInfo
	            }).then(function (data) {
	                if (data.code === '200') {
	                    next();
	                    uiApp.router.pushState('/component/detail-table');
	                } else {
	                    alert('服务器错误：' + data.msg);
	                }
	            });
	        });
	    };
	
	    var fnSailAddress = function () {
	        uiApp.evt.on('module-sail-address', 'cancel', function (next) {
	            next();
	            if (window.location.href.indexOf('spiderUpdateItem') < 0) {
	                return;
	            }
	            uiApp.router.pushState('/component/detail-table');
	        });
	        uiApp.evt.on('module-sail-address', 'saveData', function (next) {
	            if (window.location.href.indexOf('spiderUpdateItem') < 0) {
	                next();
	                return;
	            }
	            var fnComplete = function (data) {
	                if (data.code === '200') {
	                    next();
	                    uiApp.router.pushState('/component/detail-table');
	                } else {
	                    alert('服务器错误：' + data.msg);
	                }
	            };
	
	            var data = uiApp.getModule('module-sail-address').get();
	            if (!data.id) {
	                fnInsertFeild('saleAddressList', data.cache.fieldId, {
	                    saleProvinceId: data.provinceId,
	                    saleCityId: data.cityId,
	                    saleVDistrictId: data.zoneId,
	                    saleCircleIds: data.areaIds.join(','),
	                    saleAddress: data.detailedAddress,
	                    salePhones: data.telephoneArray.join(',')
	                }).then(fnComplete);
	            } else {
	                fnUpdateFeild('saleAddressList', data.id, data.cache.fieldId, {
	                    saleProvinceId: data.provinceId,
	                    saleCityId: data.cityId,
	                    saleVDistrictId: data.zoneId,
	                    saleCircleIds: data.areaIds.join(','),
	                    saleAddress: data.detailedAddress,
	                    salePhones: data.telephoneArray.join(',')
	                }).then(fnComplete);
	            }
	        });
	    };
	
	    var fnHouseType = function () {
	        uiApp.evt.on('module-house-type', 'cancel', function (next) {
	            if (window.location.href.indexOf('spiderUpdateItem') < 0) {
	                next();
	                return;
	            }
	            next();
	            uiApp.router.pushState('/component/detail-table');
	        });
	        uiApp.evt.on('module-house-type', 'saveData', function (next) {
	            if (window.location.href.indexOf('spiderUpdateItem') < 0) {
	                next();
	                return;
	            }
	            var fnComplete = function (data) {
	                if (data.code === '200') {
	                    next();
	                    uiApp.router.pushState('/component/detail-table');
	                } else {
	                    alert('服务器错误：' + data.msg);
	                }
	            };
	
	            var data = uiApp.getModule('module-house-type').get();
	            data.data.layoutOrientation = data.data.layoutOrientation.join(',');
	            data.data.layoutFeature = data.data.layoutFeature.join(',');
	            if (!data.data.id) {
	                fnInsertFeild('layout', data.cache.fieldId, data.data).then(fnComplete);
	            } else {
	                fnUpdateFeild('layout', data.data.id, data.cache.fieldId, data.data).then(fnComplete);
	            }
	        });
	    };
	
	    var fnDetailTable = function () {
	        uiApp.evt.on('module-detail-table', 'changeTab', function (next, name) {
	            next();
	            controller.detailTable.renderList();
	        });
	        uiApp.evt.on('module-detail-table', 'editOrLookupComplex', function (next, item, index) {
	            var data = uiApp.getModule('module-detail-table').get();
	            if (item.fieldName === 'saleAddressList' || item.fieldName === 'layout') {
	                let qs = $$querystring.stringify({
	                    messageId: data.messageId,
	                    tag: data.showTabName,
	                    pid: data.pid,
	                    fieldName: item.fieldName,
	                    fieldId: item.fieldId
	                });
	                uiApp.getModule('module-house-type-advice').set({
	                    'showValue': item.showValue,
	                    'actualValue': item.actualValue
	                });
	                uiApp.router.pushState('/dialog/house-type-advice?' + qs);
	            }
	            if (item.fieldName === 'salePriceList') {
	                uiApp.router.pushState('/dialog/issue-price');
	                if (!item.actualValue) {
	                    item.actualValue = {}
	                }
	                uiApp.getModule('module-issue-price').set({
	                    'status': 3,
	                    'priceStatus': item.actualValue.priceType,
	                    'averagePrice': item.actualValue.avgPrice,
	                    'maxPrice': item.actualValue.highPrice,
	                    'minPrice': item.actualValue.lowPrice,
	                    'discriptiveInfo': item.actualValue.priceDesc,
	                    'date': $$format.dateToString(item.actualValue.priceTime),
	                    'referenceInfo': {
	                        'priceStatus': item.showValue.priceType,
	                        'averagePrice': item.showValue.avgPrice,
	                        'maxPrice': item.showValue.highPrice,
	                        'minPrice': item.showValue.lowPrice,
	                        'discriptiveInfo': item.showValue.priceDesc,
	                        'date': item.showValue.priceTime
	                    },
	                    'cache': {
	                        'fieldId': item.fieldId
	                    }
	                });
	            }
	            if (item.fieldName === 'openInfoList') {
	                uiApp.router.pushState('/dialog/issue-opening-quotation-info');
	                //debugger;
	                uiApp.getModule('module-issue-opening-quotation-info').set({
	                    'status': 3,
	                    'yearId': item.actualValue.openingYear,
	                    'monthId': item.actualValue.openingMonth,
	                    'dayId': item.actualValue.openingDay,
	                    'discriptiveInfo': item.actualValue.openingDesc,
	                    'year': item.showValue.openingYear || '',
	                    'month': item.showValue.openingMonth || '',
	                    'day': item.showValue.openingDay || '',
	                    'kaipanDes': item.showValue.openingDesc,
	                    'cache': {
	                        'fieldId': item.fieldId
	                    }
	                });
	            }
	            if (item.fieldName === 'deliInfoList') {
	                uiApp.router.pushState('/dialog/issue-submitted-info');
	                //debugger;
	                uiApp.getModule('module-issue-submitted-info').set({
	                    'status': 3,
	                    'yearId': item.actualValue.deliveryYear,
	                    'monthId': item.actualValue.deliveryMonth,
	                    'dayId': item.actualValue.deliveryDay,
	                    'discriptiveInfo': item.actualValue.deliveryDesc,
	                    'year': item.showValue.diliveryYear || '',
	                    'month': item.showValue.diliveryMonth || '',
	                    'day': item.showValue.diliveryDay || '',
	                    'kaipanDes': item.showValue.diliveryDesc,
	                    'cache': {
	                        'fieldId': item.fieldId
	                    }
	                });
	            }
	            if (item.fieldName === 'licence') {
	                uiApp.router.pushState('/dialog/license-info');
	                uiApp.getModule('module-license-info').set({
	                    'status': 3,
	                    'liceseNum': item.actualValue && item.actualValue.licenceNo || '',
	                    'date': $$format.dateFormat(new Date(parseInt(item.actualValue && item.actualValue.licenceGetTime || '')), 'yyyy-MM-dd'),
	                    'sailRange': item.actualValue && item.actualValue.saleScope || '',
	                    'liceseImg': item.actualValue && item.actualValue.licencePhoto || '',
	                    'referenceInfo': {
	                        'liceseNum': item.showValue.licenceNo,
	                        'date': item.showValue.licenceGetTime,
	                        'sailRange': item.showValue.saleScope,
	                        'liceseImg': item.showValue.licencePhoto || ''
	                    },
	                    'cache': {
	                        'fieldId': item.fieldId
	                    }
	                });
	            }
	        });
	    };
	
	    fnIssuePrice();
	    fnLicense();
	    fnOpening();
	    fnSubmitted();
	    fnSailAddress();
	    fnHouseType();
	    fnDetailTable();
	};
	
	
	var fnAdapterRouter = function () {
	    var adapter = function () {
	        var route = uiApp.router.getRoute();
	
	        if (route.path === '/component/detail-table') {
	            let ui = uiApp.getModule('module-detail-table');
	            if (route.query.messageId) {
	                ui.set('cityId', route.query.cityId);
	                ui.set('messageId', route.query.messageId);
	                ui.set('projectName', route.query.projectName);
	                ui.set('showTabName', 'sale');
	            }
	            controller.detailTable.renderList();
	        }
	    };
	
	    uiApp.router.on(adapter);
	    adapter();
	};
	
	
	fnAddEvent();
	fnAdapterRouter();


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * 公共方法
	 */
	
	exports.queryString = function (obj) {
	    var str = '';
	    if (typeof obj === 'object' && !obj.length) {
	        for (var k in obj) {
	            str += '&' + k + '=' + obj[k];
	        }
	        str = str.substr(1);
	        return str;
	    } else {
	        return str;
	    }
	};
	exports.arrToObject = function (arr, keyName, valName) {
	    var obj = {};
	    arr.forEach(function (item, i) {
	        if (item instanceof Object && item.hasOwnProperty(keyName) && item.hasOwnProperty(keyName)) {
	            obj[item[keyName]] = item[valName];
	        }
	    });
	    return obj;
	};
	
	
	exports.dateToString = function (dateString, isDetail) {
	    var rt = '';
	
	    if (!dateString) {
	        return rt;
	    }
	
	    try {
	        var date = new Date(dateString);
	        if (!date.valueOf()) {
	            date = new Date(parseInt(dateString, 10));
	            if (!date.valueOf()) {
	                return rt;
	            }
	        }
	
	        var y = date.getFullYear();
	        var m = date.getMonth() + 1;
	        var d = date.getDate();
	
	        rt = y + '-' + (m >= 10 ? m : '0' + m) + '-' + (d >= 10 ? d : '0' + d);
	        if (isDetail) {
	            var h = date.getHours();
	            var min = date.getMinutes();
	            var s = date.getSeconds();
	            rt += ' ' + (h >= 10 ? h : '0' + h) + ':' + (min >= 10 ? min : '0' + min) + ':' + (s >= 10 ? s : '0' + s);
	        }
	    } catch (e) {
	    }
	
	    return rt;
	};
	
	exports.ymdToString = function (y, m, d) {
	    var rt = '';
	
	    y = y || '';
	    m = m || '';
	    d = d || '';
	
	    var year = y;
	    var month = "";
	    var day = "";
	
	    if (m > 12 || m == 0) {
	        if (m == 0) month = "全年";
	        else if (m == 13) month = "上半年";
	        else if (m == 14) month = "下半年";
	        else month = "";
	    } else if (m == "") {
	        month = "--";
	    } else {
	        month = m >= 10 ? m : '0' + m;
	    }
	
	
	    if (d > 31) {
	        if (d == 41) day = "上旬";
	        else if (d == 42) day = "中旬";
	        else if (d == 43) day = "下旬";
	        else day = "";
	    } else if (d == "") {
	        day = "--";
	    } else {
	        day = d >= 10 ? d : '0' + d;
	    }
	
	    rt = year + '-' + month + '-' + day;
	
	    return rt;
	};
	
	
	exports.arrToString = function (arr) {
	    if (!arr) return '';
	    return arr.join(',');
	};
	
	
	exports.objArrToString = function (arr, key) {
	    if (!arr || !arr.length) return '';
	    var array = [];
	    arr.forEach(function (item) {
	        array.push(item[key]);
	    });
	    return array.join(',');
	};
	
	
	exports.toString = function (val) {
	    if (val === undefined || val === null || val === NaN || !val.toString) return '';
	    return val.toString();
	};
	
	
	exports.toStringPlus = function (data, keys) {
	    if (data instanceof Object !== true || typeof keys !== 'string') {
	        return;
	    }
	
	    keys = keys.split(':');
	
	    keys.forEach(function (item) {
	        if (data.hasOwnProperty(item) && data[item] !== undefined && data[item].toString) {
	            data[item] = data[item].toString();
	        }
	    });
	};
	
	
	exports.stringToArray = function (str, sp) {
	    if (typeof str !== 'string' || typeof sp !== 'string') {
	        return;
	    }
	};
	
	exports.booleanToNum = function (obj) {
	    if (obj) {
	        return 1;
	    } else {
	        return 0;
	    }
	};
	
	exports.formateParams = function (data) {
	    var params = 'params=';
	    return params + encodeURIComponent(JSON.stringify(data));
	};
	
	exports.strToArray = function (data) {
	    if (data) return data.split(',');
	    else return [];
	};
	
	exports.strToKeyArr = function (data, key) {
	    if (data) return data.split(key);
	    return [];
	};
	
	exports.dateToNum = function (from, to) {
	    var dateFrom = new Date(from);
	    var dateTo = new Date(to);
	
	    return parseInt((dateTo - dateFrom) / 86400000, 10);
	};
	
	exports.arrObjToarr = function (obj, key, fn) {
	    var arr = [];
	    if (obj && obj.length) {
	        obj.forEach(function (item) {
	            if (typeof fn === 'function') {
	                arr.push(fn(item[key]));
	            } else {
	                arr.push(item[key]);
	            }
	        });
	    }
	
	    return arr;
	};
	
	exports.getFullLength = function (str) {
	    if (typeof str != 'string') {
	        return 'wrong type'
	    }
	    if (str.trim() === '') {
	        return 0;
	    }
	    var len = str.length;
	    return len || 0;
	    var fullLen = 0;
	    for (var i = 0; i < len; i++) {
	        var code = str.charCodeAt(i);
	        if (code > 255) {
	            fullLen += 1;
	        } else {
	            fullLen += 0.5;
	        }
	    }
	    return Math.ceil(fullLen);
	};
	
	/**
	 * @description selecter 模块接受数据格式化函数
	 * @arr {Array} 格式化数组
	 * @key {String} 原数组中的文字值
	 * @value {String} 原数组中的值
	 */
	exports.selecterFor = function (arr, key, value) {
	    if (!arr || !arr.length) return [];
	    arr.forEach(function (item) {
	        item.text = item[key];
	        item.value = item[value];
	    });
	
	    return arr;
	};
	
	exports.getType = function (key) {
	    var type = typeof key;
	    if (type === 'string') {
	        return 'string';
	    }
	    if (type === 'number') {
	        return 'number';
	    }
	    if (type === 'object') {
	        if (key instanceof Array) {
	            return 'array';
	        }
	        return 'object';
	    }
	    if (type === 'function') {
	        return 'function';
	    }
	    if (type === 'undefined') {
	        return 'undefined';
	    }
	};
	
	exports.isEqual = function (keyA, keyB) {
	    var tag = false;
	    var that = this;
	    var typeA;
	    var typeB;
	    var isEqualArray = function (arrA, arrB) {
	        var tag = [];
	        var isEqual = true;
	        if (arrA.length !== arrB.length) return false;
	        arrA.forEach(function (item, index) {
	            var hasK = false;
	            arrB.forEach(function (item2) {
	                if (that.isEqual(item2, item)) {
	                    hasK = true;
	                }
	            });
	            if (hasK) tag[index] = true;
	        });
	        tag.forEach(function (item) {
	            if (!item) isEqual = false;
	        });
	
	        return isEqual;
	    };
	    var isEqualObject = function (objA, objB) {
	        var k;
	        var j;
	        var tag = true;
	        for (k in objA) {
	            if (!that.isEqual(objA[k], objB[k])) {
	                tag = false;
	            }
	        }
	        for (k in objB) {
	            if (!that.isEqual(objA[k], objB[k])) {
	                tag = false;
	            }
	        }
	
	        return tag;
	    };
	    var isEqualString = function (strA, strB) {
	        return strA === strB;
	    };
	    var isEqualNumber = function (numA, numB) {
	        return numA === numB;
	    };
	    var isEqualUnd = function (undA, undB) {
	        return undA === undB;
	    };
	
	    typeA = this.getType(keyA);
	    typeB = this.getType(keyB);
	
	    if (typeA !== typeB) return tag;
	    if (typeA === 'string') {
	        tag = isEqualString(keyA, keyB);
	    } else if (typeA === 'number') {
	        tag = isEqualNumber(keyA, keyB);
	    } else if (typeA === 'array') {
	        tag = isEqualArray(keyA, keyB);
	    } else if (typeA === 'object') {
	        tag = isEqualObject(keyA, keyB);
	    } else if (typeA === 'undefined') {
	        tag = isEqualUnd(keyA, keyB);
	    }
	    return tag;
	};
	
	exports.filterParams = function (submitObj, sourceObj) {
	    var k;
	    for (k in submitObj) {
	        if (sourceObj[k] === undefined) {
	            continue;
	        }
	        if (typeof submitObj[k] === 'object' && submitObj[k].length === undefined) {
	            this.filterParams(submitObj[k], sourceObj[k]);
	        } else if (this.isEqual(sourceObj[k], submitObj[k])) {
	            delete submitObj[k];
	        }
	    }
	
	    return submitObj;
	};
	
	exports.filterUnd = function (obj) {
	    var type = this.getType(obj);
	    var k;
	    for (k in obj) {
	        if (obj[k] === 'object') {
	            this.filterUnd(obj[k]);
	        }
	        if (obj[k] === undefined) {
	            delete obj[k];
	        }
	    }
	};
	
	// 时间戳转换为正确格式的字符串
	exports.dateFormat = function (date, str) {
	    var o = {
	        "M+": date.getMonth() + 1, //月份 
	        "d+": date.getDate(), //日 
	        "h+": date.getHours(), //小时 
	        "m+": date.getMinutes(), //分 
	        "s+": date.getSeconds(), //秒 
	        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
	        "S": date.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(str)) str = str.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(str)) str = str.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return str;
	};
	
	exports.checkIsNull = function (data) {
	    if (!data && data != 0) return true;
	    else return false;
	};
	
	exports.priceTypeProcessor = function (data, priceType) {
	    var returnVal = "";
	    var priceTypeNum = parseInt(priceType, 10);
	
	    switch (priceTypeNum) {
	         case 0:
	             returnVal = "待定";
	             break;
	         case 1:
	             if (this.checkIsNull(data)) returnVal = "";
	             else returnVal = data + ' ' + "元/平方米";
	             break;
	         case 2:
	             if (this.checkIsNull(data)) returnVal = "";
	             else returnVal = data + ' ' + "万元/套";
	             break;
	         default:
	             break;
	     }
	
	     return returnVal;
	};
	
	exports.getObjPropertyNum = function (obj) {
	    var counter = 0;
	    for (var prop in obj) counter++;
	    return counter;
	};
	
	exports.fnNew = function (newVal, status, type) {
	    var newValue = "";
	    //debugger;
	    switch (type) {
	        case 0:
	            newValue =  newVal;
	            break;
	        case 1:
	        //debugger;
	            if (Object.prototype.toString.call(newVal) !== '[object Array]' && parseInt(newVal, 10) == 0) {
	                if (status !== 3) newValue = "未勾选";
	                else if (status == 3) newValue = "";
	            } else {
	                newValue = newVal || "";
	            }
	            
	            break;
	        case 2:
	        //debugger;
	            if (newVal == "") {
	                if (status !== 3) newValue = "未填写";
	                else if (status == 3) newValue = "";
	            } else {
	                newValue = newVal || "";
	            }   
	            break;
	        case 3:
	        //debugger;
	            if (newVal && newVal.length == 0) {
	                if (status !== 3) newValue = "未勾选";
	                else if (status == 3) newValue = "";
	            } else {
	                newValue = newVal || "";
	            }
	            
	            break;
	        case 4:
	        //debugger;
	            if (newVal == 0) {
	                if (status !== 3) newValue = "未填写";
	                else if (status == 3) newValue = "";
	            } else {
	                newValue = newVal || "";
	            }   
	            break;
	        default:
	            break;
	    }
	
	    return newValue;
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = '//house-be-manage.focus' + window.env +'.cn';


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var $$request = __webpack_require__(2);
	var $$mapEnum = __webpack_require__(17);
	var domain = '//house-be-manage.focus' + window.env +'.cn';
	
	
	var loupanInfo = {
		getLoupanInfo: function(messageId, type, contentType, fnSimple, fnComplex, fnGetUpdate) {
	        if (contentType !== 1) {
	            $$request.ajax({
	                url: domain + '/spiderMessage/find/' + type + '/' + messageId,
	                method: 'GET',
	                withCredentials: true,
	                complete: function (data) {
	                    typeof fnSimple === 'function' && fnSimple(data);
	                }
	            });
	        }
	        
	        if (contentType !== 0) {
	            $$request.ajax({
	                url: domain + '/spiderMessage/findComplex/' + type + '/' + messageId,
	                method: 'GET',
	                withCredentials: true,
	                complete: function (data) {
	                    typeof fnComplex === 'function' && fnComplex(data);
	                }
	            });
	        }
	
	        $$request.ajax({
	            url: domain + '/spiderMessage/status/' + messageId,
	            type: 'GET',
	            withCredentials: true,
	            complete: function (data) {
	                typeof fnGetUpdate === 'function' && fnGetUpdate(data);
	            }
	        });
	    },
	    
	    updateLoupanInfo: function(messageId, type, fieldName, actualVal, fn) {
	        $$request.ajax({
	            url: domain + '/spiderMessage/updateToProject/' + type + '/' + messageId + '/' + fieldName,
	            type: 'POST',
	            withCredentials: true,
	            data: {token : window.token, actualValue : actualVal},
	            complete: function (data) {
	                typeof fn === 'function' && fn(data);
	            }
	        });
	    },
	
	    ignoreLoupanInfo: function(messageId, type, fieldName, fn) {
	        $$request.ajax({
	            url: domain + '/spiderMessage/field/ignore/' + type + '/' + messageId + '/' + fieldName,
	            type: 'POST',
	            withCredentials: true,
	            data: {token : window.token},
	            complete: function (data) {
	                typeof fn === 'function' && fn(data);
	            }
	        });
	    },
	
	    parseTab :function(tab) {
	        //debugger
	        var _this = this;
	        tab.forEach(function (item) {
	            if(item.fieldName == 'projRealestateDeveloper') {
	                item['projectOld2'] = "";
	                _this.getDeveloperName(item.projectOld, function(data) {
	                    var data = data || [];
	                    var arr = [];
	                    if (data.data) {
	                        data.data.forEach( function(element, index) {
	                        arr.push(element.realestateDeveloperName);
	                        });
	                        item['projectOld2'] = arr.join(',');
	                    }
	                    console.log(item['projectOld2']);
	                });
	                item['actualValue2'] = "";
	                _this.getDeveloperName(item.actualValue, function(data) {
	                    var data = data || [];
	                    var arr = [];
	                    if (data.data) {
	                        data.data.forEach( function(element, index) {
	                            arr.push(element.realestateDeveloperName);
	                        });
	                        item['actualValue2'] = arr.join(',');
	                    } else {
	                        item['actualValue2'] = "";
	                    }
	                    console.log(item['actualValue2']);                    
	                });
	
	            } else {
	
	            item['actualValue2'] = $$mapEnum.getTextByValue3(item['fieldName'], item['actualValue'] || "").updateArr1;
	            item['actualValue3'] = $$mapEnum.getTextByValue3(item['fieldName'], item['actualValue'] || "").updateArr2;
	            item['projectOld2'] = $$mapEnum.getTextByValue3(item['fieldName'], item['projectOld'] || "").updateArr1;
	            }
	        });
	    },
	
	    // parseTab2 :function(tab) {
	    //     //debugger
	    //     var _this = this;
	    //     tab.forEach(function (item) {
	    //         item['actualValue'] = item['actualValue'] || {;
	    //     });
	    // },
	
	    getDeveloperName: function(developerName, fn) {
	        $$request.ajax({
	            url: 'http://house-sv-base.focus' + window.env + '.cn/' + 'company/getKfsName',
	            method: 'GET',
	            data: {list: developerName},
	            contentType: 'application/json',
	            // withCredentials: true,
	            complete: function (data) {
	                typeof fn === 'function' && fn(data);
	            }
	        });
	    },
	
	    getAlbumInfo: function(messageId, type, fn) {
	        $$request.ajax({
	            url: domain + '/spiderMessage/findComplex/' + type + '/' + messageId,
	            method: 'GET',
	            withCredentials: true,
	            complete: function (data) {
	                typeof fn === 'function' && fn(data);
	            }
	        });
	    },
	
	    updateAlbumInfo: function(messageId, actualVal, fieldId, fn) {
	        $$request.ajax({
	            url: domain + '/spiderMessage/insertComplexToProject/album/' + messageId + '/album',
	            type: 'POST',
	            withCredentials: true,
	            contentType: 'application/json',
	            data: {token : window.token, actualValue : actualVal, fieldId: fieldId},
	            complete: function (data) {
	                typeof fn === 'function' && fn(data);
	            }
	        });
	    },
	
	    ignoreAlbumInfo: function(messageId, fieldId, fn) {
	        $$request.ajax({
	            url: domain + '/spiderMessage/field/ignoreList/album/' + messageId + '/album',
	            type: 'POST',
	            withCredentials: true,
	            data: {token : window.token, fieldId: fieldId},
	            complete: function (data) {
	                typeof fn === 'function' && fn(data);
	            }
	        });
	    }
	
	    // checkHasUpdate: function(messageId, fn) {
	    //     $$request.ajax({
	    //         url: domain + '/spiderMessage/status/' + messageId,
	    //         type: 'GET',
	    //         withCredentials: true,
	    //         complete: function (data) {
	    //             typeof fn === 'function' && fn(data);
	    //         }
	    //     });
	    // }
	};
	
	module.exports = loupanInfo;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var data = __webpack_require__(18);
	
	var indexMap = {
	};
	
	module.exports = {
	    existsKey: function (key) {
	        return !!data[key];
	    },
	    getListByKey: function (key) {
	        if (!data[key]) {
	            console.error(`not exists the key "${key}"`);
	        }
	
	        return data[key];
	    },
	    getListByFeildName: function (feildName) {
	        if (!indexMap[feildName] && !data[feildName]) {
	            console.error(`not exists the feildName "${feildName}"`);
	        }
	
	        var key = indexMap[feildName] || feildName;
	        return this.getListByKey(key);
	    },
	    getTextByValue: function (feildName, value) {
	        var arr = this.getListByFeildName(feildName) || [];
	        var text = '';
	        arr.forEach(function (item) {
	            if (value === item.value) {
	                text = item.text;
	            }
	        });
	        return text;
	    },
	    getTextByValue2: function (feildName, value) {
	        if (!indexMap[feildName] && !this.existsKey(feildName)) return value;
	        var arr = this.getListByFeildName(feildName) || [];
	        if (arr.length == 0) return value;
	
	        var text = '';
	        arr.forEach(function (item) {
	            if (value == item.value) {
	                text = item.text;
	            }
	        });
	        return text;
	    },
	    getTextByValue3: function (feildName, value) {
	        if (value == "") return "";
	        var _this = this;
	        var infoArr = value.split(',');
	        var updateArr1 = [];
	        var updateArr2 = [];
	        infoArr.map(
	            function (v) {
	                var newVal = _this.getTextByValue2(feildName, v);
	                if(newVal != '') {
	                    updateArr1.push(newVal);
	                    updateArr2.push(v);
	                }           
	            }
	        );
	        return {updateArr1 : updateArr1.join(','), updateArr2 : updateArr2.join(',')};
	    }
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = {
		"saleStatus": [
			{
				"value": 0,
				"text": "待售"
			},
			{
				"value": 1,
				"text": "在售"
			},
			{
				"value": 2,
				"text": "售罄"
			}
		],
		"salePhase": [
			{
				"value": 1,
				"text": "期房"
			},
			{
				"value": 2,
				"text": "现房"
			},
			{
				"value": 3,
				"text": "尾房"
			}
		],
		"priceType": [
			{
				"value": 0,
				"text": "待定"
			},
			{
				"value": 1,
				"text": "单价"
			},
			{
				"value": 2,
				"text": "总价"
			}
		],
		"priceUnitType": [
			{
				"value": 1,
				"text": "元/平方米"
			},
			{
				"value": 2,
				"text": "万元/套"
			}
		],
		"constructTypes": [
			{
				"value": 1,
				"text": "板楼"
			},
			{
				"value": 2,
				"text": "塔楼"
			},
			{
				"value": 3,
				"text": "板塔结合"
			},
			{
				"value": 4,
				"text": "低层"
			},
			{
				"value": 5,
				"text": "多层"
			},
			{
				"value": 6,
				"text": "小高层"
			},
			{
				"value": 7,
				"text": "超高层"
			},
			{
				"value": 8,
				"text": "高层"
			},
			{
				"value": 9,
				"text": "联排"
			},
			{
				"value": 10,
				"text": "独栋"
			},
			{
				"value": 11,
				"text": "叠拼"
			},
			{
				"value": 12,
				"text": "双拼"
			}
		],
		"projFeatures": [
			{
				"value": 2,
				"text": "公园地产"
			},
			{
				"value": 3,
				"text": "创意地产"
			},
			{
				"value": 4,
				"text": "科技住宅"
			},
			{
				"value": 5,
				"text": "投资地产"
			},
			{
				"value": 6,
				"text": "旅游地产"
			},
			{
				"value": 7,
				"text": "中式地产"
			},
			{
				"value": 8,
				"text": "宜居生态地产"
			},
			{
				"value": 9,
				"text": "养老地产"
			},
			{
				"value": 10,
				"text": "海景地产"
			},
			{
				"value": 11,
				"text": "江景地产"
			},
			{
				"value": 12,
				"text": "山景地产"
			},
			{
				"value": 13,
				"text": "湖景地产"
			},
			{
				"value": 14,
				"text": "河景地产"
			},
			{
				"value": 15,
				"text": "岛屿地产"
			},
			{
				"value": 16,
				"text": "复合地产"
			},
			{
				"value": 17,
				"text": "产权式酒店"
			},
			{
				"value": 18,
				"text": "股权式酒店"
			},
			{
				"value": 19,
				"text": "庭院式住宅"
			},
			{
				"value": 20,
				"text": "教育地产"
			},
			{
				"value": 21,
				"text": "小户型"
			},
			{
				"value": 22,
				"text": "低总价"
			},
			{
				"value": 23,
				"text": "大平层"
			},
			{
				"value": 24,
				"text": "名企盘"
			},
			{
				"value": 25,
				"text": "五证齐全"
			}
		],
		"projDecorations": [
			{
				"value": 1,
				"text": "毛坯"
			},
			{
				"value": 2,
				"text": "简装修"
			},
			{
				"value": 3,
				"text": "精装修"
			}
		],
		"propertyManagementFeeUnit": [
			{
				"value": 0,
				"text": "元/平方米.月"
			},
			{
				"value": 1,
				"text": "元/套.月"
			},
			{
				"value": 2,
				"text": "元/户.年"
			}
		],
		"photoType": [
			{
				"value": 0,
				"text": "效果图"
			},
			{
				"value": 1,
				"text": "实景图"
			},
			{
				"value": 2,
				"text": "样板间"
			},
			{
				"value": 3,
				"text": "楼层平面图"
			},
			{
				"value": 4,
				"text": "交通图"
			},
			{
				"value": 5,
				"text": "周边配套图"
			},
			{
				"value": 6,
				"text": "施工进度图"
			},
			{
				"value": -1,
				"text": "未分类"
			}
		],
		"layoutOrientation": [
			{
				"value": 1,
				"text": "东"
			},
			{
				"value": 2,
				"text": "南"
			},
			{
				"value": 3,
				"text": "西"
			},
			{
				"value": 4,
				"text": "北"
			},
			{
				"value": 5,
				"text": "东南"
			},
			{
				"value": 6,
				"text": "西南"
			},
			{
				"value": 7,
				"text": "东北"
			},
			{
				"value": 8,
				"text": "西北"
			},
			{
				"value": 9,
				"text": "东西"
			},
			{
				"value": 10,
				"text": "南北"
			}
		],
		"layoutFeature": [
			{
				"value": 1,
				"text": "南北通透"
			},
			{
				"value": 2,
				"text": "户型方正"
			},
			{
				"value": 3,
				"text": "全明格局"
			},
			{
				"value": 4,
				"text": "客厅朝南"
			},
			{
				"value": 5,
				"text": "主卧朝南"
			},
			{
				"value": 6,
				"text": "餐客分离"
			},
			{
				"value": 7,
				"text": "开放厨房"
			},
			{
				"value": 8,
				"text": "带衣帽间"
			},
			{
				"value": 9,
				"text": "主卧带卫"
			},
			{
				"value": 10,
				"text": "干湿分离"
			},
			{
				"value": 11,
				"text": "卧室带阳台"
			},
			{
				"value": 12,
				"text": "飘窗"
			},
			{
				"value": 13,
				"text": "观景飘窗"
			},
			{
				"value": 14,
				"text": "观景落地窗"
			},
			{
				"value": 15,
				"text": "厨卫不对门"
			},
			{
				"value": 16,
				"text": "双阳台"
			},
			{
				"value": 17,
				"text": "露台"
			}
		],
		"displayMonth": [
			{
				"value": 0,
				"text": "--"
			},
			{
				"value": 13,
				"text": "上半年"
			},
			{
				"value": 14,
				"text": "下半年"
			},
			{
				"value": 1,
				"text": "1"
			},
			{
				"value": 2,
				"text": "2"
			},
			{
				"value": 3,
				"text": "3"
			},
			{
				"value": 4,
				"text": "4"
			},
			{
				"value": 5,
				"text": "5"
			},
			{
				"value": 6,
				"text": "6"
			},
			{
				"value": 7,
				"text": "7"
			},
			{
				"value": 8,
				"text": "8"
			},
			{
				"value": 9,
				"text": "9"
			},
			{
				"value": 10,
				"text": "10"
			},
			{
				"value": 11,
				"text": "11"
			},
			{
				"value": 12,
				"text": "12"
			}
		],
		"displayDay": [
			{
				"value": 0,
				"text": "--"
			},
			{
				"value": 41,
				"text": "上旬"
			},
			{
				"value": 42,
				"text": "中旬"
			},
			{
				"value": 43,
				"text": "下旬"
			},
			{
				"value": 1,
				"text": "1"
			},
			{
				"value": 2,
				"text": "2"
			},
			{
				"value": 3,
				"text": "3"
			},
			{
				"value": 4,
				"text": "4"
			},
			{
				"value": 5,
				"text": "5"
			},
			{
				"value": 6,
				"text": "6"
			},
			{
				"value": 7,
				"text": "7"
			},
			{
				"value": 8,
				"text": "8"
			},
			{
				"value": 9,
				"text": "9"
			},
			{
				"value": 10,
				"text": "10"
			},
			{
				"value": 11,
				"text": "11"
			},
			{
				"value": 12,
				"text": "12"
			},
			{
				"value": 13,
				"text": "13"
			},
			{
				"value": 14,
				"text": "14"
			},
			{
				"value": 15,
				"text": "15"
			},
			{
				"value": 16,
				"text": "16"
			},
			{
				"value": 17,
				"text": "17"
			},
			{
				"value": 18,
				"text": "18"
			},
			{
				"value": 19,
				"text": "19"
			},
			{
				"value": 20,
				"text": "20"
			},
			{
				"value": 21,
				"text": "21"
			},
			{
				"value": 22,
				"text": "22"
			},
			{
				"value": 23,
				"text": "23"
			},
			{
				"value": 24,
				"text": "24"
			},
			{
				"value": 25,
				"text": "25"
			},
			{
				"value": 26,
				"text": "26"
			},
			{
				"value": 27,
				"text": "27"
			},
			{
				"value": 28,
				"text": "28"
			},
			{
				"value": 29,
				"text": "29"
			},
			{
				"value": 30,
				"text": "30"
			},
			{
				"value": 31,
				"text": "31"
			}
		],
		"propertyTypes": [
			{
				"value": 0,
				"text": "普通住宅"
			},
			{
				"value": 1,
				"text": "花园洋房"
			},
			{
				"value": 2,
				"text": "经济适用房"
			},
			{
				"value": 3,
				"text": "公租房"
			},
			{
				"value": 4,
				"text": "限价房"
			},
			{
				"value": 5,
				"text": "自住型商品房"
			},
			{
				"value": 6,
				"text": "安居型商品房"
			},
			{
				"value": 7,
				"text": "别墅"
			},
			{
				"value": 8,
				"text": "公寓"
			},
			{
				"value": 9,
				"text": "商住楼"
			},
			{
				"value": 10,
				"text": "酒店式公寓"
			},
			{
				"value": 11,
				"text": "廉租房"
			},
			{
				"value": 12,
				"text": "住宅底商"
			},
			{
				"value": 13,
				"text": "写字楼商铺"
			},
			{
				"value": 14,
				"text": "临街商铺"
			},
			{
				"value": 15,
				"text": "市场类商铺"
			},
			{
				"value": 16,
				"text": "商业街商铺"
			},
			{
				"value": 17,
				"text": "购物中心商铺"
			},
			{
				"value": 18,
				"text": "写字楼"
			}
		],
		"source": [
			{
				"value": 0,
				"text": "爬虫"
			},
			{
				"value": 1,
				"text": "开发商"
			},
			{
				"value": 2,
				"text": "个人线索"
			}
		],
		"jobStatus": [
			{
				"value": 0,
				"text": "新增"
			},
			{
				"value": 1,
				"text": "修改"
			}
		],
		"stateStatus": [
			{
				"value": "-1",
				"text": "全部"
			},
			{
				"value": 0,
				"text": "待审核"
			},
			{
				"value": 1,
				"text": "采纳"
			},
			{
				"value": 2,
				"text": "驳回"
			}
		],
		"dataStatus": [
			{
				"value": 0,
				"text": "待审核"
			},
			{
				"value": 1,
				"text": "审核通过"
			},
			{
				"value": 2,
				"text": "审核驳回"
			},
			{
				"value": 3,
				"text": "审核完成"
			}
		],
		"projStatus": [
			{
				"value": 0,
				"text": "隐藏"
			},
			{
				"value": 1,
				"text": "显示"
			}
		],
		"moduleType": [
			{
				"value": "楼盘管理"
			},
			{
				"value": "spider数据校对"
			},
			{
				"value": "新建楼盘审核"
			},
			{
				"value": "楼盘信息审核"
			},
			{
				"value": "spider楼盘更新监控"
			},
			{
				"value": "楼盘点评审核"
			},
			{
				"value": "点评审核记录"
			}
		],
		"targetType": [
			{
				"value": "搜房"
			},
			{
				"value": "安居客"
			}
		],
		"fromType": [
			{
				"value": "全部"
			},
			{
				"value": "WAP"
			},
			{
				"value": "PC"
			},
			{
				"value": "小程序"
			}
		],
		"position": [
			{
				"value": 0,
				"text": "二环以内"
			},
			{
				"value": 1,
				"text": "二至三环"
			},
			{
				"value": 2,
				"text": "三至四环"
			},
			{
				"value": 3,
				"text": "四至五环"
			},
			{
				"value": 4,
				"text": "四至五环"
			},
			{
				"value": 5,
				"text": "五至六环"
			},
			{
				"value": 6,
				"text": "六环以外"
			}
		]
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var $$config = __webpack_require__(1);
	var $$format = __webpack_require__(14);
	var $$request = __webpack_require__(2);
	var $$domain = __webpack_require__(15);
	var $$domainBase = __webpack_require__(20);
	var uiApp = window[$$config.namespace];
	var $$querystring = __webpack_require__(9);
	var $$request = __webpack_require__(2);
	var $$getList = __webpack_require__(17);
	var $$getText = __webpack_require__(21);
	
	var controller = {
	    cache: {
	        loupanId: -1,
	        cityId: -1
	    },
	    loupan: {
	        renderUpdateTask: function () {
	            let ui = uiApp.getModule('module-manual-update-tab');
	            let ud = ui.get();
	            $$request.ajax({
	                url: $$domain + '/updateInfo/status/' + controller.cache.loupanId,
	                withCredentials: true,
	                complete: function (data) {
	                    if (data.code !== '200') {
	                        return;
	                    }
	                    ud.updateTab = [];
	                    var k;
	                    for (k in data.data) {
	                        if (data.data[k] == '0') {
	                            ud.updateTab.push(k);
	                        }
	                    }
	                    ui.set('updateTab', ud.updateTab);
	                }
	            });
	        },
	        renderTagPanel: function (tagName) {
	            let ui = uiApp.getModule('module-manual-update-tab');
	            let ud = ui.get();
	            if (tagName) {
	                ui.set('showTabName', tagName);
	                ud = ui.get();
	            }
	
	            var map = {
	                sale: function () {
	                    $$request.ajax({
	                        url: $$domain + '/updateInfo/find/' + controller.cache.loupanId + '/sale',
	                        withCredentials: true,
	                        complete: function (data) {
	                            if (data.code !== '200') {
	                                return;
	                            }
	
	                            data = data.data;
	                            let ui = uiApp.getModule('module-manual-update-sale');
	
	                            let fn = function (o, type) {
	                                return {
	                                    "old": o.projectOld,
	                                    "new": $$format.fnNew(o.value, o.status, type),
	                                    "status": parseInt(o.status, 10),
	                                    "saleStatusNewText" : o.comment,
	                                    "fieldId": o.fieldId
	                                }
	                            };
	
	                            if (data.saleStatus) {
	                                ui.set('saleStatus', fn(data.saleStatus, 0));
	                            }
	                            if (data.salePhase) {
	                                ui.set('salePhase', fn(data.salePhase, 1));
	                            }
	                            if (data.marketingInfo) {
	                                ui.set('marketingInfo', fn(data.marketingInfo, 2));
	                            }
	                        }
	                    });
	
	                    $$request.ajax({
	                        url: $$domain + '/updateInfo/find/' + controller.cache.loupanId + '/sale/addressList',
	                        withCredentials: true,
	                        complete: function (data) {
	                            if (data.code !== '200') {
	                                return;
	                            }
	
	                            data = data.data;
	                            let ui = uiApp.getModule('module-manual-update-sale');
	
	                            let fn = function (o) {
	                                o.map(function (item) {
	                                    item.value = item.value || {};
	
	                                    if (item.projectOld) {
	                                        item.old = {
	                                            "address" : item.projectOld.provinceName + item.projectOld.cityName
	                                                + item.projectOld.districtName + item.projectOld.address,
	                                            "bussinessZone": item.projectOld.circleNames,
	                                            "telephone" : item.projectOld.phone
	                                        };
	
	                                        let fnBuzZone = function(item) {
	                                            if ($$format.getType(item.value.circleNames) !== 'undefined') return item.value.circleNames.join(',');
	                                            else if (item.projectOld.circleNames) return item.projectOld.circleNames;
	                                            else return "";
	                                        }
	
	                                        item.new = {
	                                            "address" : (item.value.provinceName || item.projectOld.provinceName || "")
	                                                + (item.value.cityName || item.projectOld.cityName || "")
	                                                + (item.value.districtName || item.projectOld.districtName || "")
	                                                + (item.value.address || item.projectOld.address || ""),
	                                            "bussinessZone": fnBuzZone(item),
	                                            "telephone" : (item.value.phone || item.projectOld.phone || "")
	                                        };
	                                    } else {
	                                        var length = $$format.getObjPropertyNum(item.value);
	                                        if(length == 1 && item.value.userId) {
	                                            item.new = {
	                                                "address" : "",
	                                                //"bussinessZone" : "",
	                                                "bussinessZone": "",
	                                                "telephone" : ""
	                                            };
	                                        } else {
	                                            item.new = {
	                                                "address" : item.value.provinceName + item.value.cityName
	                                                    + item.value.districtName + item.value.address,
	                                                //"bussinessZone" :  item.value.circleNames,
	                                                "bussinessZone": item.value.circleNames ? item.value.circleNames.join(',') : "",
	                                                "telephone" : item.value.phone
	                                            };
	                                        }
	                                    }
	
	                                    item.fieldId = item.fieldId;
	                                    item.status = parseInt(item.status, 10);
	                                });
	                                return o;
	                            }
	                            var list = fn(data);
	                            ui.set('saleAddresses', list);
	                            ui.set('dataShow', list.length ? 3 : 2);
	                        }
	                    });
	
	                    $$request.ajax({
	                        url: $$domain + '/updateInfo/find/' + controller.cache.loupanId + '/sale/priceList',
	                        withCredentials: true,
	                        complete: function (data) {
	                            if (data.code !== '200') {
	                                return;
	                            }
	
	                            data = data.data;
	                            let ui = uiApp.getModule('module-manual-update-sale');
	
	                            let fn = function (o) {
	                                o.map(function (item) {
	                                    //var priceUnit = $$format.getListByFeildName('priceUnitType');
	
	                                    item.value = item.value || {};
	                                    // item.avg = item.value.avgPrice;
	                                    // item.highest = item.value.highPrice;
	                                    // item.lowest = item.value.lowPrice;
	                                    item.avg = $$format.priceTypeProcessor(item.value.avgPrice, item.value.priceType);
	                                    item.highest = $$format.priceTypeProcessor(item.value.highPrice, item.value.priceType);
	                                    item.lowest = $$format.priceTypeProcessor(item.value.lowPrice, item.value.priceType);
	                                    item.priceDes = item.value.priceDesc;
	                                    item.priceDate = $$format.dateToString(item.value.priceTime);
	                                    item.issuePerson = item.value.userId;
	                                    item.issueDate = $$format.dateToString(item.createTime);
	                                    item.status = parseInt(item.status, 10);
	                                    item.fieldId = item.fieldId;
	                                });
	                                return o;
	                            }
	                            var list = fn(data);
	                            ui.set('priceInfo', list);
	                            ui.set('dataShow2', list.length ? 3 : 2);
	                        }
	                    });
	                },
	                launch: function () {
	                    $$request.ajax({
	                        url: $$domain + '/updateInfo/find/' + controller.cache.loupanId + '/launch/launchInfoList',
	                        withCredentials: true,
	                        complete: function (data) {
	                            if (data.code !== '200') {
	                                return;
	                            }
	
	                            data = data.data;
	                            let ui = uiApp.getModule('module-manual-update-launch');
	
	                            let fn = function (o) {
	                                o.map(function (item) {
	                                    item.launchDate = $$format.ymdToString(item.value.predictLaunchYear, item.value.predictLaunchMonth, item.value.predictLaunchDay);
	                                    item.launchDes = item.value.launchDesc;
	                                    item.issuePerson = item.value.userId;
	                                    item.issueDate = $$format.dateToString(item.createTime);
	                                    item.status = parseInt(item.status, 10);
	                                });
	                                return o;
	                            }
	                            var list = fn(data);
	                            ui.set('launchInfo', list);
	                            ui.set('dataShow', list.length ? 3 : 2);
	                        }
	                    });
	                    $$request.ajax({
	                        url: $$domain + '/updateInfo/find/' + controller.cache.loupanId + '/launch/launchDealList',
	                        withCredentials: true,
	                        complete: function (data) {
	                            if (data.code !== '200') {
	                                return;
	                            }
	
	                            data = data.data;
	                            let ui = uiApp.getModule('module-manual-update-launch');
	
	                            let fn = function (o) {
	                                o.map(function (item) {
	                                    item.transferDate = $$format.ymdToString(item.value.predictDealYear, item.value.predictDealMonth, item.value.predictDealDay);
	                                    item.transferDes = item.value.dealDesc;
	                                    item.issuePerson = item.value.userId;
	                                    item.issueDate = $$format.dateToString(item.createTime);
	                                    item.status = parseInt(item.status, 10);
	                                });
	                                return o;
	                            }
	                            var list = fn(data);
	                            ui.set('transferInfo', list);
	                            ui.set('dataShow2', list.length ? 3 : 2);
	                        }
	                    });
	                },
	                licence: function () {
	                    $$request.ajax({
	                        url: $$domain + '/updateInfo/find/' + controller.cache.loupanId + '/licence/licenceInfoList',
	                        withCredentials: true,
	                        complete: function (data) {
	                            if (data.code !== '200') {
	                                return;
	                            }
	
	                            data = data.data;
	                            let ui = uiApp.getModule('module-manual-update-license');
	
	                            let fn = function (o) {
	                                o.map(function (item) {
	                                    item.licenseNumber = item.value.licenceNo;
	                                    item.aquireDate = $$format.dateToString(item.value.obtainTime);
	                                    item.preSaleScope = item.value.preSaleScope;
	                                    item.ePhoto = item.value.photoUrl;
	                                    item.issuePerson = item.value.userId;
	                                    item.issueDate =  $$format.dateToString(item.createTime);
	                                    item.status = parseInt(item.status, 10);
	                                });
	                                return o;
	                            }
	                            var list = fn(data);
	                            ui.set('licenseInfo', list);
	                            ui.set('dataShow', list.length ? 3 : 2);
	                        }
	                    });
	                },
	                basic: function () {
	                    $$request.ajax({
	                        url: $$domain + '/updateInfo/find/' + controller.cache.loupanId + '/basic',
	                        withCredentials: true,
	                        complete: function (data) {
	                            if (data.code !== '200') {
	                                return;
	                            }
	
	                            data = data.data;
	                            let ui = uiApp.getModule('module-basic-info');
	                            ui.set({
	                                "nameInfo": data.projectName.projectOld,
	                                "nickNameInfo": data.alias.projectOld,
	                                "addressInfo": data.address.projectOld,
	                                "latitude": data.latitude.projectOld,
	                                "latitudeStatus": parseInt(data.latitude.status, 10),
	                                "longitude": data.longitude.projectOld,
	                                "wuyeTypeStatus": $$format.strToArray(data.typeDetail.projectOld),
	                                "limitYear": data.term.projectOld,
	                                "constructStatus": $$format.strToArray(data.buildingTypes.projectOld),
	                                "featureStatus": $$format.strToArray(data.features.projectOld),
	                                "decorationsStatus": data.decorationTypes.projectOld,
	                                "companyInfo": data.propertyName.projectOld,
	                                "wyFee": data.propertyPrice.projectOld,
	                                "dwId": data.propertyPriceUnit.projectOld,
	                                "feeInfo": data.propertyPriceDesc.projectOld,
	                                "proInfo": data.projectDesc.projectOld,
	
	                                "nameStatus": parseInt(data.projectName.status, 10),
	                                "nickNameStatus": parseInt(data.alias.status, 10),
	                                "provinceStatus": parseInt(data.provinceId.status, 10),
	                                "cityStatus": parseInt(data.cityId.status, 10),
	                                "districtStatus": parseInt(data.districtId.status, 10),
	                                "circleStatus": parseInt(data.circleIds.status, 10),
	                                "addressStatus": parseInt(data.address.status, 10),
	                                "loStatus": parseInt(data.longitude.status, 10),
	                                "laStatus": parseInt(data.latitude.status, 10),
	                                "typeStatus": parseInt(data.typeDetail.status, 10),
	                                "limitYearStatus": parseInt(data.term.status, 10),
	                                "constStatus": parseInt(data.buildingTypes.status, 10),
	                                "featStatus": parseInt(data.features.status, 10),
	                                "decoratStatus": parseInt(data.decorationTypes.status, 10),
	                                "companyStatus": parseInt(data.propertyName.status, 10),
	                                "feeStatus": parseInt(data.propertyPrice.status, 10),
	                                "dwStatus": parseInt(data.propertyPriceUnit.status, 10),
	                                "desStatus": parseInt(data.propertyPriceDesc.status, 10),
	                                "proStatus": parseInt(data.projectDesc.status, 10),
	
	                                "referenceInfo": {
	                                     "updateName": $$format.fnNew(data.projectName.value, data.projectName.status, 2),
	                                     "updateNickName": $$format.fnNew(data.alias.value, data.alias.status, 2),
	                                     "updateProvince": $$format.fnNew(data.provinceId.valueText, data.provinceId.status, 2),
	                                     "updateCity": $$format.fnNew(data.cityId.valueText, data.cityId.status, 2),
	                                     "updateZone": $$format.fnNew(data.districtId.valueText, data.districtId.status, 2),
	                                     "updateArea": $$format.fnNew(data.circleIds.valueText, data.circleIds.status, 2),
	                                     "updateAddress": $$format.fnNew(data.address.value, data.address.status, 2),
	                                     "latitude": data.latitude.value,
	                                     "longitude": data.longitude.value,
	                                     "wuyeTypeValue": $$format.fnNew(data.typeDetail.value, data.typeDetail.status, 1),
	                                     "updateLimitYear": $$format.fnNew(data.term.value, data.term.status, 4),
	                                     "constructValue":  $$format.fnNew(data.buildingTypes.value, data.buildingTypes.status, 3),
	                                     "featureValue": $$format.fnNew(data.features.value, data.features.status, 3),
	                                     "decorationsValue": $$format.fnNew(data.decorationTypes.value, data.decorationTypes.status, 3),
	                                     "updateCompany": $$format.fnNew(data.propertyName.value, data.propertyName.status, 2),
	                                     "updateFee": $$format.fnNew(parseFloat(data.propertyPrice.value), data.propertyPrice.status, 2),
	                                     "dwValue": $$format.fnNew(data.propertyPriceUnit.value, data.propertyPriceUnit.status, 2),
	                                     "updateDes": $$format.fnNew(data.propertyPriceDesc.value, data.propertyPriceDesc.status, 2),
	                                     "updatePro": $$format.fnNew(data.projectDesc.value, data.projectDesc.status, 2)
	                                }
	                            });
	
	                            var aIds = [];
	                            var circleIdsText = [];
	                            var circleIds = data.circleIds.projectOld || [];
	                            if (data.circleIds.projectOldText){
	                                var circ = data.circleIds.projectOldText.split(',');
	                            } else {
	                                var circ = [];
	                            }
	                            // console.log(circ.length);
	                            // circleIdsText.push({"value":"-1","text":circ.length.toString()});
	                            circ.forEach(function (item, i) {
	                                circleIdsText.push({"value":circleIds[i],"text":item})
	                                aIds.push(circleIds[i]);
	                            });
	                            console.log(aIds);
	                            let ud = ui.get();
	                            ud.ui.provinceOptions = [{"value": parseInt(data.provinceId.projectOld, 10),"text":data.provinceId.projectOldText}];
	                            ud.ui.cityOptions = [{"value": parseInt(data.cityId.projectOld, 10),"text":data.cityId.projectOldText}];
	                            ud.ui.zoneOptions = [{"value": parseInt(data.districtId.projectOld, 10),"text":data.districtId.projectOldText}];
	                            ud.ui.areaOptions = circleIdsText;
	                            ui.set('ui', ud.ui);
	                            ui.set({
	                                "provinceId": parseInt(data.provinceId.projectOld, 10),
	                                "cityId": parseInt(data.cityId.projectOld, 10),
	                                "zoneId": parseInt(data.districtId.projectOld, 10),
	                                "areaIds": aIds
	                            })
	                        }
	                    });
	                },
	                plan: function () {
	                    $$request.ajax({
	                        url: $$domain + '/updateInfo/find/' + controller.cache.loupanId + '/plan',
	                        withCredentials: true,
	                        complete: function (data) {
	                            if (data.code !== '200') {
	                                return;
	                            }
	
	                            data = data.data;
	                            let ui = uiApp.getModule('module-plan-info');
	
	                            ui.set({
	                                "zdArea": data.occupiedArea.projectOld,
	                                "jzArea": data.buildingArea.projectOld,
	                                "rjPersentage": data.plotRatio.projectOld,
	                                "lhPersentage": data.landscapingRatio.projectOld,
	                                "buildNum": data.buildingCount.projectOld,
	                                "personNum": data.houseCount.projectOld,
	                                "aroundInfo": data.around.projectOld,
	                                "insideInfo": data.community.projectOld,
	                                "passInfo": data.parking.projectOld,
	                                "warmInfo": data.heating.projectOld,
	
	                                "zdAreaStatus": parseInt(data.occupiedArea.status, 10),
	                                "jzAreaStatus": parseInt(data.buildingArea.status, 10),
	                                "rjPersentageStatus": parseInt(data.plotRatio.status, 10),
	                                "lhPersentageStatus": parseInt(data.landscapingRatio.status, 10),
	                                "buildNumStatus": parseInt(data.buildingCount.status, 10),
	                                "personNumStatus": parseInt(data.houseCount.status, 10),
	                                "aroundStatus": parseInt(data.around.status, 10),
	                                "insideStatus": parseInt(data.community.status, 10),
	                                "passStatus": parseInt(data.parking.status, 10),
	                                "warmStatus": parseInt(data.heating.status, 10),
	
	                                "updateZdArea": $$format.fnNew(data.occupiedArea.value, data.occupiedArea.status, 2),
	                                "updateJzArea": $$format.fnNew(data.buildingArea.value, data.buildingArea.status, 2),
	                                "updateRjPersentage": $$format.fnNew(data.plotRatio.value, data.plotRatio.status, 2),
	                                "updateLhPersentage": $$format.fnNew(data.landscapingRatio.value, data.landscapingRatio.status, 2),
	                                "updateBuildNum": $$format.fnNew(data.buildingCount.value, data.buildingCount.status, 2),
	                                "updatePersonNum": $$format.fnNew(data.houseCount.value, data.houseCount.status, 2),
	                                "updateAround": $$format.fnNew(data.around.value, data.around.status, 2),
	                                "updateInside": $$format.fnNew(data.community.value, data.community.status, 2),
	                                "updatePass": $$format.fnNew(data.parking.value, data.parking.status, 2),
	                                "updateWarm": $$format.fnNew(data.heating.value, data.heating.status, 2)
	                            });
	                        }
	                    });
	                },
	                traffic: function () {
	                    var fnGetSubWay = function (fn) {
	                        $$request.ajax({
	                            url: $$domainBase + '/city/subway?cityId=' + controller.cache.cityId,
	                            withCredentials: false,
	                            complete: function (data) {
	                                if (data.code !== '1') {
	                                    return;
	                                }
	                                fn && fn(data);
	                            }
	                        });
	                    };
	
	                    var fnGetLoopline = function (fn) {
	                        $$request.ajax({
	                            url: $$domainBase + '/city/loopline?cityId=' + controller.cache.cityId,
	                            withCredentials: false,
	                            complete: function (data) {
	                                if (data.code !== '1') {
	                                    return;
	                                }
	
	                                fnGetSubWay(function (data1) {
	                                    fn && fn({
	                                        loopline: data.data,
	                                        subway: data1.data,
	                                    });
	                                });
	                            }
	                        });
	                    };
	
	                    $$request.ajax({
	                        url: $$domain + '/updateInfo/find/' + controller.cache.loupanId + '/traffic',
	                        withCredentials: true,
	                        complete: function (data) {
	                            if (data.code !== '200') {
	                                return;
	                            }
	
	                            var fnFormatSubway = function (subwayList, val) {
	                                var subways = [];
	                                var sb = val || '';
	                                sb = sb.split(';');
	                                sb.forEach(function (item, i) {
	                                    var a = item || '';
	                                    a = a.split(':') || [];
	                                    var l = a[0] || '';
	                                    var lName = '';
	                                    var s = a[1] || '';
	                                    s = s.split(',') || [];
	                                    s.forEach(function (item1, i1) {
	                                        subwayList.forEach(function (item2, i2) {
	                                            if (item2.subwayId === l) {
	                                                lName = item2.subwayName;
	                                                let stations = item2.stations || [];
	                                                stations.forEach(function (item3, i3) {
	                                                    if (item3.stationId === item1) {
	                                                        item1 = item3.stationName;
	                                                    }
	                                                });
	                                            }
	                                        });
	
	                                        var text = lName + ' ' + item1 || '';
	                                        if (text.trim() === '') {
	                                            return;
	                                        }
	
	                                        subways.push({
	                                            value: '--',
	                                            text: text
	                                        });
	                                    });
	                                });
	                                return subways;
	                            };
	
	                            fnGetLoopline(function (d) {
	                                data = data.data;
	                                let ui = uiApp.getModule('module-traffic-info');
	
	                                var loopline = [];
	                                d.loopline.forEach(function (item) {
	                                    loopline.push({
	                                        value: item.looplineId,
	                                        text: item.looplineName
	                                    });
	                                });
	
	                                var subwayOld = fnFormatSubway(d.subway, data.subways.projectOld);
	                                var subwayVal = fnFormatSubway(d.subway, data.subways.value);
	                                subwayVal.forEach(function (item, i) {
	                                    subwayVal[i] = item.text;
	                                });
	
	                                ui.set({
	                                    "positionList": loopline,
	                                    "positionStatus": parseInt(data.loopLocation.projectOld, 10),
	                                    "pointJInfo": '',
	                                    "subways": subwayOld,
	                                    "pointInfo": data.busStops.projectOld || '',
	                                    "typeInfo": data.trafficDesc.projectOld || '',
	
	                                    "posStatus": parseInt(data.loopLocation.status, 10),
	                                    "pointJStatus": parseInt(data.subways.status, 10),
	                                    "pointStatus": parseInt(data.busStops.status, 10),
	                                    "typeStatus": parseInt(data.trafficDesc.status, 10),
	
	                                    "positionValue": $$format.fnNew(parseInt(data.loopLocation.value, 10), data.loopLocation.status, 1),
	                                    "updateJPoint": $$format.fnNew(subwayVal.join(' '), parseInt(data.subways.status, 10) , 2),
	                                    "updatePoint": $$format.fnNew(data.busStops.value, data.busStops.status, 2),
	                                    "updateType": $$format.fnNew(data.trafficDesc.value, data.trafficDesc.status, 2)
	                                });
	                            });
	                        }
	                    });
	                },
	                album: function () {
	                    $$request.ajax({
	                        url: $$domain + '/updateInfo/find/' + controller.cache.loupanId + '/album/album',
	                        withCredentials: true,
	                        complete: function (data) {
	                            if (data.code !== '200') {
	                                return;
	                            }
	
	                            data = data.data;
	                            let ui = uiApp.getModule('module-artificial-regeneration-photos');
	
	                            let fn = function (o) {
	                                o.map(function (item) {
	                                    item.choice = parseInt(item.status, 10);
	                                    // item.aquireDate = $$format.dateToString(item.value.obtainTime);
	                                    item.ePhoto = item.value.url;
	                                    item.selected = false;
	                                    item.categoryId = item.value.photoStyle;
	                                    // item.issuePerson = item.value.userId;
	                                    // item.issueDate =  $$format.dateToString(item.createTime);
	                                    item.status = parseInt(item.status, 10);
	                                });
	                                return o;
	                            }
	                            var list = fn(data);
	                            ui.set('photoList', list);
	                            ui.set('dataShow', list.length ? 3 : 2);
	                        }
	                    });
	                },
	                layout: function () {
	                    $$request.ajax({
	                        url: $$domain + '/updateInfo/find/' + controller.cache.loupanId + '/layout/layout',
	                        withCredentials: true,
	                        complete: function (data) {
	                            if (data.code !== '200') {
	                                return;
	                            }
	
	                            data = data.data;
	                            let ui = uiApp.getModule('module-apartment-layout');
	                            let fn = function (o) {
	                                o.map(function (item) {
	                                    item.value = item.value || {};
	                                    item.reason = item.projectOld ? '修改' : '新增';
	                                    if (item.projectOld) {
	                                        item.name = item.projectOld.layoutName;
	                                        let room = item.projectOld.room || 0;
	                                        let hall = item.projectOld.hall || 0;
	                                        let toilet = item.projectOld.toilet || 0;
	                                        let kitchen = item.projectOld.kitchen || 0;
	                                        item.structure = room + '室' + hall + '厅' + toilet + '卫' + kitchen + '厨';
	                                        let buildingArea = item.projectOld.buildingArea || '';
	                                        if (buildingArea) {
	                                            item.area = buildingArea + '㎡';
	                                        }
	                                    } else {
	                                        item.name = item.value.layoutName;
	                                        let room = item.value.room || 0;
	                                        let hall = item.value.hall || 0;
	                                        let toilet = item.value.toilet || 0;
	                                        let kitchen = item.value.kitchen || 0;
	                                        item.structure = room + '室' + hall + '厅' + toilet + '卫' + kitchen + '厨';
	                                        let buildingArea = item.value.buildingArea || '';
	                                        if (buildingArea) {
	                                            item.area = buildingArea + '㎡';
	                                        }
	                                    }
	                                    item.updateChoice = item.status;
	                                });
	                                return o;
	                            }
	                            var list = fn(data);
	                            ui.set('layoutInfoList', list);
	                            ui.set('dataShow', list.length ? 3 : 2);
	                        }
	                    });
	                }
	            };
	
	            map[ud.showTabName]();
	        },
	        auditFeildName: function (fieldName, status, comment, id, fn) {
	            var names = [];
	            if (fieldName) {
	               if  (typeof fieldName === 'string') {
	                    names = [ fieldName ];
	                } else {
	                    names = fieldName;
	                }
	            }
	            let ui = uiApp.getModule('module-manual-update-tab');
	            let ud = ui.get();
	            names.forEach(function (item, i) {
	                $$request.ajax({
	                    url: `${$$domain}/updateInfo/audit/${controller.cache.loupanId}/${ud.showTabName}/${item}`,
	                    type: 'POST',
	                    data: { token: window.token, status: status, comment: comment, id: id },
	                    withCredentials: true,
	                    complete: function (data) {
	                        if (data.code !== '200') {
	                            return;
	                        }
	                        fn && fn();
	                    }
	                });
	            });
	        }
	    }
	};
	
	var map = {
	    sale: [
	        {
	            fieldName: 'saleStatus',
	            status: 'saleStatus.status'
	        },
	        {
	            fieldName: 'salePhase',
	            status: 'salePhase.status'
	        },
	        {
	            fieldName: 'marketingInfo',
	            status: 'marketingInfo.status'
	        },
	        {
	            fieldName: 'addressList',
	            ids: {
	                    moduleName: 'module-manual-update-sale',
	                    fieldName: 'saleAddresses'
	            }
	        },
	        {
	            fieldName: 'priceList',
	            ids: {
	                moduleName: 'module-manual-update-sale',
	                fieldName: 'priceInfo'
	            }
	        }
	    ],
	    launch: [
	        {
	            fieldName: 'launchInfoList',
	            ids: {
	                    moduleName: 'module-manual-update-launch',
	                    fieldName: 'launchInfo'
	            }
	        },
	        {
	            fieldName: 'launchDealList',
	            ids: {
	                moduleName: 'module-manual-update-launch',
	                fieldName: 'transferInfo'
	            }
	        }
	    ],
	    licence: [
	        {
	            fieldName: 'licenceInfoList',
	            ids: {
	                    moduleName: 'module-manual-update-license',
	                    fieldName: 'licenseInfo'
	            }
	        }
	    ],
	    basic: [
	        {
	            fieldName: 'projectName',
	            status: 'nameStatus'
	        },
	        {
	            fieldName: 'alias',
	            status: 'nickNameStatus'
	        },
	        {
	            fieldName: [ 'address', 'provinceId', 'cityId', 'districtId', 'circleIds'],
	            status: 'addressStatus'
	        },
	        {
	            fieldName: [ 'latitude', 'longitude'],
	            status: 'latitudeStatus'
	        },
	        {
	            fieldName: 'typeDetail',
	            status: 'typeStatus'
	        },
	        {
	            fieldName: 'term',
	            status: 'limitYearStatus'
	        },
	        {
	            fieldName: 'buildingTypes',
	            status: 'constStatus'
	        },
	        {
	            fieldName: 'features',
	            status: 'featStatus'
	        },
	        {
	            fieldName: 'decorationTypes',
	            status: 'decoratStatus'
	        },
	        {
	            fieldName: 'propertyName',
	            status: 'companyStatus'
	        },
	        {
	            fieldName: [ 'propertyPrice', 'propertyPriceUnit' ],
	            status: 'feeStatus'
	        },
	        {
	            fieldName: 'propertyPriceDesc',
	            status: 'desStatus'
	        },
	        {
	            fieldName: 'projectDesc',
	            status: 'proStatus'
	        },
	        {
	
	        }
	    ],
	    traffic: [
	        {
	            fieldName: 'busStops',
	            status: 'pointStatus'
	        },
	        {
	            fieldName: 'trafficDesc',
	            status: 'typeStatus'
	        },
	        {
	            fieldName: 'loopLocation',
	            status: 'posStatus'
	        },
	        {
	            fieldName: 'subways',
	            status: 'pointJStatus'
	        }
	    ],
	    plan: [
	        {
	            fieldName: 'occupiedArea',
	            status: 'zdAreaStatus'
	        },
	        {
	            fieldName: 'buildingArea',
	            status: 'jzAreaStatus'
	        },
	        {
	            fieldName: 'plotRatio',
	            status: 'rjPersentageStatus'
	        },
	        {
	            fieldName: 'landscapingRatio',
	            status: 'lhPersentageStatus'
	        },
	        {
	            fieldName: 'buildingCount',
	            status: 'buildNumStatus'
	        },
	        {
	            fieldName: 'houseCount',
	            status: 'personNumStatus'
	        },
	        {
	            fieldName: 'around',
	            status: 'aroundStatus'
	        },
	        {
	            fieldName: 'community',
	            status: 'insideStatus'
	        },
	        {
	            fieldName: 'parking',
	            status: 'passStatus'
	        },
	        {
	            fieldName: 'heating',
	            status: 'warmStatus'
	        }
	    ],
	    layout: [
	        {
	            fieldName: 'layout',
	            ids: {
	                    moduleName: 'module-apartment-layout',
	                    fieldName: 'layoutInfoList'
	            }
	        }
	    ]
	};
	
	var fnAddEvent = function () {
	    var fnHouseType = function () {
	        uiApp.evt.on('module-house-type', 'submitReason', function (next) {
	            if (window.location.href.indexOf('manualUpdateItem') < 0) {
	                next();
	                return;
	            }
	            next();
	            var data = uiApp.getModule('module-house-type').get();
	            controller.loupan.auditFeildName('layout', 2, data.reason, data.cache.fieldId, function () {
	                uiApp.router.pushState('/component/manual-update-tab');
	            });
	        });
	        uiApp.evt.on('module-house-type', 'close', function (next) {
	            next();
	            uiApp.router.pushState('/component/manual-update-tab');
	        });
	        uiApp.evt.on('module-house-type', 'pass', function (next) {
	            if (window.location.href.indexOf('manualUpdateItem') < 0) {
	                next();
	                return;
	            }
	            var data = uiApp.getModule('module-house-type').get();
	            controller.loupan.auditFeildName('layout', 1, '', data.cache.fieldId, function () {
	                uiApp.router.pushState('/component/manual-update-tab');
	            });
	        });
	    };
	
	    var fnLayout = function () {
	        uiApp.evt.on('module-apartment-layout', 'checkClick', function (next, item) {
	            next();
	            let data = item.projectOld || {};
	            uiApp.getModule('module-house-type').set({
	                'enableEdit': false,
	                'updateChoice': item.status,
	                'data': {
	                    'id': data.layoutId,
	                    'photoUrl': data.photoUrl,
	                    'isPrime': data.mainLayout,
	                    'layoutName': data.layoutName,
	                    'bedroom': data.room,
	                    'livingroom': data.hall,
	                    'washroom': data.toilet,
	                    'kitchen': data.kitchen,
	                    'buildingArea': data.buildingArea,
	                    'insideArea': data.insideArea,
	                    'freeArea': data.freeArea,
	                    'layoutHeight': data.height,
	                    'layoutHouseNum': data.count,
	                    'layoutOrientation': data.directions && data.directions.split(',') || [],
	                    'layoutFeature': data.features && data.features.split(',') || [],
	                    'layoutDesc': data.simpleInfo,
	                    'saleStatus': data.saleStatus,
	                    'priceType': data.priceType,
	                    'avgPrice': data.avgPrice,
	                    'highPrice': data.highPrice,
	                    'lowPrice': data.lowPrice,
	                    'priceTime': data.priceTime
	                },
	                'cache': {
	                    'fieldId': item.fieldId
	                }
	            });
	            data = item.value || {};
	            let analy = {};
	            if (data.mainLayout) {
	                if (parseInt(data.mainLayout) === 1) {
	                    analy.isPrime = '是'
	                }
	                if (parseInt(data.mainLayout) === 0) {
	                    analy.isPrime = '否'
	                }
	            }
	            analy.layoutOrientationList = $$getList.getListByFeildName('layoutOrientation');
	            analy.layoutFeatureList = $$getList.getListByFeildName('layoutFeature');
	            analy.saleStatusList = $$getList.getListByFeildName('saleStatus');
	            analy.priceTypeList = $$getList.getListByFeildName('priceType');
	            if (data.priceTime) {
	                if (parseInt(data.priceTime) === 0) {
	                    analy.date = '未填写'
	                } else {
	                    analy.date = $$format.dateFormat(new Date(parseInt(data.priceTime)), 'yyyy-MM-dd')
	                }
	            }
	            analy.layoutOrientation = $$getText.getArrayText(analy.layoutOrientationList, data.directions);
	            if (analy.layoutOrientation ) {
	                analy.layoutOrientationText = analy.layoutOrientation.join(',')
	                if (analy.layoutOrientation.toString() === '') {
	                    analy.layoutOrientationText = '未勾选'
	                }
	            }
	            analy.layoutFeature = $$getText.getArrayText(analy.layoutFeatureList, data.features);
	            if (analy.layoutFeature) {
	                analy.layoutFeatureText = analy.layoutFeature.join(',')
	                if (analy.layoutFeature.toString() === '') {
	                    analy.layoutFeatureText = '未勾选'
	                }
	            }
	
	            analy.saleStatus = $$getText.getText(analy.saleStatusList, data.saleStatus);
	            analy.priceType = $$getText.getText(analy.priceTypeList, data.priceType);
	            uiApp.getModule('module-house-type').set('referenceInfo', {
	                'photoUrl': data.photoUrl,
	                'isPrime': analy.isPrime,
	                'layoutName': data.layoutName,
	                'bedroom': data.room,
	                'livingroom': data.hall,
	                'washroom': data.toilet,
	                'kitchen': data.kitchen,
	                'buildingArea': data.buildingArea,
	                'insideArea': data.insideArea,
	                'freeArea': data.freeArea,
	                'layoutHeight': data.height,
	                'layoutHouseNum': data.count,
	                'layoutOrientation': analy.layoutOrientationText,
	                'layoutFeature': analy.layoutFeatureText,
	                'layoutDesc': data.simpleInfo === '' ? '未填写' : data.simpleInfo,
	                'saleStatus': analy.saleStatus,
	                'priceType': analy.priceType,
	                'avgPrice': data.avgPrice,
	                'highPrice': data.highPrice,
	                'lowPrice': data.lowPrice,
	                'priceTime': analy.date
	            });
	            uiApp.router.pushState('/dialog/house-type');
	        });
	    };
	
	    var fnAuditEvent = function () {
	        var fn = function (next, field) {
	            controller.loupan.auditFeildName(
	                field.cache.fieldName,
	                field.submitStatus,
	                field.reason,
	                field.cache.fieldId,
	                function () {
	                    //next(field);
	                    controller.loupan.renderTagPanel();
	                }
	            );
	        };
	        uiApp.evt.on('module-basic-info', 'choiceInfo', fn);
	        uiApp.evt.on('module-manual-update-sale', 'choiceInfo', fn);
	        uiApp.evt.on('module-manual-update-launch', 'choiceInfo', fn);
	        uiApp.evt.on('module-manual-update-license', 'choiceInfo', fn);
	        uiApp.evt.on('module-traffic-info', 'choiceInfo', fn);
	        uiApp.evt.on('module-plan-info', 'choiceInfo', fn);
	        uiApp.evt.on('module-artificial-regeneration-photos', 'choiceInfo', fn);
	        // uiApp.evt.on('module-artificial-regeneration-photos', 'allChoiceInfo', fn);
	    };
	
	    var fnLoupanTable = function () {
	        uiApp.evt.on('module-manual-update-tab', 'changeTab', function (next, name) {
	            next();
	            controller.loupan.renderTagPanel();
	        });
	        uiApp.evt.on('module-manual-update-tab', 'back', function (next, name) {
	            next();
	            var currentURL = window.location;
	            window.location.href = currentURL.pathname + '#' + "/infoCheck";
	        });
	        uiApp.evt.on('module-manual-update-tab', 'finishAudit', function (next, name) {
	            next();
	            uiApp.router.pushState('/dialog/check-info?' + 'messageId=' + this.messageId);
	        });
	
	
	        // var open3 = function() {
	        //     // console.log(1111);
	        //     uiApp.$notify({
	        //       title: '成功',
	        //       message: '批量更新成功',
	        //       type: 'success'
	        //     })
	        // };
	        uiApp.evt.on('module-manual-update-tab', 'batchPass', function (next) {
	            next();
	            let ui = uiApp.getModule('module-manual-update-tab');
	            let ud = ui.get();
	            var showTabName = ud.showTabName;
	            var tagConf = map[showTabName];
	            var _this = this;
	            var fn = function () {}
	            var fn1  = function () {
	                var cud = cui.get();
	                console.log(cud);
	                tagConf.forEach(function (item) {
	                    if (!item.ids) {
	                        var fieldName = item.fieldName;
	                        var statusY = cud[fieldName].status;
	                        if (statusY == 1 || statusY == 3){
	                            return;
	                        } else {
	                            var id  = '';
	                            var status =  1;
	                            var comment = '';
	                            controller.loupan.auditFeildName(fieldName, status, comment, id, fn);
	                        }
	                    } else {
	                        var fieldName = item.fieldName;
	                        var fid = item.ids.fieldName;
	                        var items = uiApp.getModule(item.ids.moduleName).get()[fid];
	                        items.forEach(function (item1) {
	                            var statusY = item1.status;
	                            if (statusY == 1 || statusY == 3){
	                                return;
	                            } else {
	                                var id = item1.fieldId;
	                                var status =  1;
	                                var comment = '';
	                                controller.loupan.auditFeildName(fieldName, status, comment, id, fn);
	                            }
	                        });
	                    }
	                });
	            }
	            var fn2  = function () {
	                var cud = cui.get();
	                console.log(cud);
	                tagConf.forEach(function (item) {
	                    if (!item.ids) {
	                        var fieldName = item.fieldName;
	                        var s =  item.status;
	                        var statusY = cud[s];
	                        console.log(statusY);
	                        if (statusY == 1 || statusY == 3){
	                            return;
	                        } else {
	                            var id  = '';
	                            var status =  1;
	                            var comment = '';
	                            controller.loupan.auditFeildName(fieldName, status, comment, id, fn);
	                        }
	                    } else {
	                        var fieldName = item.fieldName;
	                        var fid = item.ids.fieldName;
	                        var items = uiApp.getModule(item.ids.moduleName).get()[fid];
	                        items.forEach(function (item1) {
	                            var id = item1.fieldId;
	                            var status =  1;
	                            var comment = '';
	                            controller.loupan.auditFeildName(fieldName, status, comment, id, fn);
	                        });
	                    }
	                });
	            }
	            if(showTabName == 'sale'){
	                console.log('sale');
	                var cui = uiApp.getModule('module-manual-update-sale');
	                fn1();
	            } else if (showTabName == 'launch') {
	                console.log('launch');
	                var cui = uiApp.getModule('module-manual-update-launch');
	                fn1();
	            } else if (showTabName == 'licence') {
	                console.log('licence');
	                var cui = uiApp.getModule('module-manual-update-license');
	                fn1();
	            } else if(showTabName == 'basic'){
	                console.log('basic');
	                var cui = uiApp.getModule('module-basic-info');
	                fn2();
	            } else if(showTabName == 'traffic'){
	                console.log('traffic');
	                var cui = uiApp.getModule('module-traffic-info');
	                fn2();
	            } else if(showTabName == 'plan'){
	                console.log('plan');
	                var cui = uiApp.getModule('module-plan-info');
	                fn2();
	            }
	            setTimeout(function () {
	                controller.loupan.renderTagPanel();
	                //open3();
	            }, 1000)
	            // all.(arr).then(   /// status    // next()   );
	        });
	        uiApp.evt.on('module-manual-update-tab', 'batchReject', function (next, msg) {
	            next();
	            let ui = uiApp.getModule('module-manual-update-tab');
	            let ud = ui.get();
	            var showTabName = ud.showTabName;
	            var tagConf = map[showTabName];
	            var _this = this;
	            var fn = function () {}
	            var fn1  = function () {
	                var cud = cui.get();
	                console.log(cud);
	                tagConf.forEach(function (item) {
	                    if (!item.ids) {
	                        var fieldName = item.fieldName;
	                        var statusY = cud[fieldName].status;
	                        if (statusY == 2 || statusY == 3){
	                            return;
	                        } else {
	                            var id  = '';
	                            var status =  2;
	                            var comment = msg;
	                            controller.loupan.auditFeildName(fieldName, status, comment, id, fn);
	                        }
	                    } else {
	                        var fieldName = item.fieldName;
	                        var fid = item.ids.fieldName;
	                        var items = uiApp.getModule(item.ids.moduleName).get()[fid];
	                        items.forEach(function (item1) {
	                            var statusY = item1.status;
	                            if (statusY == 2 || statusY == 3){
	                                return;
	                            } else {
	                                var id = item1.fieldId;
	                                var status =  2;
	                                var comment = msg;
	                                controller.loupan.auditFeildName(fieldName, status, comment, id, fn);
	                            }
	                        });
	                    }
	                });
	            }
	            var fn2  = function () {
	                var cud = cui.get();
	                console.log(cud);
	                tagConf.forEach(function (item) {
	                    if (!item.ids) {
	                        var fieldName = item.fieldName;
	                        var s =  item.status;
	                        var statusY = cud[s];
	                        console.log(statusY);
	                        if (statusY == 2 || statusY == 3){
	                            return;
	                        } else {
	                            var id  = '';
	                            var status = 2;
	                            var comment = msg;
	                            controller.loupan.auditFeildName(fieldName, status, comment, id, fn);
	                        }
	                    } else {
	                        var fieldName = item.fieldName;
	                        var fid = item.ids.fieldName;
	                        var items = uiApp.getModule(item.ids.moduleName).get()[fid];
	                        items.forEach(function (item1) {
	                            var id = item1.fieldId;
	                            var status =  2;
	                            var comment = msg;
	                            controller.loupan.auditFeildName(fieldName, status, comment, id, fn);
	                        });
	                    }
	                });
	            }
	            if(showTabName == 'sale'){
	                console.log('sale');
	                var cui = uiApp.getModule('module-manual-update-sale');
	                fn1();
	            } else if (showTabName == 'launch') {
	                console.log('launch');
	                var cui = uiApp.getModule('module-manual-update-launch');
	                fn1();
	            } else if (showTabName == 'licence') {
	                console.log('licence');
	                var cui = uiApp.getModule('module-manual-update-license');
	                fn1();
	            } else if(showTabName == 'basic'){
	                console.log('basic');
	                var cui = uiApp.getModule('module-basic-info');
	                fn2();
	            } else if(showTabName == 'traffic'){
	                console.log('traffic');
	                var cui = uiApp.getModule('module-traffic-info');
	                fn2();
	            } else if(showTabName == 'plan'){
	                console.log('plan');
	                var cui = uiApp.getModule('module-plan-info');
	                fn2();
	            }
	            setTimeout(function () {
	                controller.loupan.renderTagPanel();
	                // this.open3();
	            }, 1000)
	            // all.(arr).then(   /// status    // next()   );
	        });
	        uiApp.evt.on('module-manual-update-tab', 'openRejectDialog', function (next, msg) {
	            let ui = uiApp.getModule('module-manual-update-tab');
	            let ud = ui.get();
	            var showTabName = ud.showTabName;
	            var tagConf = map[showTabName];
	            var _this = this;
	            var rejectFlag = false;
	            var fn = function () {}
	            var fn1  = function () {
	                var cud = cui.get();
	                console.log(cud);
	                tagConf.forEach(function (item) {
	                    if (!item.ids) {
	                        var fieldName = item.fieldName;
	                        var statusY = cud[fieldName].status;
	                        if (statusY == 0){
	                            rejectFlag = true;
	                            next();
	                        }
	                    } else {
	                        var fieldName = item.fieldName;
	                        var fid = item.ids.fieldName;
	                        var items = uiApp.getModule(item.ids.moduleName).get()[fid];
	                        items.forEach(function (item1) {
	                            var statusY = item1.status;
	                            if (statusY == 0){
	                                rejectFlag = true;
	                                next();
	                            }
	                        });
	                    }
	                });
	            }
	            var fn2  = function () {
	                var cud = cui.get();
	                console.log(cud);
	                tagConf.forEach(function (item) {
	                    if (!item.ids) {
	                        var fieldName = item.fieldName;
	                        var s =  item.status;
	                        var statusY = cud[s];
	                        console.log(statusY);
	                        if (statusY == 0){
	                            rejectFlag = true;
	                            next();
	                        }
	                    } else {
	                        var fieldName = item.fieldName;
	                        var fid = item.ids.fieldName;
	                        var items = uiApp.getModule(item.ids.moduleName).get()[fid];
	                        items.forEach(function (item1) {
	                            var id = item1.fieldId;
	                            var status =  2;
	                            var comment = msg;
	                            controller.loupan.auditFeildName(fieldName, status, comment, id, fn);
	                        });
	                    }
	                });
	            }
	            if(showTabName == 'sale'){
	                console.log('sale');
	                var cui = uiApp.getModule('module-manual-update-sale');
	                fn1();
	            } else if (showTabName == 'launch') {
	                console.log('launch');
	                var cui = uiApp.getModule('module-manual-update-launch');
	                fn1();
	            } else if (showTabName == 'licence') {
	                console.log('licence');
	                var cui = uiApp.getModule('module-manual-update-license');
	                fn1();
	            } else if(showTabName == 'basic'){
	                console.log('basic');
	                var cui = uiApp.getModule('module-basic-info');
	                fn2();
	            } else if(showTabName == 'traffic'){
	                console.log('traffic');
	                var cui = uiApp.getModule('module-traffic-info');
	                fn2();
	            } else if(showTabName == 'plan'){
	                console.log('plan');
	                var cui = uiApp.getModule('module-plan-info');
	                fn2();
	            }
	            setTimeout(function () {
	                controller.loupan.renderTagPanel();
	                // this.open3();
	            }, 1000)
	            // all.(arr).then(   /// status    // next()   );
	        });
	        uiApp.evt.on('module-artificial-regeneration-photos', 'allChoiceInfo', function (next, msg) {
	            next();
	            let ui = uiApp.getModule('module-artificial-regeneration-photos');
	            let ud = ui.get();
	            console.log("ud");
	            console.log(ud);
	            let comment = msg;
	            let photoList = ud.photoList;
	            var fn = function () {};
	            if (!photoList) return;
	            photoList.map(function (item) {
	                var id = item.fieldId;
	                var fieldName = 'album';
	                var status = item.status;
	                controller.loupan.auditFeildName(fieldName, status, comment, id, fn);
	            })
	            // controller.loupan.renderTagPanel();
	        });
	        uiApp.evt.on('module-artificial-regeneration-photos', 'batchUpdate', function (next, msg) {
	            let ui = uiApp.getModule('module-artificial-regeneration-photos');
	            let ud = ui.get();
	            console.log("ud");
	            console.log(ud);
	            let comment = msg;
	            let photoList = ud.photoList;
	            var fn = function () {};
	            if (!photoList) return;
	            photoList.map(function (item) {
	                if (item.selected) {
	                    var id = item.fieldId;
	                    var fieldName = 'album';
	                    var status = 1;
	                    controller.loupan.auditFeildName(fieldName, status, comment, id, fn);
	                }
	            })
	            next();
	            // controller.loupan.renderTagPanel();
	        });
	    };
	
	    fnHouseType();
	    fnAuditEvent();
	    fnLoupanTable();
	    fnLayout();
	};
	
	
	var fnAdapterRouter = function () {
	    var adapter = function () {
	        var route = uiApp.router.getRoute();
	
	        if (route.path === '/component/manual-update-tab') {
	            if (route.query.loupanId) {
	                controller.cache.loupanId = route.query.loupanId;
	                controller.cache.cityId = route.query.cityId;
	                controller.loupan.renderUpdateTask();
	                controller.loupan.renderTagPanel('sale');
	                let ui = uiApp.getModule('module-manual-update-tab');
	                ui.set('projectName', route.query.projectName);
	            } else {
	                controller.loupan.renderTagPanel();
	            }
	        }
	    };
	
	    uiApp.router.on(adapter);
	    adapter();
	};
	
	
	fnAddEvent();
	fnAdapterRouter();


/***/ },
/* 20 */
/***/ function(module, exports) {

	// module.exports = '//house-sv-base.focus' + window.env +'.cn';
	module.exports = '//house-be-manage.focus' + window.env +'.cn';
	


/***/ },
/* 21 */
/***/ function(module, exports) {

	var check = {
	    checkNum1: function (value, error) {
	        var rule = /(^[0-9]{1,99})(\.){0,1}[0-9]{0,2}$/;
	        if (rule.test(value) || value === '' || value === undefined) {
	            error = false;
	        } else {
	            error = true;
	        }
	        return [value, error];
	    },
	    checkNum2: function(value, error) {
	        var rule = /^[0-9]{1,99}$/;
	        if (rule.test(value) || value === '' || value === undefined) {
	            error = false;
	        } else {
	            error = true;
	        }
	        return [value, error];
	    },
	    checkTypeIntroduction: function(value, error, numerror, error1, error2, error3) {
	        var rule = /^[0-9]{1,99}$/
	        if (value === '') {
	            error = 1;
	            numerror = true;
	        } else if (!rule.test(value)) {
	            error = 2;
	            numerror = true;
	        } else if(!error1 && !error2 && !error3){
	            error = 0;
	            numerror = false;
	        } else {
	            numerror = false;
	        }
	        return [value, error, numerror];
	    },
	    getText: function (list, index) {
	        if (!index) {
	            return undefined;
	        }
	        var update = '';
	        list.map( function (item) {
	            if(item.value == index){
	                update = item.text;
	            }
	        })
	        return update;
	    },
	    getArrayText: function (list, index) {
	        var updateArr = [];
	        var arr = [];
	        if (index instanceof Array) {
	            arr = index;
	        } else if (typeof index === 'string'){
	            arr = index.split(',');
	        }
	        arr.map( 
	            function (v) {
	                if (v !== '') {
	                    list.map( function (item) {
	                        if(item.value == v){
	                            updateArr.push(item.text);
	                        }
	                    }) 
	                }
	            }
	        );
	        return updateArr;
	    }
	};
	
	module.exports = check;

/***/ }
/******/ ]);
//# sourceMappingURL=data.js.map