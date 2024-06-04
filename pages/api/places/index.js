import dbConnect from "../../../lib/dbConnect.js";
import Place from "../../../lib/models/place.js";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const places = await Place.find();

    if (!places) {
      return response.status(404).json({ status: "No places found" });
    }

    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    //We will create in our DB.
    try {
      const placeData = request.body;
      await Place.create(placeData);
      response.status(200).json({ status: "new Place" });
    } catch (e) {
      console.log("Error in POST in /", e);
      response.status(404).json({ error: e.message });
    }
  }
}
