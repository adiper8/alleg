import mongoose from 'mongoose';

global.isConnectionEstablished = false;

let mongoUrl = "localhost:27017";

const connectToDB=(connectionString) =>{
    try{
        if(!global.isConnectionEstablished){
            mongoose.connect(`mongodb://${mongoUrl}/${connectionString}`, { useNewUrlParser: true });
            global.isConnectionEstablished = true;
        }
    }
    catch(err){
        console.log(err);
    }
}

export {connectToDB}