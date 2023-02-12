import moment from "moment";
import { useState, useEffect } from "react";

import styles from "./Clock.module.css";

export default function Clock() {
  const [time, setTime] = useState(moment());

  let timer = null;

  useEffect(() => {
    setInterval(() => {
      setTime(moment());
    }, 6000);
    return () => {
      clearInterval(timer);
    };
  }, [timer, time]);

  return (
    <div className={styles.clockContainer}>
      <div className={styles.clock}> {time.format("HH:mm")}</div>
    </div>
  );
}
