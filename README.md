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

**`16일차 : redux-thunk는 함수도 디스패치할 수 있도록 해주는 역할을 해서 비동기 처리를 할 때 액션생성함수가 함수를 리턴할 수 있도록 만들어준다 따라서 액션생성함수가 리턴하는 함수에 axios 및 dispatch를 한번 더 사용함으로써 store 값을 저장할 수 있도록 만든다. 이 과정에서 useDispatch 나 useSelector를 사용하는데 useDispatch는 store.dispatch를 쉽게 사용할 수 있도록 하며 useSelector는 콜백함수로 state 변수를 받는데 이 값은 store에 저장된 reducer들의 변수를 나타낸다.`**

**`17일차 : 방명록에서 원래는 useEffect 자체에서 axios를 사용하려 했으나 redux를 쓰기 때문에 useEffect에서 dispatch를 해주었다. 그리고 방명록 Table에 값이 추가되거나 지워지면 리렌더링 하기 위해서 처음에는 guest 배열을 주었는데 무한 루프처럼 계속 실행되었다. 그래서 추가될 때 추가되는 값을 갖는 add 변수, 지워질 때 지워지는 값을 갖는 del 변수를 주려고 보니 add 변수는 다른컴포넌트인 Bookbox에서 가져와야 했다. 그래서 useSelector를 사용하여 reducer가 가지는 initialState를 add, del에 따라 다르게 값을 갖도록 하였고, 그 값을 useEffect에 넣어주니 해결되었다.`**

**`18일차 : 게시물에 갯수에 따라 pagenation 이 자동적으로 많아지거나 적게되도록 만들었다. view에서 dipatch로 액션을 보내줄 때 .then으로 받는 값은 action의 return 값이고 reducer의 return 값은 store에 저장될 때 사용된다. 또한 reducer는 기존 state값을 복사하고 해당 state 중 변하게 하고 싶은 값만 변경해주도록 return을 만들어줘야한다.`**

**`19일차 : 이번엔 공지사항을 페이지를 만들고 있는데 기존에 방명록에서 많은 점을 알아서 아직까진 쉽게 구현했지만 앞으로 댓글기능이나 좋아요 버튼 등을 넣기 위해서 고민해야할 것 같다.`**

**`20일차 : db에서 객체값을 받아올 때 프론트에서 default값을 정해주지 않으면 값을 읽는 부분에서 db가 객체를 받기 전에 값을 읽을 때 에러가 발생하는 것 같다. 그래서 default값을 주니 에러는 사라졌다. 그리고 좋아요 구현을 하는중인데 계속 비슷한 에러가 발생하는 것 같아서 다시 확인해봐야 겠다.`**

**`21일차 : 좋아요버튼은 구현하였고 댓글기능을 구현중이다. MongoDB는 배열타입에 $push를 해줘야 데이터를 넣을 수 있다는 것을 알았다.`**

**`22일차 : 공지사항에 수정과 삭제, 검색기능을 구현하였다. mongoDB의 필드가 배열이고 배열안의 값이 객체인 값 중에서 그 객체 안에 id값을 가지고 populate하기 위해서는 populate안에 객체로 path값과 populate 하고자 하는 필드를 입력하면 된다.`**

**`23일차 : 메인페이지의 공지사항 부분에 데이터 추가 및 사이드바에 컨텐츠 추가 및 삭제 버튼 제작 및 css작업`**

**`24일차 : 사이드바에 컨텐츠 추가, 삭제, 삭제 시 confirm 창 등 기능구현 완료`**

**`25일차 : jwt토큰을 활용하여 세션토큰방식의 세션 유지 로그인 구현중, jwt의 verify함수는 jwt 토큰이 만료 될경우 trycatch문에서 catch에 잡히게 된다. 토큰이 만료된다고 해서 localStorage에 저장된 값이 사라지는건 아니다.`**

**`26일차 : 세팅 페이지에서 비밀번호 변경과 닉네임 변경을 구현`**

**`27일차 : 세팅 페이지 회원탈퇴 기능 및 회원탈퇴 시 공지사항이나 방명록에 user가 null이 되어 에러가 나던 것을 수정함`**

**`28일차 : 유저의 image를 설정 할 수 있도록 multer를 사용하여 이미지 업로드기능을 구현하는 중이다. 그런데 지금 image값이 계속 하나 전꺼가 나오거나 undefined가 떠서 오류를 해결해야 한다.`**
