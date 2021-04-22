import { verify } from "jsonwebtoken";

module.exports = (req, connection) => {
  if (req) {
    const authHeader = req.get("authorization");
    const context = { isAuth: false, role: null, userId: null, passReset: null, email: null, };

    if (!authHeader) {
      return context;
    }

    const token = authHeader.split(" ")[1];
    if (!token || token === "") {
      return context;
    }

    let decodedAccessToken;
    let decodedPassResetToken;
    let notAccessFlag = false
    let notResetFlag = false
    try {
      decodedAccessToken = verify(token, process.env.ACCESS_TOKEN_SECRET);
      //console.log(decodedAccessToken)
    } catch (err) {
      // console.log("both here")
      // console.log(err)
      notAccessFlag = true
    }
    try {
      decodedPassResetToken = verify(token, process.env.PASS_RESET_TOKEN_SECRET);
    } catch (err) {
      // console.log(err)
      notResetFlag = true
      
    }
    
    if ((!decodedAccessToken && !decodedPassResetToken)|| (notAccessFlag && notResetFlag )) {
      return context;
    }else if(notAccessFlag){
      // console.log("gimme")
      context.userId = decodedPassResetToken.userId;
      context.email = decodedPassResetToken.email;
      context.passResetExpire = decodedPassResetToken.passResetExpire;
      return context;
      
    }else{
      // console.log("and here")
      context.isAuth = true;
      context.userId = decodedAccessToken.userId;
      context.role = decodedAccessToken.role;

      return context;
    }

  } else if (connection) {
    // console.log("connection", connection.context.authorization);
    const authHeader = connection.context.authorization;
    const context = { isAuth: false, role: null, userId: null };

    if (!authHeader) {
      return context;
    }

    const token = authHeader.split(" ")[1];
    if (!token || token === "") {
      return context;
    }

    let decodedToken;
    try {
      decodedToken = verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      return context;
    }

    if (!decodedToken) {
      return context;
    }

    context.isAuth = true;
    context.userId = decodedToken.userId;
    context.role = decodedToken.role;
    return context;
  }
};
