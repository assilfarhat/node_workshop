var product = require('../products.json')
var express = require('express');
var router = express.Router();

router.get('/', (req, res, next)=> {
    res.json(product);
});

router.get('/:id', (req, res, next)=> {
    res.json(product[req.params.id]);
});



router.get('/instock/:qt', (req, res) => {
    const qt = parseInt(req.params.qt, 10);
    const filteredProducts = Object.values(product).filter(product => product.stock >= qt);

    if (filteredProducts.length === 0) {
        return res.status(404).json({ message: 'No products in stock with the specified quantity' });
    }

    res.status(200).json({ products: filteredProducts });
});

router.get('/:id/:qt', (req, res, next)=> {
    res.json({
        id : req.params.id,
        qt : req.params.qt,
        unit_price : Math.floor(product[req.params.id].price),
        total_price : Math.floor(product[req.params.id].price) * req.params.qt,
    });
});


module.exports = router;