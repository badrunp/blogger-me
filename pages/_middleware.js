import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export default function middleware(req) {

    const { _TOKEN } = req.cookies;

    if (_TOKEN) {
        try {
            const payload = jwt.verify(_TOKEN, process.env.JWT_SECRET)
            if (req.url === "/login" || req.url === '/register') {
                if (payload) return NextResponse.redirect('/')
            }
        } catch (error) {
        }
    }



}