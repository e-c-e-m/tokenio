import TokenDetails from "@/components/TokenDetails/TokenDetails";

export default async function Page({ params }: { params: { chainId: string, tokenSymbol: string }}) {
  const res = await fetch(`https://li.quest/v1/token?chain=${params.chainId}&token=${params.tokenSymbol}`);
  const data = await res.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-0 p-3 bg-main">
      <TokenDetails token={data} />
    </main>
  );
}