import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();

    response.status(200).json(places);
    return;
  }

  if (request.method === "POST") {
    const newPlaceData = request.body;
    await Place.create(newPlaceData);

    response.status(201).json({ status: "New place added successfully." });
    return;
  }

  response.status(405).json({ status: "Method not allowed." });
}
