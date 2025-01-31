import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const CafeInformation: React.FC = () => {
    const [userCount, setUserCount] = useState<number>(0);
    const [nowPlayingSongTitle, setNowPlayingSongTitle] = useState<string>("");
    const [nowPlayingSongUrl, setNowPlayingSongUrl] = useState<string>("");
    const [nowPlayingSongReportUrl, setNowPlayingSongReportUrl] = useState<string>("");
    const [nowPlayingSongWorldUrl, setNowPlayingSongWorldUrl] = useState<string>("");

    useEffect(() => {
      const fetchData: () => Promise<void> = async() => {
        try {
          const [userResponse, songResponse] = await Promise.all([
            axios.get<any>('/api/externalApiUserCount'),
            axios.get<any>('/api/externalApiNowPlaying'),
            ]);
          setUserCount(userResponse.data);
          setNowPlayingSongTitle(songResponse.data.title);
          const smNumber: number = songResponse.data.video_id;
          setNowPlayingSongUrl(`https://nicovideo.jp/watch/${smNumber}`);
          setNowPlayingSongReportUrl(`https://report.kiite.jp/song/${smNumber}`);
          setNowPlayingSongWorldUrl(`https://world.kiite.jp/glkw/intro?s=${smNumber}`);
        } catch(error) {
          console.log('Error fetching data: ', error);
        }
      }

      fetchData();
    }, []);

    if(!userCount || !nowPlayingSongTitle) return <div>Loading...</div>

  return (
    <div className="cafe-information">
        <h2>Kiite Cafeの情報</h2>
        <p>現在、{userCount}人が<a href="https://cafe.kiite.jp/pc">Kiite Cafe</a>を利用しています。</p>
        <p>{nowPlayingSongTitle} が流れています。</p>
        <a className="link-niconico" href={nowPlayingSongUrl}>➡️この曲をニコニコ動画で開く(※ニコ動メンテ中)</a><br />
        <a className="link-report" href={nowPlayingSongReportUrl}>➡️この曲をKiite Reportで開く</a><br />
        <a className="link-world" href={nowPlayingSongWorldUrl}>➡️この曲を全曲のKiite Worldで開く</a>
    </div>
  );
};

export default CafeInformation;