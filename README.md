# :globe_with_meridians:JULOG Project
<h3 align="center"><b>🛠 Tech Stack 🛠</b></h3>
</br>
<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white" /> &nbsp
  <img src="https://img.shields.io/badge/Material UI-0081CB?style=flat-square&logo=Material-UI&logoColor=white" /> &nbsp 
  <img src="https://img.shields.io/badge/styledComponents-DB7093?style=flat-square&logo=styled-components&logoColor=white" /> &nbsp 
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> &nbsp
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/> &nbsp
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/> &nbsp  
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/> &nbsp 
  <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=Amazon%20AWS&logoColor=white"/> &nbsp
  <img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/> &nbsp 
</p>

## :raising_hand:Introduce
[__JULOG__](https://julogpage.herokuapp.com)
+ NodeJS의 Express를 이용한 백엔드 api 서버 구현
+ SPA 중 하나인 React를 이용한 프론트엔드 구현
+ 데이터 저장을 위한 MongoDB Atlas 사용
+ 유저의 이미지를 저장하기 위한 AWS S3 사용
+ Heroku를 사용한 배포

## :computer: FrontEnd
+ create-react-app을 통해 기본 구조 설정
+ api 서버와 통신하기 위해 axios 사용
+ Redux를 사용할 때 비동기 처리를 위한 Redux-Thunk 사용
+ CSS 처리를 위해 styled-components와 Material-UI를 사용
+ Auth Component를 high order component(hoc)로 구현하여 유저의 로그인 유지
+ Frame Component를 high order component(hoc)로 구현하여 페이지 구성에서 반복되는 component를 한번만 사용
## :computer: BackEnd
- NodeJS Express를 사용
- MongoDB Atlas와 연결을 위해 Mongoose를 사용
- 구글 Oauth를 사용하기 위해서 Passport 사용
- 각종 중요한 값들을 보관하기 위한 dotenv 사용
- 유저의 이미지 업로드를 위한 multer와 AWS S3와의 연결을 위한 multerS3 사용
- 유저의 로컬 로그인을 위한 JWT 사용과 로그인 유지를 위한 accessToken refreshToken 사용
## :memo: 개발일지
* ### 새로 알게 된 것
  #### axios
    - axios의 get방식으로는 body에 data를 넣지 못했다. 이러한 이유 때문에 querystring을 쓴다는 것을 알았다.
    - axios의 delete방식으로 body에 data를 넣기 위해서는 
      ```javascript
      const data = { data : { id }};
      const res = await axios.delete('/api/study', data);
      ```
      이런식으로 body안에 넣을 데이터를 객체로 한번 더 싸줘야 했다.
  #### Redux
    - *redux와 redux-thunk를 사용시 루틴*  
      컴포넌트에서 dispatch -> action생성함수에서 axios -> api 서버에 요청 -> api 서버에서 응답 리턴  
      -> 리턴한 값을 action생성함수에서 받아서 다시 dispatch를 return -> **여기서 return 값은 원래 컴포넌트에서 dispatch보낸 위치의 비동기로 .then으로 받을 수 있으며 그와 동시에 return값은 reducer로 가게되어 type에 따른 행동을 취하게 된다**
      ```javascript
      [component]

        useEffect(() => {
            setLoad(true);
            dispatch(loadGuestBook())
            .then(res => { //이 부분이 위에서 진한색으로 설명한 
                if(res.type === LOAD_GUESTBOOK){
                    setGuest(res.data.slice((page.id-1)*10, page.id*10 -1));
                    return setLoad(false);
                }
                if(res.type === LOAD_GUESTBOOK_ERROR){
                    return alert(res.data.message);
                }
                if(res.type === SERVER_ERROR){
                    return history.push('/error/500');
                }
            })
            return () => {
                setLoad(false);
                setGuest([]);
            }
        }, [dispatch, guestbookLength, page.id, history])

      [action 생성함수]

        export const loadGuestBook = () => async dispatch => {
          try {
              const res = await axios.get('/api/guestbook/');
              if(res.data.success){
                  return dispatch({
                      type : LOAD_GUESTBOOK,
                      data : res.data.guests
                  })
              }
              return dispatch({ //이 부분이 위에서 진한색으로 설명한 부분
                  type : LOAD_GUESTBOOK_ERROR,
                  data : res.data,
              })
          } catch (error) {
              return dispatch({
                  type : SERVER_ERROR,
                  data : {
                      success : false,
                  }
              });
          }
        };
      ```
  #### MongoDB(Mongoose)
    - Mongoose에서 type이 배열인 field에 값을 넣기 위해서는 $push 메소드를 사용해야 한다.
      ```javascript
            [router]
            const notice = await Notice.findOneAndUpdate({
                _id : req.body.id
            },{ '$push': { comment : {
                user : req.user._id,
                comment : req.body.comment,
                date : req.body.date,
            } }})

            [model]
            const noticeSchema = new mongoose.Schema({
              title : {
                  type : String,
                  required : true,
                  maxlength : 30,
              },
              author : {
                  type : mongoose.Schema.Types.ObjectId,
                  ref : 'User',
              },
              text : {
                  type : String,
              },
              like : [{
                  type : mongoose.Schema.Types.ObjectId,
                  ref : 'User',
              }],
              img : {
                  type : [String],
                  default : [],
              },
              comment : [{
                  user : {
                      type : mongoose.Schema.Types.ObjectId,
                      ref : 'User'
                  },
                  comment : {
                      type : String,
                      required : true
                  },
                  date : String
              }],
              date: {
                  type: String,
                  default: moment().format("YYYY-MM-DD hh:mm:ss"),
              },

            })
      ```
    - Mongoose의 populate는 관계형 DB의 join과 유사한 기능을 하는데 mongoDB의 필드가 배열이고 배열안의 값이 객체인 값 중에서 그 객체 안에 id값을 가지고 populate하기 위해서는 populate안에 객체로 path값과 populate 하고자 하는 필드를 입력하면 된다.
      + ```javascript
          const notice = await Notice.findOne({
              _id : req.params.id
          }).populate({
              path : 'comment',
              populate : {
                  path : 'user',
              }
          })
        ```
    #### JWT  
    - JWT 로컬 로그인 루틴
      1. 유저의 입력데이터를 서버에 송신
      2. 해당유저가 있는지 확인 후 비밀번호 비교
      3. 비밀번호가 맞다면 accessToken과 refreshToken을 생성 후 해당 유저의 DB에 refreshToken을 저장
      4. refreshToken을 쿠키에 넣어서 보관 후 client에게 accessToken을 전달
      5. accessToken을 localStorage에 저장
      6. 이 후에 인증이 필요한 어떠한 행동을 할 경우 accessToken을 통해 인증을 완료
      7. 만약 accessToken이 만료됐다면 아까 쿠키에 넣어둔 refreshToken을 통해 인증
      8. 이 때 만약 인증에 성공하면 새로운 accessToken을 발급
      9. 만약 인증에 실패한다면 refreshToken도 만료되었기 때문에 다시 로그인을 요청

    - JWT를 사용시 verify로 검증을 할 때 만약 trycatch로 감싸있다면 verify의 결과값이 false나 다른 것으로 나오는 것이 아닌 trycatch에 catch로 가게된다.
    - token을 생성할 때 data로는 해당유저의 고유값으로 해야한다. ex) objectId
   
    #### Multer
    - multer를 사용시에 uload.single(이곳)에 input type이 file인 값의 name을 넣어야한다.
    - multerS3를 사용시에 S3의 특정 폴더에 이미지나 파일을 넣고 싶다면 bucket부분을 바꿔주면 된다.
    ```javascript
      const upload = multer({
        storage : multerS3({
            s3,
            bucket: 'julog-app/uploads',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            acl: 'public-read', //읽기만 가능
            key: (req, file, cb) => { //파일이름 설정하는 곳
                const ext = path.extname(file.originalname);
                cb(null, file.originalname.split('.')[0] + Date.now() + ext);
            }
        }),
        limits: {fileSize: 5 * 1024 *1024}
      })
    ```
    #### Oauth(Passport)
    - passport Oauth Google을 사용할 시에 구글로 로그인 요청을 할 때 axios를 쓰면 proxy error가 발생한다. 따라서 a태그를 통해 직접 해당 주소로 들어가야 한다.
    - Passport Oauth 로그인 루틴
      1. a태그를 통해서 google에 요청을 보낸다.
      2. 구글에서 callback url로 데이터를 보낸다.
      3. 이 때 passport.authenticate('google')을 통해 GoogleStrategy로 이동하게 된다.
      4. GoogleStrategy에서 ClientID와 ClientSecret을 비교하여 맞다면 콜백함수를 통해 회원가입이나 로그인을 진행한다.
      5. GoogleStrategy에서 cb(null, user)로 넘어온 값이 index.js의 passport.serializeUser로 가서 user값을 session에 저장한다. 이 때 user 데이터를 다 저장하면 용량이 크니 user._id값만 저장한다. 이렇게 저장한 값을 통해 req.session.passport.user에 접근가능하다.
      6. 이제 서버로 들어오는 요청마다 실제 DB의 값과 serealizeUser에서 세션에 저장한 값을 deserializeUser에서 비교한다.
      7. 비교한 값이 맞다면 serializeUser에서 done으로 넘겨준 두번째 값을 첫번째 인수로 받는다.
      8. 이제 그 값을 통해서 DB에 접속하여 유저를 찾고 유저의 정보를 done(null, user)로 넘기면 req.user에 user정보가 저장된다.


* ### 에러 및 처리
  - __[HPM] Error occurred while trying to proxy request /api/signup from localhost:3000 to localhost:5000__
    + 이런 에러처럼 만약 나온다면 axios의 공식 홈페이지나 npm의 axios를 사용하는 법을 찾아본 뒤 똑같이 했을 경우에도 같은 에러가 나온다면 그 땐 axios 버전의 문제였다.
  - **TypeError: styled_components__WEBPACK_IMPORTED_MODULE_2__.default.Link is not a function**
    + 이 에러는 styled-components를 사용할 때 나타난 에러였는데 일반적인 html 태그가 아닌 react-router-dom 컴포넌트나 material-ui의 컴포넌트를 styled-components로 꾸밀 때 styled.xx로 꾸밀 때 나타난다. styled.xx가 아닌 styled(xx)로 해주면 해결되었다. 하지만 styled-component를 이용해서 material-ui의 컴포넌트를 꾸밀 경우 css적용이 안될 때가 많았다. material-ui를 꾸밀 땐 material-ui의 공식 홈페이지가 추천하는 방법대로 꾸미는 것이 좋을 것 같다.
  - **React Hook useEffect has a missing dependency: 'page'. Either include it or remove the dependency array.**
    + 이 에러는 useEffect를 사용시에 배열에 값을 주지 않았을 경우에 발생했다. useEffect를 재실행하기 위해서 배열안에 오류에서 제공한 변수를 넣어주니 해결되었다.
  - **Error: Actions must be plain objects. Use custom middleware for async actions**
    + 이 에러는 비동기처리를 하려할 때 redux에서 난 오류였다. redux를 비동기처리와 함께 사용하기 위해서는 redux-thunk를 사용해야 한다.
    + redux-thunk는 함수도 dispatch 할 수 있도록 해주는 역할을 하기 때문에 비동기 처리를 할 때 action생성함수가 함수를 리턴할 수 있도록 만들어준다. 따라서 action 생성함수가 리턴하는 함수에 axios 및 dispatch를 한번 더 사용함으로써 redux store에 값을 저장할 수 있도록한다.
  - **Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.**
    + useEffect를 사용하다보면 많이 보는 에러인데 useEffect의 return을 통해 useEffect에서 사용했던 값들을 useState로 처음 주었던 초기값으로 변경해주면 해결되었다.
  - **Cast to ObjectId failed for value**
    + 이 에러는 router에서 mongoose를 통해 DB로 접근할 시 조건이 만약 ObjectId로 찾는 경우에 우리가 준 값이 objectId가 아니면 발생한다.
    + ```javascript
        const notice = await Notice.findOne({
            _id : req.params.id,
        }).populate('author');
      ```
      이런식이라면 req.params.id값이 objectId가 아닌경우에 발생한다.
