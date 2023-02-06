import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '56b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '713'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'b36'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '81f'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', 'fd8'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', 'cfd'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '6e9'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', '705'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '29f'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', 'bd7'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', '313'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', '1d3'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '731'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', '27a'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', '4cd'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', '8bb'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', 'ce1'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', '202'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '54e'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'ed4'),
    routes: [
      {
        path: '/docs/category/reporank-algorithm',
        component: ComponentCreator('/docs/category/reporank-algorithm', 'f5e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro', 'aed'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/reporank-algorithm/activation-functions',
        component: ComponentCreator('/docs/reporank-algorithm/activation-functions', '6d9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/reporank-algorithm/components',
        component: ComponentCreator('/docs/reporank-algorithm/components', '7b5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/reporank-algorithm/final-score',
        component: ComponentCreator('/docs/reporank-algorithm/final-score', 'f7b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/reporank-algorithm/general-architecture',
        component: ComponentCreator('/docs/reporank-algorithm/general-architecture', 'bcf'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '5b1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
