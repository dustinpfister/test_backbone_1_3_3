let express = require('express'),
path = require('path'),
klaw = require('klaw'),
through2 = require('through2'),
app = express(),

port = process.env.PORT || process.argv[2] || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {

    let demos = []

    klaw(path.join(__dirname, 'views/demos'), {
        depthLimit: 1
    })

    // filter demos folder
    .pipe(through2.obj(function (item, enc, next) {

            if (path.basename(item.path) != 'demos') {
                this.push(item);
            }
            next();

        }))

    // only directories
    .pipe(through2.obj(function (item, enc, next) {

            if (item.stats.isDirectory()) {
                this.push(item);
            }
            next();

        }))

    // for each item
    .on('data', function (item) {

        // create objects for each item
        demos.push({
            name: path.basename(item.path)
        });

    })

    .on('end', function () {

        res.render('index', {

            demos: demos

        });

    });

});

app.get(/demos\/.+/, function (req, res) {

    res.render('demo', {});

});

app.listen(port, function () {

    console.log('app is up on port: ' + port);

});
