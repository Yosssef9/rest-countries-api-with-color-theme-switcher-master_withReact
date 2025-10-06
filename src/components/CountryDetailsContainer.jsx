import styles from "./CountryDetailsContainer.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function CountryDetailsContainer({
  country: propCountry,
  data,
}) {
  const location = useLocation();
  console.log("location.state", location.state);
  console.log("propCountry", propCountry);
  const country = propCountry || location.state;
  console.log("country:", country);
  const navigate = useNavigate();
  const countriesMap = {};
  data.forEach((c) => {
    countriesMap[c.alpha3Code] = c;
  });
  if (!country) return <div>Loading...</div>;
  return (
    <div className={styles.countryDetails}>
      {/* زر الرجوع */}
      <button onClick={() => navigate("/")} className={styles.backButton}>
        ← Back
      </button>
      {/* المحتوى الرئيسي */}
      <div className={styles.detailsWrapper}>
        {/* صورة العلم */}
        <div className={styles.imgContainer}>
          <img
            src={country.flags.png}
            alt={`${country.name} flag`}
            className={styles.countryFlag}
          />
        </div>

        {/* معلومات الدولة */}
        <div className={styles.countryInfo}>
          <h1 className={styles.countryName}>{country.name}</h1>

          {/* العمودين */}
          <div className={styles.infoColumns}>
            <div className={styles.leftColumn}>
              <p>
                <b>Native Name:</b> {country.nativeName}
              </p>
              <p>
                <b>Population:</b> {country.population?.toLocaleString()}
              </p>
              <p>
                <b>Region:</b> {country.region}
              </p>
              <p>
                <b>Sub Region:</b> {country.subregion}
              </p>
              <p>
                <b>Capital:</b> {country.capital}
              </p>
            </div>

            <div className={styles.rightColumn}>
              <p>
                <b>Top Level Domain:</b> {country.topLevelDomain?.join(", ")}
              </p>
              <p>
                <b>Currencies:</b>{" "}
                {country.currencies
                  ? country.currencies.map((cur) => cur.name).join(", ")
                  : "N/A"}
              </p>
              <p>
                <b>Languages:</b>{" "}
                {country.languages
                  ? country.languages.map((lang) => lang.name).join(", ")
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* حدود الدول */}
          <div className={styles.borderCountries}>
            <b>Border Countries:</b>
            <div className={styles.borderList}>
              {country.borders && country.borders.length > 0 ? (
                country.borders.map((borderCode) => {
                  const borderCountry = countriesMap[borderCode]; // lookup سريع O(1)
                  return (
                    <Link
                      className={styles.link}
                      key={borderCode}
                      to={`/country/${borderCountry?.name}`} // رابط الصفحة
                      state={borderCountry} // نرسل بيانات الدولة كاملة للصفحة الجديدة
                      // كلاس لتنسيق الرابط
                    >
                      <span
                        style={{
                          fontSize:
                            borderCountry?.name?.length > 12 ? "14px" : "15px",
                        }}
                        className={styles.borderItem}
                      >
                        {borderCountry?.name || borderCode}
                      </span>
                    </Link>
                  );
                })
              ) : (
                <span>None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
