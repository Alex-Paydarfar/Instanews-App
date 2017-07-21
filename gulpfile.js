

/************************* Step one ****************************/

//requiring packages

var gulp = require('gulp'),                            //require gulp
    uglify = require('gulp-uglify'),                  //require gulp-uglify
    rename = require('gulp-rename'),                  //require gulp-rename
    watch = require('gulp-watch'),                    //Require gulp-watch
    browserSync = require('browser-sync').create(),   //require browser-sync
    eslint = require('gulp-eslint'),                  //require gulp-eslint
    autoprefixer = require('gulp-autoprefixer');      //require gulp-autoprefixer
    cssnano = require('gulp-cssnano'),                //require gulp-cssnano
    sass = require('gulp-sass');                      //require gulp-sass
    prettyError = require('gulp-prettyerror');        //require gulp-prettyerror

/************************* Step Two ****************************/

//Gulp tasks below

gulp.task('scripts', ['lint'], function(){            //run scripts task function
gulp.src('./js/*.js')                                 //on gulp js folder for all files with js extension
.pipe(uglify())                                       // pipe uglify
.pipe(rename({extname: '.min.js'}))                   //pipe rename to change it to script.min.js
.pipe(gulp.dest('./build/js'))                        //pipe gulp.destination to build/js path
});

gulp.task('lint', function () {                       //run lint function
    return gulp.src(['./js/*.js'])                    //go to gulp source in js folder and grab all files with .js
        .pipe(eslint())                               //pipe eslint
        .pipe(eslint.format())                        //????
        .pipe(eslint.failAfterError());               // /???????
});
 
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
      basedir: "./"
    }
  });
  gulp.watch('build/js/*.js').on('change', browserSync.reload);
  gulp.watch('build/css/*.min.css').on('change', browserSync.reload);
});

 //Gulp watch function 

gulp.task('watch', function(){
  gulp.watch('js/.*js',['scripts']);
  gulp.watch('css/*.scss',['sass']);
});

//sass task

gulp.task('sass', function() {
   gulp.src('./css/style.scss')
      .pipe(prettyError())
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'));
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
gulp.task('default', ['watch', 'browser-sync']);