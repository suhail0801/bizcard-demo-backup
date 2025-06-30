
# Business Card Generator

Design and download custom business cards effortlessly with our intuitive online tool.
Elevate your brand with every card you hand out. Get started today.




## Requirements

1.Node (>=14.0.0)

2.NPM (>=6.0.0)

3.MySql DB

4.Cards HTML code which is present in the repository
## Run Locally

1.Clone this project



2.Go to the project directory

```bash
  cd biz-card
```

3.Install dependencies

```bash
  npm install
```

4.Start the application

```bash
  npm run dev
```

**note:**

You can either go to the respective folders like frontend and backend and then run them seperately or you can run both on the same terminal.

to run both on the same terminal you should be on the /biz-car directory 

## Database Setup

```bash
create a DataBase with name "bizcard" in root user.
```


```bash
Set The DataBase password as "password".
```

## Note

Important step!!!



I have provided the backup of the database file just restore it in your database once you have created DB "bizcard". You can find file in DB_backup folder

```bash
    biz-card/DB_backup
```



**or**

1.You can find the Cards HTML code inside htmlcard_previews folder

2.First you have to copy the HTML code from htmlcard_previews and then use the post api

```bash
/api/template
```

The body of the post req should be of the following format
```bash
{
    "name": "Card 1",

    "desc": "card1 template with social media icons",

    
    "htmlPreview": "<single line HTML code>",
    
    "htmlData": {
    "logo": "/images/visitdesk-favicon.png",
    "role": "Software Engineer",
    "last_name": "Doe",
    "first_name": "John",
    "profile_pic": "/images/avatar-sign.png",
    "contactLinks": {
      "github_link": "",
      "spotify_link": "",
      "twitter_link": "",
      "youtube_link": "",
      "facebook_link": "",
      "linkedin_link": "",
      "snapchat_link": "",
      "instagram_link": ""
    },
    "business_name": "Visitdesk",
    "primaryActions": {
      "email": "john.doe@example.com",
      "mobile": "+1234567890",
      "website": "https://www.visitdesk.io",
      "location": "123 Main St, Anytown, USA",
      // "telegram": "@johndoe"
    },
    "business_description": "Providing innovative solutions in software development."
  },
    
    "isActive": true
}
```

## Card Template Creation

When creating Card Template Keep the id of the elements same as the following.

(i.e):for the first name placeholder the id='first_name' 

```bash
{
    first_name: "",
    last_name: "",
    role: "",
    business_name: "",
    business_description: "",
    profile_pic: "",
    logo: "",
    primaryActions: {
      mobile: "",
      email: "",
      location: "",
      website: "",
      telegram: "",
    },
    contactLinks: {
      facebook_link: "",
      youtube_link: "",
      instagram_link: "",
      github_link: "",
      snapchat_link: "",
      twitter_link: "",
      linkedin_link: "",
      spotify_link: "",
    },
  };
```