import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    try {
        console.log("externalApiHotWorld.ts handler()");
        const response = await axios.get<any>('https://world.kiite.jp/api/get/mykw/hot');
        console.log(response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}