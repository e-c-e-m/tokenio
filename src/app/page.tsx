import TokenOverview from "@/components/TokenOverview/TokenOverview";

export default async function Page() {
  const res = await fetch('https://li.quest/v1/tokens');
  const data = await res.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-0 p-3 bg-main">
      <TokenOverview 
      tokens={data.tokens} 
      />
    </main>
  );
}