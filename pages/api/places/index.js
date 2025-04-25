// Import the places array from our database
import { places } from "../../../lib/db";

export default function handler(request, response) {
  // Handle GET request - return all places
  if (request.method === "GET") {
    response.status(200).json(places);
    return;
  }

  // Handle POST request - add a new place
  if (request.method === "POST") {
    // Get the new place data from the request body
    const newPlace = request.body;
    // Add the new place to our places array
    places.push(newPlace);
    // Send back success response with the new place
    response.status(201).json(newPlace);
    return;
  }

  // If the request method is not GET or POST, return error
  response.status(405).json({ message: "Method not allowed" });
}
