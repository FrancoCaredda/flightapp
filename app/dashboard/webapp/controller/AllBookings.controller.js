sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "flight/app/dashboard/model/formatter"
], function(Controller, formatter) {
    'use strict';
    
    return Controller.extend("flight.app.dashboard.controller.AllBookings", {
        formatter: formatter
    });
});