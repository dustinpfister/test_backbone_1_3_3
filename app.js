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

    klaw(path.join(__dirname, 'views/demos'))

    // only directories
    .pipe(through2.obj(function (item, enc, next) {

            if (item.stats.isDirectory()) {
                this.push(item);
            }
            next();

        }))

    .on('data', function (item) {

        console.log(item.path);

    })

    .on('end', function () {

        res.render('index', {});

    });

});

app.listen(port, function () {

    console.log('app is up on port: ' + port);

});
