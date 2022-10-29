import "./Message.css";

interface IMessage {
  msg: string;
  type: string;
}

const Message = ({ msg, type }: IMessage) => {
  return (
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  );
};

export default Message;
