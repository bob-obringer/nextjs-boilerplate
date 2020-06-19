/*
    NextJS Config

    NextJS has a default config which can be customized using a function that returns a
    configuration that is merged with the default config.

    https://nextjs.org/docs#custom-configuration
 */
const bundleAnalyzer = require('@next/bundle-analyzer');

const { BUNDLE_ANALYZER, PROFILING, MINIMIZE } = process.env;

const isBundleAnalyzerEnabled = BUNDLE_ANALYZER === 'true';
const isProfilingEnabled = PROFILING === 'true';
const isMinimizeEnabled = MINIMIZE !== 'true';

const withBundleAnalyzer = bundleAnalyzer({ enabled: isBundleAnalyzerEnabled });

/*
    This allows us to profile production builds, because who wants to profile development mode?
    https://kentcdodds.com/blog/profile-a-react-app-for-performance
 */
const reactProductionProfiling = isProfilingEnabled
    ? {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
      }
    : {};

module.exports = () => {
    let config = {
        webpack: (nextWebpackConfig) => {
            nextWebpackConfig.resolve.alias = {
                ...nextWebpackConfig.resolve.alias,
                ...reactProductionProfiling,
            };

            nextWebpackConfig.optimization.minimize = isMinimizeEnabled;

            return nextWebpackConfig;
        },
    };

    return withBundleAnalyzer(config);
};
