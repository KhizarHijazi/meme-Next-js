import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default async function Home() {

  const res = await fetch('https://api.imgflip.com/get_memes')
  const result = await res.json()
  console.log(result)
  const memes = result.data.memes


  return (
    <div className="dashboardContainer">
      <h1>Memes Dashboard</h1>

      <div className="memeBox">
        {memes.map((item, index) => {
          return <Link
            href={`/detail/${item.id}`}
          >
            <div className="memeMap">

              <h3>{item.name}</h3>
              <Image
                src={item.url} width='300' height='300' className="imgTag" />
            </div>
          </Link>
        })}
      </div>

    </div>
  );
}
