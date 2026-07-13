# Contributing to Lagrange

Lagrange에 기여해 주셔서 감사합니다. 모든 contribution은 repository의 [AGPL-3.0-only](./LICENSE) 조건으로 제공됩니다.

## 시작하기

필수 환경:

- Node.js 22.14 이상
- pnpm 11.9.0
- Chromium 기반 visual test를 실행할 수 있는 환경

~~~bash
corepack enable
corepack install --global pnpm@11.9.0
pnpm install
pnpm dev
~~~

## 변경 원칙

- 하나의 pull request에는 하나의 명확한 문제만 다룹니다.
- 공개 API 변경은 backward compatibility와 migration 비용을 설명합니다.
- 새로운 alias, class 기반 abstraction, <code>any</code>를 추가하지 않습니다.
- component logic은 functional하고 declarative하게 유지합니다.
- 기존 token과 primitive로 표현할 수 있는 visual 값을 component에 직접 넣지 않습니다.
- component의 geometry는 focus, hover, error 상태 사이에서 바뀌지 않아야 합니다.
- rule은 <code>weak</code>, <code>boundary</code>, <code>structural</code> semantic을 사용합니다. double rule을 단일 thick border로 대체하지 않습니다.

## Component checklist

component를 추가하거나 public behavior를 바꿀 때 다음 항목을 포함합니다.

- 명확한 TypeScript props와 public export
- 실제 사용 흐름을 다루는 Vitest test
- default, interaction, disabled, error 상태를 보여주는 Storybook story
- keyboard interaction과 focus visibility 검증
- layout 또는 visual contract가 바뀌는 경우 Playwright screenshot
- publishable change를 설명하는 Changeset

새 abstraction은 실제로 반복되는 pattern이 확인된 뒤 추가합니다. 한 화면만을 위한 composition은 먼저 application layer에 둡니다.

## 검증

pull request를 열기 전에 다음 command를 실행합니다.

~~~bash
pnpm check
pnpm exec playwright install chromium
pnpm test:visual
~~~

CI에서는 다음 순서로 검증합니다.

1. ESLint
2. TypeScript
3. Vitest
4. package build
5. packed package의 React 18.2 type compatibility
6. React 19 external consumer build
7. Storybook build
8. Playwright interaction, accessibility, visual checks

visual snapshot을 갱신할 때는 의도한 변경만 포함되었는지 직접 비교하고, pull request에 변경 이유를 적습니다.

## Changesets

consumer에게 영향을 주는 변경에는 Changeset이 필요합니다.

~~~bash
pnpm changeset
~~~

version 기준:

- <code>patch</code>: compatible bug fix, visual correction, internal improvement
- <code>minor</code>: compatible component, token, public API addition
- <code>major</code>: breaking API, token contract, behavior change

문서, CI, test-only 변경처럼 published package 결과가 바뀌지 않는 작업에는 Changeset을 추가하지 않습니다.

version과 changelog는 release PR에서 자동으로 갱신됩니다. <code>package.json</code>의 version을 직접 수정하지 마세요.

## Pull request

pull request 본문에 다음을 기록합니다.

- 해결하는 문제와 선택한 접근
- public API 또는 visual contract 변화
- 확인한 keyboard, accessibility, responsive behavior
- 실행한 test
- screenshot이나 Storybook link
- migration이 필요한 경우 구체적인 이전 방법

maintainer review와 required CI가 완료되기 전에는 merge하지 않습니다.

## Release

<code>main</code>의 Changesets workflow가 release PR과 GitHub Packages publish를 관리합니다. release workflow는 repository의 <code>GITHUB_TOKEN</code>을 사용하므로 contributor가 publish token을 준비하거나 공유할 필요가 없습니다.

credential이나 token이 log 또는 commit에 포함되었다면 즉시 작업을 중단하고 [SECURITY.md](./SECURITY.md)의 절차를 따르세요.
