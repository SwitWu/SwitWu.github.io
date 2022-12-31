---
layout: post
title: 科学排版无小事，细微之处显功夫
categories: LaTeX typeset
description: 
---


## 前言

有人曾说：“排版是一门艺术，而 $\LaTeX$ 是一门技术”。

对技术我们要刨根问底、追根溯源，而对于艺术我们则要心怀敬畏、追求美感。

## 数学排版

### 二则一，该选哪一个？

+ 在集合表示中，中间的竖线应该用 `\mid` 而不是直接使用 `|`，例如
  ```latex
  \{x\in\mathbb{R} \mid 0\le x\le 1\}
  ```
+ 表示两个集合的差，应该用 `\setminus` 而不是 `\backslash`，因为 `\setminus` 的类型为 `\mathord`，而 `\setminus` 的类型为 `\mathbin`
+ `\mathrm` vs `\operatorname` 这两个命令有类似之处，
+ `**...**` vs `\[...\]`


## 参考

+ [Why is `$$...$$` preferable to `\[...\]`?](https://tex.stackexchange.com/questions/503/why-is-preferable-to)
+ [`\mid`, `|` (vertical bar), `\vert`, `\lvert`, `\rvert`, `\divides`](https://tex.stackexchange.com/questions/498/mid-vertical-bar-vert-lvert-rvert-divides)