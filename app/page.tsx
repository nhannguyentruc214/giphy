"use client"
import "./page.css";
import { useState, useEffect, useContext } from "react";
import {
  Gif,
} from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import Masonry from "react-responsive-masonry"
import Image from "next/image";
import loadingGif from './ZKZg.gif'
import Scroll from "./components/scroll";
import ScrollToTop from "./components/scrollToTop";

const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh")


function GifDemo({ id }: any) {
  const [gif, setGif] = useState<any>(null);

  async function fetchData() {
    return await giphyFetch.gif(id);
  }

  useEffect(() => {
    let data = fetchData();
    data.then(function (result) {
      setGif(result.data);
    })
  }, []);

  return (gif && <Gif noLink={true} hideAttribution={true} gif={gif} width={200} />);
}


export default function Home() {
  const [data, setData] = useState<any>(null);
  const [selections, setSelection] = useState<any>();
  const [state, setState] = useState<any>(false);
  const [searchGoal, setSearchGoal] = useState<any>();
  const [loading, setLoading] = useState<any>(true);
  const [hovered, setHovered] = useState<any>(false);
  const [limit, setLimit] = useState<any>(30);
  const [onScroll, setOnScroll] = useState<any>(false);
  const [scrollLimit, setScrollLimit] = useState<any>(0);

  const fetchGifsSearch = (offset: number) =>
    giphyFetch.search(searchGoal, { offset, sort: 'relevant', lang: 'es', limit: limit, type: 'gifs' });

  const fetchGifsTrending = (offset: number) =>
    giphyFetch.trending({ offset, limit: limit });

  useEffect(() => {
    setScrollLimit(0);
    setLimit(30);
  }, [searchGoal]);

  if (searchGoal) {
    fetchGifsSearch(0).then(
      function (result) {
        setData(result.data);
      }
    );
  }
  else {
    fetchGifsTrending(0).then(
      function (result) {
        setData(result.data);
      }
    );
  }

  return (
    <main className='main'>
      <div className="searchBar">
        <input placeholder='Search all yours gifs here...' className='inputPlaceholder' onChange={(e) => setSearchGoal(e.currentTarget.value)}></input>
      </div>
      <Masonry columnsCount={3} gutter="5px">
        {data != null ? data.map((item: any) =>
          <div key={item.id}>
            <div
              className="gif-block"
              onClick={() => {
                setSelection(
                  item.id
                ),
                  selections == (item.id) ? setState(!state) : setState(true)
              }}
            >
              <GifDemo key={item.id} id={item.id} />
            </div>
            {selections == (item.id) && state ?
              <div className='gifCard'>
                <span style={{
                  display: 'flex', gap: 5
                }}>
                  {item?.user?.avatar_url && loading ?
                    (<span className="avatar-content">
                      <Image onLoad={() => setLoading(false)} onLoadingComplete={() => setLoading(true)} src={item?.user?.avatar_url} alt={""} width={30} height={30} loading="lazy"></Image>
                    </span>) : <Image src={loadingGif} alt={""} width={30} height={30} loading="lazy"></Image>}
                  <span className="detail-block">
                    <div className="text-title">
                      {item?.user?.username ?? ''}
                    </div>
                    <div className="detail-section">
                      <span className="text-content">
                        Rating: {item?.rating ?? ''}
                      </span>
                      <span className="extra-block">
                        <span onMouseEnter={() => setHovered(true)} onMouseOut={() => setHovered(false)} className="extra-content"> More info </span>
                        {hovered ?
                          <div className="hover-card">
                            <div><b>Gif name:</b> {item.title}</div>
                            <div><b>id:</b> {item.id}</div>
                            {item.import_datetime != "0000-00-00 00:00:00" ? <div><b>Imported:</b> {item.import_datetime.substring(0, 10)}</div> : ''}
                            {item.trending_datetime != "0000-00-00 00:00:00" ? <div><b>Trending:</b> {item.trending_datetime.substring(0, 10)}</div> : ''}
                          </div> : ''}
                      </span>
                    </div>
                  </span>
                </span>
              </div> : ''}
          </div>
        ) : ''}
      </Masonry>
      {scrollLimit < 9 ? <div className="loader"></div> : <div className="footer">The end!</div>}
      <Scroll scrollLimit={scrollLimit} setScrollLimit={setScrollLimit} limit={limit} setLimit={setLimit}></Scroll>
      <ScrollToTop onScroll={onScroll} setOnScroll={setOnScroll}></ScrollToTop>
    </main>
  );
}
