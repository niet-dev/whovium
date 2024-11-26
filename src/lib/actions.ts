import axios from "axios";

export const fetchBoardList = async () => {
  try {
    const res = await axios.get("http://localhost:8080/boards?_page=1");
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
