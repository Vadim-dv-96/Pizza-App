import ContentLoader from 'react-content-loader';

const PizzaSkeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 280 470"
    backgroundColor="#f1efef"
    foregroundColor="#d8d4d4"
  >
    <circle cx="134" cy="99" r="100" />
    <rect x="0" y="221" rx="6" ry="6" width="280" height="27" />
    <rect x="0" y="266" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="390" rx="7" ry="7" width="90" height="27" />
    <rect x="125" y="376" rx="30" ry="30" width="152" height="45" />
  </ContentLoader>
);

export default PizzaSkeleton;
