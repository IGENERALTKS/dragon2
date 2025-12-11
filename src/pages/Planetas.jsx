import React, { useEffect, useState} from "react";
import Card from "../components/Card";
import axios from "axios";

export default function Home(){
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const i = 1;

    async function fetchCharacters(p){
        setLoading(true);
        setErrorMsg("");

        try{
            const response = await  axios.get(
                `https://dragonball-api.com/api/planets?page=${p}&limit=10`
            );

            if(!response.data.items || response.data.items.length === 0){
                setErrorMsg("Página inválida! Tente outra.");
                setCharacters([]);
            }else{
                setCharacters(response.data.items);
            }
        }catch(error){
            setErrorMsg("Erro ao buscar personagens!")
        }
        setLoading(false);
    }


    function nextPage() {
        if (page < 5) {
            const next = page + 1;
            setPage(next);
            fetchCharacters(next);
        }
}
    function previousPage() {
        if (page > 1) {
            const prev = page - 1;
            setPage(prev);
            fetchCharacters(prev);
        }
}


    function handleSearch(){
        if(!page || page < 1){
            setErrorMsg("Digite um número de página");
            return;
        }
        fetchCharacters(page);
    }

    useEffect(() =>{
        async function loadFirstPage(){
            setLoading(true);
            setErrorMsg("");

            try{
                const response = await axios.get(
                    "https://dragonball-api.com/api/planets?page=1&limit=10"
                );
                setCharacters(response.data.items);
            } catch(error){
                setErrorMsg("Erro ao buscar personagens!");
            }
            setLoading(false);
        }
        loadFirstPage();
    }, []);

    
    return(
        <div className="container">
            <h1>Dragon Ball Planets</h1>
            <header>
            <div className="botoesPrincipais">
                <a href="Home.jsx">Personagens</a>
                <a href="Planetas.jsx">Planetas</a>
            </div>
            </header>

            <div className="cards-grid">
                {characters.map((char) => (
                    <Card
                        key={char.id}
                        name={char.name}
                        image={char.image}
                        race={char.race}
                        ki={char.ki}
                    />
                ))}
            </div>
            {loading && <p className="loading">Carregando...</p>}
            {errorMsg && <p className="loading">{errorMsg}</p>}

            
            <div className="search-box">
                <button onClick={previousPage} disabled={page === 1}>Anterior</button>          

                <input 
                    type="number" 
                    placeholder="Digite uma página de (1/5)" 
                    value={page}
                    onChange={(e) => setPage(e.target.value)} 
                />
                <button onClick={handleSearch}>Buscar</button>
                <button onClick={nextPage}>Próximo</button>                

            </div>
        </div>   
    );
    

}