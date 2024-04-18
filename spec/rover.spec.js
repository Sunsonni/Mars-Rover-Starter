const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Rover class", function() {
//Test 7
    test("constructor sets position and default values for mode and generatorWatts", function () {
      let testerRover = new Rover(10);
      expect(testerRover.position).toBeDefined();
      expect(testerRover.mode).toBeDefined();
      expect(testerRover.generatorWatts).toBeDefined();
    });
//Test 8
    test("response returned by receiveMessage contains the name of the message", function () {
      let testerMessage = new Message("pineapple");
      let testerRover = new Rover(10);
      expect(testerRover.receiveMessage(testerMessage).message).toEqual("pineapple");
    });
//Test 9
    test("response returned by receiveMessage includes two results if two commands are sent in the message", 
    function () {
      let commands = [new Command("MOVE", 1080), new Command("MODE_CHANGE", "LOW_POWER"),];
      let testerMessage = new Message("pineapple", commands);
      let testerRover = new Rover(10);
      let response = testerRover.receiveMessage(testerMessage);
      expect((response.results.length)).toEqual(2);
    });
//Test 10
    test("responds correctly to the status check command", function() {
      let commands = [new Command("MOVE", 1080), new Command("MODE_CHANGE", "LOW_POWER"), new Command("STATUS_CHECK")];
      let testerMessage = new Message("pineapple", commands);
      let testerRover = new Rover(10);
      let response = testerRover.receiveMessage(testerMessage);
      expect((response.results[2].completed)).toBeTruthy();
      expect((response.results[2].roverStatus.mode)).toEqual('LOW_POWER');
      expect((response.results[2].roverStatus.generatorWatts)).toEqual(110);
      expect((response.results[2].roverStatus.position)).toEqual(1080);
    });
//Test 11
    test("responds correctly to the mode change command", function() {
      let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("MODE_CHANGE", "NORMAL"), new Command("STATUS_CHECK")];
      let testerMessage = new Message("pineapple", commands);
      let testerRover = new Rover(10);
      let response = testerRover.receiveMessage(testerMessage);
      expect((response.results[2].completed)).toBeTruthy();
      expect((response.results[2].roverStatus.mode)).toEqual('NORMAL');
    });
//Test 12
    test("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
      let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("MOVE", 1234), new Command("STATUS_CHECK")];
      let testerMessage = new Message("pineapple", commands);
      let testerRover = new Rover(0);
      let response = testerRover.receiveMessage(testerMessage);
      expect((response.results[1].completed)).toBeFalsy();
      expect((response.results[2].roverStatus.position)).toEqual(0);
    });
  //Test 13
    test("responds with the position for the move command", function() {
      let commands = [new Command("MOVE", 1234), new Command("MOVE", 555), new Command("STATUS_CHECK")];
      let testerMessage = new Message("pineapple", commands);
      let testerRover = new Rover(0);
      let response = testerRover.receiveMessage(testerMessage);
      expect((response.results[2].roverStatus.position)).toEqual(555);
    });
});