import React from 'react';
import { render, fireEvent, screen, getByTestId, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import SignScreen from '../screens/SignUp';
import { stores } from '../store/store'

describe("Initial render the Login Component", () => {
    test("renders the SignUp form", async () => {
        const { getByPlaceholderText, getByText } = await render(<Provider store={stores}>
            <SignScreen />
        </Provider>, { wrapper: Router })
        const emailInput = getByPlaceholderText('Enter Your Email-id');
        const passwordInput = getByPlaceholderText('Enter your Password');
        const loginButton = getByText('Submit');
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    it("updates email value when typed into the email field", async () => {
        const { getByPlaceholderText, getByText } = await render(<Provider store={stores}>
            <SignScreen />
        </Provider>, { wrapper: Router })
        const emailInput = getByPlaceholderText('Enter Your Email-id');
        fireEvent.change(emailInput, { target: { value: 'rohit@gmail.com' } });
        await waitFor(() => expect(emailInput.value).toBe("rohit@gmail.com", { exact: false }));
    });

    it('it should display an error message for an invalid email', async () => {
        const { getByPlaceholderText, getByText } =  await render(<Provider store={stores}>
            <SignScreen />
        </Provider>, { wrapper: Router })
        const emailInput = getByPlaceholderText('Enter Your Email-id');
        const submitButton = getByText('Submit');

        fireEvent.change(emailInput, { target: { value: 'Please Enter the Mandatory Fields and Valid Email-id' } });
        fireEvent.click(submitButton);

        const errorMessage = getByText('Please Enter the Mandatory Fields and Valid Email-id');
        expect(errorMessage).toBeInTheDocument();
    });
})