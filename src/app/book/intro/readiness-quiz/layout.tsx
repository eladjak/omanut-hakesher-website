import { AccessGate } from "@/components/book/AccessGate";

export default function ReadinessQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AccessGate>{children}</AccessGate>;
}
