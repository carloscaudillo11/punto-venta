import Loading from './loading';
import { Suspense } from 'react';

const BoxesLayout = ({
  children
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Suspense fallback={<Loading />}>
      <main className="p-6 md:p-10">{children}</main>
    </Suspense>
  );
};
export default BoxesLayout;
