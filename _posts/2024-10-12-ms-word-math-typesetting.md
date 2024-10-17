---
layout: post
title: Microsoft Word 使用指南之数学排版
category: word
description: 本来我是不喜欢用 Word 的（谁让我对 $\LaTeX$ 这么痴迷呢✌️），但是自从毕业工作之后，又不得不用它，这篇文章就谈一谈如何在 Word 中排版数学公式。
math: true
---

本来我是不喜欢用 Word 的（谁让我对 $\LaTeX$ 这么痴迷呢✌️），但是自从毕业工作之后，又不得不用它，
这篇文章就谈一谈如何在 Word 中排版数学公式。

除了在菜单栏中选择`插入`->`公式`->`插入新公式`，也可以直接通过快捷键 `Alt` + `+` 进入公式编辑环境。

### 编组

在 $\LaTeX$ 中，花括号用于编组；而在 Word 中，圆括号（小括号）用于编组。
编组在上下标、分数、根式等数学结构体的输入中都会用到。

### 数学算符

按照标准，数学算符（比如 $\sin$、$\cos$、$\tan$ 等）需要使用罗马正体，Word 对此是支持的，
我们选择`文件`->`选项`->`校对`->`自动更正选项`->`可识别的函数`，在这里可以找到
Word 为我们预定义的一些数学算符，当我们在公式编辑环境中输入算符名再按空格后，算符会被校正为罗马正体格式。

### 非 Ascii 字符

在标准键盘中，除了阿拉伯数字、26 个英文字母以及其它一些常用的 Ascii 符号，其它数学符号无法直接输入，
这了解决这一问题，Word 采取了数学符号自动更正的策略。
我们通过`文件`->`选项`->`校对`->`自动更正选项`可以进入到`数学符号自动更正`设置页面。
在这个页面中，主要有两栏，第一栏是`替换`栏，第二栏是`替换为`栏。

如果用 $\LaTeX$ 的语言来描述，那么第一栏就是字符对应的 command，而第二栏就是我们需要得到的字符。

比如，有一行的`替换栏`为 `\in`，而`替换为`栏是 `∈`，所以在公式编辑环境中输入 `\in` 再按空格便可以得到元素属于符号（`∈`）。

### 上下标

上下标的输入与 $\LaTeX$ 的语法相同（分别用 `^` 和 `_`），
但是如果上下标是多字符的话，需要使用编组。例如，如果想输入

$$\sum_{i=0}^{m+n}$$

在 $\LaTeX$ 中我们需要键入 `\sum_{i=0}^{m+n}`，而在 Word 中则需要键入
`\sum_(i=0)^(m+n)`。

### 分数

分数的输入很简单，`/` 被视为分子分母的分隔符，当我们输入 `a/b` 再按空格便可以得到 $\frac{a}{b}$。
需要注意的是分子的界定是靠空格来完成的，比如我们想输入带分数 $1\frac{1}{2}$，需要键入 `1␣1/2`，
如果输入的是 `11/2`，那么将会得到分数 $\frac{11}{2}$。


### 根式

输入二次方、三次方及四次方根有专门的命令：

+ `\sqrt` (square root)
+ `\cbrt` (cube root)
+ `\qdrt` (quartic root or fourth root)

如果被开方数为多项相加，则需要使用编组，如 `\sqrt(x^2+y^2)`。
如果需要输入 $n$ 次方根，则需要使用 `&` 分隔开方次数和被开方数，例如 `\sqrt(n&x^2+y^2)` 得到 $\sqrt[n]{x^2+y^2}$。


### References

+ [Wikipedia: $n$th root](https://en.wikipedia.org/wiki/Nth_root)
+ [The Word 2007/2010 Equation Editor](https://mathiho.sitehost.iu.edu/doc/equation-editor-shortcut-commands.pdf)
+ [Unicode Nearly Plain-Text Encoding of Mathematics. Murray Sargent III](https://unicode.org/notes/tn28/UTN28-PlainTextMath-v2.pdf)