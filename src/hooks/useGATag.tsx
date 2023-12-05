import { useCallback, useEffect } from 'react';
import ga4 from 'react-ga4';
import { useLocation } from 'react-router-dom';

import { GACategories, GATypes } from '~constants/gaTagTypes';

function useGATag(dontTrackView = false) {
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
        action: `${action} - ${label}`,
      });
    },
    []
  );

  const tagError = useCallback((action: GATypes, label: string) => {
    ga4.event({ category: 'Error', action: `Error - ${action}`, label });
  }, []);

  useEffect(() => {
    if (!dontTrackView) {
      tagPageView();
    }
  }, [dontTrackView, tagPageView]);

  return { tagAction, tagError };
}
export default useGATag;
