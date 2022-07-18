import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "./index.scss";
import Header from "./Header";
import Footer from "./Footer";
import DynamicComponent from "./DynamicComponent";

// let loadedData ;
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

const getTabs = (data) => {
  return (
    <Tabs className="agent-app">
      
      {data?.modules?.map((rec, index) => {
          if (rec.enabled == true) {
            return (
              <TabPanel>
                <div className="panel-content">
                  <DynamicComponent
                    key={"dc_" + index}
                    data={rec}
                  ></DynamicComponent>
                </div>
              </TabPanel>
            );
          }
        })}
        <TabList>
        {data?.modules?.map((rec, index) => {
          if (rec.enabled == true) {
            return (
              <Tab>
                {rec.componentName}
              </Tab>
            );
          }
        })}
      </TabList>
    </Tabs>
  );
};

const App = () => {
  const [loadedComponents, setLoadedComponents] = useState(null);

  const loadComponentsInTabs = () => {
    fetch("https://putsreq.com/3vv2yzqGlKuSwoG5RPpe")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.modules);
        setLoadedComponents(getTabs(data));
      });
  };
  // const loadComponents = () => {
  //   fetch("https://putsreq.com/3vv2yzqGlKuSwoG5RPpe")
  //     .then((response) => response.json())
  //     .then((data) => {
  //        console.log(data.modules);
  //       setLoadedComponents(
  //         data.modules?.map((rec, index) => {
  //           if(rec.enabled==true)
  //           {
  //             return (
  //               <DynamicComponent key={"dc_" + index} data={rec}></DynamicComponent>
  //             );
  //           }
  //         })
  //       );
  //     });
  // };
  useEffect(() => {
    // loadComponents();
    loadComponentsInTabs();
  }, []);
  return (
    <div>
      <Header></Header>
      <div className="flex">{/* {loadedComponents} */}</div>

      <div className="vertical-tab-container">{loadedComponents}</div>

      <Footer></Footer>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
