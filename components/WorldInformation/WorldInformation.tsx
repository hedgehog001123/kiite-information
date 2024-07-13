import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

// テストデータ
const testData = {
    "user_ids":[12345, 67890],
    "sync_counts":{"67890": 8, "12345": 5},
    "worlds": {
        "67890":{
            "user_id": 67890,
            "color": "cyan",
            "owner": {
                "user_id": 67890,
                "nickname": "ミク",
                "avatar_url": "test.png",
                "status": "active",
            },
            "playlist": {
                "list_title": "クリプトンズツアー",
                "description": ""
            },
            "video_ids": ["sm9"]
        },
        "12345":{
            "user_id": 12345,
            "color": "indigo",
            "owner": {
                "user_id": 12345,
                "nickname": "真紅",
                "avatar_url": "test2.png",
                "status": "active",
            },
            "playlist": {
                "list_title": "好き好き大好き曲ツアー",
                "description": "好きな曲を発表します。¥nからあげ"
            },
            "video_ids": ["sm9"]
        }
    },
    "__response_ms":237
}

const WorldInformation: React.FC = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const [response] = await Promise.all([
            axios.get('/api/externalApiHotWorld'),
            ]);
          setData(response.data);

        // ここからテスト用
        // setData(testData);
        // ここまでテスト用
        } catch(error) {
          console.log('Error fetching data: ', error);
        }
      }

      fetchData();
    }, []);

    console.log(data);
    const HotWorldIds = data.user_ids;
    const HotWorldCount = HotWorldIds.length;

    const hotWorld = [];
    for (let i = 0; i < HotWorldCount; i++) {
        const id = HotWorldIds[i];
        const nickname = data.worlds[id].owner.nickname;
        const listTitle = data.worlds[id].playlist.list_title;
        const syncCount = data.sync_counts[id];
        hotWorld[i] = [nickname, listTitle, syncCount];
    }
   
  return (
    <div className="world-information">
        <h2>Kiite Worldの情報</h2>
        {HotWorldCount > 0 ?
          <div>現在、{HotWorldCount}つのKiite Worldが盛り上がっています。
            {hotWorld.map((a, i) => (
                <p>{i+1}: {a[0]}さんのKiite World:{a[1]}を{a[2]}人で同期しています。</p>
            ))}
          </div> :
          <div>同期中のユーザーが3人以上のKiite Worldが表示されます。</div>
        }
    </div>
  );
};

export default WorldInformation;