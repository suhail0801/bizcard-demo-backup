const express = require("express")
const router = express.Router()
const CardTemplate = require("../models/cardTemplate")

router.get("/template", async(req,res)=>{
    const template = await CardTemplate.findAll()
    res.json(template)
})

router.post("/template", async(req,res)=>{
    const template = req.body
    await CardTemplate.create(template)
    res.json(template)
})

module.exports = router 