//initialize socket.io
require("dotenv").config();
const port = process.env.PORT
const io = require('socket.io')(port);
//create CAPS namespace
const caps = io.of("/caps");
require("./driver/driver")
require("./vendor1/vendor")
require("./vendor2/vendor2")

caps.on("connection", (socket) => {

    //basically saying when a socket sends this:
    socket.on("pickup", (order) => {
        const output = {
            event: "pickup",
            time: new Date(),
            payload: order
        }
        console.log(`EVENT: ${JSON.stringify(output, null, 2)}`);
        socket.join(`${order.store}`)
        caps.emit("pickup", order)
    })

    socket.on("in-transit", (order) => {
        const output = {
            event: "in-transit",
            time: new Date(),
            payload: order
        }
        console.log(`EVENT: ${JSON.stringify(output, null, 2)}`);

        caps.to(`${order.store}`).emit("in-transit", order)
    })

    socket.on("delivered", (order) => {
        const output = {
            event: "delivered",
            time: new Date(),
            payload: order
        }
        console.log(`EVENT: ${JSON.stringify(output, null, 2)}`);

        caps.to(`${order.store}`).emit("delivered", order)
    })

})





