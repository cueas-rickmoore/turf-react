
export default class utils {

  logObject = (obj) => {
    for (var key in obj) {
      if (typeof obj[key] === "object") {
        this.logObject(obj[key]);   
      } else {
        console.log(obj[key]);    
      }
    }
  }

}
