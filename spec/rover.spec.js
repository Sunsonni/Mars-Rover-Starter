const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

    test("constructor sets position and default values for mode and generatorWatts", function () {
      let testerRover = new Rover(10);
      console.log(testerRover);
      expect(testerRover.position).toBeDefined();
      expect(testerRover.mode).toBeDefined();
      expect(testerRover.generatorWatts).toBeDefined();
    });

    test("response returned by receiveMessage contains the name of the message", function () {
      let testerMessage = new Message("pineapple");
      let testerRover = new Rover(10);
      expect(testerRover.receiveMessage(testerMessage).message).toBeDefined();
    });

    test("response returned by receiveMessage includes two results if two commands are sent in the message", 
    function () {
      let commands = [new Command("apples"), new Command("pine")];
      let testerMessage = new Message("pineapple", commands);
      let testerRover = new Rover(10);
      expect((testerRover.receiveMessage(testerMessage).results.length)).toEqual(2);
    });

    test("responds correctly to the status check command", function() {

    });
  // 7 tests here!

});
