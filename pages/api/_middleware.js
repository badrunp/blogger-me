import jsonwebtoken from "jsonwebtoken";
import { NextResponse } from "next/server";

export default function middleware(req) {

    if (req.url == '/api/user/edit-photo') {
        const { _TOKEN } = req.cookies;
        try {
            const payload = jsonwebtoken.verify(_TOKEN, process.env.JWT_SECRET);
        } catch (error) {
            console.log(error);
            NextResponse.redirect('/')
        }
    }

}