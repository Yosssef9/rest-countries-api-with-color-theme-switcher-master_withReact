import { useLocation } from "react-router-dom";
import CountryDetailsContainer from "../components/CountryDetailsContainer";
export default function CountryDetails({ data }) {
  const location = useLocation();
  const country = location.state;
  return (
    <div style={{ padding: "50px" }}>
      <CountryDetailsContainer
        data={data}
        country={country}
      ></CountryDetailsContainer>
    </div>
  );
}
