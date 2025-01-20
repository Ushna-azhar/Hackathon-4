import { NextConfig } from 'next';
import { i18n } from './next-i18next.config'; // Import i18n config

const nextConfig: NextConfig = {
  i18n, // Include the i18n configuration
  // other Next.js configuration options here
};

export default nextConfig;
