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
}
