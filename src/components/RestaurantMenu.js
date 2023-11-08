import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MENU_API } from "../constants";
import { MenuShimmer, ShimmerUI } from "./ShimmerUI";

const RestaurantMenu = () => {
  const [data, setData] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [show, setShow] = useState(false);
  const { resId } = useParams();

  const onChange = () => {
    setShow(!show);
  };

  useEffect(() => {
    fetchResData();
  }, []);

  const fetchResData = async () => {
    const response = await fetch(MENU_API + resId);
    const json = await response.json();
    const restaurantData =
      json?.data?.cards
        ?.map((x) => x.card)
        ?.find(
          (x) =>
            x &&
            x.card["@type"] ===
              "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
        )?.card?.info || null;
    setData(restaurantData);
    const menuData =
      json?.data?.cards
        .find((x) => x.groupedCard)
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
        ?.filter(
          (x) =>
            x["@type"] ==
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        )
        ?.map((x) => x.itemCards)
        .flat()
        .map((x) => x.card?.info) || [];
    setMenuItems(menuData);
  };

  //   console.log(data);
  console.log(menuItems);

  if (data === null) {
    return <MenuShimmer />;
  }

  const { name, cuisines, avgRating, sla, areaName, totalRatingsString } = data;

  const offers = data.aggregatedDiscountInfo.descriptionList;

  const menuFilter = () => {
    if (show) {
      return menuItems.filter(
        (item) => item.itemAttribute.vegClassifier === "VEG"
      );
    } else {
      return menuItems.filter((item) => item);
    }
  };

  //   console.log(menuFilter());

  return (
    <div className="menu-container">
      <div className="container">
        <div className="text-container">
          <div>
            <h1 className="text">{name}</h1>
            <span className="pre-text">👨‍🍳{cuisines.join(", ")}</span>
            <br />
            <span className="pre-text">
              ↪ {areaName}, {sla.slaString}
            </span>
          </div>
          <div className="rating-container">
            <p className="rating-number">⭐ {avgRating}</p>
            <p className="rating-text">®{totalRatingsString}</p>
          </div>
        </div>
        <hr className="horizontal" />
        <div className="fee-container">
          <p className="fee-text">
            ❗Far (4 kms) | Additional delivery fee will apply
          </p>
        </div>
      </div>
      <div className="offer-container">
        <div className="offers">
          <p className="offer-text">🔄 {offers[0].meta}</p>
        </div>
        <div className="offers">
          <p className="offer-text">🔄 {offers[1].meta}</p>
        </div>
      </div>

      <div className="veg-button">
        <label htmlFor="veg" className="check-veg">
          Veg Only
        </label>
        <input type="checkbox" checked={show} name="veg" onChange={onChange} />
      </div>
      <hr className="veg-hr" />
      <h1 className="menu-title">Recommmended ({menuItems.length})</h1>
      <div className="itemcards-container">
        {menuFilter().map((item, index) => {
          const {
            name,
            defaultPrice,
            price,
            description,
            imageId,
            itemAttribute,
          } = item;
          const { vegClassifier } = itemAttribute;

          return (
            <div
              className="menu-desc-container"
              key={item?.imageId === imageId ? index : item?.imageId}
            >
              <div>
                <h1 className="menu-name">
                  {name}
                  <span className={vegClassifier === "VEG" ? "green" : "red"}>
                    <sup>{vegClassifier === "VEG" ? "VEG" : "NON-VEG"}</sup>
                  </span>
                </h1>
                <p className="menu-text">
                  Rs. {defaultPrice / 100 || price / 100}
                </p>
                <p className="menu-desc">{description}</p>
              </div>
              <div className="image">
                <img
                  alt={name}
                  className="menu-img"
                  src={
                    item.imageId
                      ? `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.imageId}`
                      : "https://cdn-images-1.medium.com/max/1600/1*oj-8G0PTm_zsbzryG1SzQA.png"
                  }
                />
                <button className="add-cart">Add</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
