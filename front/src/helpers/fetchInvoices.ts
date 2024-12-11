export const fetchUserInvoices = async (
  url: string,
  email: string,
  token: string,
  tokenIspCube: string,
  id: number
) => {
  try {
    const response = await fetch(`${url}/ispCube/fact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },

      body: JSON.stringify({ tokenIspCube, email, id }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
