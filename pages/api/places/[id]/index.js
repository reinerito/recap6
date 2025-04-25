import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  //const place = places.find((place) => place.id === id);

  if (request.method === "GET") {
    const place = await Place.findById(id);

    console.log(place);

    if (!place) {
      response.status(404).json({ status: "Not found" });
      return;
    }

    response.status(200).json(place);
  }

  if (request.method === "PUT") {
    try {
      // Get the updated data from the request body
      const placeData = request.body;

      // Update the place in the database
      const updatedPlace = await Place.findByIdAndUpdate(id, placeData, {
        new: true, // Return the updated document
      });

      if (!updatedPlace) {
        response.status(404).json({ status: "Place not found" });
        return;
      }

      response.status(200).json(updatedPlace);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
    return;
  }

  if (request.method === "DELETE") {
    const place = await Place.findById(id);
    await Place.findByIdAndDelete(id);
    response.status(200).json({ message: "Place deleted successfully." });
    return;
  }

  response.status(405).json({ status: "Method not allowed." });
}
