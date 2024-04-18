const util = require('node:util');

class Rover {
 //constructs Rover with initial values
   constructor(position) {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }
//Rover receives messages with commands. Implements commands and sends back results. 
   receiveMessage(message) {
      let arr = [];
      let tempCommands = message.commands;
      let moveResults = {completed: null};
      let modeResults = {completed: null};
      let statusResults = {
         completed: false,
         roverStatus: null,
      };
   //Loops through items in message.commands array stored temporarily in tempCommands.
      for(const item in message.commands){
      //Util used to strictly compare object with string value
         if(util.isDeepStrictEqual(tempCommands[item].commandType, "STATUS_CHECK")){
            statusResults.completed = true,
            statusResults.roverStatus = {
               mode: this.mode,
               generatorWatts: this.generatorWatts,
               position: this.position,
         }
         arr.push(Object.assign({}, statusResults));
      //else if statement that sets mode to new value when command is recieved.
       } else if (util.isDeepStrictEqual(tempCommands[item].commandType, "MODE_CHANGE")) {
            this.mode = tempCommands[item].value;
            modeResults.completed = true;
            arr.push(Object.assign({}, modeResults));
         } else if (util.isDeepStrictEqual(tempCommands[item].commandType, 'MOVE')){
         //nested conditional that only allows position to change when in normal mode.
            if(util.isDeepStrictEqual(this.mode, "NORMAL")){
               this.position = tempCommands[item].value;
               moveResults.completed = true;
               arr.push(Object.assign({}, moveResults));
            } else if (util.isDeepStrictEqual(this.mode, "LOW_POWER")){
               moveResults.completed = false;
               arr.push(Object.assign({}, moveResults));
            }
         }
      }  
   //items all stored in Message object and returned.
      let Message = {
         message: message.name,
         results: arr,
      };
      return Message;
   }
}

module.exports = Rover;