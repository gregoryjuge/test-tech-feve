import React from "react";

function Result(props) {
  const { prediction } = props;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Résultat</h2>
      {prediction !== null ? Math.round(prediction) : "No prediction yet"}
    </div>
  );
}

export default Result;
