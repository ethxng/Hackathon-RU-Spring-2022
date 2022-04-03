import React, {useEffect, useState} from 'react';
import Navbar from './Navbar'
import Item from './Item'
import {Grid} from '@mui/material'

function Home() {

    let items = [];
    useEffect(() => getItems())

    const getItems = () => {
        let xhr = new XMLHttpRequest()
        xhr.open("GET", "http://localhost:3000/items")
        xhr.setRequestHeader("authorization", "Bearer " + sessionStorage.getItem("token"))
        xhr.send()
        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log(JSON.parse(xhr.response))
                items = JSON.parse(xhr.response)
                items = items.map((item1) => {
                    return <Grid item>
                        <Item 
                            key={item1._id}
                            itemName={item1.item}
                            authorName={item1.OP.username}
                            description={item1.description}
                        />
                    </Grid>
                })
                console.log(items)
            }
        };
    }

    const numbers = [1, 2, 3, 4];
    const listItems = numbers.map((number) =>
    <li>{number}</li>
);

    return (
        <Grid container>
            <Navbar/>
            
        </Grid>
    );
}

export default Home;