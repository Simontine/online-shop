const orderService = require("../services/order.service");
const userService = require("../services/user.service");
//const cartService = require("../services/cart.service");

const createOrder = async (req, res) => {
  const { total_amount, payment_method, cart ,address } = req.body;
  const user_id = req.user.id; // comes from token verification
 
  const newOrder = await orderService.createOrder({
    cart,
    total_amount,
    user_id,
    payment_method,
  });
  const {province, surburb, street, city}=address;

  const addr= await userService.createUserAddress({
    province, surburb, street, city, user_id
  });
  
  res.status(201).json(
    {newOrder,addr});
};

const getAllOrders = async (req, res) => {
  const { page = 1 } = req.query;
  const userId = req.user.id;

  const orders = await orderService.getAllOrders(userId, page);
  res.json(orders);
};

const getOrder = async (req, res) => {
  const {id} = req.params;
  const userId = req.user.id;

  const order = await orderService.getOrderById({ id, userId });
  res.json(order);
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrder,
};
