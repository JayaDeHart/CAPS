require("dotenv").config();

const port = "http://localhost:3000"
const io = require('socket.io-client');

const capsConnection = io.connect(`${port}/caps`);

capsConnection.on("pickup", (order) => {
    setTimeout(() => {
        console.log(`DRIVER: picked up ${order.orderID}`)
        capsConnection.emit("in-transit", order)
    }, 1000)
    setTimeout(() => {
        console.log(`DRIVER: delivered ${order.orderID}`)
        capsConnection.emit("delivered", order)
    }, 3000)
})


