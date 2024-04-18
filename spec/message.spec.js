const Message = require('../message.js');
const Command = require('../command.js');

describe("Message class", function() {
 //Test 4
    test("throws error if a name is NOT passed into the constructor as the first parameter", function () {
        expect(function() { new Message();}).toThrow(new Error('Name required'));
    });
 //Test 5
    test("constructor sets name", function () {
        let testerMessage = new Message("pineapple");
        expect(testerMessage.name).toEqual("pineapple");
    });
//Test 6
    test("contains a commands array passed into the constructor as the 2nd argument", function() {
        let commands = [new Command("apples"), new Command("pine")];
        let testerMessage = new Message("pineapple",commands);
        expect(testerMessage.commands).toEqual(commands);
    });
});
