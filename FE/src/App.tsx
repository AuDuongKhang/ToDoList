import Layout from "./Layout";
import {
  WrapperLayout,
  ShowListTodo,
  StatusTodo,
  InputBar,
  ButtonRemoveCheck,
} from "./Components";
import "./App.css";
import { useEffect, useState } from "react";
import { fetchApi } from "./helper";

interface Data {
  id: number;
  name: string;
  status: "check" | "uncheck";
}

interface ActionTodoList {
  name: string;
  value1?: number;
  value2?: string;
}

function App() {
  let [todoText, setTodoText] = useState("");
  const [datas, setDatas] = useState<Data[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [totalTodo, setTotalTodo] = useState<number>(0);
  const [activeTodo, setActiveTodo] = useState<number>(0);

  useEffect(() => {
    refetch();
  }, []);

  const refetch = () => {
    fetchApi({ url: "/api/ToDo" })
      .then((res) => res.json())
      .then((res) => {
        const { todolist, total, activeTodo } = res;
        setDatas(todolist);
        setTotalTodo(total);
        setActiveTodo(activeTodo);
      });
  };

  const addTodo = (nameTodo: string) => {
    const todo = {
      name: nameTodo,
    };
    fetchApi({
      url: `/api/ToDo`,
      method: "POST",
      body: todo,
    }).then(() => refetch());
    setTodoText("");
  };

  const removeCheck = () => {
    fetchApi({
      url: `/api/ToDo`,
      method: "DELETE",
    }).then(() => refetch());
  };

  const handleAllAction = (action: ActionTodoList) => {
    const { name, value1, value2 = "" } = action;
    switch (name) {
      case "Delete": {
        if (value1) {
          fetchApi({
            url: `/api/ToDo/${value1}`,
            method: "DELETE",
          }).then(() => refetch());
        }
        break;
      }
      case "Update": {
        if (!value1) return setIsEdit(false);
        if (!value2?.trim()) return setIsEdit(false);
        const findIndexName = datas.findIndex((item) => item.id === value1);
        const oldName = String(datas[findIndexName].name).trim();
        if (oldName !== value2.trim()) {
          const newData: Data = {
            id: datas[findIndexName].id,
            name: value2.trim(),
            status: datas[findIndexName].status,
          };
          fetchApi({
            url: `/api/ToDo/${value1}`,
            method: "PUT",
            body: newData,
          })
            .then(() => refetch())
            .then(() => setIsEdit(false));
        } else {
          setIsEdit(false);
        }

        break;
      }
      case "actionCancelUpdate":
        setIsEdit(false);
        break;
      case "actionUpdate":
        setIsEdit(true);
        break;
      case "Checkedbox": {
        if (!value1) return setIsEdit(false);
        const findIndexName = datas.findIndex((item) => item.id === value1);
        const newData: Data = {
          id: datas[findIndexName].id,
          name: datas[findIndexName].name,
          status: "check",
        };
        fetchApi({
          url: `/api/ToDo/${value1}`,
          method: "PUT",
          body: newData,
        })
          .then(() => refetch())
          .then(() => setIsEdit(false));

        break;
      }
      default:
        break;
    }
  };

  return (
    <Layout>
      <WrapperLayout>
        <h2 className="title">TODOLIST</h2>
        {/** create todo */}
        <InputBar
          onClick={(nameTodo) => {
            addTodo(nameTodo);
          }}
        />

        {/** show list todo */}
        <ShowListTodo isEdit={isEdit} data={datas} onClick={handleAllAction} />
        {/** action todo */}
        <div className="container-action">
          <StatusTodo totalTodo={totalTodo} activeTodo={activeTodo} />
          <div className="wrapper-remove-btn">
            <ButtonRemoveCheck onClick={removeCheck}>
              RemoveChecked
            </ButtonRemoveCheck>
          </div>
        </div>
      </WrapperLayout>
    </Layout>
  );
}

export default App;
