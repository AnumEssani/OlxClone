import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import Reducer from './Store/Reducer';



const middleWare = [thunk];
const initialState = {
  nav: [
    { id: 1, label: 'Mobile Phones' },
    { id: 2, label: 'Cars' },
    { id: 3, label: 'Motorcycles' },
    { id: 4, label: 'Houses' },
    { id: 5, label: 'TV-Video-Audio' },
    { id: 6, label: 'Tablets' },
    { id: 7, label: 'Land & Plots' }],
  data: [],
  images: [],
  users: [],
  isDataLoading: true,
  states: [],
  detailAddViewData: [],
  detailAddImageData: [],
  isLogin: false,
  user: [],
  catorgery: [
    "Mobiles",
    "Vehicles",
    "Property for Sale",
    "Property for Rent",
    "Electronics & Home Appliances",
    "Bikes",
    "Business, Industrial & Agriculture",
    "Services",
    "Jobs",
    "Animals",
    "Furniture & Home Decor",
    "Fashion & Beauty",
    "Books, Sports & Hobbies",
    "Kids"
  ],
  catIcon: [
    "fas fa-mobile-alt",
    "fas fa-car-alt",
    "fas fa-home",
    "fas fa-home",
    "fas fa-desktop",
    "fas fa-motorcycle",
    "fas fa-building",
    "fas fa-concierge-bell",
    "fas fa-briefcase",
    "fas fa-dog",
    "fas fa-couch",
    "fas fa-tshirt",
    "far fa-futbol",
    "fas fa-baby"
  ],
  subCat: {
    Mobiles: [
      "Tablets",
      "Accessories",
      "Mobile Phones"
    ],
    Vehicles: [
      "Car",
      "Car on Installment",
      "Car Accessories",
      "Spare Parts",
      "Buses, Vans & Trucks",
      "Rickshaw & Chingchi",
      "Other Vehicles",
      "Boats",
      "Tractors & Trailers"
    ],
    PropertyForSale: [
      "Land & Plots",
      "Houses",
      "Apartment & Flats",
      "Shop- Offices - Comertial Space"
    ],
    PropertyForRent: [
      "Houses",
      "Apartments & Flats",
      "Portions & Floor",
      "Shop- Offices - Comertial Space",
      "Rooms",
      "Roommates & Paying Guests",
      "Vacation Rentals - Guest Houses",
      "Land & Plots"
    ],
    ElectronicsHomeAppliances: [
      "Computers & Accessories",
      "TV - Video - Audio",
      "Cameras & Accessories",
      "Games & Entertainment",
      "Other Home Appliances",
      "Generators, UPS & Power Solutions",
      "Kitchen Appliances",
      "AC & Coolers",
      "Fridges & Freezers",
      "Washing Machines & Dryers"
    ],
    Bikes: [
      "Motorcycles",
      "Spare Parts",
      "Bicycles",
      "ATV & Quads",
      "Scooters"
    ],
    BusinessIndustrialAgriculture: [
      "Business for Sale",
      "Food & Restaurants",
      "Trade & Industrial",
      "Construction & Heavy Machinery",
      "Agriculture",
      "Other Business & Industry",
      "Medical & Pharma"
    ],
    Services: [
      "Education & Classes",
      "Travel & Visa",
      "Car Rental",
      "Drivers & Taxi",
      "Web Development",
      "Other Services",
      "Electronics & Computer Repair",
      "Event Services",
      "Health & Beauty",
      "Maids & Domestic Help",
      "Movers & Packers",
      "Home & Office Repair",
      "Catering & Restaurant",
      "Farm & Fresh Food"
    ],
    Jobs: [
      "Online",
      "Marketing",
      "Advertising & PR",
      "Education",
      "Customer Service",
      "Sales",
      "IT & Networking",
      "Hotels & Tourism",
      "Clerical & Administration",
      "Human Resources",
      "Accounting & Finance",
      "Manufacturing",
      "Medical",
      "Domestic Staff",
      "Part - Time",
      "Other Jobs"
    ],
    Animals: [
      "Fish & Aquariums",
      "Birds",
      "Hens & Aseel",
      "Cats",
      "Dogs",
      "Livestock",
      "Horses",
      "Pet Food & Accessories",
      "Other Animals"
    ],
    FurnitureHomeDecor: [
      "Sofa & Chairs",
      "Beds & Wardrobes",
      "Home Decoration",
      "Tables & Dining",
      "Garden & Outdoor",
      "Painting & Mirrors",
      "Rugs & Carpets",
      "Curtains & Blinds",
      "Office Furniture",
      "Other Household Items"
    ],
    FashionBeauty: [
      "Accessories",
      "Clothes",
      "Footwear",
      "Jewellery",
      "Make Up",
      "Skin & Hair",
      "Watches",
      "Wedding",
      "Lawn & Pret",
      "Couture",
      "Other Fashion"
    ],
    BooksSportsHobbies: [
      "Books & Magazines",
      "Musical Instruments",
      "Sports Equipment",
      "Gym & Fitness",
      "Other Hobbies"
    ],
    Kids: [
      "Kids Furniture",
      "Toys",
      "Prams & Walkers",
      "Swings & Slides",
      "Kids Bikes",
      "Kids Accessories"
    ]
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  Reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
