// const getUserId = (req, res, next) => {
//   console.log("inside mw getuser id");
//   console.log(req.headers);
//   const authorizationHeader = req.headers.authorization;
//   console.log("Authorization Header working:", authorizationHeader);
//   if (!authorizationHeader) {
//     return res.status(401).json({ message: "Authorization header is missing" });
//   }

//   const token = authorizationHeader.split(" ")[1]; // Assuming Bearer token format
//   console.log("Received token !!!:", token);

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: "Failed to authenticate token" });
//     }

//     // Token is valid, you can access its payload in decoded 
//     console.log("Decoded token:", decoded);

//     const userId = decoded.id;
//     // res.json({ userId });
//     // res.send(userId);
//     req.customData = userId;
//   });
//   next();
// };

// module.exports = getUserId;


const jwt = require('jsonwebtoken'); // Import jwt


const getUserId = (req, res, next) => {
  console.log('hi hello ttt');
  // console.log(req.headers);
  const authorizationHeader = req.headers.authorization;

  // console.log('Authorization Header working:', authorizationHeader);
  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = authorizationHeader.split(' ')[1]; // Assuming Bearer token format
  console.log('Received token !!!:', token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    // Token is valid, you can access its payload in decoded
    console.log('Decoded token:', decoded);

    req.userId = decoded.id; // Add userId to request object
    console.log("qqq ");
    // console.log("qqq "+ req.userId);
    next(); 
  });
};

module.exports = getUserId;
