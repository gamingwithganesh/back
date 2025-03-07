import { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [user, setuser] = useState({
    FirstName: "",
    Subject: "",
    Email: "",
    Message: "",
  });

  let name, value;

  const Getdata = (event) => {
    name = event.target.name;

    value = event.target.value;

    setuser({ ...user, [name]: value });
  };

  const Send = (e) => {
    const { name, Subject, Email, Message } = user;

    e.preventDefault();

    if (name && Subject && Email && Message) {
      const response = fetch(
        "https://database-da553-default-rtdb.firebaseio.com/Message.json",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            FirstName: name,
            Subject: Subject,
            Email: Email,
            Message: Message,
          }),
        }
      );
      console.log(response.json);
      if (response) {
        alert("Thank You For Message Us");
        return setuser({
          FirstName: "",
          Subject: "",
          Email: "",
          Message: "",
        });
      }
    } else {
      alert("Please Fill The Data");
    }
  };

  return (
    <div className="ContactForm">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div className="contactForm">
              <form id="contact-form">
                {/* Row 1 of form */}
                <div className="row formRow">
                  <div className="col-6">
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={Getdata}
                      className="form-control formInput"
                      placeholder="Name"
                    ></input>
                  </div>
                  <div className="col-6">
                    <input
                      type="email"
                      name="Email"
                      value={user.Email}
                      onChange={Getdata}
                      className="form-control formInput"
                      placeholder="Email address"
                    ></input>
                  </div>
                </div>
                {/* Row 2 of form */}
                <div className="row formRow">
                  <div className="col">
                    <input
                      type="text"
                      name="Subject"
                      value={user.Subject}
                      onChange={Getdata}
                      className="form-control formInput"
                      placeholder="Subject"
                    ></input>
                  </div>
                </div>
                {/* Row 3 of form */}
                <div className="row formRow">
                  <div className="col">
                    <textarea
                      rows={3}
                      name="Message"
                      value={user.Message}
                      onChange={Getdata}
                      className="form-control formInput"
                      placeholder="Message"
                    ></textarea>
                  </div>
                </div>

                <button
                  className="submit-btn btn btn-primary"
                  type="button"
                  onClick={Send}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
