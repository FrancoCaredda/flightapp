sap.ui.define([], function() {
    'use strict';
    
    return {
        createEntity: function(oDataModel, oData, sEntitySet) {
            return new Promise(async (resolve, reject) => {
                let oBinding = oDataModel.bindList(sEntitySet);

                try {
                    let oContext = oBinding.create(oData);
                    await oContext.created();

                    resolve(oContext.requestObject());
                } catch (err) {
                    reject(err);
                    throw err;
                } finally {
                    oBinding.destroy();
                }
            });
        }
    }
});