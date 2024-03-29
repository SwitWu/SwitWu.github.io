---
layout: post
title: TeXbook 第十四章——断行
category: LaTeX
description: 
math: true
last_modified_at: 2023-07-20
---

## 带子(tie)

首先我们要说一个用得比较多的东西——带子（`~`），其定义会在后面给出。实际上，带子就是一个不可断行的空格，为了排版的规范和美观，我们应该在一些场景中使用带子：

+ 在缩写后面，如 `Mr.`、`Mrs.`、`Ms.`、`Prof.`、`Dr.`、`Fig.`、`cf.` 等，如果不进行干预，$\TeX$ 会把这里的句号视为句子的结尾。为此，需要在句号后面使用 `~` 来插入正常间距并避免在句号后面断行，如 `Prof.~Evans`
+ 引用命名块，如 `Chapter~12`、`Theorem~1.2`、`Appendix~A` 等
+ 人名之间，如 `Donald~E. Knuth`
+ 数学符号与其对应的名词之间，如 `dimension~$d$`、`function~$f(x)$`
+ 系列符号之间，如 `1,~2, or~3`、`$a$,~$b$, and~$c$`

有时想在连字符或破折号处禁止断行，可以使用 `\hbox`
将内容包裹，如 `Table~\hbox{B-8}`，要知道，盒子一旦被构建出来，它们就成为了不可分解的单元，它们里面的内容不会被 $\TeX$ 切开。

> `Chapter~12` 相比 `\hbox{Chapter 12}` 的优点： 
> 1. 由 `~` 得到的空格可以伸缩，但是盒子里面的空格宽度固定了
> 2. 前者允许在 `Chapter` 中间进行连字，但是后者不行

## 水平模式的 items

在断行之前，$\TeX$ 中的一个段落实际上是一个水平列表，也就是 $\TeX$ 在水平模式下收集到的一列 items，这些 items 可以分为下面八类：

+ 盒子（character, ligature, rule, hbox, vbox）
+ 任意可断点
+ 'whatsit'
+ 垂直材料（来自 `\mark` 或者 `\vadjust` 或者 `\insert`）
+ 粘连或者 `\leaders`
+ kern（类似于粘连，但是不能伸缩）
+ 惩罚
+ 公式开始或者公式结束

前四类为不可丢弃型，而后四类（glue, kern, penalty, math items）为可丢弃型，因为它们在断行处可能会改变或消失。

## 任意可断点

一个任意可断点（discretionary break）由三部分组成：
+ pre-break text
+ post-break text
+ no-break text

语法为

```tex
\discretionary{<pre-break text>}{<post-break text>}{<no-break text>}
```

如果在此处断行，则 pre-break text 会出现在当前行结尾，post-break text 会出现在下一行开头；如果不在此处断行，则 no-break text 会出现在当前行。

例如，可以在 difficult 的两个 f 间设置可断点：

```tex
di\discretionary{f-}{fi}{ffi}cult
```

但实际上，我们不需要手动设置，$\TeX$ 的连字算法会在幕后完成这些工作。

为了节省时间，$\TeX$ 会在不插入任意连字符的前提下尝试第一次断行，如果断行的结果是所有行的 badness 值都未超过 `\pretolerance` 的当前值，那么第一次尝试成功通过。若第一次尝试失败了，$\TeX$ 会使用附录 H 中的方法将任意可断点插入到水平列表中，第二次将以 `\tolerance` 作为依据。当行较宽时，实验证明第一次尝试在 90% 的情况下都会通过，平均每段不超过两个单词需要递交给连字算法进行处理。但是如果行较窄时，第一次尝试通常很快就会失败。plain $\TeX$ 设置 `\pretolerance=100`、`\tolerance=200`。如果设置 `\pretolerance=10000`，那么第一次尝试基本上总会成功，但是效果很糟糕；相反，如果设置 `\pretolerance=-1`，$\TeX$ 会跳过第一次尝试。

## 断行点

断行只能出现在水平列表的特定位置，具体来说，断行允许出现在下列五种情形中：

1. 在粘连处，只要这个粘连的前面是一个不可丢弃的 item 并且粘连不在数学公式中。粘连处的断行发生在 glue space 的左侧。
2. 在 kern 处，只要这个 kern 后面跟的是粘连并且不是数学公式的一部分。
3. 在数学公式结束处且公式后面跟的是粘连
4. 在惩罚处（公式中可能会自动插入惩罚）
5. 在任意可断点处

每一个潜在的可断点都有一个对应的惩罚值，这个惩罚值代表了在该点进行断行的“美学代价”。对于前三种情形，惩罚值为零；第 4 中情形的惩罚值是显式指定的；对于最后一种情形，我们要分两种情况讨论，如果 pre-break text 非空的话，那么惩罚值为 `\hyphenpenalty` 的当前值，如果 pre-break text 为空的话，那么惩罚值为 `\exhyphenpenalty` 的当前值。plain $\TeX$ 设置 `\hyphenpenalty=50`, `\exhyphenpenalty=50`。

举个例子，如果你在段落中的某个点处插入 `\penalty 100`，那么这个点就成为了一个合法的断行点，但是会有一个 $100$ 的惩罚值。如果插入的是 `\penalty -100`，那么 $\TeX$ 会将此处视为一个相当好的断行点，因为负的惩罚值即为奖励值。

$\TeX$ 绝不会在惩罚值大于等于 $10000$ 的地方断行，与此对应，$\TeX$ 绝对会在惩罚值小于等于 $-10000$ 的地方断行。对此，plain $\TeX$ 定义了宏

```tex
\def\nobreak{\penalty10000 }
\def\break{\penalty-10000 }
\def\allowbreak{\penalty0 }
\def~{\penalty10000\ }
```

所以 `\nobreak` 禁止断行，`\break` 强制断行，`\allowbreak` 允许断行，`~` 为一个不可断行的空格（俗称为带子）。

当在某个点发生断行后，$\TeX$ 移除该断行点后面的所有可丢弃的 items，直到遇见不可丢弃的 item，或者直到遇见另一个被选择的断行点。例如，如果中间没有盒子介入的话，断行点后面的一列粘连和惩罚将作为整体消失。

## badness 和 demerits

一行的 badness 是一个整数，近似等于 100 乘以一个比值的立方，这个比值就是为了得到所要求尺寸的 hbox，行中的粘连必须伸缩的比例。例如，如果粘连的总收缩能力是 10 points, 并且粘连总共被压缩了 9 points，那么 badness 的值是 73 (因为 $100\times(9/10)^3=72.9$)；类似地，如果粘连的伸长长度为其伸长能力的两倍，那么 badness 的值为 $100\times 2^3=800$。但是如果计算出来的 badness 的值超过了 $10000$，就会使用 $10000$ 这个值。（见第十二章关于粘连设置比率 $r$ 和粘连设置阶数 $i$ 的讨论，如果 $i\neq 0$，那么粘连具有无限伸缩性，于是 badness 的值恒为零，否则 badness 的值约等于 $\min(100r^3, 10000)$）。

如果一行的 badness 大于等于 13 的话，那么粘连设置比率必然超过了 50%。在这种情况下，根据粘连是收缩还是伸长，我们分别将这行称为 tight 的和 loose 的，如果 badness 大于等于 100，我们认为这一行 very loose。但如果 badness 小于等于 12，我们说这一行是不错的 (decent)。所以，根据 badness 的值，我们把行分为了四类：tight, decent, loose, very loose。相邻的两行被称为视觉上不兼容，如果它们所处的类别不相邻，也即，一个 tight line 邻接一个 loose line 或 very loose line，也可能是 decent line 邻接一个 very loose line。

$\TeX$ 对每个潜在的断行点序列进行评估，评估的方法计算每行的 demerit 值的总和。假设一行的 badness 值为 $b$，行末断行点对应的 penalty 值为 $p$。如果 $p\geq 10000$ 或者 $b$ 超过了当前的 tolerance 或 pretolerance 的值，$\TeX$ 根本不会考虑这样的断行，否则该行的 demerit 值定义为

$$
d = \begin{cases}
  (l+b)^2 + p^2, & \text{if } 0\leq p<10000; \\
  (l+b)^2 - p^2, & \text{if } -10000<p<0; \\
  (l+b)^2,       & \text{if } p\leq -10000.
\end{cases}
$$

这里的 $l$ 为 `\linepenalty` 的当前值，plain $\TeX$ 设置 `\linepenalty=10`。例如，如果某一行的 badness 值为 20，并且断行点在粘连处，那么 demerit 值为 $(10+20)^2=900$，因为在粘连处断行的惩罚值为零。

如果相邻的两行视觉上不兼容，那么 $d$ 的值会加上 `\adjdemerits`，如果相邻的两行都以任意可断点结尾，那么 $d$ 的值会加上 `\doublehyphendemerits`，如果倒数第二行以任意可断点结尾，那么 $d$ 会加上 `\finalhyphendemerits`。plain $\TeX$ 设置了三者的值分别为 10000、10000 和 5000。tolerance 和 penalty 的量级与 badness 一样，但是 demerit 是 badness 的平方量级（从定义式可以看出），所以若想让 demerit 类的参数起显著作用，必须将其参数值设置得足够大。

## 断行前的工作

在 $\TeX$ 开始选择断行点前，它会做两件重要的事：

1. 如果当前水平列表最后的 item 为粘连，会将其丢弃。
2. 额外的三个 items 会添加到当前水平列表的末尾：`\penalty10000`（禁止断行）、`\hskip\parfillskip`（添加结束粘连至段落）、`\penalty-10000`（强制断行）。plain $\TeX$ 设置 `\parfillskip=0pt plus 1fil`，这会使得每个段落的最后一行被空白间距填充。当然，可以修改 `\parfillskip` 以实现特殊的效果，例如，如果设置 `\parfillskip=0pt`，那么段落的最后一行将会被文本填充至 right margin，请注意，如果段落没有足够的长度，其排版效果可能非常糟糕。

## `\leftskip` 和 `\rightskip`

$\TeX$ 中有两个参数叫做 `\leftskip` 和 `\rightskip`，这两个参数指定了插入在段落每行左右两侧的粘连，当计算 badness 和 demerit 的值时，这些粘连会被考虑进去。一般情况下，plain $\TeX$ 保持二者为零。有一个宏叫做 `\narrower`，它会把 `\leftskip` 和 `\rightskip` 都加上 `\parindent` 的值：

```tex
\def\narrower{\advance\leftskip by\parindent
  \advance\rightskip by\parindent}
```

可以使用 `\narrower` 来引用文本，如：

```tex
{\narrower\smallskip\noindent
This paragraph will have narrower lines than
the surrounding paragraphs do, because it
uses the ``narrower'' feature of plain \TeX.
The former margins will be restored after
this group ends.\smallskip}
```

第二个 `\smallskip`[^smallskip] 会结束段落，一定要在结束编组之前结束段落，否则 `\narrower` 的效果会在 $\TeX$ 选择断行点之前消失。

[^smallskip]: 注意 `\smallskip` 在 plain $\TeX$ 和 $\LaTeX$ 中的定义不同，这会导致上面的用法在 $\LaTeX$ 中失效，见 [Why does \narrower not work in LaTeX as in plain TeX?](https://tex.stackexchange.com/questions/568415/why-does-narrower-not-work-in-latex-as-in-plain-tex) 中的讨论

> `\line`、`\leftline`、`\rightline` 和 `\centerline` 的定义并未将 `\leftskip` 和 `\rightskip` 考虑进去，为了改进这一点，我们可以将 `\line` 的定义改为 
> ```tex
> \def\line#1{\hbox to\hsize{\hskip\leftskip#1\hskip\rightskip}}
> ```
> 其它三个都是基于 `\line` 定义的，所以不用改动。

## `\parshape`

`\parshape` 可以用来创建任意的段落形状，语法为：`\parshape=`$n$ $i_1$ $l_1$ $i_2$ $l_2$ $\ldots$ $i_n$ $l_n$，意思是前 $n$ 行的长度分别为 $l_1,l_2,\ldots,l_n$ 且分别从左侧缩进长度 $i_1,i_2,\ldots,i_n$。如果段落不足 $n$ 行，多余的指定被忽略掉；如果段落超过 $n$ 行，那么第 $n$ 行的指定作用于后面各行。可以通过 `\parshape=0` 取消掉前面的效果。

下面的代码演示了用 `\parshape` 实现 Pascal 三角形的效果：

```tex
\newdimen\x
\x=8.9pt % 13.4pt, 18.1 pt, 22.6 pt, 32.6 pt, and 47.2 pt
\setbox1=\hbox{I}
\setbox0=\vbox{\parshape=11 -0\x0\x -1\x2\x -2\x4\x -3\x6\x
-4\x8\x -5\x10\x -6\x12\x -7\x14\x -8\x16\x -9\x18\x -10\x20\x \ifdim \x>2em \rightskip=-\wd1
\else \frenchspacing \rightskip=-\wd1 plus1pt minus1pt
\leftskip=0pt plus 1pt minus1pt \fi
\parfillskip=0pt \tolerance=1000 \noindent I turn, in the following treatises, to various uses of those triangles whose generator is unity. But I leave out many more than I include; it is extraordinary how fertile in properties this triangle is. Everyone can try his hand.}
\centerline{\hbox to \wd1{\box0\hss}}
```

<figure>
  <img src="../images/texbook-chapter14/Pascalian.png" alt="Pascalian" class="invert" style="max-width: 100%;">
  <figcaption markdown="span"></figcaption>
</figure>


## `\hangindent` 和 `\hangafter`

`\hangindent=<dimen>` 指定悬挂缩进的长度，`\hangafter=<number>` 指定在哪些行进行缩进。令 $x$ 和 $n$ 分别为二者的值，并令 $h$ 为 `\hsize` 的值；如果 $n\geq 0$，则悬挂缩进发生于段落的第 $n+1$ 行至最后一行；如果 $n<0$，则悬挂缩进发生于段落的第一行至第 $\lvert n\rvert$ 行。悬挂缩进意味着这些行的宽度为 $h-\lvert x\rvert$ 而不是 $h$；若 $x\geq 0$，则从左侧进行缩进，否则从右侧进行缩进。

## 断行后的粘连与惩罚

断行完成之后，$\TeX$ 将这些行加入到当前垂直列表，并插入行间粘连（见第 12 章），行间粘连依赖于 `\baselineskip`、`\lineskip` 和 `\lineskiplimit` 的值。为了帮助控制后面的分页，$\TeX$ 还会在每个行间粘连前插入 penalty。

行间 penalty 的计算方法：假设 $\TeX$ 已经为某个段落或者（在行间公式前面的）部分段落选择好了断行点，并且已经形成 $n$ 行，那么在第 $j$ 行和第 $j+1$ 行 ($1\leq j<n$) 之间的 penalty 为 `\interlinepenalty` 的值加上在一些特殊情形下的额外 penalty，具体来说，当 $j=1$ 时（即第一行后面）会加上 `\clubpenalty`；当 $j=n-1$ 时（即最后一行前面）会加上 `\displaywidowpenalty` 或 `\widowpenalty`（取决于后面跟的是不是行间公式）；如果第 $j$ 行以任意可断点结尾，还会加上 `\brokenpenalty`。plain $\TeX$ 设置了:

```tex
\clubpenalty=150
\widowpenalty=150
\displaywidowpenalty=50
\brokenpenalty=100
```

`\interlinepenalty` 的值一般为零，但是在脚注中会增加到 100，这样会使得长脚注尽量不分页。

例如，考虑一个 5 行的段落，其中第二行和第四行以连字符结尾，各行之间的惩罚分别是 150，100，0，250。考虑一个只有两行的段落，那么惩罚为 `\interlinepenalty` 加 `\clubpenalty` 加 `\widowpenalty` 再加可能有的 `\brokenpenalty`。

## `\vadjust`

如果在段落中使用 `\vadjust{<垂直模式材料>}`，$\TeX$ 会使用内部垂直模式将`<垂直模式材料>`插入到 `\vadjust` 所在行的后面。例如，可以通过 `\vadjust{\kern1pt}` 增加两行间的距离。另外，如果想要在某个特定行后面立即分页，可以在该行中使用 `\vadjust{\eject}`，其中 `\eject` 的作用是强制分页（`\def\eject{\par\penalty-10000}`）。


## `\everypar`

当 $\TeX$ 进入水平模式，它会中断正常扫描，读取由 `\everypar={<token list>}` 预定义的 tokens。

例如，假设你声明了 `\everypar={A}`，然后在垂直模式中输入 `B`，那么 $\TeX$ 会切换到水平模式（在为当前页面添加 `\parskip` 粘连之后），然后构建水平列表，最开始当然是宽度为 `\parindent` 的空盒子，接着 $\TeX$ 会读取 `AB`。

## 实战举例

经验证明 $\TeX$ 的断行算法可以用来处理各种各样的任务。下面举个例子：出版在 *Mathematical Reviews* 的文章通常都会签署审稿人的姓名和地址，并且这些信息按右对齐排版，如下图所示：

<figure>
  <img src="../images/texbook-chapter14/mathematical-reviews.png" alt="mathematical-reviews" class="invert" style="max-width: 100%;">
  <figcaption markdown="span"></figcaption>
</figure>

如果段落的最后一行剩余足够的空间，那么姓名和地址就会放在同一行，否则会放在下一行。为此，定义宏

{% raw %}
```tex
\def\signed #1 (#2){{\unskip\nobreak\hfil\penalty50
  \hskip2em\hbox{}\nobreak\hfil\sl#1 \rm(#2)
  \parfillskip=0pt \finalhyphendemerits=0 \par}}
```
{% endraw %}

如果在 `\penalty50` 处断行了，那么 `\hskip2em` 就会消失，空盒子 `\hbox{}` 出现在下一行的开头，后面紧跟着粘连 `\hfil`，这样会生成两行，badness 的值为零。注意这里一定要有一个空盒子，否则的话，不光 `\hskip2em` 会消失，后面的 `\nobreak\hfil` 也会消失。如果没有在 `\penalty50` 处断行，那么在 review 和姓名之间会有 2em plus 2fil 的粘连。

## 注释

<div id="footnotes"></div>