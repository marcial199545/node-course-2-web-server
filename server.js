// NOTE requiring express
const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

// NOTE initializing express via a variable with the value of the return of executing express
var app = express();
var absoluteRoute = __dirname;
app.set("view engine", "hbs");

//NOTE defining middleware to add a server log
app.use((req, res, next) => {
        var now = new Date().toString();
        var log = `${now}:  ${req.method} ${req.url} `;
        fs.appendFile("server.log", log + "\n", err => {
                if (err) {
                        console.log("unnable to append to server.log");
                }
        });
        console.log(log);

        next();
});
//NOTE maintenance middleware
// app.use((req, res, next) => {
//         res.render("maintenance.hbs");
// });
app.use(express.static(absoluteRoute + "/public"));

// NOTE handlebars partials, helpers
hbs.registerPartials(absoluteRoute + "/views/partials");
hbs.registerHelper("getYear", () => {
        return new Date().getFullYear();
});
hbs.registerHelper("capitalize", txt => {
        return txt.toUpperCase();
});

// SECTION registing a handler for an HTTP GET request
// NOTE parameters: route, callback with response and request as arguments
app.get("/", (req, res) => {
        //NOTE rendering home.hbs handlebar
        res.render("home.hbs", {
                pageTitle: "Home page",
                welcomeMessage: "welcome to my page"
        });
});
app.get("/about", (req, res) => {
        //NOTE rendering about.hbs handlebar
        res.render("about.hbs", {
                pageTitle: "About page"
        });
});
app.get("*", (req, res) => {
        //NOTE seding an error object if page is not found
        res.send({
                errorMessage: "unable to handle requests"
        });
});

// SECTION binding app to a port of the machine
// NOTE parameters: port, callback(optional)
app.listen(port, () => {
        console.log(`listening to port: 3000`);
});
