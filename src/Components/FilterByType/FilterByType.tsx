import { useCallback, useEffect, useRef, useState } from "react";
import "./FilterByType.css";

interface FilterByTypeProps {
  types: string[];
  selectedType: string | null;
  onSelected: (type: string) => void;
}

export function FilterByType({
  types,
  selectedType,
  onSelected,
}: FilterByTypeProps) {
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOffTargetClick = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropDown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOffTargetClick);
    return () =>
      document.removeEventListener("mousedown", handleOffTargetClick);
  }, [handleOffTargetClick]);

  const handleSelect = (type: string) => {
    onSelected(type);
    setDropDown(false);
  };

  return (
    <div className="filter-container" ref={dropdownRef}>
      <div className="filter-wrapper" onClick={() => setDropDown(!dropDown)}>
        <div className="filter-svg-container">
          <svg
            className="svg-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clipPath="url(#clip0_4418_9865)">
              <path
                className="filter-stroke"
                d="M5.40002 2.09961H18.6C19.7 2.09961 20.6 2.99961 20.6 4.09961V6.29961C20.6 7.09961 20.1 8.09961 19.6 8.59961L15.3 12.3996C14.7 12.8996 14.3 13.8996 14.3 14.6996V18.9996C14.3 19.5996 13.9 20.3996 13.4 20.6996L12 21.5996C10.7 22.3996 8.90002 21.4996 8.90002 19.8996V14.5996C8.90002 13.8996 8.50002 12.9996 8.10002 12.4996L4.30002 8.49961C3.80002 7.99961 3.40002 7.09961 3.40002 6.49961V4.19961C3.40002 2.99961 4.30002 2.09961 5.40002 2.09961Z"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke={dropDown ? "#FF6C33" : "#B8B8C0"}
              />
              <path
                className="filter-stroke"
                d="M10.93 2.09961L6 9.99961"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#B8B8C0"
              />
            </g>
            <defs>
              <clipPath id="clip0_4418_9865">
                <rect width="24" height="24" fill="B8B8C0" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className={`filter-label ${dropDown ? "open" : ""}`}>
          {selectedType || "Select Type"}
        </div>
        <div className="second-filter-svg-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 16.7996C11.3 16.7996 10.6 16.5296 10.07 15.9996L3.55002 9.47965C3.26002 9.18965 3.26002 8.70965 3.55002 8.41965C3.84002 8.12965 4.32002 8.12965 4.61002 8.41965L11.13 14.9396C11.61 15.4196 12.39 15.4196 12.87 14.9396L19.39 8.41965C19.68 8.12965 20.16 8.12965 20.45 8.41965C20.74 8.70965 20.74 9.18965 20.45 9.47965L13.93 15.9996C13.4 16.5296 12.7 16.7996 12 16.7996Z"
              fill={dropDown ? "#FF6C33" : "#B8B8C0"}
            />
          </svg>
        </div>
      </div>
      {dropDown && (
        <div className="guitar-types-container">
          {types.map((type) => (
            <div
              className="guitar-types-wrapper"
              key={type}
              style={{ fontFamily: "Circular Std, sans-serif" }}
              onClick={() => handleSelect(type)}
            >
              {type}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
