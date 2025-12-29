import {app} from "./app.js";
import { connectDB } from "./config/mongodb.js";

const port = 3000;

try{

    await connectDB()    
    app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});
}    catch(error) {
        console.error("startup failed",error);
        process.exit(1);
    }
