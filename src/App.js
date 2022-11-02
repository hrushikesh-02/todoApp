import { useEffect, useState } from "react";
import "./App.css";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const getLocalItems = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [useless, setUseless] = useState(0);

  const addItem = (e) => {
    e.preventDefault();
    if (!inputData) {
      alert("Please enter the item to be inserted!");
      return;
    }
    setItems([...items, { content: inputData, style: {} }]);
    setInputData("");
  };

  const deleteItem = (e, id) => {
    let itcopy = items;
    e.preventDefault();
    itcopy[id].style = {
      transition: "all 500ms",
      opacity: "0",
      transform: "scale(0.2)",
    };
    for (let i = id + 1; i < itcopy.length; i++) {
      itcopy[i].style = {
        transition: "all 500ms",
        transform: "translateY(-100%)",
      };
    }
    setItems(itcopy);
    setUseless(useless + 1);
    setTimeout(() => {
      const updatedItems = itcopy.filter((elem, ind) => {
        return ind !== id;
      });
      for (let i = 0; i < updatedItems.length; i++) {
        updatedItems[i].style = {};
      }
      setItems(updatedItems);
    }, 1000);
  };

  const removeAll = (e) => {
    e.preventDefault();
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(items));
  }, [items]);
  return (
    <div className="App">
      <div className="mainContainer">
        <div className="appHead">
          TO-DO
          <br />
          App
        </div>
        <form className="inputArea">
          <input
            type="text"
            className="inputBox"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Enter your todo item here"
          ></input>
          <button className="addButton" onClick={addItem}>
            +
          </button>
          <button
            className="deleteAllButton"
            onClick={(e) => {
              removeAll(e);
            }}
          >
            <DeleteForeverIcon />
          </button>
        </form>
        <div className="outputArea">
          {items.map((elem, ind) => {
            return (
              <div className="todoHolder" key={ind} style={elem.style}>
                <div className="todoElement">{elem.content}</div>
                <button
                  className="deleteButton"
                  onClick={(e) => deleteItem(e, ind)}
                >
                  <DeleteIcon />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
