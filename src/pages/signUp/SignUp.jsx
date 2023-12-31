import "./SignUp.css";
import "animate.css";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Card, Modal, Result, Button } from "antd";
import Success from "../../assets/icons/success";
import PaperIcon from "../../assets/logo/paperIcon.jsx";
import Google from "../../assets/icons/Google";
import { useGoogleLogin } from "@react-oauth/google";

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
  const [gLoading, setgLoading] = useState(false);

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

  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation(
    (payload) => authServices.signup(payload),
    {
      onError: (error) => {
        toast.error(
          error.response.data.message ||
            "something went wrong. Please wait awhile and try again"
        );
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

  const mutation = useMutation((payload) => authServices.google(payload), {
    onError: (error) => {
      toast.error(
        error.response.data.message ||
          "something went wrong. Please wait awhile and try again"
      );
    },
    onSuccess: ({ status, data }) => {
      console.log(data);
      if (status === 200) {
        localStorage.setItem("token", data?.token);
        navigate("../accounts/dashboard");
      } else {
        toast.error("something went wrong. Please wait awhile and try again");
      }
    },
  });

  const handleAuthWithGoogle = useGoogleLogin({
    onSuccess: (response) => mutation.mutate(response),
  });

  return (
    <div>
      <title>Sign up | Payper</title>

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
      <div className="lg:grid grid-cols-3 justify-center  animate__animated animate__slideInUp">
        <div className="col-span-1"></div>
        <div className="col-span-1  py-10  xl:px-10 3xl:px-24">
          <form
            onSubmit={handleSubmit((payload) => mutate(payload))}
            className="p-4"
          >
            <Card className="bg-white p-4 auth__card rounded-2xl text-slate-700 ">
              <div className="">
                <Link to="../" className="flex items-center gap-2">
                  <PaperIcon className="text-blue-600" height="40" />
                </Link>
                <h3 className="text-2xl font-semibold text-slate-700 mt-5">
                  Sign up
                </h3>
                <p className="text-slate-500 text-sm mb-10">
                  Create a new payper account.
                </p>
              </div>

              <Button
                className="w-full h-10 flex items-center justify-center"
                icon={<Google height={14} />}
                onClick={() => {
                  setgLoading(true);
                  handleAuthWithGoogle();
                }}
              >
                {gLoading ? <LoadingOutlined /> : "Continue with Google"}
              </Button>

              <p className="py-6 text-slate-400 text-center font-thin">OR</p>
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

              <div className="mt-5 flex justify-end">
                {isLoading ? (
                  <Button
                    type="primary"
                    htmlType="button"
                    className="primary w-full h-10"
                  >
                    {" "}
                    <LoadingOutlined />{" "}
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full h-10"
                  >
                    Sign up
                  </Button>
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
