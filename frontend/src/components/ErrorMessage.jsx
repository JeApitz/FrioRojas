import PropTypes from "prop-types";

export default function ErrorMessage({ children }) {
  return (
    <p className="alert alert-danger" role="alert">
      {children}
    </p>      
  );
}

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};
