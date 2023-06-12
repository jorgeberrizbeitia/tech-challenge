const router = require("express").Router();
const phonesJson = require("../data/phones.json")

// GET "/api/phones" to send all phones data in the json
router.get("/", (req, res, next) => {
  const phonesList = phonesJson.map((eachPhone) => {
    return {
      name: eachPhone.name,
      id: eachPhone.id
    }
  })
  res.json(phonesList)
})

router.get("/:phoneId", (req, res, next) => {
  // you can use .filter or .find
  const phoneDetails = phonesJson.find((eachPhone) => {
    // params converted to numbers because the id from JSON is a number
    return eachPhone.id === Number(req.params.phoneId)
  })
  console.log(phoneDetails)
  res.json(phoneDetails)
})

module.exports = router;
