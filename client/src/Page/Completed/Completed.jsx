import { TitlePage, ListCard } from "../../Component";
import useFetch from "../../Hook/useFetch.js";
import { BASE_URL } from "../../config.js";

const Completed = () => {
  const url = `${BASE_URL}/task/completeds`;
  const { data, loading, error, refresh } = useFetch(url);
  return (
    <div>
      <TitlePage title="Hoàn thành" />
      <div>
        <ListCard dataTask={data} refreshData={() => refresh()} />
      </div>
    </div>
  );
};

export default Completed;
