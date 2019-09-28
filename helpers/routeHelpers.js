const joi = require("joi"); 

module.exports = { 
    validateBody: (schema) => { 
        return (req, res, next) => { 
            const result = joi.validate(req.body, schema)
            if (result.error) { 
                return res.json(result.error)
            }
            if (!req.value) { 
                req.value = {};
            }
            req.value['body'] = result.value;
            next();
        }
    }, 
    schemas: { 
        authSchema: joi.object().keys({ 
            name: joi.string(),
            username: joi.string().email({ minDomainSegments: 2 }).required(),
            password: joi.string().required()
        })
    }
}