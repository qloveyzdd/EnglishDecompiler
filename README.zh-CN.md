# English Decompiler

Canonical public README: ./README.md

[Read the canonical README](./README.md)

English Decompiler 是一个面向英文技术文档的白盒解析器。
它不是通用翻译器，也不是英语学习工具。

这个项目想做的不是直接给你一个“翻译答案”，而是把技术英文拆成开发者可以检查的结构，比如 action、object、condition、sequence 和 purpose。

核心一句话：

> Translation gives you an answer. Parsing gives you control.

示例句子：

```text
Initialize the model before training.
```

解析结构：

```yaml
action: initialize
object: model
relation:
  type: sequence
  value: before
next_action: train
```

IR 视图：

```python
initialize(model)
before:
    train()
```

说明：

- 对外公开入口以英文 README 为准
- 这个中文文件主要作为阅读辅助，不单独定义项目范围
- 如果你要看项目定位、路线和贡献方式，请优先看 [README.md](./README.md)
