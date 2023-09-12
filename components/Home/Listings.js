import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useContract, useMarketplace } from '@thirdweb-dev/react'
import NFTCard from './NFTCard'

const style = {
  wrapper: `mx-auto grid max-w-fit flex-1 grid-cols-1 gap-8 p-10 pt-24  md:grid-cols-2 md:pt-0  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`,
}

const Listings = () => {
  const [listings, setListings] = useState([])
  const {contract} = useContract("0xF9E2fCFb56fb32e81345DcEE60410eB56Ebd8917",'marketplace-v3',
  console.log(contract)
  )
  const marketplace = useMarketplace(
    "0xF9E2fCFb56fb32e81345DcEE60410eB56Ebd8917", 'marketplace-v3',
  )

  useEffect(() => {
    getListings()
  }, [])

  const getListings = async () => {
    try {
      const list = await marketplace.getActiveListings()

      setListings(list)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={style.wrapper}>
      {listings.length > 0 ? (
        <>
          {listings?.map((listing, index) => (
            <Link
              key={index}
              href={`/assets/${listing.assetContractAddress}/${listing.id}`}
            >
              <a>
                <NFTCard listing={listing} />
              </a>
            </Link>
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Listings
