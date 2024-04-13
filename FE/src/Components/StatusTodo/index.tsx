import {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
} from "react";
import styles from "./StatusTodo.module.css";

interface StatusTodoProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  totalTodo: number;
  activeTodo: number;
}

const StatusTodo: React.FC<StatusTodoProps> = ({
  totalTodo,
  activeTodo,
  ...restProps
}) => {
  const divRef = useRef<any>(null);

  const num = useMemo(() => {
    return (activeTodo / totalTodo) * 100 || 0;
  }, [activeTodo, totalTodo]);

  useEffect(() => {
    change();
  }, [num]);

  const change = () => (divRef.current.style.width = `${num}%`);

  return (
    <div className={styles.container} {...restProps}>
      <div ref={divRef} className={styles.progress} />
      <p className={styles.title}>
        {activeTodo} of {totalTodo} tasks done
      </p>
    </div>
  );
};

export default StatusTodo;
