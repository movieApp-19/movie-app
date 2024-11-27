import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../context/useUser.js";
import "./MovieReview.css";

const URL = process.env.REACT_APP_API_URL;

export default function MovieReview({ movieId }) {
    const { user } = useUser();
    const [stars, setStars] = useState(0);
    const [text, setText] = useState("");

    const submitReview = () => {
        axios.post(URL + "/review/create", {
            id: movieId,
            stars: stars,
            text: text,
            token: user.token,
            user: user.id
        })
        .then((response) => {
            console.log(response);

            // todo: Update review list

            document.querySelector("#review-text").value = "";
            document.querySelector("#stars-container").children[stars - 1].checked = false;
            setText("");
            setStars(0);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div id="review-container">
            <p>Leave a review:</p>

            <div id="stars-container">
                <input
                    type="radio"
                    name="stars"
                    value="1"
                    onChange={e => setStars(Number(e.target.value))}
                />
                <input
                    type="radio"
                    name="stars"
                    value="2"
                    onChange={e => setStars(Number(e.target.value))}
                />
                <input
                    type="radio"
                    name="stars"
                    value="3"
                    onChange={e => setStars(Number(e.target.value))}
                />
                <input
                    type="radio"
                    name="stars"
                    value="4"
                    onChange={e => setStars(Number(e.target.value))}
                />
                <input
                    type="radio"
                    name="stars"
                    value="5"
                    onChange={e => setStars(Number(e.target.value))}
                />
            </div>

            <textarea
                id="review-text"
                placeholder="Review text (optional)"
                onChange={e => setText(e.target.value)}
            />

            <input
                type="button"
                value="Submit"
                onClick={submitReview}
            />
        </div>
    );
}
