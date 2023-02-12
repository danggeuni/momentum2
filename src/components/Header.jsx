import cx from "clsx";
import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);

  function activeToggle() {
    setActive(!active);
  }

  function onSubmit(e) {
    e.preventDefault();
    window.open("https://www.google.co.kr/search?q=" + search);
    setSearch("");
  }

  return (
    <div className={styles.header}>
      <div className={styles.search}>
        {/* Search 버튼 클릭 시 input 창이 나타나게 만든다. */}
        <button onClick={() => activeToggle()} className={styles.toggle}>
          Search
        </button>
        <div className={styles.inputWrapper}>
          <form onSubmit={onSubmit} className={styles.form}>
            <input
              className={cx(styles.input, { [styles.active]: active })}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            ></input>
            <input
              type={"submit"}
              id={"btnSubmit"}
              className={styles.searchIcon}
            />
            <label for={"btnSubmit"}>
              <svg
                enable-background="new 0 0 32 32"
                id="Glyph"
                version="1.1"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className={cx(styles.button, { [styles.active]: active })}
                type={"button"}
              >
                <path
                  d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
                  id="XMLID_223_"
                />
              </svg>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}
