const API_URL = `http://localhost:8002`;

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`URL is not valid or active`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

getData(`${API_URL}/get-data`);
