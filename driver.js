const events = require("./events");

//receive pickup driver event
//log driver pickup up orderId
//emit in transit event->caps

events.on("pickup-driver", (order) => {
    setTimeout(() => {
        console.log(`DRIVER: picked up ${order.orderID}`)
        events.emit("in-transit", order)
    }, 1000)
    setTimeout(() => {
        console.log(`DRIVER: delivered ${order.orderID}`)
        events.emit("delivered", order)
    }, 3000)
})