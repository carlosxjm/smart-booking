import "./PropertyCard.css";

export const PropertyCard = ({
  title,
  image,
  location,
  sqft,
  description,
  price_per_month,
  bedrooms,
  bathrooms,
  showFullInformations,
}) => (
  <div className="property-card-root">
    <div className="image-wrapper">
      <img src={image} alt={title} />
    </div>
    <h3>{title}</h3>
    {showFullInformations && <p className="description">{description}</p>}
    <p className="location">{location}</p>
    {showFullInformations && (
      <ul className="more-information">
        <li>{sqft} sqft</li>
        <li>${price_per_month}/month</li>
        <li>{bedrooms} bedrooms</li>
        <li>{bathrooms} bathrooms</li>
      </ul>
    )}
  </div>
);
