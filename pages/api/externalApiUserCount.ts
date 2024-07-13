import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const response = await axios.get('https://cafeapi.kiite.jp/api/cafe/user_count');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}