import axios from "axios";

export const fetchBoardList = async (query: string) => {
  try {
    const search = query ? `&title=${query}` : "";
    const res = await axios.get(
      `http://localhost:8080/boards?_page=1${search}`,
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
