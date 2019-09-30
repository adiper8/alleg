import express from 'express';
import bodyParser from 'body-parser';
import userRoute from'./routes/userRoute';
import menuRoute from './routes/menuRoute'

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

userRoute(app)
menuRoute(app)

app.listen(port,()=>{
    console.log('server is running - listening port 3000')
})

module.exports = app



