import { Link } from "react-router-dom"
import {ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'


function ListingItem({listing, id, onDelete}) {
  return (
    <li className="categoryListing">
      <Link to={`/category/${listing.type}/$id`} className="categoryListingLink">
        <img src={listing.imageUrls[0]} alt={listing.name} className="categoryListingImg"/>
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">
            {listing.location}
          </p>
          <p className="categoryListingName"> { listing.name} </p>    
          <p className="categoryListingPrice">
            ${listing.offer 
            ? listing.discountedPrice
            : listing.regularPrice 

            }
            {listing.type === 'rent' && ' / Month'}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="bed" />
            <p className="categoryListingInfoText">
                {listing.bathrooms && listing.bathrooms > 1 
                ? `${listing.bathrooms} bedrooms` 
                : '1 bedrooms'}
            </p>
            <img src={bathtubIcon} alt='bath'/>
            <p className="categoryListingInfoText">
                {listing.bathrooms && listing.bathrooms > 1 
                ? `${listing.bathrooms} bathrooms` 
                : '1 bathrooms'}
            </p>
          </div>
        </div>      
      </Link>

      {onDelete && (
        <DeleteIcon className="removeIcon" fill= 'rgb(231, 76, 60)' onClick={() => onDelete(listing.id, listing.name)}/>
      )}
    </li>
  )
}

export default ListingItem
