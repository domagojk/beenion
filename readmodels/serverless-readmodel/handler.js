"use strict";
exports.__esModule = true;
exports.hello = function (event, context, cb) {
    console.log(event);
    var response = {
        statusCode: 200,
        body: ''
    };
    cb(null, response);
};
//# sourceMappingURL=handler.js.map