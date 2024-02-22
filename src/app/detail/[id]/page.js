import Detail from "./detail"

export default async function SingleMeme(props) {

        const res = await fetch('https://api.imgflip.com/get_memes')
        const result = await res.json()
        const single = result.data.memes
        const data = single.filter(item => item.id === props.params.id)
        console.log(data)

        return <Detail data={data} />

}