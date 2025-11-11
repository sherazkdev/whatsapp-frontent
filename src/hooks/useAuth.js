import { useState, useEffect } from "react";
import { HandleCheckLoggedInUser } from "../api/Instance";

const useAuth = () => {
  const [Data, SetData] = useState({
    FindUserLoading: false,
    FindUserError: null,
    FindedUser: null,
  });

  useEffect(() => {

    const checkUser = async () => {
      SetData({ FindUserLoading: true, FindUserError: null, FindedUser: null });

      try {
        const res = await HandleCheckLoggedInUser();

        if (res.data?.statusCode === 200 && res.data?.success === true) {
          return SetData({ FindUserLoading: false, FindUserError: null, FindedUser: res.data.data });
        } else {
          return SetData({ FindUserLoading: false, FindUserError: "Invalid response", FindedUser: null });
        }
      } catch (err) {
        SetData({
          FindUserLoading: false,
          FindUserError: err?.response?.data || err,
          FindedUser: null,
        });
      }
    };

    checkUser();
  }, []);

  return Data;
};

export default useAuth;
