/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media3.giphy.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'media2.giphy.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'media1.giphy.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'media4.giphy.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'media5.giphy.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'media6.giphy.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'media7.giphy.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'media8.giphy.com',
                port: '',
                pathname: '/**',
            },{
                protocol: 'https',
                hostname: 'media0.giphy.com',
                port: '',
                pathname: '/**',
            }

        ],
    },
};

export default nextConfig;
