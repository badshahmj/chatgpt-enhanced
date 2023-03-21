//npm install express cors body-parser morgan openai --save
//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

const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

//add bodyparser and corrs to express
const bodyparser = require('body-parser');
const cors = require('cors');

const configuration = new Configuration({
  organization: 'org-omZyggEOnTd73kVSDeZpPeTb',
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

//Create a simple express api that calls the function above

const app = express();
app.use(bodyparser.json());
app.use(cors());

const port = process.env.PORT;

app.post('/', async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });

  res.json({
    message: response.data.choices[0].text,
  });
  //res.send("Hello world");
});

app.post('/', async (req, res) => {
  const { message, currentModel } = req.body;
  const response = await openai.createCompletion({
    model: `${currentModel}`,
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });

  res.json({
    message: response.data.choices[0].text,
  });
  //res.send("Hello world");
});

app.get('/models', async (req, res) => {
  // import { Configuration, OpenAIApi } from "openai";
  // const configuration = new Configuration({
  //     organization: "org-omZyggEOnTd73kVSDeZpPeTb",
  //     apiKey: process.env.OPENAI_API_KEY,
  // });
  // const openai = new OpenAIApi(configuration);
  const response = await openai.listEngines();
  console.log(response.data.data);
  res.json({
    models: response.data.data,
  });
});

app.listen(port, () => {
  console.log(`app listening at ${port} ${process.env.API_KEY}`);
});
