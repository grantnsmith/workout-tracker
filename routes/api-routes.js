const db = require("../models");
const mongoose = require("mongoose");


module.exports = function(app) {

// Find all workouts for stats page
app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then (workoutData => {
        res.json(workoutData);
    })
    .catch(err => {
        res.json(err);
    })
});

// Get current workout
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .sort({ day: -1 })
    .limit(1)
    .then(workoutData => {
        res.json(workoutData);
    })
    .catch( err => {
        res.json(err);
    })
  });

// Create new workout
app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    });
  });

// Add exercise to workout
  app.put("/api/workouts/:id", (req, res) => {
    const workoutID = req.params.id;
    db.Workout.updateOne(
      { _id: workoutID },
      { $push: { exercises: req.body } },
      (error, edited) => {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          console.log(edited);
          res.send(edited);
        }
      }
    );
  });
};
