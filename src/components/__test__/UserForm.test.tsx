import UsersForm from "@/components/UserForm.tsx";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, beforeEach, expect } from "vitest";

vi.mock("../utils/Helpers.util.ts", () => ({
    formatDateWithOffset: vi.fn(() => "2025-03-18T00:00:00Z"),
}));

describe("UsersForm Component", () => {
    let mockOnSubmit;

    beforeEach(() => {
        mockOnSubmit = vi.fn();
    });

    it("renders form fields correctly", () => {
        render(<UsersForm onSubmit={mockOnSubmit} />);

        const nameInput = screen.getByLabelText("Name");
        const ageInput = screen.getByLabelText("Age");
        const cityInput = screen.getByLabelText("City");
        const submitButton = screen.getByRole("button", { name: /add user/i });

        expect(nameInput).toBeInTheDocument();
        expect(ageInput).toBeInTheDocument();
        expect(cityInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it("displays validation errors when fields are empty", async () => {
        render(<UsersForm onSubmit={mockOnSubmit} />);
        const submitButton = screen.getByRole("button", { name: /add user/i });

        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Name is required")).toBeInTheDocument();
            expect(screen.getByText("Age is required")).toBeInTheDocument();
            expect(screen.getByText("City is required")).toBeInTheDocument();
            expect(screen.getByText("Address is required")).toBeInTheDocument();
            expect(screen.getByText("Company is required")).toBeInTheDocument();
            expect(screen.getByText("Email is required")).toBeInTheDocument();
            expect(screen.getByText("Phone number is required")).toBeInTheDocument();
        });
    });

    it("displays validation errors when email format is incorrect", async () => {
        render(<UsersForm onSubmit={mockOnSubmit} />);

        await userEvent.type(screen.getByLabelText("Email"), "suresh");

        const submitButton = screen.getByRole("button", { name: /add user/i });

        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
        });
    });

    it("calls onSubmit with correct data when valid", async () => {
        render(<UsersForm onSubmit={mockOnSubmit} />);

        await userEvent.type(screen.getByLabelText("Name"), "Suresh");
        await userEvent.type(screen.getByLabelText("Age"), "35");
        await userEvent.type(screen.getByLabelText("City"), "New York");
        await userEvent.type(screen.getByLabelText("Address"), "669 Bergen Avenue, Indio, Idaho, 4457");
        await userEvent.type(screen.getByLabelText("Company"), "Google");
        await userEvent.type(screen.getByLabelText("Email"), "suresh@gmail.com");
        await userEvent.type(screen.getByLabelText("Phone Number"), "+1 (816) 481-2269");

        await userEvent.click(screen.getByRole("button", { name: /add user/i }));

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith(
                expect.objectContaining({
                    name: "Suresh",
                    age: 35,
                    city: "New York",
                    address: "669 Bergen Avenue, Indio, Idaho, 4457",
                    company: "Google",
                    email: "suresh@gmail.com",
                    phone: '+1 (816) 481-2269'
                }),
                false
            );
        });
    });

    it("renders edit mode correctly", () => {
        const user = {
            name: "Suresh",
            age: 35,
            city: "New York",
            address: "669 Bergen Avenue, Indio, Idaho, 4457",
            company: "Google",
            email: "suresh@gmail.com",
            phone: '+1 (816) 481-2269'
        };

        render(<UsersForm user={user} onSubmit={mockOnSubmit} />);

        expect(screen.getByDisplayValue("Suresh")).toBeInTheDocument();
        expect(screen.getByDisplayValue("35")).toBeInTheDocument();
        expect(screen.getByDisplayValue("New York")).toBeInTheDocument();
        expect(screen.getByDisplayValue("669 Bergen Avenue, Indio, Idaho, 4457")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Google")).toBeInTheDocument();
        expect(screen.getByDisplayValue("suresh@gmail.com")).toBeInTheDocument();
        expect(screen.getByDisplayValue("+1 (816) 481-2269")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /update user/i })).toBeInTheDocument();
    });
});