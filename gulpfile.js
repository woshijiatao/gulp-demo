var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload');


gulp.task('sass', function () {
  return sass('src/scss/main.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('src/css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('uglify', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('watch', function() {
  // Create LiveReload server
  livereload.listen();

  var watcher = gulp.watch('src/scripts/*.js', ['uglify'])
  watcher.on('change', function(event) {
    console.log('JS File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch('src/scss/*.scss', ['sass'], function(event) {
    console.log('SCSS File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});