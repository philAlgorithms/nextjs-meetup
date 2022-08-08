import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList';

function HomePage (props) {
  return (
    <Fragment>
      <Head>
        <title>React meetups</title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps (context) {
//   const req = context.req;
//   const res = context.res;k
  
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps(){
  const client = await MongoClient.connect('mongodb+srv://admin:meetup_123X@cluster0.2dnl0f9.mongodb.net/?retryWrites=true&w=majority');
  const db = client.db();
  
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString()
      }))
    }
  };
}

export default HomePage;