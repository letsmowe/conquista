const _PROJECTNAME = 'conquista';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	concatCSS = require('gulp-concat-css'),
	jshint = require('gulp-jshint'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	imageResize = require('gulp-image-resize'),
	tinypng = require('gulp-tinypng'),

	browserSync = require('browser-sync').create();

/*
 * To use the gulp-image-resize, it needs of some dependencies:
 * https://www.npmjs.com/package/gulp-image-resize
 *
 * Or, install:
 *
 * Ubuntu:
 * apt-get install imagemagick
 * apt-get install graphicsmagick
 *
 * Mac:
 * brew install imagemagick
 * brew install graphicsmagick
 *
 * Windows & others:
 * http://www.imagemagick.org/script/binary-releases.php
 * */

const tinypngToken = '9AezpuHVVLlWna8fZg5pxCJFCN7fKdzv';

// Source Content structure

var source = {
	content: '*',
	location: './'
};

source.css = {
	content: '**/*.css',
	location: source.location + 'css/'
};

source.js = {
	content: '**/*.js',
	location: source.location + 'js/'
};

source.index = {
	content: '**/*.html',
	location: source.location
};

source.images = {
	content: '*.*',
	location: source.location + 'img/'
};

source.images.largePhotos = {
	content: '*.*',
	location: source.images.location + 'largePhotos/'
};

// Source Content structure

var dist = {
	content: '*',
	location: 'dist/'
};

dist.css = {
	content: '*.css',
	location: dist.location + 'css/'
};

dist.js = {
	content: '*.js',
	location: dist.location + 'js/'
};

// CSS

gulp.task('css', function() {
	gulp.src(source.css.location + source.css.content)
		.pipe(concatCSS(_PROJECTNAME + '.css'))
		.pipe(gulp.dest(dist.css.location))
		.pipe(cleanCSS())
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest(dist.css.location));
});

gulp.task('css-watch', ['css'], function () {
	browserSync.reload();
});

// JS

gulp.task('js', function() {
	gulp.src(source.js.location + source.js.content)
		.pipe(concat(_PROJECTNAME + '.js'))
		.pipe(gulp.dest(dist.js.location))
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(gulp.dest(dist.js.location));
});

gulp.task('js-watch', ['js'], function () {
	browserSync.reload();
});

// IMAGES

gulp.task('resizeImgHeroBackground', function () {

	var local = 'Hero-background/*';
	var distLocal = 'Hero-background/';

	gulp.src('./img/' + local)
		.pipe(imageResize({
			height : 960,
			upscale : false
		}))
		.pipe(gulp.dest('./dist/img/' + distLocal));

});

gulp.task('resizeImgHeroTarget', function () {

	var local = 'Hero-target/*';
	var distLocal = 'Hero-target/';

	gulp.src('./img/' + local)
		.pipe(gulp.dest('./dist/img/' + distLocal));

});

gulp.task('resizeImgMisc', function () {

	var local = 'misc/*';
	var distLocal = 'misc/';

	gulp.src('./img/' + local)
		.pipe(gulp.dest('./dist/img/' + distLocal));

});

gulp.task('resizeImgProductBlur', function () {

	var local = 'Product-blur/*';
	var distLocal = 'Product-blur/';

	gulp.src('./img/' + local)
		.pipe(imageResize({
			height : 960,
			upscale : false
		}))
		.pipe(gulp.dest('./dist/img/' + distLocal));

});

gulp.task('resizeImgProductFamily', function () {

	var local = 'Product-family/*';
	var distLocal = 'Product-family/';

	gulp.src('./img/' + local)
		.pipe(imageResize({
			height : 768,
			upscale : false
		}))
		.pipe(gulp.dest('./dist/img/' + distLocal));

});

gulp.task('resizeImgProductPet', function () {

	var local = 'Product-pet/*';
	var distLocal = 'Product-pet/';

	gulp.src('./img/' + local)
		.pipe(imageResize({
			height : 768,
			upscale : false
		}))
		.pipe(gulp.dest('./dist/img/' + distLocal));

});

gulp.task('resizeImgProductTarget', function () {

	var local = 'Product-target/*';
	var distLocal = 'Product-target/';

	gulp.src('./img/' + local)
		.pipe(imageResize({
			height : 600,
			upscale : false
		}))
		.pipe(gulp.dest('./dist/img/' + distLocal));

});

// SERVER

gulp.task('serve', function () {

	// Serve files from the root of this project
	browserSync.init({
		server: {
			baseDir: "./",
			index: "index.html",
			routes: {
				"/home": "./index.html"
			}
		}
	});

	gulp.watch(['css/*.css'], ['css-watch']);
	gulp.watch([['js/*.js']], ['js-watch']);
	gulp.watch(source.index.content).on("change", browserSync.reload);

});

gulp.task('default', ['serve']);