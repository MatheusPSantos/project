import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { userIsLogged } from '../utils/auth';

export default function Home() {
  const router = useRouter();

  useEffect(async () => {
    if (await userIsLogged()) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Head>
        <title>To do List</title>
        <meta name="description" content="An to do list application" />
        <link rel="icon" href="https://www.datocms-assets.com/24091/1620295990-bolttech-logo-footer.svg" />
      </Head>
    </>
  )
}
