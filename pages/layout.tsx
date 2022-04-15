import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

type Props = {
    children: JSX.Element
};

console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Layout: React.FunctionComponent<Props> = ({
    children,
}) => (
    <Elements stripe={stripePromise}
    options={{
        appearance: {
          variables: {
            colorIcon: '#6772e5',
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
          },
        },
        clientSecret: process.env.STRIPE_SECRET_KEY,
      }}>
        {children}
    </Elements>
);

export default Layout;