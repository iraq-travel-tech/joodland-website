export const fetchFlights = async (from: string, to: string) => {
  try {
    const requestData = {
      from,
      to,
    };

    const response = await fetch("/api/flights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch flight offerings");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch flight offerings");
  }
};
