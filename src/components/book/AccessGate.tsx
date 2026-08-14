import { BookAccessUnavailable } from "@/components/book/BookAccessUnavailable";

interface AccessGateProps {
  children: React.ReactNode;
}

export function AccessGate({ children }: AccessGateProps) {
  void children;
  return <BookAccessUnavailable />;
}
