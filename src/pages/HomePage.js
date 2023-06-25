import React from "react";
import Welcome from "../components/Welcome";
import PageTemplate from "../components/PageTemplate";

const HomePage = () => {
  return <PageTemplate inner={Welcome} />;
};

export default HomePage;
