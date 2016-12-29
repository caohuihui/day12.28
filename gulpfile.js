const gulp=require("gulp");
const loadPlugins=require("gulp-load-plugins")();
/*const uglify=require("gulp-uglify");
const concat=require("gulp-concat");
const rename=require("gulp-rename");
const clean=require("gulp-clean");
const connect=require("gulp-connect");
const jshint=require("gulp-jshint");*/
//创建一个删除任务
gulp.task("del",function(){
	return gulp.src("./dist/js")
		       .pipe(loadPlugins.clean())
});
//代码检查
/*gulp.task("checkCode",function(){

})*/
//压缩js   //任务依赖 
//default 执行默认任务
gulp.task("compre",["del"],function(){
	gulp.src("./src/js/*.js")
		.pipe(loadPlugins.uglify())
		.pipe(loadPlugins.rename({
			suffix:".min",
			//prefix:"ok."
		}))
		.pipe(gulp.dest("./dist/js"))
});
//合并js
/*gulp.task("merge",function(){
	gulp.src("./src/js/*.js")
		.pipe(concat("all.js"))
		.pipe(gulp.dest("./dist/js"))
});*/
gulp.task("merge1",function(){
	gulp.src("./src/js/*.js")
		.pipe(loadPlugins.jshint())//检测代码
		.pipe(loadPlugins.jshint.reporter("default"))
		.pipe(loadPlugins.concat("all.min.js"))//合并代码
		.pipe(loadPlugins.uglify())//压缩
		.pipe(gulp.dest("./dist/js"))
})

gulp.task("merge2",["del"],function(){
	gulp.src("./src/js/*.js")
		.pipe(loadPlugins.concat("all.js"))
		.pipe(gulp.dest("./dist/js"))
});
gulp.task("watch",function(){
	//gulp.watch(["./src/js/*.js"],["merge2"]) 监听多个路径
	gulp.watch("./src/js/*.js",["merge2"])
});
//gulp 启动环境

gulp.task("server1",function(){
	connect.server({
		root:["./dist"],
		port:9999,
		livereload:true
	});
});

gulp.task("server2",function(){
	connect.server({
		root:["./view"],
		port:8888,
		livereload:true
	});
});

gulp.task("watch2",function(){
	gulp.watch(["./view/*.html"],['html'])
});
gulp.task("html",function(){
	gulp.src("./view/*.html")
		.pipe(connect.reload())
});
 //创建md5(hash)文件，防止缓存数据
//gulp.task("default",["server1","server2"]);
gulp.task("hash",["del"],function(){
	return gulp.src("./src/js/*.js")
				.pipe(loadPlugins.rev())
				.pipe(gulp.dest("./dist/js"))
				.pipe(loadPlugins.rev.manifest())
				.pipe(gulp.dest("./rev"));//生成JSON文件
});

gulp.task("revCollector",function(){
	return gulp.src(['./rev/*.json','./view/*.html'])
				.pipe(loadPlugins.revCollector({
					replaceReved:true,
					dirReplacements:{
						"../src/js/":"./js"
					}
				}))
				.pipe(gulp.dest("./dist"));
})


gulp.task("default",["server2","watch2"]);
