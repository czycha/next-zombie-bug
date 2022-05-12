import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

interface Props {
  id: string;
  isOld: true;
  isDynamicRoute: true;
}

const Home: NextPage<Props> = props => {
  return (
    <div>
      <Head>
        <title>Old version of site</title>
      </Head>

      <p><strong>Received ID:</strong> {props.id}</p>

      <p><strong>All props:</strong></p>
      <pre><code>{JSON.stringify(props, null, 2)}</code></pre>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<Props, { id: string; }> = async context => {
  const id = context.params?.id ?? 'fallback';

  return {
    props: {
      id,
      isOld: true,
      isDynamicRoute: true,
    }
  }
}
