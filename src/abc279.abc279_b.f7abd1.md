---
title: "ABC279B"
tags: []
author: "reechee"
created: "2022-12-06 14:38:58"
---

## 题意

给出两个仅含小写英文字母的字符串 $S,T$，判断 $T$ 是否为 $S$ 的子串。

## 数据范围

- $S,T$ 仅含小写英文字母。

- $1 \leq |S|,|T| \leq 100$

## 输入格式

第一行输入一个字符串 $S$。

第二行输入一个字符串 $T$。

## 输出格式

若 $T$ 为 $S$ 的子串的输出 `Yes`，反之则输出 `No`。

## 样例

### 输入样例 #1

```
voltage
tag
```

### 输出样例 #1

```
Yes
```

### 输入样例 #2

```
atcoder
ace
```

### 输出样例 #2

```
No
```

### 输入样例 #3

```
gorilla
gorillagorillagorilla
```

### 输出样例 #3

```
No
```

### 输入样例 #4

```
toyotasystems
toyotasystems
```

### 输出样例 #4

```
Yes
```