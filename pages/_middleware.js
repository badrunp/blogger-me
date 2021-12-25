import { NextResponse } from "next/server";

export default function middleware(req){

    const {_TOKEN, _USR} = req.cookies;

    if(req.url === "/login" || req.url === '/register'){
        if(_TOKEN && _USR){
            return NextResponse.redirect('/');
        }
    }

}