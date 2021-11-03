import React, { useCallback } from "react";

function FeedbackPage() {
  // const pageRef = useCallback((node) => {
  //   if (node !== null) {
  //     const element = document.createElement("iframe");
  //     element.setAttribute(
  //       "src",
  //       "https://docs.google.com/forms/d/e/1FAIpQLSdXfXtvzhAMq8zOw_aRDDQMnFJym1LJI1YliUvwEfSjfR1qlQ/viewform?embedded=true"
  //     );
  //     element.setAttribute("width", "640");
  //     element.setAttribute("height", "670");
  //     element.setAttribute("frameborder", "0");
  //     element.setAttribute("marginheight", "0");
  //     element.setAttribute("marginwidth", "0");
  //     node.appendChild(element);
  //   }
  // }, []);

  return (
    <div className="flex-grow grid grid-cols-1">
      <iframe
        className="w-full h-full block"
        src="https://docs.google.com/forms/d/e/1FAIpQLSdXfXtvzhAMq8zOw_aRDDQMnFJym1LJI1YliUvwEfSjfR1qlQ/viewform?embedded=true"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        Loading…
      </iframe>
    </div>
  );
}

export default FeedbackPage;
