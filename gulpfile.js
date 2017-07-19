//requiring packages
var gulp = require('gulp'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename');
watch = require('gulp-watch'),
browserSync = require('browser-sync');
eslint = require('eslint');   //eslint one
const gulp = require('gulp');
const eslint = require('gulp-eslint');

//Gulp tasks below

//Gulp script tasks
gulp.task('scripts',function(){
gulp.src('./js/*.js')
.pipe(uglify()) //call the uglify function on the files
.pipe(rename({extname: '.min.js'})) //rename uglified file
.pipe(gulp.dest('./build/js'))
.pipe(gulp.dest)
.pipe(eslint)  //eslint two
});


gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src(['**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
});
 
gulp.src(['**/*.js','!node_modules/**'])
    .pipe(eslint({
        rules: {
            'my-custom-rule': 1,
            'strict': 2
        },
        globals: [
            'jQuery',
            '$'
        ],
        envs: [
            'browser'
        ]
    }))
    .pipe(eslint.formatEach('compact', process.stderr));

gulp.task('default', ['lint'], function () {
    // This will only run if the lint task is successful... 
});


//gulp say hello task

gulp.task('say_hello', function() {
console.log('hello');
});



gulp.task('browser-sync', function() {
  browserSync.init({
  server: {
  basedir: "./"
}

gulp.task('eslint', function( {
eslint.init({
server: {                               //eslint three
basedir: "./"
})

});
gulp.watch('build/js/*.js').on('change', browserSync.reload);

  });

gulp.watch('build/js/*.js').on('change', eslint)


 //Gulp watch function 

gulp.task('watch', function( ){
gulp.watch('js/*.js'),['scripts']);
});

gulp.task('default', ['watch', 'browser-sync']);


//gulp default task should be at the bottom
// create a task that ensures the `js` task is complete before
// reloading browsers
// gulp.task('js-watch', ['js'], function (done) {
//     browserSync.reload();
//     done();
// });

// // use default task to launch Browsersync and watch JS files
// gulp.task('default', ['js'], function () {

