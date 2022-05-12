import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

const ID = 'new-zombie'

interface Props {
  isNew: true;
  isDynamicRoute: false;
}

const Home: NextPage<Props> = props => {
  return (
    <div>
      <Head>
        <title>Old version of site</title>
      </Head>

      <p><strong>Received ID:</strong> {ID}</p>

      <p><strong>All props:</strong></p>
      <pre><code>{JSON.stringify(props, null, 2)}</code></pre>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      isNew: true,
      isDynamicRoute: false,
    }
  }
}
