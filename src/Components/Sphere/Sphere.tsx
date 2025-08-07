import "./Sphere.css";

interface SphereProps {
  src: string;
  alt: string;
}

function Sphere({ src, alt = "Guitar Brand" }: SphereProps) {
  return (
    <>
      <div className="sphere-div">
        <img src={src} alt={alt} className="container-img" />
      </div>

      <div className="secondary-sphere-div">
        <img src="../src/img/Butterfly.svg" alt="" className="logo" />
      </div>
    </>
  );
}

export default Sphere;
