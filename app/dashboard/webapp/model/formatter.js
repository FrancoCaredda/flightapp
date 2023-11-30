sap.ui.define([], function() {
    'use strict';
    
    return {
        formatClassName: function(sName) {
            switch (sName) {
                case "Y":
                    return "Economy class";
                case "C":
                    return "Business class";
                case "F":
                    return "First class";
                default:
                    return sName;
            }
        }
    }
});