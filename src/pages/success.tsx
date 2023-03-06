import { SuccessContainter, ImageContainer } from "../styles/pages/success";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";
interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}
export default function Success(props: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainter>
        <h1>Compra efetuada !</h1>
        <ImageContainer>
          <Image src={props.product.imageUrl} width={120} height={110} alt="" />
        </ImageContainer>

        <p>
          uhulll <strong>{props.customerName}</strong>, sua{" "}
          <strong>{props.product.name}</strong> já foi confirmada
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainter>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const sessionId = String(query.session_id);

  console.log(sessionId);
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details.name;
  const products = session.line_items.data[0].price.product as Stripe.Product;
  return {
    props: {
      customerName,
      product: {
        name: products.name,
        imageUrl: products.images[0],
      },
    },
  };
};
