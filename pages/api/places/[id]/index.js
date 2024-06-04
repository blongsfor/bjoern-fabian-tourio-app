import dbConnect from "../../../../lib/dbConnect";
import Place from "../../../../lib/models/place.js";
import Comment from "../../../../lib/models/comment.js";

export default async function handler(request, response) {
  const { id } = request.query;
  await dbConnect();
  // console.log("api places slug", id);

  if (request.method === "GET") {
    const place = await Place.findById(id).populate("comments");
    // console.log("place in place slug", place);

    if (!place) {
      return response.status(404).json({ status: "No place found" });
    }

    return response.status(200).json(place);
  }

  if (request.method === "PATCH") {
    const updatedPlace = request.body;
    const placeToUpdate = await Place.findByIdAndUpdate(id, updatedPlace);

    response.status(200).json(placeToUpdate);
  }
  // if (request.method === "DELETE") {
  //   await Place.findByIdAndDelete(id);
  //   response.status(200).json({ status: "place successfully deleted" });
  // }

  if (request.method === "DELETE") {
    const { commentId } = request.body;

    if (commentId) {
      // Deleting a specific comment from the place
      await Comment.findByIdAndDelete(commentId);
      await Place.findByIdAndUpdate(id, {
        $pull: { comments: commentId },
      });
      return response
        .status(200)
        .json({ status: "comment successfully deleted" });
    } else {
      // Deleting the place
      await Place.findByIdAndDelete(id);
      return response
        .status(200)
        .json({ status: "place successfully deleted" });
    }
  }

  if (request.method === "POST") {
    const commentData = request.body;
    const createdComment = await Comment.create(commentData);

    await Place.findByIdAndUpdate(id, {
      $push: { comments: createdComment._id },
    });
    response.status(200).json({ status: "comment created" });
  }
}
