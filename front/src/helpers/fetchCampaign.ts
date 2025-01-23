export const fetchCampaign = async (url:string, token:string, id:number)=>{
try {
    const response = await fetch(`${url}/campaign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      return data
} catch (error) {
    console.log(error)
}
}