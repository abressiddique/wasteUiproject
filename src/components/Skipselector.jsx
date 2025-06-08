import React, { useState, useEffect } from "react";

const skipImages = {
  4: "https://placehold.co/300x200?text=4+Yard+Skip",
  6: "https://placehold.co/300x200?text=6+Yard+Skip",
  8: "https://placehold.co/300x200?text=8+Yard+Skip",
  10: "https://placehold.co/300x200?text=10+Yard+Skip",
  12: "https://placehold.co/300x200?text=12+Yard+Skip",
  14: "https://placehold.co/300x200?text=14+Yard+Skip",
  16: "https://placehold.co/300x200?text=16+Yard+Skip",
  20: "https://placehold.co/300x200?text=20+Yard+Skip",
  40: "https://placehold.co/300x200?text=40+Yard+Skip",
};

const SkipSelector = () => {
  const [skips, setSkips] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const response = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch skip data");
        }
        const data = await response.json();
        setSkips(data);
        setLoading(false);
        console.log("Skip images mapping:", skipImages);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchSkips();
  }, []);

  const handleSelectSkip = (skipId) => {
    setSelectedSkip(skipId);
  };

  const calculatePriceWithVat = (priceBeforeVat, vat) => {
    if (typeof priceBeforeVat !== "number" || typeof vat !== "number") {
      return null;
    }
    return priceBeforeVat * (1 + vat / 100);
  };

  const handleImageError = (e) => {
    console.error(`Failed to load image for skip ${e.target.alt}`);
    e.target.src = "https://placehold.co/300x200?text=Skip";
  };

  if (loading) {
    return (
      <div className="text-center text-lg sm:text-xl text-gray-600 py-12 animate-pulse">
        <i className="fas fa-spinner fa-spin mr-2"></i>Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg sm:text-xl text-red-600 py-12">
        <i className="fas fa-exclamation-circle mr-2"></i>Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center justify-center gap-3 mb-4">
        <i className="fas fa-truck text-blue-600 text-2xl"></i> Choose Your Skip Size
      </h2>
      <p className="text-sm sm:text-base text-gray-500 mb-8 text-center">
        Select the perfect skip size for your waste management needs
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skips.map((skip) => {
          const priceWithVat = calculatePriceWithVat(skip.price_before_vat, skip.vat);
          return (
            <div
              key={skip.id}
              className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >
              <img
                src={skipImages[skip.size] || "https://placehold.co/300x200?text=Skip"}
                alt={`${skip.size} Yard Skip`}
                className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
                onError={handleImageError}
              />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center justify-center gap-2 mb-3">
                <i className="fas fa-box-open text-blue-600"></i> {`${skip.size} Yard Skip`}
              </h3>
              <p className="text-sm text-gray-600 mb-4 min-h-[4.5rem] flex flex-col gap-2">
                <span className="flex items-center">
                  <i className="fas fa-calendar-alt text-blue-600 mr-2"></i> Hire for {skip.hire_period_days} days
                </span>
                <span className="flex items-center">
                  {skip.allowed_on_road ? (
                    <>
                      <i className="fas fa-road text-blue-600 mr-2"></i> Suitable for on-road placement
                    </>
                  ) : (
                    <>
                      <i className="fas fa-ban text-blue-600 mr-2"></i> Not for on-road use
                    </>
                  )}
                </span>
                <span className="flex items-center">
                  {skip.allows_heavy_waste ? (
                    <>
                      <i className="fas fa-weight-hanging text-blue-600 mr-2"></i> Handles heavy waste
                    </>
                  ) : (
                    <>
                      <i className="fas fa-feather text-blue-600 mr-2"></i> Not suitable for heavy waste
                    </>
                  )}
                </span>
              </p>
              <p className="text-base sm:text-lg font-bold text-blue-600 mb-4 flex items-center justify-center gap-2">
                <i className="fas fa-pound-sign text-blue-600"></i>{" "}
                {priceWithVat !== null ? `£${priceWithVat.toFixed(2)}` : "Price not available"}
              </p>
              <button
                className={`w-full max-w-[200px] mx-auto py-2.5 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                  selectedSkip === skip.id
                    ? "bg-blue-700 opacity-90"
                    : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
                }`}
                onClick={() => handleSelectSkip(skip.id)}
              >
                <i
                  className={selectedSkip === skip.id ? "fas fa-check-circle" : "fas fa-hand-pointer"}
                ></i>
                {selectedSkip === skip.id ? "Selected" : "Select this Skip"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkipSelector;