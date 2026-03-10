import { AccessGate } from "@/components/book/AccessGate";

export default function ChapterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AccessGate>{children}</AccessGate>;
}
