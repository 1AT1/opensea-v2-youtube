import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getActiveListings,useContract, useActiveListings } from '@thirdweb-dev/react'
import NFTCard from './NFTCard'

const style = {
  wrapper: `mx-auto grid max-w-fit flex-1 grid-cols-1 gap-8 p-10 pt-24  md:grid-cols-2 md:pt-0  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`,
}

const Listings = () => {
  const [listings, setListings] = useState([])
  const {contract} = useContract("{{0xF9E2fCFb56fb32e81345DcEE60410eB56Ebd8917}}",'marketplace-v3',
  )
  let { data, isLoading, error, alt } =
  useActiveListings(contract) ;
  console.log(contract)

  useEffect(() => {
    getListings()
  }, [])

  const getListings = async() => {
    try { 
      console.log(listings)
      //console.log(loadingListings)
      //setListings(list)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={style.wrapper}>
      {listings.length > 0 ? (
        <>
          {listings?.map((listing, index) => (
            (<Link
              key={index}
              href={`/assets/${listing.assetContractAddress}/${listing.id}`}
            >

              <NFTCard listing={listing} />

            </Link>)
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Listings
