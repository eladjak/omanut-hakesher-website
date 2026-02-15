"use client";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="fixed top-0 start-0 z-[100] bg-primary text-white px-6 py-3 rounded-ee-xl font-medium text-sm -translate-y-full focus:translate-y-0 transition-transform duration-200"
    >
      דלג לתוכן הראשי
    </a>
  );
}
