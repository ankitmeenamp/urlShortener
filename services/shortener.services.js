
import { db } from "../config/db.js"
import { shortLinkTable } from "../drizzle/schema.js"
import { eq } from "drizzle-orm";


export const loadLinks = async (userId) => {
    return await db.select().from(shortLinkTable).where(eq(shortLinkTable.userId, userId));
}

export const getLinkByShortCode = async (shortCode) => {
    const [result] = await db.select().from(shortLinkTable).where(eq(shortLinkTable.shortCode, shortCode));
    return result;
};

export const insertShortLink = async ({ url, shortCode, userId }) => {
    await db.insert(shortLinkTable).values({ url, shortCode, userId })
}

export const findShortLinkById = async (id) => {
  const [result] = await db.select().from(shortLinkTable).where(eq(shortLinkTable.id, id));
    return result;
}

export const updateShortLink = async (id, url, shortCode) => {
    return await db
        .update(shortLinkTable)
        .set({
            url,
            shortCode,
        })
        .where(eq(shortLinkTable.id, Number(id)));
};

export const deleteShortCodeById = async(id)=>{
    return await db.delete(shortLinkTable).where(eq(shortLinkTable.id, id))

}