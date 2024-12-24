const { logEvents } = require("./logevents")

const errorHandler = (err , req , res , next) => {
    logEvents(`${err.name}: ${err.message}`);
    console.error(err.stack);
    res.status(500).send(err.message);
    next()
}

module.exports = errorHandler;