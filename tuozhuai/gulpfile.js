const gulp=require("gulp");
const loadPlugins=require("gulp-load-plugins")();
gulp.task("del",function(){
	return gulp.src("./dist/js")
		       .pipe(loadPlugins.clean())
});
gulp.task("merge_tuo",["del"],function(){
	gulp.src(["./src/js/*.js"])
		.pipe(loadPlugins.jshint())//检测代码
		.pipe(loadPlugins.jshint.reporter("default"))
		.pipe(loadPlugins.concat("all.min.js"))//合并代码
		.pipe(loadPlugins.uglify())//压缩
		.pipe(gulp.dest("./dist/js"))
});
/*gulp.task("merge_tuo2",function(){
	gulp.src(["./src/css/*.css"])
		//.pipe(loadPlugins.jshint())//检测代码
		//.pipe(loadPlugins.jshint.reporter("default"))
		.pipe(loadPlugins.concat("all.min.css"))//合并代码
		.pipe(loadPlugins.uglify())//压缩
		.pipe(gulp.dest("./dist/css"))
});*/

gulp.task("hash1",function(){
	return gulp.src("./src/js/*.js")
				.pipe(loadPlugins.rev())
				.pipe(gulp.dest("./dist/js"))
				.pipe(loadPlugins.rev.manifest())
				.pipe(gulp.dest("./rev"));//生成JSON文件
});

gulp.task("revCollector",function(){
	return gulp.src(['./rev/*.json','./*.html'])
				.pipe(loadPlugins.revCollector({
					replaceReved:true,
					dirReplacements:{
						"./src/js/":"./js"
					}
				}))
				.pipe(gulp.dest("./dist"));
})
