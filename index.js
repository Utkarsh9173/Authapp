const express = require('express')
const app = express()

// Import the axios library, to make HTTP requests
const axios = require('axios')

// This is the client ID and client secret that you obtained
// while registering the application
const clientID = 'f22294466e5ade8de5e2'
const clientSecret = '1d61d8be44c3ae0290111921fd413475a7745b56'


// Declare the redirect route
app.get('/home', (req, res) => {

  // The req.query object has the query params that were sent to this route.
  const requestToken = req.query.code
  
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
         accept: 'application/json'
    }
    
  }).then((response) => {
    
    const accessToken = response.data.access_token
    console.log(response.data,"hereeee");
    console.log(response.data,"Response.data.access_token")
    
    // redirect the user to the home page, along with the access token
    res.redirect(`/home.html?code=${accessToken}`)
  })
})

app.use(express.static(__dirname + '/public'))
console.log(__dirname + '/public');
app.listen(4000,()=>{
    console.log("Server listening on port : 4000")
})