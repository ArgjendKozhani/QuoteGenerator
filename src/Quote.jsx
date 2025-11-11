import { useState, useEffect } from "react";
import "./Quote.css"
function GetQuote() {
    const [data, setData] = useState(null)


  
    async function showQuote() {
        try {
            const url = "http://api.quotable.io/random"
            const response = await fetch(url)
            const getData = await response.json()
            setData(getData)
            console.log(getData)

        }
        catch (err) {
            console.error("Couldnt fetch data ", err)
        }

    }

    useEffect(() => {
        showQuote()
  
    }, [])

    return (
        <>
            {data ? <>
                <div className="container">
                    <h2>Quote of the day</h2>
                    <button onClick={showQuote}>New Quote</button>
                    <p className="quote">"{data.content}"</p>
                    <i className="author">{data.author}</i>

                </div>

            </> : null}
        </>
    );

}


export default  GetQuote