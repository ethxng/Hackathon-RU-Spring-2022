import React, {useEffect, useState} from 'react';
import Navbar from './Navbar'
import Item from './Item'


function Home() {
    let dataLoaded = false
    let [data, setData] = useState()
    let items = [];
    useEffect(() => getItems())

    const getItems = () => {
        if (dataLoaded === false) {
            let xhr = new XMLHttpRequest()
            xhr.open("GET", "http://localhost:3000/items")
            xhr.setRequestHeader("authorization", "Bearer " + sessionStorage.getItem("token"))
            xhr.send()
            xhr.onload = () => {
                if (xhr.status === 200) {
                    console.log(JSON.parse(xhr.response))
                    items = JSON.parse(xhr.response)
                    items = items.map((item) => {
                        return <Item 
                        
                        key={item._id}
                        itemName={item.item}
                        authorName={item.OP.username}
                        description={item.description}
                        />
                    })
                    console.log(items)
                    setData(items)
                    dataLoaded = true
                }
            };}
    }   

    

    return (
        <div>
            <Navbar/>
            {data}
        </div>
    );
}

export default Home;