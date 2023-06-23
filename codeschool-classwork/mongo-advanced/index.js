const express = require("express");
const model = require("./model");


const app = express();
const port = 8080;
app.use(express.urlencoded({extended:false}));


app.get("/movies", function(req, res) {
    var queryParams = {};
    var minMaxProfit = {"$lte": 0, "$gte": 0};

    console.log(req.query);

    for (key in req.query) {
        if (key == "profit_lte") {
            req.query[key] = {"$lte": req.query[key]}
        }
        if (key == "profit_gte") {
            req.query[key] = {"$gte": req.query[key]}
        }
    }

    // queryParams.profit = minMaxProfit;
    console.log(minMaxProfit);
    console.log(queryParams);

    

    model.Movie.find(req.query).then(function(movies) {
        res.send(movies);
    })
})

app.post("/movies", function(req, res) {
    const newMovie = new model.Movie({
        title: req.body.title,
        production_cost: req.body.production_cost,
        profit: req.body.profit,
        director: req.body.director
    })

    newMovie.save().then(function() {
        res.status(201).send("Movie saved.");
    }).catch(function() {
        res.status(422).send("Error saving movie.");
    })
})

app.listen(port, function() {
    console.log(`Running server on port ${port}...`);
});