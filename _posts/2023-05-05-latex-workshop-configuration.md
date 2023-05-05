---
layout: post
title: 在 VS Code 中配置 LaTeX Workshop
category: LaTeX
description: 
---

## 通用配置

```json-doc
// 编译工具
{
  "latex-workshop.latex.tools": [
      {
        "name": "latexmk",
        "command": "latexmk",
        "args": [
          "-pvc-",
          "%DOCFILE%"
        ]
      },
      {
        "name": "latexmk-xelatex",
        "command": "latexmk",
        "args": [
          "-xelatex",
          "-synctex=1",
          "-interaction=nonstopmode",
          "-halt-on-error",
          "-file-line-error",
          "-pv",
          "%DOCFILE%"
        ]
      },
      {
        "name": "xelatex",
        "command": "xelatex",
        "args": [
          "-synctex=1",
          "-interaction=nonstopmode",
          "-file-line-error",
          "%DOC%"
        ]
      },   
      {
        "name": "pdflatex",
        "command": "pdflatex",
        "args": [
          "-synctex=1",
          "-interaction=nonstopmode",
          "-file-line-error",
          "%DOC%"
        ]
      },
      {
        "name": "bibtex",
        "command": "bibtex",
        "args": [
          "%DOCFILE%"
        ]
      },
      {
        "name": "biber",
        "command": "biber",
        "args": [
          "%DOCFILE%"
        ]
      }
    ],
  // 编译处方
  "latex-workshop.latex.recipes": [
    {
      "name": "pdflatex",
      "tools": ["pdflatex"]
    },
    {
      "name": "xelatex",
      "tools": ["xelatex"]
    },
    {
      "name": "latexmk",
      "tools": ["latexmk"]
    },
    {
      "name": "xelatex*2",
      "tools": [
        "xelatex",
        "xelatex"
      ]
    },
    {
      "name": "xelatex -> bibtex -> xelatex*2",
      "tools": [
        "xelatex",
        "bibtex",
        "xelatex",
        "xelatex"
      ]
    },
    {
      "name": "xelatex -> biber -> xelatex*2",
      "tools": [
        "xelatex",
        "biber",
        "xelatex",
        "xelatex"
      ]
    },
  ],
  // 清理中间辅助文件
  "latex-workshop.latex.clean.fileTypes": [
    "*.aux",
    "*.bbl",
    "*.blg",
    "*.idx",
    "*.ind",
    "*.lof",
    "*.lot",
    "*.out",
    "*.toc",
    "*.acn",
    "*.acr",
    "*.alg",
    "*.glg",
    "*.glo",
    "*.gls",
    "*.ist",
    "*.fls",
    "*.log",
    "*.fdb_latexmk"
  ],
  // 编译出错时是否通过弹窗显示
  "latex-workshop.message.error.show": false,
  "latex-workshop.message.warning.show": false,
  "latex-workshop.synctex.afterBuild.enabled": true,
  // 保存时就启动 Build 编译，Build 默认调用 recipe 中的第一条命令，
  // 这里默认注释掉，如果需要可以取消注释
  "latex-workshop.latex.autoBuild.run": "never",
  "editor.tabSize": 2,
  "editor.wordWrap": "bounded",
  // 取当前窗口大小和 wordWrapColumn 的最小值来决定 VS Code 中一行的换行位置
  "editor.wordWrapColumn": 120,
  // 对不同后缀的文件进行格式关联
  "files.associations": {
    "*.sty": "latex-expl3",
    "*.def": "latex-expl3",
    "*.tex": "latex",
    "*.cls": "latex-expl3"
  },
  // 更加醒目的括号配对
  "editor.guides.bracketPairs": "active",
  // 如何选择自动补全
  "editor.suggestSelection": "first",

  "files.autoSave": "afterDelay",
  "security.workspace.trust.untrustedFiles": "open",
  "explorer.confirmDelete": false,
  "editor.detectIndentation": false,
  "workbench.editorAssociations": {
    "*.xlsx": "default",
    "*.jpg": "default"
  },
  "editor.fontLigatures": false,
  // highlight duplicated labels
  "latex-workshop.check.duplicatedLabels.enabled": true,
  // disable chktex linting
  "latex-workshop.linting.chktex.enabled": false
}
```

## PDF 阅读器配置

### macOS

```json-doc
{
  "latex-workshop.view.pdf.viewer": "external",
  "latex-workshop.view.pdf.external.viewer.command": "/Applications/Skim.app/Contents/SharedSupport/displayline",
  "latex-workshop.view.pdf.external.viewer.args": [
    "0",
    "%PDF%"
  ],
  "latex-workshop.view.pdf.external.synctex.command": "/Applications/Skim.app/Contents/SharedSupport/displayline",
  "latex-workshop.view.pdf.external.synctex.args": [
    "-r",
    "%LINE%",
    "%PDF%",
    "%TEX%"
  ]
}
```

### Windows

```json-doc
{
  "latex-workshop.view.pdf.viewer": "external",
  "latex-workshop.view.pdf.ref.viewer": "external",
  "latex-workshop.view.pdf.external.viewer.command": "<SumatraPDFROOT>/SumatraPDF.exe",
  "latex-workshop.view.pdf.external.viewer.args": [
    "-inverse-search",
    "\"<VSCodeROOT>/bin/code.cmd\" -r -g \"%f:%l\"",
    "%PDF%"
  ],
  "latex-workshop.view.pdf.external.synctex.command":"<SumatraPDFROOT>/SumatraPDF.exe",
  "latex-workshop.view.pdf.external.synctex.args": [
    "-forward-search",
    "%TEX%",
    "%LINE%",
    "%PDF%",
  ],
}
```

## 参考

+ [LaTeX Workshop Wiki](https://github.com/James-Yu/LaTeX-Workshop/wiki)
+ [install-latex-guide-zh-cn](https://github.com/OsbertWang/install-latex-guide-zh-cn)