module.exports = {
  pathPrefix: `/huming0618.github.io`,
  siteMetadata: {
    title: '皮皮岛',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/markdown`,
        name: "markdown",
      },
    },
    `gatsby-transformer-remark`
  ]
}
