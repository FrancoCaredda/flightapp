sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel) {
        "use strict";

        return Controller.extend("flight.app.dashboard.controller.Home", {
            onInit: function () {
                this.getView().setModel(new JSONModel({
                    filterBar: {}
                }), "viewModel");
            },
            onFilterBarSearchPressed: function(oEvent) {
                const oViewModel = this.getView().getModel("viewModel");
                const oTable = this.getView().byId("CustomerTable");

                const oFilterBarData = oViewModel.getProperty("/filterBar");
                const aKeys = Object.keys(oFilterBarData);

                const aFilters = aKeys.map((sKey) => new Filter({
                    path: sKey,
                    operator: FilterOperator.Contains,
                    value1: oFilterBarData[sKey]
                })).filter((oFilter) => oFilter.getValue1() !== undefined);

                oTable.getBinding("items").filter(aFilters);
            },
            onNavToUserDetailPressed: function(oEvent) {
                const oRouter = this.getOwnerComponent().getRouter();
                const oBindingContext = oEvent.getSource().getBindingContext();

                oRouter.navTo("UserRoute", {
                    id: oBindingContext.getProperty("ID")
                });
            }
        });
    });
