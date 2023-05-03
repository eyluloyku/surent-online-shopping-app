import React from "react";

function SignUpInfo({ formData, setFormData }) {
  return (
    <div className="sign-up-container">
      <input className="paymentFormInput"
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(event) =>
          setFormData({ ...formData, name: event.target.value })
        }
      />
      <input className="paymentFormInput"
        type="text"
        placeholder="Lastname"
        value={formData.lastName}
        onChange={(event) =>
          setFormData({ ...formData, lastName: event.target.value })
        }
      />
      <input className="paymentFormInput"
        type="text"
        placeholder="Email..."
        value={formData.email}
        onChange={(event) =>
          setFormData({ ...formData, email: event.target.value })
        }
      />
      <input className="paymentFormInput"
        type="password"
        placeholder="Password..."
        value={formData.password}
        onChange={(event) =>
          setFormData({ ...formData, password: event.target.value })
        }
      />
    </div>
  );
}

export default SignUpInfo;