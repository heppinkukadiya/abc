require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());

const prod = process.env.NODE_ENV

if ( !prod ) {
    app.use(cors({ origin: "*" }));

}
else {
    app.use(
        cors({
            origin: "https://surajdiamond.com"
        })
    );
}

const routes = require('./Routes/routes');
app.use("/api", routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



