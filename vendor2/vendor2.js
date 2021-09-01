require("dotenv").config();

const faker = require("faker")
const port = "http://localhost:3000"
const io = require('socket.io-client');

const capsConnection = io.connect(`${port}/caps`)


setInterval(() => {
    const order = generateOrder();
    capsConnection.emit("pickup", order)
}, 5000)



function generateOrder() {
    return {
        store: process.env.STORE2_NAME,
        orderID: faker.datatype.uuid(),
        customer: faker.name.findName(),
        address: `${faker.address.city()}, ${faker.address.state()}`
    }
}


capsConnection.on("connection", (socket)=>{
    socket.on("delivered",(order)=>{
        console.log(`Thank you for delivering ${order.orderID} to ${order.store}`)
    })
})



