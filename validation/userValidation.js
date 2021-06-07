const Joi = require('joi');
const mongoose = require('mongoose');

const passwordRegExp = '^[-\\.\\$\\#\\w]*$';

const schemaUser = Joi.object({

    email: Joi.string()
        .email({ minDomainSegments: 1, tlds: { allow: true } })
        .required(),

    password: Joi.string()
        .pattern(new RegExp(passwordRegExp))
        .min(1)
        .max(30)
        .required(),

    subscription: Joi.string()
        .optional()

})
    .with('email', 'password');

const isMongoIdValid = (req, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
        return next({
            status: 400,
            message: 'Invalid ObjectId',
        });
    };
    next();
};

const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj);
        next();
    }
    catch (err) {
        next({
            status: 400,
            message: err.message.replace(/"/g, '')
        });
    };
};

module.exports = {
    validateUser: (req, res, next) => validate(schemaUser, req.body, next),
    validateMongoId: (req, res, next) => isMongoIdValid(req, next)
};