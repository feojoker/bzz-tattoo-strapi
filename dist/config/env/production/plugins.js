module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: 'cloudinary',
            providerOptions: {
                cloud_name: env('CLOUDINARY_NAME'),
                api_key: env('CLOUDINARY_KEY'),
                api_secret: env('CLOUDINARY_SECRET'),
            },
            actionOptions: {
                upload: {},
                delete: {},
            },
        },
    },
    "rest-cache": {
        config: {
            provider: {
                name: "memory",
                options: {
                    max: 32767,
                    maxAge: 3600,
                },
            },
            strategy: {
                contentTypes: [
                    // list of Content-Types UID to cache
                    "api::default-seo.default-seo",
                    "api::homepage.homepage",
                    "api::about-page.about-page",
                    "api::contact-page.contact-page",
                    "api::projects-page.projects-page",
                    {
                        contentType: "api::language-icon.language-icon",
                        routes: /* @type {CacheRouteConfig[]} */ [
                            {
                                path: '/api/language-icons',
                                method: 'GET', // can be omitted, defaults to GET
                            },
                        ],
                    }
                ],
            },
        },
    },
});
