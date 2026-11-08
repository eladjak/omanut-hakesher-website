import { redirect } from "next/navigation";

export default function ProductsIndex() {
  // Only one product currently; route directly to it.
  redirect("/products/dating-card");
}
