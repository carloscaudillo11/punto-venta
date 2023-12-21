import Loading from './loading';
import { Suspense } from 'react';

const BoxesLayout = ({
  children
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};
export default BoxesLayout;
