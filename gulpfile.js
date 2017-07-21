

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
    minifyHtml = require("gulp-minify-html");         //require gulp-minify-html

/************************* Step Two ****************************/

//Gulp tasks below

gulp.task('scripts', ['lint'], function(){            //task to run scripts task function
gulp.src('./js/*.js')                                 //on gulp js folder for all files with js extension
.pipe(uglify())                                       // pipe uglify
.pipe(rename({extname: '.min.js'}))                   //pipe rename to change it to script.min.js
.pipe(gulp.dest('./build/js'))                        //pipe gulp.destination to build/js path
});

gulp.task('lint', function () {                       //task to run lint function
    return gulp.src(['./js/*.js'])                    //go to gulp source in js folder and grab all files with .js
        .pipe(eslint())                               //pipe eslint
        .pipe(eslint.format())                        //????
        .pipe(eslint.failAfterError());               // /???????
});
 
gulp.task('browser-sync', function() {                //task to run browser-sync
  browserSync.init({                                  // ???
      server: {                                       //???
      basedir: "./"                                   //???
    }
  });
  gulp.watch('build/js/*.js').on('change', browserSync.reload);            //???
  gulp.watch('build/css/*.min.css').on('change', browserSync.reload);      //???
});

 //Gulp watch function 

gulp.task('watch', function(){                         //task to run watch
  gulp.watch('js/.*js',['scripts']);                   // task is watching script js folder with .js file
  gulp.watch('css/*.scss',['sass']);                   // task is watching sass css folder with .scss 
});

//sass task

gulp.task('sass', function() {                          // task to run sass function
   gulp.src('./css/style.scss')                         // go to css/style
      .pipe(prettyError())                              // for sass task get prettyError 
      .pipe(sass())                                     //??
      .pipe(autoprefixer({                              //apply autoprefixer
         browsers: ['last 2 versions']                  //???
      }))
      .pipe(gulp.dest('./build/css'))                   // put changes in build/css
      .pipe(cssnano())                                  // why not pipe cssnano before putting it in destination?
      .pipe(rename('style.min.css'))                    // why not pipe rename before putting it in build/css
      .pipe(gulp.dest('./build/css'));                  // put the results in build/css
});
 
// task

gulp.task('minify-html', function () {                  // task to run minify-html
    gulp.src('./Html/*.html')                           // path to your files
    .pipe(minifyHtml())                                 // pipe minify html
    .pipe(gulp.dest('./build/js'));
});
gulp.task('default', ['watch', 'browser-sync']);