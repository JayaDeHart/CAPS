require("dotenv").config();

const faker = require("faker")
const port = "http://localhost:3000"
const io = require('socket.io-client');

const capsConnection = io.connect(`${port}/caps`)

function generateOrder() {
    return {
        store: process.env.STORE_NAME,
        orderID: faker.datatype.uuid(),
        customer: faker.name.findName(),
        address: `${faker.address.city()}, ${faker.address.state()}`
    }
}


//need to get the socket sending the order to subscribe to the storeName room
//but I can't put it in the capsConnection.on because then nothing ever starts


setInterval(() => {
    const order = generateOrder();
    capsConnection.emit("pickup", order)
}, 5000)

capsConnection.on("connection", (socket)=>{
    
    

    socket.on("delivered",(order)=>{
        console.log(`Thank you for delivering ${order.orderID} to ${order.store}`)
    })
})



