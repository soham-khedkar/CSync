// src/CarbonFootprintCalculator.jsx

import React, { useState } from "react";

const CarbonFootprintCalculator = () => {
  // State to hold input values for different emission sources
  const [inputData, setInputData] = useState({
    diesel: "", // liters
    petrol: "", // liters
    naturalGas: "", // cubic meters
    electricity: "", // kWh
    coalProduced: "", // tons
    distanceTransported: "", // kilometers
    wasteProduced: "", // tons
  });

  const [carbonFootprint, setCarbonFootprint] = useState(null);

  // Emission Factors (hypothetical, replace with accurate data)
  const EMISSION_FACTORS = {
    diesel: 2.68, // kg CO2e per liter
    petrol: 2.31, // kg CO2e per liter
    naturalGas: 2.04, // kg CO2e per cubic meter
    electricity: 0.527, // kg CO2e per kWh
    methaneFugitive: 25, // kg CO2e per ton of coal
    transport: 0.1, // kg CO2e per ton-kilometer (road transport example)
    waste: 1.8, // kg CO2e per ton of waste
  };

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
  };

  // Function to calculate carbon footprint
  const calculateCarbonFootprint = () => {
    const {
      diesel,
      petrol,
      naturalGas,
      electricity,
      coalProduced,
      distanceTransported,
      wasteProduced,
    } = inputData;

    // Calculating emissions for each source
    const emissionsFromDiesel = diesel * EMISSION_FACTORS.diesel;
    const emissionsFromPetrol = petrol * EMISSION_FACTORS.petrol;
    const emissionsFromNaturalGas = naturalGas * EMISSION_FACTORS.naturalGas;
    const emissionsFromElectricity = electricity * EMISSION_FACTORS.electricity;
    const emissionsFromMethane = coalProduced * EMISSION_FACTORS.methaneFugitive;
    const emissionsFromTransport =
      distanceTransported * coalProduced * EMISSION_FACTORS.transport;
    const emissionsFromWaste = wasteProduced * EMISSION_FACTORS.waste;

    // Total carbon footprint
    const totalEmissions =
      emissionsFromDiesel +
      emissionsFromPetrol +
      emissionsFromNaturalGas +
      emissionsFromElectricity +
      emissionsFromMethane +
      emissionsFromTransport +
      emissionsFromWaste;

    setCarbonFootprint(totalEmissions);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Carbon Footprint Calculator
        </h1>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Diesel Consumption (liters):
            </label>
            <input
              type="number"
              name="diesel"
              value={inputData.diesel}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Petrol Consumption (liters):
            </label>
            <input
              type="number"
              name="petrol"
              value={inputData.petrol}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Natural Gas Consumption (cubic meters):
            </label>
            <input
              type="number"
              name="naturalGas"
              value={inputData.naturalGas}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Electricity Consumption (kWh):
            </label>
            <input
              type="number"
              name="electricity"
              value={inputData.electricity}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Coal Produced (tons):
            </label>
            <input
              type="number"
              name="coalProduced"
              value={inputData.coalProduced}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Distance Transported (km):
            </label>
            <input
              type="number"
              name="distanceTransported"
              value={inputData.distanceTransported}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Waste Produced (tons):
            </label>
            <input
              type="number"
              name="wasteProduced"
              value={inputData.wasteProduced}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateCarbonFootprint}
          className="w-full mt-6 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Calculate Footprint
        </button>

        {/* Display Result */}
        {carbonFootprint !== null && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold">
              Estimated Carbon Footprint:
            </h2>
            <p className="mt-2 text-lg">{carbonFootprint.toFixed(2)} kg CO2e</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarbonFootprintCalculator;
