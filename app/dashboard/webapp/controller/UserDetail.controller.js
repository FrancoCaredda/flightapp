sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    'use strict';
    
    return Controller.extend("flight.app.dashboard.controller.UserDetail", {
        onInit: function() {
            this.getOwnerComponent()
                .getRouter()
                .getRoute("UserRoute")
                .attachPatternMatched(this.__onPatternMatched, this);
        },
        __onPatternMatched: function(oEvent) {
            debugger;
            const sId = oEvent.getParameters().arguments.id;

            const oDataModel = this.getOwnerComponent().getModel();
            const oBinding = oDataModel.bindContext(`/Users(${sId})`, null, {
                $expand: 'bookings($expand=class),address'
            });

            this.getView().byId("page").setBindingContext(oBinding.getBoundContext());
        }
    });
});