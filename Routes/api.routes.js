const ROUTE = "https://fundacion-apa-inventory.vercel.app/api/v1/user";
const ROUTERCATEGORY = "https://fundacion-apa-inventory.vercel.app/api/v1/category";
const ROUTEPRODUCT = "https://fundacion-apa-inventory.vercel.app/api/v1/products";
const ROUTEREQUEST = "https://fundacion-apa-inventory.vercel.app/api/v1/request";

export const log = async (data) => {
  const response = await fetch(`${ROUTE}/login`, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const createUser = async (data) => {
  const response = await fetch(`${ROUTE}`, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const deleteUser = async (id) => {
  console.log("a");
  const response = await fetch(`${ROUTE}/${id}`, {
    method: "DELETE",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const getAllUsers = async () => {
  const response = await fetch(`${ROUTE}/`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const getUserById = async (id) => {
  const response = await fetch(`${ROUTE}/${id}`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

/* Categories */
export const getAllCategories = async () => {
  const response = await fetch(`${ROUTERCATEGORY}`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const createCategory = async (data) => {
  const response = await fetch(`${ROUTERCATEGORY}`, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const deleteCategory = async (id) => {
  const response = await fetch(`${ROUTERCATEGORY}/${id}`, {
    method: "DELETE",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const updateCategory = async (data) => {
  const response = await fetch(`${ROUTERCATEGORY}/updateCategory`, {
    method: "PUT",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

/* Products */
export const getAllProducts = async () => {
  const response = await fetch(`${ROUTEPRODUCT}`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const updateProducts = async (data) => {
  console.log(data);
  const response = await fetch(`${ROUTEPRODUCT}/updateProduct`, {
    method: "PUT",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${ROUTEPRODUCT}/${id}`, {
    method: "DELETE",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const createProduct = async (data) => {
  console.log(data);
  const response = await fetch(`${ROUTEPRODUCT}`, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

/* Request */
export const createRequest = async (data) => {
  const response = await fetch(`${ROUTEREQUEST}`, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

/* Report */
export const getSaleReportData = async (par) => {
  const response = await fetch(
    `https://fundacion-apa-inventory.vercel.app/api/v1/report?fechaInicio=${par.fechaInicio}&fechaFin=${par.fechaFin}`,
    {
      method: "GET",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
};

export const getCategorySaleReportData = async (par) => {
  const response = await fetch(
    `https://fundacion-apa-inventory.vercel.app/api/v1/report/reporte-area?fechaInicio=${par.fechaInicio}&fechaFin=${par.fechaFin}`,
    {
      method: "GET",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
};
