import { dbConnect } from "../../../../lib/dbConnect";
import Place from "../../../../lib/models/place.js";

export default async function handler(request, response) {
  const { id } = request.query;
  await dbConnect();

  if (request.method === "GET") {
    const place = await Place.findById(id);
    return response.status(200).json(place);
  }
}
