/**
 * @jest-environment node
 */

"use strict";

const CustomError = require("../custom-error");
const response = require("../response");

describe("Custom-error Tests", () => {
    test("Create custom error with default initial values", () => {
        let testError = new CustomError();

        expect(testError.message).toEqual("");
        expect(testError.name).toEqual("CustomError");
        expect(testError.status).toEqual(400);
    });

    test("Create custom error with custom values", () => {
        let testError = new CustomError("Test error", 300);

        expect(testError.message).toEqual("Test error");
        expect(testError.name).toEqual("CustomError");
        expect(testError.status).toEqual(300);
    });

    test("Create custom error with message but no custom status", () => {
        let testError = new CustomError("No custom status");

        expect(testError.message).toEqual("No custom status");
        expect(testError.name).toEqual("CustomError");
        expect(testError.status).toEqual(400);
    });
});

describe("Response tests", () => {
    test('Create response with default initial values', () => {
        const testResponse = response();

        expect(testResponse.message).toEqual("");
        expect(testResponse.data).toBeNull();
        expect(testResponse.success).toEqual(true);
    });

    test("Create response with custom values", () => {
        const testResponse = response("Test message", {testData: "test"}, false);

        expect(testResponse.message).toEqual("Test message");
        expect(testResponse.data).toEqual({testData: "test"});
        expect(testResponse.success).toEqual(false);
    });

    test("Create response with only custom message", () => {
        const testResponse = response("Test message");

        expect(testResponse.message).toEqual("Test message");
        expect(testResponse.data).toBeNull();
        expect(testResponse.success).toEqual(true);
    });

    test("Check if formatMessage function to capitalize the first letter of the message", () => {
        const testResponse = response("test message");

        expect(testResponse.message).toEqual("Test message");
        expect(testResponse.data).toBeNull();
        expect(testResponse.success).toEqual(true);
    });

    test("Check if formatMessage function return empty string if no message is given", () => {
        const testResponse = response(null, null, null);

        expect(testResponse.message).toEqual("");
        expect(testResponse.data).toBeNull();
        expect(testResponse.success).toEqual(true);
    });

});