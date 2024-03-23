import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export interface PublicTemplateProps {
  children?: React.ReactNode;
}

export default function PublicTemplate({ children }: PublicTemplateProps) {
  const [scrollFromTop, setScrollFromTop] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window?.scrollY > 260 ? setScrollFromTop(true) : setScrollFromTop(false);
    });

    scrollToTop();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="font-sans-serif relative flex min-h-screen flex-col overflow-hidden bg-background text-onBackground dark:bg-[#292929]">
      <div className="">
        <Outlet />
      </div>
      {scrollFromTop && (
        <div
          className="fixed right-10 bottom-5 flex h-12 w-12  flex-col items-center justify-center rounded-full bg-primary shadow-md transition-all duration-300 hover:cursor-pointer dark:bg-secondary"
          onClick={() => scrollToTop()}
        >
          <i className="fa-solid fa-arrow-up fa-xl fa-bounce text-white dark:text-onPrimary"></i>
        </div>
      )}
    </div>
  );
}
