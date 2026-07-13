import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import "./VerifyEmail.css";
import api from "../services/api";

const VerifyEmail = () => {

  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {

    const verify = async () => {

      try {

        const { data } = await api.get(
          `/auth/verify-email/${token}`
        );

        toast.success(data.message);

        setVerified(true);

        setTimeout(() => {
          navigate("/login");
        }, 3000);

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Verification Failed"
        );

        setVerified(false);

      } finally {

        setLoading(false);

      }

    };

    verify();

  }, [token, navigate]);

  return (

    <div className="verify-page">

      <motion.div
        className="verify-card"
        initial={{ scale: .8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >

        {loading ? (

          <>
            <Loader2
              size={70}
              className="loader"
            />
            <h2>Verifying Email...</h2>
          </>

        ) : verified ? (

          <>
            <CheckCircle
              size={80}
              className="success-icon"
            />

            <h2>Email Verified</h2>

            <p>

              Your account has been verified.

            </p>

            <p>

              Redirecting to Login...

            </p>

          </>

        ) : (

          <>
            <XCircle
              size={80}
              className="error-icon"
            />

            <h2>Verification Failed</h2>

            <p>

              Invalid or expired verification link.

            </p>

          </>

        )}

      </motion.div>

    </div>

  );

};

export default VerifyEmail;