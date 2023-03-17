import styles from '@/styles/Home.module.css'
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Create() {
  const router = useRouter();
  return (
    <>
    <Head>
      <title>WEB - Create</title>
    </Head>
    <form onSubmit={(evt)=>{
      evt.preventDefault();
      const title = evt.target.title.value;
      const body = evt.target.body.value
      fetch('http://localhost:9999/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          body //축약형 코드
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        router.push('/read/'+data.id);
      })
    }}>
        <h2>Create</h2>
        <p><input type="text" name="title" placeholder="title" /></p>
        <p><textarea name="body" placeholder='body'></textarea></p>
        <p><input type="submit" value="Create"/></p>
    </form>
    </>
  )
}
