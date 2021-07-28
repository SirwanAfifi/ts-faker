import Axios from "axios";

export const axios = Axios.create({
  headers: {
    "Content-Type": "text/plain",
  },
});
