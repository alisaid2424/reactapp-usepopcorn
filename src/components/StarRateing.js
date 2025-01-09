import  { useState } from 'react'
import Star from './Star';


const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap : "16px",
}

const containerStarStyle = {
    display: 'flex',
}

const StarRateing = ({maxRateing = 5 , color = "#fcc419" , size = 48 , message = [] , onRateMovies}) => {
    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0);

    const handleClick = (rating) => {
        setRating(rating)
        onRateMovies(rating)
    }

    const styleText = {
      margin: "0",
      lineHeight : 1,
      color ,
      fontSize : `${size / 1.5}px`,
  }

  return (
    <div style={containerStyle}>
      <div style={containerStarStyle}>
        {Array.from({length : maxRateing}).map((_,i)=> 
        <Star 
            key={i} 
            onRating={()=>handleClick(i + 1)} 
            haverIn={()=>setTempRating(i + 1)} 
            haverOut={()=>setTempRating(0)} 
            fill={tempRating ?  tempRating >= i + 1  : rating >= i + 1}
            color={color}
            size={size}
        />
        )}
      </div>
      <p style={styleText}>
        { message.length === maxRateing ?  
          message[tempRating ? tempRating - 1 : rating - 1]  :  tempRating || rating  || ""
        }
      </p>
    </div>
  )
}
export default StarRateing



