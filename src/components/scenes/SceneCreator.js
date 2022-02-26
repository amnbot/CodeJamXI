import React,{useState,useEffect} from 'react'

export default function SceneCreator() {
    
    
    const [text,setText] = useState("");
    const [chars,setChars] = useState(0);

    const handleTextChange = (e) =>{
        setText(e.target.value);
        //console.log(text)
    }

    useEffect(() => {
      setChars(text.length)
    }, [text])


  return (
    <div className="flex-col content-center mt-3.5">
        <h1 className="flex m-auto text-4xl justify-center mb-2.5">Write a new scene</h1>
        <div class="m-auto">
        <input type="text" placeholder="Scene Title" maxlength="100" className="m-auto mb-2.5 border-black px-3 py-4 flex text-black bg-white rounded text-base border-0 shadow w-1/2"/>
        </div>

        <textarea onChange={handleTextChange} maxlength="500" className="mb-2.5 m-auto border-black px-3 py-4  flex text-black bg-white rounded text-base border-0 shadow w-1/2" rows="3" placeholder={"Your text..."}/>

        <div className="m-auto flex content-center">
            <h1 className="flex m-auto mb-2.5">{chars}/500 characters</h1>
        </div>

        <div className="flex m-auto items-center">
            <button className="flex m-auto justify-center content-center bg-green-600 text-white rounded-lg px-3 w-1/4 mt-1.5">Submit</button>
        </div>

        
    </div>

  )
}
