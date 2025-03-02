import { prevUser } from "./Context/Usercontext";

const url = process.env.REACT_APP_HUGGINGFACE_API_KEY;

export async function query() {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
    {
      headers: {
        Authorization: `Bearer ${url}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: prevUser.prompt }),
    }
  );

  const result = await response.blob();
  return result;
}
