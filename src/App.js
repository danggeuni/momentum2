import "./App.css";

import Clock from "./components/Clock";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Name from "./components/Name";
import axios from "axios";

import React, { useRef, useReducer, useEffect, useState } from "react";

// reducer CRUD 함수
const reducer = (state, action) => {
  let newState = [];

  switch (action.type) {
    case "INIT": {
      return action.data;
    }

    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }

    case "DELETE": {
      newState = state.filter((item) => item.id !== action.targetId);
      break;
    }

    case "CHECK": {
      newState = [...state];
      // eslint-disable-next-line array-callback-return
      newState.map((item) => {
        if (item.id === action.targetId) {
          item.isChecked = !item.isChecked;
        }
      });
      break;
    }

    default:
      return state;
  }

  localStorage.setItem("list", JSON.stringify(newState));
  return newState;
};

export const stateContext = React.createContext();
export const dispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setImages(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          "https://api.unsplash.com/search/photos/?query=nature&color=black&orientation=landscape&client_id=4tCQTL567iRyvBp2qbupg1qtYcpX7xAqdbcBf1bxR5U"
        );
        const index = Math.floor(Math.random() * response.data.results.length);
        console.log(response.data.results.length);
        setImages(response.data.results[index].urls.regular); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const localData = localStorage.getItem("list");

    if (localData) {
      const todoList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );

      if (todoList.length >= 1) {
        dataId.current = parseInt(todoList[0].id) + 1;
        dispatch({ type: "INIT", data: todoList });
      }
    }
  }, []);

  console.log(images);

  if (loading) return <div>Loading..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!images) return null;

  // 아이템 생성 함수
  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        content,
        isChecked: false,
      },
    });
    dataId.current += 1;
  };

  // 아이템 삭제 함수
  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  const onCheck = (targetId) => {
    dispatch({
      type: "CHECK",
      targetId,
    });
  };

  return (
    <stateContext.Provider value={data}>
      <dispatchContext.Provider value={{ onCreate, onDelete, onCheck }}>
        <div className="App" style={{ backgroundImage: `url(${images})` }}>
          <Header />
          <div className={"article"}>
            <Clock />
            <Name />
          </div>
          <Footer />
        </div>
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
}

export default App;
