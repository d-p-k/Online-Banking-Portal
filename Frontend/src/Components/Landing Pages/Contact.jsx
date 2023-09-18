// import React from "react";
// import "./Landing.css";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import ErrorMsg from "../ErrorMsg";
// import { ToastContainer, toast } from "react-toastify";
// import * as Yup from "yup";

// function Contact() {
//   const initialValues = {
//     name: "",
//     phone: "",
//     email: "",
//     message: "",
//   };

//   const onSubmit = (values) => {
//     toast.success("Your message has been sent successfully");
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string().required("Name required"),
//     email: Yup.string()
//       .email("Email format is missing")
//       .required("Email required"),
//     phone: Yup.string()
//       .matches(/^\d{10}$/, "Number must be exactly 10 digits")
//       .required("Phone no is required"),
//     message: Yup.string().required("Message required"),
//   });

//   return (
//     <body className="bg-gradient-primary py-5">
//       <div>
//         <div className="row justify-content-center">
//           <div className="col-xl-10 col-lg-12 col-md-9">
//             <div
//               className="card o-hidden border-0 shadow-lg my-5"
//               style={{ width: "70%", margin: "auto" }}
//             >
//               <div className="card-body p-0">
//                 <div className="col">
//                   <div className="p-5">
//                     <div className="text-center">
//                       <h1 className="h4 text-gray-900 mb-4">Contact Us</h1>
//                     </div>
//                     <hr />
//                     <Formik
//                       initialValues={initialValues}
//                       onSubmit={onSubmit}
//                       validationSchema={validationSchema}
//                     >
//                       <Form
//                         className="user"
//                         action="https://formspree.io/f/xeqbqjrl"
//                       >
//                         <div class="row">
//                           <div class="col-lg-6 ">
//                             <div className="form-group">
//                               <Field
//                                 className="form-control mb-2"
//                                 type="text"
//                                 id="name"
//                                 name="name"
//                                 placeholder="Enter your name"
//                               />
//                               <ErrorMessage name="name" component={ErrorMsg} />
//                             </div>

//                             <div className="form-group">
//                               <Field
//                                 className="form-control mb-2"
//                                 type="number"
//                                 id="phone"
//                                 name="phone"
//                                 placeholder="Enter your phone no"
//                               />
//                               <ErrorMessage name="phone" component={ErrorMsg} />
//                             </div>

//                             <div className="form-group">
//                               <Field
//                                 className="form-control mb-2"
//                                 type="text"
//                                 id="email"
//                                 name="email"
//                                 placeholder="Enter your email"
//                               />
//                               <ErrorMessage name="email" component={ErrorMsg} />
//                             </div>
//                           </div>

//                           <div class="col-lg-6">
//                             <div className="form-group">
//                               <Field
//                                 className="form-control mb-2"
//                                 style={{ height: "147px" }}
//                                 as="textarea"
//                                 id="message"
//                                 name="message"
//                                 placeholder="Enter your message"
//                               />
//                               <ErrorMessage
//                                 name="message"
//                                 component={ErrorMsg}
//                               />
//                             </div>
//                           </div>
//                         </div>

//                         <button
//                           type="submit"
//                           className="button rounded-5 bg-primary"
//                         >
//                           SUBMIT
//                         </button>
//                         <hr />
//                       </Form>
//                     </Formik>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <ToastContainer />
//       </div>
//     </body>
//   );
// }

// export default Contact;

import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function Contact() {
  const [state, handleSubmit] = useForm("xeqbqjrl");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  if (state.succeeded) {
    const values = {
      email: email,
      name: name,
    };
    const payload = JSON.stringify(values);
    axios
      .post("http://localhost:9090/login/customer/contact-us", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(values);
        console.log(res.data);
        toast.success(res.data);
      })
      .catch((res) => console.log(res));
  }

  return (
    <body className="bg-gradient-primary py-5">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div
            className="card o-hidden border-0 shadow-lg my-5"
            style={{ width: "60%", margin: "auto" }}
          >
            <div className="card-body p-0">
              <div className="col">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Contact Us</h1>
                  </div>
                  <hr />
                  <form onSubmit={handleSubmit}>
                    <div class="row">
                      <div class="col-lg-6 ">
                        <div className="form-group text-left">
                          <input
                            id="name"
                            type="text"
                            name="Name"
                            className="form-control mb-2"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                          />
                          <ValidationError
                            prefix="name"
                            field="name"
                            errors={state.errors}
                          />
                        </div>

                        <div className="form-group text-left">
                          <input
                            id="phone"
                            type="number"
                            name="Phone No"
                            className="form-control mb-2"
                            placeholder="Enter your phone number"
                          />
                          <ValidationError
                            prefix="phone"
                            field="phone"
                            errors={state.errors}
                          />
                        </div>

                        <div className="form-group text-left">
                          <input
                            id="email"
                            type="email"
                            name="Email"
                            className="form-control mb-2"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                          />
                          <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                          />
                        </div>
                      </div>

                      <div class="col-lg-6 ">
                        <div className="form-group text-left">
                          <textarea
                            id="message"
                            name="Message"
                            className="form-control mb-2"
                            placeholder="Enter your message"
                            style={{ height: "147px" }}
                          />
                          <ValidationError
                            prefix="Message"
                            field="message"
                            errors={state.errors}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="button rounded-5 bg-primary"
                      disabled={state.submitting}
                    >
                      {state.submitting && (
                        <i className="fa fa-spin">
                          <i className="bi bi-arrow-clockwise fs-6" />
                        </i>
                      )}{" "}
                      {state.submitting ? "SUBMITING...." : "SUBMIT"}
                    </button>
                  </form>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </body>
  );
}

export default Contact;
