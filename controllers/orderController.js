const orderService = require('../services/orderService');

module.exports = {
    getAllOrders(req, res) {
        orderService.getAllOrders((err, orders) => {
            if (err) return res.status(500).send("Erro ao recuperar as ordens.");
            res.render('orders', { orders });
        });
    },
    getOrderById(req, res) {
        const id = req.params.id;
        orderService.getOrderById(id, (err, order) => {
            if (err) return res.status(500).send("Erro ao recuperar a ordem.");
            res.render('edit', { order });
        });
    },
    createOrder(req, res) {
        const orderData = req.body;
        orderService.createOrder(orderData, (err) => {
            if (err) return res.status(500).send("Erro ao adicionar a ordem.");
            res.redirect('/orders');
        });
    },
    updateOrder(req, res) {
        const id = req.params.id;
        const orderData = req.body;
        orderService.updateOrder(id, orderData, (err) => {
            if (err) return res.status(500).send("Erro ao atualizar a ordem.");
            res.redirect('/orders');
        });
    },
    deleteOrder(req, res) {
        const id = req.params.id;
        orderService.deleteOrder(id, (err) => {
            if (err) return res.status(500).send("Erro ao excluir a ordem.");
            res.redirect('/orders');
        });
    }
};