// Load plugin
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    browserSync = require('browser-sync');

// Define some
var reload = browserSync.reload;

// Define custom task
gulp.task('sass', function () {
  return sass('app/scss/main.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('app/css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('uglify', function() {
  return gulp.src('app/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('watch', function() {
  var watcher = gulp.watch('app/scripts/*.js', ['uglify'])
  watcher.on('change', function(event) {
    console.log('JS File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch('app/scss/*.scss', ['sass'], function(event) {
    console.log('SCSS File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('serve', ['sass', 'uglify'], function() {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app', 'app/pages'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    '.tmp/scripts/**/*.js',
    'app/images/**/*'
  ]).on('change', reload);

  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/scripts/*.js', ['uglify']);
});