import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeOption = searchParams.get("sortBy") || "name";
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      activeValue={activeOption}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
