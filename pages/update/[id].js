import styles from '@/styles/Home.module.css'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export async function getServerSideProps(context) {
    console.log("getServerSideProps API_URL", process.env.NEXT_PUBLIC_API_URL);
    
    // 데이터 가져오기 등의 작업 수행
    const data = await fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+context.query.id);
    const json = await data.json();
  
    // props로 전달할 데이터 반환
    return {
      props: {
        data: json
      }
    };
  }

export default function Update(props) {
    //const topic = props.data;
    const router = useRouter();
    const [title, setTitle] = useState(props.data.title);
    const [body, setBody] = useState(props.data.body);
    return (
        <>
        <Head>
        <title>WEB - Update</title>
        </Head>
        
        <form onSubmit={(evt)=>{
          evt.preventDefault();
          const title = evt.target.title.value;
          const body = evt.target.body.value
          fetch('http://localhost:9999/topics/'+router.query.id, {
            method: 'PATCH',
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
            <h2>Update</h2>
            <p><input type="text" name="title" placeholder="title" value={title} onChange={evt=>{
              console.log(evt.target.value);
              setTitle(evt.target.value);
            }}/></p>
            <p><textarea name="body" placeholder='body' value={body} onChange={evt=>{
              setBody(evt.target.value);
            }}></textarea></p>
            <p><input type="submit" value="Update"/></p>
        </form>
      </>
    )
}
