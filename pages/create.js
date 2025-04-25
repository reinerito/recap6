import styled from "styled-components";
import { useRouter } from "next/router";
import Form from "../components/Form";
import { StyledLink } from "../components/StyledLink";
import useSWR from "swr";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreatePage() {
  // Get the router object to handle page navigation
  const router = useRouter();

  // Function to handle form submission
  async function addPlace(event) {
    // Prevent the form from refreshing the page
    event.preventDefault();

    // Get all form data and convert it to a simple object
    const formData = new FormData(event.target);
    const placeData = Object.fromEntries(formData);

    // Send POST request to our API
    const response = await fetch("/api/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(placeData),
    });

    // If the request was successful, go back to homepage
    if (response.ok) {
      router.push("/");
    }
  }

  return (
    <form onSubmit={addPlace}>
      <h1>Add New Place</h1>
      {/* Form fields for place information */}
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" required />
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input type="text" id="image" name="image" required />
      </div>
      <div>
        <label htmlFor="mapURL">Map URL:</label>
        <input type="text" id="mapURL" name="mapURL" required />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" required></textarea>
      </div>
      <button type="submit">Add Place</button>
    </form>
  );
}
