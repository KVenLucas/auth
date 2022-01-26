import { NextPage } from 'next';

import { FormEvent, useState } from 'react';
import { useAuth } from 'context/AuthContext';
import styles from 'styles/Home.module.scss';
import { withSSRGuest } from 'utils/withSSRGuest';

export const Home: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { signIn, isAuthenticated } = useAuth();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await signIn({ email, password });
  }

  return (
    <div className={styles.container}>
      <div className={styles['container-form']}>
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            autoComplete="on"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">ENTRAR</button>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  };
});

export default Home;
