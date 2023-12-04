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

            const oEventBus = sap.ui.getCore().getEventBus();
            oEventBus.subscribe("refreshUserDetail", "AllBookingsToDetailPage", this.__onRefreshRequested, this);
        },
        __onPatternMatched: function(oEvent) {
            const sId = oEvent.getParameters().arguments.id;

            const oDataModel = this.getOwnerComponent().getModel();
            const oBinding = oDataModel.bindContext(`/Users(${sId})`, null, {
                $expand: 'bookings($expand=class),address'
            });

            this.getView().byId("page").setBindingContext(oBinding.getBoundContext());
        },
        __onRefreshRequested: function(sEventName, sChannel, oData) {
            this.getView().byId("page").getBindingContext().refresh();
        }
    });
});