<h3 align="center"> 
  Vuex Localstorage Chatroom Messenger
</h3>

<h4 align="center">
  <a href="https://vuex-localstorage-chatroom-messenger.vercel.app/">View Demo</a>
</h4>

<img src="https://user-images.githubusercontent.com/4216651/108622806-8c17bf80-747e-11eb-9919-ea7839301e9c.png" alt="messenger-introduction" width="100%"/>

|                                                                         Web                                                                         |                                                                        Mobile                                                                        |
| :-------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/4216651/129524001-7d3a20e6-1cf0-4d24-94a5-779debd80f6b.gif" alt="messenger-web" width="1050" /> | <img src="https://user-images.githubusercontent.com/4216651/108622808-8e7a1980-747e-11eb-865c-70edfbf2db3c.gif" alt="messenger-mobile" width="300"/> |

---

## About The Project

본 프로젝트는 소켓 등 백앤드 서버의 도움을 받지않고 프론트 서버만으로 메신저를 구현해보고자 시작했습니다.<br/>
This project is documentation of the study to develop the messenger service without a server.

<p>
    <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=Vue%2Ejs&logoColor=white"/>
    <img src="https://img.shields.io/badge/Vuex-4FC08D?style=flat-square&logo=Vultr&logoColor=white"/>
    <img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/>
    <img src="https://img.shields.io/badge/Font%20Awesome-528DD7?style=flat-square&logo=Font%20Awesome&logoColor=white"/>
    <img src="https://img.shields.io/badge/Lodash-3492FF?style=flat-square&logo=Lodash&logoColor=white"/>
    <img src="https://img.shields.io/badge/TypeScript-3178c6?style=flat-square&logo=TypeScript&logoColor=white"/>
    <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/>
    <img src="https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white"/>
</p>

### Built With

- Vue
- Vuex
- Vuex Persist
- axios
- lodash
- vue-router
- date-fns
- core-js
- SCSS
- TypeScript
- fontawesome
- pnpm
- Docker

## Getting Started

### Prerequisites

- Before you start, install `pnpm` package to global

  ```sh
  npm install --global pnpm
  ```

- Docker install required

  https://www.docker.com/get-started

### Installation

#### Local

1.  Clone the repo

    ```sh
    git clone https://github.com/VannsKang/Vuex-Localstorage-Chatroom-Messenger.git
    ```

2.  Install NPM packages

    ```sh
    pnpm install
    ```

3.  Run the project

    ```sh
    pnpm serve
    ```

4.  Lint the package

    ```sh
    pnpm lint
    ```

5.  Build the package

    ```sh
    pnpm build
    ```

#### Docker

1.  Run the Docker inside `./docker` folder

    ```sh
    docker-compose up
    ```

## Introduction

1. For message data and message environment configuration, the request function is implemented using only `Vuex` instead of the backend server
2. Using the `Vuex persist` module, chat data and login data are stored in local storage so that they can be used semi-permanently
3. The `/` page is the login page for each user
4. Each `/list` page displays a list of chat rooms
5. `/room/{id}` `id` is a number and you can see the conversation in each chat room.
6. Configured it to be able to toggle the color theme.
7. User images are implemented using `https://randomuser.me/`, and other uploaded images are implemented using `API` of `https://picsum.photos/`.

### Pages

#### `/`

- Click the palette icon in the upper right corner to toggle the theme
- You can log in as any user you want

#### `/list`

- Chat list items are sorted by most recent messages
- Each chat list item displays the most recent messages, the number of unread messages, and the transmission time
- If the date is different, the transmission time is displayed as the day of the week
- Chat rooms without messages are located at the bottom
- Tapping the hamburger menu takes you back to the login screen
- If you log in to your own chat room and read it, the unread mark disappears

#### `/room/{id}`

- The message registration timestamp is displayed (`hh:mm`)
- If one person sends chat messages consecutively at the same time, only the last chat message is displayed with the time stamp
- When the date changes, a date separator is inserted
- Regardless of the number of messages, the first list item is displayed with the most recent message
- Click the photo icon to display the photos and send them with a message

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
│   ├── plugins
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

1. Mock data is in `public/database/` and used to make requests with `API`
2. In `src/api`, the common logic (`interceptor`) of `ajax` request and response is located
3. Font, image, and icon files are located in `public/font/` and `src/assets/`
4. `src/components/` contains component modules related to `src/views/`
5. The router is located in `src/router/`
6. In `src/store/` there is a `Root Reducer` that collects `reducers` related to chat, list, and login respectively
7. Common styles files are located in `src/styles/`
8. `src/views` is where the main view and related files are located. The `ajax` request, `type`, and `global state` used for each view are managed in `/api`, `/typings`, and `/reducer` for each view (Applying `slice` concept to `Global State`)

## NPM Packages

#### packages

```
dependencies:
axios 0.26.1
core-js 3.21.1
date-fns 2.28.0
lodash 4.17.21
vue 2.6.14
vue-router 3.5.3
vue-toastification 1.7.14
vuex 3.6.2
vuex-persist 3.1.3

devDependencies:
@fortawesome/fontawesome-svg-core 1.3.0   @vue/cli-plugin-vuex 5.0.1
@fortawesome/free-brands-svg-icons 6.0.0  @vue/cli-service 5.0.1
@fortawesome/free-solid-svg-icons 6.0.0   @vue/eslint-config-typescript 9.1.0
@fortawesome/vue-fontawesome 2.0.6        eslint 7.32.0
@types/lodash 4.14.179                    eslint-plugin-vue 8.5.0
@typescript-eslint/eslint-plugin 5.14.0   reset-css 5.0.1
@typescript-eslint/parser 5.14.0          sass 1.49.9
@vue/cli-plugin-babel 5.0.1               sass-loader 12.6.0
@vue/cli-plugin-eslint 5.0.1              typescript 4.5.5
@vue/cli-plugin-router 5.0.1              vue-svg-loader 0.17.0-beta.2
@vue/cli-plugin-typescript 5.0.1          vue-template-compiler 2.6.14
```

## ETC

- Because local storage using, it is impossible to open a browser and log in as a different user at the same time
- Likewise, chat data is not shared with other domains

This project is optimized & tested in `Chrome`.

---

<h3 align="center">
Developed by SOOM
</h3>

<h4 align="center">
<a href="https://www.soomlog.tech/">Soomlog.tech</a>
</h4>
