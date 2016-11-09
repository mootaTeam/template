/* 页面渲染文件 */
define( function(require, exports, module){

	var initial = require("../extend/initial")
	var color_section = require("../../templates/color_section.tpl")



	require("../plugins/popup")


	var ExampleView = Backbone.View.extend({
		el : "body",
		events : {
			"click #alert" : "handleClick_alert",
			"click #prompt" : "handleClick_prompt",
			"click #password" : "handleClick_password",
			"click #tips1" : "handleClick_tips"
		},

		initialize : function(){
			initial.init(this.$el);

			var colorArr = [{
				"name" : "c0",
				"color" : "#FFFFFF"
			},{
				"name" : "c1",
				"color" : "#FF4400"
			},{
				"name" : "c2",
				"color" : "#E8260C"
			},{
				"name" : "c3",
				"color" : "#FF7475"
			},{
				"name" : "c4",
				"color" : "#FDAD0"
			},{
				"name" : "c5",
				"color" : "#FFFBEB"
			},{
				"name" : "c6",
				"color" : "#000000"
			},{
				"name" : "c7",
				"color" : "#666666"
			},{
				"name" : "c8",
				"color" : "#999999"
			},{
				"name" : "c9",
				"color" : "#CCCCCC"
			},{
				"name" : "c10",
				"color" : "#008AFF"
			},{
				"name" : "c11",
				"color" : "#007BE4"
			},{
				"name" : "c12",
				"color" : "#7CC3FF"
			},{
				"name" : "c13",
				"color" : "#333333"
			},{
				"name" : "c14",
				"color" : "#FF0000"
			},{
				"name" : "c15",
				"color" : "#33CC33"
			}];

			this.$("#color").append(_.template(color_section)({data : colorArr}))



			
		},
		handleClick_alert : function(){

			$.alert("弹弹弹")
		},
		handleClick_prompt : function(){

			$.prompt("弹弹弹")
		},
		handleClick_password : function(){

			$.password()
		},
		handleClick_tips : function(){

			$.tips("弹弹弹")
		},

		render  : function(){

		}

	})


	module.exports = ExampleView;

})