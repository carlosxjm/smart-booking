import { Link } from "react-router-dom";
import { properties } from "../../data/properties-mock.json";
import { PropertyCard } from "../../../property/components/PropertyCard/PropertyCard";
import "./PropertySelectList.css";

export const PropertySelectList = () => {
  return (
    <>
      <h1>Select a property</h1>
      <div className="property-select-list-root">
        {properties.map((property) => (
          <Link
            key={property.id}
            to={`/${property.id}/new`}
            className="property-select-list-item"
          >
            <PropertyCard {...property} />
          </Link>
        ))}
      </div>
    </>
  );
};
