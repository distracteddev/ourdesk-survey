'use strict';

define(function () {
  return function (app) {
    window.AuraApp = app;
    return {
      require: {
        paths: {
          bone: '/bone.io/bone.io',
          socketio: '/socket.io/socket.io.js'
        },
        shim: {
          bone:     { exports: 'bone', deps: [] },
          socketio: { exports: 'socketio', deps: [] }
        }
      },
      initialize: function (app) {
        var bone         = require('bone');
        var socketio     = require('socketio');
        var socket       = socketio.connect();
        bone.set('io.options', {
          socket: socket
        })
        app.core.bone    = bone;
        app.sandbox.bone = bone;

      },
      afterAppStart: function () {
        console.log('Bone.io Extension Loaded');
      }
    };
  };
});
