import React from "react";
import Header from "./Header";

const PageTemplate = (props) => {
  return (
    <div dir="rtl" lang="he" className="rtl">
      <Header />
      {props.inner(props.innerProps)}
    </div>
  );
};

export default PageTemplate;
