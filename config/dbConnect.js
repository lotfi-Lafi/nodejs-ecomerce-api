import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb connected ${connected.connection.host }`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default dbConnect;

// user: lotfilafi2
// password: p5sXkmHfsTFpTB3b

// .env
// MONGO_URL=mongodb+srv://lotfilafi2:p5sXkmHfsTFpTB3b@nodejs-ecomerce-api.0flrbqb.mongodb.net/nodejs-ecomerce-api?retryWrites=true&w=majority