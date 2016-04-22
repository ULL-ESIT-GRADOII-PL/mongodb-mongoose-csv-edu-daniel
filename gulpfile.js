
//-----> DEPENDENCIAS
var gulp = require('gulp'),
	htmlminify = require('gulp-minify-html'),
	minify = require('gulp-minify'),
	clean = require('gulp-clean'),
  uglify = require('gulp-uglify'),
  cleancss = require('gulp-clean-css');
  ghPages = require('gulp-gh-pages');

//-----> CONFIGURACIÓN DE LAS TAREAS
gulp.task('minify-js', function() {
  gulp.src(['csv.js', 'main.js'])
    .pipe(uglify())
    .pipe(gulp.dest('minified/js/'))
});

gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(cleancss({compatibility: 'ie8'}))
    .pipe(gulp.dest('minified/css'));
})

gulp.task('minify-html', function() {
  return gulp.src('*.html')
    .pipe(htmlminify({collapseWhitespace: true}))
    .pipe(gulp.dest('minified/html'))
});

gulp.task('clean', function () {
	return gulp.src('minified/', {read: false})
		.pipe(clean());
});

gulp.task('deploy', function() {
  return gulp.src('./minified/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['minify-js', 'minify-css', 'minify-html'], function() { // Tarea por defecto. Ejecutamos todas las pruebas minify.
});