const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  //Test 7
    test("constructor sets position and default values for mode and generatorWatts", function () {
      let testerRover = new Rover(10);
      console.log(testerRover);
      expect(testerRover.position).toBeDefined();
      expect(testerRover.mode).toBeDefined();
      expect(testerRover.generatorWatts).toBeDefined();
    });
//Test 8
    test("response returned by receiveMessage contains the name of the message", function () {
      let testerMessage = new Message("pineapple");
      let testerRover = new Rover(10);
      console.log(testerRover.receiveMessage(testerMessage));
      expect(testerRover.receiveMessage(testerMessage).message).toBeDefined();
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
      console.log(response.results[2].roverStatus);
    });
    
});