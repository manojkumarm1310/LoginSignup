// webpack.config.js
import path from 'path';

export default {
  // ... other configurations
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify")
    }
  },
  resolve: {
    fallback: {
      "os": require.resolve("os-browserify/browser")
    }
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify")
    }
  }
};

