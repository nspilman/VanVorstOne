import type { NextPage } from 'next'
import type { InferGetStaticPropsType } from 'next'
import { Pioneer } from '../components/pioneer'
import { loadStripe } from "@stripe/stripe-js";
import Layout from './layout';


export async function getStaticProps() {
  const revalidatePropsInterval = 4 * 60 * 60

  return {
    revalidate: revalidatePropsInterval,
    props: {}
  }
}

const stripe = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

console.log({ stripe })

const Home: NextPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Pioneer />
    </Layout>
  )
}

export default Home
