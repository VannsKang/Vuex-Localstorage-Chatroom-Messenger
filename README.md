<h3 align="center"> 
  Vuex Localstorage Chatroom Messenger
</h3>

<h4 align="center">
  <a href="https://vuex-localstorage-chatroom-messenger.vercel.app/">View Demo</a>
</h4>

<p align=center> 
<img src="https://user-images.githubusercontent.com/4216651/108622808-8e7a1980-747e-11eb-865c-70edfbf2db3c.gif" alt="demo-introduction" width="30%"/>
</p>

<img src="https://user-images.githubusercontent.com/4216651/108622806-8c17bf80-747e-11eb-9919-ea7839301e9c.png" alt="messenger-introduction" width="100%"/>

---

## About The Project

본 프로젝트는 소켓 등 백앤드 서버의 도움을 받지않고 프론트 서버만으로 메신저를 구현해보고자 시작했습니다.

1. 메세지 데이터 및 메세지 환경 구성을 위해 서버대신 `Vuex` 만을 이용해 요구 기능을 구현하였습니다.
2. `Vuex persist` 모듈을 이용해 채팅 데이터 및 로그인 데이터를 로컬스토리지에 저장하여 반영구적으로 이용할 수 있도록 구성했습니다.
3. `/` 페이지는 각각 사용자들을 위한 로그인 페이지입니다
4. `/list` 페이지는 각각 채팅방 리스트가 표시됩니다.
5. `/room/{id}` `id`는 숫자이며 각각 채팅방 안에 대화내용이 보입니다.
6. 테마를 토글할 수 있도록 구성했습니다.
7. 사용자 이미지는 `https://randomuser.me/`, 기타 업로드 이미지는 `https://picsum.photos/`의 `API`를 이용해 구현했습니다.

### Pages

#### `/`

- 우측 상단 팔레트 모양 아이콘을 누르면 테마가 토글이 됩니다.
- 원하는 대상으로 로그인 가능합니다.

#### `/list`

- 채팅 목록 아이템은 최근 메세지 순으로 정렬합니다.
- 각 채팅 목록 아이템은 최근 메세지와 읽지 않은 메세지 수, 전송시간을 출력합니다.
- 날짜가 달라지면 전송시간이 요일로 나타납니다.
- 메세지가 없는 채팅방은 가장 하단에 위치합니다.
- 햄버거 메뉴를 누르면 로그인 화면으로 다시 이동합니다.
- 로그인 사용자 본인의 채팅방에 들어가서 읽을 경우 안읽음 표시가 사라집니다.

#### `/room/{id}`

- 메세지 등록시간이 출력 됩니다. hh:mm
- 한 사람이 같은 시간에 채팅메세지를 연속해서 보낸다면 마지막 채팅메세지만 시간이 출력 됩니다.
- 날짜가 바뀌면 날짜 구분선이 삽입됩니다.
- 메세지 양과 상관없이 가장 최근 메세지 화면으로 최초화면이 표시됩니다.
- 사진 아이콘을 클릭하면 사진 메뉴가 표시되고 메세지에 전송 가능합니다.

### Future work plan

- 현재: 채팅방 기준 채팅형식으로 구현
- 향후: 메신저와 같이 유저기준 채팅 형식으로 재구성 예정

### Built With

- Vue

- TypeScript

- Vuex (Vuex-Persist)

- SCSS

## Getting Started

### Prerequisites

Before you start, install `Yarn` package to global.

```sh
npm install --global yarn
```

### Installation

1.  Clone the repo

    ```sh
    git clone https://github.com/VannsKang/Vuex-Localstorage-Chatroom-Messenger.git
    ```

2.  Install NPM packages

    ```sh
    yarn install
    ```

3.  Run the project

    ```sh
    yarn serve
    ```

4.  Lint the package

    ```sh
    yarn lint
    ```

5.  Build the package

    ```sh
    yarn build
    ```

## Project Tree

```js
.
├── public/
│   ├── database/
│   │   ├── photos.json
│   │   ├── rooms.json
│   │   └── users.json
│   └── font
├── src/
│   ├── api
│   ├── assets
│   ├── components/
│   │   ├── Appbar
│   │   ├── Chat
│   │   ├── LoginUser
│   │   ├── Notibar
│   │   ├── Rooms
│   │   ├── Upload
│   │   └── index.ts
│   ├── router
│   ├── store/
│   │   ├── reducers
│   │   └── index.ts
│   ├── styles/
│   │   ├── common.scss
│   │   ├── container.scss
│   │   └── mixin.scss
│   ├── views/
│   │   ├── Home/
│   │   │   ├── api
│   │   │   ├── reducer
│   │   │   ├── typings
│   │   │   └── Home.vue
│   │   ├── List/
│   │   │   ├── api
│   │   │   ├── reducer
│   │   │   ├── typings
│   │   │   └── List.vue
│   │   └── Room/
│   │       ├── api
│   │       ├── reducer
│   │       ├── typings
│   │       └── Room.vue
│   ├── App.vue
│   ├── main.ts
│   ├── shimes-svg.d.ts
│   ├── shimes-tsx.d.ts
│   └── shimes-vue.d.ts
├── vue.config.js
└── ...
```

1. `public/database/` 에 mockdata 가 있고 `API` 로 요청하는데 사용하였습니다.
2. `src/api` 에는 `ajax` request, response 의 공통 로직(`interceptor`)가 위치해 ㅣㅇㅆ습니다.
3. `public/font/` 와 `src/assets/`에 폰트와 이미지, 아이콘 파일이 위치해있습니다.
4. `src/components/` 에는 `src/views/` 와 관련된 컴포넌트 모듈들이 위치해있습니다.
5. `src/router/` 에 라우터가 위치해 있습니다.
6. `src/store/` 에는 각각 채팅, 리스트, 로그인 관련 `reducer`를 모아주는 `Root Reducer`가 위치해있습니다.
7. `src/styles/` 에는 공통 styles 파일이 위치해 있습니다.
8. `src/views` 는 메인 뷰와 관련된 파일이 위치해있습니다. 각 뷰마다 사용하는 `ajax` 요청, `type`, `global state` 를 각 뷰별 `/api`, `/typings`, `/reducer` 에서 관리합니다. (`Global State`에 대한 `slice` 개념 적용)

## NPM Packages

#### package.json

```json
"dependencies": {
  "axios": "^0.21.0",
  "core-js": "^3.6.5",
  "date-fns": "^2.23.0",
  "lodash": "^4.17.21",
  "vue": "^2.6.11",
  "vue-router": "^3.2.0",
  "vuex": "^3.4.0",
  "vuex-persist": "^2.3.0"
},
"devDependencies": {
  "@fortawesome/fontawesome-svg-core": "^1.2.34",
  "@fortawesome/free-brands-svg-icons": "^5.15.2",
  "@fortawesome/free-solid-svg-icons": "^5.15.2",
  "@fortawesome/vue-fontawesome": "^2.0.2",
  "@types/lodash": "^4.14.172",
  "@typescript-eslint/eslint-plugin": "^4.18.0",
  "@typescript-eslint/parser": "^4.18.0",
  "@vue/cli-plugin-babel": "~4.5.0",
  "@vue/cli-plugin-eslint": "~4.5.0",
  "@vue/cli-plugin-router": "~4.5.0",
  "@vue/cli-plugin-typescript": "~4.5.0",
  "@vue/cli-plugin-vuex": "~4.5.0",
  "@vue/cli-service": "~4.5.0",
  "@vue/eslint-config-typescript": "^7.0.0",
  "eslint": "^6.7.2",
  "eslint-plugin-vue": "^6.2.2",
  "node-sass": "^4.12.0",
  "reset-css": "^5.0.1",
  "sass-loader": "^8.0.2",
  "typescript": "~4.1.5",
  "vue-svg-loader": "^0.16.0",
  "vue-template-compiler": "^2.6.14"
}
```

## ETC

- 로컬스토리지를 이용하기 때문에 동시에 브라우저를 띄어 다른 사용자로 로그인하는 것이 불가능합니다.
- 마찬가지로 다른 도메인에서는 채팅데이터가 공유되지 않습니다.

This project is obtimized & tested in `Chrome`.

---

<h3 align="center">
Developed by SOOM
</h3>

<h4 align="center">
<a href="https://soomlog.vercel.app/">Soomlog.vercel.app</a>
</h4>
