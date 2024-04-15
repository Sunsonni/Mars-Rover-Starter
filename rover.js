class Rover {
   constructor(position) {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
      this 
   }
   receiveMessage(message) {
      let Message = {
         message: message.name,
         results: message.commands,
      };
      return Message;
   }
}

module.exports = Rover;