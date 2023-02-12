import axios from "axios";
import { useEffect, useState, useContext } from "react";
import styles from "./Footer.module.css";
import cx from "clsx";
import { stateContext } from "../App";
import { dispatchContext } from "../App";

export default function Footer() {
  const [text, setData] = useState({ content: "", author: "" });
  const [hidden, setHidden] = useState(false);
  const [toggleOn, setToggleon] = useState(false);
  const [todoText, setTodoText] = useState("");
  const { onCreate, onDelete, onCheck } = useContext(dispatchContext);

  const list = useContext(stateContext);

  useEffect(() => {
    setHidden(true);

    if (list.length === 0) {
      setHidden(false);
    }
  }, [list]);

  useEffect(() => {
    async function fetch() {
      const response = await axios.get(
        "https://api.quotable.io/random?maxLength=60"
      );
      setData({ content: response.data.content, author: response.data.author });
    }
    fetch();
  }, []);

  // input의 값 state 만들고, form으로 submit시 local에 넘어가야함.
  // form의 submit의 state는 배열로 진행하고, setState([newData,...state]) 형식으로 가야함
  // local에 data가 존재할 경우, 기존 p태그를 숨기고 ul > map을 통해 li화 시켜야함.
  // 리스트는 별도의 컴포넌트로 만들어 수정버튼과 삭제버튼을 위치 시켜야함.

  function todoClick() {
    setToggleon(!toggleOn);
  }

  // 이벤트를 막고 input value를 로컬로 보내자.
  function handleSubmit(e) {
    e.preventDefault();

    onCreate(todoText);
    setTodoText("");

    setHidden(true);
  }

  // 삭제 함수 실행 함수
  function onRemove(i) {
    onDelete(i);
  }

  // 체크될 경우 style 지정
  function onClick(i) {
    onCheck(i);
  }

  return (
    <>
      <div className={styles.footer}>
        <div className={styles.description}></div>

        <div className={styles.quote}>
          <p className={styles.content}>{text.content}</p>
          <cite className={styles.author}>{text.author}</cite>
        </div>

        <button onClick={todoClick} className={styles.toggle}>
          Todo
        </button>
        <div
          className={cx(styles.todoPosition, {
            [styles.todoWrapper]: toggleOn,
          })}
        >
          <div className={styles.todoWrapper}>
            <header className={styles.todoHeader}>
              <h2 className={styles.todoTitle}>ToDoList</h2>
            </header>
            <form className={styles.continerForm} onSubmit={handleSubmit}>
              <ul className={styles.list}>
                <p className={cx(styles.noList, { [styles.hide]: hidden })}>
                  Make your List 👇
                </p>

                {list.map((i) => (
                  <li className={styles.listContainer} key={i.id}>
                    <label className={styles.listarray}>
                      <input
                        type={"checkbox"}
                        onChange={() => onClick(i.id)}
                        checked={i.isChecked}
                      ></input>
                      <span
                        className={cx(styles.span, {
                          [styles.midLine]: i.isChecked,
                        })}
                      >
                        {i.content}
                      </span>
                    </label>

                    <svg
                      type={"button"}
                      className={styles.delButton}
                      onClick={() => onRemove(i.id)}
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title />
                      <g data-name="1" id="_1">
                        <path d="M356.65,450H171.47a41,41,0,0,1-40.9-40.9V120.66a15,15,0,0,1,15-15h237a15,15,0,0,1,15,15V409.1A41,41,0,0,1,356.65,450ZM160.57,135.66V409.1a10.91,10.91,0,0,0,10.9,10.9H356.65a10.91,10.91,0,0,0,10.91-10.9V135.66Z" />
                        <path d="M327.06,135.66h-126a15,15,0,0,1-15-15V93.4A44.79,44.79,0,0,1,230.8,48.67h66.52A44.79,44.79,0,0,1,342.06,93.4v27.26A15,15,0,0,1,327.06,135.66Zm-111-30h96V93.4a14.75,14.75,0,0,0-14.74-14.73H230.8A14.75,14.75,0,0,0,216.07,93.4Z" />
                        <path d="M264.06,392.58a15,15,0,0,1-15-15V178.09a15,15,0,1,1,30,0V377.58A15,15,0,0,1,264.06,392.58Z" />
                        <path d="M209.9,392.58a15,15,0,0,1-15-15V178.09a15,15,0,0,1,30,0V377.58A15,15,0,0,1,209.9,392.58Z" />
                        <path d="M318.23,392.58a15,15,0,0,1-15-15V178.09a15,15,0,0,1,30,0V377.58A15,15,0,0,1,318.23,392.58Z" />
                        <path d="M405.81,135.66H122.32a15,15,0,0,1,0-30H405.81a15,15,0,0,1,0,30Z" />
                      </g>
                    </svg>
                  </li>
                ))}
              </ul>
              <input
                onChange={(e) => setTodoText(e.target.value)}
                value={todoText}
                className={styles.listInput}
                placeholder={"Wirte Your List"}
                required
              ></input>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
