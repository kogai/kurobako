var gulp = require('gulp');
var util = require('gulp-util');
var data = require('gulp-data');
var newer = require('gulp-newer');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var pngmin = require('gulp-pngmin');
var mifify = require('gulp-minify-css');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var config = {
  src: './asset/src',
  dest: './asset/public'
};

gulp.task('jade', function () {
  'use strict';
  return (
    gulp.src([
  		config.src + '/jade/!(_)*.jade',
  		config.src + '/jade/**/!(_)*.jade',
  		config.src + '/jade/**/**/!(_)*.jade'
    ])
    .pipe(
      data(function (file) {
        return require(config.src + '/jade/config.json')
      })
    )
    .pipe(newer(config.dest))
    .pipe(jade())
    .pipe(
      gulp.dest(config.dest)
    )
    .on('error', function (error) {
      util.beep();
      console.log(error);
    })
  );
});

gulp.task('sass', function () {
  'use strict';
  return (
    gulp.src('./src/sass/style.sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(mifify())
    .pipe(sourcemaps.write('./'))
    .pipe(
      gulp.dest(config.dest)
    )
  )
});

var browserifyRegister = function (entryPoint) {
  browserify({
    entries: [
      config.src + '/js/' + entryPoint + '.jsx',
    ],
    extensions: ['.jsx'],
    debug: true
  })
  .transform('reactify')
  .transform('uglifyify')
  .bundle()
  .pipe
    (source(
      'bundle.' + entryPoint + '.js'
    )
  )
  .pipe(gulp.dest(config.dest))
};

['client', 'server'].forEach(function(node){
  gulp.task('browserify-' + node, function() {
    return browserifyRegister(node);
  });
});

gulp.task('pngmin', function () {
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
  return (
    gulp.src([
      config.src + '/image/*.jpg',
      config.src + '/image/**/*.jpg',
      config.src + '/image/**/**/*.jpg',
      config.src + '/image/*.gif',
      config.src + '/image/**/*.gif',
      config.src + '/image/**/**/*.gif',
    ])
    .pipe(gulp.dest(config.dest + '/image'))
  );
});

gulp.task('img', [
  'pngmin',
  'copy'
]);

gulp.task('default', [
  'jade',
  'sass',
  'browserify',
  'img',
], function(){
  'use strict';
  gulp.watch([
    config.src + '/jade/*.jade',
    config.src + '/jade/**/*.jade',
    config.src + '/jade/**/**/*.jade'
  ], ['jade']);
  gulp.watch([
    config.src + '/sass/*.sass',
    config.src + '/sass/**/*.sass',
    config.src + '/sass/**/**/*.sass'
  ], ['sass']);
  gulp.watch([
    config.src + '/js/*.jsx',
    config.src + '/js/**/*.jsx',
    config.src + '/js/**/**/*.jsx'
  ], ['browserify']);
  gulp.watch([
    config.src + '/image/*',
    config.src + '/image/**/*',
    config.src + '/image/**/**/*'
  ], ['img']);
});
