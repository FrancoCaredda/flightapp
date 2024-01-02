sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require([
        "flight/app/createuser/unit/test/unit/AllTests"
    ], function() {
        QUnit.start();
    });
});