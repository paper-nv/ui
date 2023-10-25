import "./SignUp.css";
// import Google from "../../assets/icons/Google";
import "animate.css";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Card, Modal, Result, Button } from "antd";
import PaperLogo from "../../assets/logo/Paper";
import Success from "../../assets/icons/success";
// import { useGoogleLogin } from "@react-oauth/google";

import authServices from "../../services/auth/authServices";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
  SmileTwoTone,
} from "@ant-design/icons";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [authModal, setAuthModal] = useState(false);

  const schema = yup.object().shape({
    fullname: yup
      .string()
      .min(4, "Full name must be at least 4 characters")
      .required("Full name is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Must be a valid email"
      )
      .min(3, "Email must be at least 3 characters")
      .max(255)
      .required("Email address is required"),
    password: yup
      .string()
      .min(8, "Password must be a minimum of 8 characters")
      .max(50)
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { isLoading, mutate } = useMutation(
    (payload) => authServices.signup(payload),
    {
      onError: (error) => {
        toast.error(error.response.data.message);
      },
      onSuccess: (response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response?.data?.token);
          setAuthModal(true);
        } else {
          toast.error("something went wrong. Please wait awhile and try again");
        }
      },
    }
  );

  // const mutation = useMutation(
  //   (payload) => authServices.googleSignin(payload),
  //   {
  //     onError: (error) => {
  //       toast.error(error.response.data.errors);
  //     },
  //     onSuccess: ({ status, data }) => {
  //       if (status === 200) {
  //         localStorage.setItem("token", data?.token);
  //         setModalOpen(true);
  //       } else {
  //         toast.error("An error occurred, please try again later");
  //       }
  //     },
  //   }
  // );
  return (
    <div>
      <Modal
        open={authModal}
        footer={null}
        header={null}
        closable={false}
        // onOk={handleOk}
        // onCancel={handleCancel}
      >
        <Result
          icon={
            <div className="flex justify-center ">
              <Success height={200} />
            </div>
          }
          title="Your're set and ready for action!!"
          extra={
            <Link to="../accounts/dashboard">
              <Button type="primary">Let's Proceed</Button>
            </Link>
          }
        />
      </Modal>
      <div className="lg:grid grid-cols-3 bg-slate-100 justify-center  animate__animated animate__slideInUp">
        <div className="col-span-1"></div>
        <div className="col-span-1 py-32  xl:px-10 3xl:px-24">
          <form
            onSubmit={handleSubmit((payload) => mutate(payload))}
            className=""
          >
            <Card className="bg-white auth__card text-slate-700 rounded-2xl ">
              <div className="">
                <Link to={"../"} className="flex ">
                  <PaperLogo className="text-blue-600" height="60" />
                </Link>
                <h3 className="text-2xl font-semibold text-slate-700 mt-5">
                  Create an account
                </h3>
                <p className="text-slate-500 text-sm mb-10">
                  Fill these out to get started
                </p>
              </div>
              <div className="form-group">
                <label className="">Name</label>
                <input
                  {...register("fullname")}
                  placeholder="Enter Full name"
                />
                {<h2 className="error-message">{errors?.fullname?.message}</h2>}
              </div>

              <div className="form-group">
                <label className="">Email address</label>
                <input
                  placeholder="Enter email address"
                  {...register("email")}
                />
                {<h2 className="error-message">{errors?.email?.message}</h2>}
              </div>

              <div className="form-group ">
                <label className="">Password</label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  {...register("password")}
                  placeholder="password"
                  {...register("password")}
                />
                <div className="pl-[90%]">
                  <span
                    className="text-base muted hover:text-blue-800 absolute mt-[-34px]"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <EyeInvisibleOutlined />
                    ) : (
                      <EyeOutlined />
                    )}
                  </span>
                </div>
                {<h2 className="error-message">{errors?.password?.message}</h2>}
              </div>

              <div className="mt-5">
                {isLoading ? (
                  <button type="button" className="btn primary block py-4">
                    {" "}
                    <LoadingOutlined />{" "}
                  </button>
                ) : (
                  <button type="submit" className="btn primary block py-4">
                    Sign up
                  </button>
                )}
              </div>
              <p className="mt-[20px]">
                have an account? <Link to="/sign-in">Sign in</Link>
              </p>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
