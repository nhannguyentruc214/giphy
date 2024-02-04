import React, { useEffect } from "react";

export default function ScrollToTop({ onScroll, setOnScroll }: any) {

    useEffect(function mount() {
        function onScroll() {
            if (window.scrollY > 0) {
                setOnScroll(true)
            }
            else {
                setOnScroll(false)
            }
        }

        window.addEventListener("scroll", onScroll);

        return function unMount() {
            window.removeEventListener("scroll", onScroll);
        };
    }
    );

    const onScrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <>
            {onScroll ? <div className="scrollToTop" onClick={() =>  onScrollToTop() }></div> : ''}
        </>
    );

}