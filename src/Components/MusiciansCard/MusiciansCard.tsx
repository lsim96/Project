import "./MusiciansCard.css";

interface MusicianCardProp {
  image: string;
  alt: string;
  name: string;
}

function MusicianCard({ image, alt, name }: MusicianCardProp) {
  return (
    <div className="musician-main-wrapper">
      <img src={image} alt={alt} className="musician-img" />
      <p className="musician-paragraph">{name}</p>
    </div>
  );
}

export default MusicianCard;
