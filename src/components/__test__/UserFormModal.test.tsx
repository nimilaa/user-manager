import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserFormModal from "@/components/UserFormModal.tsx";
import { vi, describe, it, beforeEach, expect } from "vitest";

describe("UserFormModal Component", () => {
    let mockOnClose, mockOnSubmit;

    beforeEach(() => {
        mockOnClose = vi.fn();
        mockOnSubmit = vi.fn();
    });

    it("renders modal when isOpen is true for add user", () => {
        render(<UserFormModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
        expect(screen.getByRole("button", { name: /add user/i })).toBeInTheDocument();
    });

    it("renders modal when isOpen is true for edit user", () => {
        render(<UserFormModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} user={{
            name: "Suresh",
            age: 35,
            city: "New York",
            address: "669 Bergen Avenue, Indio, Idaho, 4457",
            company: "Google",
            email: "suresh@gmail.com",
            phone: '+1 (816) 481-2269'
        }}/>);
        expect(screen.getByRole("button", { name: /update user/i })).toBeInTheDocument();
    });

    it("does not render modal when isOpen is false", () => {
        render(<UserFormModal isOpen={false} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
        expect(screen.queryByRole("button", { name: /add user/i })).not.toBeInTheDocument();
    });

    it("calls onClose when modal is closed", async () => {
        render(<UserFormModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />);

        const closeButton = screen.getByRole("button", { name: /close/i });
        await userEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalled();
    });
});
