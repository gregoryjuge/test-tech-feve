import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function DepartementAverage() {
  const { departement } = useParams();
  const [average, setAverage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const requestBody = {
        features: {
          code_postal: departement + "000",
          code_departement: departement,
          date_mutation_year: 2022,
          surface_reelle_bati: 0,
          nombre_pieces_principales: 0,
          longitude: null,
          latitude: null,
          surface_terrain: 137000,
          surface_terrain_artificialise: 0,
          surface_terrain_naturel: 0,
          surface_terrain_vergers: 0,
          surface_terrain_vignes: 0,
          surface_terrain_terresetpres: 137000,
        },
      };

      try {
        const response = await axios.post(
          "https://dataiku-api.vercel.app/predict",
          requestBody
        );
        setAverage(response.data.result.prediction);
      } catch (error) {
        console.error("Error fetching average value:", error);
      }
    };
    fetchData();
  }, [departement]);

  return (
    <div data-testid="departement-average" className="m-4 text-center">
      {average !== null ? (
        <p className="text-lg font-semibold text-primary-500">
          La valeur moyenne dans le département {departement} est de{" "}
          <span className="text-secondary-600">{Math.round(average)} €</span>.
        </p>
      ) : (
        <p className="text-gray-500 italic">
          Calcul de la valeur moyenne en cours...
        </p>
      )}
    </div>
  );
}
export default DepartementAverage;
