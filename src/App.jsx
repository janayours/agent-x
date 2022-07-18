import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./index.scss";
import Header from "./Header";
import DynamicComponent from "./DynamicComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import * as Icons from "@fortawesome/free-solid-svg-icons";

const iconList = Object.keys(Icons)
  .filter((key) => key !== "fas" && key !== "prefix")
  .map((icon) => Icons[icon]);

library.add(...iconList);

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
            <TabPanel key={"rec_tab" + index}>
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
              <Tab key={"rec" + index}>
                <FontAwesomeIcon icon={"fa-solid " + rec.componentIcon} />
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
  const queryParams = new URLSearchParams(window.location.search);
  const embeded = queryParams.get("embed");
  const loadComponentsInTabs = () => {
    fetch("https://putsreq.com/3vv2yzqGlKuSwoG5RPpe")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.modules);
        setLoadedComponents(getTabs(data));
      });
  };

  useEffect(() => {
    loadComponentsInTabs();
  }, []);
  return (
    <div>
      {embeded === "1" ? null : <Header></Header>}

      <div className="vertical-tab-container">{loadedComponents}</div>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
