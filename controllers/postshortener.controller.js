

import crypto from 'crypto';
import { deleteShortCodeById, findShortLinkById, getLinkByShortCode, insertShortLink, loadLinks, updateShortLink } from '../services/shortener.services.js';
import z from 'zod';


export const getShortenerPage = async (req, res) => {
    try {
        if (!req.user) return res.redirect("/login")

        const links = await loadLinks(req.user.id);

        return res.render("index", {
            links,
            host: req.host,
            errors: req.flash("error"),
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");

    }
}

export const PostURLShortener = async (req, res) => {
    try {
        if (!req.user) return res.redirect("/login")

        const { url, shortCode } = req.body;
        const finalshortCode = shortCode || crypto.randomBytes(4).toString("hex");

        // const links = await loadLinks();
        const link = await getLinkByShortCode(finalshortCode);

        if (link) {
            // return res.status(400).send("short code already axists. please choose another.")
            req.flash("error", "url with that shortcode axists, please choose another. ");
            return res.redirect("/");
        }

        await insertShortLink({ url, shortCode: finalshortCode, userId: req.user.id })

        return res.redirect("/")

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");

    }
}

export const redirectToShortLink = async (req, res) => {
    try {
        const { shortCode } = req.params;
        console.log("ShortCode:", shortCode);
        // const links = await loadLinks();

        const link = await getLinkByShortCode(shortCode);
        console.log("~ redirectToShortLink: ~ Link: ", link);


        // if (!links[shortCode]) return res.status(404).send("404 error occured");

        if (!link) return res.status(404).send("404 error occured");

        return res.redirect(link.url);

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}

export const getShortenerEditPage = async (req, res) => {
    if (!req.user) return res.redirect("/login")
    // const id = req.params;
    const { data: id , error } = z.coerce.number().int().safeParse(req.params.id);

    if (error) return res.status(404).send("404 error occured");

    try {
        const shortLink = await findShortLinkById(id)
        if (!shortLink) return res.status(404).send("404 error occured");

       return res.render("edit-shortLink", {
    id: shortLink.id,
    url: shortLink.url,
    shortCode: shortLink.shortCode,
    errors: req.flash("error"),
});

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}

export const postShortenerEditPage = async (req, res) => {
    if (!req.user) return res.redirect("/login");
     

    const { id } = req.params;
    const { url, shortCode } = req.body;

    try {

        await updateShortLink(id, url, shortCode);

        return res.redirect("/");

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
};

export const deleteShortCode=async (req, res)=>{
    try {
           
    console.log("DELETE ID:", req.params.id);

    const { data: id , error } = z.coerce.number().int().safeParse(req.params.id);

    if (error) return res.status(404).send("404 error occured");
        
    await deleteShortCodeById(id)
    return res.redirect("/")
    } catch (err) {
      
        console.error(err);
        return res.status(500).send("Internal server error")
    }
}