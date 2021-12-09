import Head from 'next/head'

export default function AppLayout(props) {
  return (
    <>
        <Head>
            <title>{ props.title }</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous"/>
        </Head>
        <main className="min-h-screen flex justify-center">
            { props.children }
        </main>
        <style jsx>{`
          main {
            background-color: ${ props.bgColor };
          }
        `}</style>
    </>
  )
}