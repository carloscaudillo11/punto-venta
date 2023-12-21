import Loading from './loading';
import { Suspense } from 'react';

const ProductsLayout = ({
  children
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};
export default ProductsLayout;
