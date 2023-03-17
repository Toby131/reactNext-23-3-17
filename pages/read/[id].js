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

export default function Read(props) {
    const topic = props.data;
    return (
        <>
        <Head>
        <title>WEB - Read</title>
        </Head>
        
        <h2>{topic.title}</h2>
        {topic.body}
        </>
    )
}
