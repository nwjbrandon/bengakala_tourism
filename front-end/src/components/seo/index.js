import { Helmet } from "react-helmet";
import React from "react";

const SEO = ({ title, description, keywords }) => (
    <div>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    </div>
);

export default SEO;