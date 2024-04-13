import {
  ChangeEventHandler,
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useState,
} from "react";
import styles from "./ShowListTodo.module.css";
import classNames from "classnames";

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

interface AllAttribute
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

type ShowListTodoProps = Omit<AllAttribute, "onClick"> & {
  data: Data[];
  onClick?: ({ name, value1, value2 }: ActionTodoList) => void;
  isEdit: boolean;
};

const ShowListTodo: React.FC<ShowListTodoProps> = ({
  data = [],
  onClick,
  isEdit = false,
}) => {
  const [check, setCheck] = useState<number>(0);
  const [textUpdate, setTextUpdate] = useState<string>("");
  const [lineEdit, setLineEdit] = useState<number | undefined>();

  useEffect(() => {
    if (lineEdit) {
      const indexTodo: number = data.findIndex((item) => item.id === lineEdit);
      if (indexTodo > -1) {
        setTextUpdate(data[indexTodo].name);
      }
    }
  }, [lineEdit]);

  const handleEdit = (id: number) => () => {
    onClick?.({ name: "actionUpdate" });
    setLineEdit(id);
    const indexTodo: number = data.findIndex((item) => item.id === id);
    if (indexTodo > -1) {
      setTextUpdate(data[indexTodo].name);
    }
  };

  const handleFocus = (id: number) => () => {
    setCheck(id);
    onClick?.({ name: "onFocus", value1: id });
  };

  const handleCancelUpdate = () => {
    onClick?.({ name: "actionCancelUpdate" });
    setTextUpdate("");
  };

  const handleUpdate = (id: number) => () =>
    onClick?.({ name: "Update", value1: id, value2: textUpdate });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setTextUpdate(e.target.value);

  const handleDelete = (id: number) => () =>
    onClick?.({ name: "Delete", value1: id });

  const handleChangeCheckbox = (id: number) => () => {
    const indexTodo: number = data.findIndex((item) => item.id === id);
    if (indexTodo > -1) {
      const statusTodo = data[indexTodo].status;
      if (statusTodo === "uncheck") {
        onClick?.({ name: "Checkedbox", value1: id });
      }
    }
  };
  return (
    <div style={{ width: "100%" }}>
      {data.length === 0 && (
        <div className={styles.empty}>No data. Please create todo</div>
      )}
      {(data || []).map((item, index) => {
        return (
          <div
            key={index}
            className={classNames(styles.container, {
              [`${styles.active}`]: item.id === check,
            })}
            onClick={handleFocus(item.id)}
          >
            <div className={styles.title}>
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                checked={item.status === "check"}
                onChange={handleChangeCheckbox(item.id)}
              />
              {isEdit && lineEdit === item.id ? (
                <input type="text" value={textUpdate} onChange={handleChange} />
              ) : (
                <p
                  className={classNames(styles.text, {
                    [`${styles.activeText}`]: item.status === "check",
                  })}
                >
                  {item.name}
                </p>
              )}
            </div>
            <div className={styles.action}>
              {isEdit && lineEdit === item.id ? (
                <>
                  <span onClick={handleUpdate(item.id)}>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z"></path>
                    </svg>
                  </span>

                  <span onClick={handleCancelUpdate}>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        fontSize: 24,
                      }}
                    >
                      <path
                        fill="none"
                        stroke="#d8eaf1"
                        strokeWidth="2"
                        d="M7,7 L17,17 M7,17 L17,7"
                      ></path>
                    </svg>
                  </span>
                </>
              ) : (
                <>
                  <span className="action" onClick={handleEdit(item.id)}>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        fontSize: 15,
                      }}
                    >
                      <path
                        fill="none"
                        stroke="#d8eaf1"
                        strokeWidth="2"
                        d="M14,4 L20,10 L14,4 Z M22.2942268,5.29422684 C22.6840146,5.68401459 22.6812861,6.3187139 22.2864907,6.71350932 L9,20 L2,22 L4,15 L17.2864907,1.71350932 C17.680551,1.319449 18.3127724,1.31277239 18.7057732,1.70577316 L22.2942268,5.29422684 Z M3,19 L5,21 M7,17 L15,9"
                      ></path>
                    </svg>
                  </span>

                  <span onClick={handleDelete(item.id)}>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        fontSize: 24,
                      }}
                    >
                      <path
                        fill="none"
                        stroke="#d8eaf1"
                        strokeWidth="2"
                        d="M7,7 L17,17 M7,17 L17,7"
                      ></path>
                    </svg>
                  </span>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowListTodo;
