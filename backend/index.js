


const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const configuration = new Configuration({
  apiKey: "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",
  
});
const openai = new OpenAIApi(configuration);


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/image", async (req, res) => {
  
  try {

    const { prompt } = req.body;
   

  // Generate image from prompt
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });

  res.send(response.data.data[0].url);
console.log(response.data.data[0].url)
  

    
  } catch (error) {
    
    res.status(500).json(error); 
  }


});

console.log("hi")

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});