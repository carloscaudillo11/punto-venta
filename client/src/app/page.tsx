import { redirect } from 'next/navigation';

const HomePage = (): JSX.Element => {
  redirect('/dashboard');
};

export default HomePage;
