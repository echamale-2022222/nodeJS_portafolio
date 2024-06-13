'use strict'

import mongoose from "mongoose";

export const dbConnection = async () => {
    try{
        mongoose.connection.on('error', () => {
            mongoose.disconnect();
        })

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        });
    }catch(e){
        console.log('Database connection failed', e)
    }
}