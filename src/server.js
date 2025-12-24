import {app} from "./app.js";
import { createUser, deleteUser, getUsers, testAPI } from "./modules/users/users.controller.js";

const port = 3000;



app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});
