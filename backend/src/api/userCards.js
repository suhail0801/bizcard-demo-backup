const express = require("express")
const router = express.Router()
// const UserCards = require("../models/userCards")

router.get("/usercards", async(req,res)=>{
    const data = await UserCards.findAll()
    res.json(data)
})

router.post("/usercards", async(req,res)=>{
    const card_details = req.body
    await UserCards.create(card_details)
    res.json(card_details)
})

module.exports = router