/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        hostname: "seijiakakabe-991617069.s3.amazonaws.com"
      }
    ]
  }
};

export default nextConfig;
