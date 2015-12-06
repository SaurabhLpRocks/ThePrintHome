var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var tsc = require('gulp-typescript');
var config = require('./gulp.config')();
var tsProject = tsc.createProject('tsconfig.json');

gulp.task('compile-ts', function () {
	var sourceTsFiles = [
		config.allTs,
		config.typeings,
	];
	var tsResult = gulp
		.src(sourceTsFiles)
		.pipe(sourcemaps.init())
		.pipe(tsc(tsProject));

	return tsResult.js
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.tsOutPutPath));
}); 

gulp.task('watch', function() {
  gulp.watch('./app/**/*.ts');
});

gulp.task('default', ['compile-ts','watch'], function() {
 
});