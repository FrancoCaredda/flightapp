sap.ui.define([
    "flight/app/dashboard/controller/BaseController",
    "sap/m/MessageBox",
    "flight/app/dashboard/utils/BookingServiceFacade",
    "flight/app/dashboard/model/formatter"
], function(Controller, MessageBox, BookingServiceFacade, formatter) {
    'use strict';
    
    return Controller.extend("flight.app.dashboard.controller.AllBookings", {
        formatter: formatter,
        onDeleteBookingButtonPressed: async function(oEvent) {
            const oDataModel = this.getOwnerComponent().getModel();
            const oTable = this.getView().byId("BookingsTable");
            const aSelectedItems = oTable.getSelectedItems();

            if (aSelectedItems.length === 0) {
                MessageBox.error(this.getText("userdetail.objectpage.section1.subsection1.table.action2.error1"));
                return;
            }

            const aPromises = aSelectedItems.map(oItem => oItem.getBindingContext())
                                            .map(oContext => oContext.getProperty("ID"))
                                            .map(sId => BookingServiceFacade.deleteEntity(oDataModel, sId, "/Bookings"));
            
            try {
                await Promise.all(aPromises);
                MessageBox.success(this.getText("userdetail.objectpage.section1.subsection1.table.action2.success"));

                const oEventBus = sap.ui.getCore().getEventBus();
                oEventBus.publish("refreshUserDetail", "AllBookingsToDetailPage", null);
            } catch (e) { 
                MessageBox.error((e.message) ? e.message : e);
            }
        }
    });
});