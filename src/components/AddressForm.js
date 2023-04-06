import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Result from "./Result";

function AddressForm() {
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [geoData, setGeoData] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Form submitted with data:", data);
    console.log("Form submitted with geoData:", geoData);

    const requestBody = {
      features: {
        code_postal: geoData.properties.postcode,
        code_departement: geoData.properties.context.split(",")[0],
        date_mutation_year: 2022,
        surface_reelle_bati: 0,
        nombre_pieces_principales: 0,
        longitude: geoData.geometry[0],
        latitude: geoData.geometry[1],
        surface_terrain: data.surface,
        surface_terrain_artificialise: 0,
        surface_terrain_naturel: 0,
        surface_terrain_vergers: 0,
        surface_terrain_vignes: 0,
        surface_terrain_terresetpres: data.surface,
      },
    };

    try {
      const response = await axios.post(
        "https://dataiku-api.vercel.app/predict",
        requestBody
      );
      setResult(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
    setLoading(false);
  };

  const fetchAddressSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
          query
        )}&limit=5`
      );
      const suggestions = response.data.features.map((feature) => ({
        value: feature.properties.label,
        label: feature.properties.label,
        properties: feature.properties,
        geometry: feature.geometry.coordinates,
      }));
      setAddressSuggestions(suggestions);
      console.log("Address suggestions updated:", suggestions);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    }
  };

  useEffect(() => {
    if (addressValue.length >= 3) {
      console.log("Fetching address suggestions for:", addressValue);
      console.log("Fetching address suggestions for:", selectedAddress);
      fetchAddressSuggestions(addressValue);
    }
    if (addressValue.length <= 3) {
      setAddressSuggestions([]);
    }
  }, [addressValue, selectedAddress]);

  return (
    <div
      data-testid="address-form"
      className="flex justify-center items-center h-screen bg-gray-100"
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="mb-4 text-4xl italic text-yellow-400">
            Le prix des Terres
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="address" className="block font-medium mb-2">
              Adresse à estimer :
            </label>
            <Controller
              control={control}
              name="address"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  className="mb-4"
                  options={addressSuggestions}
                  onInputChange={(value) => {
                    setAddressValue(value);
                  }}
                  onChange={(option) => {
                    setSelectedAddress(option);
                    field.onChange(option);
                    setGeoData(
                      addressSuggestions.find(
                        (suggestion) => suggestion.value === option.value
                      )
                    );
                  }}
                  placeholder="Adresse"
                  noOptionsMessage={() => "Aucune suggestion"}
                />
              )}
            />
            <div className="mb-4">
              <label htmlFor="surface" className="block font-medium mb-2">
                Surface en ha :
              </label>
              <Controller
                control={control}
                name="surface"
                defaultValue={0}
                rules={{
                  required: true,
                  min: 0,
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Ce champ doit être un nombre entier",
                  },
                }}
                render={({ field }) => (
                  <input
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                    type="number"
                    id="surface"
                    pattern="[0-9]*"
                    {...field}
                  />
                )}
              />
              {errors.surface && (
                <span className="text-red-500 mt-1">
                  Ce champ est requis et doit être un entier supérieur ou égal à
                  0
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
            >
              Envoyer
            </button>
          </form>
          {loading ? (
            <div className="text-center mt-4">
              <p className="text-gray-500">Recherche des résultats...</p>
              <div className="spinner-border text-gray-500 mt-2" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          ) : result && result.prediction !== null ? (
            <Result prediction={result.prediction} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AddressForm;
