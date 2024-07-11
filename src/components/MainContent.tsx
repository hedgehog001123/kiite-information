import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MainContent.module.css";

const MainContent: React.FC = () => {
    const [userCount, setUserCount] = useState<string | null>(null);
    const [nowSong, setNowSong] = useState<string | null>(null);
    const [nowSongUrl, setNowSongUrl] = useState<string>("https://www.nicovideo.jp/watch/");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://cafeapi.kiite.jp/api/cafe/user_count');
                setUserCount(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError('userCountの取得中にエラーが発生しました');
                setLoading(false);
            }
        };

        const fetchData2 = async () => {
            try {
                setLoading(true);
                const response2 = await axios.get('https://cafeapi.kiite.jp/api/cafe/now_playing');
                setNowSong(response2.data.title);
                console.log()
                setNowSongUrl(`https://www.nicovideo.jp/watch/${response2.data.video_id}`);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError('nowSongの取得中にエラーが発生しました');
                setLoading(false);
            }
        };

        fetchData();
        fetchData2();
    }, []);

    return (
        <main className={styles.mainContent}>
            <h1>わくわくサイト</h1>
            <p>わくわく説明文</p>
            <section>
                <h2>Kiite CafeやKiite Worldの情報</h2>
                {loading && <p>データを読み込み中...</p>}
                {error && <p className={styles.error}>{error}</p>}
                {userCount !== null && (
                    <p>現在、<a href="https://cafe.kiite.jp/pc">Kiite Cafe</a>に<strong> {userCount} </strong>人います</p>
                )}
                {nowSong !== null && (
                    <div>
                        <p>Kiite Cafeでは、 <strong>{nowSong}</strong> が流れています。</p>
                        <a href={nowSongUrl}>→この曲をニコニコ動画で開く(※現在メンテ中)</a>
                        
                    </div>
                    
                )}
            </section>
        </main>
    );
};

export default MainContent;