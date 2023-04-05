import ContentLoader from "react-content-loader";

const ProductSkelet: React.FC = (props) => (
  <ContentLoader 
    speed={2}
    width="100%"
    height={443}
    viewBox="0 0 280 443"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="130" cy="130" r="130" /> 
    <circle cx="185" cy="87" r="29" /> 
    <rect x="0" y="272" rx="5" ry="5" width="100%" height="25" /> 
    <rect x="178" y="293" rx="0" ry="0" width="3" height="0" /> 
    <rect x="0" y="313" rx="5" ry="5" width="100%" height="76" /> 
    <rect x="0" y="403" rx="5" ry="5" width="100%" height="36" />
  </ContentLoader>
)

export default ProductSkelet;