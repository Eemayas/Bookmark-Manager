"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PopularLinksType } from "./types";
import { AppDispatch, RootState } from "@/store";
import {
  addLink,
  deleteLink,
  fetchLinks,
  updateLink,
} from "./store/popularLinksSlice";

const PopularLinks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.popularLinks,
  );

  useEffect(() => {
    dispatch(fetchLinks({}));
  }, [dispatch]);

  const handleAddLink = () => {
    dispatch(
      addLink({
        category: "stock_photos",
        newLink: {
          name: "Another Photo Site",
          url: "https://anotherphotosite.com",
          tags: ["Stock Photos"],
          categories: "/Stock Photos",
        },
      }),
    );
  };

  const handleDeleteLink = (category: string, id: number) => {
    dispatch(deleteLink({ category, id }));
  };

  const handleUpdateLink = (category: string, id: number) => {
    dispatch(
      updateLink({
        category,
        id,
        updateData: { name: "Updated Name" },
      }),
    );
  };

  return (
    <div>
      <h2>Popular Links</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {Object.entries(data).map(([category, links]) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {links.map((link: any) => (
              <li key={link.id}>
                {link.name} -{" "}
                <button
                  onClick={() => handleDeleteLink(category, link.id ?? 0)}
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdateLink(category, link.id ?? 0)}
                >
                  Update
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={handleAddLink}>Add Link</button>
    </div>
  );
};

export default PopularLinks;
