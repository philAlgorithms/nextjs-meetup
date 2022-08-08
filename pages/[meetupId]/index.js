import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
    return (
         <MeetupDetail 
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            detail={props.meetupData.address}
         />
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://admin:meetup_123X@cluster0.2dnl0f9.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

    client.close();

    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {meetupId: meetup._id.toString()}
        })),
    }
}

export async function getStaticProps(context){
    const meetupId = context.params.meetupId;  

    const client = await MongoClient.connect('mongodb+srv://admin:meetup_123X@cluster0.2dnl0f9.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                title: selectedMeetup.title,
                description: selectedMeetup.description
            }
        }
    };
}

export default MeetupDetails;