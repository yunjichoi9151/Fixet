# 🧩 Fixet — 백준(BOJ) · SWEA 코드 자동 수정기

![Chrome Extension](https://img.shields.io/badge/Chrome%20Extension-Fixet-4285F4?logo=googlechrome&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

> **Fixet**은 백준(BOJ)과 SWEA에서 코드를 붙여넣을 때  
> 자동으로 제출 형식에 맞게 변환해주는 **크롬 확장 프로그램**입니다.
>
> 매번 `public class Main`이나 `readFileSync('/dev/stdin')`으로 수정하던 반복 작업을 **Fixet**이 자동으로 처리해줍니다 🚀

---

## 💻 적용 예시

### 🥇 BOJ — Java

**적용 전**

```java
package boj;

public class Solution_2557 {
    public static void main(String[] args) throws Exception {
        System.out.println("Hello World!");
    }
}
```

**적용 후**

```java
public class Main {
    public static void main(String[] args) throws Exception {
        System.out.println("Hello World!");
    }
}
```

### ⚡ BOJ — Node.js(JavaScript) / TypeScript

**적용 전**

```javascript
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
console.log(input);
```

**적용 후**

```javascript
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
console.log(input);
```

### 🧠 SWEA — Java

**적용 전**

```java
package swea1234;

public class TestCase {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

**적용 후**

```java
public class Solution {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

## ✨ 특징

- 사이트 자동 인식 — 백준(acmicpc.net), SWEA(swexpertacademy.com)

- 언어별 코드 규칙 자동 변환

- 불필요한 package 선언 제거

- 붙여넣기 시 자동 적용

## 🔒 개인정보처리방침

Fixet은 사용자 데이터를 수집하거나 외부로 전송하지 않습니다.  
이 확장 프로그램은 브라우저 내 코드 편집기(CodeMirror) 영역에서만 작동하며,  
모든 동작은 사용자의 로컬 환경에서만 이루어집니다.

- 개인 정보(이름, 이메일 등)를 수집하지 않습니다.
- 인증, 결제, 위치, 웹 기록 등의 정보를 저장하거나 전송하지 않습니다.
- 확장 설정(ON/OFF 등)은 브라우저 저장소에만 저장됩니다.

📧 문의: **cyjcode99@gmail.com**

## 🏷️ License

Copyright © 2025 **choiyunji**.  
All rights reserved.
