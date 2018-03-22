const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
	res.status(200).json({
		message: 'orders were fetched'
	});
});

router.post('/', (req, res, next) =>{
	const order = {
		productID: req.body.productID,
		quantity: req.body.quantity
	};

	res.status(201).json({
		message: 'order was created',
		order: order
	});
});

router.get('/:orderID', (req, res, next) =>{
	res.status(200).json({
		message: 'order details',
		orderID: req.params.orderID
	});
});

router.delete('/:orderID', (req, res, next) =>{
	res.status(200).json({
		message: 'order deleted',
		orderID: req.params.orderID
	});
});

module.exports = router;