const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  try {
    const body = req.body && JSON.parse(req.body);
    const { description } = body || {};

    const results = await openai.createImage({
      prompt: `Create an image of a new Pokemon with a plain colored background that has no text or objects from the description: ${description}`,
      n: 2,
      size: '1024x1024',
    });

    console.log(`Results: ${JSON.stringify(results.data)}}`);

    res.status(200).json({
      image: results.data.data[0]
    });
  } catch(e) {
    console.log(`Failed to create Pokémon image: ${e.message}`);
    res.status(500).json({
      error: e.message
    });
  }
}
