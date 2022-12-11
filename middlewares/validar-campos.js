const { request, response } = require("express");
const { validationResult } = require("express-validator");
const validarCampos = (req = request, res = response, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
module.exports = {
    validarCampos,
};
