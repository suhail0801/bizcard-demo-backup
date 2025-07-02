const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const Sequelize = require("sequelize");
const fs = require('fs');
const path = require('path');
const CryptoJS = require('crypto-js');
const { customFilesAndImages, saveBase64Image } = require('./utils/uploadFilesToSys');

const secretKey = 'onfra-devs-key-1001';

function decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

console.log(decryptData("U2FsdGVkX1/oNnVf82iAk2fVEgmUT4g/X+dSELFYmQs="), " Decryption test ---------------------------")

// const User = require('./models/user');
const UserCards = {}
const CardTemplate = {}

// const { saveBase64Image, customFilesAndImages } = require('./utils/uploadFilesToSys')


const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "localhost",
    dialect: "mysql",
  }
);


db.authenticate().then((err) => {
  if (err) {
    console.log("There is connection in ERROR.");
  } else {
    console.log("Database Connection has been established successfully");
  }
});

db.sync().then(
  () => {
    console.log("Missing Table Created");
  },
  (err) => {
    console.log("An error occurred while creating the table:", err.message);
  }
);

const Activity = db.define("activities", {
  user: {
    type: Sequelize.STRING,
  },
  action: {
    type: Sequelize.STRING,
  },
});

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  businessCode: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true
  },
  jobTitle: {
    type: Sequelize.STRING,
    allowNull: true
  },
  businessName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  profilePhoto: {
    type: Sequelize.STRING,
    allowNull: true
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: true
  },
}, {
  tableName: 'users'
});

const SavedCard = db.define("savedCard", {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
  },
  title: {
      type: Sequelize.STRING,
  },
  config: {
      type: Sequelize.JSON,
      // allowNull: false,
  },
  firstName: {
      type: Sequelize.STRING,
      allowNull: false,
  },
  lastName: {
      type: Sequelize.STRING,
      allowNull: false,
  },
  jobTitle: {
      type: Sequelize.STRING,
  },
  mobile: {
      type: Sequelize.STRING,
  },
  email: {
      type: Sequelize.STRING,
  },
  businessName: {
      type: Sequelize.STRING,
  },
  profilePhoto: {
      type: Sequelize.STRING,
  },
  logo: {
      type: Sequelize.STRING,
  },
  coverPhoto: {
      type: Sequelize.STRING,
  },
  primaryBackgroundColor: {
      type: Sequelize.STRING,
  },
  secondaryBackgroundColor: {
      type: Sequelize.STRING,
  },
  textColor: {
      type: Sequelize.STRING,
  },
  titleColor: {
      type: Sequelize.STRING,
  },
  primaryActions: {
    type: Sequelize.JSON,
    defaultValue: []
  },
  secondaryActions: {
    type: Sequelize.JSON,
    defaultValue: []
  },
  featuredContent: {
    type: Sequelize.JSON,
    defaultValue: []
  }
});

const Contact = db.define('contact', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: Sequelize.INTEGER, allowNull: false }, // owner
  contactUserId: { type: Sequelize.INTEGER, allowNull: true }, // if registered
  contactName: { type: Sequelize.STRING },
  contactEmail: { type: Sequelize.STRING },
  contactPhone: { type: Sequelize.STRING },
  contactCardId: { type: Sequelize.INTEGER }, // link to card
  jobTitle: { type: Sequelize.STRING },
  businessName: { type: Sequelize.STRING },
  addedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  sharedBack: { type: Sequelize.BOOLEAN, defaultValue: false },
  notes: { type: Sequelize.STRING },
  savedBy: { type: Sequelize.STRING }
});

// Define associations
SavedCard.belongsTo(User);
User.hasMany(SavedCard, { as: 'savedCards' });




// User Route Api's

const getUsers =  async (req, res) => {
    try {
        const users = await User.findAll();
        
        console.log(users);
        
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const findUserById =  async (id) => {
    try {
        const user = await User.findOne({ where: { id } });
        
      return user
      } catch (error) {
        console.error('Error fetching user:', error);
        // res.status(500).json({ message: 'Internal Server Error' });
    }
};

const registerUser =  async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
  
    // Check if the user with the given email already exists
    const alreadyExistsUser = await User.findOne({ where: { email } })
    if(alreadyExistsUser) return res.status(400).json({ auth: false, message: "Email already exists" })
  
    if (alreadyExistsUser) {
      return res.status(409).json({ message: "User with email already exists!" });
    }
  
    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds).catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    });
  
    console.log(fullName, email, hashedPassword)
    // return 0
    // Create a new user with the hashed password
    const newUser = await User.create({ username: fullName, email, password: hashedPassword });

    // Try to create a default card for the new user using a template
    if (newUser && newUser.id) {
      let template;
      try {
        // Try to get the first available template
        template = await db.models.cardtemplate.findOne();
      } catch (e) {
        template = null;
      }
      let defaultCardData = {
        userId: newUser.id,
        title: "Digital Business Card",
        config: { expose: true, enableAddToContact: false },
        firstName: fullName.split(' ')[0] || "",
        lastName: fullName.split(' ').slice(1).join(' ') || "",
        jobTitle: "",
        mobile: "",
        email: email,
        businessName: "",
        profilePhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUv4efwDYARf5XR46l60ibliIEuSnj6oRFZA&s",
        logo: "https://onfra.io/wp-content/uploads/2024/05/onfra-logo.png",
        coverPhoto: "https://i.pinimg.com/originals/93/c5/9f/93c59fb55f3fdc378385274a6fcef7d5.gif",
        primaryBackgroundColor: "#ffffff",
        secondaryBackgroundColor: "#f0f0f0",
        textColor: "#000000",
        titleColor: "#000000",
        primaryActions: [],
        secondaryActions: [],
        featuredContent: []
      };
      if (template) {
        // Try to use template fields if available
        if (template.name) defaultCardData.title = template.name;
        if (template.htmlData && typeof template.htmlData === 'object') {
          // If htmlData is a JSON object, merge relevant fields
          Object.assign(defaultCardData, template.htmlData);
        }
        if (template.desc) defaultCardData.jobTitle = template.desc;
      }
      try {
        await SavedCard.create(defaultCardData);
      } catch (e) {
        // If error, do nothing (fail silently)
      }
    }

    if (newUser) res.json({ message: "Thanks for registering" });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
};


const webLogin = async (req, res) => {
    const { email, password } = req.body;
  
    // Find the user with the given email
    const userWithEmail = await User.findOne({ where: { email } }).catch(
      (err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    );
  
    // Check if the user exists
    if (!userWithEmail) {
      return res.status(400).json({ message: "Email does not match!!" });
    }
  
    // Compare the entered password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, userWithEmail.password);
  
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "password does not match!!" });
    }
  
    // If the password matches, generate a JWT token
    const jwtToken = jwt.sign(
      { id: userWithEmail.id, email: userWithEmail.email },
      process.env.JWT_SECRET
    );
  
    res.json({ message: "Welcome Back!", token: jwtToken });
}




// Card Route Api's

const getCardTemplates =  async(req,res)=>{
    const template = await CardTemplate.findAll()
    res.json(template)
}

const getCardTemplateById =  async(req,res)=>{
    const template = await CardTemplate.findByPk(req.params.id)
    res.json(template)
}


const addTemplate = async(req,res)=>{
    const template = req.body
    await CardTemplate.create(template)
    res.json(template)
}


const fillCardVariables = async (cardPreview, cardVariables) => {
  console.log(cardPreview, 'card preview')
  cardPreview = cardPreview.toString()
  cardVariables = cardVariables || {
    "role": "Designer",
    "email": "email@yourdomain.com",
    "github_link": "https://github.com/",
    "mobile": "000-123-456-7890",
    "spotify_link": "https://open.spotify.com/user/",
    "twitter_link": "https://twitter.com/",
    "website": "https://www.visitdesk.com",
    "youtube_link": "https://www.youtube.com/c/",
    "facebook_link": "https://www.facebook.com/",
    "linkedin_link": "https://www.linkedin.com/in/",
    "location": "Your Location Here.",
    "snapchat_link": "https://www.snapchat.com/",
    "instagram_link": "https://www.instagram.com/",
    "last_name": "Name",
    "first_name": "Your",
    "business_name": "VisitDesk",
    "business_description": "Reception Management System",
    "gender_pronouns": "Mr.",
    "profile_pic": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg",
    "logo": "https://shorturl.at/jNY48"
  }

  for (const key in cardVariables) {
      const value = cardVariables[key];
      // if(cardPreview.includes(`{{${key}}}`)){
        cardPreview = cardPreview.replace(`{{${key}}}`, value)
        console.log(`{{${key}}}`, 'key', value, 'value')
      // }
  }

  return cardPreview
} 


const getUserCards = async(req,res) => {
    const data = await UserCards.findAll()
    res.json(data)
}

const getUserCardById = async(req,res) => {
    const data = await UserCards.findByPk(req.params.id)
    res.json(data)
}

const addUserCards = async(req,res) => {
  customFilesAndImages(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log(err, 'multer err');
      res.status(400).json({errMsg: err})
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log(err, 'unknown err');
      res.status(400).json({errMsg: err})
    }
    // console.log(req.body, 'req body')
    const cardDetails = JSON.parse(req.body.userTemplateData)

    if(req.files && req.files.length){
      for (const file of req.files) {
        if(file.fieldname == "profile_pic") {
          cardDetails.htmlData.profile_pic = file.path.split('frontend/public')[1];
          cardDetails.htmlPreview = cardDetails.htmlPreview.replace(`{{profile_pic}}`, cardDetails.htmlData.profile_pic)
        } else if(file.fieldname == "logo") {
          cardDetails.htmlData.logo = file.path.split('frontend/public')[1];
          cardDetails.htmlPreview = cardDetails.htmlPreview.replace(`{{logo}}`, cardDetails.htmlData.logo)
        }
        // console.log(`{{${key}}}`, 'key', value, 'value')
      }
    }

    console.log(cardDetails.htmlPreview, 'preview')
    // cardDetails.htmlPreview = cardDetails.oldHtmlPreview
    // throw new Error()
    // const template = await CardTemplate.findByPk(req.user.id)
    delete cardDetails.id
    // console.log(req.user, 'req user')
    cardDetails.userId = req.user.id
    // if(cardDetails.htmlData.profile_pic){
    //   let outputPath = `public/uploads/${req.user.fullName}_${req.user.id}/${new Date().valueOf()}/profile_pic.png`
    //   cardDetails.htmlData.profile_pic = saveBase64Image(cardDetails.htmlData.profile_pic, outputPath);
    // } else if(cardDetails.htmlData.logo){
    //   let outputPath = `public/uploads/${req.user.fullName}_${req.user.id}/${new Date().valueOf()}/logo.png`
    //   cardDetails.htmlData.logo = saveBase64Image(cardDetails.htmlData.logo, outputPath);
    // }
    // cardDetails.htmlPreview = await fillCardVariables(template.htmlPreview, cardDetails.htmlData)
    await UserCards.create(cardDetails)
    res.json(cardDetails)
  })
    
}

const addCard = async(req,res) => {
  req.body.featuredContent.forEach((content, index) => {
    if(content.type == "product") {
      req.body.featuredContent[index].image = saveBase64Image(content.image, req.user.id, 'card_images');
    }
  });
  let {
    featuredContent,
    firstName,
    lastName,
    jobTitle,
    mobile,
    email,
    businessName,
    profilePhoto,
    logo,
    coverPhoto,
    primaryActions,
    secondaryActions,
    primaryBackgroundColor,
    secondaryBackgroundColor,
    textColor,
    titleColor,
    config,
    status,
    title
  } = req.body
  logo = saveBase64Image(logo, req.user.id, 'card_images');
  profilePhoto = saveBase64Image(profilePhoto, req.user.id, 'profile_photos');
  coverPhoto = saveBase64Image(coverPhoto, req.user.id, 'card_images');
  const saveCard = await SavedCard.create({
    userId: req.user.id,
    featuredContent,
    firstName,
    lastName,
    jobTitle,
    mobile,
    email,
    businessName,
    profilePhoto,
    logo,
    coverPhoto,
    primaryActions,
    secondaryActions,
    primaryBackgroundColor,
    secondaryBackgroundColor,
    textColor,
    titleColor,
    config,
    title,
    status
  })
  return res.json(saveCard)
}

const updateCard = async(req,res) => {
  let {
    featuredContent,
    firstName,
    lastName,
    jobTitle,
    mobile,
    email,
    businessName,
    profilePhoto,
    logo,
    coverPhoto,
    primaryActions,
    secondaryActions,
    primaryBackgroundColor,
    secondaryBackgroundColor,
    textColor,
    titleColor,
    status,
    config,
    title
  } = req.body
  if (Array.isArray(featuredContent)) {
    featuredContent = featuredContent.map(item => {
      if (item.type === 'product' && item.image) {
        return { ...item, image: saveBase64Image(item.image, req.user.id, 'card_images') };
      }
      return item;
    });
  }
  logo = saveBase64Image(logo, req.user.id, 'card_images');
  profilePhoto = saveBase64Image(profilePhoto, req.user.id, 'profile_photos');
  coverPhoto = saveBase64Image(coverPhoto, req.user.id, 'card_images');
  const saveCard = await SavedCard.update({
    featuredContent,
    title,
    firstName,
    lastName,
    jobTitle,
    mobile,
    email,
    businessName,
    profilePhoto,
    logo,
    coverPhoto,
    primaryActions,
    secondaryActions,
    primaryBackgroundColor,
    secondaryBackgroundColor,
    textColor,
    titleColor,
    status,
    config
  }, { where: { id: req.body.id } })
  return res.json(saveCard)
}

const getCard = async(req,res) => {
    console.log(req.params.id, "REQUESTED CARD ID")
    
    const card = await SavedCard.findOne({
      where: { id: req.params.id }
    })

    return res.json(card)
}

const getAllCards = async(req,res) => {
    
    const cards = await SavedCard.findAll({ where: { userId: req.user.id } })

    return res.json(cards)
}

const getPublicCard = async(req,res) => {
  console.log(req.query, "REQUESTED OPEN CARD")  
  const id = parseInt(req.query.id)  
  console.log(id, "ID DECRYPTED HERE")
  const card = await SavedCard.findOne({
    where: {
      id,
      config: {
        expose: true
      }
    },
    include: [{ model: User, attributes: ['profilePhoto'] }]
  });
  if (!card) return res.status(404).json({ error: 'Card not found' });
  // Attach the latest profilePhoto from the User as ownerProfilePhoto
  const cardJson = card.toJSON();
  cardJson.ownerProfilePhoto = cardJson.user && cardJson.user.profilePhoto ? cardJson.user.profilePhoto : null;
  delete cardJson.user;
  return res.json(cardJson);
}

const updateUserCards = async(req,res)=>{
  customFilesAndImages(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log(err, 'multer err');
      res.status(400).json({errMsg: err})
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log(err, 'unknown err');
      res.status(400).json({errMsg: err})
    }
    // console.log(req.body, 'req body')
    const cardDetails = JSON.parse(req.body.userTemplateData)

    if(req.files && req.files.length){
      for (const file of req.files) {
        if(file.fieldname == "profile_pic") {
          cardDetails.htmlData.profile_pic = file.path.split('frontend/public')[1];
          cardDetails.htmlPreview = cardDetails.htmlPreview.replace(`{{profile_pic}}`, cardDetails.htmlData.profile_pic)
        } else if(file.fieldname == "logo") {
          cardDetails.htmlData.logo = file.path.split('frontend/public')[1];
          cardDetails.htmlPreview = cardDetails.htmlPreview.replace(`{{logo}}`, cardDetails.htmlData.logo)
        }
      }
    }

    console.log(cardDetails.htmlPreview, 'preview')
    // cardDetails.htmlPreview = cardDetails.oldHtmlPreview
    // throw new Error()
    // const template = await CardTemplate.findByPk(req.user.id)
    // delete cardDetails.id
    // console.log(req.user, 'req user')
    // cardDetails.userId = req.user.id
    // if(cardDetails.htmlData.profile_pic){
    //   let outputPath = `public/uploads/${req.user.fullName}_${req.user.id}/${new Date().valueOf()}/profile_pic.png`
    //   cardDetails.htmlData.profile_pic = saveBase64Image(cardDetails.htmlData.profile_pic, outputPath);
    // } else if(cardDetails.htmlData.logo){
    //   let outputPath = `public/uploads/${req.user.fullName}_${req.user.id}/${new Date().valueOf()}/logo.png`
    //   cardDetails.htmlData.logo = saveBase64Image(cardDetails.htmlData.logo, outputPath);
    // }
    // cardDetails.htmlPreview = await fillCardVariables(template.htmlPreview, cardDetails.htmlData)
    await UserCards.update(cardDetails, {where: {id: cardDetails.id}})
    res.json(cardDetails)
  })
}

const deleteUserCards = async(req,res)=>{
    const {id} = req.params
    await UserCards.destroy({where: {id}})
    res.json("User Card Deleted")
}

const deleteSavedCard = async (req, res) => {
  const { id } = req.params;
  await SavedCard.destroy({ where: { id } });
  res.json({ message: "Card deleted" });
};

// Add countryCodes list for phone formatting
const countryCodes = [
  '+1', '+91', '+44', '+61', '+81'
];

// Add a contact
const addContact = async (req, res) => {
  try {
    let { contactUserId, contactName, contactEmail, contactPhone, contactCardId, sharedBack, notes, jobTitle: jobTitleRaw, businessName: businessNameRaw, savedBy: savedByFromBody, userId: userIdFromBody } = req.body;
    // Always use userIdFromBody if provided (for share my contact)
    let userId = userIdFromBody || req.user.id;
    if (contactUserId && userId && String(userId) === String(contactUserId)) {
      return res.status(400).json({ error: "You cannot add yourself as a contact." });
    }
    let savedBy = "by me";
    const business = req.body.business || businessNameRaw;
    const jobTitle = req.body['job title'] || jobTitleRaw;
    // Upsert logic: try to find existing contact
    let where = { userId };
    if (contactUserId) {
      where.contactUserId = contactUserId;
    } else if (contactEmail) {
      where.contactEmail = contactEmail;
    }
    let contact = await Contact.findOne({ where });
    if (contact) {
      // Update existing contact
      await contact.update({
        contactName,
        contactEmail,
        contactPhone,
        contactCardId,
        jobTitle: jobTitle,
        businessName: business,
        sharedBack: !!sharedBack,
        notes,
        savedBy
      });
    } else {
      // Create new contact
      contact = await Contact.create({
        userId,
        contactUserId: contactUserId || null,
        contactName,
        contactEmail,
        contactPhone,
        contactCardId,
        jobTitle: jobTitle,
        businessName: business,
        sharedBack: !!sharedBack,
        notes,
        savedBy
      });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: "Failed to add contact" });
  }
};

// Get all contacts for the logged-in user
const getContacts = async (req, res) => {
  try {
    const userId = req.user.id;
    let contacts = await Contact.findAll({ where: { userId }, order: [['addedAt', 'DESC']] });
    // Only keep the latest contact for each unique contactUserId (or contactEmail if contactUserId is null)
    const uniqueContacts = {};
    for (const c of contacts) {
      const key = c.contactUserId ? `id_${c.contactUserId}` : `email_${c.contactEmail}`;
      if (!uniqueContacts[key]) {
        uniqueContacts[key] = c;
      }
    }
    const contactsMapped = Object.values(uniqueContacts).map(c => {
      const obj = c.toJSON ? c.toJSON() : c;
      obj.business = obj.business || obj.businessName || '';
      obj['job title'] = obj['job title'] || obj.jobTitle || '';
      obj.savedBy = obj.savedBy || "by me";
      obj.addedAt = obj.addedAt || c.addedAt;
      return obj;
    });
    res.json(contactsMapped);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

// Delete a contact (optional)
const deleteContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const deleted = await Contact.destroy({ where: { id, userId } });
    if (deleted) {
      res.json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ error: "Contact not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
};

// Get user profile by ID (or current user if using auth)
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : req.params.id;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const userObj = user.toJSON ? user.toJSON() : user;
    userObj.business = userObj.business || userObj.businessName || '';
    userObj['job title'] = userObj['job title'] || userObj.jobTitle || '';
    res.json(userObj);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

// Update user profile (current user)
const updateUserProfile = (req, res) => {
  customFilesAndImages(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: 'File upload error', details: err.message });
    }
    try {
      const userId = req.user.id;
      let profilePhotoPath = undefined;
      if (req.files && req.files.length > 0) {
        // Only use the first image file
        const file = req.files.find(f => f.mimetype.startsWith('image/'));
        if (file) {
          // Always use the correct relative path for profile photos
          // file.path will be something like D:/onfra/bizcard/frontend/public/uploads/profile_photos/{userId}_{username}/profile_{userId}_{timestamp}.ext
          // We want: /uploads/profile_photos/{userId}_{username}/profile_{userId}_{timestamp}.ext
          const match = file.path.replace(/\\/g, '/').match(/\/uploads\/profile_photos\/.*$/);
          if (match) {
            profilePhotoPath = match[0];
          } else {
            // fallback: just use the filename in uploads/profile_photos
            profilePhotoPath = '/uploads/profile_photos/' + file.filename;
          }
        }
      }
      // If body is multipart, fields are in req.body
      const { username, email, jobTitle: jobTitleRaw, businessName: businessNameRaw, business, mobile } = req.body;
      const jobTitle = req.body['job title'] || jobTitleRaw;
      const businessFinal = business || businessNameRaw;
      const updateData = { username, email, jobTitle, business: businessFinal, mobile };
      if (profilePhotoPath) updateData.profilePhoto = profilePhotoPath;
      const [updated] = await User.update(updateData, { where: { id: userId } });
      if (!updated) return res.status(404).json({ error: 'User not found' });
      const user = await User.findOne({ where: { id: userId } });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update user profile' });
    }
  });
};

// Get all contacts related to a user (for public biz card page)
const getAllRelatedContacts = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId required' });
    // Find contacts where user is owner or recipient
    const contacts = await Contact.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          { userId: userId },
          { contactUserId: userId }
        ]
      }
    });
    const contactsMapped = contacts.map(c => {
      const obj = c.toJSON ? c.toJSON() : c;
      obj.business = obj.business || obj.businessName || '';
      obj['job title'] = obj['job title'] || obj.jobTitle || '';
      obj.savedBy = obj.savedBy || "by me";
      obj.addedAt = obj.addedAt || c.addedAt;
      return obj;
    });
    res.json(contactsMapped);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch related contacts' });
  }
};

module.exports = {
    getUsers,
    registerUser,
    webLogin,
    getUserCards,
    addUserCards,
    getCardTemplates,
    addTemplate,
    updateUserCards,
    deleteUserCards,
    getCardTemplateById,
    getUserCardById,
    updateCard,
    addCard,
    getCard,
    getAllCards,
    getPublicCard,
    findUserById,
    deleteSavedCard,
    addContact,
    getContacts,
    deleteContact,
    getUserProfile,
    updateUserProfile,
    getAllRelatedContacts,
}