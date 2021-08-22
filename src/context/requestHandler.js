import React from "react";

const RequestHandlerContext = React.createContext(() => {});

export const RequestHandlerProvider = RequestHandlerContext.Provider;

export default RequestHandlerContext;
