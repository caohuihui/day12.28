//以模块化的方法
var drop=(function(){
	var ele,x,y;
	function init(ID){
		//获取元素
	 	ele=document.getElementById(ID);
		
		ele.onmousedown=downFn;
		
	}
	function init2(ID){
		//获取元素
	 	ele=document.getElementById(ID);
		ele.onmousedown=downFn2;
		
	}
	//鼠标按下去执行的函数
	var downFn=function(e){
		//获取鼠标按下时在元素上的位置=光标在页面中的坐标-元素的位置
		x=e.clientX-ele.offsetLeft;
		y=e.clientY-ele.offsetTop;
		ele.onmousemove=moveFn;
		ele.onmouseup=upFn;
	};
	var downFn2=function(e){
		//获取鼠标按下时在元素上的位置=光标在页面中的坐标-元素的位置
		x=e.clientX-ele.offsetLeft;
		y=e.clientY-ele.offsetTop;
		ele.onmousemove=moveFn2;
		ele.onmouseup=upFn;
	};
	 var moveFn=function(e){
		//盒子跟随鼠标：盒子.left=光标X-x
		var l=e.clientX-x,
		    t=e.clientY-y,
		    w=document.documentElement.clientWidth,
		    h=document.documentElement.clientHeight;
		    ele.style.left=l+"px";
		    ele.style.top=t+"px";
	};
	 var moveFn2=function(e){
		//盒子跟随鼠标：盒子.left=光标X-x
		 var  l=e.clientX-x,
		    t=e.clientY-y,
		    w=document.documentElement.clientWidth,
		    h=document.documentElement.clientHeight;
		    if(l<0) l=0;
		    if(t<0) t=0;
		    if(l>(w-ele.offsetWidth)) l=w-ele.offsetWidth;
		    if((t>h-ele.offsetHeight))t=h-ele.offsetHeight;
		    ele.style.left=l+"px";
		    ele.style.top=t+"px";
	};
	var upFn=function(e){
		//盒子取消跟随鼠标效果：删除mousemove事件
		ele.onmousemove=null;
		ele.onmouseup=null;
	};
	return {
		init1:init,
		init2:init2
				
		
		

	};
}());

//放大模式
/*var drop2=(function(mod){
		//var ele,x,y;
	mod.fn=function(){
		 var moveFn=function(e){
		//盒子跟随鼠标：盒子.left=光标X-x
			x=e.clientX-ele.offsetLeft,
			y=e.clientY-ele.offsetTop,
		 	 l=e.clientX-x,
		    t=e.clientY-y,
		    w=document.documentElement.clientWidth,
		    h=document.documentElement.clientHeight;
		    if(l<0) l=0;
		    if(t<0) t=0;
		    if(l>(w-ele.offsetWidth)) l=w-ele.offsetWidth;
		    if((t>h-ele.offsetHeight))t=h-ele.offsetHeight;
		    ele.style.left=l+"px";
		    ele.style.top=t+"px";
	}
	}
	return mod;
})(drop)*/