import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from "../components/Spinner"

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
          where('type', '==', params.categoryName),
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
          {params.categoryName === 'rent'
          ? 'Places for rent' 
          : 'Places for sale'
          }
        </p>
      </header>

        {loading 
        ? (<Spinner />) 
        : listings && listings.length > 0 
        ? (
            <main>
              <ul className="categoryListings">
                {listings.map((listings,i) => {
                  return <h3 key={i}>{listings.data.name}</h3>
                })}
              </ul>
            </main>
          )
        : (<p>no listings for {params.categoryName}</p>)
        }
    </div>
  )
}

export default Category
