import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface Props {
    title: string;
    description: string;
    name?: string;
    type?: string;
}

export default function SEO({ title, description, name, type }: Props) {
    const location = useLocation();

    useEffect(() => {
        ReactGA.send({
            hitType: 'pageview',
            page: location.pathname,
            title,
        });
    }, [location.pathname, title]);

    return (
        <Helmet>
            <title>{`StockOS // ${title}`}</title>
            <meta name="description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content={type} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
}

SEO.defaultProps = {
    name: 'Mundo Regalo',
    type: 'applet',
};
