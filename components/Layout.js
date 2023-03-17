import { Container } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

export function Layout(props) {
  const router = useRouter();
  const [topics, setTopics] = useState([]);
  console.log("API_URL", process.env.NEXT_PUBLIC_API_URL)
  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_API_URL +'topics')
    .then(res=>res.json())
    .then(result=>{
      setTopics(result);
    })
  },[router.asPath]);

  //for문 사용하기
  //let topicTags =[]
  // for(let i = 0 ; i < topics.length; i++){
  //   topicTags.push(<li key={topics[i].id}>
  //     <Link href={'/read/'+topics[i].id}>{topics[i].title}</Link>
  //   </li>)
  // }

  //map함수 사용하기
  let topicTags = topics.map(e=>{
    return <li key={e.id}><Link href={"/read/"+e.id}>{e.title}</Link></li>
  });

  return <Container maxWidth="sm">
    <header>
      <h1><Link href="/">WEB</Link></h1>
    </header>

    <Grid container spacing={10}>
      <Grid item sm={3} xs={12}>
        <nav>
          <ol>
            {topicTags}
          </ol>
        </nav>
      </Grid>
      <Grid item sm={9} xs={12}>
        {props.children}
        <ul>
          <li><Link href="/create">Create</Link></li>

          {router.query.id === undefined ? null : <>
            <li><Link href={"/update/"+router.query.id}>Update</Link></li>
            <li><button onClick={()=>{
              fetch(process.env.NEXT_PUBLIC_API_URL + 'topics/' + router.query.id,{
                method: 'DELETE'
              })
              .then(res=>{
                if(res.status===200){
                  router.push('/');
                }else{
                  alert('CAN NOT DELETE!');
                }
              })
            }}>Delete</button></li></>
          }
          
        </ul>
      </Grid>
    </Grid>
  </Container>;
}
