sap.ui.define(["sap/ui/core/library", 'sap/uxap/BlockBase'], function (coreLibrary, BlockBase) {
	"use strict";

	var ViewType = coreLibrary.mvc.ViewType;

	var AllBookings = BlockBase.extend("flight.app.dashboard.SharedBlocks.AllBookings", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "flight.app.dashboard.SharedBlocks.AllBookings",
					type: ViewType.XML
				},
				Expanded: {
					viewName: "flight.app.dashboard.SharedBlocks.AllBookings",
					type: ViewType.XML
				}
			}
		}
	});
	return AllBookings;
});
