import React, { Suspense } from "react";
// import { apiUrls } from "./constants";

import SafeLoading from "./SafeLoading";

const DynamicComponent = (props) => {
  const loadScope = (url, scope) => {
    const element = document.createElement("script");

    const promise = new Promise((resolve, reject) => {
      element.src = url;
      element.type = "text/javascript";
      element.async = true;
      element.onload = () => resolve(window[scope]);
      element.onerror = reject;
    });
    document.head.appendChild(element);
    promise.finally(() => document.head.removeChild(element));
    return promise;
  };

  const loadModule = async (url, scope, module) => {
    try {
      const container = await loadScope(url, scope);
      await __webpack_init_sharing__("default");
      await container.init(__webpack_share_scopes__.default);
      const factory = await container.get(module);
      return factory();
    } catch (error) {
      console.error("Error loading module:", error);
      throw error;
    }
  };

  const MFComp = React.lazy(() => {
    // console.log(
    //   props.data.componentURL || props.data.url,
    //   props.data.componentName,
    //   props.data.componentClass
    // );
    return loadModule(
      props.data.componentURL || props.data.url,
      props.data.componentName,
      props.data.componentClass
    );
  });

  return (
    <div className="">
      <Suspense fallback={<div>loading...</div>}>
        <SafeLoading>
          <MFComp data={props}></MFComp>
        </SafeLoading>
      </Suspense>
    </div>
  );
};

export default DynamicComponent;
