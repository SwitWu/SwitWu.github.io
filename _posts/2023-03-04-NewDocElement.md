---
layout: post
title: doc 宏包
category: LaTeX
---

## 介绍

`\NewDocElement` 是版本 3 中提供的新功能，用于创建新的 doc 元素，在这之前 doc 元素有两对，分别是：

+ `Macro` 和 `macro`
+ `Env` 和 `environment`

`\RenewDocElement` 类似，只是用于重定义 doc 元素，语法与 `\NewDocElement` 相同。 

## 语法

```latex
\NewDocElement[<options>]{<element-name>}{<env-name>}
```

其中，`<element-name>` 一般首字母大写。此声明会为我们定义：

+ 命令 `\Describe<element-name>`，使用语法为
  ```latex
  \Describe<element-name>[<options>]{<element>}
  ```
+ 环境 `<env-name>`，使用语法为
  ```latex
  \begin{<env-name>}[<options>]{<element>}
  ```

## 选项

注意：在下面的布尔选项中，若只给定键而缺省值，则默认值为 `true`

+ `macrolike`: 布尔值（默认为 `false`），若元素以反斜杠开头则需要设置为 `true`
+ `envlike`: 布尔值，和 `macrolike` 相反
+ `toplevel`: 布尔值（默认为 `true`），当设置为 `true` 时，会创建 toplevel 索引条目；当设置为 `false` 时，则不会创建 toplevel 索引条目
+ `notoplevel`: 布尔值，和 `toplevel` 相反
+ `idxtype`: 字符串（默认为 `<env-name>`），若此字符串非空，则会由圆括号包裹后置于 toplevel 索引条目后
+ `printtype`: 字符串（默认为 `<env-name>`），若此字符串非空，则会由圆括号包裹后置于边注元素后
+ `idxgroup`: 字符串（默认为 `<env-name>s`），若此字符串非空，则会编组同类型的索引条目；若为空，则不会编组

注意：

1. 若同时设置 `toplevel` 为 `true` 且 `idxgroup` 非空，则同一个索引条目会出现两次，一次作为 toplevel 的索引条目，一次在编组下面作为二级索引条目。
2. `idxtype` 和 `printtype` 都有默认值，一般情况下不需要额外设置。
3. 若设置 `toplevel = false`，则 `idxtype` 作废。


## 举例

### 创建新的 doc 元素用于选项（option）


#### 情形一：需要编组

```latex
\NewDocElement[
  envlike = true,
  toplevel = false,
  idxgroup = Options
]{Option}{option}
```

#### 情形二：不需要编组

```latex
\NewDocElement[
  envlike = true,
  toplevel = true,
  idxtype = 
]
```

### 重定义 `macro` 元素

本例摘自 doc 手册，代码如下：

```latex
\RenewDocElement[macrolike = true ,
                 toplevel  = false,
                 idxgroup  = LaTeX comands\actualchar\LaTeX{} commands ,
                 idxtype   = ,
                 printtype =
                ]{Macro}{macro}
```

可以看到，重定义之后，不会创建 toplevel 索引条目，但是会创建编组索引条目，`idxtype` 和 `printtype` 设置为空。