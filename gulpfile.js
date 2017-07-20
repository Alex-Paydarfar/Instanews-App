

/************************* Step one ****************************/

//requiring packages

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    eslint = require('gulp-eslint'),
    autoprefixer = require('gulp-autoprefixer');

/************************* Step Two ****************************/

//Gulp tasks below

gulp.task('scripts',function(){
gulp.src('./js/*.js')
.pipe(uglify()) 
.pipe(rename({extname: '.min.js'})) 
.pipe(gulp.dest('./build/js'))
});
gulp.task('lint', function () {
    return gulp.src(['./js/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
 
//gulp say hello task
gulp.task('say_hello', function() {
console.log('hello');
});

gulp.task('autoprefixer', () =>
    gulp.src('css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
          .pipe(rename({extname: '.min.css'})) 
          .pipe(gulp.dest('./build/css'))
);
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
      basedir: "./"
    }
  });
  gulp.watch('build/js/*.js').on('change', browserSync.reload);
  gulp.watch('build/css/*.sass').on('change', browserSync.reload);
});

 //Gulp watch function 

gulp.task('watch', function(){
  gulp.watch('js/*.js'),['scripts']
});

// including plugins

var gulp = require('gulp')
, minifyHtml = require("gulp-minify-html");
 
// task

gulp.task('minify-html', function () {
    gulp.src('./Html/*.html') // path to your files
    .pipe(minifyHtml())
    .pipe(gulp.dest('./build/js'));
});
gulp.task('default', ['lint','watch', 'autoprefixer', 'browser-sync']);