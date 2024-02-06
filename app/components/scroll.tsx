import React, { useEffect } from "react";

export default function Scroll({ limit, setLimit }: any) {

  useEffect(function mount() {
    function onScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setLimit(limit + 15);
      }
    }

    window.addEventListener("scroll", onScroll);

    return function unMount() {
      window.removeEventListener("scroll", onScroll);
    };
  }
  );
  return null;

}