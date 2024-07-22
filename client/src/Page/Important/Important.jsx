import { TitlePage, ListCard } from "../../Component";
import useFetch from "../../Hook/useFetch.js";
import { BASE_URL } from "../../config.js";
const Important = () => {
  const url = `${BASE_URL}/task/importants`;
  const { data, loading, error, refresh } = useFetch(url);
  return (
    <div>
      <TitlePage title="Quan trọng" />

      <div>
        <ListCard dataTask={data} refreshData={() => refresh()} />
      </div>
    </div>
  );
};

export default Important;
