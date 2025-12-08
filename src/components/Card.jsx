import React from "react";

export default function Card({name, image, race, ki}){
    return(
        <div className="card">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p><strong>Raça:</strong> {race}</p>
            <p><strong>Ki:</strong> {ki}</p>
        </div>
    );
}