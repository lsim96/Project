import { useQuery } from "@apollo/client";
import "./GuitarModelsPage.css";
import "../../index.css";
import { Link, useParams } from "react-router-dom";
import Header from "../../Layout/Header/Header";
import { GET_ALL_BRANDS } from "../../queries/allGuitarBrands";
import Sphere from "../../Components/Sphere/Sphere";
import { useEffect, useState } from "react";
import { FilterByType } from "../../Components/FilterByType/FilterByType";
import SearchBar from "../../Components/SearchBar/SearchBar";

import GuitarCard from "../../Components/GuitarCard/GuitarCard";
import { useInView } from "react-intersection-observer";
import { SEARCH_BRAND_MODELS } from "../../queries/searchBrandModels";
import { useDebounce } from "use-debounce";
import Footer from "../../Layout/Footer/Footer";

const PAGE_LIMIT = 3;

interface BrandModel {
  id: string;
  name: string;
  type: string;
  image: string;
  description: string;
  price: number;
  specs: {
    bodyWood: string;
    neckWood: string;
    fingerboardWood: string;
    pickups: string;
    tuners: string;
    scaleLength: string;
    bridge: string;
  };
  musicians: {
    name: string;
    musicianImage: string;
    bands: string[];
  };
}

interface SearchModelsResponse {
  searchModels: BrandModel[];
}

interface SearchBrandModelsVariables {
  brandId: string;
  name: string;
}

function GuitarModelsPage() {
  const { id } = useParams();

  const [selectedType, setSelectedType] = useState("Filter by type");
  const [searchInput, setSearchInput] = useState("");
  const [loadedModels, setLoadedModels] = useState<BrandModel[]>([]);

  const [debouncedSearchInput] = useDebounce(searchInput, 500);

  const { data, loading, error } = useQuery(GET_ALL_BRANDS);

  const { data: searchedGuitars, loading: searchBrandGuitarsLoading } =
    useQuery<SearchModelsResponse, SearchBrandModelsVariables>(
      SEARCH_BRAND_MODELS,
      {
        variables: {
          brandId: id!,
          name: debouncedSearchInput,
        },
      }
    );

  const { ref, inView } = useInView({
    threshold: 1,
    delay: 500,
    trackVisibility: true,
  });

  const models = searchedGuitars?.searchModels;

  useEffect(() => {
    if (searchBrandGuitarsLoading) {
      setLoadedModels([]);
    }

    if (!models?.length || models.length === loadedModels.length) {
      return;
    }

    if (inView) {
      // setTimeout is redundant here is only set to imitate api delay so we can notice the infinite scrolling
      setTimeout(
        () =>
          setLoadedModels((prev) => [
            ...prev,
            ...models.slice(
              loadedModels.length,
              loadedModels.length + PAGE_LIMIT
            ),
          ]),
        400
      );
    }
  }, [searchBrandGuitarsLoading, models, loadedModels, inView]);

  const brands = data?.findAllBrands || [];
  const selectedBrand = brands.find(
    (cb: { id: string }) => cb.id.toLowerCase() === id?.toLowerCase()
  );

  if (loading)
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    );
  if (error) return <p className="error-message">{error.message}</p>;

  const guitarCategories = [
    ...new Set((selectedBrand?.categories as string[]) || []),
  ];

  return (
    <div className="main-container">
      <section className="first-section">
        <Link className="link" to={"/"}>
          <div className="home-svg-container">
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
            <p className="home-svg-paragraph">Back to Home</p>
          </div>
        </Link>
        <div className="header-container">
          <Header />
        </div>
        <div className="guitar-description-wrapper">
          <h1 className="guitar-description-h1">
            Play like a <span className="guitars-highlighter">Rock star</span>
          </h1>
          <p className="guitar-description-paragraph">
            With a legacy dating back to the 1950s, Ibanez blends expert
            craftsmanship with cutting-edge innovation to deliver guitars that
            inspire creativity and elevate your performance. Trusted by top
            artists worldwide, Ibanez guitars are built to play fast, sound
            bold, and stand out on any stage. Ask ChatGPT
          </p>
        </div>
        <Sphere src={selectedBrand?.image} alt={selectedBrand?.name} />
      </section>
      <section className="second-section">
        <h2 className="second-section-h2">
          Check out the <span className="guitars-highlighter">Selection</span>
        </h2>
        <div className="filter-search-container">
          <FilterByType
            types={guitarCategories}
            selectedType={selectedType}
            onSelected={setSelectedType}
          />
          <SearchBar
            value={searchInput}
            onChange={(input) => setSearchInput(input)}
          />
        </div>
        {searchBrandGuitarsLoading ? (
          <div>loading...</div>
        ) : (
          <div className="model-container">
            {loadedModels.map(({ id, image, name, price }) => (
              <Link to={`/${selectedBrand.id}/${id}`}>
                <GuitarCard
                  key={id}
                  id={id}
                  image={image}
                  name={name}
                  price={price}
                ></GuitarCard>
              </Link>
            ))}
          </div>
        )}

        <div ref={ref}></div>
      </section>
      <Footer />
    </div>
  );
}

export default GuitarModelsPage;
