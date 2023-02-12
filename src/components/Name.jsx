import { useEffect, useState } from "react";
import styles from "./Name.module.css";
import cx from "clsx";

export default function Name() {
  const [name, setName] = useState("");
  const [hide, setHide] = useState(false);
  const [nameEdit, setNameEdit] = useState(true);
  const NAME = "greeting";

  // 시작 시 로컬스토리지에 data가 null일 경우, 입력란이 보여야 한다.
  // 반대로 로컬스토리지에 data가 있을 경우 입력란이 보이면 안된다.
  useEffect(() => {
    const loadedName = localStorage.getItem(NAME);
    if (loadedName === null) {
      setHide(false);
    } else {
      setHide(true);
    }
  }, [hide]);

  // submit시 hide를 true로 바꾸고, initText를 숨기고, logText를 보이게 만들어야 한다.
  function onSubmit(e) {
    e.preventDefault();
    localStorage.setItem(NAME, name);
    setHide(true);
  }

  function editToggle() {
    setNameEdit(false);
    localStorage.setItem(NAME, name);
  }

  return (
    <div className={styles.nameContainer}>
      <div className={styles.greetingContainer}>
        <span className={cx(styles.initText, { [styles.hide]: hide })}>
          Thank you visiting my website !
        </span>
        <span className={cx(styles.logText, { [styles.hide]: !hide })}>
          Have A Nice Day!
        </span>
      </div>

      <form className={styles.containerWrapper} onSubmit={onSubmit}>
        <input
          className={cx(styles.name, { [styles.hide]: hide })}
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder={"What's your name?"}
          required
        ></input>
      </form>

      <form onSubmit={editToggle}>
        <input
          onChange={(e) => setName(e.target.value)}
          className={cx(
            styles.logName,
            { [styles.hide]: !hide },
            { [styles.nameEdit]: !nameEdit }
          )}
          value={nameEdit ? localStorage.getItem(NAME) : name}
          readOnly={nameEdit ? true : false}
        ></input>
        <svg
          onClick={editToggle}
          class="feather feather-edit"
          fill="none"
          height="24"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          className={cx(styles.editButton, { [styles.hide]: !hide })}
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </form>
    </div>
  );
}
