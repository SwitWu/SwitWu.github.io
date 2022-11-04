---
layout: post
title: LaTeXe 代码规范
math: true
description: 任何一门编程语言都具有其代码规范，$\LaTeX$ 也不例外。具备良好的代码写作习惯可以使得源码的可读性增强，也使得后期的源码修改与维护变得更加简单。在这篇博客中我将记录一些在 $\LaTeX$ 写作时必须遵循或建议遵循的规范，此规范适用于 $\LaTeXe$ 文档代码写作。
---

任何一门编程语言都具有其代码规范，$\LaTeX$ 也不例外。具备良好的代码写作习惯可以使得源码的可读性增强，也使得后期的源码修改与维护变得更加简单。在这篇博客中我将记录一些在 $\LaTeX$ 写作时必须遵循或建议遵循的规范，此规范适用于 $\LaTeXe$ 文档代码写作。本篇博客的主要参考资料为 zepinglee 的 $\LaTeXe$ 编码风格指南[^1]。

[^1]: [https://gitee.com/zepinglee/latex2e-style-guide](https://gitee.com/zepinglee/latex2e-style-guide)

## 缩进

每级缩进使用固定数量的空格（一般建议使用 2 个空格），需要增加一级缩进的内容包括：

+ `\begin` 开启的环境后面，例如
  ```tex
  \begin{equation}
    E = mc^2.
  \end{equation}
  ```
+ 列表环境中 `\item` 换行后的内容，例如
  ```tex
  \begin{itemize}
    \item This is a very long line,...
      continue on the next line.
    \item another item.
  \end{itemize}
  ```
+ 表格环境 `tabular` 中分割线（`\toprule`、`\midrule`、`\bottomrule`）之间的内容，例如
  ```tex
  \begin{tabular}{ccc}
    \toprule
      1 & 2 & 3 \\
    \midrule
      4 & 5 & 6 \\
    \bottomrule
  \end{tabular}
  ```

需要注意， `\begin{document}` 和 `\end{document}` 之间的内容一般不缩进。


## 换行

在文本环境中，一般建议每行列数不超过 120，并且在分句结尾（逗号、分号）或者句子结尾（句号、问号、叹号）处换行。

在数学环境中，如果公式表达式较长，建议在运算符前面换行，例如
```tex
\begin{equation}
  s = a_1 + a_2 + \cdots + a_n
      + b_1 + b_2 + \cdots + b_n.
\end{equation}
```
在 `align` 等数学对齐环境中，建议将 `&` 置于同一列中来提高可读性，例如
```tex
\begin{align}
  S & = 1 + 2 + \cdots + n \\
    & = \frac{n(n+1)}{2}.
\end{align}
```

## 空行
使用空行而不是 `\par` 来进行分段，`\par` 一般用于宏定义之中。章节命令（`\chapter`、`\section` 等）前后建议使用空行来凸显章节标题以及分隔不同章节内容。例如，前面空两行，后面空一行
```tex
% 推荐
上节内容


\section{SectionName}

本节内容
```
```tex
% 不推荐
上节内容
\section{SectionName}
本节内容
```

## 宏包调用

一个 `\usepackage{}` 只调用一个宏包，方便定位报错位置。
```tex
% 推荐
\usepackage{amsmath}
\usepackage{amssymb}
```
```tex
% 不推荐
\usepackage{amsmath,amssymb}
```

有些宏包之间的调用顺序会影响配置的效果。 通常将所有宏包集中在一起调用，再进行相应的配置。 这是因为宏包在调用时会处理与其他宏包的兼容性，可能导致先前的配置失效。

需要注意 `hyperref` 宏包应该在其它大多数宏包的调用和配置之后再进行调用，少数宏包会在其手册中声明需要在 `hyperref` 后面进行调用（如 `fixdif`）。
```tex
% 推荐
\usepackage{geometry}
\usepackage{mathtools}

\geometry{...}
\mathtoolsset{...}

\usepackage{hyperref}
\hypersetup{...}
```

## 空格

### 行尾空格

在定义宏或环境时，每行末尾要添加 `%` 以消除换行带来的空格。如果该行以宏结尾，则可以省略 `%`。

### 中西文之间的空格

> 在本小节中，我们假定编译命令为 $\XeLaTeX$。

中文与西文（这里的西文包括阿拉伯数字和数学符号）之间应手动添加空格，这样可以提高代码的可读性。另外，xeCJK 在少数情况下无法自动处理中西文之间的空格，例如，`图\ref{fig:1}中` 和 `color\color{blue}蓝`，手动添加空格即可解决此问题。

### 数学环境中的空格

数学环境中的空格一般不影响排版效果，但是有助于提高代码可读性。

在运算符两侧建议使用空格，如
```tex
\begin{equation}
  a_1 + a_2 + \cdots + a_n
\end{equation}
```
逗号、冒号、分号后面建议加空格，如
```tex
\begin{equation}
  a_1, a_2, \dots, a_n
\end{equation}
```

### 表格中空格

表格环境 `tabular` 中 `&` 两侧以及 `\\` 前面需要添加空格，建议将代码中表格内容对齐。

```latex
% 推荐
\begin{tabular}{lll}
  color               & Literal & \meta{none} \\
  mode                & Choice  & math        \\
  number-color        & Literal & \meta{none} \\
  number-mode         & Choice  & math        \\
  propagate-math-font & Switch  & false       \\
\end{tabular}
```

```latex
% 可接受
\begin{tabular}{lll}
  color & Literal & \meta{none} \\
  mode & Choice  & math \\
  number-color & Literal & \meta{none} \\
  number-mode & Choice  & math \\
  propagate-math-font & Switch & false \\
\end{tabular}
```

```latex
% 不推荐
\begin{tabular}{lll}
  color&Literal&\meta{none}\\
  mode&Choice&math\\
  number-color&Literal&\meta{none}\\
  number-mode&Choice&math\\
  propagate-math-font&Switch&false\\
\end{tabular}
```

## 内容与格式分离

$\LaTeX$ 最初的设计目标是分离内容与格式，以便作者能够专注于内容创作而非版式设计，并能以此得到高质量排版的作品。关于内容与格式分离这一思想可以参考 Liam Huang 的文章《到底什么是「内容与样式分离」》[^2]。

[^2]: <https://liam.page/2019/03/18/separation-of-content-and-presentation/>

我们在文档写作时，应当严格遵循内容与格式分离的原则。对文档中重复出现的结构块应当封装成环境。即使就目前而言，你可能无法将这个环境完完全全封装成你预期中的模样，但是至少可以搭建一个框架出来，就像下面展示的
```latex
\newenvironment{env-name}%
  {\par}{}
```
而我们可以在后期慢慢完善代码，使得其最终符合你的预期。

### 一个样例

下面我们将使用 `xparse` 宏包[^3]封装出一个 `exercise` 环境，该环境具有下列功能：

[^3]: `texdoc xparse`

+ 无可选参数时，计数器 `exercise` 自增，也即习题编号随新的 `exercise` 环境自增；
+ 有方括号类型的可选参数（如 `[8]`）时，习题编号设置为 $8$，后续的习题编号从 $9$ 开始自增；
+ 有尖括号类型的可选参数（如 `<Fredholm Alternative>`）时，自动在题号后面以粗体格式添加 **(Fredholm Alternative)**。

```tex
\newcounter{exercise}
\NewDocumentEnvironment{exercise}{o d<> +b}
  {\IfNoValueTF{#1}
    {\stepcounter{exercise}}
    {\setcounter{exercise}{#1}}
    \par\textbf{\theexercise.}\hspace{.333em}%
	\IfNoValueTF{#2}
	  {#3}
	  {\textbf{(#2)}\hspace{.333em}#3}
  }
  {\ignorespacesafterend}
```

以及相应的 WME:
```latex
% compile with xelatex under texlive2022
\documentclass{article}
\usepackage{ctex}
\newcounter{exercise}
\NewDocumentEnvironment{exercise}{o d<> +b}
  {\IfNoValueTF{#1}
    {\stepcounter{exercise}}
    {\setcounter{exercise}{#1}}
    \par\textbf{\theexercise.}\hspace{.333em}%
	\IfNoValueTF{#2}
	  {#3}
	  {\textbf{(#2)}\hspace{.333em}#3}
  }
  {\ignorespacesafterend}

\begin{document}

\begin{exercise}
  请证明哥德巴赫猜想 (Goldbach's conjecture), 即, 任一大于 2 的偶数都可表示成两个质数之和.
\end{exercise}

\begin{exercise}
  请证明孪生素数猜想 (Twin prime conjecture), 即, 存在无穷多个素数 $p$,
  使得 $p+2$ 是素数.
\end{exercise}

\begin{exercise}[4]<exercise 3 is missing>
  Prove the Riemannian conjecture.
\end{exercise}

\begin{exercise}<Optional>
  Prove the Jacobian conjecture.
\end{exercise}

\begin{exercise}
  (1) Prove the Hodge conjecture.
  (2) Prove the abc conjecture.
\end{exercise}

\end{document}
```

经测试，上述工作示例的输出为
![exercise-mwe](/images/latex-code-standard/exercise-mwe.png){:.invert}

## 参考资料

<div id="footnotes"></div>
