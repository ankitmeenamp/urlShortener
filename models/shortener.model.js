
// import { readFile, writeFile } from 'fs/promises';

// import path from 'path';

//  const DATA_FILE = path.join("data", "link.json")

// export const loadLinks = async () => {
//     try {
//         const data = await readFile(DATA_FILE, "utf-8");
//         return JSON.parse(data);
//     } catch (error) {
//         if (error.code === "ENOENT") {
//             await writeFile(DATA_FILE, JSON.stringify({}))
//             return {};
//         }
//         throw error;
//     }
// }

// export const saveLinks = async (links) => {
//     await writeFile(DATA_FILE, JSON.stringify(links))
// }


// import { link } from "node:fs";
// import { dbClient } from "../config/db-client.js";
// import { env } from "../config/env.js";

// const db = dbClient.db(env.MONGODB_DATABASE_NAME);
// const shortenerCollection = db.collection("shorteners")


// import { ro } from 'zod/locales';
// import { db } from '../config/db-client.js'

// export const loadLinks = async () => {
//     // return shortenerCollection.find().toArray();
//     const [rows] = await db.execute('select * from short_links')
//     return rows;
// }

// export const saveLinks = async ({url, shortCode}) => {
//     // return shortenerCollection.insertOne(link);
//     const [results] = await db.execute('insert into short_links(short_code, url) values(?,?)',
//         [shortCode, url]
//     );
//     return results;
// }

// export const getLinkByShortCode = async (shortCode) => {
//     // return await shortenerCollection.findOne({ shortCode: shortCode })

//     const [rows] = await db.execute(`select * from short_links where short_code = ?`,[shortCode]);

//     if(rows.length > 0){
//         return rows[0];
//     }else{
//         return null;
//     }   
// }