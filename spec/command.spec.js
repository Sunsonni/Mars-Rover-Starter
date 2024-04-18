const Command = require('../command.js');

describe("Command class", function() {
  //Test 1
  test("throws error if a command type is NOT passed into the constructor as the first parameter", function() {
    expect( function() {new Command();}).toThrow(new Error('Command type required.'));
  });
//Test 2
  test("constructor sets command type", function () {
    let modeChange = new Command("MODE_CHANGE", "LOW_POWER");
    expect(modeChange.commandType).toBeDefined();
  });
//Test 3
  test("constructor sets a value passed in as the 2nd argument", function() {
    let modeChange = new Command("MODE_CHANGE", "LOW_POWER");
    expect(modeChange.value).toBeDefined();
  });
});