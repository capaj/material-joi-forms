var gulp = require('gulp');
var path = require('path');
var browserSync = require('browser-sync');

gulp.task('express', function() {
	var express = require('express');
	var app = express();
	app.use(express.static(path.join(__dirname,'test/e2e/')));
	app.use(express.static(path.join(__dirname,'/src/')));
	app.listen(8200);
});

gulp.task('default', ['express'], function() {
	browserSync({
		proxy: "http://localhost:8200"
	});

	gulp.watch(["src/**/*.js", "test/e2e/**/*.js", "**/*.html"], browserSync.reload);
});