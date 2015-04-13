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

var config = {
  env: 'development',
  src: './src',
  dest: './asset/public',
  destServer: './asset/server'
};

gulp.task('sass', function () {
  'use strict';
  return (
    gulp.src(config.src + '/sass/style.sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(mifify())
    .pipe(sourcemaps.write('./'))
    .pipe(
      gulp.dest(config.dest)
    )
  );
});

gulp.task('react-client', function() {
  'use strict';
  var opt = {
    entries: [
      config.src + '/js/client.jsx'
    ],
    extensions: ['.jsx'],
    debug: true
  };
  if(config.env === 'production'){
    opt.debug = false;
  }
  return browserify(opt)
  .transform('reactify')
  .transform('uglifyify')
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(config.dest));
});

gulp.task('react-server', function () {
  'use strict';
  return gulp.src([
      config.src + '/js/*.jsx',
      config.src + '/js/**/*.jsx',
      config.src + '/js/**/**/*.jsx'
    ])
    .pipe(react())
    .pipe(gulp.dest(config.destServer + '/'))
    .on('error', function(err){
      console.log(err);
    });
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

gulp.task('react', [
  'react-client',
  'react-server'
]);

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
    config.src + '/js/*.jsx',
    config.src + '/js/**/*.jsx',
    config.src + '/js/**/**/*.jsx',
    config.src + '/js/*.js',
    config.src + '/js/**/*.js',
    config.src + '/js/**/**/*.js'
  ], ['react']);
  gulp.watch([
    config.src + '/image/*',
    config.src + '/image/**/*',
    config.src + '/image/**/**/*'
  ], ['img']);
});

gulp.task('build', [
  'isProduction',
  'compile'
]);
