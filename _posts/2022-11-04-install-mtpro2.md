---
layout: post
title: 安装 mtpro2 字体
categories: LaTeX
---

> 本教程仅在 mac 系统下经过测试，windows 用户请自行测试。

## 安装步骤

1. 要么直接从[官网](https://www.pctex.com/mtpro2.html)下载字体资源（需要付费购买版权）。要么从 Github [仓库](https://github.com/armeyer/mcs_web/tree/master/macros/mtp2fonts/texmf)或者 LaTeX studio 上的[链接](http://static.latexstudio.net/wp-content/uploads/2013/02/MathTimePro2-fonts.zip)下载 `texmf` 文件夹至本地。
2. 可以看到里面有 `doc`、`dvips`、`fonts`、`source`、`tex` 以及 `tpm` 这 6 个子文件夹。
3. 为了叙述简便，下面将 `texmf-local` 这一文件夹作为绝对路径描述的起始文件夹，我们知道，这不会引起任何歧义。
    + 将 `doc` 文件夹中的文件拷贝到路径 `texmf-local/doc/mtpro2` 下（注意：`texmf-local/doc` 文件夹下本来是没有 `mtpro2` 的，为了方面管理，建议在 `doc` 下创建一个 `mtpro2` 文件夹，下同）。
    + 将 `dvips` 文件夹中的文件拷贝到路径 `texmf-local/dvips/local/mtpro2` 下。
    + 将 `fonts/tfm` 文件夹中的文件拷贝到路径 `texmf-local/fonts/tfm/local/mtpro2` 下。
    + 将 `fonts/type1` 文件夹中的文件拷贝到路径 `texmf-local/fonts/type1/local/mtpro2` 下。
    + 将 `source/latex/mtpro2` 文件夹中的 `dtx` 和 `ins` 文件拷贝到路径 `texmf-local/source/latex/mtpro2` 下。
    + 将 `tex/latex/mtpro2` 里面的 `mtpro2.sty` 和其它几个文件拷贝路径 `texmf-local/tex/latex/local/mtpro2` 下。
    + 将 `tex/plain/mtpro2` 里面的 `mtp2.tex` 拷贝到路径 `texmf-local/tex/plain/local/mtpro2` 下。
    + 将 `tpm/package` 文件夹里面的 `tpm` 文件拷贝到路径 `texmf-local/tpm/package` 下。

4. 终端运行 `sudo mktexlsr`。
5. 终端运行 `sudo updmap-sys --enable Map=mtpro2.map`。
6. 终端运行 `sudo updmap-sys --disable Map=belleek.map`。
7. 终端运行 `texdoc mtpro2` 和 `texdoc guide2` 阅读字体使用手册。