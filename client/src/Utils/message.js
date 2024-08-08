import { message as messageAntd } from "antd";
const message = (type, content) => {
  messageAntd.open({
    className: "text-white text-[0.85rem] md:text-[1rem] font-medium",
    type: type,
    content: content,
    duration: 2.5,
  });
};
export default message;
