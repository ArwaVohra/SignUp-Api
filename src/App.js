import React from 'react';
import axios from 'axios';


function App() {

  const [state, setState] = React.useState({
    firstname: "",
    lastname: "",
    mobile: "",
  })

  const [errors, setErrors] = React.useState({})

  const onChangeDo = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }



  const formValidation = () => {
    const { firstname, lastname, mobile } = state

    let isValid = true

    const newErrors = {}

    if (!firstname) {
      newErrors.firstname = "Enter your Name please!!!"
      isValid = false
    }
    if (!lastname) {
      newErrors.lastname = "Enter your Last Name please!!!"
      isValid = false
    }
    if (!mobile) {
      newErrors.mobile = "Enter your Mobile Number please!!!"
      isValid = false
    }
    setErrors(newErrors);
    return isValid;


  }

  const onSubmitDo = (e) => {
    e.preventDefault()

    let isValid = formValidation()

    if (isValid) {

      let formdata = new FormData();

      formdata.append('firstname', state.firstname)
      formdata.append('lastname', state.lastname)
      formdata.append('mobile', state.mobile)

      const rawFormData = Object.fromEntries(formdata.entries());



      axios.post('https://api.twelvesprings.uk/v1/signup', rawFormData)
        .then(function (response) {
          console.log(response);
          if (response.data.forcePasswordReset === true) {
            const msg = response.data.message;
            console.log("done")
            alert('Message is :' + msg)

          }
          else {
            console.log("ERRORRRRRRR")
            console.log(JSON.stringify(response.data));

          }
        }).catch(function (response) {
          console.log(response);
          console.log(response.data)
        })
    }


  }

  return (
    <div>
      <center><h1>Signup Form </h1></center><hr/>
      <form onSubmit={onSubmitDo} >
<center>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td><input type="text" className="mb-3 " name="firstname" onChange={onChangeDo} ></input></td>
              <td>  <span style={{ color: "red" }}  >  {errors.firstname}</span> </td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td> <input type="text" className="mb-3"   name="lastname" onChange={onChangeDo} ></input></td>
              <td>  <span style={{ color: "red" }}  >  {errors.lastname}</span> </td>
            </tr>
            <tr>
              <td>Mobile Number</td>
              <td> <input type="text"  className="mb-3"  name="mobile" onChange={onChangeDo} ></input></td>
              <td>  <span style={{ color: "red" }}  >  {errors.mobile}</span> </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" className=" mt-3 btn btn-success" value="submit" ></input>
        </center>
      </form>


    </div>
  )
}

export default App;