export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const { from, to } = req.body;

    const url = 'https://fake-uapi-search-389212.ew.r.appspot.com/flightofferings/';
    const requestData = {
      CatalogOfferingsRequestAir: {
        offersPerPage: 5,
        PassengerCriteria: [
          {
            value: 'ADT',
            number: 1,
          },
        ],
        SearchCriteriaFlight: [
          {
            '@type': 'SearchCriteriaFlight',
            departureDate: '2023-02-15',
            From: {
              value: from,
            },
            To: {
              value: to,
            },
          },
        ],
        SearchModifiersAir: {
          '@type': 'SearchModifiersAir',
          CarrierPreference: {
            '@type': 'CarrierPreference',
            type: 'Prohibited',
            carriers: ['WN'],
          },
        },
        PseudoCityInfo: {
          value: 'PCC',
        },
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch flight offerings');
    }

    const responseData = await response.json();
    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
