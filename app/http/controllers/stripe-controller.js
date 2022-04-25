const stripe = require('stripe')("sk_test_51Kevl1SFKShQSTPWkzHvtrdkS5Adu40BNHcBlLBOrfrskmpngubCmCNDpqyLrhK0KkfqTGgfXh7ymRgq1MmD11wz00kzpJ0Csp")

const stripeController = {
    async payment(req, res) {

        const customer = await stripe.customers.create({
            name: 'ayush',
            email: 'ayush@gmail.com',
            address:{
                line1: 'lalganj',
                postal_code: "231211",
                city: "",
                state: "U.P",
                country: "INDIA"
            }

        })
        const paymentIntent = await stripe.paymentIntents.create(
            {
                amount: req.body.amount,
                currency: 'usd',
                description:"Mango factory",
                shipping: {
                    name: 'Jenny Rosen',
                    address: {
                      line1: '510 Townsend St',
                      postal_code: '98140',
                      city: 'San Francisco',
                      state: 'CA',
                      country: 'US',
                    },
                  },
                automatic_payment_methods: {
                        enabled: true,
                      },
                },
            )
            
            res.send({clientSecret: paymentIntent.client_secret, customer})
    }
}

module.exports = stripeController