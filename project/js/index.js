/* 页面入口js文件 (router) */
define(function (require) {
    'use strict';
    require('underscore');
    require('backbone');

    var controller = require("./controllers/index_controller")

    var TodoRouter = Backbone.Router.extend({
        routes: {
            "*action": "defaultRouter",
        },
        defaultRouter: function(){
            var IndexView = require('./view/index_view');
            if(!this.Viewer){
                this.Viewer = new IndexView({
                    collection : controller
                });
                this.Viewer.render();
            }
        }
    });
    new TodoRouter();
    Backbone.history.start();
});