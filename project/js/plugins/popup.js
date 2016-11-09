define(function(require, exports, module){
	$.extend($, {
		_popup : function(type, param){
			var passwordParam = this.passwordParam;

			if (param.txt && param.txt.indexOf("密码错误") >= 0 && type === "alert" && passwordParam) {

			    type = "prompt";
			    param = {
			        txt: "密码错误",
			        yesbtnTxt: "重新输入",
			        yescallback: function() {

			            setTimeout(function() {
			                this._popup("password", passwordParam)
			            }, 0);
			        }
			    }
			}

			if (type === "password") {
			    this.passwordParam = param;
			} else {
			    this.passwordParam = undefined;
			}



			var yesbtnTxt = param["yesbtnTxt"] || "确定",
			    nobtnTxt = param["nobtnTxt"] || "取消",
			    yescallback = param["yescallback"] || function() {},
			    nocallback = param["nocallback"] || function() {},

			    html = "",

			    target = $("#popup"),

			    backdrop = !param.backdrop ? "show" : "",
			    txt = param.txt,
			    title = param.title,
			    addhtml = param.addhtml || "";


			switch (type) {
			    case "alert":
			        html = '<div class="popupBackdrop ' + backdrop + '"></div>';
			        html += '<div class="popupInner">';
			        if(title) html += '<div class="popupHeader"><h4>'+title+'</h4></div>';
			        html += '<div class="popupContent">' + txt + '</div>';
			        html += '<div class="popupButton"><a href="javascript:;" target="_self" data-btn="yes">' + yesbtnTxt + '</a></div>';
			        html += '</div>';
			        break;
			    case "prompt":
			        html = '<div class="popupBackdrop ' + backdrop + '"></div>';
			        html += '<div class="popupInner">';
			        if(title) html += '<div class="popupHeader"><h4>'+title+'</h4></div>';
			        html += '<div class="popupContent">' + txt + '</div>';
			        html += '<div class="popupButton"><a href="javascript:;" target="_self" data-btn="no">' + nobtnTxt + '</a><a href="javascript:;" target="_self" data-btn="yes">' + yesbtnTxt + '</a></div>';
			        html += '</div>';
			        break;
			    case "password":

			        html = '<div class="popupBackdrop ' + backdrop + '"></div>';
			        html += '<div class="popupInner"><div class="popupHeader"><h4>'+(title || '请输入交易密码')+'</h4></div><div class="popupContent">' + addhtml + '<div class="popupInput"><input type="password" placeholder=" 交易密码（非银行卡密码）"/></div></div>';
			        html += '<div class="popupButton"><a href="javascript:;" target="_self" data-btn="no">' + nobtnTxt + '</a><a href="javascript:;" target="_self" data-btn="yes" class="nonactivated">' + yesbtnTxt + '</a></div>';
			        html += '</div>';
			}

			// 初始化alert弹框
			if (!target[0]) {


			    target = $('<div id="popup" class="popupWrap"  style="z-index:99999999;">');

			    $("body").append(target);

			    // 阻止默认滑动
			    target.on("touchmove mousewheel", function(e) {
			        e.stopPropagation();
			        e.preventDefault();
			    })
			}

			target.html(html).addClass("show");

			var $yesbtn = target.find('[data-btn="yes"]'),
			    $nobtn = target.find('[data-btn="no"]');



			$yesbtn.off('click').on('click', function() {
			    var val = '';


			    if (type === "password") {
			        val = target.find("input[type='password']").val();
			        if (!val) return;

			        $._popupClose();
			        yescallback(val);


			    } else {

			        $._popupClose();
			        yescallback();
			    }

			});

			$nobtn.off('click').on('click', function() {
			    $._popupClose();
			    nocallback();
			});

			if (type === "password") {
			    target.find('input[type="password"]').off('input').on('input', function() {
			        var val = $(this).val();
			        if (!!val) $yesbtn.removeClass('nonactivated');
			        else $yesbtn.addClass('nonactivated');
			    });
			}
		},
		_popupClose: function() {
		    var target = $("#popup");

		    if(target.length) target.removeClass("show");

		},
		/**
         * [alert 弹出框]
         * @param  {[string]} txt  [展示文案]
         * @param  {[function or object or null]} param  
         * param = {
         *      function [点击按钮的回调函数] 
         *      object --->{
         *             yesbtnTxt : "string" [按钮文字] 
         *             title : "string" [标题] 
         *             backdrop : boolean [是否不需要背景层， true就是不需要] 
         *             yescallback : function [点击按钮的回调函数] 
         *      }
         *}
         */
		alert: function(txt, param) {
		    var objParam = {};

		    //如果文字为空
		    if (!txt) return;

		    objParam["txt"] = txt;

		    if (!!param) {
		        //如果param是一个回调函数
		        if (typeof param === "function") {
		            objParam["yescallback"] = param;

		        }
		        //如果param是一个对象
		        else if (typeof param === "object") {
		            if (param.yesbtnTxt) objParam["yesbtnTxt"] = param.yesbtnTxt;
		            if (param.title) objParam["title"] = param.title;
		            if (param.backdrop) objParam["backdrop"] = param.backdrop;
		            if (param.yescallback && typeof param.yescallback === "function") objParam["yescallback"] = param.yescallback;
		        }
		    }

		    this._popup("alert", objParam);

		},
		/**
         * [prompt 弹出框]
         * @param  {[string]} txt  [展示文案]
         * @param  {[function or object or null]} param  
         * param = {
         *      function [点击确认按钮的回调函数] 
         *      object --->{
         *             yesbtnTxt : "string" [确认按钮文字] 
         *             nobtnTxt : "string" [取消按钮文字] 
         *             title : "string" [标题] 
         *             backdrop : boolean [是否不需要背景层， true就是不需要] 
         *             yescallback : function [点击确认按钮的回调函数] 
         *             nocallback : function [点击取消按钮的回调函数] 
         *      }
         *}
         */
		prompt: function(txt, param) {

		    var objParam = {};

		    if (!txt) return;

		    objParam["txt"] = txt;

		    if (!!param) {
		        //如果param是一个回调函数
		        if (typeof param === "function") {
		            objParam["yescallback"] = param;

		        } else if (typeof param === "object") {
		            if (param.yesbtnTxt) objParam["yesbtnTxt"] = param.yesbtnTxt;
		            if (param.title) objParam["title"] = param.title;
		            if (param.nobtnTxt) objParam["nobtnTxt"] = param.nobtnTxt;
		            if (param.backdrop) objParam["backdrop"] = param.backdrop;
		            if (param.yescallback && typeof param.yescallback === "function") objParam["yescallback"] = param.yescallback;
		            if (param.nocallback && typeof param.nocallback === "function") objParam["nocallback"] = param.nocallback;
		        }
		    }


		    this._popup("prompt", objParam);

		},
		 /**
         * [password 弹出框]
         
         * @param  {[function or object ]} param  
         * param = {
         *      function [点击确认按钮的回调函数] 
         *      object --->{
         *             yesbtnTxt : "string" [确认按钮文字] 
         *             nobtnTxt : "string" [取消按钮文字] 
         *             title : "string" [标题] 
         *             addhtml : "string" [附加内容， 例如：<p>附加内容</p>] 
         *             backdrop : boolean [是否不需要背景层， true就是不需要] 
         *             yescallback : function [点击确认按钮的回调函数, 会将输入的密码返回] 
         *             nocallback : function [点击取消按钮的回调函数] 
         *      }
         *}
         */
		password: function(param) {

		    var objParam = {};


		    if (!!param) {
		        //如果param是一个回调函数
		        if (typeof param === "function") {
		            objParam["yescallback"] = param;

		        }
		        if (typeof param === "object") {
		            if (param.yesbtnTxt) objParam["yesbtnTxt"] = param.yesbtnTxt;
		            if (param.title) objParam["title"] = param.title;
		            if (param.nobtnTxt) objParam["nobtnTxt"] = param.nobtnTxt;
		            if (param.backdrop) objParam["backdrop"] = param.backdrop;
		            if (param.addhtml) objParam["addhtml"] = param.addhtml;
		            if (param.yescallback && typeof param.yescallback === "function") objParam["yescallback"] = param.yescallback;
		            if (param.nocallback && typeof param.nocallback === "function") objParam["nocallback"] = param.nocallback;
		        }
		    }
		    this._popup("password", objParam);
		},
		/**
		 * [tips 提示框]
		 * @param  {[string]} txt  [展示文案]
		 * @param  {[ object ]} param  
		 * param = {
		 *      object --->{
		 *             time : number [消失时间, 默认2000毫秒] 
		 *             
		 *      }
		 *}
		 */
		tips: function(txt, param) {
			var _this = this;

		    if (!txt) return;

		    var html = "<p>" + txt + "</p>";
		    var target = $("#tips");

		    // 初始化alert弹框
		    if (!target[0]) {


		        target = $('<div id="tips" class="tips">');

		        $("body").append(target);

		    }
		    setTimeout(function() {
		        target.html(html).addClass("show");

		        clearTimeout(_this.tipsTimout);
		        clearTimeout(_this.animateTimout);

		        _this.tipsTimout = setTimeout(function() {
		            target.removeClass("show");

		            _this.animateTimout = setTimeout(function() {
		                target.remove();
		            }, 500);
		        }, param ? param.time || 2000 : 2000);
		    }, 0);


		},

		tipsClose: function() {
		    var target = $("#tips");

		    if(target.length) target.remove();
		},
	})
})