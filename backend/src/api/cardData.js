const express = require("express")
const router = express.Router()
const CardData = require("../models/cardData")

router.get("/carddata", async(req,res)=>{
    const data = await CardData.findAll()
    res.json(data)
})

router.post("/carddata", async(req,res)=>{
    const card_details = req.body
    await CardData.create(card_details)
    res.json(card_details)
})

module.exports = router