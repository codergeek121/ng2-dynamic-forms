import * as utils from "./utils";

describe("Utils test suite", () => {

    let configObject: any;

    beforeEach(() => {

        configObject = {
            a: 5,
            b: true,
            c: "test",
            d: {
                prop1: 2
            },
            e: {
                prop1: 1,
                prop2: {
                    nested1: 42
                }
            }
        };
    });


    it("tests if equals is working correctly", () => {

        let testValue1 = "test",
            testValue2 = 5,
            comparables1 = ["test1", "test2", "test3"],
            comparables2 = ["test1", "test2", "test"],
            comparables3 = [1,2,3,4],
            comparables4 = [2,3,4,5,6];

        expect(utils.equals<string>(testValue1, ...comparables1)).toBe(false);
        expect(utils.equals<string>(testValue1, ...comparables2)).toBe(true);
        expect(utils.equals<number>(testValue2, ...comparables3)).toBe(false);
        expect(utils.equals<number>(testValue2, ...comparables4)).toBe(true);
    });


    it("tests if getValue is working correctly", () => {

        let valueA = utils.merge(configObject.a, 4);
        let valueB = utils.merge(configObject.b, false);
        let valueC = utils.merge(configObject.c, null);
        let valueD1 = utils.merge(configObject.d, {prop1: 1});
        let valueD2 = utils.merge(configObject.d, {prop2: 3});
        let valueE = utils.merge(configObject.e, null);

        let valueY = utils.merge(configObject.y, false);
        let valueZ = utils.merge(configObject.z, null);

        expect(valueA).toBe(5);
        expect(valueB).toBe(true);
        expect(valueC).toEqual("test");

        expect(valueD1.prop1).toBe(2);
        expect(valueD2.prop1).toBe(2);
        expect(valueD2.prop2).toBe(3);
        expect(valueE.prop1).toBe(1);

        expect(valueY).toBe(false);
        expect(valueZ).toBeNull();
    });


    it("tests if getValue recursion is working correctly", () => {

        let valueE = utils.merge(configObject.e, {
            prop1: 10,
            prop2: {
                nested1: 21,
                nested2: 84
            },
            prop3: 100
        });

        expect(valueE.prop1).toBe(1);

        expect(valueE.prop2).toBeDefined();
        expect(valueE.prop2.nested1).toBe(42);

        expect(valueE.prop2.nested2).toBeDefined();
        expect(valueE.prop2.nested2).toBe(84);

        expect(valueE.prop3).toBeDefined();
        expect(valueE.prop3).toBe(100);
    });


    it("tests if isEmptyString is working correctly", () => {

        let testString0 = undefined;
        let testString1 = "";
        let testString2 = "test string";

        expect(utils.isEmptyString(testString0)).toBe(true);
        expect(utils.isEmptyString(testString1)).toBe(true);
        expect(utils.isEmptyString(testString2)).toBe(false);
    });


    it("tests if isNumber is working correctly", () => {

        let testNumber0 = undefined;
        let testNumber1 = 0;
        let testNumber2 = 42;

        expect(utils.isNumber(testNumber0)).toBe(false);
        expect(utils.isNumber(testNumber1)).toBe(true);
        expect(utils.isNumber(testNumber2)).toBe(true);
    });


    it("should convert a text mask to string correctly", () => {

        let testValue1 = "test";
        let testValue2 = /[1-9]/;
        let testValue3 = [testValue1, testValue2];
        let testResult3 = utils.maskToString(testValue3) as string[];

        expect(utils.maskToString(testValue1)).toEqual(testValue1);
        expect(utils.maskToString(testValue2)).toEqual(testValue2.toString());

        expect(testResult3[0]).toEqual(testValue1);
        expect(testResult3[1]).toEqual(testValue2.toString());
    });

    it("should recreate a text mask from string correctly", () => {

        let testValue1 = "test";
        let testValue2 = "/[1-9]/";
        let testValue3 = [testValue1, testValue2];
        let testResult3 = utils.maskFromString(testValue3) as (string | RegExp)[];

        expect(utils.maskFromString(testValue1)).toEqual(testValue1);
        expect(utils.maskFromString(testValue2)).toEqual(new RegExp("[1-9]"));

        expect(testResult3[0]).toEqual(testValue1);
        expect(testResult3[1]).toEqual(new RegExp("[1-9]"));
    });
});