import { NextPage } from 'next';
import { withSSRAuth } from 'utils/withSSRAuth';

const Metrics: NextPage = () => {
  return (
    <div>
      <div>Metrics</div>
    </div>
  );
};

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {}
    };
  },
  { permissions: ['metrics.list'], roles: ['administrator'] }
);

export default Metrics;
