let fs = require('fs')
let express = require('express');
let path = require('path');
let app = express();
let routesArr = require('./routes');
let velocity = require('velocityjs');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/undefined', express.static(path.join(__dirname, 'views/webapp/')));

console.log('routesArr :' + routesArr)
const PROJECT_ROOT =  path.join(__dirname, 'views/');
routesArr.map((file) => {
  file.template = path.join(PROJECT_ROOT, file.template);
  console.log('file.template:' + file.template)
  return file;
});
routesArr.forEach((data) => {
    console.log('routesArr: ' + data)
  app.get(data.url, function (req, res) {
    let engine = null;
    let result = '';
    console.log(data)
      var macros = {
          parse: function(file) {
              console.log("当前文件" + file)
              var lu = path.join(PROJECT_ROOT, 'webapp/WEB-INF/velocity/');
              var template = fs.readFileSync(lu + file).toString();
              // console.log("当前路径" + lu + '/views/' + file)
              console.log("当前路径" + lu + file);
              return this.eval(template);
          },
          screen_content: function() {
              console.log('hashfhasdhf');
              return "";
          }
      }

    // let vmPath= velocity.render(data.template, data.renderVar)
    let template = fs.readFileSync(data.template).toString();
    result = velocity.render(template, data.renderVar,macros);
    res.send(result);
  });
});

let server = app.listen(8181, () => {
  let host = server.address().address;
  let port = server.address().port;
});