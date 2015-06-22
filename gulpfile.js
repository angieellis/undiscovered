var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');

gulp.task('less', function () {
  return gulp.src('./development/less/*.less')
  	.pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest('./development/css'));
});

//.pipe(uglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
//https://github.com/terinjokes/gulp-uglify/issues/5
gulp.task('minify', ['less'], function () {
  gulp.src('./development/css/*.css')
      .pipe(plumber())
  		.pipe(concat('all.min.css'))
		  .pipe(cssmin())
			.pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('watch', function() {
   // Watch .js files
  gulp.watch('./development/less/*.less', ['minify']);
 });

gulp.task('default', ['watch']);