

import { Router } from 'express';
import { PostURLShortener,
     getShortenerPage, 
     redirectToShortLink,
    getShortenerEditPage,
    postShortenerEditPage,
    deleteShortCode
 } from '../controllers/postshortener.controller.js';

const router = Router();


router.get("/", getShortenerPage);

router.post("/", PostURLShortener );


router.route("/edit/:id").get(getShortenerEditPage).post(postShortenerEditPage)

router.route("/delete/:id").post(deleteShortCode)

router.get("/:shortCode", redirectToShortLink)

export const shortenerRoutes = router;