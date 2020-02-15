var express = require('express');
var bodyParser = require('body-parser')
var app = express();


const tracer = require('dd-trace').init()
const span = tracer.startSpan('web.request')

span.setTag('my_tag', 'my_value')
span.finish()
// set the view engine to ejs
// app.set('view engine', require('ejs').renderFile)
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.render('index.html')
})

app.post('/add', (req, res) => {
    const userValue = {
        name: req.body.name,
        lastname: req.body.lastname
    }
    res.render('mypage.html', {
        user: userValue
        })
})

app.listen(3000,function(){
    console.log('server running on port 3000');
})
