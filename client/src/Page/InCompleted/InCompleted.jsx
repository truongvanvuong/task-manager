import { TitlePage, ListCard } from "../../Component";
import useFetch from "../../Hook/useFetch.js";
import { BASE_URL } from "../../config.js";

const InCompleted = () => {
  const url = `${BASE_URL}/task/incompletes`;
  const { data, loading, error, refresh } = useFetch(url);
  return (
    <div>
      <TitlePage title="Chưa hoàn thành" />

      <div>
        <ListCard dataTask={data} refreshData={() => refresh()} />
      </div>
    </div>
  );
};

export default InCompleted;
