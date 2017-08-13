

/*************************** Step one ************************/

//requiring packages

var gulp = require('gulp'),                           
    uglify = require('gulp-uglify'),                  
    rename = require('gulp-rename'),                 
    watch = require('gulp-watch'),                    
    browserSync = require('browser-sync').create(),   
    eslint = require('gulp-eslint'),                  
    autoprefixer = require('gulp-autoprefixer'),      
    cssnano = require('gulp-cssnano'),                
    sass = require('gulp-sass'),                     
    prettyError = require('gulp-prettyerror'),       
    minifyHtml = require("gulp-minify-html");         

/************************* Step Two ****************************/

//Gulp tasks below

gulp.task('scripts', ['lint'], function(){            
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
 
gulp.task('browser-sync', function() {                
  browserSync.init({                                  
      server: {                                      
      basedir: "./"                                   
    }
  });
  gulp.watch('build/js/*.js').on('change', browserSync.reload);            
  gulp.watch('build/css/*.min.css').on('change', browserSync.reload);      
});



  gulp.task('watch', function(){                       
  gulp.watch('./js/.*js',['scripts']);                 
  gulp.watch('./css/*.scss',['sass']);                   
});



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
 


gulp.task('minify-html', function () {                  
    gulp.src('./Html/*.html')                           
    .pipe(minifyHtml())                                 
    .pipe(gulp.dest('./build/js'));
});
gulp.task('default', ['watch', 'browser-sync']);