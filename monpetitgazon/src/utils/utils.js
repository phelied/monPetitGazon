import moment from "moment";

export function formatDate(dateString) {
  return moment(dateString).format("MMMM DD, YYYY");
}

export function cleanClubId (id) {
    const idWithoutPrefix = id.replace("mpg_", "");
    const cleanedId = idWithoutPrefix.replace(/_/g, " ");
    return cleanedId;
  };