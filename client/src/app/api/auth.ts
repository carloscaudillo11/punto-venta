import axios from './axios';

export const signinRequest = async (user: any): Promise<string[]> => {
  const response = await axios.post(`/auth/signin`, user);
  return response.data;
};
