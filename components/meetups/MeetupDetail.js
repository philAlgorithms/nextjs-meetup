import { Fragment } from "react";
import classes from './MeetupDetail.module.css';

function MeetupDetail (props) {
    return (
        <section className={classes.detail}>
            <img src={props.image} alt='' />
            <h1>{props.title}</h1>
            <address>{props.addresss}</address>
            <p>{props.detail}</p>
        </section>  
    );
}

export default MeetupDetail