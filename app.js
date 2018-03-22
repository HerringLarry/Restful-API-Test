const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const dotenv = require(dotenv). config();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//Weird fix
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://wnewman000:' + process.env.MM + '@cluster0-shard-00-00-pjbzw.mongodb.net:27017,cluster0-shard-00-01-pjbzw.mongodb.net:27017,cluster0-shard-00-02-pjbzw.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
	function(err, db){
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }},
    {
    	useMongoClient: true
    });



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); //Body-Parser for handinling
app.use(bodyParser.json());


//Handles CORS stuff
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if(req.method=='OPTIONS'){
		res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
	const error = new Error('not found');
	error.status = 404
	next(error);
});


app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error:
		{
			message: error.message
		}
	});
});

module.exports = app;