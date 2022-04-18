import type { NextPage } from 'next'
import type { InferGetStaticPropsType } from 'next'
import { Product } from '../components/product.tsx'
import Layout from './layout';
import Stripe from 'stripe';


export async function getStaticProps() {
  const revalidatePropsInterval = 4 * 60 * 60


  const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY || "",
    { apiVersion: "2020-08-27" },
  );

  const products = await (await stripe.products.list()).data

  return {
    revalidate: revalidatePropsInterval,
    props: { products }
  }
}


const Home: NextPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <>
        {props.products.map(product => <Product product={product} />)}
      </>
    </Layout>
  )
}

export default Home
