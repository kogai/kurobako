var gulp = require('gulp');
var util = require('gulp-util');
var data = require('gulp-data');
var newer = require('gulp-newer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var pngmin = require('gulp-pngmin');
var mifify = require('gulp-minify-css');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var react = require('gulp-react');
var runSequence = require('run-sequence');

var config = {
  env: 'development',
  src: './asset-src',
  srcReact: './react',
  dest: './asset/public',
  destReact: './asset/react'
};

gulp.task('sass', function () {
  'use strict';
  return gulp.src(config.src + '/sass/style.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      sourceComments : 'normal'
    }))
    .pipe(mifify())
    .pipe(sourcemaps.write('./'))
    .pipe(
      gulp.dest(config.dest)
    )
    .on('error', function(err){
      console.log(err);
    });
});

gulp.task('react-base', function () {
  'use strict';
  return gulp.src([
      config.srcReact + '/*.jsx',
      config.srcReact + '/**/*.jsx',
      config.srcReact + '/**/**/*.jsx'
    ])
    .pipe(react())
    .pipe(gulp.dest(config.destReact + '/'))
    .on('error', function(err){
      console.log(err);
    });
});

gulp.task('react-client', function() {
  'use strict';
  var opt = {
    entries: [
      config.destReact + '/client.js'
    ],
    extensions: ['.js'],
    debug: true
  };
  if(config.env === 'production'){
    opt.debug = false;
  }
  return browserify(opt)
  .transform('uglifyify')
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(config.dest));
});

gulp.task('pngmin', function () {
  'use strict';
  return (
    gulp.src([
      config.src + '/image/*.png',
      config.src + '/image/**/*.png',
      config.src + '/image/**/**/*.png'
    ])
    .pipe(newer(config.dest + '/image'))
    .pipe(pngmin())
    .pipe(gulp.dest(config.dest + '/image'))
  );
});

gulp.task('copy', function () {
  'use strict';
  return (
    gulp.src([
      config.src + '/image/*.jpg',
      config.src + '/image/**/*.jpg',
      config.src + '/image/**/**/*.jpg',
      config.src + '/image/*.gif',
      config.src + '/image/**/*.gif',
      config.src + '/image/**/**/*.gif'
    ])
    .pipe(gulp.dest(config.dest + '/image'))
  );
});

gulp.task('img', [
  'pngmin',
  'copy'
]);

gulp.task('react', function (callback) {
  'use strict';
  runSequence(
    'react-base',
    'react-client',
    callback
  );
});

gulp.task('compile', [
  'sass',
  'react',
  'img'
]);

gulp.task('isProduction', function(){
  'use strict';
  config.env = 'production';
});

gulp.task('default', [
  'compile'
], function(){
  'use strict';
  gulp.watch([
    config.src + '/sass/*.sass',
    config.src + '/sass/**/*.sass',
    config.src + '/sass/**/**/*.sass'
  ], ['sass']);
  gulp.watch([
    config.srcReact + '/*.jsx',
    config.srcReact + '/**/*.jsx',
    config.srcReact + '/**/**/*.jsx'
  ], ['react']);
  gulp.watch([
    config.src + '/image/*',
    config.src + '/image/**/*',
    config.src + '/image/**/**/*'
  ], ['img']);
});

gulp.task('build', function (callback) {
  'use strict';
  runSequence(
    'isProduction',
    'compile',
    callback
  );
});
