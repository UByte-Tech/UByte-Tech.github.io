// Gulp
var gulp                = require('gulp');
var gutil               = require('gulp-util');
var browser             = require('browser-sync');

// Include plugins
var plugins             = require('gulp-load-plugins')(); // tous les plugins de package.json

// Chemins (Theme Wordpress / Fichiers de travail/prod app)
var theme               = './frontend';
var ignoreTheme         = '!./frontend';
var cssThemeFiles       = theme + '/css/scss_sources/**/*.scss';
var phpThemeFiles       = theme + '/*.php';
var jsThemeFiles        = theme + '/js/*.js';

var source              = './src/';
var destination         = './dist/';

var mainSass            = theme + '/css/scss_sources/main.scss';
var cssMinifyLocation   = [theme + '/*.css', theme + '/css/*.css', ignoreTheme + '/*.min.css', ignoreTheme + '/css/*.min.css'];

// Check
gulp.task('gulp', function() {
	return gutil.log('Gulp is running!');
});

// Compiler SASS en CSS, autoprefixer, minifier...
gulp.task('css', function(){
	return gulp.src(mainSass)
		// Import SASS Partials
		.pipe(plugins.sassGlob())
		// Compilation
		.pipe(plugins.sass({
			includePaths : [cssThemeFiles]
		}).on('error', plugins.sass.logError))
		// Auto préfixe CSS3...
		.pipe(plugins.autoprefixer())
		// Réordonne les propriétés CSS
		.pipe(plugins.csscomb())
		// Nettoie les indentations
		.pipe(plugins.cssbeautify({indent: '  '}))
		// Renommage
		.pipe(plugins.rename({ basename: 'style' }))
		// On envoie le style.css
		.pipe(gulp.dest(theme))
		// Minifier
		.pipe(plugins.csso())
		// On prépare le style.min.css
		.pipe(plugins.rename({ suffix: '.min' }))
		// On envoie le style.min.css
		.pipe(gulp.dest(theme));
});

// Minifier CSS
gulp.task('minify', function() {
	return gulp.src(cssMinifyLocation)
		.pipe(plugins.csso())
		.pipe(plugins.rename({ suffix: '.min' }))
		.pipe(gulp.dest(theme));
});

// Upload CSS modifiés

// Live Refresh Browser

// Compresser JS

// Upload JS

// Tâche "prod"
gulp.task('prod', ['css', 'minify']);

// Watch tasks
gulp.task('watch', function() {
	gulp.watch(cssThemeFiles, ['css']);
	// gulp.watch(phpThemeFiles, ['upload']);
	// gulp.watch(jsThemeFiles, ['js', 'upload']);
});

// The default task (called when you run 'gulp' from cli)
gulp.task('default', ['watch']);
