import dotenv from "dotenv";
dotenv.config(); // Ensure dotenv is loaded first

import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
