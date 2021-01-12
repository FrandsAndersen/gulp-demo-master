// Import all needed modules, save in variables
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minifyCSS = require('gulp-minify-css');
const sass = require('gulp-sass');
const { src, dest } = require('gulp');

gulp.task("scss:css", function(){
  return src('scss/*.scss')
  .pipe(sass())
  .pipe(dest('css'));
})

gulp.task("min:css",function(){
  return src('css/*.css')
  .pipe(concat('index.css'))
  .pipe(minifyCSS())
  .pipe(dest('build'));
});

gulp.task("min:js", function(){
  return src('js/*.js')
  .pipe(concat('index.js'))
  .pipe(uglify())
  .pipe(dest('build'));
})

gulp.task("build:index",function(){
  return src('index.html')
  .pipe(dest('build'));
});

gulp.task('watch',function(){
  gulp.watch('scss/*.scss',gulp.series('scss:css','min:css'));
  gulp.watch('js/*.js',gulp.series('min:js'));
  gulp.watch('index.html',gulp.series('build:index'));
});

gulp.task("default", gulp.series('scss:css','min:css','min:js','build:index','watch'));


// // the default task runs when you simply type "gulp" as your command
// gulp.task('default', 'minify');

// // optionally, you can define dependencies as an array of task names before your function
// // here, we have a task called js that will run our other task, jshint, before it runs
// gulp.task('js', gulp.series('jshint', function() {
//   gulp.src(['*.js', '!gulpfile.js'])
//   .pipe(concat('all.js'))
//   // uglify is a javascript minifier / uglifier so we're combining and minifying our javascript
//   // and making it less readable, which is useful for protecting your source code when you don't
//   // want anyone to open up the dev tools and read it
//   .pipe(uglify())
//   .pipe(gulp.dest('js'))
// }));

// gulp.task('jshint', function() {
//     return gulp.src(gulp.['*.js', '!gulpfile.js'])
//         // js hint is a javascript linter that helps enforces best practices and helps catch errors
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });
