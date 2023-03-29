import { useState } from 'react';
import Head from 'next/head'

import Layout from '@/components/Layout';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Form from '@/components/Form';
import FormRow from '@/components/FormRow';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import Card from '@/components/Card';

import styles from '@/styles/Home.module.scss'

export default function Home() {
  const [attributes, setAttributes] = useState();
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleOnGenerate(e) {
    e.preventDefault();

    setIsLoading(true);
    setAttributes(undefined);
    setImage(undefined);
    setError(undefined);

    try {
      const data = await fetch('/api/pokemon/create').then(res => res.json());

      setAttributes(data.attributes);

      const { image } = await fetch('/api/pokemon/image', {
        method: 'POST',
        body: JSON.stringify({
          description: data.attributes.appearance
        })
      }).then(res => res.json());
      
      setImage(image);
    } catch(e) {
      setError(e.message);
    }

    setIsLoading(false);
  }

  return (
    <Layout>
      <Head>
        <title>Pokémon Generator</title>
        <meta name="description" content="Create a new Pokémon with AI!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section>
        <Container className={styles.cardContainer} size="content">
          <div className={styles.card}>
            <Card attributes={attributes} image={image} isLoading={isLoading} />
          </div>
          <Form className={styles.form}>
            <h2>Create a new Pokémon!</h2>
            <p>
              Click generate below to create a completely custom Pokémon using
              the <a href="https://openai.com/blog/introducing-chatgpt-and-whisper-apis">ChatGPT</a> &amp;
              the <a href="https://openai.com/blog/dall-e-api-now-available-in-public-beta">DALL-E</a> APIs from OpenAI.</p>
            <FormRow>
              <Button onClick={handleOnGenerate} disabled={isLoading}>Generate</Button>
            </FormRow>
            {isLoading && (
              <p>Hold tight... generating your new favorite Pokémon!</p>
            )}
            {error && (
              <>
                <h3>Uh oh, something went wrong...</h3>
                <p>Click Generate to try again!</p>
                <p className={styles.formTip}>Tip: The free tier for API Endpoints times out at 10s, so if the Create network request took longer than 10s, that&apos;s why!</p>
              </>
            )}
          </Form>
        </Container>
      </Section>
      <Section>
        <Container className={styles.attributesContainer} size="tiny">
          {attributes && (
            <>
              <h2>{ attributes.name }</h2>

              <p>{ attributes.type } · { attributes.hitPoints } HP</p>

              <p>{ attributes.category } Pokémon · Ht: { attributes.lengthInches }&quot; · WT: { attributes.weightPounds } lbs</p>

              <h3>Description</h3>

              <p>{ attributes.description }</p>

              <ul>
                <li>Resistance: { attributes.resistance }</li>
                <li>Retreat Cost: { attributes.retreatCost }</li>
                <li>Weakness: { attributes.weakness }</li>
              </ul>

              <h3>Attack</h3>
              <ul>
                <li>Name: { attributes.attack.name }</li>
                <li>Description: { attributes.attack.description }</li>
                <li>Hit Points: { attributes.attack.hitPoints }</li>
              </ul>

              <h3>Power</h3>
              <ul>
                <li>Name: { attributes.power.name }</li>
                <li>Description: { attributes.power.description }</li>
                <li>Hit Points: { attributes.power.hitPoints }</li>
              </ul>
              
              <h3>Appearance</h3>
              <p>{ attributes.appearance }</p>
              
              <h3>Backstory</h3>
              <p>{ attributes.backstory }</p>
            </>
          )}
        </Container>
      </Section>
    </Layout>
  )
}

export const POKEMON_ATTRIBUTES = {

  category: 'Lizard',
  description: 'A fiery lizard with petals for armor',
  hitPoints: 80,
  lengthInches: 24,
  resistance: 'Grass',
  retreatCost: 2,
  type: 'Fire',
  weakness: 'Water',
  weightPounds: 35
};
