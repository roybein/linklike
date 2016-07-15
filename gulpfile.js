var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
//var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var streamify = require('gulp-streamify');
var babelify = require('babelify');
var path = require('path');
var del = require('del');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
var gutil = require('gulp-util');

var env = {
  VIEWS: ['./ui/views/*.jade', './ui/views/**/*.jade'],
  LESS: ['./ui/views/*.less', './ui/views/**/*.less'],
  DEST: './dist',
  DEST_VIEWS: './dist/views',
  DEST_VENDORS: './dist/vendors',
  ENTRY_POINTS: [
    'views/newLink/newLink.js',
    'views/neuriteSensor/neuriteSensor.js',
    'views/login/login.js',
    'views/signup/signup.js',
    'views/notifiDev/notifiDev.js',
  ],
};

gulp.task('less', function() {
  gulp.src(env.LESS)
    .pipe(less())
    .pipe(gulp.dest('./dist/views/'));
});

gulp.task('copy', function(){
  gulp.src(env.VIEWS)
    .pipe(gulp.dest(env.DEST_VIEWS));
  gulp.src(['./ui/AdminLTE/dist/**/**'])
    .pipe(gulp.dest('./dist/vendors/AdminLTE/dist'));
  gulp.src(['./ui/AdminLTE/bootstrap/**/**'])
    .pipe(gulp.dest('./dist/vendors/AdminLTE/bootstrap'));
  gulp.src(['./ui/AdminLTE/plugins/iCheck/square/blue.css'])
    .pipe(gulp.dest('./dist/vendors/AdminLTE/plugins/iCheck/square/'));
  gulp.src(['./node_modules/jquery/dist/**'])
    .pipe(gulp.dest('./dist/vendors/jquery'));
  gulp.src(['./node_modules/jquery.cookie/jquery.cookie.js'])
    .pipe(gulp.dest('./dist/vendors/jquery.cookie'));
  gulp.src(['./node_modules/bootstrap/dist/**/**'])
    .pipe(gulp.dest('./dist/vendors/bootstrap/dist/'));
  gulp.src(['./node_modules/semantic-ui/dist/**/**'])
    .pipe(gulp.dest('./dist/vendors/semantic-ui/dist/'));
});

gulp.task('lint', function () {
  gulp.src('./ui/views/**/*.js')
    .pipe(jshint())
})

gulp.task('develop', function () {
  nodemon({ script: './linklike.js'
          , ext: 'js'
          , ignore: ['gulpfile.js', './ui/', './dist' ]
          , tasks: [] })
    .on('restart', function () {
      console.log('restarted!')
    })
})

gulp.task('watch', function() {
  //livereload.listen();

  gulp.watch(env.VIEWS, ['copy']);

  env.ENTRY_POINTS.forEach(function(e, i, a) {
    var entrie = './ui/' + e;
    var b = watchify(browserify({
      entries: entrie,
      cache: {},
      debug: true
    }));

    b.on('update', bundle);
    bundle();

    function bundle() {
      //var name = path.basename(e);
      var name = e;
      b.transform("babelify", {presets: ["es2015", "react"]})
      .bundle().on('error', function(err) {
        gutil.log("Browserify Error", gutil.colors.yellow(err.message));
        this.emit('end');
      })
      .pipe(source(name))
      .pipe(gulp.dest(env.DEST));

      console.log("bundled", entrie);
    }
  });
});

gulp.task('build', function() {
  env.ENTRY_POINTS.forEach(function(e, i, a) {
    var b = browserify({
      entries: e,
      cache: {},
      debug: true
    });

    bundle();

    function bundle() {
      //var name = path.basename(e, '.js') + '.min.js';
      var name = e;
      b.transform("babelify", {presets: ["es2015", "react"]})
      .bundle()
      .pipe(source(name))
      .pipe(streamify(uglify()))
      .pipe(gulp.dest(env.DEST));

      console.log("bundled", name);
    }
  });
});

gulp.task('clean', function() {
  del([env.DEST]).then(function(paths) {
    console.log("del", paths.join('\n'));
  });
});

gulp.task('default', ['less', 'copy', 'watch', 'develop']);
