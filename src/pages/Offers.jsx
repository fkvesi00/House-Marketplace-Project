import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"
import { list } from "firebase/storage"

function Category() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    const fetchListing = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings')

        //create a query
        const q = query(
          listingsRef, 
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10))
        
        // Execute query
        const querySnap = await getDocs(q)

        let listings = []

        querySnap.forEach((doc) => {
          console.log(doc.data())
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        
        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }

    fetchListing()
  },[params.categoryName])

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          { 'Places on offer' }
        </p>
      </header>

        {loading 
        ? (<Spinner />) 
        : listings && listings.length > 0 
        ? (
            <main>
              <ul className="categoryListings">
                {listings.map((listing) => {
                 return <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
                })}
              </ul>
            </main>
          )
        : (<p>No places on offer</p>)
        }
    </div>
  )
}

export default Category
