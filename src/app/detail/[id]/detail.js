'use client'
import { useState, createRef } from "react"
import { exportComponentAsJPEG } from 'react-component-export-image'
import Image from "next/image"


export default function Detail(props) {
    const { data } = props
    const meme = data[0]
    const [text1, setTetxt1] = useState('')
    const [text2, setTetxt2] = useState('')
    const [text3, setTetxt3] = useState('')
    const [text4, setTetxt4] = useState('')
    const [name, setName] = useState('khizarHijazi')
    const [password, setPassword] = useState('khzr9396')
    const [generatedMeme, setGeneratedMeme] = useState(null);
    const [toMeme, setToMeme] = useState(false);
    const memeRef = createRef()
    const api = ` https://api.imgflip.com/caption_image?template_id=${meme.id}&username=${name}&password=${password}&boxes[0][text]=${text1}&boxes[1][text]=${text2}&boxes[2][text]=${text3}&boxes[3][text]=${text4}`

    async function generateMeme() {
        await feTchApi()
        setToMeme(true)
    }

    async function feTchApi() {
        const res = await fetch(api)
        const result = await res.json()
        console.log(result.data.url)
        setGeneratedMeme(result.data.url)
    }

    return <div className="memeDetailContainer">
        {!toMeme ?
            <div className="center">
                <h1>Meme Generator</h1>
                <h2>{meme.name}</h2>
                <Image src={meme.url} width='500' height='400' alt={meme.name} className="imgTag" />
                <div className="inputBox">
                    <input type="text" placeholder="text 1" value={text1} onChange={(e) => setTetxt1(e.target.value)} />
                    <input type="text" placeholder="text 2" value={text2} onChange={(e) => setTetxt2(e.target.value)} />
                    <input type="text" placeholder="text 3" value={text3} onChange={(e) => setTetxt3(e.target.value)} />
                    <input type="text" placeholder="text 4" value={text4} onChange={(e) => setTetxt4(e.target.value)} />

                </div>

                <button className="button-14" onClick={generateMeme} >Generate Meme</button>
            </div>
            :
            <div className="center">
                <h1>Generated Meme</h1>
                <h2>{meme.name}</h2>
                <Image ref={memeRef} src={generatedMeme} width='500' height='400' alt={meme.name} className="imgTag" />
                <button className="button-14" onClick={() => exportComponentAsJPEG(memeRef)} >Download</button>
            </div>
        }
    </div>
}

