import { useState } from "react";

interface InputBarProps {
  onClick: (nameTodo: string) => void;
}

const InputBar = ({ onClick }: InputBarProps) => {
  const [body, setBody] = useState("");
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setBody(body);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="input-group">
          <input
            type="text"
            id="form1"
            className="form-control"
            placeholder="Write a work"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (onClick) {
                onClick(body);
              }
            }}
          >
            +
          </button>
        </div>
      </div>
    </form>
  );
};

export default InputBar;
