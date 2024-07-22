import useFetch from "../../Hook/useFetch.js";
import { BASE_URL } from "../../config.js";
import { ListCard, TitlePage } from "../../Component";

const AllTask = () => {
  const url = `${BASE_URL}/task/`;
  const { data, loading, error, refresh } = useFetch(url);

  return (
    <div>
      <TitlePage title="Toàn bộ công việc" />

      <div>
        <ListCard dataTask={data} refreshData={() => refresh()} />
      </div>
    </div>
  );
};

export default AllTask;
