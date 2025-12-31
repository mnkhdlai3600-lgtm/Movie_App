export const fetcherInput = async (endPoint: string) => {
  const response = await fetch(endPoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TDMB_KEY}`,
    },
    cache: "force-cache",
  });
  console.log(endPoint);

  const data = await response.json();
  return data;
};
