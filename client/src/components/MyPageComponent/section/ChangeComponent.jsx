import React from "react";
import Nick from "./change/Nick";
import Password from "./change/Password";
import Resign from "./change/Resign";

function ChangeComponent({
  nick,
  user,
  change,
  onSubmitChangeNick,
  onClickCancelNick,
  onChangeNick,
  input,
  onSubmitPassword,
  onClickCancelPassword,
  onChangeInput,
  onClickResign,
}) {
  return (
    <>
      {change === "nick" ? (
        <Nick
          nick={nick}
          user={user}
          onSubmitChangeNick={onSubmitChangeNick}
          onClickCancelNick={onClickCancelNick}
          onChangeNick={onChangeNick}
        />
      ) : change === "password" ? (
        <Password
          user={user}
          input={input}
          onSubmitPassword={onSubmitPassword}
          onClickCancelPassword={onClickCancelPassword}
          onChangeInput={onChangeInput}
        />
      ) : (
        <Resign onClickResign={onClickResign} />
      )}
    </>
  );
}

export default ChangeComponent;
