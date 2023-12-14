sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function(Controller, History) {
    'use strict';
    
    return Controller.extend("flight.app.dashboard.controller", {
        onGoBackButtonPressed: function(oEvent) {
            const oHistrory = History.getInstance();
            const sHash = oHistrory.getPreviousHash();

            if (sHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getOwnerComponent().getRouter().navTo("RouteHome");
            }
        }
    });
});