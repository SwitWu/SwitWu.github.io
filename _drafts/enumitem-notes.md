---
layout: post
title: LaTeX 宏包介绍（二）—— enumitem
category: LaTeX
description: 
---

## 介绍

`enumitem` 宏包对基本的列表环境（`enumerate`、`itemize` 和 `description`）进行了拓展，通过其提供的键值对接口，用户可以方便地设计自己的列表环境。


## 键

### 标签和交叉引用格式

通过 `label = <text>` 设置标签格式，而且在 `enumerate` 环境中一般配合 `\arabic*`、`\roman*`、`\Roman*`、`\alph*` 和 `\Alph*`，例如：

```latex
\begin{enumerate}[label = (\arabic*)]
```

将使得标签格式为 (1), (2) 等。