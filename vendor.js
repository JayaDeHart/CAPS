const events = require("./events");
require("dotenv").config();
const faker = require("faker")



setInterval(() => {
    const order = generateOrder();
    events.emit("pickup", order)
}, 5000)


events.on("delivered-vendor", (order) => {
    console.log(`Thank you for delivering ${order.orderID}`)
})


function generateOrder() {
    return {
        store: process.env.STORE_NAME,
        orderID: faker.datatype.uuid(),
        customer: faker.name.findName(),
        address: `${faker.address.city()}, ${faker.address.state()}`
    }
}

