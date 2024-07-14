import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

interface Owner {
  user_id?: number;
  nickname?: string;
  avatar_url?: string;
  status?: string;
}

interface Playlist {
  list_title?: string;
  description?: string;
}

interface World {
  user_id?: number;
  color?: string;
  owner?: Owner;
  playlist?: Playlist;
  video_ids?: string[];
}

interface TestData {
  user_ids: number[];
  sync_counts: { [key: string]: number };
  worlds: { [key: string]: World };
  __response_ms: number;
}

// テストデータ
const testData: any = {
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
                "nickname": "テスト",
                "avatar_url": "test2.png",
                "status": "active",
            },
            "playlist": {
                "list_title": "好き好き大好きツアー",
                "description": "好きな曲を発表します。¥nからあげ"
            },
            "video_ids": ["sm9"]
        }
    },
    "__response_ms":237
}

const testData2 = {"user_ids":[24483],"sync_counts":{"24483":14},"worlds":{"24483":{"user_id":24483,"list_id":"TMPMspnMMG","color":"indigo","updated_at":"2024-07-13T13:32:54.000Z","owner":{"user_id":24483,"user_name":"limeade9929","nickname":"かとう","avatar_url":"https://d7209z8dzwjpy.cloudfront.net/avatar/xqRB0klsAkN2wWciFBaETqIkRCgNJA6FWoGO2tub.png","status":"active"},"playlist":{"list_id":"TMPMspnMMG","list_title":"雨の日ツアー","description":"いい感じの歌詞の引用と【】内に曲を聴いた時に私が思ったことを書いてみました"},"video_ids":["sm43531270","sm38927801","sm43167366","sm42578044","sm28614737","sm40310966","sm40530103","sm35954619","sm40555597","sm38311590","sm23019266","sm42481977"]}},"__response_ms":308};

const WorldInformation: React.FC = () => {
    const [data, setData] = useState<any>(testData2);

    useEffect(() => {
      const fetchData: () => Promise<void> = async () => {
        try {
          const [response]: [any] = await Promise.all([
            axios.get<any>('/api/externalApiHotWorld'),
            ]);
          setData(response.data);
          // console.log(response.data);

        // ここからテスト用
        // setData(testData2);
        // ここまでテスト用
        } catch(error) {
          console.log('Error fetching data: ', error);
        }
      }

      fetchData();
    }, []);

    const HotWorldIds: number[] = data.user_ids;
    const HotWorldCount: number = HotWorldIds.length;

    const hotWorld: Array<[string, string, number, string]> = [];
      if (HotWorldCount > 0) {
      for (let i = 0; i < HotWorldCount; i++) {
          const id: string = String(HotWorldIds[i]);
          const nickname: string = data.worlds[id].owner.nickname;
          const listTitle: string = data.worlds[id].playlist.list_title;
          const syncCount: number = data.sync_counts[id];
          hotWorld[i] = [nickname, listTitle, syncCount, `hot-world${i}`];
      }  
    }

    
  return (
    <div className="world-information">
        <h2>Kiite Worldの情報</h2>
        {HotWorldCount > 0 ?
          <div>現在、{HotWorldCount}つのKiite Worldが盛り上がっています。
            {hotWorld.map((a, i) => (
                <p key={a[3]}>{i+1}: {a[0]}さんのKiite World:{a[1]}を{a[2]}人で同期しています。</p>
            ))}
          </div> :
          <div>同期中のユーザーが3人以上のKiite Worldが表示されます。</div>
        }
    </div>
  );
};

export default WorldInformation;