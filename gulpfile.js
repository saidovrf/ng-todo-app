var gulp 		= require('gulp'),
	sass 		= require('gulp-sass'),
	browserSync = require('browser-sync').create(),

	cleanCSS 		= require('gulp-clean-css'),
	autoprefixer 	= require('gulp-autoprefixer'),

	uglyfly = require('gulp-uglyfly'),
	concat = require("gulp-concat");

gulp.task('serve', ['html', 'sass', 'js'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        notify: false
    });

    gulp.watch("app/sass/*.sass", ['sass']);
    gulp.watch("app/**/*.html", ['html']);
    gulp.watch("app/**/*.js", ['js']);
});


gulp.task('js', function() {
  return gulp.src(['app/js/angular.js', 'app/js/vendors/*.js', 'app/js/app.js', 'app/js/modules/*.js'])
    .pipe(concat('common.min.js'))
    .pipe(uglyfly())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function() {
	return gulp.src('app/sass/*.sass')
		.pipe(sass())
		.pipe(autoprefixer())
        .pipe(cleanCSS())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('html', function(){
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

gulp.task('build', ['html', 'sass', 'js'])