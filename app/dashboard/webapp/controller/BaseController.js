sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    'use strict';
    
    return Controller.extend("flight.app.dashboard.controller.BaseController", {
        onInit: function() {},

        getText: function (sLabel, aParameters) {
            const oResourceBundle = this.getOwnerComponent()
                                        .getModel("i18n")
                                        .getResourceBundle();


            return oResourceBundle.getText(sLabel, aParameters);
        }
    });
});