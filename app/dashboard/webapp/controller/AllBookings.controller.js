sap.ui.define([
    "flight/app/dashboard/controller/BaseController",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "flight/app/dashboard/utils/BookingServiceFacade",
    "flight/app/dashboard/model/formatter"
], function(Controller, MessageBox, JSONModel, BookingServiceFacade, formatter) {
    'use strict';
    
    return Controller.extend("flight.app.dashboard.controller.AllBookings", {
        formatter: formatter,
        onInit: function(oEvent) {
            this.getView().setModel(new JSONModel({
                createBookingDialog: {}
            }), "viewModel");
        },
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
        },
        onCreateBookingButtonPressed: async function(oEvent) {
            if (!this.__createBookingDialog) {
                this.__createBookingDialog = await this.loadFragment({
                    name: "flight.app.dashboard.view.fragments.dialog.CreateBookingDialog"
                });
            }

            this.__createBookingDialog.open();
        },
        __clearCreateBookingDialogData: function() {
            const oViewModel = this.getView().getModel("viewModel");
            oViewModel.setProperty("/createBookingDialog", {});
            oViewModel.refresh();
        },
        onCreateBookingDialogClosed: function(oEvent) {
            this.__clearCreateBookingDialogData();
            this.__createBookingDialog.close();
        },
        onCreateBookingDialogConfirmPressed: async function(oEvent) {
            const oViewModel = this.getView().getModel("viewModel");
            const oDataModel = this.getOwnerComponent().getModel();

            let oData = oViewModel.getProperty("/createBookingDialog");
            oData.airlineID = oData.airlineID.toUpperCase();
            oData.user_ID = this.getView().getBindingContext().getProperty("ID");
            
            try {
                await BookingServiceFacade.createEntity(oDataModel,
                    oData, 
                    "/Bookings");
                    
                MessageBox.success(this.getText("userdetail.objectpage.section1.subsection1.table.action1.success"));

                const oEventBus = sap.ui.getCore().getEventBus();
                oEventBus.publish("refreshUserDetail", "AllBookingsToDetailPage", null);
            } catch(e) {
                MessageBox.error((e.message) ? e.message : e);
            } finally {
                this.__clearCreateBookingDialogData();
                this.__createBookingDialog.close();
            }
        }
    });
});