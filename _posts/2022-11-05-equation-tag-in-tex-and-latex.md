---
layout: post
title: TeX 和 LaTeX 中的 Equation Tag
category: LaTeX
description: 在使用 $\LaTeX$ 写作数学文稿时，为方程式添加标签是很常见的需求，在本篇博客中，我们将围绕方程标签这个主题，讲讲关于它的故事。
---

在使用 $\LaTeX$ 写作数学文稿时，为方程式添加标签是很常见的需求，在本篇博客中，我们将围绕方程标签这个主题，讲讲关于它的故事。

## $\TeX$ 时代

在 plain $\TeX$ 格式中，为方程式添加标签的方式为

```tex
$$<formula>\eqno<formula>$$
```

其中第一个 `formula` 为行间公式，第二个 `formula` 为标签。例如
```tex
$$\lim_{n\to\infty}\biggl(1+{1\over n}\biggr)^n = {\rm e}.\eqno(8)$$
```
的效果为
![](/images/equation-tag-in-tex-and-latex/eqno.png)
如果想要将标签置于方程式的左侧，则需要用另外一个宏 `\leqno`。

> 需要注意的是第二个 `formula` 也是在数学模式中的，这与后面要说的 `\tag{}` 有所不同。

第二个 `formula` 不仅可以是一般的阿拉伯数字标签，也可以是其它特殊标签。例如

```tex
$$\lim_{n\to\infty}\biggl(1+{1\over n}\biggr)^n = {\rm e}.\eqno(*)$$
$$\lim_{n\to\infty}\biggl(1+{1\over n}\biggr)^n = {\rm e}.\eqno(**)$$
$$\lim_{n\to\infty}\biggl(1+{1\over n}\biggr)^n = {\rm e}.\eqno(***)$$
```
用 plain $\TeX$ 运行一下，你会看到结果是这样的：
![](/images/equation-tag-in-tex-and-latex/eqno-star.png)

可以看到，前面两个标签合乎心意，可第三个标签却有点奇怪：「为什么星号之间的间距这么大呢？」

其实，这是因为在数学模式中，$\TeX$ 将 `*` 视作二元运算符[^binary-operations]。在 `(*)` 和 `(**)` 这两个情形中，由于没有可供运算的对象，所以这时的二元运算符被转化为普通符号（Type Ord）。但是在 `(***)` 中，中间的星号仍然保持为二元运算符，$\TeX$ 会在其两侧添加适当的间距。

[^binary-operations]: Donald E. Knuth. The $\TeX$book

那么怎么解决这个问题呢？很简单，将 `(***)` 改为 `(*{*}*)` 就可以了。

## $\LaTeX$ 时代

美国数学会的 amsmath 宏包[^amsmath]定义了三个宏：`\tag`、`\tag*` 以及 `\notag`。

[^amsmath]: [User’s Guide for the amsmath Package](https://www.ctan.org/pkg/amsmath) `texdoc amsmath`

+ `\tag` 将其参数作为标签，并且会自动在参数两侧添加圆括号。
+ `\tag*` 将其参数作为标签，但不会自动在参数两侧添加圆括号。
+ `\notag` 的作用为阻止方程式编号。

需要注意的是 `\tag` 和 `\tag*` 的参数处于文本模式，如果要在参数当中使用数学符号，需要用 `$` 将其包裹，例如 `\tag{$\star$}`。





## 参考
<div id="footnotes"><div>
