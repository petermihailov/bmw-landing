const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const twig = require('gulp-twig');
const data = require('gulp-data');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const cssbeautify = require('gulp-cssbeautify');
const browserSync = require('browser-sync');

var paths = {
  build: './docs/',
  assets: './assets/**/*',
  lib: './lib/**/*',
  scripts: './scripts/**.*',
  data: './client/data/',
};

gulp.task('twig', function () {
  return gulp.src(['./client/templates/*.twig'])
    .pipe(data(function (file) {
      return JSON.parse(fs.readFileSync(paths.data + path.basename(file.path) + '.json'));
    }))
    .pipe(twig())
    .on('error', function (err) {
      process.stderr.write(err.message + '\n');
      this.emit('end');
    })
    .pipe(gulp.dest(paths.build));
});

gulp.task('sass', function () {
  return gulp.src(paths.build + 'styles.css')
    .pipe(cssbeautify())
    .pipe(gulp.dest(paths.build));
});

gulp.task('js', function () {
  gulp.src(paths.scripts)
    .pipe(concat('script.js'))
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('copy-assets', function () {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.build + 'assets'));
});

gulp.task('copy-lib', function () {
  return gulp.src(paths.lib)
    .pipe(gulp.dest(paths.build + 'lib'));
});

gulp.task('browser-sync', ['copy-assets', 'copy-lib', 'sass', 'twig', 'js'], function () {
  browserSync({
    server: {
      baseDir: paths.build,
    },
    notify: false,
    browser: 'google chrome',
  });
});

gulp.task('watch', function () {
  gulp.watch(paths.sass + 'scripts/*.js', ['js', browserSync.reload]);
  gulp.watch(['client/templates/**/*.twig', 'client/data/*.twig.json'], {cwd: './'}, ['rebuild']);
});

gulp.task('rebuild', ['twig'], function () {
  browserSync.reload();
});

gulp.task('default', ['browser-sync', 'watch']);
