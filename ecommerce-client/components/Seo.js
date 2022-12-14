import Head from "next/head";

export default function Seo(props) {
    const { title, description } = props;

    return (
        <Head>
            <title>{title}</title>
            <meta property="description" content={description} />
        </Head>
    );
}

Seo.defaultProps = {
    title: "Game Shop - Tus videojuegos favoritos",
    description:
        "Tus juegos favoritos para Steam, PlayStation, Xbox, Switch al mejor precio.",
};