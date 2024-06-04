import dbConnect from "../../../../lib/dbConnect";
import Place from "../../../../lib/models/place.js";

export default async function handler(request, response) {
  const { id } = request.query;
  await dbConnect();
  console.log("api places slug", id);

  if (request.method === "GET") {
    const place = await Place.findById(id);
    console.log("place in place slug", place);

    if (!place) {
      return response.status(404).json({ status: "No place found" });
    }

    return response.status(200).json(place);
  }
}
