const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const concatCss = require('gulp-concat-css');
const babel = require('gulp-babel');
const jsmin = require('gulp-jsmin');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('default', [
	'build-css',
	'build-js',
]);

gulp.task('watch', () => {
	gulp.watch('./src/scss/*.scss', ['build-css']);
	gulp.watch('./src/js/*.js', ['build-js']);
});

gulp.task('build-css', () => {
	gulp.src('./src/scss/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest('./public'))
});

gulp.task('build-js', () => {
	gulp.src('./src/js/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['latest']
		}))
		.pipe(jsmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest('./public'))
});
