export const fetchAllUsersIspCube = async (
  url: string,
  email: string,
  token: string,
  tokenIspCube: string
) => {
  try {
    const response = await fetch(`${url}/ispCube/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },

      body: JSON.stringify({ token: tokenIspCube, email }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
