import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;800&display=swap" rel="stylesheet" />
                </Head>
                <body className="antialiased font-sanss bg-gray-100">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument