import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useUser } from "../context/useUser.js";
import "./MovieReview.css";

const URL = process.env.REACT_APP_API_URL;

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fi-FI', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

export default function MovieReview({ movieId }) {
    const { user, isSignedIn } = useUser();
    const [stars, setStars] = useState(0);
    const [text, setText] = useState("");

    const [reviews, setReviews] = useState([]);

    const browseReviews = useCallback(() => {

        axios.get(URL + "/review/browse", {
            params: { id: movieId },
            headers: { Accept: "application/json" }
        })
        .then(response => {
            console.log("Fetched reviews from API:", response.data.reviews);
            if (!Array.isArray(response.data.reviews)) {
                console.error("Invalid reviews format received:", response.data.reviews);
                setReviews([]);
            } else {
                const formattedReviews = response.data.reviews.map(review => ({
                    ...review,
                    date: formatDate(review.date)
                }));
                setReviews(formattedReviews);
            }
        })
        .catch(error => {
            console.error("Error fetching reviews:", error.response?.data || error.message);
        });
    }, [movieId]);
    

    useEffect(() => {
        browseReviews();
          console.log("User context:", user);
         console.log("movieId:", movieId);
        console.log("MovieReview component rendered");
    }, [movieId, browseReviews]);

    const submitReview = () => {

        axios.post(URL + "/review/create", {
            id: movieId,
            stars: stars,
            text: text,
            token: user.token,
            user: user.id
        })
        .then(response => {
            console.log("Review submitted successfully:", response.data);
            browseReviews(); // Refresh reviews after successful submission
            setText("");
            setStars(0);
        })
        .catch(error => {
            console.error("Error submitting review:", error.response?.data || error.message);
        });
    };

    function StarRating({ stars }) {
        const totalStars = 5;
        return (
            <div className="reviews-rating">
                {Array.from({ length: totalStars }, (_, index) => (
                    <span key={index}>{index < stars ? "★" : "☆"}</span>
                ))}
            </div>
        );
    }

    return (
        <div>
            {isSignedIn() && (
                <div id="review-container">
                    <p>Leave a review:</p>
                    <div id="stars-container">
                        {[...Array(5)].map((_, i) => (
                            <input
                                key={i}
                                type="radio"
                                name="stars"
                                value={i + 1}
                                onChange={e => setStars(Number(e.target.value))}
                            />
                        ))}
                    </div>
                    <textarea
                        id="review-text"
                        placeholder="Review text (optional)"
                        onChange={e => setText(e.target.value)}
                    />
                    <input type="button" value="Submit" onClick={submitReview} />
                </div>
            )}
            <h3>See other reviews:</h3>
            <div id="other-reviews">
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div className="reviews-container" key={index}>
                            <div className="reviews-top">
                                <p className="reviews-email">{review.email}</p>
                                <StarRating stars={review.stars} />
                                <p className="reviews-date">{review.date}</p>
                            </div>
                            <p className="reviews-text">{review.text}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-reviews">No reviews yet.</p>
                )}
            </div>
        </div>
    );
}
