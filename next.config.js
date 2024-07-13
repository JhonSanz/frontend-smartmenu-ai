
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false
})

module.exports = {
  reactStrictMode: false,
  // output: "export",
  env: {
    NEXT_PUBLIC_NODE_BACKEND_URL: process.env.NEXT_PUBLIC_NODE_BACKEND_URL,
    NEXT_PUBLIC_NODE_SOCKET_IO: process.env.NEXT_PUBLIC_NODE_SOCKET_IO,

    NEXT_PUBLIC_NODE_BACKEND_URL_PRODUCTION: process.env.NEXT_PUBLIC_NODE_BACKEND_URL_PRODUCTION,
    NEXT_PUBLIC_NODE_SOCKET_IO_PRODUCTION: process.env.NEXT_PUBLIC_NODE_SOCKET_IO_PRODUCTION,

    NEXT_PUBLIC_ENV_MODE: process.env.NEXT_PUBLIC_ENV_MODE,
  }
}

// module.exports = {
//   reactStrictMode: false,
//   transpilePackages: ['@mui/x-charts'],
//   // output: "export",
//   env: {
//     NEXT_REPORTS_URL: process.env.NEXT_REPORTS_URL,
//     NEXT_PUBLIC_NODE_BACKEND_URL: process.env.NEXT_PUBLIC_NODE_BACKEND_URL,
//     NEXT_MESSAGES_URL: process.env.NEXT_MESSAGES_URL,
//   }
// };
