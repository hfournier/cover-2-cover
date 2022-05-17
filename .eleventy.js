const yaml = require('js-yaml');
const { DateTime } = require('luxon');
const htmlmin = require('html-minifier');
const markdownIt = require('markdown-it');

const MARKDOWN_OPTIONS = {
  html: true,
  breaks: true,
  linkify: true
};

module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // markdown filter
  let markdownLibrary = markdownIt(MARKDOWN_OPTIONS);
  eleventyConfig.setLibrary('md', markdownLibrary);

  eleventyConfig.addFilter('toHTML', (str) => {
    return new markdownIt(MARKDOWN_OPTIONS).renderInline(str);
  });

  // human readable date
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL yyyy'
    );
  });

  eleventyConfig.addFilter('isoDate', (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  eleventyConfig.addNunjucksShortcode(
    'formatStartEnd',
    function (startDate, endDate) {
      var sd = new Date(startDate).setHours(0, 0, 0, 0);
      var ed = new Date(endDate).setHours(0, 0, 0, 0);
      if (sd.valueOf() == ed.valueOf()) {
        return `${DateTime.fromJSDate(startDate).toFormat(
          'LLL dd, yyyy'
        )} ${DateTime.fromJSDate(startDate).toFormat(
          'hh:mm'
        )} - ${DateTime.fromJSDate(endDate).toFormat('hh:mm')}`;
      } else {
        return `${DateTime.fromJSDate(startDate).toFormat(
          'LLL dd, yyyy hh:mm'
        )} - ${DateTime.fromJSDate(endDate).toFormat('LLL dd, yyyy hh:mm')}`;
      }
    }
  );

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension('yaml', (contents) => yaml.load(contents));

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    './src/admin/config.yml': './admin/config.yml',
    './node_modules/alpinejs/dist/alpine.js': './static/js/alpine.js'
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy('./src/static/img');

  // Copy robots.txt and sitemap.xml
  eleventyConfig.addPassthroughCopy('./src/robots.txt');
  eleventyConfig.addPassthroughCopy('./src/sitemap.xml');

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy('./src/favicon.ico');
  eleventyConfig.addPassthroughCopy('./src/favicon-16x16.png');
  eleventyConfig.addPassthroughCopy('./src/favicon-32x32.png');
  eleventyConfig.addPassthroughCopy('./src/android-chrome-192x192.png');
  eleventyConfig.addPassthroughCopy('./src/android-chrome-512x512.png');
  eleventyConfig.addPassthroughCopy('./src/apple-touch-icon.png');
  eleventyConfig.addPassthroughCopy('./src/browserconfig.xml');
  eleventyConfig.addPassthroughCopy('./src/mstile-150x150.png');
  eleventyConfig.addPassthroughCopy('./src/safari-pinned-tab.svg');
  eleventyConfig.addPassthroughCopy('./src/site.webmanifest');

  // Minify HTML
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: 'src'
    },
    htmlTemplateEngine: 'njk'
  };
};
