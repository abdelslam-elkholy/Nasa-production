const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const planets = require("./planets.mongo");

const habitablePlanets = [];

function loadPlanets() {
  return new Promise((resolve, reject) => {
    function isHabitablePlanet(planet) {
      return (
        planet["koi_disposition"] === "CONFIRMED" &&
        planet["koi_insol"] > 0.36 &&
        planet["koi_insol"] < 1.11 &&
        planet["koi_prad"] < 1.6
      );
    }

    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          await savePlanets(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const planetsNumber = (await getAllPlanets()).length;
        console.log(`${planetsNumber} habitable planets found!`);
        resolve();
      });
  });
}

const getAllPlanets = async () => {
  return await planets.find({}, { _id: 0, __v: 0 });
};

const savePlanets = async (planet) => {
  try {
    planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      { upsert: true }
    );
  } catch (error) {
    console.error(`Couldn't Save Planets ${error}`);
  }
};

module.exports = {
  getAllPlanets,
  loadPlanets,
};
