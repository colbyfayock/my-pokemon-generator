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

  async function handleOnGenerate(e) {
    e.preventDefault();

    setAttributes(undefined);
    const data = await fetch('/api/pokemon/create').then(res => res.json());
    setAttributes(data.attributes);
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
        <Container className={styles.cardContainer}>
          <div className={styles.card}>
            <Card attributes={attributes} />
            <h2>Backstory</h2>
            {attributes?.backstory && <p>{ attributes.backstory }</p>}
          </div>
          <Form className={styles.form}>
            <h2>Create a new Pokémon!</h2>
            {/* <FormRow>
              <label>Type</label>
              <FormInput name="type" />
            </FormRow> */}
            <FormRow>
              <Button onClick={handleOnGenerate}>Generate</Button>
            </FormRow>
          </Form>
        </Container>
      </Section>
    </Layout>
  )
}
