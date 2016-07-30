/*,
  "devDependencies": {
    "gulp": "^3.9.0",
    "gulp-inject": "^1.5.0",
    "gulp-jscs": "^2.0.0",
    "gulp-jshint": "^2.0.0",
    "gulp-nodemon": "^2.0.4",
    "jshint": "^2.9.1-rc1",
    "jshint-stylish": "^2.1.0",
    "wiredep": "^2.2.2"
  },

    gulp gulp-inject gulp-jscs gulp-jshint gulp-nodemon jshint jshint-stylish wiredep gulp-mocha chai bluebird
*/
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

var jsFiles = ['*.js', 'public/**/*.js', 'server/**/*.js', '!public/bower_components/**/*.js'];
var jsTestFiles = ['*.js','models/**/*.js','test/**/*.js'];
var nodemonEntryPoint = 'server.js';


gulp.task('mocha-test', function() {
//     return gulp.src(jsTestFiles, {read: false})
//         // gulp-mocha needs filepaths so you can't have any plugins before it
//         .pipe(mocha({reporter: 'spec',
//             clearRequireCache: true,
//             ignoreLeaks: true}));//'nyan'}));
// });
    return gulp.src(jsTestFiles, {read: false})
        .pipe(mocha({reporter: 'spec',
            clearRequireCache: true,
            ignoreLeaks: true}));
        // .once('error', function () {
        //     process.exit(1);
        // })
        // .once('end', function () {
        //     process.exit();
        // });
});

gulp.task('style', function () {
    gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css',
                             './public/js/*.js'
                             ,'./public/app/**/*.js'], {
        read: false
    });
    var injectOptions = {
        ignorePath: '/public'
    };
    var options = {
        verbose: true,
        bowerJson: require('./bower.json'),
        directory: './public/vendor',
        ignorePath: '../../public'
    };

    return gulp.src(['./server/includes/*.jade']) //,'./server/**/*.jade'] )
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./server/includes/'));
});

gulp.task('nodemon', ['style'], function () {  //'test',
    var options = {
        script: nodemonEntryPoint, //nodemonEntryPoint,
        delayTime: 1,
        env: {
            'PORT': 3000,
            'NODE_ENV': 'development'
        },
        watch: jsFiles
    };
    return nodemon(options)
        .on('restart', ['style'], function (ev) {
            console.log('Restarting .....');
            console.log('File changed on restart:\n' + ev);
        })
        .on('start', function (ev) {console.log('Starting .....');})
        .on('crash', function (ev) {console.log('CRASH  .....');})
        .on('exit', function (ev) {console.log('Clean exit .....');})
    ;
});

// Watch Files For Changes
gulp.task('test', ['style', 'mocha-test'], function() {
    gulp.watch(jsFiles, ['style']);
    gulp.watch([jsTestFiles], ['style', 'mocha-test']);
});
