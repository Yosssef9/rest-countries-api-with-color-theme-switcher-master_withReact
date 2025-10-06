import { useState } from "react";
import CardsContainer from "../components/CardsContainer";
import Search from "../components/Search";
import DropdownList from "../components/DropDownList";

export default function Home({ data }) {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCountry, setSelectedCountry] = useState(null);
  let filteredDataByRegion = selectedCountry
    ? selectedCountry === "All"
      ? data
      : data.filter((item) =>
          item.region.toLowerCase().includes(selectedCountry.toLowerCase())
        )
    : null;
  const filteredData = filteredDataByRegion
    ? filteredDataByRegion.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const countries = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    console.log("Selected country in Home:", country);
  };
  return (
    <div>
      <div
        style={{
          margin: " 50px 120px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          data={data}
        ></Search>
        <DropdownList
          options={countries}
          placeholder="Filterd by region"
          onSelect={handleCountrySelect}
        ></DropdownList>
      </div>
      <CardsContainer
        filteredData={filteredData}
        filteredDataByRegion={filteredDataByRegion}
        data={data}
      />
    </div>
  );
}
