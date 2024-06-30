import { useEffect, useState } from "react";
import { urls } from "../../utils/urls";

export function Router() {
  const [currentComponent, setCurrentComponent] = useState<JSX.Element | undefined>();
  const [path, setPath] = useState(window.location.pathname);

  const listenToPopstate = () => {
    const winPath = window.location.pathname;
    setPath(winPath);    
  }

  useEffect(() => {
    window.addEventListener("popstate", listenToPopstate);
    return () => {
      window.removeEventListener("popstate", listenToPopstate);
    }
  }, [])
  
  useEffect(() => {
    const url = urls.find(url => url.regex.test(path));
    if (url) {
      setCurrentComponent(url.component());
    }
  }, [path])

  return (
    <>
      {currentComponent}
    </>
  );
}
