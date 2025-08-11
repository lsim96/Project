import "./GuitarCard.css";

interface GuitarCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  onClick?: () => void;
}

function GuitarCard({ image, name, price, onClick }: GuitarCardProps) {
  const handleClick = () => {
    onClick?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === "") {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className="guitar-card-container"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* <Link to={`/models/${id}`}> */}
      <img src={image} alt={name} className="guitar-card-img" />
      {/* </Link> */}

      <div className="guitar-card-content">
        <h3 className="guitar-card-name">{name}</h3>
        <p className="guitar-card-price">${price}</p>
      </div>
    </div>
  );
}

export default GuitarCard;
