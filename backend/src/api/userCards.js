const express = require("express")
const router = express.Router()
const UserCards = require("../models/userCards")

// Get all user cards
router.get("/usercards", async(req,res)=>{
    const data = await UserCards.findAll()
    // Always return emails/mobiles as arrays in cardData
    const normalized = data.map(card => {
        const cardData = card.cardData || {};
        return {
            ...card.toJSON(),
            cardData: {
                ...cardData,
                emails: Array.isArray(cardData.emails) ? cardData.emails : (cardData.email ? [cardData.email] : []),
                mobiles: Array.isArray(cardData.mobiles) ? cardData.mobiles : (cardData.mobile ? [cardData.mobile] : []),
            }
        }
    });
    res.json(normalized)
})

// Create new user card (share/add contact)
router.post("/usercards", async(req,res)=>{
    const card_details = req.body;
    // Only use primary email/mobile for sharing/contacts
    let cardData = card_details.cardData || {};
    const emails = Array.isArray(cardData.emails) ? cardData.emails : (cardData.email ? [cardData.email] : []);
    const mobiles = Array.isArray(cardData.mobiles) ? cardData.mobiles : (cardData.mobile ? [cardData.mobile] : []);
    cardData = {
        ...cardData,
        emails,
        mobiles,
        email: emails[0] || '',
        mobile: mobiles[0] || ''
    };
    // Only share primary email/mobile
    const cardToSave = {
        ...card_details,
        cardData: {
            ...cardData,
            emails: [cardData.email],
            mobiles: [cardData.mobile]
        }
    };
    await UserCards.create(cardToSave);
    res.json(cardToSave);
})

module.exports = router