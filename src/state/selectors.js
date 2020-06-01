import { selector } from "recoil";
import getSymbolFromCurrency from "currency-symbol-map";
import moment from "moment";
import country from "country-js";
import { titleCase } from "../utils/functions";

export const getEventData = selector({
  key: "EventData",
  get: async ({ get }) => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/get-event`
        );
        if (response.error) {
          throw response.error;
        }
        const json = await response.json();
        resolve({
          ...json,
          currencySembol: getSymbolFromCurrency(json.event_currency),
          countryName: titleCase(
            [
              ...new Set(
                country.search(json?.venue?.event_venue_country).map((i) => {
                  return i.name;
                })
              ),
            ].join()
          ),
          date: {
            start: moment(json.event_start_date).format(json.event_date_format),
            end: moment(json.event_end_date).format(json.event_date_format),
          },
        });
      }, 50);
    });
  },
});
