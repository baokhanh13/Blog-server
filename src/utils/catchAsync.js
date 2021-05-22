/**
 * Forward catch block to error handler
 */
module.exports = (fn) => (req, res, next) => fn(req, res, next).catch(next);
