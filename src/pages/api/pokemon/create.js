const { POKEMON_ATTRIBUTES } = require('@/data/pokemon');

export const config = {
  runtime: 'edge',
}

export default async function handler() {
  try {
    // The OpenAI SDK isn't supported on the Edge runtime, so we need to hit the API directly

    const results = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: `Create a new Pokemon character with the following unique attributes:
  - Name
  - Short description less than 80 characters
  - The type of Pokemon
  - The category of Pokemon it is
  - Number of Hit Points or health
  - The Pokemon's length in inches
  - The Pokemon's weight in pounds
  - The Pokemon's power name and description
  - The Pokemon's attack name with description and Hit Points it would cause in damage
  - The type of Pokemon it is weak against
  - The type of Pokemon it is resistant against
  - The retreat cost of the Pokemon
  - The Pokemon's appearance in less than 600 characters
  - The Pokemon's backstory in less than 600 characters
  Format the response in the following JSON object ${JSON.stringify(POKEMON_ATTRIBUTES)}.`
        }]
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
    }).then(r => r.json());

    console.log(`Results: ${JSON.stringify(results)}}`);
    
    const attributes = JSON.parse(results.choices[0].message.content);

    return new Response(
      JSON.stringify({
        attributes
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  } catch(e) {
    console.log(`Failed to create Pokémon: ${e.message}`);
    return new Response(
      JSON.stringify({
        error: e.message
      }),
      {
        status: 500,
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  }
}