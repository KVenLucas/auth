import { NextPage } from 'next';

import { useEffect } from 'react';
import { useAuth } from 'context/AuthContext';

import { api } from 'services/apiClient';
import { withSSRAuth } from 'utils/withSSRAuth';

const Dashboard: NextPage = () => {
  const { user, signOut } = useAuth();

  useEffect(() => {
    api
      .get('me')
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h4>Dashboard: - {user?.email}</h4>

      <button onClick={signOut}>Sign Out</button>
    </>
  );
};

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  };
});

export default Dashboard;
