import React from 'react'
import {Rating} from "@mui/material";

const ListReviews = ({ reviews }) => {
    return (
        <div class="reviews w-75">
            {reviews && reviews.map(review => review.approved && (
                <div key={review._id} class="review-card my-3">
                    <p class="review_user">by {review.user_name}</p>
                    <div class="rating-outer">
                        <Rating
                                name='custom-no-value'
                                value= {review.rating}
                                precision={0.5}
                                sx={{
                                fontSize: '1rem',
                                }}
                                readOnly/>
                    </div>
                    <p class="review_comment">{review.comment}</p>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default ListReviews