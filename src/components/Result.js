import React from "react";

function Result(props) {
  const { prediction } = props;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Valeur estimée</h2>
      <p className="text-secondary-600 text-lg font-semibold">
        {prediction !== null ? Math.round(prediction) : "No prediction yet"} €
      </p>
    </div>
  );
}

export default Result;
