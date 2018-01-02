require('dotenv').config({path: '../.env'});

const express       = require('express')
const app           = express();
const bodyParser    = require('body-parser');

const knexConfig    = require('../knexfile');
const knex          = require('knex')(knexConfig);
const bookshelf     = require('bookshelf')(knex);

const stripe        = require('stripe')(process.env.STRIPE_SK);


// MARK: boilerplate express setup
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
app.listen(8080, ()=>{
    console.log('listening on port 8080')
});


// MARK: bookshelf models for cars, orders, payments, customers
const Car = bookshelf.Model.extend({
    tableName: 'cars'
});

const Order = bookshelf.Model.extend({
    tableName: 'orders'
});

const Payment = bookshelf.Model.extend({
    tableName: 'payments'
});

const Customer = bookshelf.Model.extend({
    tableName: 'customers'
});


function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


// MARK: get - routes
app.get('/cars/', (req, res) => {

    Car.fetchAll()
        .then(result => {
            const cars = result.models.map(car => {
                return car.attributes;
            })

            res.send(cars);
        }); 
});

app.get('/cars/search/:category/:searchTerm', (req, res) => {
    let searchCategory  = req.params.category;
    let searchTerm      = req.params.searchTerm;

    let splitSearchTerm = searchTerm.split(" ");

    let anyArray = splitSearchTerm.map((term) => {
        return `%${term.toLowerCase()}%`;
    });

    let whereClause = "";
    if (searchCategory === "all") {
        whereClause = "WHERE car_description LIKE ANY(?)";
    } else {
        whereClause = `WHERE car_category='${searchCategory}' AND car_description LIKE ANY(?)`;
    }

    knex.raw(`SELECT * FROM cars ${whereClause}`, [anyArray])
        .then((resp) => {
            res.send(resp.rows);
        });
});

app.get('/cars/:category', (req, res) => {
    let category = req.params.category;

    Car.where({"car_category": category})
        .fetchAll()
        .then(result => {
            const cars = result.models.map(car => {
                return car.attributes;
            })
            
            res.send(cars);
        })
});


// MARK: Stripe APIs
app.post('/create-charge', (req, res) => {
    let tokenId     = req.body.tokenId;
    let carId       = req.body.carId;
    let category    = req.body.category;
    let type        = req.body.type;
    let color       = req.body.color;
    let amount      = req.body.amount;

    /* Query customer info - hardcoded customer id */
    Customer.where({"id": 1})
        .fetch()
        .then(result => {
            let customer = result.attributes;

            let carType = toTitleCase(type);

            stripe.charges.create({
                "amount": amount * 100, 
                "currency": "cad",
                "source": tokenId,
                "description": `Charge for ${customer.email_address} for a ${category.toUpperCase()} - ${carType} (${color})`
            }, function(err, charge) {
                if (err) {
                    res.send({ error: err });
                    return;
                }
        
                const newOrder = new Order({
                    customer_id: customer.id, 
                    car_id: carId, 
                    order_amount: (Number(charge.amount) / 100).toFixed(2)
                });
                
                newOrder.save().then(order => {
                    const newPayment = new Payment({
                        customer_id: customer.id,
                        order_id: order.attributes.id,
                        payment_method: charge.source.brand,
                        payment_amount: order.attributes.order_amount,
                        stripe_charge_id: charge.id,
                        payment_method_last_4: charge.source.last4
                    });
        
                    newPayment.save().then(payment => {
                        res.send({order: order.attributes, payment: payment.attributes});
                    });
                });
            });
        });
});