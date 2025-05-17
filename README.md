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

프로젝트 실행에 필요한 노드 패키지들을 설치하였다면 프로젝트 구동에 필요한 DB 등 인프라 구축이 필요합니다.

먼저 개발환경에 docker desktop 설치를 합니다. 그리고 `docker-compose.yml`에 정의한 컨테이너 PORT가 이미 점유중인 것은 아닌지 확인합니다.

본 프로젝트에는 mongoDB v6을 기본 데이터베이스로 사용하며, 간단하게 mongoDB의 내용을 확인하기 위한 ui 툴인 mongo-express도 탑재하였습니다. 아래 명령어를 통해 프로젝트 바탕 인프라를 구축할 수 있습니다.

```bash
# 테스트 인프라 구축
$ pnpm run test_infra_setup
```

```bash
# 테스트 인프라 제거
$ pnpm run test_infra_down
```

## Running the app command

여러 microservice가 유기적으로 구동되는 monorepo를 구성하고 동시 빌드 및 실행을 돕고자 turborepo를 설치하였습니다. 아래 명령어를 통해 간단하게 빌드, 개발, 프로덕션 배포(실행)까지 할 수 있습니다.

```bash
# 개발서버 실행
$ pnpm run dev

# 전체 빌드
$ pnpm build # 또는 $ pnpm turbo build

# 빌드 이후 production mode 실행
$ pnpm run start:prod:<auth | gateway>
```

## 개발 편의 툴 제공

1. Swagger API 확인 및 테스트
개발모드로 실행한다면 http://localhost:3000/api-docs 를 통해 Swagger API 리스트를 확인하고 테스트 해볼 수 있습니다.
| 대체 툴: curl, Postman 등

2. MongoDB database, collection, document 확인
test_infra_setup 이후 브라우저에서 http://localhost:8081 로 이동하여 프로젝트 실행 중에 저장된 데이터를 간단하게 확인 할 수 있습니다.
| 대체 툴: MongoDB-Compass 또는 DataGrip 등 외부 IDE 연동


## format & lint

```bash
# 전체 파일 formatting
$ pnpm format
```

```bash
# 전체 파일 lint
$ pnpm lint # --fix 옵션 가능
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
