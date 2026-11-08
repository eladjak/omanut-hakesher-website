import { redirect } from "next/navigation";

export default function EventsIndex() {
  // Only one event currently; route directly to it.
  redirect("/events/love-event");
}
