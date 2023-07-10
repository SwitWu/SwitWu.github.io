---
layout: post
title: LaTeX 中的列表
category: LaTeX
description: 
---

## `list` 环境

我们在 $\LaTeX$ 中见到的大多数列表（如 `itemize`、`enumerate`、`description`）以及很多环境（如 `quote`、`quotation`、`center`、`flushleft` 和 `flushright`）都是基于 `list` 环境构建的，由此可见 `list` 环境的重要性。

`list` 环境的语法为：

```LaTeX
\begin{list}{default-label}{decls}
  item-list
\end{list}
```

其中，`item-list` 是由单个或多个 `\item` 组建的条目列表，`\item` 可以接受一个可选参数用作标签，如果没有给定可选参数，那么将使用 `default-label` 作为标签。`list` 环境的第二个参数 `decls` 用于修改环境的各项几何参数，各项具体参数见下图

