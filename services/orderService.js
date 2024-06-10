const orderModel = require('../models/orderModel');

module.exports = {
    getAllOrders(callback) {
        orderModel.getAll(callback);
    },
    getOrderById(id, callback) {
        orderModel.getById(id, callback);
    },
    createOrder(orderData, callback) {
        orderModel.create(orderData, callback);
    },
    updateOrder(id, orderData, callback) {
        orderModel.update(id, orderData, callback);
    },
    deleteOrder(id, callback) {
        orderModel.delete(id, callback);
    }
};
