var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('jshint', function() {
  return gulp.src(['src/**/*.js', '!node_modules/**'])
    .pipe(jshint({
      node: true,
      moz: true,
      esnext: 6
    }))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', ['jshint'], function() {

});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['jshint']);
});
