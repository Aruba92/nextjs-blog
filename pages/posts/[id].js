import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Post( {postData} ) {
    return (
        <Layout>
          <Head>
            <title>{postData.title}</title>
          </Head>
          <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
              <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </article>
        </Layout>
      );
}


/*
 * DYNAMIC ROUTES 
*/
// Next function for define a list with possible values in the dynamic path
export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = getAllPostIds();
    return {
      paths,
      fallback: false,//if false, all path not returned by this function will return 404 page
    };
}
// Exporting this function will pre-render a page at build time using the props returned from the function.
// Params => get the params from the url props /post/[id] because this file is [id] too.
// Return => props:PostData as params for Post Component.
export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
  }