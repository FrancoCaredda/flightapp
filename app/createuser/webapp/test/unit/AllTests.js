sap.ui.define([
], function() {
    'use strict';
    
    function sum(a, b) {
        return a + b;
    }

    QUnit.module("Library Test Call", {
        beforeEach: function() {
            this._test1 = 2;
            this._test2 = 3;
        }
    });

    QUnit.test("Sum equals 5", function(assert) {
        assert.strictEqual(sum(this._test1, this._test2), 5);
    });
});