/**
 * Summary.
 *
 * This helper, fetchEvents, gets the events list asynchronously and manipulates it.
 *
 *
 */

import axios from "axios";
import moment from "moment";
import _ from "lodash";

const MLB_URL = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=MLB&apikey=5fXAiyK6eWahj6Xoz4YhRTnhpqWBeKzp`;
const NFL_URL = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=NFL&apikey=5fXAiyK6eWahj6Xoz4YhRTnhpqWBeKzp`;

let MLBList = [];
let NFLList = [];
let eventList = [];
const dateFormat = "DD MMMM YYYY, HH:mm";

const manipulateMLBList = data => {
  console.log("manipulateMLBList içi data:");
  console.log(data);

  console.log("manipulateMLBList içi data[0]:");
  console.log(data[0]);

  console.log("manipulateMLBList içi data[0].events:");
  console.log(data[0].events);

  MLBList = data[0].events.map(item => {
    let eventType = item.classifications["0"].subGenre.name;
    let eventName = item.name;
    let eventDateTime = moment(item.dates.start.dateTime).format(dateFormat);
    let eventImageUrl = item.images["2"].url;
    let eventTicketBuyUrl = item.url;
    let eventPublicSalesDates =
      moment(item.sales.public.startDateTime).format(dateFormat) +
      " - " +
      moment(item.sales.public.endDateTime).format(dateFormat);
    let eventPriceRange = item.priceRanges
      ? item.priceRanges["0"].min +
        " - " +
        item.priceRanges["0"].max +
        " " +
        item.priceRanges["0"].currency
      : "N/A";

    return {
      eventType,
      eventName,
      eventDateTime,
      eventImageUrl,
      eventTicketBuyUrl,
      eventPriceRange,
      eventPublicSalesDates
    };
  });
};

const manipulateNFLList = data => {
  NFLList = data[0].events.map(item => {
    let eventType = item.classifications["0"].subGenre.name;
    let eventName = item.name;
    let eventDateTime = moment(item.dates.start.dateTime).format(dateFormat);
    let eventImageUrl = item.images["2"].url;
    let eventTicketBuyUrl = item.url;
    let eventPublicSalesDates =
      moment(item.sales.public.startDateTime).format(dateFormat) +
      " - " +
      moment(item.sales.public.endDateTime).format(dateFormat);
    let eventPriceRange = item.priceRanges
      ? item.priceRanges["0"].min +
        " - " +
        item.priceRanges["0"].max +
        " " +
        item.priceRanges["0"].currency
      : "N/A";

    return {
      eventType,
      eventName,
      eventDateTime,
      eventImageUrl,
      eventTicketBuyUrl,
      eventPriceRange,
      eventPublicSalesDates
    };
  });
};

const fetchEvents = async page => {
  const MLBResponse = await axios.get(MLB_URL);

  if (MLBResponse.status >= 400) {
    throw new Error(MLBResponse.errors);
  }
  console.log("fetching MLBResponse.....");
  console.log(MLBResponse.data);

  manipulateMLBList([MLBResponse.data._embedded]);

  const NFLResponse = await axios.get(NFL_URL);
  if (NFLResponse.status >= 400) {
    throw new Error(NFLResponse.errors);
  }

  console.log("fetching NFLResponse.....");
  console.log(NFLResponse.data);

  manipulateNFLList([NFLResponse.data._embedded]);

  let eventList2 = MLBList.concat(NFLList);
  eventList = _.sortBy(eventList2, o => o.departure);

  console.log("nihai eventList");
  console.log(eventList);

  return eventList;
};

export { fetchEvents };
