const util = require('node:util');

class Rover {
   constructor(position) {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      let tempCommands = message.commands;
      let moveResults = {
         completed: null,
      };
      let modeResults = {
         completed: null,
      };
      let statusResults = {
         completed: false,
         roverStatus: null,
      };
      let arr = [];
      for(const item in message.commands){
         if(util.isDeepStrictEqual(tempCommands[item].commandType, "STATUS_CHECK")){
            statusResults.completed = true,
            statusResults.roverStatus = {
               mode: this.mode,
               generatorWatts: this.generatorWatts,
               position: this.position,
         }
         arr.push(statusResults);
         // console.log(arr);
       } else if (util.isDeepStrictEqual(tempCommands[item].commandType, "MODE_CHANGE")) {
            this.mode = tempCommands[item].value;
            modeResults.completed = true;
            arr.push(modeResults);
            // console.log(arr);
         } else if (util.isDeepStrictEqual(tempCommands[item].commandType, "MOVE")){
            this.position = tempCommands[item].value;
            moveResults.completed = true;
            arr.push(moveResults);
            // console.log(arr);
         }
      }

   //  try {
   //    if(util.isDeepStrictEqual(tempCommands[2].commandType, "STATUS_CHECK")){
   //       statusResults.completed = true,
   //       statusResults.roverStatus = {
   //          mode: this.mode,
   //          generatorWatts: this.generatorWatts,
   //          position: this.position,
   //       }
   // }
   // } catch (error) {
   //    console.log("Status check doesn't exist");
   //  }
   //    console.log(statusResults);
      
      let Message = {
         message: message.name,
         results: arr,
      };
      return Message;
   }
}

module.exports = Rover;