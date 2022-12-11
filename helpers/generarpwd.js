var bcrypt = require('bcryptjs');

const generarpwd = (pwd = '') => {
    let salt = bcrypt.genSaltSync(10);
    nuevoPassword = bcrypt.hashSync(pwd, salt);
    return nuevoPassword
}
module.exports = {
    generarpwd
}