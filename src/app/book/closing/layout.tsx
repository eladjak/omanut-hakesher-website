import { AccessGate } from "@/components/book/AccessGate";

export default function ClosingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AccessGate>{children}</AccessGate>;
}
