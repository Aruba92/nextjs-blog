import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
//import useSWR from 'swr';
import Link from 'next/link';
import Date from '../components/date';

/*Fetch data in BUILD TIME (server-side) => an async function named getStaticProps is used in Next for fetch data. It says to Next that this code has to be executed before rendering the page
*/
export async function getStaticProps() {
  //geting data from FILESYSTEM
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };

  //getting data from API endpoint
  const res = await fetch('..');
  const posts = await res.json();
  return posts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });

  //getting data from DATABASE
  /* return databaseClient.query('SELECT posts...') */
}

/*Fetch data in REQUEST TIME (server-side) => an async function named getServerSideProps is used in Next for fetch data. It says to Next that this code has to be executed before rendering the page
https://nextjs.org/learn-pages-router/basics/data-fetching/request-time
*/
/* export async function getServerSideProps(context){
  return{
    props:{

    }
  };
} */

/*Fetch data in REQUEST TIME (client-side) => using the Next React hook SWR
https://nextjs.org/learn-pages-router/basics/data-fetching/request-time
*/
/* function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
} */


export default function Home( {allPostsData} ) {
  return (
    <Layout home> {/* props without value are read as boolean, and booleans not defined are true by default. */}
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}