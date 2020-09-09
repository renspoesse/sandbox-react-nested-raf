import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

// Variant 1 works because it doesn't use setTimeout
// Variant 2 and 3 use setTimeout and can be fixed by uncommenting lines (see comments)
const VARIANT = 1;

const addClassNameToChildren = (children, className) =>
  React.Children.map(children, (child) => {
    if (child && typeof child === "object" && "props" in child) {
      return React.cloneElement(child, {
        className
      });
    }
    return child;
  });

const ensureComponentPainted = () =>
  new Promise((resolve) => requestAnimationFrame(resolve));

const Fade = ({ animateOnMount, children, isVisible }) => {
  const [visibility, setVisibility] = React.useState(
    animateOnMount
      ? isVisible
        ? "invisible"
        : "visible"
      : isVisible
      ? "visible"
      : "invisible"
  );

  React.useEffect(() => {
    if (VARIANT === 1) {
      setVisibility(isVisible ? "visible" : "invisible");
    } else if (VARIANT === 2) {
      // eslint-disable-next-line no-unused-expressions
      // document.body.scrollTop; // Uncomment this to fix
      setVisibility(isVisible ? "visible" : "invisible");
    } else if (VARIANT === 3) {
      (async () => {
        // await ensureComponentPainted(); // Uncomment this to fix
        await ensureComponentPainted();
        setVisibility(isVisible ? "visible" : "invisible");
      })();
    }
  }, [isVisible]);

  return <>{addClassNameToChildren(children, visibility)}</>;
};

const App = () => (
  <div className="App">
    <Fade animateOnMount={true} isVisible={true}>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </Fade>
  </div>
);

if (VARIANT === 1) {
  ReactDOM.render(<App />, document.getElementById("root"));
} else if (VARIANT === 2 || VARIANT === 3) {
  setTimeout(() => {
    ReactDOM.render(<App />, document.getElementById("root"));
  }, 0);
}
