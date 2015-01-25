var gulp = require('gulp');
var path = require('path');

gulp.task('express', function() {
	var express = require('express');
	var app = express();
	app.use(express.static(path.join(__dirname,'test/e2e/')));
	app.use(express.static(path.join(__dirname,'/src/')));
	app.listen(4200);
});

gulp.task('default', ['express'], function() {

});