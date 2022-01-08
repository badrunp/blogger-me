export function getCookie(req){
    const cookies = req.headers.cookie.split(';')
    const cooki = {}
    cookies.map(item => {
        const cookie = item.split('=')
        cooki[cookie[0]] = cookie[1]
    })

    return cooki;
}