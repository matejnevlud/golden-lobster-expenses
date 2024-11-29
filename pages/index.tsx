import { Layout } from 'antd';
import ExpenseForm from '../components/ExpenseForm';
import Head from 'next/head';

const { Content } = Layout;

export default function Home() {
  return (
    <>
      <Head>
        <title>Golden Lobster Expenses</title>
        <meta name="description" content="Business expense tracking application" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Layout>
        <Content>
          <ExpenseForm />
        </Content>
      </Layout>
    </>
  );
}
