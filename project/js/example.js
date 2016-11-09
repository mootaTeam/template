/* 页面入口js文件 (router) */
define(function (require) {
    'use strict';
    require('underscore');
    require('backbone');

    var controller = require("./controllers/example_controller")

    var TodoRouter = Backbone.Router.extend({
        routes: {
            "*action": "defaultRouter",
        },
        defaultRouter: function(){
            var ExampleView = require('./view/example_view');
            if(!this.Viewer){
                this.Viewer = new ExampleView({
                    collection : controller
                });
                this.Viewer.render();
            }
        }
    });
    new TodoRouter();
    Backbone.history.start();
});