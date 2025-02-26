import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: [
    //   "uploadthing.com",
    //   "k04xtc53e0.ufs.sh",
    //   "utfs.io",
    //   "lh3.googleusercontent.com" 
    // ],
    remotePatterns: [ 
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "k04xtc53e0.ufs.sh",
        pathname: "**",
      },
    ]
  }
};

export default nextConfig;
