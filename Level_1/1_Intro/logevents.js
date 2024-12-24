const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const logEvents = async (message) => {
    const dateTime = `${new Date()}`;
    const logItem = `${dateTime}\t\t${message}\n`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname , "logs"))){
            await fsPromises.mkdir(path.join(__dirname , "logs"));
        }
        await fsPromises.appendFile(path.join(__dirname,"logs","eventFile.txt") , logItem);
    }catch(err){
        console.error(err);
    }
}

module.exports = logEvents;