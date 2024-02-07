import React, { useEffect } from "react";

export default function Scroll({ limit, setLimit, scrollLimit, setScrollLimit }: any) {

  useEffect(function mount() {
    function onScroll() {
      if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && scrollLimit < 9) {
        setScrollLimit(scrollLimit + 1);
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