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