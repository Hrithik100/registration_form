import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import statesData from "../../State.json";
import axios from "axios";
import "./style.scss";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup.number().typeError("Age is required").required("Age is required"),
  gender: yup
    .string()
    .oneOf(["female", "male", "other"], "Please select a valid gender")
    .required("Gender is required"),
  mobile: yup
    .string()
    .matches(/^[6789]\d{9}$/, "Mobile number must be a valid Indian number"),
  idtype: yup.string(),
  idnumber: yup.string().when("idtype", {
    is: "Aadhar",
    then: () =>
      yup.string().matches(/^\d{12}$/, "Must be a 12-digit numeric string"),
    otherwise: () =>
      yup
        .string()
        .matches(/^[a-zA-Z0-9]{10}$/, "Must be a 10-digit alphanumeric string"),
  }),
  emergencyNumber: yup
    .string()
    .matches(/^[6789]\d{9}$/, "Emergency number must be a valid Indian number"),
  guardianEmail: yup.string().email("Invalid email address"),
});

const Registration = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [city, setCity] = useState([]);
  const [cityid, setCityid] = useState("");

  const handlestate = (e) => {
    const getstateId = e.target.value;
    // console.log(getstateId)

    const getcitydata = statesData.find(
      (state) => state.state_name === getstateId
    ).cities;
    setCity(getcitydata);
  };

  const handlecity = (e) => {
    const cityId = e.target.value;
    // console.log(cityId)
    setCityid(cityId);
  };
  const onInvalid = (errors) => console.error(errors);

  const onSubmit = (data) => {
    // const guardianFullName = data.guardianNameLabel + " " + data.guardianName;

    // const dataSubmit = { ...data, guardianFullName };

    axios
      .post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/user/registration`, data)
      .then((response) => {
        console.log(response);
        toast.success("User record saved successfully");
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(dataSubmit)
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="formContainer"
    >
      <div className="personalDetails">
        <div className="heading">
          <h1>Personal Details</h1>
        </div>
        <div className="personalItems">
          <div className="personalItem">
            <label htmlFor="name">
              Name<span>*</span>
            </label>
            <div className="idItem">
              <input
                type="text"
                id="name"
                {...register("name")}
                placeholder="Enter Name"
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
          </div>
          <div className="personalItem">
            <label htmlFor="age">
              Age<span>*</span>
            </label>
            <div className="idItem">
              <input
                type="number"
                id="age"
                {...register("age")}
                placeholder="Age in Years"
              />
              {errors.age && <p>{errors.age.message}</p>}
            </div>
          </div>
          <div className="personalItem">
            <label htmlFor="gender">
              Sex<span>*</span>
            </label>
            <div className="idItem">
              <select {...register("gender")} defaultValue="">
                <option value="" disabled hidden>
                  Enter Sex
                </option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p>{errors.gender.message}</p>}
            </div>
          </div>
          <div className="personalItem">
            <label htmlFor="mobile">
              Mobile<span>*</span>
            </label>
            <div className="idItem">
              <input
                type="tel"
                id="mobile"
                {...register("mobile")}
                placeholder="Enter Mobile"
              />
              {errors.mobile && <p>{errors.mobile.message}</p>}
            </div>
          </div>
          <div className="personalItem">
            <div>
              <label htmlFor="idtype">
                Govt issued ID<span>*</span>
              </label>
            </div>
            <div className="idItem">
              <select {...register("idtype")}>
                <option value="Aadhar">Aadhar</option>
                <option value="Pan">PAN</option>
              </select>
              {errors.idtype && <p>{errors.idtype.message}</p>}
              <input
                type="text"
                id="idnumber"
                {...register("idnumber")}
                placeholder="Enter Govt ID"
              />
              {errors.idnumber && <p>{errors.idnumber.message}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="personalDetails">
        <div className="heading">
          <h1>Contact Details</h1>
        </div>
        <div className="personalItems">
          <div className="personalItem">
            <label htmlFor="guardianNameLabel">Guardian Details</label>
            <div className="idItem">
              <select {...register("guardianNameLabel")} defaultValue="">
                <option value="" disabled hidden>
                  Enter Label
                </option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
              </select>
              <input
                type="text"
                id="guardianName"
                {...register("guardianName")}
                placeholder="Enter Guardian Name"
              />
            </div>
          </div>
          <div className="personalItem">
            <label htmlFor="guardianEmail">Email</label>
            <div className="idItem">
              <input
                type="email"
                id="guardianEmail"
                {...register("guardianEmail")}
                placeholder="Enter Email"
              />
            </div>
          </div>
          <div className="personalItem">
            <label htmlFor="emergencyNumber">
              Emergency Contact Number<span>*</span>
            </label>
            <div className="idItem">
              <input
                type="tel"
                id="emergencyNumber"
                {...register("emergencyNumber")}
                placeholder="Enter Emergency Mobile"
              />
              {errors.emergencyNumber && (
                <p>{errors.emergencyNumber.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="personalDetails">
        <div className="heading">
          <h1>Address Details</h1>
        </div>
        <div className="personalItems">
          <div className="personalItem">
            <label htmlFor="address">Address</label>
            <div className="idItem">
              <input
                type="text"
                id="address"
                {...register("address")}
                placeholder="Enter Address"
              />
            </div>
          </div>
          <div className="personalItem">
            <label htmlFor="state">State</label>
            <div className="idItem">
              <select
                {...register("state")}
                onChange={(e) => handlestate(e)}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Enter State
                </option>
                {statesData.map((item) => (
                  <option value={item.state_name} key={item.state_id}>
                    {item.state_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="personalItem">
            <label htmlFor="city">City</label>
            <div className="idItem">
              <select
                {...register("city")}
                onChange={(e) => handlecity(e)}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Enter City
                </option>
                {city.map((item) => (
                  <option value={item.city_name} key={item.city_id}>
                    {item.city_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="personalItem">
            <label htmlFor="country">Country</label>
            <div className="idItem">
              <select {...register("country")}>
                <option value="India">India</option>
              </select>
            </div>
          </div>
          <div className="personalItem">
            <label htmlFor="pincode">Pincode</label>
            <div className="idItem">
              <input
                type="number"
                id="pincode"
                {...register("pincode")}
                placeholder="Enter pincode"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="personalDetails">
        <div className="heading">
          <h1>Other Details</h1>
        </div>
        <div className="personalItems">
          <div className="personalItem">
            <label htmlFor="occupation">Occupation</label>
            <div className="idItem">
              <input
                type="text"
                id="occupation"
                {...register("occupation")}
                placeholder="Enter occupation"
              />
            </div>
          </div>
          <div className="personalItem">
            <label htmlFor="religion">Religion</label>
            <div className="idItem">
              <select {...register("religion")} defaultValue="">
                <option value="" disabled hidden>
                  Enter Religion
                </option>
                <option value="hinduism">Hinduism</option>
                <option value="islam">Islam</option>
                <option value="christianity">Christianity</option>
                <option value="sikhism">Sikhism</option>
                <option value="buddism">Buddhism</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="personalItem">
            <label htmlFor="maritalStatus">Marital Status</label>
            <div className="idItem">
              <select {...register("maritalStatus")} defaultValue="">
                <option value="" disabled hidden>
                  Enter Martial Status
                </option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="devorced">Devorced</option>
                <option value="widow">Widow</option>
              </select>
            </div>
          </div>
          <div className="personalItem">
            <label htmlFor="bloodGroup">Blood Group</label>
            <div className="idItem">
              <select {...register("bloodGroup")} defaultValue="">
                <option value="" disabled hidden>
                  Group
                </option>
                <option value="groupA">Group A</option>
                <option value="groupB">Group B</option>
                <option value="groupO">Group O</option>
                <option value="groupAB">Group AB</option>
              </select>
            </div>
          </div>
          <div className="personalItem">
            <label htmlFor="nationality">Nationality</label>
            <div className="idItem">
              <select {...register("nationality")}>
                <option value="India">India</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="btn">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Registration;
