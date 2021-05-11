import React from 'react';
import { Jumbotron } from 'reactstrap';

export default function HomeCard(props) {

    const { title, toPage, setPage } = props;

    return (
        <Jumbotron className="card-item" onClick={() => {setPage(toPage)}}>
            <h2>{title}</h2>
        </Jumbotron>
    )
}