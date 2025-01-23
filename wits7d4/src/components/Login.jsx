import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormFeedback } from 'reactstrap';
import axios from 'axios';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must be at least 4 characters long',
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    terms: false,
  });

  const history = useHistory();

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;
    setForm({ ...form, [name]: value });

    if (name === 'email') {
      if (value.includes('.com.tr')) {
        setErrors({ ...errors, [name]: false });
      } else setErrors({ ...errors, [name]: true });
    }

    if (name === 'password') {
      if (value.length >= 4) {
        setErrors({ ...errors, [name]: false });
      } else setErrors({ ...errors, [name]: true });
    }

    if (name === 'terms') {
      if (value === true) {
        setErrors({ ...errors, [name]: false });
      } else setErrors({ ...errors, [name]: true });
    }
  };

  useEffect(() => {
    if (
      form.email.includes('.com.tr') &&
      form.password.length >= 4 &&
      form.terms
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      axios
        .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
        .then((res) => {
          const user = res.data.find(
            (item) => item.password == form.password && item.email == form.email
          );
          if (!user) {
            // user ters yapıldı, apide login bilgisi kontrol etmekle uğraşmamak için, hatalı geldiğinde success'e gitsin diye
            setForm(initialForm);
            history.push('/success');
          } else {
            history.push('/error');
          }
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={errors.email}
        />
        {errors.email ? <FormFeedback>{errorMessages.email}</FormFeedback> : ''}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={errors.password}
        />
        {errors.password ? (
          <FormFeedback>{errorMessages.password}</FormFeedback>
        ) : (
          ''
        )}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={errors.terms}
        />{' '}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid}>
          Login
        </Button>
      </FormGroup>
    </Form>
  );
}
