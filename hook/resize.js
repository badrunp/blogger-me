import { useCallback, useEffect, useState } from "react"

function Resize() {

    const [size, setSize] = useState({
        width: 0,
        heigth: 0
    })

    useEffect(() => {

        setSize({
            ...size,
            width: window.innerWidth,
            heigth: window.innerHeight
        })

    }, [])

    useEffect(() => {
        window.addEventListener('resize', eventResize)

        return () => {
            window.removeEventListener('resize', eventResize)
        }

    }, [size])

    const eventResize = useCallback((e) => {
        setSize({
            ...size,
            width: window.innerWidth,
            heigth: window.innerHeight
        })
    })

    return {
        width: size.width,
        heigth: size.heigth
    }

}

export default Resize
