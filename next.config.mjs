/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://erp.sdbr.app/api/:path*',
            },
            {
                source: '/items/:path*',
                destination: 'https://backend.sdbr.app/items/:path*',
            },
            {
                source: '/users/:path*',
                destination: 'https://backend.sdbr.app/users/:path*'
            },
            {
                source: '/auth/:path',
                destination: 'https://apimongo.sdbr.app/auth/:path*'
            }
        ];
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};

export default nextConfig;
