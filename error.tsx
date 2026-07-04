"use client";

interface ErrorProps {
  error: Error;
  reset?: () => void;
}

export default function GlobalError({ error }: ErrorProps) {
  return (
    <main className="min-h-screen bg-rose-50 text-rose-950 flex items-center justify-center p-8">
      <div className="max-w-xl rounded-3xl border border-rose-200 bg-white/90 p-8 shadow-xl backdrop-blur-sm">
        <h1 className="mb-4 text-3xl font-bold">Oops — something went wrong</h1>
        <p className="mb-6 text-sm text-rose-700">
          Sorry, there was an error loading the page.
        </p>
        <pre className="mb-6 whitespace-pre-wrap rounded-xl bg-rose-50 p-4 text-xs text-rose-800">
          {error?.message}
        </pre>
        <a
          href="/"
          className="inline-flex rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
        >
          Try again
        </a>
      </div>
    </main>
  );
}
