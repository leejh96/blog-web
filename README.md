# 나만의 블로그 만들기 프로젝트
### Node.js(Express), React

## 개발일지
**`1일차 : require(...) is not a function 는 js파일을 만들고 아무것도 입력안해서 나왔던 에러였다`**

**`2일차 : material UI를 사용해 navbar drawer(sidebar) login signup 페이지를 구성하였다.`**

**`3일차 : [HPM] Error occurred while trying to proxy request /api/signup from localhost:3000 to http://localhost:5000 에러가 떴고 http-proxy-middleware 모듈의 버전 문제였다. 로그인 로그아웃 회원가입 기능을 구현하였고, 쿠키를 사용하여 유저의 로그인 상태를 저장하였다.(세션과 쿠키중에 고민하였고 예전에 passport로 구현할 때 세션을 사용해봤기 때문에 이번에는 쿠키로 해봤다) `**

**`4일차 : CSS에 대한 개념이 많이 부족해서 Flex와 Grid를 활용한 화면을 재구성하였다. `**

**`5일차 : 로그인 유지를 어떻게 할까 고민하다가 localStorage를 이용해서 로그인하면 localStorage에 저장하고 로그아웃하면 삭제하는 방식으로 구현했다. `**

**`6일차 : 공지사항 페이지를 구성하는 중이다.`**

**`7일차 : styled-component를 이용하여 css작업을 하였다. TypeError: styled_components__WEBPACK_IMPORTED_MODULE_2__.default.Link is not a function 란 에러를 발견했는데 react-router-dom 태그를 이용할 때에는 styled.xx가 아닌 styled(xx)로 만들어주면 해결되었다. `**

**`8일차 : 검색기능을 위해 material-ui의 TextField, Button, Select, MenuItem 등을 사용 `**

**`9일차 : 방명록과 개발일지를 구현 및 라우터 매개변수를 이용한 각 Study 항목 변경을 마침 `**

**`10일차 : 글 작성시 markdown언어를 사용하기 위해서 react-markdown을 사용 하이라이트를 구현하기 위해서 react-syntax-highlighter를 이용했다. ```를 넣을 때 화면이 사라지는 에러가 났었는데 default 값을 지정해주면 되는 에러였고 ```,```는 잘 되는 것 같은데 ``를 사용할 때 에러가 나고 ``를 사용해도 한라인 전체가 하이라이트 되는 것이 문제다.`**

**`11일차 : react-syntax-highlighter를 사용할 때 블록단위로 background-color가 만들어지는 것을 preTag 속성을 span으로 변경 해주어 글자에만 background-color를 입히는 형식으로 바꿨다. 각 study 항목마다 markdown 되는 text를 하나의 파일로 보관하고 markdown 되는 값을 가져오는 방식으로 각 페이지를 구현 `**

**`12일차 : 각각의 페이지에 필요한 DB를 생성 `**

**`13일차 : 원래는 markdown text를 하나의 파일로 보관하고 수정하는 방식으로 사용하려 했으나 create-react-app은 fs 모듈을 지원하지 않았다. 따라서 DB에 text를 보관하고 가져오는 형식으로 markdown을 구현하였고 방명록을 가져오는 작업을 하는 중이다. React Hook useEffect has a missing dependency: 'page'. Either include it or remove the dependency array. 이란 에러를 발견했는데 useEffect 사용시에 배열에다가 props값을 넣어주니 해결되었고 axios의 delete 메소드를 사용할 시에 body의 값을 넣어서 보내주고 싶을경우 두번째 인자에 전달하고자 하는 값을 {data :  { study : ... }} 형식으로 넣어준다. 그리고 axios의 get방식으로는 body에 data를 넣지 못한다는 것을 알았다.`**

**`14일차 : timestamps의 값을 UTC에서 Date로 바꿔주는 방법을 고민했지만 찾지못했고 대신 moment 모듈을 사용하여 timestamps를 없애고 date값을 줘서 시간을 기록하는 방식으로 사용하였다. timestamps 값을 바꿔주는 방식을 좀 더 생각해봐야겠다.`**

**`15일차 : react-redux, redux에 대해서 공부중인데 axios와 같이 쓰기 위해서는 다른 방법이 필요한 것 같다. Error: Actions must be plain objects. Use custom middleware for async actions 이러한 에러때문에 react-thunk 같은 것도 한 번 공부해야겠다. `**
