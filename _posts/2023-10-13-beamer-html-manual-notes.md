---
layout: post
title: Some notes for Beamer-HTML-manual
category: [LaTeX, web]
tags: [LaTeX, HTML, Python]
description: 
lang: en-US
---

## Introduction

I have completed a project called [Beamer-HTML-manual](https://github.com/SwitWu/beamer-html-manual) recently. The corresponding web address is [https://www.beamer.plus](https://www.beamer.plus). Here are some notes that I would like to take for it.

## The Basic Procedure

1. Find the corresponding `.tex` file(s). Usually, for a large project there is a main file and many other subfiles. We need to insert `lwarp` package into the preamble of the main file and make some settings according to the `lwarp` documentation.
2. Compile the main file using `pdf/xe/lualatex` for the first time to produce the configuration file and then use the `lwarpmk` tool provided by `lwarp`. For more details, see the package documentation.

    There are usually some special environments and macros defined for special output effect in the PDF documentation. You have to inject `\BlockClass` and `\InlineBlock` provided by `lwarp` into the definition code of these environments and macros, in this way, the corresponding HTML parts will be enclosed by specific `div` and `span` tags which are necessary for style customization.

   *Note:* There may have some compilation errors when you start your first compilation journey. For example, one have to set `doc2` option to `ltxdoc` document class, otherwise you can not compile successfully.

   *Note:* If you try to compile the source code of beamer documentation using the traditional tool `pdflatex`, you will fail. In fact, the beamer PDF manual is produced using `l3build` since it has to generate lots of inner/outer/font/color theme demos first. So I analyze the source code and write a Python script to generate the demo PDFs in a separate directory
   and use `pdfcairo` tool to convert them into `svg` format.

3. After step 2, I get the raw HTML files. Now it's time to refine them using the BeautifulSoup module. Several important goals are:
    + Create table of contents, including global TOC for the whole project and local TOC for every HTML page
    + Delete unnecessary tags
    + Add header and footer
    + Customize the home page

4. Create `css` file and control every detail of the HTML page by this. It's vital to achieve the responsive design to make the web page readable on most digital devices.

    *Note:* The TOC pop up function on mobile phone devices is accomplished with the help of JavaScript.