import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../../components/Form";
import { StyledLink } from "../../../components/StyledLink";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

  async function editPlace(place) {
    try {
      // Make a PUT request to update the place
      const response = await fetch(`/api/places/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(place),
      });

      if (!response.ok) {
        throw new Error("Failed to update place");
      }

      // If successful, redirect back to the place details page
      router.push(`/places/${id}`);
    } catch (error) {
      console.error("Error updating place:", error);
    }
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <StyledLink href={`/places/${id}`} $justifySelf="start">
        back
      </StyledLink>
      <Form onSubmit={editPlace} formName={"edit-place"} defaultData={place} />
    </>
  );
}
