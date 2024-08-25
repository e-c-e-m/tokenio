/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'

interface TokenItemProps {
    tokenName: string
    tokenAddress: string
    tokenLogo: string
}

const TokenItem = ({tokenName, tokenAddress, tokenLogo}: TokenItemProps) => {
  return (
    <div className="flex flex-row justify-start items-center gap-x-24 p-3.5 w-full">
        {tokenLogo &&
        <Image
        alt="Token logo"
        src={tokenLogo} 
        width={50}
        height={50}
        />
        }
        <p className="font-bold text-neutral-100 text-xl">{tokenName}</p>
        <p className="font-light text-neutral-100 text-base">{tokenAddress}</p>
    </div>
  )
}

export default TokenItem