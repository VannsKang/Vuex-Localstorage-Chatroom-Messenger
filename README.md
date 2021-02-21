# Vuex Only Messenger

> 본 프로젝트는 백앤드 서버의 도움을 받지않고 프론트 서버만으로 메신저를 구현해보고자 시작했습니다.

---

## 프로젝트 소개

1. 본 프로젝트는 `Vue.js`, `Vuex`, `TypeScript`, `Sass` 를 통해 구성했습니다.
2. 메세지 데이터 및 메세지 환경 구성을 위해 서버대신 `Vuex` 만을 이용해 요구 기능을 구현하였습니다.
3. `Vuex persist` 모듈을 이용해 채팅 데이터 및 로그인 데이터를 로컬스토리지에 저장하여 반영구적으로 이용할 수 있도록 구성했습니다.
4. `/` 페이지는 각각 사용자들을 위한 로그인 페이지입니다
5. `/list` 페이지는 각각 채팅방 리스트가 표시됩니다.
6. `/room/{id}` `id`는 숫자이며 각각 채팅방 안에 대화내용이 보입니다.
7. 테마를 토글할 수 있도록 구성했습니다.
8. 사용자 이미지는 `https://randomuser.me/`, 기타 업로드 이미지는 `https://picsum.photos/`의 `API`를 이용해 구현했습니다.

#### 화면 예시

![preview](https://user-images.githubusercontent.com/4216651/108622806-8c17bf80-747e-11eb-9919-ea7839301e9c.png)

### 페이지별 소개

### `/`

- 우측 상단 팔레트 모양 아이콘을 누르면 테마가 토글이 됩니다.
- 원하는 대상으로 로그인 가능합니다.

### `/list`

- 채팅 목록 아이템은 최근 메세지 순으로 정렬합니다.
- 각 채팅 목록 아이템은 최근 메세지와 읽지 않은 메세지 수, 전송시간을 출력합니다.
- 날짜가 달라지면 전송시간이 요일로 나타납니다.
- 메세지가 없는 채팅방은 가장 하단에 위치합니다.
- 햄버거 메뉴를 누르면 로그인 화면으로 다시 이동합니다.
- 로그인 사용자 본인의 채팅방에 들어가서 읽을 경우 안읽음 표시가 사라집니다.

### `/room/{id}`

- 메세지 등록시간이 출력 됩니다. hh:mm
- 한 사람이 같은 시간에 채팅메세지를 연속해서 보낸다면 마지막 채팅메세지만 시간이 출력 됩니다.
- 날짜가 바뀌면 날짜 구분선이 삽입됩니다.
- 메세지 양과 상관없이 가장 최근 메세지 화면으로 최초화면이 표시됩니다.
- 사진 아이콘을 클릭하면 사진 메뉴가 표시되고 메세지에 전송 가능합니다.

#### 화면 예시

![preview for chat](https://user-images.githubusercontent.com/4216651/108622808-8e7a1980-747e-11eb-865c-70edfbf2db3c.gif)

## 프로젝트 실행

### 설치

1. 폴더 안에서 `npm install` 로 설치합니다.

```console
$ npm install
```

### 실행 (로컬)

1. 폴더 안에서 `npm run serve` 로 실행합니다.

```console
$ npm run dev
```

## 프로젝트 모듈 구조

```
    ├─ public/
    │  ├─ data/
    │  │  ├─files.json
    │  │  ├─loginList.json
    │  │  └─rooms.json
    │  ├─ font/
    │  │  ├─AppleSDGothicNeo-SemiBold.ttf
    │  │  ├─AppleSDGothicNeo-SemiBold.woff
    │  │  └─AppleSDGothicNeo-SemiBold.woff2
    │  └─ images/
    │     ├─photos/
    │      ...
    │     └─users/
    ├─ src/
    │  ├─ assets/
    │   ...
    │  ├─ components/
    │  │  ├─ Home/
    │  │  │  └─ LoginList.vue
    │  │  ├─ List/
    │  │  │  └─ Rooms.vue
    │  │  ├─ Room/
    │  │  │  ├─ Chat.vue
    │  │  │  └─ Upload.vue
    │  │  ├─ Nav.vue
    │  │  └─ Notibar.vue
    │  ├─ router/
    │  │  └─ index.ts
    │  ├─ store/
    │  │  ├─ chatReducer/
    │  │  │  └─ index.ts
    │  │  ├─ roomReducer/
    │  │  │  └─ index.ts
    │  │  ├─ uploadReducer/
    │  │  │  └─ index.ts
    │  │  ├─ userReducer/
    │  │  │  └─ index.ts
    │  │  └─ index.ts
    │  ├─ styles/
    │  │  ├─ Home/
    │  │  │  └─ LoginList.scss
    │  │  ├─ List/
    │  │  │  └─ Rooms.scss
    │  │  ├─ Room/
    │  │  │  ├─ Chat.scss
    │  │  │  └─ Upload.scss
    │  │  ├─ common.scss
    │  │  ├─ container.scss
    │  │  ├─ mixin.scss
    │  │  ├─ Nav.scss
    │  │  └─ Notibar.scss
    │  ├─ views/
    │  │  ├─ Home.vue
    │  │  ├─ List.vue
    │  │  └─ Room.vue
    │   ...
    │  ├─ App.vue
    │  ├─ config.ts
    │  └─ main.ts
     ...
    ├─ babel.config.js
    ├─ package.json
    └─ tsconfig.json
```

1. `public/data/` 에 mockdata 가 있고 `API` 로 요청하는데 사용하였습니다.
2. `public/font/` 와 `public/images/` , `src/assets/`에 폰트와 이미지, 아이콘 파일이 위치해있습니다.
3. `src/components/` 에는 `src/views/` 와 관련된 컴포넌트 모듈들이 위치해있습니다.
4. `src/router/index.ts` 에 라우터가 위치해 있습니다.
5. `src/store/` 에는 각각 채팅, 리스트, 로그인 관련 리듀서가 위치해있습니다.
6. `src/styles/` 에는 각 뷰 및 컴포넌트에 해당하는 styles 파일이 위치해 있습니다.
7. `src/views` 는 메인 뷰와 관련된 파일이 위치해있습니다.
8. `config.ts` 에는 자주 사용되는 공통함수들이 위치해있습니다.

## 설치 패키지

#### package.json

```json
"dependencies": {
  "axios": "^0.21.0",
  "core-js": "^3.6.5",
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
  "@typescript-eslint/eslint-plugin": "^2.33.0",
  "@typescript-eslint/parser": "^2.33.0",
  "@vue/cli-plugin-babel": "~4.5.0",
  "@vue/cli-plugin-eslint": "~4.5.0",
  "@vue/cli-plugin-router": "~4.5.0",
  "@vue/cli-plugin-typescript": "~4.5.0",
  "@vue/cli-plugin-vuex": "~4.5.0",
  "@vue/cli-service": "~4.5.0",
  "@vue/eslint-config-typescript": "^5.0.2",
  "eslint": "^6.7.2",
  "eslint-plugin-vue": "^6.2.2",
  "node-sass": "^4.12.0",
  "reset-css": "^5.0.1",
  "sass-loader": "^8.0.2",
  "typescript": "~3.9.3",
  "vue-template-compiler": "^2.6.11"
}
```

1. `vue cli` 를 통해 프로젝트 세팅을 하였습니다.
2. `vuex` 및 `vuex-persist` 를 통해 로컬 스토리지로 데이터를 관리하였습니다.
3. `fontawesome`을 통해 필요한 아이콘을 표현했습니다.

## 기타 참고 사항

> - 로컬스토리지를 이용하기 때문에 동시에 브라우저를 띄어 다른 사용자로 로그인하는 것이 불가능합니다.
> - 마찬가지로 다른 도메인에서는 채팅데이터가 공유되지 않습니다.
> - 본 프로젝트는 크롬에서 테스트를 거쳤습니다.
