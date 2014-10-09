var gulp = require('gulp'),
	wrap = require('gulp-wrap-umd'),
	mocha = require("gulp-mocha"),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint');
gulp.task('lint', function() {
  return gulp.src('*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default', {verbose:true}))
    .pipe(jshint.reporter('fail'));
});
gulp.task('build', ['lint'], function(){
	var stream = gulp.src(['index.js'])
		.pipe(concat('bitarray.js'))
		.pipe(wrap({
      		exports: 'BitArray'
     	}))
		.pipe(gulp.dest('build/js/'));
	return stream;
});

gulp.task('default', ['build']);

gulp.task('test', ['build'], function(){
	gulp.src('test/*.js', {read:false})
		.pipe(mocha({reporter:'nyan', ui:'bdd'}));
});