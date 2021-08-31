const events = require("./events");

require("./vendor");
require("./driver")

events.on("pickup", (order) => {
    const output = {
        event: "pickup",
        time: new Date(),
        payload: order
    }
    console.log(`EVENT: ${JSON.stringify(output, null, 2)}`);
    events.emit("pickup-driver", order)
})

events.on("in-transit", (order) => {
    const output = {
        event: "in-transit",
        time: new Date(),
        payload: order
    }
    console.log(`EVENT: ${JSON.stringify(output, null, 2)}`);
})

events.on("delivered", (order) => {
    const output = {
        event: "delivered",
        time: new Date(),
        payload: order
    }
    console.log(`EVENT: ${JSON.stringify(output, null, 2)}`);
    events.emit("delivered-vendor", order)
})