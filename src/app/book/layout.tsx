import type { Metadata } from "next";
import { BookAccessProvider } from "@/components/book/BookAccessProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | הספר - אומנות הקשר",
    default: "הספר ״אומנות הקשר״",
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BookAccessProvider>{children}</BookAccessProvider>;
}
