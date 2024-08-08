import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function SearchWithFilters() {
  const router = useRouter();

  // get user_uuid from cookies
  const cookies = new Cookies();
  var user_uuid = cookies.get("user_uuid");

  // if user_uuid is not set, set user_uuid to random uuid
  if (!user_uuid) {
    user_uuid = uuidv4();
    cookies.set("user_uuid", user_uuid);
  }

  const getData = (tag) => {
    var url = process.env.NEXT_PUBLIC_API_URL;
    axios
      .get(`${url}/qr/${tag}?user_uuid=${user_uuid}`)
      .then((response) => {
        // set cookies with expiration date of 2 hours
        let expireDate = new Date(
          Date.now() + 7200000 - new Date().getTimezoneOffset() * 60000
        );
        if (response?.data.table_id) {
          cookies.set("table_id", response.data.table_id, {
            expires: expireDate,
          });
        }
        if (response?.data.table_name) {
          cookies.set("table_name", response.data.table_name, {
            expires: expireDate,
          });
        }

        console.log(response.data);
        if (
          response?.data?.data == "There is no active menu at the moment" ||
          response?.data?.results == -1
        ) {
          router.push({
            pathname: `/restaurant-profile/${response.data.point_id}`,
          });
        } else {
          router.push({
            pathname: `/restaurant-profile/${response.data.point_id}/${response.data.data._id}`,
          });
        }
      })
      .catch((error) => {
        router.push({
          pathname: `/scan-menu`,
          query: { wrongTag: "Wrong Tag" },
        });
      });
  };

  useEffect(() => {
    if (router.query.tag) {
      getData(router.query.tag);
    }
  }, [router]);
}
