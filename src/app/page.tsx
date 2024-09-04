import ErrorBlock from "@/components/ErrorBlock/ErrorBlock";
import TokenOverview from "@/components/TokenOverview/TokenOverview";

export default async function Page() {
  // Revalidate at the most every hour (ISR). Prior to Nextjs 13 onwards, getStaticProps could be used however
  // getStaticProps and getStaticPaths are obsolete in the newer versions of Nextjs. 
  
  const res = await fetch('https://li.quest/v1/tokens', { next: { revalidate: 3600 } });
  const data = await res.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-0 p-3 bg-main">
      {res.ok ? <TokenOverview tokens={data.tokens} /> : <ErrorBlock />} 

    </main>
  );
}
