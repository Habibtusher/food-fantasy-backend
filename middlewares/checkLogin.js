const checkLogin = (req, res, next) => {

const {authorization} = req.headers;

try{
  console.log(authorization)
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode",decoded)
    const {username, userid} = decoded;
    console.log(username, userid)
    req.username = username;
    req.userid = userid;

    next();
} catch{

  next("error")
}

}

module.exports = checkLogin;