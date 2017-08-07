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

	var uiApp = window.uiAppComment;
	window.appComment = window.appComment || {};
	window.appComment = {
	    map: "",
	    marker: "",
	    circle: "",
	    provinces: []
	};
	__webpack_require__(1);
	
	var Ajax =  __webpack_require__(2);
	var domainWrite =  __webpack_require__(15);
	
	//路由切换
	var router = function(path) {
	        if(typeof path =='undefined') {
	            var path = uiApp.router.getRoute().path;
	        }
	        console.log(path);
	        //debugger;
	        switch (path) {
	            case '/config-list':
	                __webpack_require__(18);
	                var configData = uiApp.getModule('module-config-list');
	                configDataList = configData.get();
	                // var cityId = configDataList.cityId;
	                // if( cityId == "") {   cityId = 1;  }
	                // Ajax.get('/city/getAllVdistrictByCityId',{'cityId': cityId, 'status': 0}, function (data) {
	                //     configData.set('recAddList', data.data);
	                // });
	                break;
	            case '/business-list':
	                window.appComment.map = "";
	                window.appComment.marker = "";
	                window.appComment.circle = "";
	                __webpack_require__(20);
	                break;
	            case '/district-list':
	                __webpack_require__(21);
	                break;
	            case '/subway-list':
	                window.appComment.map = "";
	                window.appComment.marker = "";
	                window.appComment.circle = "";
	                __webpack_require__(22);
	                break;
	            case '/loupan-rating':
	                window.appComment.map = "";
	                window.appComment.marker = "";
	                window.appComment.circle = "";
	                __webpack_require__(23);
	                break;
	            case '/city-contact':
	                window.appComment.map = "";
	                window.appComment.marker = "";
	                window.appComment.circle = "";
	                __webpack_require__(24);
	                break;
	            case '/company/developer-management':
	                window.appComment.map = "";
	                window.appComment.marker = "";
	                window.appComment.circle = "";
	                __webpack_require__(25);
	                break;
	            case '/company/brand-management':
	                window.appComment.map = "";
	                window.appComment.marker = "";
	                window.appComment.circle = "";
	                __webpack_require__(26);
	                break;
	            case '/company/investor-management':
	                window.appComment.map = "";
	                window.appComment.marker = "";
	                window.appComment.circle = "";
	                __webpack_require__(27);
	                break;
	        }
	        uiApp.router.pushState(path);
	}
	uiApp.router.on(router);
	
	var cookies = document.cookie, userCookie = '';
	cookies.split(';').forEach(function (item) {
	    if (item.indexOf('FOCUS_A_UDIG') !== -1) {
	        userCookie = item;
	    }
	});
	if (!userCookie) {
	    var url = window.location.href;
	    window.location.href = domainWrite + '/user/login?ru=' + url;
	} else {
	    if (document.getElementById('commentApp')) {
	        Ajax.get('/user/getToken',{}, function (data) {
	            window.appComment.token = data.data.token;
	        }, function () { }, 1, true);
	        var app = new uiApp.constructor();
	        app.$mount('#commentApp');
	    }
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var uiApp = window.uiAppComment;
	var Ajax =  __webpack_require__(2);
	
	//获取城市
	function getCity(provinceId, cityFn, areaFn, type) {
	    if(typeof provinceId == 'undefined') {
	        provinceId = 1;
	    }
	    var url = "/geoInfo/list/city/"+provinceId
	    Ajax.get(url,{'provinceId': provinceId}, function (data) {   
	        var data = data.data;
	        cityFn && cityFn(data);
	        if(!!data[0]&&data[0].cityId){
	          if (type == 1) {
	            areaFn && getArea(data[0].cityId, areaFn);
	          } else {
	            areaFn && getVirtualArea(data[0].cityId, areaFn);
	          }    
	        }
	    },function(){},0,true);
	}
	//获取省份
	function getProvince(fn, cityFn, areaFn, type) {
	    var callBack = function (data) {
	          fn && fn(data);
	          data[0].provinceId && getCity(data[0].provinceId, cityFn, areaFn, type);
	    };
	    // if(window.appComment.provinces.length ==0){
	       Ajax.get('/geoInfo/list/province',{'status': 1}, function (data) {
	          var data = data.data;
	          window.appComment.provinces = data;
	          callBack(data);
	      },function(){},0,true);       
	    // }else{
	        // callBack(window.appComment.provinces);
	    // }
	}
	
	//获取区县
	function getArea(cityId, areaFn) {
	      if(typeof cityId == 'undefined') {
	          cityId = 1;
	      }      
	     Ajax.get('/city/district', {cityId: parseInt(cityId)}, function (data) { 
	        areaFn && areaFn(data.data);
	     },function(){},3)   
	}
	
	//获取虚拟区县
	function getVirtualArea(cityId, areaFn) {
	      if(typeof cityId == 'undefined') {
	          cityId = 1;
	      }      
	     Ajax.get('/city/v_district', {cityId: parseInt(cityId)}, function (data) { 
	        areaFn && areaFn(data.data);
	     },function(){},3)   
	}
	
	
	
	
	
	//获取城市编辑选项无限制
	function getCityEdit(provinceId, cityFn, areaFn, type) {
	    if(typeof provinceId == 'undefined') {
	        provinceId = 1;
	    }
	    Ajax.get('/city/list',{'provinceId': provinceId}, function (data) {   
	        var data = data.data;
	        cityFn && cityFn(data);
	        if(!!data[0]&&data[0].cityId){
	          if (type == 1) {
	            areaFn && getArea(data[0].cityId, areaFn);
	          } else {
	            areaFn && getVirtualArea(data[0].cityId, areaFn);
	          }    
	        }
	    },function(){},3);
	}
	//获取省份编辑选项无限制
	function getProvinceEdit(fn, cityFn, areaFn, type) {
	    var callBack = function (data) {
	          fn && fn(data);
	          data[0].provinceId && getCityEdit(data[0].provinceId, cityFn, areaFn, type);
	    };
	    // if(window.appComment.provinces.length ==0){
	       Ajax.get('/city/province',{'status': 1}, function (data) {
	          var data = data.data;
	          window.appComment.provinces = data;
	          callBack(data);
	      },function(){},3);       
	    // }else{
	        // callBack(window.appComment.provinces);
	    // }
	}
	
	//深度复制
	//判断对象的数据类型
	function isClass(o){
	    if(o===null) return "Null";
	    if(o===undefined) return "Undefined";
	    return Object.prototype.toString.call(o).slice(8,-1);
	}
	function deepClone(obj){
	    var result;
	    var oClass=isClass(obj);
	    if(oClass==="Object"){
	        result={};
	    }else if(oClass==="Array"){
	        result=[];
	    }else{
	        return obj;
	    }
	    for(var key in obj){
	       var copy=obj[key];
	       if(isClass(copy)=="Object"){
	           result[key]=arguments.callee(copy);//递归调用
	        }else if(isClass(copy)=="Array"){
	           result[key]=arguments.callee(copy);
	        }else{
	            result[key]=obj[key];
	        }
	    }
	 return result;
	}
	
	window.appComment.getProvince = getProvince;
	window.appComment.getCity = getCity;
	window.appComment.getArea = getArea;
	window.appComment.getVirtualArea = getVirtualArea;
	window.appComment.deepClone = deepClone;
	window.appComment.getProvinceEdit = getProvinceEdit;
	window.appComment.getCityEdit = getCityEdit;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(3);
	var domain =  __webpack_require__(14);
	var domainWrite =  __webpack_require__(15);
	var domainRating =  __webpack_require__(16);
	var domainCity = __webpack_require__(17);
	var Ajax = {
	    get : function (url, params, fn, errFn, type, withCredentials) {
	        //debugger;
	        var domainUrl = "";
	        if(type == 1) {
	            domainUrl = domainWrite + url;
	        } else if (type == 2){
	            domainUrl = domainRating + url;
	        } else if (type == 3){
	            domainUrl = domainCity + url;
	        } else {
	            domainUrl = domain + url;
	        }
	        if(typeof withCredentials =='undefined'){
	            withCredentials = false;
	        }
	        request.ajax({
	            url: domainUrl,
	            type: 'GET',
	            data: params,
	            withCredentials: withCredentials,
	            complete: function (data) { 
	                if(parseInt(data.code) === 200 || parseInt(data.code) === 1 || parseInt(data.errorCode) === 0) {
	                    fn && fn(data);
	                } else {
	                    errFn && errFn(data);
	                }
	            }
	        })
	    },
	    getPost: function (url, params, fn) {
	         request.ajax({
	            url: domain + url,
	            type: 'GET',
	            data: params,
	            withCredentials: true,
	            complete: function (data) {
	                fn && fn(data);
	            }
	        });     
	    },
	    postJson: function(url, params, fn, type, withCredentials, cType) {
	        var domainUrl = "";
	        if(type == 1) {
	            domainUrl = domainWrite + url;
	        } else if (type == 2){
	            domainUrl = domainRating + url;
	        } else {
	            domainUrl = domain + url;
	        }
	
	        var contentType = "";
	        if(cType == 1) {
	            contentType = 'application/x-www-form-urlencode';
	        } else {
	            contentType = 'application/json';
	        }
	
	        if(typeof withCredentials =='undefined'){
	            withCredentials = false;
	        }
	        //debugger;
	         request.ajax({
	            url: domainUrl,
	            type: 'POST',
	            contentType: contentType,
	            data: params,
	            withCredentials: withCredentials,
	            complete: function (data) {
	                fn && fn(data);
	            }
	        });
	    }
	}
	
	module.exports = Ajax;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var $$request = __webpack_require__(5);
	var $$requestIframe = __webpack_require__(6);
	var $$limit = __webpack_require__(8);
	var $$querystring = __webpack_require__(10);
	__webpack_require__(13);
	
	
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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Messager = __webpack_require__(7).Messager;
	
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
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var $$util = __webpack_require__(9);
	var $$querystring = __webpack_require__(10);
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
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(11);
	exports.encode = exports.stringify = __webpack_require__(12);


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
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ function(module, exports) {

	// var host = window.location.host, domain = '';
	// if(host.indexOf('-dev') > -1 ){
	//     domain = '//house-sv-base.focus-dev.cn';
	// }else if(host.indexOf('-test') > -1) {
	//     domain = '//house-sv-base.focus-test.cn';
	// }else{
	//     domain = '//house-sv-base.focus.cn';
	// }
	// module.exports = domain;
	var host = window.location.host, domain = '';
	if(host.indexOf('-dev') > -1 ){
	    domain = '//house-be-manage.focus-dev.cn';
	}else if(host.indexOf('-test') > -1) {
	    domain = '//house-be-manage.focus-test.cn';
	}else{
	    domain = '//house-be-manage.focus.cn';
	}
	module.exports = domain;

/***/ },
/* 15 */
/***/ function(module, exports) {

	var host = window.location.host, domain = '';
	if(host.indexOf('-dev') > -1 ){
	    domain = '//house-be-manage.focus-dev.cn';
	}else if(host.indexOf('-test') > -1) {
	    domain = '//house-be-manage.focus-test.cn';
	}else{
	    domain = '//house-be-manage.focus.cn';
	}
	module.exports = domain;

/***/ },
/* 16 */
/***/ function(module, exports) {

	var host = window.location.host, domain = '';
	if(host.indexOf('-dev') > -1 ){
	    domain = '//search-engine.focus-dev.cn';
	}else if(host.indexOf('-test') > -1) {
	    domain = '//search-engine.focus-test.cn';
	}else{
	    domain = '//search-engine.focus.cn';
	}
	module.exports = domain;

/***/ },
/* 17 */
/***/ function(module, exports) {

	var host = window.location.host, domain = '';
	if(host.indexOf('-dev') > -1 ){
	    domain = '//house-sv-base.focus-dev.cn';
	}else if(host.indexOf('-test') > -1) {
	    domain = '//house-sv-base.focus-test.cn';
	}else{
	    domain = '//house-sv-base.focus.cn';
	}
	module.exports = domain;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var uiApp = window.uiAppComment;
	var Ajax =  __webpack_require__(2);
	var enumData =  __webpack_require__(19);
	
	//赋值物业类型
	var configData = uiApp.getModule('module-config-list');
	configData.set('wuyeOption', enumData.propertyTypes);
	
	//获取省份
	window.appComment.getProvince(function(data) {
	    configData.set('provinceOptions', data);
	    data[0].provinceId && configData.set('provinceId', data[0].provinceId);
	}, function (data) { 
	    configData.set('cityOptions', data);
	    data[0].cityId && configData.set('cityId', data[0].cityId);   
	    // recSeach()
	    search();
	});
	
	
	uiApp.evt.on('module-config-list', 'getCity', function (next, provinceId) {
	    var provinceId = typeof provinceId =='undefined' ? configData.get().provinceId:  provinceId;
	    if(provinceId==""){
	        configData.set('cityId', "");
	        configData.set('cityOptions', []);
	        return;
	    }
	    window.appComment.getCity(provinceId, function (data) { 
	        configData.set('cityOptions', data);
	        data[0].cityId && configData.set('cityId', data[0].cityId);   
	    });
	});
	
	function formatData(data) {
	    if(typeof data=='undefined'){
	        return [];
	    }
	    var length = data.length, newData = [], temp, min = 0, max = 0, m;
	    for(var i = 0; i < length; i++){
	        var temp = data[i].enumTxt;
	        if(temp.indexOf('以下') > -1){
	            max = temp.replace(/[^0-9]+/g, '');
	            min = 0;
	        }else if(temp.indexOf('以上') > -1){
	            min = temp.replace(/[^0-9]+/g, '');
	            max = 0;
	        }else{
	            m = temp.match(/\d+/g);
	            if(m.length >= 2){
	                min = m[0];
	                max = m[1];               
	            }else{
	                console.log('数据结构错误');
	            }
	        }
	        newData.push({
	            id: data[i].id,
	            num: data[i].displayIndex,
	            min: min,
	            max: max 
	        });
	    }
	    return newData;
	}
	function formatWuyeData(data, type) {
	    if(typeof data=='undefined'){
	        return [];
	    }
	    var length = data.length, newData = [];
	    if(length==0){
	        return newData;
	    }
	    if (type==='hx') {
	        for(var i = 0; i < length; i++){
	            newData.push({
	                id: data[i].looplineId,
	                num: data[i].displayIndex,
	                txt: data[i].looplineName
	            });
	        }
	    }else if(type==='rec') {
	        for(var i = 0; i < length; i++){
	            newData.push({
	                id: data[i].virtualDistrictId,
	                num: data[i].displayIndex,
	                type: parseInt(data[i].relationType),
	                txt: data[i].virtualDistrictName
	            });
	        }
	    }else{
	        for(var i = 0; i < length; i++){
	            newData.push({
	                id: data[i].id,
	                num: data[i].displayIndex,
	                key: parseInt(data[i].enumId),
	                txt: data[i].enumTxt
	            });
	        }
	    }
	    return newData;
	}
	function search(cityId) {
	    if(typeof cityId == 'undefined') {
	        cityId = 1;
	    }
	    var configData = uiApp.getModule('module-config-list'), configDataList, data;
	     Ajax.get('/city/configprops',{'cityId': cityId, 'cacheDisabled': 1}, function (data) {   
	        data = data.data;
	        if(typeof data == 'undefined'){
	            data = {
	                unitPriceSpan: [],
	                totalPriceSpan: [],
	                areaSpan: [],
	                propertyTypes: []
	            };
	        }
	        configData.set('unitData', formatData(data.unitPriceSpan));
	        configData.set('unitForm', formatData(data.unitPriceSpan));
	        configData.set('totalData', formatData(data.totalPriceSpan));
	        configData.set('totalForm', formatData(data.totalPriceSpan));
	        configData.set('areaData', formatData(data.areaSpan));
	        configData.set('areaForm', formatData(data.areaSpan));
	        configData.set('wuyeData', formatWuyeData(data.propertyTypes));
	        configData.set('wuyeForm', formatWuyeData(data.propertyTypes));
	    },function(){},3);  
	    //获取环线数据  
	    Ajax.get('/city/loopline',{'cityId': cityId, 'cacheDisabled': 1}, function (data) {
	        var data = data.data;
	        if(typeof data == 'undefined'){
	            data = [];
	        }
	        configData.set('hxData', formatWuyeData(data, 'hx'));
	        configData.set('hxForm', formatWuyeData(data, 'hx'));
	    },function(){},3);
	    recSeach();//获取虚拟区县数据
	}
	
	//获取配置项的数据
	// uiApp.evt.on('module-config-list', 'beforeMount', function () {
	//     var configData = uiApp.getModule('module-config-list'), configDataList;
	//           configDataList = configData.get();
	//     search();
	// });
	
	uiApp.evt.on('module-config-list', 'search', function () {
	    var configData = uiApp.getModule('module-config-list'), configDataList;
	          configDataList = configData.get();
	    search(configDataList.cityId);
	});
	
	function formatTxt(data, type, i, length){
	    var string = '', mid = "";
	    if(type===4){
	        return data.txt;
	    }
	    if(type===3){
	        mid = '万';
	    }else if(type===5){
	        mid = "㎡";
	    }
	    if(i==length){
	        string = data.min+mid+'以上';
	    }else if(i==0) {
	        string = data.max+mid+'以下';
	    }else{
	        string = data.min +"-"+data.max + mid;
	    }
	    return string;
	}
	
	//修改配置项数据
	uiApp.evt.on('module-config-list', 'addConfg', function (next, types) {
	    var configData = uiApp.getModule('module-config-list'), configDataList;
	          configDataList = configData.get();
	    var data, params = {
	        operator: window.appComment.token,
	        cityId: configDataList.cityId,
	        list: []
	    };
	    
	    switch (types) {
	        case 2:
	            data = configDataList.unitForm;
	            break;
	        case 3:
	            data = configDataList.totalForm;
	            break;
	        case 4:
	            data = configDataList.wuyeForm;
	            break;
	        case 5:
	            data = configDataList.areaForm;
	            break;
	    }
	    var length = data.length;
	    configData.set('isDataEmpty', 0);
	    if(length==0){
	        configData.set('isDataEmpty', 1);
	        next();
	        return;
	    }
	
	    var temp, txt, isError = 0, isNumber = 0;
	    configData.set('errorInput', 0);
	    configData.set('isNaN', 0);
	    for(var i=0; i < length; i++){
	        if(types==2 || types==3 || types==5){
	             if(i==0 || i == length-1){
	                if(data[i].min==="" && data[i].max===""){
	                    isError = 1;
	                    break;
	                }
	            }else if(data[i].min==="" || data[i].max===""){
	                isError = 1;
	                break;
	            }
	            //判断内容是否为数字
	            if(isNaN(data[i].min) || isNaN(data[i].max)){
	                isNumber = 1;
	                break;
	            }           
	        }
	        txt = formatTxt(data[i], types, i, length-1);
	        if(data[i].id > -1){
	            temp = {
	                id: data[i].id,
	                enumTxt: txt,
	                displayIndex: length - i 
	            }
	        }else{
	            temp = {
	                cityId: configDataList.cityId,
	                confType: types,
	                enumTxt: txt,
	                displayIndex: length - i              
	            }
	        }
	        if(types==4){
	            temp.enumId = data[i].key;
	        }
	        params.list.push(temp);
	    }
	    if(isError==1){
	        configData.set('errorInput', 1);
	        next();
	        return;
	    }
	    if(isNumber==1){
	        configData.set('isNaN', 1);
	        next();
	        return;
	    }
	
	    configData.set('status', 0);
	    Ajax.postJson('/city/editConfigBatch',params, function (data) {
	         if(parseInt(data.code) === 1 || parseInt(data.code) === 200) {
	            configData.set('status', 1);
	        }
	        next();
	    }, 1, true);
	});
	//修改环线数据
	uiApp.evt.on('module-config-list', 'addHx', function (next) { 
	    var configData = uiApp.getModule('module-config-list'), configDataList;
	          configDataList = configData.get();
	    var data = configDataList.hxForm, params = {
	        operator: window.appComment.token,
	        cityId: configDataList.cityId,
	        list: []
	    };
	    var length = data.length;
	    configData.set('isDataEmpty', 0);
	    if(length==0){
	        configData.set('isDataEmpty', 1);
	        next();
	        return;
	    }
	     var isError = 0;
	    configData.set('errorInput', 0);
	    for(var i=0; i < length; i++){
	        if(data[i].txt===""){
	            console.log(data[i].txt);
	            isError = 1;
	            break;
	        }        
	        if(data[i].id > -1){
	            temp = {
	                looplineId: data[i].id,
	                looplineName: data[i].txt,
	                displayIndex: data[i].num                
	            }
	        }else{
	            temp = {
	                cityId: configDataList.cityId,
	                looplineName: data[i].txt,
	                displayIndex: data[i].num                
	            }
	        }
	        params.list.push(temp);      
	    }
	    if(isError==1){
	        configData.set('errorInput', 1);
	        next();
	        return;
	    }    
	    configData.set('status', 0);
	    Ajax.postJson('/city/editLooplineBatch',params, function (data) {
	         if(parseInt(data.code) === 1 || parseInt(data.code) === 200) {
	            configData.set('status', 1);
	        }
	        next();       
	    }, 1, true);    
	});
	
	//删除配置项
	uiApp.evt.on('module-config-list', 'delConfigprop', function (next, id) { 
	    var configData = uiApp.getModule('module-config-list'), configDataList;
	          configDataList = configData.get();
	    configData.set('status', 0);
	    Ajax.postJson('/city/deleteConfigprop?id='+id,'', function (data) {
	        if(parseInt(data.code) === 1 || parseInt(data.code) === 200) {
	            configData.set('status', 1);
	        }
	        next();       
	    }, 1, true); 
	});
	
	//删除环线
	uiApp.evt.on('module-config-list', 'delLoopline', function (next, id) { 
	    var configData = uiApp.getModule('module-config-list'), configDataList;
	          configDataList = configData.get();
	    configData.set('status', 0);
	    Ajax.postJson('/city/deleteLoopline?loopLineId='+id,'', function (data) {
	        if(parseInt(data.code) === 1 || parseInt(data.code) === 200) {
	            configData.set('status', 1);
	        }
	        next();
	    }, 1, true);
	});
	
	//获取虚拟区县
	/*
	uiApp.evt.on('module-config-list', 'addTotalRec', function (next) { 
	    var configData = uiApp.getModule('module-config-list'), configDataList;
	          configDataList = configData.get();
	    if(configDataList.recAddList.length == 0){
	        var  params = {
	                    cityId: configDataList.cityId,
	                    status: 0
	               };
	        Ajax.get('/city/getAllVdistrictByCityId',params, function (data) {
	            configData.set('recAddList', data.data);
	        });
	    }
	    next();
	});
	*/
	//删除推荐虚拟区县
	uiApp.evt.on('module-config-list', 'delRecData', function (next, id, index) { 
	    var configData = uiApp.getModule('module-config-list'), configDataList;
	          configDataList = configData.get();
	     configData.set('status', 0);
	    Ajax.postJson('/city/hideVdistrict?virtualDistrictId='+id,'', function (data) {
	        if(parseInt(data.code) === 1 || parseInt(data.code) === 200) {
	            configData.set('status', 1);
	            Ajax.get('/city/getAllVdistrictByCityId',{cityId: configDataList.cityId, status: 0}, function (data) {
	                configData.set('recAddList', data.data);
	            }, function() {}, 0, true);
	        }
	        next();
	    }, 1, true);
	});
	
	function recSeach() {
	    configDataList = configData.get();
	    var cityId = configDataList.cityId;
	    if( cityId == "") {
	        cityId = 0;
	    }
	     Ajax.get('/city/getAllVdistrictByCityId',{'cityId': cityId, status: 1}, function (data) {
	        var data = data.data;
	        if(typeof data == 'undefined'){
	            data = [];
	        }
	        configData.set('recAreaData', formatWuyeData(data, 'rec'));
	        configData.set('recAreaForm', formatWuyeData(data, 'rec'));
	    }, function() {},0,true);
	   Ajax.get('/city/getAllVdistrictByCityId',{'cityId': cityId, 'status': 0}, function (data) {
	        configData.set('recAddList', data.data);
	    }, function() {},0,true);
	}
	
	//虚拟区县排序
	uiApp.evt.on('module-config-list', 'addRec', function (next, id, index) { 
	    var configData = uiApp.getModule('module-config-list'), configDataList;
	          configDataList = configData.get();
	     configData.set('status', 0);
	     var list = [], length = configDataList.recAreaForm.length, 
	            params = {
	                                operator: window.appComment.token,
	                                cityId: configDataList.cityId,
	                                list: []
	                            };
	       configDataList.recAreaForm.forEach(function (item, index){
	            list.push({
	                virtualDistrictId: item.id,
	                displayIndex: length - index
	            });
	       }); 
	       params.list = list;
	    Ajax.postJson('/city/editVdistrictSort', params, function (data) {
	        if(parseInt(data.code) === 1 || parseInt(data.code) === 200) {
	            configData.set('status', 1);
	            recSeach();//获取虚拟区县数据
	        }
	        next();
	    }, 1, true);
	});
	
	//填加推荐虚拟区县
	uiApp.evt.on('module-config-list', 'addSecRec2', function (next) { 
	    var configData = uiApp.getModule('module-config-list'), configDataList;
	          configDataList = configData.get();
	    configData.set('status', 0);
	    var params = {
	        list: [configDataList.recAddList[parseInt(configDataList.configRadioGroup) - 1].virtualDistrictId]
	    }
	    Ajax.postJson('/city/showVdistricts', params, function (data) {
	        if(parseInt(data.code) === 1 || parseInt(data.code) === 200) {
	            configData.set('status', 1);
	            recSeach();//获取虚拟区县数据
	        }
	        next();
	    }, 1, true);
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = {
		"propertyTypes": [
			{
				"key": 0,
				"value": "普通住宅"
			},
			{
				"key": 1,
				"value": "花园洋房"
			},
			{
				"key": 2,
				"value": "经济适用房"
			},
			{
				"key": 3,
				"value": "公租房"
			},
			{
				"key": 4,
				"value": "限价房"
			},
			{
				"key": 5,
				"value": "自住型商品房"
			},
			{
				"key": 6,
				"value": "安居型商品房"
			},
			{
				"key": 7,
				"value": "别墅"
			},
			{
				"key": 8,
				"value": "公寓"
			},
			{
				"key": 9,
				"value": "商住楼"
			},
			{
				"key": 10,
				"value": "酒店式公寓"
			},
			{
				"key": 11,
				"value": "廉租房"
			},
			{
				"key": 12,
				"value": "住宅底商"
			},
			{
				"key": 13,
				"value": "写字楼商铺"
			},
			{
				"key": 14,
				"value": "临街商铺"
			},
			{
				"key": 15,
				"value": "市场类商铺"
			},
			{
				"key": 16,
				"value": "商业街商铺"
			},
			{
				"key": 17,
				"value": "购物中心商铺"
			},
			{
				"key": 18,
				"value": "写字楼"
			}
		],
		"businessTypeOption": [
			{
				"id": 500,
				"name": "徒步商圈(500米以内)"
			},
			{
				"id": 1500,
				"name": "生活商圈(1500米以内)"
			},
			{
				"id": 3000,
				"name": "地域商圈(3000米以内)"
			}
		],
		"loupanGrade": [
			{
				"key": 1,
				"value": "A"
			},
			{
				"key": 2,
				"value": "B"
			},
			{
				"key": 3,
				"value": "C"
			},
			{
				"key": 4,
				"value": "屏蔽"
			}
		],
		"loupanLocalLevel": [
			{
				"key": 0,
				"value": "异地楼盘"
			},
			{
				"key": 1,
				"value": "本地楼盘"
			}
		],
		"loupanSaleStatus": [
			{
				"key": 0,
				"value": "待售"
			},
			{
				"key": 1,
				"value": "在售"
			}
		],
		"loupanRatingIdentity": [
			{
				"key": "operationScore",
				"value": "运营"
			},
			{
				"key": "saleScore",
				"value": "广告"
			},
			{
				"key": "directSaleScore",
				"value": "直销"
			}
		]
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var uiApp = window.uiAppComment;
	var Ajax =  __webpack_require__(2);
	var enumData =  __webpack_require__(19);
	
	//赋值类型
	var businessData = uiApp.getModule('module-business-list');
	businessData.set('busFormOptions', enumData.businessTypeOption);
	
	var cityCallback = function (data) {
	    var BusinessForm = {        
	        circleName: "",
	        circleId: "",
	        busFormId: 500,
	        provinceId: businessData.get().provinceId,
	        cityId: "",
	        businessId: "",
	        position: [],
	        districtList: []
	    };
	    if(data.length > 0){
	        businessData.set('cityOptions', data);
	        if(data[0]){
	            businessData.set('cityId', data[0].cityId);
	            //存入经纬度
	            BusinessForm.cityId = data[0].cityId;
	            businessData.set('BusinessForm', BusinessForm);
	            businessData.set('position', [data[0].geoLng, data[0].geoLat]);
	            search(data[0].cityId, 1);     
	        }
	    }
	    
	};
	//获取省份
	window.appComment.getProvince(function(data) {
	    businessData.set('provinceOptions', data);
	    data[0].provinceId && businessData.set('provinceId', data[0].provinceId);
	}, function (data) {
	    cityCallback(data);
	    
	});
	//编辑获取省份
	window.appComment.getProvinceEdit(function(data) {
	    businessData.set('provinceOptions1', data);
	    data[0].provinceId && businessData.set('provinceId', data[0].provinceId);
	}, function (data) {
	    businessData.set('cityOptions1', data);
	});
	
	uiApp.evt.on('module-business-list', 'getCity', function (next, provinceId) {
	    console.log('getCity')
	    var provinceId = typeof provinceId =='undefined' ? businessData.get().provinceId:  provinceId;
	    if(provinceId==""){
	        businessData.set('cityId', "");
	        businessData.set('cityOptions', []);
	        return;
	    }
	    window.appComment.getCity(provinceId, cityCallback, function (data) {
	        businessData.set('districtsOptions', data);
	    },1);   
	});
	uiApp.evt.on('module-business-list', 'getCity1', function (next, provinceId) {
	    var businessData = uiApp.getModule('module-business-list'), businessDataList, BusinessForm;
	    businessDataList = businessData.get();
	    BusinessForm = businessDataList.BusinessForm;
	     var provinceId = typeof provinceId =='undefined' ? BusinessForm.provinceId:  provinceId;
	    if(provinceId==""){
	        BusinessForm.cityId = "";
	        BusinessForm.businessId ="";
	        businessData.set('BusinessForm', BusinessForm);
	        businessData.set('districts', {
	            districtId :  "",
	            districtAdcode : "",
	            displayIndex : 0,
	            districtName: ""
	        });
	        return;
	    }
	    window.appComment.getCityEdit(provinceId, function (data) {
	        var BusinessForm = businessData.get().BusinessForm;
	        businessData.set('cityOptions1', data);
	        if(data[0]){
	            BusinessForm.cityId = data[0].cityId;
	            businessData.set('BusinessForm', BusinessForm);
	        }
	    }, function (data) {
	        console.log(data)
	        var businessDataList1 = businessData.get(), BusinessForm;
	        BusinessForm = businessDataList1.BusinessForm;
	        BusinessForm.businessId ="";
	        businessData.set('BusinessForm', BusinessForm);
	        businessData.set('districtsOptions', data);
	    },1);
	});
	//获取下属区县
	uiApp.evt.on('module-business-list', 'getArea', function (next, cityId) {
	     var cityId, BusinessForm = businessData.get().BusinessForm;
	     cityId = typeof cityId =='undefined' ? BusinessForm.cityId:  cityId;
	     if(cityId==""){
	        BusinessForm.businessId ="";
	        businessData.set('BusinessForm', BusinessForm);
	        businessData.set('districts', {
	            districtId :  "",
	            districtAdcode : "",
	            displayIndex : 0,
	            districtName: ""
	        });
	        return;
	     }
	     window.appComment.getArea(cityId, function (data) {
	        businessData.set('districtsOptions', data);
	     });
	});
	
	//搜索商圈
	function searchBus () {
	     var businessData = uiApp.getModule('module-business-list'),businessDataList;
	           businessDataList = businessData.get();
	    var params = {
	                'cityId': businessDataList.cityId,
	                'circleName': businessDataList.searchInput
	            };
	    Ajax.get('/city/getCircleByName', params, function (data) { 
	        var data = data.data, lists = [], temp, m='';
	         data.forEach(function (item, i) {
	            temp = item.circleBounds.split(',');
	            if(temp[0]==500){
	                m = "徒步商圈";
	            }else if(temp[0]==1500) {
	                m = "生活商圈";
	            }else{
	                m = "地域商圈";
	            }
	            lists.push({
	                circleId: item.circleId,
	                circleName: item.circleName,
	                longitude: temp[1],
	                latitude: temp[2],
	                type: m,
	                radius: temp[0]
	            });
	        });
	        businessData.set('businessList', lists);
	    }, function() {}, 0, true);
	}
	uiApp.evt.on('module-business-list', 'searchBus', function () {
	    searchBus();
	});
	
	function search(cityId, type) {
	    if(!cityId) {
	        cityId = 0;
	    }
	    var businessData = uiApp.getModule('module-business-list'), businessDataList = businessData.get(), data;
	    Ajax.get('/city/getCirclesByCityId',{'cityId': cityId, 'cacheDisabled': 1}, function (data) {  
	        var data = data.data, lists = [], temp, m='', walkBusList = [], liftBusList=[], regionBusList= [];
	        data.forEach(function (item, i) {
	            temp = item.circleBounds.split(',');
	            if(temp[0]==500){
	                m = "徒步商圈";
	                walkBusList.push({
	                    circleId: item.circleId,
	                    circleName: item.circleName
	                });
	            }else if(temp[0]==1500) {
	                m = "生活商圈";
	                liftBusList.push({
	                    circleId: item.circleId,
	                    circleName: item.circleName
	                });
	            }else{
	                m = "地域商圈";
	                regionBusList.push({
	                    circleId: item.circleId,
	                    circleName: item.circleName
	                });
	            }
	            lists.push({
	                circleId: item.circleId,
	                circleName: item.circleName,
	                longitude: temp[1],
	                latitude: temp[2],
	                type: m,
	                radius: temp[0]
	            });
	        });
	        businessData.set('walkBusList', walkBusList);
	        businessData.set('liftBusList', liftBusList);
	        businessData.set('regionBusList', regionBusList);
	        businessData.set('businessList', lists);
	        if(type==1){
	            var businessDataList1 = businessData.get(), BusinessForm;
	            BusinessForm = businessDataList1.BusinessForm;
	            BusinessForm.provinceId =businessDataList1.provinceId;
	            BusinessForm.cityId =businessDataList1.cityId;
	            BusinessForm.businessId ="";
	            // businessData.set('provinceOptions1', businessDataList1.provinceOptions);
	            // businessData.set('cityOptions1', businessDataList1.cityOptions);
	            businessData.set('BusinessForm', BusinessForm);
	            window.appComment.getArea(cityId, function (data) {
	                businessData.set('districtsOptions', data);
	            });
	        }
	         businessData.set('isopen',  [false, false, false]);//更新展开状态
	    }, function() {}, 0, true);
	}
	
	
	uiApp.evt.on('module-business-list', 'beforeMount', function () {
	    search();
	});
	
	uiApp.evt.on('module-business-list', 'editBus', function (next, circleId) {
	     var businessData = uiApp.getModule('module-business-list'),businessDataList;
	          businessDataList = businessData.get();   
	    businessData.set('status', 0);
	    Ajax.get('/city/getDetailByCircleId',{'circleId': circleId}, function (data) {  
	            var data = data.data, circleBounds = data.circleBounds.split(','), BusinessForm;
	            businessData.set('status', 1);
	            //格式化数据
	            BusinessForm =  {
	                    circleName: data.circleName,
	                    circleId: data.circleId,
	                    busFormId: parseInt(circleBounds[0]),
	                    position: [circleBounds[1], circleBounds[2]],
	                    districtList: data.districtList,
	                    provinceId: businessDataList.provinceId,
	                    cityId: businessDataList.cityId,
	                    businessId: "",
	                };
	            businessData.set('BusinessForm', BusinessForm);
	            next();
	    }, function() {}, 0, true)
	});
	
	uiApp.evt.on('module-business-list', 'search', function () {
	    var businessData = uiApp.getModule('module-business-list'),businessDataList;
	          businessDataList = businessData.get();
	    search(businessDataList.cityId, 1);    
	});
	
	//填加或者修改商圈
	uiApp.evt.on('module-business-list', 'saveBusiness', function (next, autoBound) {
	    var businessData = uiApp.getModule('module-business-list'),businessDataList;
	          businessDataList = businessData.get();
	    businessData.set('status', 0);
	    var circleBounds = "", params, BusinessForm = businessDataList.BusinessForm, districtList = [], temp ={};
	    circleBounds = BusinessForm.busFormId + "," + BusinessForm.position[0] + ","+BusinessForm.position[1];
	    BusinessForm.districtList.forEach(function (item) {
	        if(typeof item.relationId == 'undefined'){
	            temp = item;
	            if(parseInt(BusinessForm.circleId) > 0) {
	                temp.circleId = BusinessForm.circleId;
	            }
	            districtList.push(temp);
	        }
	    });
	    params = {
	            circleName : BusinessForm.circleName,
	            autoBound: autoBound,
	            circleBounds : circleBounds,
	            operator : window.appComment.token,
	            displayIndex : 1,
	            list : districtList,
	            cityId: businessDataList.cityId
	    };
	    if(BusinessForm.circleId !=""){
	        params.circleId = BusinessForm.circleId;
	    }
	    Ajax.postJson('/city/editCircle', params, function (data) {
	        if(parseInt(data.code) === 1 || parseInt(data.code) === 200) {
	            businessData.set('status', 1);
	        } else {
	            businessData.set('errorMsg', data.msg);
	        }
	        next();
	    }, 1, true);
	});
	
	//删除商圈
	uiApp.evt.on('module-business-list', 'delBus', function (next, circleId) {
	    var businessData = uiApp.getModule('module-business-list'),businessDataList;
	          businessDataList = businessData.get();
	    businessData.set('status', 0);
	    Ajax.postJson('/city/deleteCircle?circleId=' + parseInt(circleId) + '&cityId='+businessDataList.cityId + '&autoBound=1&editor=' + window.appComment.token,'', function (data) {
	        if(parseInt(data.code) === 1 || parseInt(data.code) === 200) {
	            businessData.set('status', 1);
	            search(businessDataList.cityId);
	        }
	        next();
	    }, 1, true);
	});
	
	//删除区县
	uiApp.evt.on('module-business-list', 'delArea', function (next, relationId) {
	    var businessData = uiApp.getModule('module-business-list'),businessDataList;
	          businessDataList = businessData.get();
	    businessData.set('status', 0);
	    Ajax.postJson('/city/deleteCircleRelation?relationId='+relationId+'&cityId='+businessDataList.cityId+'&autoBound=1&editor='+window.appComment.token, '', function (data) {
	        if(parseInt(data.code) === 1 || parseInt(data.code) === 200) {
	            businessData.set('status', 1);
	        }
	        next();
	    }, 1, true); 
	});

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var uiApp = window.uiAppComment;
	var Ajax =  __webpack_require__(2);
	
	//获取省份
	var districtData = uiApp.getModule('module-district-list');
	
	var cityCallback = function (data) {
	    districtData.set('cityOptions', data);
	    if(!!data[0]&&data[0].cityId){
	        var  districtForm = {
	          relationId: "",
	          provinceId: districtData.get().provinceId,
	          cityId: data[0].cityId,
	          businessId: "",
	          businessName: ""
	        };
	        districtData.set('cityId', data[0].cityId);
	        districtData.set('districtForm', districtForm);
	        search(data[0].cityId, 1, '', 1);
	    }
	}
	//获取省份
	window.appComment.getProvince(function(data) {
	    districtData.set('provinceOptions', data);
	    data[0].provinceId && districtData.set('provinceId', data[0].provinceId);
	}, function (data) {
	  cityCallback(data);
	  var cityId = data[0].cityId
	  // 获取区县
	  districtsoptionset(cityId)
	}, function (data) {
	    // districtData.set('districtsOptions', data);
	});
	
	
	//获取省份
	window.appComment.getProvinceEdit(function(data) {
	    districtData.set('provinceOptions1', data);
	    data[0].provinceId && districtData.set('provinceId', data[0].provinceId);
	}, function (data) {
	  districtData.set('cityOptions1', data);
	  var cityId = data[0].cityId
	  // 获取区县
	  districtsoptionset(cityId)
	}, function (data) {
	    // districtData.set('districtsOptions1', data);
	});
	
	
	//获取下属区县
	uiApp.evt.on('module-district-list', 'getArea', function (next, cityId) {
	   var cityId = typeof cityId =='undefined' ? districtData.districtForm.cityId:  cityId;
	   //  获取区县原位置
	   districtsoptionset(cityId)
	});
	
	uiApp.evt.on('module-district-list', 'getCity', function (next, provinceId) {
	    var provinceId = typeof provinceId =='undefined' ? districtData.provinceId:  provinceId;
	    if(provinceId==""){
	      districtData.set('cityId', "");
	      districtData.set('cityOptions', []);
	      return;
	    }
	    window.appComment.getCity(provinceId, cityCallback); 
	});
	uiApp.evt.on('module-district-list', 'getCity1', function (next, provinceId) {
	    var provinceId = typeof provinceId =='undefined' ? districtData.districtForm.provinceId:  provinceId;
	    if(provinceId==""){
	        districtData.set('districtForm', {
	            relationId: "",
	            provinceId: "",
	            cityId: "",
	            businessId: "",
	            businessName: ""
	        });
	        return;
	    }   
	    window.appComment.getCityEdit(provinceId, function (data) {
	        var districtData = uiApp.getModule('module-district-list'),districtDataList, districtForm;
	        districtForm = districtData.get().districtForm;
	        districtData.set('cityOptions1', data);
	        if(data[0]){
	          districtForm.cityId = data[0].cityId;
	          districtData.set('districtForm', districtForm);
	        }
	
	        var cityId = data[0].cityId
	        // 获取区县
	        districtsoptionset(cityId)
	
	    }, function (data) {
	          // districtForm = districtData.get().districtForm;
	          // districtForm.businessId = "";
	          // districtData.set('districtsOptions1', data);
	          // districtData.set('districtForm', districtForm);
	    },1);
	
	});
	// 根据cityid查询县区
	function districtsoptionset(cityId){
	  if(cityId==""){
	          districtData.set('districtForm', {
	                relationId: "",
	                provinceId: districtData.get().districtForm.provinceId,
	                cityId: "",
	                businessId: "",
	                businessName: ""
	            });
	            return;        
	        }
	        window.appComment.getArea(cityId, function (data) {
	            var districtForm = districtData.get().districtForm;
	            districtForm.businessId = "";
	            districtData.set('districtsOptions1', data);
	             districtData.set('districtForm', districtForm);
	        });
	}
	//搜索
	function search(cityId, page, vdistrictName, type) {
	      var districtData = uiApp.getModule('module-district-list'),districtDataList;
	           districtDataList = districtData.get();
	    if(!cityId) {
	        cityId = 0;
	    }
	    if(typeof page == 'undefined') {
	        page = districtDataList.curPage;
	    }
	   params = {
	        cityId: cityId,
	        page: page,
	        count: districtDataList.pageSize
	   }
	   if(typeof vdistrictName != 'undefined' && vdistrictName !=""){
	        params.vdistrictName = vdistrictName;
	   }
	   Ajax.get('/city/getVdistrictByCityId',params, function (data) {  
	        var data = data.data, districtDataList2 = districtData.get(), districtForm, list = data.list, list2 = [], temp;
	        list2 = window.appComment.deepClone(list);
	        districtData.set('districtTotalList', list);
	        districtData.set('districtTotalList1', list2);
	        districtData.set('total', parseInt(data.totalCount));
	        if(type == 1){
	            districtForm = districtDataList2.districtForm;
	            districtForm.provinceId =districtDataList2.provinceId;
	            districtForm.cityId =districtDataList2.cityId;
	            districtForm.businessId ="";
	            // districtData.set('provinceOptions1', districtDataList2.provinceOptions);
	            // districtData.set('cityOptions1',  districtDataList2.cityOptions);
	            districtData.set('districtForm', districtForm);
	            window.appComment.getArea(cityId, function (data) {
	                districtData.set('districtsOptions', data);
	                districtData.set('districtsOptions1', data);
	            });
	        }
	   }, function() {}, 0, true);
	}
	
	uiApp.evt.on('module-district-list', 'beforeMount', function () {
	    search();
	});
	
	uiApp.evt.on('module-district-list', 'search', function (next, page) {
	    var districtData = uiApp.getModule('module-district-list'),districtDataList;
	        districtDataList = districtData.get();
	    search(districtDataList.cityId, page, districtDataList.searchDistrictName, 1);
	});
	
	//删除虚拟区县相关
	uiApp.evt.on('module-district-list', 'delSecDistrict', function (next, relationId, index) {
	      var districtData = uiApp.getModule('module-district-list'),districtDataList;
	           districtDataList = districtData.get();
	      districtData.set('status', 0);
	     Ajax.postJson('/city/deleteVdistrictRelation?relationId='+parseInt(relationId)+'&cityId='+districtDataList.cityId+'&editor='+window.appComment.token,'', function (data) {
	        if(parseInt(data.code) === 1 || parseInt(data.code) === 200) {
	            districtData.set('status', 1);
	            search(districtDataList.cityId, districtDataList.curPage, districtDataList.searchDistrictName);
	        }
	        next();       
	     }, 1, true);      
	});
	//获取城市
	uiApp.evt.on('module-district-list', 'getDisArea', function (next, districtId) {
	      var districtData = uiApp.getModule('module-district-list'),districtDataList;
	           districtDataList = districtData.get();
	
	   Ajax.get('/city/getGeoInfoByDistrictId',{'districtId': districtId}, function (data) {
	      var districtForm, data = data.data, cityId, provinceId;
	      cityId = data.cityId;
	      provinceId = data.provinceId;
	      districtForm = districtDataList.districtForm;
	      districtForm.provinceId = provinceId;
	      districtForm.cityId = cityId;
	      districtForm.businessId = "";
	      districtData.set('districtForm', districtForm);
	      window.appComment.getCityEdit(provinceId, function (data) {
	            districtData.set('cityOptions1', data);
	      });
	      window.appComment.getArea(cityId, function (data) {
	          districtForm = districtDataList.districtForm;
	          districtForm.businessId = districtId;
	          districtData.set('districtsOptions1', data);
	          districtData.set('districtForm', districtForm);
	      }); 
	   }, function() {}, 3, false);
	     
	});
	
	//删除虚拟区县
	uiApp.evt.on('module-district-list', 'delDistrict', function (next, virtualDistrictId) {
	      var districtData = uiApp.getModule('module-district-list'),districtDataList;
	           districtDataList = districtData.get();
	      districtData.set('status', 0);
	     Ajax.postJson('/city/deleteVdistrict?virtualDistrictId='+parseInt(virtualDistrictId)+'&cityId='+districtDataList.cityId+'&editor='+window.appComment.token,'', function (data) {
	        if(parseInt(data.code) === 1 || parseInt(data.code) === 200) {
	            districtData.set('status', 1);
	            search(districtDataList.cityId, districtDataList.curPage, districtDataList.searchDistrictName);
	        }
	        next();       
	     }, 1, true); 
	});
	
	
	
	//填加虚拟区县
	uiApp.evt.on('module-district-list', 'saveDistrict', function (next) {
	      var districtData = uiApp.getModule('module-district-list'),districtDataList;
	           districtDataList = districtData.get();
	      var districtList = districtDataList.districtList, virtualDistrictId = districtDataList.districtTotalFrom.virtualDistrictId;
	      params = {
	          virtualDistrictName : districtDataList.districtTotalFrom.districtName,
	          cityId : districtDataList.cityId,
	          operator : window.appComment.token,
	          displayIndex : districtDataList.districtTotalFrom.districtOrder
	      };
	      if(virtualDistrictId !==""){
	          params.virtualDistrictId = virtualDistrictId;
	          var length = districtList.length;
	          districtList.forEach(function(item, index){
	              item.virtualDistrictId = virtualDistrictId;
	              item.displayIndex = length - index;
	          });
	      }
	      params.list =  districtList;
	     Ajax.postJson('/city/editVdistrict',params, function (data) {
	        if(parseInt(data.code) === 1 || parseInt(data.code) === 200) {
	            districtData.set('status', 1);
	            search(districtDataList.cityId, districtDataList.curPage, districtDataList.searchDistrictName);
	        } else {
	            districtData.set('status', 0);
	            districtData.set('errorMsg', data.msg);
	        }
	        next();
	     }, 1, true);
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var uiApp = window.uiAppComment;
	var Ajax =  __webpack_require__(2);
	
	//获取省份
	var subwayData = uiApp.getModule('module-subway-list');
	
	//获取省份
	window.appComment.getProvince(function(data) {
	    subwayData.set('provinceOptions', data);
	    data[0].provinceId && subwayData.set('provinceId', data[0].provinceId);
	}, function (data) {
	     subwayData.set('cityOptions', data);
	     data[0].cityId && subwayData.set('cityId', data[0].cityId);
	     subwayData.set('position', [data[0].geoLng, data[0].geoLat]);  
	     search(data[0].cityId, 1);   
	});
	
	uiApp.evt.on('module-subway-list', 'getCity', function (next, provinceId) {
	    var provinceId = typeof provinceId =='undefined' ? subwayData.get().provinceId:  provinceId;
	    if(provinceId==""){
	        subwayData.set('cityId', "");
	        subwayData.set('cityOptions', []);
	        return;
	    }
	     window.appComment.getCity(provinceId, function (data) {
	         subwayData.set('cityOptions', data);
	         data[0].cityId && subwayData.set('cityId', data[0].cityId);
	         subwayData.set('position', [data[0].geoLng, data[0].geoLat]); 
	     });
	});
	
	//搜索
	function search(cityId, page, subwayName) {
	      var subwayData = uiApp.getModule('module-subway-list'),subwayDataList;
	            subwayDataList = subwayData.get();
	    if(!cityId) {
	        cityId = 0;
	    }
	    if(typeof page == 'undefined') {
	        page = subwayDataList.curPage;
	    }
	   params = {
	        cityId: cityId,
	        page: page,
	        count: subwayDataList.pageSize
	   }
	   if(typeof subwayName != 'undefined' && subwayName !=""){
	        params.subwayName = subwayName;
	   }
	   Ajax.get('/city/getSubwayInfo',params, function (data) {  
	        var data = data.data;
	        subwayData.set('subwayLists', data.list);
	        subwayData.set('total', parseInt(data.totalCount));
	        subwayData.set('curPage', page);
	        var subwayId = subwayDataList.subwayTotalForm.subwayId;
	        if(subwayId !=""){
	            var subSecList = [];
	            data.list.forEach(function (item, index) {
	              if(item.subwayId==subwayId){
	                  subSecList = window.appComment.deepClone(item.subwayRelationList);
	                  return;
	              }
	            });
	          subwayData.set('subwayList', subSecList);           
	        }
	   }, function() {}, 0, true);
	  Ajax.get('/city/getSubwayInfo',{cityId: cityId}, function (data) {
	        var list = data.data.list, subwaySelecLists = [], subwayRelationList = [];
	        subwaySelecLists = list;
	        subwayData.set('subwaySelecLists', subwaySelecLists);
	   }, function() {}, 0, true);
	}
	
	uiApp.evt.on('module-subway-list', 'beforeMount', function () {
	    search();
	});
	
	uiApp.evt.on('module-subway-list', 'search', function (next, page) {
	      var subwayData = uiApp.getModule('module-subway-list'),subwayDataList;
	            subwayDataList = subwayData.get();
	    search(subwayDataList.cityId, page, subwayDataList.subwayName);
	});
	
	uiApp.evt.on('module-subway-list', 'getSelectSubway', function (next, page) {
	      var subwayData = uiApp.getModule('module-subway-list'),subwayDataList;
	            subwayDataList = subwayData.get();
	  Ajax.get('/city/getSubwayInfo',{cityId: subwayDataList.cityId}, function (data) {
	        var list = data.data.list, subwaySelecLists = [], subwayRelationList = [];
	        subwaySelecLists = list;
	        if(list.length >0){
	            list[0].subwayRelationList.length > 0 ? subwayRelationList = list[0].subwayRelationList : "";
	        }
	        subwayData.set('subwaySelecLists', subwaySelecLists);
	        subwayData.set('selecStationList', subwayRelationList);
	   }, function() {}, 0, true);
	});
	
	
	//删除站点
	uiApp.evt.on('module-subway-list', 'delSecSubway', function (next, relationId, index) {
	      var subwayData = uiApp.getModule('module-subway-list'),subwayDataList;
	            subwayDataList = subwayData.get();
	      subwayData.set('status', 0);
	     Ajax.postJson('/city/deleteSubwayRelation?relationId='+parseInt(relationId)+'&cityId='+parseInt(subwayDataList.cityId)+'&editor='+window.appComment.token,'', function (data) {
	        if(parseInt(data.code) === 1 || parseInt(data.code) === 200) {
	            subwayData.set('status', 1);
	            search(subwayDataList.cityId, subwayDataList.curPage, subwayDataList.subwayName);
	        }
	        next();
	     }, 1, true);    
	
	});
	
	//删除地铁线
	uiApp.evt.on('module-subway-list', 'delSubway', function (next, subwayId) {
	      var subwayData = uiApp.getModule('module-subway-list'),subwayDataList;
	            subwayDataList = subwayData.get();
	      subwayData.set('status', 0);
	     Ajax.postJson('/city/deleteSubwayLine?subwayId='+parseInt(subwayId) + '&cityId='+subwayDataList.cityId+'&editor='+window.appComment.token,'', function (data) {
	        if(parseInt(data.code) === 1 || parseInt(data.code) === 200) {
	            subwayData.set('status', 1);
	            search(subwayDataList.cityId, subwayDataList.curPage, subwayDataList.subwayName);
	        }
	        next();
	     }, 1, true);    
	});
	
	//修改地铁
	uiApp.evt.on('module-subway-list', 'saveSubway', function (next) {
	      var subwayData = uiApp.getModule('module-subway-list'),subwayDataList;
	            subwayDataList = subwayData.get(), subwayTotalForm = subwayDataList.subwayTotalForm;
	      subwayData.set('status', 0);
	      var list = [], length = subwayDataList.subwayList.length,
	      params = {
	                          operator : window.appComment.token,
	                          list : [],
	                          subwayName : subwayTotalForm.subwayName
	                      }; 
	      if(subwayTotalForm.subwayId !=""){
	          params.subwayId = subwayTotalForm.subwayId;
	          subwayDataList.subwayList.forEach(function (item, index) {
	              list.push({
	                  relationId: item.relationId,
	                  displayIndex: length - index
	              });
	          });
	      }else{
	          var provinceCode, cityList;
	          subwayDataList.provinceOptions.forEach(function (item) {
	              if(item.provinceId==subwayDataList.provinceId){
	                  provinceCode = item.adcode;
	              }
	          });
	          subwayDataList.cityOptions.forEach(function (item) {
	              if(item.cityId==subwayDataList.cityId){
	                  cityList = item;
	              }
	          });
	        subwayDataList.subwayList.forEach(function (item, index) {
	              list.push({
	                  stationId: item.stationId,
	                  displayIndex: length - index
	              });
	          });
	          params.provinceCode = provinceCode;
	          params.displayIndex = 0;
	          params.cityId = subwayDataList.cityId;
	          params.cityCode = cityList.adcode;
	          params.cityName = cityList.cityName;
	      }
	      params.list = list;
	     Ajax.postJson('/city/editSubwaySort', params, function (data) {
	        if(parseInt(data.code) === 1 || parseInt(data.code) === 200) {
	            subwayData.set('status', 1);
	            search(subwayDataList.cityId, subwayDataList.curPage, subwayDataList.subwayName);
	        }
	        next();
	     }, 1, true);
	});
	
	//获取关联线路
	uiApp.evt.on('module-subway-list', 'getRelationStation', function (next, stationId) {
	    var subwayData = uiApp.getModule('module-subway-list'),subwayDataList;
	            subwayDataList = subwayData.get();
	    subwayData.set('status', 0);
	    Ajax.get('/city/getRelationByStationId',{'stationId': stationId}, function (data) {
	        var list = data.data, relationStationList = [];
	        list.forEach(function (item, index) {
	          if(item.subwayId != subwayDataList.subwayTotalForm.subwayId){
	              relationStationList.push(item);
	          }
	        });
	        subwayData.set('relationStationList', relationStationList);
	        subwayData.set('status', 1);
	        next();
	     }, function() {}, 0, true);
	})
	
	//填加站点
	uiApp.evt.on('module-subway-list', 'saveSecSubway', function (next) {
	    var subwayData = uiApp.getModule('module-subway-list'),subwayDataList;
	    subwayDataList = subwayData.get(), 
	    subwayTotalForm = subwayDataList.subwayTotalForm, 
	    subwayForm = subwayDataList.subwayForm;
	    subwayData.set('status', 0);
	   var provinceCode, cityList;
	    subwayDataList.provinceOptions.forEach(function (item) {
	        if(item.provinceId==subwayDataList.provinceId){
	            provinceCode = item.adcode;
	        }
	    });
	    subwayDataList.cityOptions.forEach(function (item) {
	        if(item.cityId==subwayDataList.cityId){
	            cityList = item;
	        }
	    });
	    var params = {
	                operator : window.appComment.token,
	                cityId : subwayDataList.cityId,
	                provinceCode : provinceCode,
	                cityCode : cityList.adcode,
	                cityName : cityList.cityName,
	                stationName : subwayForm.subwayName,
	                stationLng : subwayForm.position[0],
	                stationLat : subwayForm.position[1]
	        };
	        subwayTotalForm.subwayId !="" ? params.subwayId = subwayTotalForm.subwayId : "";
	        subwayForm.stationId !="" ? params.stationId = subwayForm.stationId : "";
	        subwayForm.relationId !="" ? params.relationId = subwayForm.relationId : "";
	
	    Ajax.postJson('/city/editSubwayStation', params, function (data) {
	        if(parseInt(data.code) === 1 || parseInt(data.code) === 200) {
	            subwayData.set('status', 1);
	            if(subwayTotalForm.subwayId !=""){
	                search(subwayDataList.cityId, subwayDataList.curPage, subwayDataList.subwayName);
	            }else{
	                var subwayList = subwayDataList.subwayList;
	                if(subwayDataList.editSecIndex===""){
	                    subwayList.push({
	                      displayIndex: 0,
	                      stationId: data.data,
	                      stationName: subwayForm.subwayName,
	                      stationLat: subwayForm.position[1],
	                      stationLng:  subwayForm.position[0]
	                    });
	                }else{
	                  subwayList.forEach(function (item, index) {
	                      if(subwayDataList.editSecIndex==index){
	                          item.stationName = subwayForm.subwayName;
	                          subwayForm.stationId !=="" ? item.stationId = subwayForm.stationId : "";
	                          item.stationLat = subwayForm.position[1];
	                          item.stationLng = subwayForm.position[0];
	                      }
	                  });
	                }
	            }
	            subwayData.set('subwayList', subwayList);
	        }
	        next();
	    }, 1, true);   
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var uiApp = window.uiAppComment;
	var Ajax =  __webpack_require__(2);
	var enumData =  __webpack_require__(19);
	
	var ratingData = uiApp.getModule('module-loupan-rating');
	ratingData.set('loupanGradeOptions', enumData.loupanGrade);
	ratingData.set('loupanLocalLevelOptions', enumData.loupanLocalLevel);
	ratingData.set('loupanSaleStatusOptions', enumData.loupanSaleStatus);
	ratingData.set('loupanRatingIdentityOptions', enumData.loupanRatingIdentity);
	
	//获取省份
	window.appComment.getProvince(function(data) {
	    ratingData.set('provinceOptions', data);
	    data[0].provinceId && ratingData.set('provinceId', data[0].provinceId);
	}, function (data) {
	    ratingData.set('cityOptions', data);
	    data[0].cityId && ratingData.set('cityId', data[0].cityId);
	    ratingData.set('cityName', data[0].cityName);      
	}, function (data) {
	    ratingData.set('areaOptions', data);
	    //setWorkCity(ratingData.get().cityId);
	});
	
	uiApp.evt.on('module-loupan-rating', 'getCity', function (next, provinceId) {
	    var provinceId = typeof provinceId =='undefined' ? ratingData.get().provinceId:  provinceId;
	    if(provinceId==""){
	        ratingData.set('cityId', "");
	        ratingData.set('cityOptions', []);
	        return;
	    }
	     window.appComment.getCity(provinceId, function (data) {
	         ratingData.set('cityOptions', data);
	         data[0].cityId && ratingData.set('cityId', data[0].cityId);
	         ratingData.set('cityName', data[0].cityName); 
	     }, function (data) {
	        data[0].vDistrictId && ratingData.set('vDistrictId', data[0].vDistrictId);
	        ratingData.set('areaOptions', data);
	    });
	});
	
	uiApp.evt.on('module-loupan-rating', 'chooseCity', function (next, cityId) {
	    // var provinceId = typeof provinceId =='undefined' ? ratingData.get().provinceId:  provinceId;
	    // if(provinceId==""){
	    //     ratingData.set('cityId', "");
	    //     ratingData.set('cityOptions', []);
	    //     return;
	    // }
	     var ratingData = uiApp.getModule('module-loupan-rating'),ratingDataList;
	        ratingDataList = ratingData.get();
	     window.appComment.getVirtualArea(cityId, function (data) {
	        data[0].vDistrictId && ratingData.set('vDistrictId', data[0].vDistrictId);
	        ratingData.set('areaOptions', data);
	    });
	});
	
	uiApp.evt.on('module-loupan-rating', 'setWorkCity', function (next, cityId) {
	    setWorkCity(cityId);
	});
	
	//选择工作城市
	function setWorkCity(cityId) {
	    var ratingData = uiApp.getModule('module-loupan-rating'),ratingDataList;
	        ratingDataList = ratingData.get();
	    if(typeof cityId == 'undefined') {
	        cityId = 1;
	    }
	    params = {
	        cityId: cityId
	    }
	    //debugger;
	    Ajax.get('/admin/grade/getCityGradeStats',params,function (data) { 
	        var data = data.data;
	        ratingData.set('cityRatingData', [data]);
	        search(cityId);
	    }, function () {}, 2);
	}
	
	//搜索
	function search(cityId, grade, vDistrictId, projName, localLevel, saleStatus, pid, pageNo, pageSize) {
	    var ratingData = uiApp.getModule('module-loupan-rating'),ratingDataList;
	            ratingDataList = ratingData.get();
	
	    //debugger;
	    if(typeof cityId == 'undefined') {
	        cityId = ratingDataList.cityId;
	    }
	    if(typeof grade == 'undefined') {
	        grade = ratingDataList.gradeId;
	    }
	    if(typeof vDistrictId == 'undefined') {
	        vDistrictId = ratingDataList.areaId;
	    }
	    if(typeof projName == 'undefined') {
	        projName = ratingDataList.projectName;
	    }
	    if(typeof localLevel == 'undefined') {
	        localLevel = ratingDataList.localId;
	    }
	    if(typeof saleStatus == 'undefined') {
	        saleStatus = ratingDataList.saleStatusId;
	    }
	    if(typeof pid == 'undefined') {
	        pid = ratingDataList.projectId;
	    }
	    if(typeof pageNo == 'undefined') {
	        ratingDataList.curPage = ratingDataList.curPage2;
	        pageNo = ratingDataList.curPage - 1;
	    }
	    if(typeof pageSize == 'undefined') {
	        pageSize = ratingDataList.pageSize;
	    }
	    //debugger;
	    params = {
	        cityId: cityId,
	        grade: grade,
	        vDistrictId: vDistrictId,
	        projName: projName,
	        localLevel: localLevel,
	        saleStatus: saleStatus,
	        pid: pid,
	        pageNo: pageNo,
	        pageSize: pageSize
	    }
	    Ajax.get('/search/getGradedProjList',params, function (data) {  
	        var data = data.data;
	
	        ratingData.set('gradeProjectList', formatData(data.content));
	        ratingData.set('totalNum', parseInt(data.totalElements));
	        // subwayData.set('curPage', page);
	        // var subwayId = subwayDataList.subwayTotalForm.subwayId;
	        // if(subwayId !=""){
	        //     var subSecList = [];
	        //     data.list.forEach(function (item, index) {
	        //       if(item.subwayId==subwayId){
	        //           subSecList = window.appComment.deepClone(item.subwayRelationList);
	        //           return;
	        //       }
	        //     });
	        //   subwayData.set('subwayList', subSecList);           
	        // }
	    }, function () {}, 1, true);
	}
	
	function formatData(data) {
	    data.forEach( function(item) {
	        item.grade2 = getValueByKey(item.grade, enumData.loupanGrade);
	        item.saleStatus = getValueByKey(item.saleStatus, enumData.loupanSaleStatus);
	        //item.gradeTime = gradeTime.format
	        if (item.gradeTime)
	        item.gradeTime = dateFormat(new Date(parseInt(item.gradeTime)), 'yyyy-MM-dd hh:mm:ss');
	    });
	
	    return data;
	}
	
	function dateFormat(date, str) {
	    //debugger;
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
	}
	
	function getValueByKey(key, arr) {
	    var value = "";
	    arr.forEach( function(item, index) {
	        if (item.key == key) {
	            value = item.value;
	        }
	    });
	
	    return value;
	}
	
	uiApp.evt.on('module-subway-list', 'beforeMount', function () {
	    search();
	});
	
	uiApp.evt.on('module-loupan-rating', 'search', function (next, cityId, pidstr) {
	    search();
	});
	
	// uiApp.evt.on('module-subway-list', 'search', function (next, page) {
	//       var subwayData = uiApp.getModule('module-subway-list'),subwayDataList;
	//             subwayDataList = subwayData.get();
	//     search(subwayDataList.cityId, page, subwayDataList.subwayName);
	// });
	
	// uiApp.evt.on('module-subway-list', 'getSelectSubway', function (next, page) {
	//       var subwayData = uiApp.getModule('module-subway-list'),subwayDataList;
	//             subwayDataList = subwayData.get();
	//   Ajax.get('/city/getSubwayInfo',{cityId: subwayDataList.cityId}, function (data) {
	//         var list = data.data.list, subwaySelecLists = [], subwayRelationList = [];
	//         subwaySelecLists = list;
	//         if(list.length >0){
	//             list[0].subwayRelationList.length > 0 ? subwayRelationList = list[0].subwayRelationList : "";
	//         }
	//         subwayData.set('subwaySelecLists', subwaySelecLists);
	//         subwayData.set('selecStationList', subwayRelationList);
	//    });
	// });
	
	uiApp.evt.on('module-loupan-rating', 'handleCurrentChange', function (next, cityId) {
	    var ratingData = uiApp.getModule('module-loupan-rating'),ratingDataList;
	        ratingDataList = ratingData.get();
	    next();
	    search(ratingDataList.cityId);
	});
	
	uiApp.evt.on('module-loupan-rating', 'handleOptRating', function (next, row) {
	    var ratingData = uiApp.getModule('module-loupan-rating'),ratingDataList;
	        ratingDataList = ratingData.get();
	    // next();
	
	    var params = {
	        cityId : ratingDataList.cityId,
	        pid : row.pid
	    }
	
	    Ajax.get('/admin/grade/getProjGradeDetail',params,function (data) { 
	        var data = data && data.data || {};
	
	        //debugger;
	
	
	        var operationScore = data.operationScore || "";
	        var saleScore = data.saleScore || "";
	        var directSaleScore = data.directSaleScore || "";
	
	        var scores = {
	            operationScore : operationScore,
	            saleScore : saleScore,
	            directSaleScore : directSaleScore
	        }
	        
	        ratingData.set("curScores", scores);
	        next();
	    }, function () {}, 2);
	});
	
	// uiApp.evt.on('module-loupan-rating', 'commentPopupSubmit', function (next, cityId) {
	//     setWorkCity(cityId);
	// });
	function screenProject(cityId, pidstr) {
	    var ratingData = uiApp.getModule('module-loupan-rating'),ratingDataList;
	        ratingDataList = ratingData.get();
	    if(typeof cityId == 'undefined') {
	        cityId = ratingDataList.cityId;
	    }
	    if(typeof userId == 'undefined') {
	        userId = ratingDataList.userId;
	    }
	    params = {
	        cityId: cityId,
	        pidstr: pidstr,
	        userId: userId
	    }
	    //debugger;
	    Ajax.postJson('/search/shieldProjs',params,function (data) { 
	        var data = data.data;
	        //ratingData.set('cityRatingData', [data]);
	        search(cityId);
	    }, 1, true, 1);
	}
	
	function unScreenProject(cityId, pidstr) {
	    var ratingData = uiApp.getModule('module-loupan-rating'),ratingDataList;
	        ratingDataList = ratingData.get();
	    if(typeof cityId == 'undefined') {
	        cityId = ratingDataList.cityId;
	    }
	    if(typeof userId == 'undefined') {
	        userId = ratingDataList.userId;
	    }
	    params = {
	        cityId: cityId,
	        pidstr: pidstr,
	        userId: userId
	    }
	    //debugger;
	    Ajax.postJson('/search/unShieldProjs',params,function (data) { 
	        var data = data.data;
	        //ratingData.set('cityRatingData', [data]);
	        search(cityId);
	    }, 1, true, 1);
	}
	
	uiApp.evt.on('module-loupan-rating', 'handleOptScreen', function (next, row) {
	    var pidstr = row.pid;
	    var ratingData = uiApp.getModule('module-loupan-rating'),ratingDataList;
	        ratingDataList = ratingData.get();
	    var cityId = ratingDataList.cityId;
	    screenProject(cityId, pidstr);
	});
	
	uiApp.evt.on('module-loupan-rating', 'handleOptCancelScreen', function (next, row) {
	    var pidstr = row.pid;
	    var ratingData = uiApp.getModule('module-loupan-rating'),ratingDataList;
	        ratingDataList = ratingData.get();
	    var cityId = ratingDataList.cityId;
	    unScreenProject(cityId, pidstr);
	});
	
	uiApp.evt.on('module-loupan-rating', 'handleOptBatchScreen2', function (next, cityId, pidstr) {
	    //next();
	    screenProject(cityId, pidstr);
	});
	
	uiApp.evt.on('module-loupan-rating', 'handleOptBatchUnscreen2', function (next, cityId, pidstr) {
	    //next();
	    unScreenProject(cityId, pidstr);
	});
	
	uiApp.evt.on('module-loupan-rating', 'submitRating', function (next, row) {
	    var ratingData = uiApp.getModule('module-loupan-rating'),ratingDataList;
	        ratingDataList = ratingData.get();
	    // if(typeof cityId == 'undefined') {
	    //     cityId = ratingDataList.cityId;
	    // }
	    //debugger;
	    var cityId = parseInt(ratingDataList.cityId, 10);
	    var pid = parseInt(ratingDataList.curRow.pid, 10);
	    var userId = ratingDataList.userId;
	
	    var identity = ratingDataList.ratingIdentity;
	    var curRating = ratingDataList.curRating;
	    var operationScore = identity == "operationScore" ? curRating : null;
	    var saleScore = identity == "saleScore" ? curRating : null;
	    var directSaleScore = identity == "directSaleScore" ? curRating : null;
	
	    params = {
	        cityId: cityId,
	        pid: pid,
	        operationScore: operationScore,
	        saleScore: saleScore,
	        directSaleScore: directSaleScore,
	        userId: userId
	    }
	    //debugger;
	    Ajax.postJson('/search/submitScore',params,function (data) { 
	        var data = data.data;
	        //ratingData.set('cityRatingData', [data]);
	        search(cityId);
	        next();
	    }, 1, true, 1);
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var uiApp = window.uiAppComment;
	var Ajax =  __webpack_require__(2);
	var enumData =  __webpack_require__(19);
	
	var contactData = uiApp.getModule('module-city-contact');
	
	//获取省份
	window.appComment.getProvince(function(data) {
	    contactData.set('provinceOptions', data);
	    data[0].provinceId && contactData.set('provinceId', data[0].provinceId);
	}, function (data) {
	    contactData.set('cityOptions', data);
	    data[0].cityId && contactData.set('cityId', data[0].cityId);
	    contactData.set('cityName', data[0].cityName);      
	});
	
	uiApp.evt.on('module-city-contact', 'getCity', function (next, provinceId) {
	    var provinceId = typeof provinceId =='undefined' ? contactData.get().provinceId:  provinceId;
	    if(provinceId==""){
	        contactData.set('cityId', "");
	        contactData.set('cityOptions', []);
	        return;
	    }
	     window.appComment.getCity(provinceId, function (data) {
	         contactData.set('cityOptions', data);
	         data[0].cityId && contactData.set('cityId', data[0].cityId);
	         contactData.set('cityName', data[0].cityName); 
	     });
	});
	
	uiApp.evt.on('module-loupan-rating', 'chooseCity', function (next, cityId) {
	     var ratingData = uiApp.getModule('module-loupan-rating'),ratingDataList;
	        ratingDataList = ratingData.get();
	     window.appComment.getVirtualArea(cityId, function (data) {
	        data[0].vDistrictId && ratingData.set('vDistrictId', data[0].vDistrictId);
	        ratingData.set('areaOptions', data);
	    });
	});
	
	uiApp.evt.on('module-city-contact', 'setWorkCity', function (next, cityId) {
	    setWorkCity(cityId);
	    next();
	});
	
	//选择工作城市
	function setWorkCity(cityId) {
	    var contactData = uiApp.getModule('module-city-contact'),contactDataList;
	        contactDataList = contactData.get();
	    if(typeof cityId == 'undefined') {
	        cityId = 1;
	    }
	    params = {
	        cityId: cityId
	    }
	    //debugger;
	    Ajax.get('/city/getContactPerson',params,function (data) { 
	        var data = data.data;
	        contactData.set("basicForm", transformForm(data));
	        //next();
	        contactDataList.basicForm;
	    }, function() {}, 0, true);
	}
	
	function transformForm(data) {
	    //debugger;
	    var newForm = {};
	    newForm.aijiaTel = data.hotlinePhone;
	    var hotline = data.hotlinePhone.split('-');
	    newForm.aijiaTel1 = hotline[0];
	    newForm.aijiaTel2 = hotline[1];
	    newForm.aijiaTel3 = hotline[2]; 
	    var d = new Date(parseInt(data.beginWorkingHours,10));
	    newForm.startTime1 = dateFormat(data.beginWorkingHours ,true);
	    newForm.startTime = parseHour(d.getHours());
	    var d2 = new Date(parseInt(data.endWorkingHours,10));
	    newForm.endTime1 = dateFormat(data.endWorkingHours, true);
	    newForm.endTime = parseHour(d2.getHours());
	    newForm.email = data.contactMail;
	    newForm.contactName = data.contactName;
	    newForm.weibo = data.weiboLink;
	    newForm.blame = data.complaintsLink;
	    newForm.blameTel = data.contactPhone;
	    var blameTel = data.contactPhone.split('-');  
	    newForm.blameTel1 = blameTel[0];
	    newForm.blameTel2 = blameTel[1];
	    newForm.id = parseInt(data.id, 10);
	    newForm.blameEmail = data.email;
	
	    return newForm;
	}
	
	function formatTime(time) {
	    var returnTime = "";
	    returnTime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate()
	                 + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
	}
	
	function dateFormat(dateString, isDetail) {
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
	
	function parseHour(hour) {
	    if (hour < 12) hour = '0' + hour;
	    hour = hour + ':' + "00";
	    return hour;
	}
	
	function reverseParseHour(hour, time) {
	    //debugger;
	
	    hour = hour + ':' + '00';
	
	    time = time.split(' ')[0];
	    //debugger;
	
	    var newTime = (new Date(time + ' ' + hour)).getTime();
	    return  newTime;
	}
	
	
	uiApp.evt.on('module-city-contact', 'handleSave2', function (next, that) {
	    var contactData = uiApp.getModule('module-city-contact'),contactDataList;
	        contactDataList = contactData.get();
	    var id = contactDataList.basicForm.id;
	    var cityId = parseInt(contactDataList.cityId, 10);
	    var hotlinePhone = contactDataList.basicForm.aijiaTel1 + '-' + contactDataList.basicForm.aijiaTel2
	        + '-' + contactDataList.basicForm.aijiaTel3;
	    
	
	    var contactMail = contactDataList.basicForm.email;
	    var beginWorkingHours = reverseParseHour(contactDataList.basicForm.startTime, contactDataList.basicForm.startTime1);
	    var endWorkingHours = reverseParseHour(contactDataList.basicForm.endTime, contactDataList.basicForm.endTime1);
	    var contactName = contactDataList.basicForm.contactName;
	    var email = contactDataList.basicForm.email;
	    var blameEmail = contactDataList.basicForm.blameEmail;
	    var contactPhone = contactDataList.basicForm.blameTel1 + '-' + contactDataList.basicForm.blameTel2;
	    var weiboLink = contactDataList.basicForm.weibo;
	    var complaintsLink = contactDataList.basicForm.blame;
	    var editor = contactDataList.userId;
	
	    params = {
	        id: id,
	        cityId: cityId,
	        contactName: contactName,
	        contactPhone: contactPhone,
	        contactMail: contactMail,
	        hotlinePhone: hotlinePhone,
	        beginWorkingHours: beginWorkingHours,
	        endWorkingHours: endWorkingHours,
	        contactEmail: email,
	        weiboLink: weiboLink,
	        complaintsLink: complaintsLink,
	        editor: editor,
	        email: blameEmail
	    }
	    //debugger;
	    Ajax.postJson('/city/editContactPerson',params,function (data) { 
	        var data = data.data;
	        //ratingData.set('cityRatingData', [data]);
	        setWorkCity(cityId);
	        next();
	    }, 1, true, 0);
	});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var uiApp = window.uiAppComment;
	var Ajax = __webpack_require__(2);
	var enumData = __webpack_require__(19);
	
	var developerData = uiApp.getModule('module-developer-management');
	
	//获取省份
	window.appComment.getProvinceEdit(function(data) {
	    //debugger;
	    developerData.set('provinceOptions', data);
	    data[0].provinceId && developerData.set('provinceId', data[0].provinceId);
	}, function(data) {
	    //debugger;
	    developerData.set('cityOptions', data);
	    data[0].cityId && developerData.set('cityId', data[0].cityId);
	    search()
	});
	
	uiApp.evt.on('module-developer-management', 'getCity', function(next, provinceId) {
	    var provinceId = typeof provinceId == 'undefined' ? developerData.get().provinceId : provinceId;
	    if (provinceId == "") {
	        developerData.set('cityId', "");
	        developerData.set('cityOptions', []);
	        return;
	    }
	    window.appComment.getCityEdit(provinceId, function(data) {
	        //debugger;
	        developerData.set('cityOptions', data);
	        data[0].cityId && developerData.set('cityId', data[0].cityId);
	        //developerData.set('cityName', data[0].cityName);
	    });
	});
	
	uiApp.evt.on('module-developer-management', 'getCity2', function(next, provinceId) {
	    var provinceId = typeof provinceId == 'undefined' ? developerData.get().provinceId : provinceId;
	    if (provinceId == "") {
	        developerData.set('editForm.cityId2', "");
	        developerData.set('cityOptions2', []);
	        return;
	    }
	    //debugger;
	    window.appComment.getCityEdit(provinceId, function(data) {
	        //debugger;
	        developerData.set('cityOptions2', data);
	        //data[0].cityId && developerData.set('editForm.cityId2', data[0].cityId);
	        //developerData.set('cityName', data[0].cityName);
	        data[0].cityId && developerData.set('cityId3', data[0].cityId);
	        next();
	    });
	});
	
	
	uiApp.evt.on('module-loupan-rating', 'chooseCity', function(next, cityId) {
	    var ratingData = uiApp.getModule('module-loupan-rating'),
	        ratingDataList;
	    ratingDataList = ratingData.get();
	    window.appComment.getVirtualArea(cityId, function(data) {
	        data[0].vDistrictId && ratingData.set('vDistrictId', data[0].vDistrictId);
	        ratingData.set('areaOptions', data);
	    });
	});
	
	uiApp.evt.on('module-loupan-rating', 'setWorkCity', function(next, cityId) {
	    setWorkCity(cityId);
	});
	
	//选择工作城市
	function setWorkCity(cityId) {
	    var ratingData = uiApp.getModule('module-developer-management'),
	        ratingDataList;
	    ratingDataList = ratingData.get();
	    if (typeof cityId == 'undefined') {
	        cityId = 1;
	    }
	    params = {
	            cityId: cityId
	        }
	        //debugger;
	    Ajax.get('/admin/grade/getCityGradeStats', params, function(data) {
	        var data = data.data;
	        ratingData.set('cityRatingData', [data]);
	        search(cityId);
	    }, function() {}, 2);
	}
	
	//搜索
	function search(page, count, provinceId, cityId, name, projName, startTime, endTime, pid) {
	    var developerData = uiApp.getModule('module-developer-management'),
	        developerDataList;
	    developerDataList = developerData.get();
	
	    var params = {};
	
	    //debugger;
	    if (typeof page == 'undefined') {
	        developerDataList.curPage = developerDataList.curPage2;
	        page = developerDataList.curPage;
	        params['page'] = page;
	    } else {
	        params['page'] = page;
	    }
	
	    if (typeof count == 'undefined') {
	        count = developerDataList.pageSize;
	        params['count'] = count;
	    } else {
	        params['count'] = count;
	    }
	
	    if (typeof provinceId == 'undefined') {
	        if(provinceId = developerDataList.provinceId)
	        params['provinceId'] = provinceId;
	    } else {
	        params['provinceId'] = provinceId;
	    }
	
	    if (typeof cityId == 'undefined') {
	        if(cityId = developerDataList.cityId)
	        params['cityId'] = cityId;
	    } else {
	        params['cityId'] = cityId;
	    }
	
	    if (typeof name == 'undefined') {
	        if(name = developerDataList.developerName)
	        params['name'] = name;
	    } else {
	        params['name'] = name;
	    }
	
	    if (typeof projName == 'undefined') {
	        if(projName = developerDataList.projName)
	        params['projName'] = projName;
	    } else {
	        params['projName'] = projName;
	    }
	
	    if (typeof startTime == 'undefined') {
	        if(startTime = developerDataList.startTime)
	        params['startTime'] = startTime;
	    } else {
	        params['startTime'] = startTime;
	    }
	
	    if (typeof endTime == 'undefined') {
	        if(endTime = developerDataList.endTime)
	        params['endTime'] = endTime;
	    } else {
	        params['endTime'] = endTime;
	    }
	
	    if (typeof pid == 'undefined') {
	        if(pid = developerDataList.pid)
	        params['pid'] = pid;
	    } else {
	        params['pid'] = pid;
	    }
	    if(!params['cityId']){
	        params['cityId']=0;
	    }
	    Ajax.get('/companyAdmin/getKfsList', params, function(data) {
	        var data = data.data;
	        //debugger;
	        developerData.set('developerList', formatData(data.list));
	        developerData.set('totalNum', parseInt(data.totalCount));
	        developerData.set('curPage', page);
	    }, function() {}, 0, true);
	}
	
	function formatData(data) {
	    data.forEach(function(item) {
	        //item.grade2 = getValueByKey(item.grade, enumData.loupanGrade);
	        // var developerNameArray = [];
	        // item.projectNameList.forEach(function(item) {
	        //     developerNameArray.push(item.projName);
	        // });
	        // item.projectNameList = developerNameArray.join(',');
	        //item.gradeTime = gradeTime.format
	        //debugger;
	        if (item.updateTime)
	        item.updateTime = dateFormat(new Date(parseInt(item.updateTime)), 'yyyy-MM-dd');
	    });
	
	    return data;
	}
	
	function dateFormat(date, str) {
	    //debugger;
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
	}
	
	function getValueByKey(key, arr) {
	    var value = "";
	    arr.forEach(function(item, index) {
	        if (item.key == key) {
	            value = item.value;
	        }
	    });
	
	    return value;
	}
	
	uiApp.evt.on('module-developer-management', 'beforeMount', function() {
	    //debugger;
	    //search();
	});
	
	uiApp.evt.on('module-developer-management', 'search', function(next) {
	    //debugger;
	    next();
	    search();
	});
	
	uiApp.evt.on('module-developer-management', 'handleCurrentChange', function(next, cityId) {
	    var developerData = uiApp.getModule('module-developer-management'),
	        developerDataList;
	    developerDataList = developerData.get();
	    next();
	    search();
	});
	
	uiApp.evt.on('module-loupan-rating', 'handleOptRating', function(next, row) {
	    var ratingData = uiApp.getModule('module-loupan-rating'),
	        ratingDataList;
	    ratingDataList = ratingData.get();
	    // next();
	
	    var params = {
	        cityId: ratingDataList.cityId,
	        pid: row.pid
	    }
	
	    Ajax.get('/admin/grade/getProjGradeDetail', params, function(data) {
	        var data = data && data.data || {};
	
	        //debugger;
	
	
	        var operationScore = data.operationScore || "";
	        var saleScore = data.saleScore || "";
	        var directSaleScore = data.directSaleScore || "";
	
	        var scores = {
	            operationScore: operationScore,
	            saleScore: saleScore,
	            directSaleScore: directSaleScore
	        }
	
	        ratingData.set("curScores", scores);
	        next();
	    }, function() {}, 2);
	});
	
	// uiApp.evt.on('module-loupan-rating', 'commentPopupSubmit', function (next, cityId) {
	//     setWorkCity(cityId);
	// });
	function deleteDeveloper(developerId) {
	    var developerData = uiApp.getModule('module-developer-management'),
	        developerDataList;
	    developerDataList = developerData.get();
	    if (typeof cityId == 'undefined') {
	        cityId = developerDataList.cityId;
	    }
	    if (typeof userId == 'undefined') {
	        userId = developerDataList.userId;
	    }
	    //debugger;
	    params = {
	            list: developerId
	        }
	        //debugger;
	    Ajax.postJson('/companyAdmin/deleteKfs', params, function(data) {
	        var data = data.data;
	        //ratingData.set('cityRatingData', [data]);
	        search(0, 10);
	    }, 1, true, 0);
	}
	
	uiApp.evt.on('module-developer-management', 'handleDelete2', function(next, row) {
	    var developerData = uiApp.getModule('module-developer-management'),
	        developerDataList;
	    developerDataList = developerData.get();
	    var cityId = developerDataList.cityId;
	    //debugger;
	    var deleteDeveloperArray = [];
	    deleteDeveloperArray.push(row.developerId.toString())
	    deleteDeveloper(deleteDeveloperArray);
	});
	
	uiApp.evt.on('module-developer-management', 'handleOptBatchDelete2', function(next, developerArr) {
	    var developerData = uiApp.getModule('module-developer-management'),
	        developerDataList;
	
	    deleteDeveloper(developerArr);
	});
	
	uiApp.evt.on('module-developer-management', 'handleEdit', function(next, row) {
	    var developerData = uiApp.getModule('module-developer-management'),
	        developerDataList;
	        developerDataList = developerData.get();
	    //debugger;
	    window.appComment.getProvinceEdit(function(data) {
	        developerData.set('provinceOptions2', data);
	    });
	
	    window.appComment.getCityEdit(row.provinceId, function(data) {
	        developerData.set('cityOptions2', data);
	    });
	
	    var form = {
	        developerName: row.realestateDeveloperName,
	        cityId2: row.cityId,
	        provinceId2: row.provinceId,
	        realestateDeveloperIntro: row.realestateDeveloperIntro,
	    }
	    //debugger;
	
	    developerData.set("editForm", form);
	    developerData.set("developerId", row.developerId);
	    next();
	});
	
	uiApp.evt.on('module-developer-management', 'handleCreateNew', function(next) {
	    var developerData = uiApp.getModule('module-developer-management'),
	        developerDataList;
	    developerDataList = developerData.get();
	
	    window.appComment.getProvinceEdit(function(data) {
	        developerData.set('provinceOptions2', data);
	    });
	    //debugger;
	    var form = {
	        developerName: "",
	        cityId2: "",
	        provinceId2: "",
	        realestateDeveloperIntro: ""
	    }
	
	    developerData.set("editForm", form);
	    developerData.set("cityOptions2", "");
	    next();
	});
	
	uiApp.evt.on('module-loupan-rating', 'handleOptBatchScreen2', function(next, cityId, pidstr) {
	    //next();
	    screenProject(cityId, pidstr);
	});
	
	uiApp.evt.on('module-loupan-rating', 'handleOptBatchUnscreen2', function(next, cityId, pidstr) {
	    //next();
	    unScreenProject(cityId, pidstr);
	});
	
	uiApp.evt.on('module-developer-management', 'editSave2', function(next, editForm) {
	    var developerData = uiApp.getModule('module-developer-management'),
	        developerDataList;
	    developerDataList = developerData.get();
	    developerData.set("editStatus", 0);
	
	    var cityId = parseInt(developerDataList.cityId, 10);
	    var userId = developerDataList.userId;
	    //debugger;
	
	    params = {
	            cityId: editForm.cityId2,
	            realestateDeveloperName: editForm.developerName.toString(),
	            realestateDeveloperIntro: editForm.realestateDeveloperIntro.toString()
	        }
	
	    //debugger;
	    if(developerDataList.dialogTitle == "修改开发商") {
	        params['developerId'] = developerDataList.developerId;
	        params['editor'] = userId;
	    }
	
	    if(developerDataList.dialogTitle == "新增开发商") {
	        params['creator'] = userId;
	    }
	
	        //debugger;
	    Ajax.postJson('/companyAdmin/editKfs', params, function(data) {
	        debugger;
	        //var data = data.data;
	        if (data.code == 200) {
	            developerData.set("editStatus", 1);
	            search();
	        } else if (data.code == -11){
	            developerData.set("editStatus", 3);
	        }
	        next();
	        
	    }, 1, true, 0);
	});


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var uiApp = window.uiAppComment;
	var Ajax = __webpack_require__(2);
	var enumData = __webpack_require__(19);
	
	var developerData = uiApp.getModule('module-brand-management');
	
	
	
	//搜索
	function search(page, count, name, projName, startTime, endTime, pid) {
	    var developerData = uiApp.getModule('module-brand-management'),
	        developerDataList;
	    developerDataList = developerData.get();
	
	    var params = {};
	
	    //debugger;
	    if (typeof page == 'undefined') {
	        developerDataList.curPage = developerDataList.curPage2;
	        page = developerDataList.curPage;
	        params['page'] = page;
	    } else {
	        params['page'] = page;
	    }
	
	    if (typeof count == 'undefined') {
	        count = developerDataList.pageSize;
	        params['count'] = count;
	    } else {
	        params['count'] = count;
	    }
	    if (typeof name == 'undefined') {
	        if(name = developerDataList.developerName)
	        params['name'] = name;
	    } else {
	        params['name'] = name;
	    }
	
	    if (typeof projName == 'undefined') {
	        if(projName = developerDataList.projName)
	        params['projName'] = projName;
	    } else {
	        params['projName'] = projName;
	    }
	
	    if (typeof startTime == 'undefined') {
	        if(startTime = developerDataList.startTime)
	        params['startTime'] = startTime;
	    } else {
	        params['startTime'] = startTime;
	    }
	
	    if (typeof endTime == 'undefined') {
	        if(endTime = developerDataList.endTime)
	        params['endTime'] = endTime;
	    } else {
	        params['endTime'] = endTime;
	    }
	
	    if (typeof pid == 'undefined') {
	        if(pid = developerDataList.pid)
	        params['pid'] = pid;
	    } else {
	        params['pid'] = pid;
	    }
	
	    Ajax.get('/companyAdmin/getBrandList', params, function(data) {
	        var data = data.data;
	        //debugger;
	        developerData.set('developerList', formatData(data.list));
	        developerData.set('totalNum', parseInt(data.totalCount));
	        developerData.set('curPage', page);
	    }, function() {}, 0, true);
	}
	
	function formatData(data) {
	    data.forEach(function(item) {
	        //item.grade2 = getValueByKey(item.grade, enumData.loupanGrade);
	        // var developerNameArray = [];
	        // item.projectNameList.forEach(function(item) {
	        //     developerNameArray.push(item.projName);
	        // });
	        // item.projectNameList = developerNameArray.join(',');
	        //item.gradeTime = gradeTime.format
	        //debugger;
	        if (item.updateTime)
	        item.updateTime = dateFormat(new Date(parseInt(item.updateTime)), 'yyyy-MM-dd');
	    });
	
	    return data;
	}
	
	function dateFormat(date, str) {
	    //debugger;
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
	}
	
	function getValueByKey(key, arr) {
	    var value = "";
	    arr.forEach(function(item, index) {
	        if (item.key == key) {
	            value = item.value;
	        }
	    });
	
	    return value;
	}
	
	uiApp.evt.on('module-brand-management', 'beforeMount', function() {
	    //debugger;
	    search();
	});
	
	uiApp.evt.on('module-brand-management', 'search', function(next) {
	    //debugger;
	    next();
	    search();
	});
	
	uiApp.evt.on('module-brand-management', 'handleCurrentChange', function(next, cityId) {
	    var developerData = uiApp.getModule('module-brand-management'),
	        developerDataList;
	    developerDataList = developerData.get();
	    next();
	    search();
	});
	
	uiApp.evt.on('module-loupan-rating', 'handleOptRating', function(next, row) {
	    var ratingData = uiApp.getModule('module-loupan-rating'),
	        ratingDataList;
	    ratingDataList = ratingData.get();
	    // next();
	
	    var params = {
	        cityId: ratingDataList.cityId,
	        pid: row.pid
	    }
	
	    Ajax.get('/admin/grade/getProjGradeDetail', params, function(data) {
	        var data = data && data.data || {};
	
	        //debugger;
	
	
	        var operationScore = data.operationScore || "";
	        var saleScore = data.saleScore || "";
	        var directSaleScore = data.directSaleScore || "";
	
	        var scores = {
	            operationScore: operationScore,
	            saleScore: saleScore,
	            directSaleScore: directSaleScore
	        }
	
	        ratingData.set("curScores", scores);
	        next();
	    }, function() {}, 2);
	});
	
	// uiApp.evt.on('module-loupan-rating', 'commentPopupSubmit', function (next, cityId) {
	//     setWorkCity(cityId);
	// });
	function deleteDeveloper(developerId) {
	    var developerData = uiApp.getModule('module-brand-management'),
	        developerDataList;
	    developerDataList = developerData.get();
	    if (typeof userId == 'undefined') {
	        userId = developerDataList.userId;
	    }
	    //debugger;
	    params = {
	            list: developerId
	        }
	        //debugger;
	    Ajax.postJson('/companyAdmin/deleteBrand', params, function(data) {
	        var data = data.data;
	        //ratingData.set('cityRatingData', [data]);
	        search(0, 10);
	    }, 1, true, 0);
	}
	
	uiApp.evt.on('module-brand-management', 'handleDelete2', function(next, row) {
	    var developerData = uiApp.getModule('module-brand-management'),
	        developerDataList;
	    developerDataList = developerData.get();
	    var deleteDeveloperArray = [];
	    deleteDeveloperArray.push(row.brandId.toString())
	    console.log(deleteDeveloperArray);
	    deleteDeveloper(deleteDeveloperArray);
	});
	
	uiApp.evt.on('module-brand-management', 'handleOptBatchDelete2', function(next, developerArr) {
	    var developerData = uiApp.getModule('module-brand-management'),
	        developerDataList;
	
	    deleteDeveloper(developerArr);
	});
	
	uiApp.evt.on('module-brand-management', 'handleEdit', function(next, row) {
	    var developerData = uiApp.getModule('module-brand-management'),
	        developerDataList;
	        developerDataList = developerData.get();
	    var form = {
	        brandName: row.brandName,
	        brandIntro: row.brandIntro
	    }
	    //debugger;
	
	    developerData.set("editForm", form);
	    developerData.set("brandId", row.brandId);
	    next();
	});
	
	uiApp.evt.on('module-brand-management', 'handleCreateNew', function(next) {
	    var developerData = uiApp.getModule('module-brand-management'),
	        developerDataList;
	    developerDataList = developerData.get();
	
	    var form = {
	        brandName: "",
	        brandIntro: ""
	    }
	
	    developerData.set("editForm", form);
	    next();
	});
	
	uiApp.evt.on('module-loupan-rating', 'handleOptBatchScreen2', function(next, cityId, pidstr) {
	    //next();
	    screenProject(cityId, pidstr);
	});
	
	uiApp.evt.on('module-loupan-rating', 'handleOptBatchUnscreen2', function(next, cityId, pidstr) {
	    //next();
	    unScreenProject(cityId, pidstr);
	});
	
	uiApp.evt.on('module-brand-management', 'editSave2', function(next, editForm) {
	    var developerData = uiApp.getModule('module-brand-management'),
	        developerDataList;
	    developerDataList = developerData.get();
	    developerData.set("editStatus", 0);
	
	    var userId = developerDataList.userId;
	
	    params = {
	            brandName: editForm.brandName.toString(),
	            brandIntro: editForm.brandIntro.toString()
	        }
	
	    //debugger;
	    if(developerDataList.dialogTitle == "修改品牌商") {
	        params['brandId'] = developerDataList.brandId;
	        params['editor'] = userId;
	    }
	
	    if(developerDataList.dialogTitle == "新增品牌商") {
	        params['creator'] = userId;
	    }
	
	        //debugger;
	    Ajax.postJson('/companyAdmin/editBrand', params, function(data) {
	        //var data = data.data;
	        if (data.code == 200) {
	            developerData.set("editStatus", 1);
	            search();
	        } else if (data.code == -11){
	            developerData.set("editStatus", 3);
	        }
	        next();
	    }, 1, true, 0);
	});


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var uiApp = window.uiAppComment;
	var Ajax = __webpack_require__(2);
	var enumData = __webpack_require__(19);
	var $$fomat = __webpack_require__(28);
	
	
	var investorData = uiApp.getModule('module-investor-management');
	
	
	
	//数据获取
	function getData(page) {
	    var data = investorData.get();
	    var params = {
	        page: page || data.currentPage,
	        count: 10
	    }
	    var startTime = '';
	    var endTime = '';
	
	    if (data.date[0]) {
	        startTime = $$fomat.dateFormat(new Date(Date.parse(data.date[0])), 'yyyy-MM-dd hh:mm:ss');
	        endTime = $$fomat.dateFormat(new Date(Date.parse(data.date[1])), 'yyyy-MM-dd hh:mm:ss');
	    }
	    if (data.company) {
	        params['name'] = data.company;
	    }
	    if (startTime) {
	        params['startTime'] = startTime;
	        params['endTime'] = endTime;
	    }
	    if (data.loupanId) {
	        params['pid'] = data.loupanId;
	    }
	    if (data.loupanName) {
	        params['projName'] = data.loupanName;
	    }
	
	    Ajax.get('/companyAdmin/getInvestorList', params, function(data){
	        var arr = [];
	        arr = data.data.list;
	        arr.forEach(function(v){
	            //操作时间修改
	            if (v.updateTime) {
	              v.updateTime = $$fomat.dateFormat(new Date(parseInt(v.updateTime, 10)), 'yyyy-MM-dd');
	            }
	            //下属楼盘解析
	            var projNameList = [];
	            v.projectNameList.forEach(function(v){
	                projNameList.push(v.projName);
	            })
	            // v.projectNameList = projNameList.toString(',');
	            v.projectNameList = projNameList;
	        })
	        investorData.set('investorList', arr);
	        investorData.set('loading', false);
	        investorData.set('totalCount', parseInt(data.data.totalCount));
	
	    },function(){},0,true)
	}
	
	//分页数据获取
	uiApp.evt.on('module-investor-management', 'handleCurrentChange', function(next, page) {
	    next()
	    getData()
	});
	
	//筛选查询数据
	uiApp.evt.on('module-investor-management', 'searchSubmit', function(next, page) {
	    next();
	    getData(1)
	});
	
	//单条信息删除操作
	uiApp.evt.on('module-investor-management', 'handleDelete', function(next, row) {
	    data = investorData.get();
	    var arr = [];
	    if (row.investorId) {
	        arr.push(row.investorId.toString());
	    }
	    var params = {};
	    params["list"] = arr;
	
	    Ajax.postJson('/companyAdmin/deleteInvestor', params, function(data){
	        if (data.code == 200) {
	            getData();
	            investorData.set('deleteSuccess', true);
	        } else {
	            investorData.set('deleteSuccess', false);
	        }
	        next()
	    }, 1, true, 0);
	});
	
	//批量删除操作
	uiApp.evt.on('module-investor-management', 'batchDelete', function(next, val) {
	    data = investorData.get();
	    var arr = [];
	
	    if (data.multipleSelection) {
	        data.multipleSelection.forEach(function(v) {
	            arr.push(v.investorId.toString());
	        })
	    }
	
	    var params = {};
	    params["list"] = arr;
	
	    Ajax.postJson('/companyAdmin/deleteInvestor', params, function(data){
	        if (data.code == 200) {
	            investorData.set('allDeleteSuccess', true);
	            getData();
	        } else {
	            investorData.set('allDeleteSuccess', false);
	        }
	        next();
	    }, 1, true, 0);
	});
	
	
	//新增／编辑 确定提交操作
	uiApp.evt.on('module-investor-management', 'submit', function(next, val) {
	    data = investorData.get();
	
	    var arr = [];
	    var params = {};
	    params["investorName"] = data.ruleForm.investorName;
	    params["investorIntro"] = data.ruleForm.express;
	
	
	    if (data.dialogName === '修改投资商') {
	        params["investorId"] = data.editInvestorId;
	        params["editor"] = data.userId;
	    }
	    if (data.dialogName === '新增投资商') {
	        params["creator"] = data.userId;
	    }
	
	    Ajax.postJson('/companyAdmin/editInvestor', params, function(data){
	        if (data.code == 200) {
	            investorData.set('submitSuccess', true);
	            getData();
	        } else {
	            console.log(data);
	            investorData.set('submitSuccess', false);
	            investorData.set('errorMessage', data.msg);
	        }
	        next();
	    }, 1, true, 0);
	});
	
	getData();


/***/ },
/* 28 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);
//# sourceMappingURL=data.js.map