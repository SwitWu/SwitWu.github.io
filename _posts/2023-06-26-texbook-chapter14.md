---
layout: post
title: TeXbook 第十四章——断行
category: LaTeX
description: 
math: true
---

## 水平模式的 items

在断行之前，$\TeX$ 中的一个自然段实际上是一个水平列表，也就是 $\TeX$ 在水平模式下收集到的一列 items，这些 items 可以分为下面八类：

+ 一个盒子（character, ligature, rule, hbox, vbox）
+ 一个任意可断点
+ 一个 'whatsit'
+ 垂直材料（来自 `\mark` 或者 `\vadjust` 或者 `\insert`）
+ 一个粘连团或者 `\leaders`
+ 一个 kern（类似于粘连，但是不能伸缩）
+ 一个惩罚
+ 公式开始或者公式结束

前四类为不可丢弃型，而后四类（glue, kern, penalty, math items）为可丢弃型，因为它们在断行处可能会改变或消失。

## 断行点

断行只能出现在水平列表的特定位置，具体来说，断行允许出现在下列五种情形中：

1. 在粘连处，只要这个粘连的前面是一个不可丢弃的 item 并且粘连不在数学公式中。粘连处的断行发生在 glue space 的左侧。
2. 在 kern 处，只要这个 kern 后面跟的是粘连并且不是数学公式的一部分。
3. 在数学公式结束处且公式后面跟的是粘连
4. 在一个惩罚处（公式中可能会自动插入 penalty）
5. 在任意可断点处

每一个潜在的可断点都有一个对应的惩罚值，这个惩罚值代表了在该点进行断行的“美学代价”。对于前三种情形，惩罚值为零；第 4 中情形的惩罚值是显式指定的；对于最后一种情形，我们要分两种情况讨论，如果 pre-break text 非空的话，那么惩罚值为 `\hyphenpenalty` 的当前值，如果 pre-break text 为空的话，那么惩罚值为 `\exhyphenpenalty` 的当前值。

> Plain $\TeX$ 设置 `\hyphenpenalty=50`, `\exhyphenpenalty=50`

举个例子，如果你在自然段中的某个点处插入 `\penalty 100`，那么这个点就成为了一个合法的断行点，但是会有一个 $100$ 的惩罚值。如果插入的是 `\penalty -100`，那么 $\TeX$ 会将此处视为一个相当好的断行点，因为负的惩罚值即为奖励值。

$\TeX$ 绝不会在惩罚值大于等于 $10000$ 的地方断行，与此对应，$\TeX$ 绝对会在惩罚值小于等于 $-10000$ 的地方断行。对此，plain $\TeX$ 定义了宏

```tex
\def\nobreak{\penalty10000 }
\def\break{\penalty-10000 }
\def\allowbreak{\penalty0 }
\def~{\penalty10000\ }
```

所以 `\nobreak` 禁止断行，`\break` 强制断行，`\allowbreak` 允许断行，`~` 为一个不可断行的空格（俗称为带子）。

当在某个点发生断行后，$\TeX$ 移除该断行点后面的所有可丢弃的 items，直到遇见不可丢弃的 item，或者直到遇见另一个被选择的断行点。

## 行的美观程度——badness

一行的 badness 是一个整数，近似等于 100 乘以一个比值的立方，这个比值就是为了得到所要求尺寸的 hbox，行中的粘连必须伸缩的比例。例如，如果粘连的总收缩能力是 10 points, 并且粘连总共被压缩了 9 points，那么 badness 的值是 73 (因为 $100\times(9/10)^3=72.9$)；类似地，如果粘连的伸长长度为其伸长能力的两倍，那么 badness 的值为 $100\times 2^3=800$。但是如果计算出来的 badness 的值超过了 $10000$，就会使用 $10000$ 这个值。（见第十二章关于粘连设置比率 $r$ 和粘连设置阶数 $i$ 的讨论，如果 $i\neq 0$，那么粘连具有无限伸缩性，于是 badness 的值恒为零，否则 badness 的值约等于 $\min(100r^3, 10000)$）。

如果一行的 badness 大于等于 13 的话，那么粘连设置比率必然超过了 50%。在这种情况下，根据粘连是收缩还是伸长，我们分别将这行称为 tight 的和 loose 的，如果 badness 大于等于 100，我们认为这一行 very loose。但如果 badness 小于等于 12，我们这一行还是非常不错的 (decent)。所以，根据 badness 的值，我们把行分为了四类：tight, decent, loose, very loose。相邻的两行被称为视觉上不兼容，如果它们所处的类别不相邻，也即，一个 tight line 邻接一个 loose line 或 very loose line，也可能是 decent line 邻接一个 very loose line。

---

未完待续……