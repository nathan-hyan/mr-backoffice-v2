import { useCallback } from 'react';
import ga4 from 'react-ga4';
import { useLocation } from 'react-router-dom';

import { GACategories, GATypes } from '~constants/gaTagTypes';

function useGATag() {
  const location = useLocation();

  const tagPageView = useCallback(() => {
    ga4.send({
      hitType: 'pageview',
      page: location.pathname,
      title: document.title,
    });
  }, [location.pathname]);

  const tagAction = useCallback(
    (category: GACategories, action: GATypes, label: string) => {
      ga4.event({
        category,
        action,
        label,
      });
    },
    []
  );
  return { tagPageView, tagAction };
}
export default useGATag;
