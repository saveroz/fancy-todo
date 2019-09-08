function errorHandler (err, req, res, next) {
  if(err.name=='JsonWebTokenError'){
    // console.log("masuk ke json error")
    res.status(401).json({
      message : "invalid token"
    })
  }
  else if(err.name=="ValidationError"){
    console.log((err.message))
    res.status(400).json({
      message :err.message
    })
  }
  else {
    res.status(err.status || 500).json({
      message : err.message
    })
  }
}

module.exports = errorHandler
