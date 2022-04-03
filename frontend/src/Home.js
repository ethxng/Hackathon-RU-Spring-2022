import React, {useEffect, useState} from 'react';
import Navbar from './Navbar'


function Home() {

    let [items, setItems] = useState([]);
    useEffect(() => getItems())

    const getItems = () => {
        let xhr = new XMLHttpRequest()
        xhr.open("GET", "http://localhost:3000/items")
        xhr.setRequestHeader("authorization", sessionStorage.getItem("token"))
        xhr.send()
        xhr.onload = () => {
            console.log(xhr.response)
        };
    }

    return (
        <div>
            <Navbar/>
            <></>
        </div>
    );
}

export default Home;