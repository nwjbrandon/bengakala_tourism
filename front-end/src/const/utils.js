import _ from "lodash";

export const insert = (dest, payload) => {
    const payloadKey = _.keys(payload)[0];
    dest[payloadKey] = payload[payloadKey];
};