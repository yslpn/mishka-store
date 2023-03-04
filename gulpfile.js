'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var csso = require('gulp-csso');
var rename = require('gulp-rename');
// var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var rimraf = require('rimraf')
var htmlmin = require('gulp-htmlmin');
var minify = require('gulp-minify');

gulp.task('min-js', function () {
  return gulp.src('source/js/*.js')
    .pipe(minify({
      ext: {
        min: '.min.js'
      }
    }))
    .pipe(gulp.dest('build/js'))
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    // .pipe(imagemin([
    //   imagemin.optipng({ optimizationLevel: 3 }),
    //   imagemin.mozjpeg({ progressive: true }),
    //   imagemin.svgo()
    // ]))
    .pipe(gulp.dest('source/img'));
});

gulp.task('webp', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('source/img'));
});

gulp.task('sprite-icon', function () {
  return gulp.src('source/img/icon-*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite-icon.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('sprite-logo', function () {
  return gulp.src('source/img/logo-*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite-logo.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('css', function () {
  return gulp.src('source/less/style.less')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/js/*.js', gulp.series('min-js'));
  gulp.watch('source/less/**/*.less', gulp.series('css'));
  gulp.watch('source/img/icon-*.svg', gulp.series('sprite-icon', 'html', 'refresh'));
  gulp.watch('source/img/logo-*.svg', gulp.series('sprite-logo', 'html', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    '!source/img/icon-*.svg',
    '!source/img/logo-*.svg',
    'source/*.ico'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return rimraf('build');
});

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'css',
  'sprite-icon',
  'sprite-logo',
  'min-js',
  'html'
));

gulp.task('start', gulp.series('build', 'server'));
