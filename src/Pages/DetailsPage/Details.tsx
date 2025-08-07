import { Link, useParams } from "react-router-dom";
import "./Details.css";
import "../../index.css";
import { useQuery } from "@apollo/client";
import Header from "../../Layout/Header/Header";
import { GET_UNIQUE_MODEL } from "../../queries/getUniqueGuitarModel";
import { useState } from "react";
import MusiciansCard from "../../Components/MusiciansCard/MusiciansCard";
import Footer from "../../Layout/Footer/Footer";

interface Musician {
  name: string;
  musicianImage: string;
}

function DetailsPage() {
  const { id, guitarId } = useParams();
  const { data, loading } = useQuery(GET_UNIQUE_MODEL, {
    variables: {
      brandId: id,
      modelId: guitarId,
    },
  });

  const [active, setActive] = useState<"specifications" | "musicians">(
    "specifications"
  );
  const [currentPage, setCurrentPage] = useState(0);

  if (loading || !data || !data.findUniqueModel) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    );
  }

  const selectedGuitar = data.findUniqueModel;
  const musicianCardsOnPage = 2;
  const allPages = Math.ceil(
    selectedGuitar.musicians.length / musicianCardsOnPage
  );
  const shownCards = selectedGuitar.musicians.slice(
    currentPage * musicianCardsOnPage,
    currentPage * musicianCardsOnPage + musicianCardsOnPage
  );

  function formatKey(key: string) {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }

  return (
    <div className="main-details-container">
      <div className="first-details-div">
        <Link className="link" to={"/"}>
          <div className="home-details-svg-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            <p className="home-details-svg-paragraph">Back to Home</p>
          </div>
        </Link>
        <div className="header-details-container">
          <Header />
        </div>

        <div className="guitar-name-container">
          <h1 className="guitar-name">{selectedGuitar.name}</h1>
        </div>

        <div className="top-right-sphere">
          <img
            src={selectedGuitar.image}
            alt={selectedGuitar.name}
            className="guitar-img"
          />
        </div>
        <div className="details-butterfly-container">
          <img
            src="../src/img/Butterfly.svg"
            alt=""
            className="details-butterfly-img"
          />
        </div>
      </div>
      <div className="second-section-div">
        <div className="details-button-container">
          <button
            onClick={() => setActive("specifications")}
            className={`tab-button ${
              active === "specifications" ? "active" : ""
            }`}
          >
            Specification
          </button>
          <button
            onClick={() => setActive("musicians")}
            className={`tab-button ${active === "musicians" ? "active" : ""}`}
          >
            Who plays it?
          </button>
        </div>
        {active === "specifications" ? (
          <>
            <p className="guitar-description">{selectedGuitar.description}</p>
            <ul className="guitar-specs">
              {Object.entries(selectedGuitar.specs)
                .filter(([key]) => key !== "__typename")
                .map(([key, value]) => (
                  <li key={key}>
                    <span>{formatKey(key)}:</span> {String(value)}
                  </li>
                ))}
            </ul>
          </>
        ) : (
          <>
            <div className="musician-container">
              {shownCards.map((musician: Musician, index: number) => (
                <MusiciansCard
                  key={index}
                  image={musician.musicianImage}
                  alt={musician.name}
                  name={musician.name}
                />
              ))}
            </div>

            <div className="pagination-wrapper">
              {Array.from({ length: allPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`pagination-dot ${
                    index === currentPage ? "active" : ""
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default DetailsPage;
