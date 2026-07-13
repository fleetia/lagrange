# Security Policy

## Supported versions

Lagrange는 현재 <code>1.0.0</code> 이전 단계이며 최신 published release만 security fix를 받습니다.

| Version | Supported |
| --- | --- |
| Latest published release | Yes |
| Older releases | No |

security fix가 release되면 가능한 한 빨리 최신 version으로 갱신하세요.

## Vulnerability reporting

security vulnerability는 public issue나 discussion에 작성하지 마세요. 다음 private vulnerability report로 제보합니다.

https://github.com/fleetia/lagrange/security/advisories/new

report에는 가능한 범위에서 다음 내용을 포함합니다.

- 영향을 받는 version과 component
- 재현 조건과 최소 reproduction
- 예상 영향과 공격 시나리오
- 이미 시도한 mitigation
- 관련 log나 screenshot에서 credential과 개인 정보를 제거한 자료

maintainer는 3 business days 안에 접수를 확인하고, 7 business days 안에 초기 triage 결과를 공유하는 것을 목표로 합니다. 조사와 release 일정은 영향도와 수정 난이도에 따라 달라질 수 있습니다.

## Credentials and package access

- GitHub Packages token을 source, project <code>.npmrc</code>, <code>.env</code>, screenshot, test fixture에 저장하지 않습니다.
- project <code>.npmrc</code>에는 registry mapping만 두고, credential은 user-level configuration 또는 CI secret으로 주입합니다.
- install token은 최소 <code>read:packages</code>만 사용합니다.
- publish는 GitHub Actions의 repository-scoped <code>GITHUB_TOKEN</code>과 <code>packages: write</code> 권한으로만 수행합니다.
- token이 노출되면 commit 삭제만으로 해결된 것으로 간주하지 않습니다. 즉시 revoke하고 교체한 뒤 repository history와 workflow log를 점검합니다.

## Consumer security boundary

Lagrange는 UI component library이며 HTML sanitizer, authorization layer, sandbox를 제공하지 않습니다. consumer는 다음 책임을 가집니다.

- untrusted HTML을 rendering 전에 sanitize
- link, file path, command input 검증
- server-side authorization 유지
- dependency와 package source 검증
- security update가 포함된 최신 Lagrange release 적용

Lagrange component가 입력값을 표시한다고 해서 해당 값이 신뢰 가능한 것으로 바뀌지는 않습니다.
