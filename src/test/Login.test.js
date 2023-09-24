import React from 'react';
import { render, fireEvent, screen, getByTestId, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import LoginScreen from '../screens/Login';
import { stores } from '../store/store'
import Header from '../components/Header';

describe("Initial render the Login Component", () => {
    const adminUserList = [
        {
            "id": 1,
            "name": "admin",
            "email": "admin123@gmail.com",
            "password": "admin",
            "isAdmin": "true"
        },
    ]
    it("render the adminlist of datas", async () => {
        await render(<Provider store={stores}>
            <LoginScreen />
        </Provider>, { wrapper: Router })
        expect(adminUserList).not.toHaveLength(0)
    })
    it('display an error message when api call fails', async () => {
        await render(<Provider store={stores}>
            <LoginScreen />
        </Provider>, { wrapper: Router })
        const listElement = await screen.queryByText('Fail to Fetch Data')
        expect(listElement).toBeNull()
    })
    it('renders the Header message with the provided name', async () => {
        const { getByText } = await render(<Provider store={stores}>
            <Header user={"Rohit"} />
        </Provider>, { wrapper: Router })
        const greetingMessage = getByText("Hello Rohit!", { exact: false });
        expect(greetingMessage).toBeInTheDocument();
    });
    test("renders the login form", async () => {
        const { getByPlaceholderText, getByText } = await render(<Provider store={stores}>
            <LoginScreen />
        </Provider>, { wrapper: Router })
        const emailInput = getByPlaceholderText('Enter Your Email-id');
        const passwordInput = getByPlaceholderText('Enter your Password');
        const loginButton = getByText('SignIn');
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    it("updates email value when typed into the email field", async () => {
        const { getByPlaceholderText, getByText } = await render(<Provider store={stores}>
            <LoginScreen />
        </Provider>, { wrapper: Router });
        const emailInput = getByPlaceholderText('Enter Your Email-id');
        fireEvent.change(emailInput, { target: { value: 'rohit@gmail.com' } });
        await waitFor(() => expect(emailInput.value).toBe("rohit@gmail.com", { exact: false }));
    });

    it('it should display an error message for an invalid email', async () => {
        const { getByPlaceholderText, getByText } = await render(<Provider store={stores}>
            <LoginScreen />
        </Provider>, { wrapper: Router });
        const emailInput = getByPlaceholderText('Enter Your Email-id');
        const submitButton = getByText('SignIn');

        fireEvent.change(emailInput, { target: { value: 'Please enter the valid Email-id and Password!' } });
        fireEvent.click(submitButton);

        const errorMessage = getByText('Please enter the valid Email-id and Password!');
        expect(errorMessage).toBeInTheDocument();
    });
})