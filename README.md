# Game User Event Reward Management
본 README는 프로젝트를 진행하면서 계속 변경될 예정입니다.

## Description

# About Project Running

## Running Environment

이 프로젝트는 node v18.x에서 구동되는 NestJS 기반 애플리케이션입니다. 따라서 node 버전이 높거나 낮으면 구동이 원활하게 되지 않을 수 있어 버전을 맞춰서 진행해야 합니다. 

``` bash
$ node -v
```

node version이 다르다면 [nvm](https://github.com/nvm-sh/nvm) 을 사용해서 v18.x를 install 해서 사용할 수 있습니다.
``` bash
$ nvm install 18.20.2 && nvm use 18.20.2
```

## Installation

노드 버전을 맞춰주었다면 이 프로젝트에 필요한 필수 라이브러리들을 설치합니다.

```bash
$ pnpm install
```

## Running the app command

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
