const Joi = require('joi');

const nameRegExp = '^[-\\s\\.A-Za-z]*$'
const phoneRegExp = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\.0-9]{7,12}$';

const schemaCreateContact = Joi.object({
    name: Joi.string()
        .pattern(new RegExp(nameRegExp))
        .min(1)
        .max(30)
        .required(),

    phone: Joi.string()
        .pattern(new RegExp(phoneRegExp))
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 1, tlds: { allow: true } }),

    favorite: Joi.boolean()
})
    .with('name', 'phone');

const schemaUpdateContact = Joi.object({
    name: Joi.string()
        .pattern(new RegExp(nameRegExp))
        .min(1)
        .max(30),

    phone: Joi.string()
        .pattern(new RegExp(phoneRegExp )),

    email: Joi.string()
        .email({ minDomainSegments: 1, tlds: { allow: true } }),

    favorite: Joi.boolean()
});

const validate = async (schema, obj, next)=>{
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
    validateCreateContact: (req,res,next)=>validate(schemaCreateContact,req.body,next),
    validateUpdateContact: (req,res,next)=>validate(schemaUpdateContact,req.body,next)
};