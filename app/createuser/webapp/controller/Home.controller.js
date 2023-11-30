sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "flight/app/createuser/utils/BookingServiceFacade"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, BookingServiceFacade) {
        "use strict";

        return Controller.extend("flight.app.createuser.controller.Home", {
            getText: function(sLabel, aParams) {
                const oResourceModel = this.getOwnerComponent().getModel("i18n");
                const oBundle = oResourceModel.getResourceBundle();

                return oBundle.getText(sLabel, aParams);
            },
            onInit: function () {
                this.getView().setModel(new JSONModel({
                    customer: {},
                    address: {}
                }), "viewModel");
            },
            onUserCreate: async function(oEvent) {
                const oDataModel = this.getOwnerComponent().getModel();
                const oViewModel = this.getView().getModel("viewModel");
                let oCustomer = oViewModel.getProperty("/customer");
                let oAddress  = oViewModel.getProperty("/address");

                debugger;
                try {
                    const oAddressEntity = await BookingServiceFacade.createEntity(oDataModel, oAddress, "/Addresses");

                    oCustomer.address_ID = oAddressEntity.ID;

                    await BookingServiceFacade.createEntity(oDataModel, oCustomer, "/Users");
                    MessageBox.success(this.getText("overview.form.toolbar.action1.success"))
                } catch (err) {
                    MessageBox.error((err.message) ? err.message : err);
                    console.log(err);
                }
            }
        });
    });
