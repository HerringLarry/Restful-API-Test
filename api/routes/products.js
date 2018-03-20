const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
	res.status(200).json({
		message: 'Handling get requests to /products'
	});
});

router.post('/',(req, res, next) => {
	const product = {
		name: req.body.name,
		price: req.body.price
	};

	res.status(201).json({
		message: 'Handling POST requests to /products'
		createdProduct: product
	});
});

router.get('/:productID',(req, res, next) => {
	const id = req.params.productID;
	if(id == 'special'){
		res.status(200).json({
		message: 'You discovered the special ID',
		id: id

		});
	} else{
		res.status(200).json({
			message: 'BORING'
		})
	}
});

router.patch('/:productID',(req, res, next) => {
	res.status(200).json({
		message: 'you patched'
	});
});

router.delete('/:productID',(req, res, next) => {
	res.status(200).json({
		message: 'you deleted'
	});
});


module.exports = router;