const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const concatCss = require('gulp-concat-css');
const urlAdjuster = require('gulp-css-url-adjuster');
const babel = require('gulp-babel');
const jsmin = require('gulp-jsmin');
const sourcemaps = require('gulp-sourcemaps');

//Задачи по-умолчанию
gulp.task('default', [
	'build-min-sm.css',
	'build-min-js',
]);

//Следит за изменением файлов в каталоге
gulp.task('watch', () => {
	gulp.watch('src/scss/*.scss', ['build-min-sm.css']);
	gulp.watch('src/js/*.js', ['build-min-js']);
});

//Создает карту файла, преобразует *.scss в *.css и минифицирует
gulp.task('build-min-sm.css', () => {
	gulp.src('src/scss/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest('public/css'))
});

//собирает и минифицирует js, прогоняет через babel
gulp.task('build-min-js', () => {
	gulp.src('src/js/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['latest']
		}))
		.pipe(jsmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest('public/js'))
});
