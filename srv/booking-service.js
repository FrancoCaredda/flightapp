const cds = require("@sap/cds");

module.exports = cds.service.impl((srv) => {
    function checkExistence(value) {
        return value !== null && value !== undefined;
    }

    // Users validation
    srv.before(["CREATE", "UPDATE"], "Users", (req) => {
        const {email, phoneNumber} = req.data;

        if (!checkExistence(email) &&
            !checkExistence(phoneNumber)) {
            req.error(400, "One of the properties has to be specified: [email, phoneNumber]");
        }

        const rEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (checkExistence(email) && !rEmail.test(email)) {
            req.error(400, "The email property doesn't match the standard format");
        }
    });

    // Bookings validation
    srv.before("CREATE", "Bookings", async (req) => {
        const { Bookings } = srv.entities;
        const { flightDate, user_ID } = req.data;

        const tx = srv.tx(req);
        const results = await tx.run( SELECT.from(Bookings)
                                          .columns("COUNT(ID)")
                                          .where(`flightDate = '${flightDate}' AND user_ID = '${user_ID}'`) );


        
        if (results[0].COUNT > 0) {
            req.error(400, "Current user has already prenotated a flight");
        }
    });

    // Bookings generate ID
    srv.before("CREATE", "Bookings", async (req) => {
        const { Bookings } = srv.entities;

        const tx = srv.tx(req);
        const results = await tx.run( SELECT.from(Bookings)
                                .columns("MAX(ID)"));
        
        req.data.ID = results[0].MAX + 1;
    });
});