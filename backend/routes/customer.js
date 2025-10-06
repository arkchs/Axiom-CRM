const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Customer created
 *       400:
 *         description: Bad request
 */
router.post("/", customerController.createCustomer);

const ensureAuthenticated = require("../middleware/auth");
/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: List of customers
 */
router.get("/", ensureAuthenticated, customerController.getCustomers);

module.exports = router;
