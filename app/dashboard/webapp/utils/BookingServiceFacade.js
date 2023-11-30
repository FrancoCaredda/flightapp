sap.ui.define([], function() {
    'use strict';
    
    return {
        createEntity: async function(oDataModel, oData, sEntity) {
            const oBinding = oDataModel.bindList(sEntity);
           
            try {
                const oBindingContext = oBinding.create(oData);
                await oBindingContext.created();

                return oBindingContext.requestObject();
            } catch (e) {
                throw e;
            } finally {
                oBinding.destroy();
            }
            
        },
        deleteEntity: async function(oDataModel, sId, sEntity) {
            const oBinding = oDataModel.bindContext(`${sEntity}(${sId})`);

            try {
                await oBinding.requestObject();
                
                const oContext = oBinding.getBoundContext();
                await oContext.delete();
            } catch (e) {
                throw e;
            } finally {
                oBinding.destroy();
            }
        }
    };
});