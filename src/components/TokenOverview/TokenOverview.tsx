import { Token } from '@/types/token';
import TokenGrid from '../TokenGrid/TokenGrid';
import TokenSearch from '../TokenSearch/TokenSearch';
import { flattenTokens } from '@/utils/utils';

interface TokenOverviewProps {
  tokens: Token[];
}

const TokenOverview = ({ tokens }: TokenOverviewProps) => {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
     <div className="flex flex-row justify-start items-center pt-4 pb-6 w-full bg-main">
        <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-100 mr-4 lg:mr-12">Token.io</h1>
        <TokenSearch />
      </div>
      <TokenGrid tokens={flattenTokens(tokens)} />
    </div>
  );
};

export default TokenOverview;