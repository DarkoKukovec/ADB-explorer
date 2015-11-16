var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var aliasify = require('aliasify');
var debowerify = require('debowerify');
var hbsfy = require('hbsfy');

var postcss = require('gulp-postcss');
var postcssImport = require('postcss-import');
var postcssNested = require('postcss-nested');
var postcssSimpleVars = require('postcss-simple-vars');
var postcssNestedProps = require('postcss-nested-props');
var postcssSize = require('postcss-size');
var postcssPosition = require('postcss-position');
var autoprefixer = require('autoprefixer');

var nodePath = ['app/scripts'];
if (process.env.NODE_PATH) {
  var paths = process.env.NODE_PATH.split(':');
  nodePath = paths.concat(nodePath);
}

var vendors = [
  'lodash',
  'jquery',
  'backbone',
  'backbone.marionette',
  'babel-core/polyfill'
];

gulp.task('scripts', function() {
  var b = browserify({
    paths: nodePath,
    debug: true
  });
  b.add('app/scripts/main.js');
  b.transform(babelify, {});
  b.transform(aliasify, {});
  b.transform(debowerify, {});
  b.transform(hbsfy, {});

  vendors.forEach(function(lib) {
    b.external(lib);
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(plumber({
      errorHandler: notify.onError('Scripts: <%= error.message %>')
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('vendors', function() {
  var b = browserify();
  b.add(__dirname + '/noop.js');
  vendors.forEach(function(lib) {
    b.require(lib);
  });
  return b.bundle()
    .pipe(source('vendor.js'))
    .pipe(plumber({
      errorHandler: notify.onError('Vendors: <%= error.message %>')
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('styles', function() {
  return gulp.src('app/styles/app.css')
    .pipe(postcss([
      postcssImport,
      postcssNested,
      postcssSimpleVars,
      postcssNestedProps,
      postcssSize,
      postcssPosition,
      autoprefixer({ browsers: ['last 1 Chrome version'] })
    ]))
    .pipe(plumber({
      errorHandler: notify.onError('Styles: <%= error.message %>')
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('watch', ['styles', 'scripts', 'vendors'], function() {
  gulp.watch('app/styles/**/*.css', ['styles']);
  gulp.watch(['app/scripts/**/*.js', '!app/bower_components/**/*.js'], ['scripts']);
  gulp.watch(['node_modules/**/*.js', 'app/bower_components/**/*.js'], ['vendors']);
});
