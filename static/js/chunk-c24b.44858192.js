(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-c24b"],{ThdF:function(t,n,e){"use strict";e.r(n);var a=e("4d7F"),u=e.n(a),r=e("tVwg");n.default={methods:{repair:function(t){return new u.a(function(n,e){Object(r.g)(t).then(function(t){200==t.status?n(t):e(t)})})},backup_export:function(t){return new u.a(function(n,e){Object(r.a)(t).then(function(t){200==t.status?n(t):e(t)})})},optimize:function(t){return new u.a(function(n,e){Object(r.f)(t).then(function(t){200==t.status?n(t):e(t)})})},clear:function(t){return new u.a(function(n,e){Object(r.b)(t).then(function(t){200==t.status?n(t):e(t)})})},restore:function(){return new u.a(function(t,n){Object(r.h)().then(function(e){200==e.status?t(e):n(e)})})},restore_import:function(t){return new u.a(function(n,e){Object(r.i)(t).then(function(t){200==t.status?n(t):e(t)})})},download:function(t){return new u.a(function(n,e){Object(r.e)(t).then(function(t){200==t.status?n(t):e(t)})})},del_file:function(t){return new u.a(function(n,e){Object(r.c)(t).then(function(t){200==t.status?n(t):e(t)})})}}}},tVwg:function(t,n,e){"use strict";e.d(n,"d",function(){return u}),e.d(n,"g",function(){return r}),e.d(n,"a",function(){return o}),e.d(n,"f",function(){return c}),e.d(n,"b",function(){return i}),e.d(n,"h",function(){return f}),e.d(n,"i",function(){return d}),e.d(n,"e",function(){return s}),e.d(n,"c",function(){return p});var a=e("t3Un");function u(t){return Object(a.a)({url:"/index.php/manage/Database/dictionary",method:"post",data:t})}function r(t){return Object(a.a)({url:"/index.php/manage/Database/repair",method:"post",data:t})}function o(t){return Object(a.a)({url:"/index.php/manage/Database/backup_export",method:"post",data:t})}function c(t){return Object(a.a)({url:"/index.php/manage/Database/optimize",method:"post",data:t})}function i(){return Object(a.a)({url:"/index.php/manage/Database/clear",method:"post"})}function f(){return Object(a.a)({url:"/index.php/manage/Database/restore",method:"post"})}function d(t){return Object(a.a)({url:"/index.php/manage/Database/restore_import",method:"post",data:t})}function s(t){return Object(a.a)({url:"/index.php/manage/Database/download",method:"post",data:t})}function p(t){return Object(a.a)({url:"/index.php/manage/Database/del_file",method:"post",data:t})}}}]);