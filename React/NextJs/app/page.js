import LikeButton from "./likeButton";

function Header( {title} ) {
    console.log(title);
    const arrayExmp = ["Lista", "de", "elementos"]

    return(
        <>
            <h1>Exemplo de componente de cabeçalho usando {title ? title : "React, é óbvio"}</h1>
            <Navigator data={arrayExmp}/>
        </>
    );
}

function Navigator( {data} ) {
    console.log(data);

    return(
        <>
            <ul>
                {data.map((elmts) => (
                    <li key={elmts}>{elmts}</li>
                ))}
            </ul>
        </>
    );
}

export default function HomePage( {title = "React"} ) {
    return(
        <>
            <Header title={title}/>
            <LikeButton/>
        </>
    )
}