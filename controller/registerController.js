const knex = require("../config/dbconfig");

exports.register = (req, res) => {
    /**
        * Request Validation
        */
    if (!req.body || JSON.stringify(req.body) == "{}") {
        console.log({ "registerController": "request body con't be empty" })
        return res.status(400).send({
            message: "Request body can not be empty",
            status: 400
        });
    }
    if (!req.body.name || req.body.name == "") {
        return res.status(400).send({
            message: "name  can not be empty",
            status: 400
        });
    }
    if (!req.body.email || req.body.email == "") {
        return res.status(400).send({
            message: "Email can not be empty",
            status: 400
        });
    }
    if (!req.body.mobile || req.body.mobile == "") {
        return res.status(400).send({
            message: "User mobile can not be empty",
            status: 400
        });
    }
    if (!req.body.designation || req.body.designation == "") {
        return res.status(400).send({
            message: "designation  can not be empty",
            status: 400
        });
    }
    if (!req.body.date_of_joining || req.body.date_of_joining == "") {
        return res.status(400).send({
            message: "date_of_joining can not be empty",
            status: 400
        });
    }


    // Storing User details in database


    // checking user exist or not
    knex
        .select('*').from('contactDetails')
        .where({ "email": req.body.email })
        .then((data) => {

            if (data.length == 0) {
                // inserting user details
                knex.select('*').from('contactDetails')
                    .insert(req.body)
                    .then(() => {
                        res.status(200).send({
                            message: "Your account is successfully created",
                            name: req.body.name,
                            status: 200
                        })

                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: err || "Some error occurred while create users account.",
                            status: 500
                        });
                    })
            } else {
                res.status(400).send({
                    message: "Your account is already exist",
                    status: 400
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message: err || "Some error occurred while finding users account.",
                status: 500
            });
        })


}
// updating user contact details
exports.updateContactDetails = (req, res) => {

    if (!req.body || JSON.stringify(req.body) == "{}") {
        console.log({ "registerController": "updateRegisterDetails:request body con't be empty. plz enter email for updating contact details" })
        return res.status(400).send({
            message: "Request body can not be empty. plz enter email for updating contact details",
            status: 400
        });
    }
    if (!req.body.email || req.body.email == "") {
        return res.status(400).send({
            message: "Email can not be empty",
            status: 400
        });
    }

    knex.select("*").from('contactDetails').where("email", req.body.email).update({
            "name": req.body.name,
            "mobile": req.body.mobile,
            "designation": req.body.designation,
            "date_of_joining": req.body.date_of_joining,
        }

        ).then(() => {
            res.status(200).send({
                message: "Your account updated seccessfully",
                status: 200,
            })
        }).catch((err) => {
            res.status(500).send({
                message: err || "user not found",
                status: 500
            })
        })
}
// delete user account 
exports.deleteRegister = (req, res) => {

    /**
            * Request Validation
            */
    if (!req.body || JSON.stringify(req.body) == "{}") {
        console.log({ "registerController": `request body con't be empty. plz enter email for Delete contact details` })
        return res.status(400).send({
            message: "Request body can not be empty. plz enter email for Delete contact details",
            status: 400
        });
    }
    if (!req.body.email || req.body.email == "") {
        return res.status(400).send({
            message: "Email can not be empty",
            status: 400
        });
    }

    knex.select("*").from("contactDetails").where("email", req.body.email)
    .del().then(() => {
        res.status(200).send({
            message: "successfully your account is deleted",
            status: 200
        })
    }).catch((err) => {
        res.status(500).send({
            message: err || "user not found",
            status: 500
        })
    })
}
// Get contact details of user

exports.getContactDetails = (req, res) => {
    /**
       * Request Validation
       */
    if (!req.body || JSON.stringify(req.body) == "{}") {
        console.log({ "registerController": "request body con't be empty. plz enter email for geting contact details"})
        return res.status(400).send({
            message: "Request body can not be empty. plz enter email for geting contact details",
            status: 400
        });
    }
    if (!req.body.email || req.body.email == "") {
        return res.status(400).send({
            message: "Email can not be empty",
            status: 400
        });
    }

    knex.select("*").from("contactDetails").where("email", req.body.email)
        .then((result) => {
            res.status(200).send({
                message: result,
                status: 200,
            })
        }).catch((err) => {
            res.status(500).send({
                message: err || "Some error occurred while geting user Details by Email.",
                status: 500
            })
        })
}
//Get all user contact details

exports.getAllContactDetails = (req, res) => {
    knex.select("*").from("contactDetails").then((results) => {
        res.status(200).send({
            message: results,
            status: 200
        })
    }).catch((err) => {
        res.status(500).send({
            message: err || "Some error occurred while geting user Details.",
            status: 500
        })
    })
}