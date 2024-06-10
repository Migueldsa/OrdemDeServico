const db = require('../config/db');

const Order = {
    create: (order, callback) => {
        db.run(`INSERT INTO orders (orderNumber, customerName, date, product, repairCost) VALUES (?, ?, ?, ?, ?)`,
            [order.orderNumber, order.customerName, order.date, order.product, order.repairCost], function(err) {
                if (err) {
                    return callback(err);
                }
                const orderId = this.lastID;
                db.run(`INSERT INTO productDescriptions (productId, description) VALUES (?, ?)`,
                    [orderId, order.description], (err) => {
                        callback(err, { id: orderId, ...order });
                    });
            });
    },
    update: (id, order, callback) => {
        db.run(`UPDATE orders SET orderNumber = ?, customerName = ?, date = ?, product = ?, repairCost = ? WHERE id = ?`,
            [order.orderNumber, order.customerName, order.date, order.product, order.repairCost, id], (err) => {
                if (err) {
                    return callback(err);
                }
                db.run(`UPDATE productDescriptions SET description = ? WHERE productId = ?`,
                    [order.description, id], callback);
            });
    },
    delete: (id, callback) => {
        db.run(`DELETE FROM orders WHERE id = ?`, [id], (err) => {
            if (err) {
                return callback(err);
            }
            db.run(`DELETE FROM productDescriptions WHERE productId = ?`, [id], callback);
        });
    },
    getAll: (callback) => {
        db.all(`SELECT orders.*, productDescriptions.description FROM orders
                LEFT JOIN productDescriptions ON orders.id = productDescriptions.productId`, [], callback);
    },
    getById: (id, callback) => {
        db.get(`SELECT orders.*, productDescriptions.description FROM orders
                LEFT JOIN productDescriptions ON orders.id = productDescriptions.productId WHERE orders.id = ?`, [id], callback);
    }
};

module.exports = Order;
