interface Options {
  method?: string;
  headers?: { [key: string]: any };
  body?: { [key: string]: any };
}

const request = async (url: string, options: Options) => {
  const { method = "POST", headers = {}, body = {} } = options;

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    });

    if (response.status === 204) {
      return { message: "OK" };
    }

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (e) {
    throw e;
  }
};

export default request;
