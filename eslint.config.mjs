import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // react-three-fiber's entire rendering model is built on mutating
    // refs, geometries, and camera/scene objects inside useFrame across
    // frames — that's the documented, correct pattern for R3F, not a
    // side effect to memoize away. The React Compiler-oriented
    // `react-hooks/immutability` rule can't distinguish that from an
    // accidental mutation, so it's scoped off for this directory only.
    files: ["components/three/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/immutability": "off",
    },
  },
];

export default eslintConfig;
