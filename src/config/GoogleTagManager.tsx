/* eslint-disable react/no-danger */
import { Helmet } from 'react-helmet-async';

function GoogleTagManager() {
    return (
        <Helmet>
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${
                    import.meta.env.VITE_GTAG
                }`}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag() {
                        dataLayer.push(arguments);
                    }
                    gtag('js', new Date());

                    gtag('config', '${import.meta.env.VITE_GTAG}');
                `,
                }}
            />
        </Helmet>
    );
}
export default GoogleTagManager;
