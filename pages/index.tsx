import type { NextPage } from 'next'
import type { InferGetStaticPropsType } from 'next'
import { Pioneer } from '../components/pioneer'
import {getAllProducts} from "../framework/shopify/product/get-all-products"

export async function getStaticProps() {
  const products = await getAllProducts()
  const revalidatePropsInterval = 4 * 60 * 60

  return {
    props: {products},
    revalidate: revalidatePropsInterval
  }
}

const Home: NextPage = ({
  products
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
    <Pioneer/>
   <h1>{products}</h1>
   </>
  )
}

export default Home
