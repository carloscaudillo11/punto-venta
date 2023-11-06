import SignIn from './SignIn';
import { Toaster } from 'sonner';

const SignInPage = (): JSX.Element => {
  return (
    <>
      <Toaster position="top-center" richColors />
      <SignIn />
    </>
  );
};

export default SignInPage;
