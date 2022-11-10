const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
    origin: (origin, callback) => {
        // The origin variable may be null when we use softwares like Postman
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by Cors"));
        }
    },
    credentials: true,
    optionSuccessStatus: 200
};

module.exports = corsOptions;