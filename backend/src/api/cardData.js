const express = require("express")
const router = express.Router()
const CardData = require("../models/cardData")

// Get all card data
router.get("/carddata", async(req,res)=>{
    const data = await CardData.findAll()
    // Always return emails/mobiles as arrays
    const normalized = data.map(card => {
        const cardData = card.card_data || {};
        return {
            ...cardData,
            emails: Array.isArray(cardData.emails) ? cardData.emails : (cardData.email ? [cardData.email] : []),
            mobiles: Array.isArray(cardData.mobiles) ? cardData.mobiles : (cardData.mobile ? [cardData.mobile] : []),
        }
    });
    res.json(normalized)
})

// Create new card data
router.post("/carddata", async(req,res)=>{
    const card_details = req.body
    // Ensure emails/mobiles are arrays, and set primary for compatibility
    const emails = Array.isArray(card_details.emails) ? card_details.emails : (card_details.email ? [card_details.email] : []);
    const mobiles = Array.isArray(card_details.mobiles) ? card_details.mobiles : (card_details.mobile ? [card_details.mobile] : []);
    const cardDataToSave = {
        ...card_details,
        emails,
        mobiles,
        email: emails[0] || '',
        mobile: mobiles[0] || ''
    };
    await CardData.create({ card_data: cardDataToSave });
    res.json(cardDataToSave)
})

// Example: When sharing/adding contact, only use primary email/mobile
// router.post('/share-contact', async (req, res) => {
//     const { card_data } = req.body;
//     const primaryEmail = Array.isArray(card_data.emails) ? card_data.emails[0] : card_data.email;
//     const primaryMobile = Array.isArray(card_data.mobiles) ? card_data.mobiles[0] : card_data.mobile;
//     // ...share only primaryEmail and primaryMobile...
//     res.json({ email: primaryEmail, mobile: primaryMobile });
// });

module.exports = router