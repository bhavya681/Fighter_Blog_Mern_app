import { connect } from "mongoose";
import "dotenv/config";

const connectToDB = async () => {

    try {

        await connect(`${process.env.MONGO_CONNECT}`);
        
        console.log('Successfully Connected to Mongodb');

    } catch (error) {

        console.log("Error connecting to MongoDB:", error);

    }

}

export default connectToDB;