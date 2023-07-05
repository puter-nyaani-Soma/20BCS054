const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json()); // Parse JSON request bodies
let authToken = ''; // Variable to store the auth token

// Axios interceptor to modify request headers
axios.interceptors.request.use((config) => {
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`; // Add the token to the request headers
    }
    return config;
  });
  


app.get('/', async (req, res) => {
  try {

    const requestData = {
        "companyName":"Train Central",
        "clientID": "a3f6e12b-91f7-43b4-9683-1983f30ad522",
        "ownerName":"Somasundaram",
        "ownerEmail":"selvidcoc67_cs@mepcoeng.ac.in",
        "rollNo":"20BCS054",		
        "clientSecret": "KzJsRPeJbpTqWPUl"
    }
    const response = await axios.post('http://104.211.219.98/train/auth', requestData);
   authToken = response.data.access_token;
   console.log(authToken);

    
   res.redirect('/train/trains')
  
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.get('/train/trains',async (req,res) => {
    
    const response= await axios.get('http://104.211.219.98/train/trains');
    res.send(response.data);
})
